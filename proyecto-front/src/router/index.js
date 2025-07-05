import { createRouter, createWebHistory } from 'vue-router';
import App from '../views/HomeView.vue';
import ImageHistory from '../components/ImageHistory.vue';

const routes = [
    {
        path: '/Home',
        name: 'Home',
        component: App
    },
    {
        path: '/history',
        name: 'History',
        component: ImageHistory
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;