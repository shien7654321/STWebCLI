import {
    createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw, RouterHistory,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home/index.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */'@/views/About/index.vue'),
    },
];

export default () => {
    const history: RouterHistory = process.env.IS_NODE ? createMemoryHistory() : createWebHistory();
    return createRouter({
        history,
        routes,
    });
};
