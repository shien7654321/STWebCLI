import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import MemoryFS from 'memory-fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack, { Configuration, WebpackPluginInstance } from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware';
import express, { Express } from 'express';
import fs from 'fs';
import devConfig from '../build/webpack.dev';
import serverConfig from '../build/webpack.server';
import renderHtml, { RENDER_EXCLUDE_REG } from './render';
import log from './log';

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
        serverSideRender: true,
        // @ts-ignore
        methods: ['GET'],
        outputFileSystem: memoryFS,
    });
    const serverMiddleware = webpackDevMiddleware(serverCompiler, {
        index: false,
        writeToDisk: true,
    });

    server.use(clientMiddleware);
    server.use(serverMiddleware);
    server.use(webpackHotMiddleware(clientCompiler));
    server.get('*', async (req, res, next) => {
        if (!req.url || RENDER_EXCLUDE_REG.test(req.url)) {
            return next();
        }
        const clientManifestPath = `${clientCompiler.outputPath}/client-manifest.json`;
        const serverManifestPath = `${serverCompiler.outputPath}/server-manifest.json`;
        const htmlPath = `${clientCompiler.outputPath}/index.html`;

        const clientManifest = JSON.parse(memoryFS.readFileSync(clientManifestPath, 'utf-8'));
        const serverManifest = JSON.parse(fs.readFileSync(serverManifestPath, 'utf-8'));
        const html = memoryFS.readFileSync(htmlPath, 'utf-8');

        const appPath: string = path.join(serverCompiler.outputPath, serverManifest['main.js']);
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const app = require(appPath).default;
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
