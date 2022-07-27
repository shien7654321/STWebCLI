import path from 'path';
import express from 'express';
import fs from 'fs';
import renderHtml from './render';
import log from './log';

const server = express();

const serverManifestPath = path.join(__dirname, '../server/server-manifest.json');
const clientManifestPath = path.join(__dirname, '../client/client-manifest.json');
const htmlPath = path.join(__dirname, '../client/index.html');

const serverManifest = JSON.parse(fs.readFileSync(serverManifestPath, 'utf-8'));
const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, 'utf-8'));
const html = fs.readFileSync(htmlPath, 'utf-8');

const PORT = 8080;
let app: any;
const appPath: string = path.join(__dirname, '../server', serverManifest['main.js']);

try {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    app = __non_webpack_require__(appPath).default;
} catch (err) {
    log('error', `load app fail: ${err}`);
    // eslint-disable-next-line global-require,import/no-dynamic-require
    app = require(appPath).default;
}

server.use('/', express.static(path.join(__dirname, '../client'), { index: false }));
server.get(
    '*',
    renderHtml({
        serverManifest,
        clientManifest,
        html,
        app,
    }),
);

server.listen(PORT, () => log('info', `The server is running ${PORT}`));
