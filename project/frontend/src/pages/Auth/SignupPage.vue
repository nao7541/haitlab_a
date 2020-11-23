<template>
    <div id="signup-page">
        <BaseCard>
            <form @submit.prevent="signUp">
                <h1>Sign up</h1>
                <div class="form-control" :class="{invalid: !username.isValid}">
                    <label for="username">username</label>
                    <p v-if="!username.isValid">username must be filled</p>
                    <input type="text" id="username" name="username" v-model.trim="username.val" @blur="clearValidity('username')">
                </div>
                <div class="form-control" :class="{invalid: !email.isValid}">
                    <label for="email">Email</label>
                    <p v-if="!email.isValid">email must be filled</p>
                    <input type="email" id="email" name="email" v-model.trim="email.val" @blur="clearValidity('email')">
                </div>
                <div class="form-control" :class="{invalid: !password1.isValid}">
                    <label for="password1">Password</label>
                    <p v-if="!password1.isValid">password1 must be filled</p>
                    <input type="password" id="password1" name="password1" v-model="password1.val" @blur="clearValidity('password1')">
                </div>
                <div class="form-control" :class="{invalid: !password2.isValid}">
                    <label for="password2">Password(Confirmation)</label>
                    <p v-if="!password2.isValid">password2 must be filled</p>
                    <input type="password" id="password2" name="password2" v-model="password2.val" @blur="clearValidity('password2')">
                </div>
                <BaseButton text="Submit" class="submit"/>
            </form>
            <div class="line"></div>
            <div class="or">
                <p>OR</p>
            </div>
            <BaseButton text="SignUp with Facebook" class="facebook"/>
            <BaseButton text="SignUp with Twitter" class="twitter"/>
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
            username: {
                val: '',
                isValid: true,
            },
            email: {
                val: '',
                isValid: true,
            },
            password1: {
                val: '',
                isValid: true,
            },
            password2: {
                val: '',
                isValid: true,
            },
            isFormValid: true,
        };
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        clearForm() {
            this.username = {
                val: '',
                isValid: true,
            };
            this.email = {
                val: '',
                isValid: true,
            };
            this.password1 = {
                val: '',
                isValid: true,
            };
            this.password2 = {
                val: '',
                isValid: true,
            };
        },
        formValidation() {
            this.isFormValid = true;

            if (this.username.val === '') {
                this.username.isValid = false;
                this.isFormValid = false;
            }

            if (this.email.val === '') {
                this.email.isValid = false;
                this.isFormValid = false;
            }

            if (this.password1.val === '') {
                this.password1.isValid = false;
                this.isFormValid = false;
            }

            if (this.password2.val === '') {
                this.password2.isValid = false;
                this.isFormValid = false;
            }
        },
        signUp() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const userData = {
                username: this.username.val,
                email: this.email.val,
                password1: this.password1.val,
                password2: this.password2.val,
            };
            this.$store.dispatch('auth/signup', userData);

            // clear input
            this.clearForm();

            // redirect to /ideas
            this.$router.replace('/ideas');
        }
    }
}
</script>

<style scoped>

.card {
    max-width: 30rem;
    padding: 2rem;
}

form h1 {
    font-size: 28px;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.form-control label {
    text-align: left;
    display: block;
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

.submit {
    border-color: #ffeece;
    background-color: #ffeece;
}

.submit:hover {
    transition: all .25s ease-in;
    border: 1px solid #ffe0a7;
    background-color: #ffe0a7;
}

.line {
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

.invalid label {
    color: #ff4a4a;
}
</style>