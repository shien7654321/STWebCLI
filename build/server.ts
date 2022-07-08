import path from 'path';
import express from 'express';
import fs from 'fs';
// @ts-ignore
import manifest from '../dist/ssr-manifest.json';

const server = express();
// eslint-disable-next-line import/no-dynamic-require
const app = require(path.join(__dirname, '../dist', manifest['main.js'])).default;
const htmlTpl = fs.readFileSync(path.join(__dirname, '../dist/index.html'));

server.use('/', express.static(path.join(__dirname, '../dist'), { index: false }));
server.get('*', async (req, res) => {
    try {
        const appContent = await app(req);
        const html = htmlTpl.toString().replace('<div id="app">', `<div id="app">${appContent}`);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.warn('启动服务器失败', err);
        if (err.code === 404) {
            res.status(err.code).send('404');
        } else {
            res.status(500).send('服务器错误');
        }
    }
});
// eslint-disable-next-line no-console
server.listen(8080, () => console.log('The server is running 8080'));
