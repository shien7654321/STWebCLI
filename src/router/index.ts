import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    RouterHistory,
} from 'vue-router';

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

export default () => {
    const history: RouterHistory = process.env.IS_NODE ? createMemoryHistory() : createWebHashHistory();
    return createRouter({
        history,
        routes,
    });
};
