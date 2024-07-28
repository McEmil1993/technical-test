<template>
    <div class="login-container">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="login" class="login-form">
            <input 
                v-model="email" 
                type="email" 
                placeholder="Email" 
                :class="{'login-input': true, 'is-invalid': isInvalidField('email')}" 
                
            />
            <span v-if="getErrorMessage('email')" class="error-message">{{ getErrorMessage('email') }}</span>

            <input 
                v-model="password" 
                type="password" 
                placeholder="Password" 
                :class="{'login-input': true, 'is-invalid': isInvalidField('password')}" 
                
            />
            <span v-if="getErrorMessage('password')" class="error-message">{{ getErrorMessage('password') }}</span>

            <button type="submit" class="login-button" :disabled="isLoading">
                <span v-if="isLoading">Logging in...</span>
                <span v-else>Login</span>
            </button>
        </form>
        <router-link to="/register" class="toggle-auth-link">
            Don't have an account? Register
        </router-link>

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../components/loading/LoadingSpinner.vue';

const email = ref('');
const password = ref('');
const errors = ref([]);
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
   
    errors.value = [];

    try {
        isLoading.value = true;
        const response = await api.post('/login', { email: email.value, password: password.value });
        console.log('response.data:: ', response.data);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('role', response.data.data.role);
        router.push('/users');
    } catch (error) {
        console.log(error.response.data);

        errors.value = error.response.data.map(err => {
            return { path: err.path[0], message: err.message };
        });
    } finally {
        isLoading.value = false;
    }
};

const isInvalidField = (field) => {
    return errors.value.some(error => error.path === field);
};

const getErrorMessage = (field) => {
    const error = errors.value.find(error => error.path === field);
    return error ? error.message : '';
};
</script>

<style scoped lang="scss">
@import '../assets/styles/Login.scss';
</style>