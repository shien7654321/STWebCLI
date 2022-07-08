import { renderToString } from '@vue/server-renderer';
import { createMemoryHistory, RouteLocationMatched, Router } from 'vue-router';
import { Store } from 'vuex';
import main from './main';
import route from './route';
import createStore from './store';

// eslint-disable-next-line no-async-promise-executor
export default (ctx) => new Promise(async (resolve, reject) => {
    const app = main();
    const router: Router = route(createMemoryHistory());
    const store: Store<any> = createStore();
    app.use(router);
    app.use(store);
    await router.push(ctx.url);
    await router.isReady();
    const matchedComponents = router.currentRoute.value.matched.flatMap((item: RouteLocationMatched) => (item.components ? Object.values(item.components) : []));
    if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
            code: 404,
        });
    } else {
        const html = await renderToString(app);
        resolve(html);
    }
});
