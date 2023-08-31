import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorldVue from '../components/HelloWorld.vue';

const rootPath = import.meta.env.PROD ? '/' : '/';
const routes: Array<RouteRecordRaw> = [
    {
        name: rootPath,
        path: '/',
        component: HelloWorldVue
    }
];

const router = createRouter({ history: createWebHistory(), routes, strict: true });

export default router;
