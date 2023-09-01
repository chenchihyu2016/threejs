import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';

const rootPath = import.meta.env.PROD ? '/' : '/';
const routes: Array<RouteRecordRaw> = [
    {
        name: rootPath,
        path: '/',
        component: AppLayout,
        children: [
            {
                name: 'Profile',
                path: '',
                component: () => import('../pages/profile/Profile.vue')
            },
            {
                name: 'Playground',
                path: 'playground',
                component: () => import('../pages/playground/Playground.vue')
            }
        ]
    }
];

const router = createRouter({ history: createWebHistory(), routes, strict: true });

export default router;
