export function authMiddleware(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    }
    else {
        next();
    }
}
export function checkAuth(to, from, next) {
    const token = localStorage.getItem('token');
    if (token) {
        next(from.name ? { name: from.name } : { name: 'users' });
    }
    else {
        next();
    }
}
