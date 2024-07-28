import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import LoadingSpinner from '../../components/loading/LoadingSpinner.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
    }
    catch (error) {
        console.error('Failed to fetch users:', error);
    }
    finally {
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
    }
    catch (error) {
        console.error('Failed to fetch user details:', error);
    }
    finally {
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
    }
    catch (error) {
        errors.value = error.response.data.map(err => {
            return { path: err.path[0], message: err.message };
        });
    }
    finally {
        isLoading.value = false;
    }
};
const updateUser = async () => {
    try {
        await api.put(`/users/update/${currentUser.value.id}`, currentUser.value);
        fetchUsers();
        closeModal();
    }
    catch (error) {
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
    }
    catch (error) {
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
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-list-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (__VLS_ctx.userEmail);
    (__VLS_ctx.userRole);
    // @ts-ignore
    [userEmail, userRole,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("user-list-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.logout) }, ...{ class: ("logout-button") }, });
    // @ts-ignore
    [logout,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.openCreateModal) }, ...{ class: ("add-user-button") }, });
    // @ts-ignore
    [openCreateModal,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("user-table") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    if (__VLS_ctx.userRole === 'admin') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        // @ts-ignore
        [userRole,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    if (__VLS_ctx.users.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ colspan: ("6"), ...{ class: ("center-bold") }, });
        // @ts-ignore
        [users,];
    }
    else {
        for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((user.id)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (user.id);
            // @ts-ignore
            [users,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (user.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (user.email);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (user.role);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (__VLS_ctx.formatDate(user.created_at));
            // @ts-ignore
            [formatDate,];
            if (__VLS_ctx.userRole === 'admin') {
                __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!(!((__VLS_ctx.users.length === 0))))
                                return;
                            if (!((__VLS_ctx.userRole === 'admin')))
                                return;
                            __VLS_ctx.openUpdateModal(user);
                            // @ts-ignore
                            [userRole, openUpdateModal,];
                        } }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!(!((__VLS_ctx.users.length === 0))))
                                return;
                            if (!((__VLS_ctx.userRole === 'admin')))
                                return;
                            __VLS_ctx.openDeleteModal(user.id);
                            // @ts-ignore
                            [openDeleteModal,];
                        } }, });
            }
        }
    }
    // @ts-ignore
    const __VLS_0 = {}
        .transition;
    ({}.transition);
    ({}.transition);
    __VLS_components.Transition;
    __VLS_components.transition;
    __VLS_components.Transition;
    __VLS_components.transition;
    // @ts-ignore
    [Transition, Transition,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }));
    let __VLS_6;
    const __VLS_7 = {
        onBeforeEnter: (__VLS_ctx.beforeEnter)
    };
    const __VLS_8 = {
        onEnter: (__VLS_ctx.enter)
    };
    const __VLS_9 = {
        onLeave: (__VLS_ctx.leave)
    };
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    let __VLS_3;
    let __VLS_4;
    if (__VLS_ctx.showModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-overlay") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.isUpdating ? 'Update User' : 'Create User');
        // @ts-ignore
        [beforeEnter, enter, leave, showModal, isUpdating,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (...[$event]) => {
                    if (!((__VLS_ctx.showModal)))
                        return;
                    __VLS_ctx.isUpdating ? __VLS_ctx.updateUser() : __VLS_ctx.createUser();
                    // @ts-ignore
                    [isUpdating, updateUser, createUser,];
                } }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.currentUser.name)), type: ("text"), placeholder: ("Name"), ...{ class: (({ 'create-input': true, 'is-invalid': __VLS_ctx.isInvalidField('name') })) }, });
        __VLS_styleScopedClasses = ({ 'create-input': true, 'is-invalid': isInvalidField('name') });
        // @ts-ignore
        [currentUser, isInvalidField,];
        if (__VLS_ctx.getErrorMessage('name')) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error-message") }, });
            (__VLS_ctx.getErrorMessage('name'));
            // @ts-ignore
            [getErrorMessage, getErrorMessage,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), placeholder: ("Email"), ...{ class: (({ 'create-input': true, 'is-invalid': __VLS_ctx.isInvalidField('email') })) }, });
        (__VLS_ctx.currentUser.email);
        __VLS_styleScopedClasses = ({ 'create-input': true, 'is-invalid': isInvalidField('email') });
        // @ts-ignore
        [currentUser, isInvalidField,];
        if (__VLS_ctx.getErrorMessage('email')) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error-message") }, });
            (__VLS_ctx.getErrorMessage('email'));
            // @ts-ignore
            [getErrorMessage, getErrorMessage,];
        }
        if (!__VLS_ctx.isUpdating) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), placeholder: ("Password"), ...{ class: (({ 'create-input': true, 'is-invalid': __VLS_ctx.isInvalidField('password') })) }, });
            (__VLS_ctx.currentUser.password);
            __VLS_styleScopedClasses = ({ 'create-input': true, 'is-invalid': isInvalidField('password') });
            // @ts-ignore
            [isUpdating, currentUser, isInvalidField,];
        }
        if (__VLS_ctx.getErrorMessage('password')) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error-message") }, });
            (__VLS_ctx.getErrorMessage('password'));
            // @ts-ignore
            [getErrorMessage, getErrorMessage,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.currentUser.role)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("admin"), });
        // @ts-ignore
        [currentUser,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("user"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), });
        (__VLS_ctx.isUpdating ? 'Update' : 'Create');
        // @ts-ignore
        [isUpdating,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.closeModal) }, type: ("button"), });
        // @ts-ignore
        [closeModal,];
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    // @ts-ignore
    const __VLS_10 = {}
        .transition;
    ({}.transition);
    ({}.transition);
    __VLS_components.Transition;
    __VLS_components.transition;
    __VLS_components.Transition;
    __VLS_components.transition;
    // @ts-ignore
    [Transition, Transition,];
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }));
    const __VLS_12 = __VLS_11({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    ({}({ ...{ 'onBeforeEnter': {} }, ...{ 'onEnter': {} }, ...{ 'onLeave': {} }, name: ("fade"), }));
    let __VLS_16;
    const __VLS_17 = {
        onBeforeEnter: (__VLS_ctx.beforeEnter)
    };
    const __VLS_18 = {
        onEnter: (__VLS_ctx.enter)
    };
    const __VLS_19 = {
        onLeave: (__VLS_ctx.leave)
    };
    const __VLS_15 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12));
    let __VLS_13;
    let __VLS_14;
    if (__VLS_ctx.showDeleteModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-overlay") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        // @ts-ignore
        [beforeEnter, enter, leave, showDeleteModal,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.deleteUser) }, });
        // @ts-ignore
        [deleteUser,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.closeDeleteModal) }, });
        // @ts-ignore
        [closeDeleteModal,];
    }
    __VLS_nonNullable(__VLS_15.slots).default;
    if (__VLS_ctx.isLoading) {
        // @ts-ignore
        [LoadingSpinner,];
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(LoadingSpinner, new LoadingSpinner({}));
        const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({}));
        const __VLS_24 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(LoadingSpinner, __VLS_21));
        // @ts-ignore
        [isLoading,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['user-list-container'];
        __VLS_styleScopedClasses['user-list-title'];
        __VLS_styleScopedClasses['logout-button'];
        __VLS_styleScopedClasses['add-user-button'];
        __VLS_styleScopedClasses['user-table'];
        __VLS_styleScopedClasses['center-bold'];
        __VLS_styleScopedClasses['modal-overlay'];
        __VLS_styleScopedClasses['modal-content'];
        __VLS_styleScopedClasses['error-message'];
        __VLS_styleScopedClasses['error-message'];
        __VLS_styleScopedClasses['error-message'];
        __VLS_styleScopedClasses['modal-overlay'];
        __VLS_styleScopedClasses['modal-content'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                LoadingSpinner: LoadingSpinner,
                users: users,
                showModal: showModal,
                showDeleteModal: showDeleteModal,
                isUpdating: isUpdating,
                currentUser: currentUser,
                userEmail: userEmail,
                userRole: userRole,
                isLoading: isLoading,
                formatDate: formatDate,
                logout: logout,
                openCreateModal: openCreateModal,
                openUpdateModal: openUpdateModal,
                closeModal: closeModal,
                createUser: createUser,
                updateUser: updateUser,
                openDeleteModal: openDeleteModal,
                closeDeleteModal: closeDeleteModal,
                deleteUser: deleteUser,
                beforeEnter: beforeEnter,
                enter: enter,
                leave: leave,
                isInvalidField: isInvalidField,
                getErrorMessage: getErrorMessage,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
