import axios from 'axios';
// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Use the environment variable
    timeout: 10000,
});
// Request interceptor to add the Authorization header
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// Response interceptor for error handling
api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        window.location.href = '/login';
    }
    //  Return token expired.
    if (error.response.data.result == 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default api;
