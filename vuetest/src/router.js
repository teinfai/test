import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/carpark.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/components/signup.vue'),
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active",
});

export default router
