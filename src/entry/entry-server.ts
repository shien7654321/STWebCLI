import { renderToString } from '@vue/server-renderer';
import main from './main';

interface IManifest {
    [k: string]: string;
}

function renderPreloadLink(file: string): string {
    if (file.endsWith('.map')) {
        return '';
    }
    if (file.endsWith('.js')) {
        return `<link rel="preload" as=script href="${file}">`;
    }
    if (file.endsWith('.css')) {
        return `<link rel="stylesheet" as=style href="${file}">`;
    }
    return '';
}

function renderPreloadLinks(manifest: IManifest): string {
    let links = '';
    const keySet = new Set();
    Object.entries(manifest).forEach(([key, value]) => {
        if (!keySet.has(key)) {
            keySet.add(key);
            links += renderPreloadLink(value);
        }
    });
    return links;
}

export default async function (ctx, clientManifest: IManifest) {
    try {
        const { app, router } = main();
        await router.push(ctx.req.url);
        await router.isReady();
        const appContent = await renderToString(app);
        const preloadLinks = renderPreloadLinks(clientManifest);
        return {
            appContent,
            preloadLinks,
        };
    } catch {
        throw new Error('Create app fail');
    }
}
