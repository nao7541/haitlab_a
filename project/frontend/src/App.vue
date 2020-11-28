<template>
    <div>
        <TheHeader/>
        <main>
            <router-view/>
        </main>
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

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: 'Noto Serif JP', serif;
    /* font-family: 'Kosugi Maru', sans-serif; */
}

body {
    margin: 0;
    background-color: #f7f2e9;
}
</style>