import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldVue from '../components/HelloWorld.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'user',
            component: HelloWorldVue
        }
    ],
    strict: true
});

export default router;
