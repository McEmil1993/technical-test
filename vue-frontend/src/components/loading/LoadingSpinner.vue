<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1000;
}

.spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #007bff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>