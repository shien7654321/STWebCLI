import { createSSRApp, createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { IS_NODE } from '@/common';
import createRouter from '@/router';

export default () => {
    const app = IS_NODE ? createSSRApp(App) : createApp(App);
    const router = createRouter();
    const pinia = createPinia();
    app.use(router).use(pinia);
    return {
        app,
        router,
    };
};
