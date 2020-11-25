<template>
    <div id="signup-page">
        <AuthModel mode="signup">
            <template #form>
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
                    <BaseButton class="submit">Submit</BaseButton>
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
        passwordConfirmation() {
            return this.password1 === this.password2;
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

            // もしpassword1とpassword2が違うとform送信拒否
            if (!this.passwordConfirmation) {
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
    background-color: #ffeece;
}

.submit:hover {
    transition: all .25s ease-in;
    background-color: #ffe0a7;
}

.invalid label {
    color: #ff4a4a;
}
</style>