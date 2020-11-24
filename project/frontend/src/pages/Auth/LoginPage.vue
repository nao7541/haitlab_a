<template>
    <div id="login-page">
        <AuthModel mode="login">
            <template #form>
                <form @submit.prevent="login">
                    <h1>Log in</h1>
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
                    <div class="form-control" :class="{invalid: !password.isValid}">
                        <label for="password">Password</label>
                        <p v-if="!password.isValid">password must be filled</p>
                        <input type="password" id="password" name="password" v-model="password.val" @blur="clearValidity('password')">
                    </div>
                    <div class="form-control forget">
                        <a href="#">forget password?</a>
                    </div>
                    <BaseButton text="Submit" class="submit"/>
                </form>
            </template>
        </AuthModel>
    </div>
</template>

<script>
import AuthModel from '@/components/Auth/AuthModel.vue';
export default {
    components: {
        AuthModel,
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
            password: {
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
            this.password = {
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

            if (this.password.val === '') {
                this.password.isValid = false;
                this.isFormValid = false;
            }
        },
        login() {
            this.formValidation();

            // not to login if the form is invalid
            if (!this.isFormValid) {
                return;
            }

            const userData = {
                username: this.username.val,
                email: this.email.val,
                password: this.password.val,
            };
            this.$store.dispatch('auth/login', userData);

            // clear input
            this.clearForm();

            // redirect to /ideas
            this.$router.replace('/ideas');
        }
    }
}
</script>

<style scoped>
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

.forget a {
    text-decoration: none;
    color: #ff8fab;
}

.invalid label {
    color: #ff4a4a;
}
</style>