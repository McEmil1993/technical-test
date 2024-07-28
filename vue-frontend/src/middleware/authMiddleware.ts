import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const token = localStorage.getItem('token');
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    } else {
        next();
    }
}

export function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const token = localStorage.getItem('token');
    if (token) {
        next(from.name ? { name: from.name } : { name: 'users' });
    }else {
        next();
    }
}