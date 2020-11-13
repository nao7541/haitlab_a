<template>
    <div id="signup-page">
        <BaseCard class="base-card">
            <form @submit.prevent="acceptUser">
                <h1>Sign Up</h1>
                <div class="form-control">
                    <p>Username</p>
                    <input type="text" name="username">
                </div>
                <div class="form-control">
                    <p>Email</p>
                    <input type="email" name="email">
                </div>
                <div class="form-control">
                    <p>Password</p>
                    <input type="password" name="password">
                </div>
                <TheButton text="Submit" class="submit"/>
                <div class="form-control forget">
                    <a href="#">forget password?</a>
                </div>
                <div class="or">
                    <p>OR</p>
                </div>
                <TheButton text="SignUp with Facebook" class="facebook"/>
                <TheButton text="SignUp with Twitter" class="twitter"/>
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
            this.$router.push('/ideas');
        }
    }
}
</script>

<style scoped>

.base-card {
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

.form-control p {
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