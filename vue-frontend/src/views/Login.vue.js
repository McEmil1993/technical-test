import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../components/loading/LoadingSpinner.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
    }
    catch (error) {
        console.log(error.response.data);
        errors.value = error.response.data.map(err => {
            return { path: err.path[0], message: err.message };
        });
    }
    finally {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("login-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("login-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.login) }, ...{ class: ("login-form") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), placeholder: ("Email"), ...{ class: (({ 'login-input': true, 'is-invalid': __VLS_ctx.isInvalidField('email') })) }, });
    (__VLS_ctx.email);
    __VLS_styleScopedClasses = ({ 'login-input': true, 'is-invalid': isInvalidField('email') });
    // @ts-ignore
    [login, isInvalidField, email,];
    if (__VLS_ctx.getErrorMessage('email')) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error-message") }, });
        (__VLS_ctx.getErrorMessage('email'));
        // @ts-ignore
        [getErrorMessage, getErrorMessage,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), placeholder: ("Password"), ...{ class: (({ 'login-input': true, 'is-invalid': __VLS_ctx.isInvalidField('password') })) }, });
    (__VLS_ctx.password);
    __VLS_styleScopedClasses = ({ 'login-input': true, 'is-invalid': isInvalidField('password') });
    // @ts-ignore
    [isInvalidField, password,];
    if (__VLS_ctx.getErrorMessage('password')) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error-message") }, });
        (__VLS_ctx.getErrorMessage('password'));
        // @ts-ignore
        [getErrorMessage, getErrorMessage,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("login-button") }, disabled: ((__VLS_ctx.isLoading)), });
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        // @ts-ignore
        [isLoading, isLoading,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    // @ts-ignore
    const __VLS_0 = {}
        .RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/register"), ...{ class: ("toggle-auth-link") }, }));
    const __VLS_2 = __VLS_1({ to: ("/register"), ...{ class: ("toggle-auth-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ to: ("/register"), ...{ class: ("toggle-auth-link") }, }));
    const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
    __VLS_nonNullable(__VLS_5.slots).default;
    if (__VLS_ctx.isLoading) {
        // @ts-ignore
        [LoadingSpinner,];
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(LoadingSpinner, new LoadingSpinner({}));
        const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({}({}));
        const __VLS_10 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(LoadingSpinner, __VLS_7));
        // @ts-ignore
        [isLoading,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['login-container'];
        __VLS_styleScopedClasses['login-title'];
        __VLS_styleScopedClasses['login-form'];
        __VLS_styleScopedClasses['error-message'];
        __VLS_styleScopedClasses['error-message'];
        __VLS_styleScopedClasses['login-button'];
        __VLS_styleScopedClasses['toggle-auth-link'];
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
                email: email,
                password: password,
                isLoading: isLoading,
                login: login,
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
