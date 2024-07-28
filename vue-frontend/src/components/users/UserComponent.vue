<template>
    <div class="user-list-container">
        <h4> User Login: {{ userEmail }} {{ userRole }}</h4> 
        <h4 class="user-list-title">User List</h4> 
        <button class="logout-button" @click="logout">Logout</button>
        <button class="add-user-button" @click="openCreateModal">Add User</button>
        
        <table class="user-table" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th v-if="userRole === 'admin'">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="users.length === 0">
                    <td colspan="6" class="center-bold">No users found.</td>
                </tr>
                <tr v-else v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ formatDate(user.created_at) }}</td>
                    <td v-if="userRole === 'admin'">
                        <button @click="openUpdateModal(user)">Edit</button>
                        <button @click="openDeleteModal(user.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
       

        <!-- Create/Update Modal -->
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="showModal" class="modal-overlay">
                <div class="modal-content">
                    <h3>{{ isUpdating ? 'Update User' : 'Create User' }}</h3>
                    <form @submit.prevent="isUpdating ? updateUser() : createUser()">
                        <input v-model="currentUser.name" type="text" placeholder="Name" :class="{'create-input': true, 'is-invalid': isInvalidField('name')}" />
                        <span v-if="getErrorMessage('name')" class="error-message">{{ getErrorMessage('name') }}</span>
                        <input v-model="currentUser.email" type="email" placeholder="Email" :class="{'create-input': true, 'is-invalid': isInvalidField('email')}" />
                        <span v-if="getErrorMessage('email')" class="error-message">{{ getErrorMessage('email') }}</span>
                        <input v-if="!isUpdating" v-model="currentUser.password" type="password" placeholder="Password" :class="{'create-input': true, 'is-invalid': isInvalidField('password')}" />
                        <span v-if="getErrorMessage('password')" class="error-message">{{ getErrorMessage('password') }}</span>
                        <select v-model="currentUser.role">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <button type="submit">{{ isUpdating ? 'Update' : 'Create' }}</button>
                        <button type="button" @click="closeModal">Cancel</button>
                    </form>
                </div>
            </div>
        </transition>

        <!-- Delete Confirmation Modal -->
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="showDeleteModal" class="modal-overlay">
                <div class="modal-content">
                    <h3>Confirm Deletion</h3>
                    <p>Are you sure you want to delete this user?</p>
                    <button @click="deleteUser">Yes, Delete</button>
                    <button @click="closeDeleteModal">Cancel</button>
                </div>
            </div>
        </transition>

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import LoadingSpinner from '../../components/loading/LoadingSpinner.vue';

const users = ref([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isUpdating = ref(false);
const currentUser = ref({
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'user',
});
const userToDelete = ref(null);
const router = useRouter();
const userEmail = ref('');
const userRole = ref('');
const errors = ref([]);
const isLoading = ref(false);

const fetchUsers = async () => {
    try {
        isLoading.value = true;
        const response = await api.get('/users');
        users.value = response.data.data.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
    } finally {
        isLoading.value = false;
    }
};

const getUserName = () => {
    userEmail.value = localStorage.getItem('email');
};

const getUserRole = () => {
    userRole.value = localStorage.getItem('role');
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format to 'MM/DD/YYYY, HH:MM:SS' or you can customize it
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    router.push('/login');
};

const openCreateModal = () => {
    currentUser.value = { id: null, name: '', email: '', password: '', role: 'user' };
    isUpdating.value = false;
    showModal.value = true;
};

const openUpdateModal = async (user) => {
    errors.value = [];
    try {
        isLoading.value = true;
        const response = await api.get(`/users/edit/${user.id}`);
        currentUser.value = { ...response.data };
        isUpdating.value = true;
        showModal.value = true;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
    } finally {
        isLoading.value = false;
    }
};

const closeModal = () => {
    showModal.value = false;
};

const createUser = async () => {
    errors.value = [];
    try {
        isLoading.value = true;
        await api.post('/users/create', currentUser.value);
        fetchUsers();
        closeModal();
    } catch (error) {
        errors.value = error.response.data.map(err => {
            return { path: err.path[0], message: err.message };
        });
    } finally {
        isLoading.value = false;
    }
};

const updateUser = async () => {
    try {
        await api.put(`/users/update/${currentUser.value.id}`, currentUser.value);
        fetchUsers();
        closeModal();
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};

const openDeleteModal = (id) => {
    userToDelete.value = id;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
};

const deleteUser = async () => {
    try {
        await api.delete(`/users/delete/${userToDelete.value}`);
        fetchUsers();
        closeDeleteModal();
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};

const beforeEnter = (el) => {
    el.style.opacity = 0;
};

const enter = (el, done) => {
    el.offsetHeight; // trigger reflow
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 1;
    done();
};

const leave = (el, done) => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 0;
    done();
};

const isInvalidField = (field) => {
    return errors.value.some(error => error.path === field);
};

const getErrorMessage = (field) => {
    const error = errors.value.find(error => error.path === field);
    return error ? error.message : '';
};

onMounted(fetchUsers);
onMounted(getUserName);
onMounted(getUserRole);
</script>

<style scoped lang="scss">
@import '../../assets/styles/UserList.scss';
</style>