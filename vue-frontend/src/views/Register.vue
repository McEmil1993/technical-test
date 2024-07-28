<template>
    <div class="register-container">
        <h2 class="register-title">Register</h2>
        <form @submit.prevent="register" class="register-form">
            <input 
                v-model="name" 
                type="text" 
                placeholder="Name"  
                :class="{'register-input': true, 'is-invalid': isInvalidField('name')}" 
            />
            <span v-if="getErrorMessage('name')" class="error-message">{{ getErrorMessage('name') }}</span>

            <input 
                v-model="email" 
                type="text" 
                placeholder="Email"  
                :class="{'register-input': true, 'is-invalid': isInvalidField('email')}" 
            />
            <span v-if="getErrorMessage('email')" class="error-message">{{ getErrorMessage('email') }}</span>

            <input 
                v-model="password" 
                type="password" 
                placeholder="Password"  
                :class="{'register-input': true, 'is-invalid': isInvalidField('password')}" 
            />
            <span v-if="getErrorMessage('password')" class="error-message">{{ getErrorMessage('password') }}</span>

            <button type="submit" class="register-button" :disabled="isLoading">
                <span v-if="isLoading">Registering...</span>
                <span v-else>Register</span>
            </button>
        </form>

        <router-link to="/login" class="toggle-auth-link">
            Already have an account? Login
        </router-link>

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../components/loading/LoadingSpinner.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('');
const errors = ref([]);
const isLoading = ref(false);
const router = useRouter();

const register = async () => {
   
    errors.value = [];

    try {
        isLoading.value = true;
        const response = await api.post('/register', { name: name.value, email: email.value, password: password.value, role: 'user' });

        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('role', response.data.data.role);
        router.push('/users');
    } catch (error) {
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
@import '../assets/styles/Register.scss';
</style>