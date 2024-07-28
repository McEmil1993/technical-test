import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserComponent from '../components/users/UserComponent.vue';
import { authMiddleware, checkAuth } from '../middleware/authMiddleware';

const routes = [
    { path: '/login', name: 'login', component: Login, beforeEnter: checkAuth },
    { path: '/register', name: 'register', component: Register, beforeEnter: checkAuth },
    { path: '/users', name: 'users', component: UserComponent, beforeEnter: authMiddleware },
    { path: '/', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;