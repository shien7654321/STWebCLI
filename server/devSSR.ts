/**
 * ssr at localhost entry
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import MemoryFS from 'memory-fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack, { Configuration, WebpackPluginInstance } from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import express, { Express } from 'express';
import devConfig from '../build/webpack.dev';
import serverConfig from '../build/webpack.server';
import renderHtml, { RENDER_EXCLUDE_REG } from './render';
import log from './log';

function createCJSModule(code: string) {
    const module = {
        exports: {
            default: () => {},
        },
    };
    // eslint-disable-next-line no-eval
    eval(`(function () {
        ${code}
    })(module);`);
    return module.exports;
}

const PORT = 8081;
const memoryFS = new MemoryFS();

const clientCompiler = webpack({
    ...devConfig,
    entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', devConfig.entry],
    module: {
        ...devConfig.module,
        parser: {
            javascript: {
                commonjs: true,
                commonjsMagicComments: true,
            },
        },
    },
    plugins: [
        ...(devConfig.plugins as WebpackPluginInstance[]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
    ],
} as Configuration);

const serverCompiler = webpack({
    ...serverConfig,
    plugins: [...(serverConfig.plugins as WebpackPluginInstance[]), new webpack.ProgressPlugin()],
} as Configuration);

function devMiddleware(server: Express) {
    server.use(
        express.static(path.join(__dirname, '../public'), {
            index: false,
        }),
    );
    const clientMiddleware = webpackDevMiddleware(clientCompiler, {
        index: false,
        outputFileSystem: memoryFS,
        serverSideRender: true,
    });
    const serverMiddleware = webpackDevMiddleware(serverCompiler, {
        index: false,
        outputFileSystem: memoryFS,
    });

    server.use(clientMiddleware);
    server.use(serverMiddleware);
    server.use(webpackHotMiddleware(clientCompiler));
    server.get('*', async (req, res, next) => {
        if (!req.url || RENDER_EXCLUDE_REG.test(req.url)) {
            return next();
        }
        const clientManifestPath = path.join(clientCompiler.outputPath, 'client-manifest.json');
        const serverManifestPath = path.join(serverCompiler.outputPath, 'server-manifest.json');
        const htmlPath = path.join(clientCompiler.outputPath, 'index.html');

        const clientManifest = JSON.parse(memoryFS.readFileSync(clientManifestPath, 'utf-8'));
        const serverManifest = JSON.parse(memoryFS.readFileSync(serverManifestPath, 'utf-8'));
        const html = memoryFS.readFileSync(htmlPath, 'utf-8');

        const appPath = path.join(serverCompiler.outputPath, serverManifest['main.js']);
        const appContent = memoryFS.readFileSync(appPath, 'utf-8');
        const app = createCJSModule(appContent).default;
        return renderHtml({
            clientManifest,
            html,
            app,
        })(req, res, next);
    });
}

const server = express();
devMiddleware(server);

const url = `http://localhost:${PORT}`;
server.listen(PORT, () => log('success', `The server is running on ${url}`));
