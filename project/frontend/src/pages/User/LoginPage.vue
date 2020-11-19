<template>
    <div id="signup-page">
        <BaseCard>
            <form @submit.prevent="logIn">
                <h1>Log In</h1>
                <div class="form-control">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" v-model.trim="username">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password">
                </div>
                <TheButton text="Submit" class="submit"/>
                <div class="form-control forget">
                    <a href="#">forget password?</a>
                </div>
                <div class="or">
                    <p>OR</p>
                </div>
                <TheButton text="LogIn with Facebook" class="facebook"/>
                <TheButton text="LogIn with Twitter" class="twitter"/>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';

export default {
    components: {
        BaseCard,
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        logIn() {
            this.$router.push('/ideas');
        }
    }
}
</script>

<style scoped>

.card {
    max-width: 30rem;
}

form {
    padding: .25rem 2rem;
}

form h1 {
    font-size: 28px;
    padding: 1rem 0;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control label {
    display: block;
    text-align: left;
    margin: 0;
    font-weight: bold;
}

.form-control input {
    font-size: 16px;
    width: 100%;
    padding: .5rem;
    border: none;
    border-bottom: 1px solid #aaaaaa;
    outline: none;
}

.form-control input:focus {
    border-bottom: 2px solid #ffb01e;
}

form button {
    margin-bottom: 1rem;
}

.submit {
    border-color: #ffeece;
    background-color: #ffeece;
}

.submit:hover {
    transition: all .25s ease-in;
    border: 1px solid #ffe0a7;
    background-color: #ffe0a7;
}

.form-control a {
    text-decoration: none;
    color: #a7a7a7;
    line-height: 2rem;
}

.form-control a:hover {
    color:  #ffbb3c;
}

.forget {
    padding-bottom: 1rem;
    border-bottom: 1px solid #a7a7a7;
}

.or {
    text-align: center;
    margin-top: -30px;
}

.facebook {
    color: #eeeeee;
    border-color: 1px solid #3A559F;
    background-color: #3A559F;
}

.twitter {
    color: #eeeeee;
    border-color: 1px solid #50ABF1;
    background-color: #50ABF1;
}

</style>