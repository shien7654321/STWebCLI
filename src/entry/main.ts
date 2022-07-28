import { createSSRApp, createApp } from 'vue';
import App from './App.vue';
import { IS_NODE } from '@/common';
import createRouter from '@/router';

export default () => {
    const app = IS_NODE ? createSSRApp(App) : createApp(App);
    const router = createRouter();
    app.use(router);
    return {
        app,
        router,
    };
};
