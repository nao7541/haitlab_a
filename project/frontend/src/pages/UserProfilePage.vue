<template>
    <div id="user-profile">
        <h1>User Profile</h1>
        <p>{{ username }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
        }
    },
    created() {
        const username = this.$route.params.username;
        this.username = username;
    }
}
</script>