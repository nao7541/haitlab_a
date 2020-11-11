<template>
    <div id="login-page">
        <BaseCard title="Log in">
            <form>
                <div class="form-control">
                    <label for="username">ユーザー名</label>
                    <input type="text" id="username" name="username">
                </div>
                <div class="form-control">
                    <label for="password">パスワード</label>
                    <input type="password" id="password" name="password">
                </div>
                <button @click="acceptUser">Login</button>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';

export default {
    components: {
        BaseCard,
    },
    methods: {
        acceptUser() {
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>
form label {
    margin-right: .5rem;
}

form .form-control {
    margin: 1rem 0;
}
</style>