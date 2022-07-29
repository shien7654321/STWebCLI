/**
 * server-side rendering
 */
import { Request, Response, NextFunction } from 'express';
import log from './log';

export const RENDER_EXCLUDE_REG = /\.(map|png|json|svg|jpg|ico|html(\?.*)?|js|css)$/i;

export interface IRenderOption {
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
        if (!req.url || RENDER_EXCLUDE_REG.test(req.url)) {
            return next();
        }
        let isCSR = false;
        const questionIndex = req.url.indexOf('?');
        if (questionIndex !== -1) {
            const urlSearchParams = new URLSearchParams(req.url.substring(questionIndex).toLowerCase());
            let csr: string = urlSearchParams.get('csr') || '';
            if (['0', 'false', 'null', 'undefined', 'NaN'].includes(csr)) {
                csr = '';
            }
            isCSR = Boolean(csr);
        }
        let { html } = options;
        if (!isCSR && options.app) {
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
