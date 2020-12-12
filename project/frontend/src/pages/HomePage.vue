<template>
    <div id="home-page">
        <TheHeader/>
        <router-view />
    </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader,
    },
    created() {
        this.$store.dispatch('auth/autoLogin');
    }
}
</script>

<style scoped>
#home-page {
    min-height: 100vh;
    height: 100%;
    background-color: #f7f2e9;
}
</style>