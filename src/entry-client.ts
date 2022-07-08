import { App } from 'vue';
import { createWebHashHistory, Router } from 'vue-router';
import { Store } from 'vuex';
import main from './main';
import route from './route';
import createStore from './store';

const app: App = main();
const router: Router = route(createWebHashHistory());
const store: Store<any> = createStore();
app.use(router);
app.use(store);
router.isReady().then(() => {
    app.mount('#app');
});
