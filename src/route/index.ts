import { createRouter, RouteRecordRaw, RouterHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/Home/index.vue'),
    },
    {
        path: '/about',
        component: () => import('@/views/About/index.vue'),
    },
];

export default (history: RouterHistory) => createRouter({
    history,
    routes,
});
