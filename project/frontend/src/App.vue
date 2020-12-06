<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
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
}
</style>