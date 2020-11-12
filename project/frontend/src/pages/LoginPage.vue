<template>
    <div id="login-page">
        <BaseCard class="base-card">
            <img class="user-logo" src="../assets/user.png" alt="user">
            <h1 class="title">ログイン</h1>
            <form>
                <div class="registration">
                    <div class="input-registration">
                        <div class="form-control">
                            <input type="text" id="username" name="username" placeholder="username">
                        </div>
                        <div class="form-control">
                            <input type="email" id="email" name="email" placeholder="mail address">
                        </div>
                        <div class="form-control">
                            <input type="password" id="password" name="password" placeholder="password">
                        </div>
                        <TheButton @click="acceptUser" text="新規登録"></TheButton>
                    </div>
                    <div class="ref-registration">
                        <div class="form-control">
                            <TheButton class="facebook" text="Facebookで作成"></TheButton>
                        </div>
                        <div class="form-control">
                            <TheButton class="twitter" text="Twitterで作成"></TheButton>
                        </div>
                        <div class="form-control">
                            <TheButton class="google" text="Googleで作成"></TheButton>
                        </div>
                        <div class="form-control">
                            <TheButton class="apple" text="Appleで作成"></TheButton>
                        </div>
                    </div>
                </div>
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

.base-card {
    margin-top: 5rem;
    padding: 0 2rem;
}

.user-logo {
    background-color: #fff;
    border-radius: 64px;
    width: 128px;
    height: 128px;
    margin-top: -64px;
}

.title {
    border-bottom: 1px solid #000000;
    margin-bottom: 1rem;
    padding: 1.2rem 0;
}

form {
    grid-area: form;
}

.form-control {
    margin-bottom: 1rem;
}

.registration {
    display: grid;
    grid-template-columns: 1fr 2.25fr;
    grid-template-areas: 
            "input ref";
}

.input-registration {
    grid-area: input;
    margin: 2rem 0;
}

.input-registration button {
    width: 100%;
}

input {
    font-size: 16px;
    width: 100%;
    padding: 1rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #000;
    box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.25);
}

input:focus {
    transition: all .5s ease;
    border: 1px solid #df9203;
    background-color: #ffe1a9;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.input-registration button {
    border: 1px solid #ffeece;
    background-color: #ffeece;
}

.input-registration button:hover {
    border: 1px solid #ffe0a7;
    background-color: #ffe0a7;
}

.input-registration button:focus {
    border: 1px solid #ffca67;
    background-color: #ffca67;
}

.ref-registration {
    grid-area: ref;
    border-left: 1px solid #9e9e9e75;
    margin-left: 1rem;
    margin-bottom: 2rem;
}

.ref-registration button {
    width: 80%;
}

.facebook {
    background-color: #3A559F;
}

.twitter {
    background-color: #50ABF1;
}

.google .apple {
    background-color: #ffffff;
}

</style>