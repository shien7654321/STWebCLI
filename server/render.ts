import { Request, Response, NextFunction } from 'express';
import log from './log';

export interface IRenderOption {
    serverManifest: {
        [k: string]: string;
    };
    clientManifest: {
        [k: string]: string;
    };
    html: string;
    app: any;
}

async function ssrRender(req: Request, res: Response, options: IRenderOption) {
    const { clientManifest, html, app } = options;
    log('info', `start ssr render: ${req.url}`);
    const startTimestamp = Date.now();
    const { appContent = '', preloadLinks = '' } = await app({ req, res }, clientManifest);
    const newHtml = html.replace('<!-- preload-links -->', preloadLinks).replace('<!-- html -->', appContent);
    log('success', `ssr render finish: ${Date.now() - startTimestamp}ms`);
    return newHtml;
}

function renderHtml(options: IRenderOption) {
    // eslint-disable-next-line consistent-return,func-names
    return async function (req: Request, res: Response, next: NextFunction) {
        const excludeReg = /\.(map|png|json|svg|jpg|ico|html(\?.*)?|js|css)$/i;
        if (!req.url || excludeReg.test(req.url)) {
            return next();
        }
        const csr = /^csr$/.test(req.url);
        let { html } = options;
        if (!csr && options.app) {
            try {
                html = await ssrRender(req, res, options);
            } catch (err) {
                log('error', `ssr render fail: ${err}`);
            }
        }
        res.send(html);
    };
}

export default renderHtml;
