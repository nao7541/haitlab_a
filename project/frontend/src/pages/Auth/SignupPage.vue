<template>
    <div id="signup-page">
        <AuthModel mode="signup">
            <template #form>
                <form @submit.prevent="signUp">
                    <h1>新規登録</h1>
                    <div class="form-control" :class="{invalid: !username.isValid }">
                        <label for="username">ユーザー名 <span class="necessary">[必須]</span></label>
                        <p v-if="!username.isValid">ユーザー名は必須項目です</p>
                        <input type="text" id="username" name="username" v-model.trim="username.val" @blur="clearValidity('username')">
                    </div>
                    <div class="form-control" :class="{invalid: !email.isValid }">
                        <label for="email">メールアドレス <span class="necessary">[必須]</span></label>
                        <p v-if="!email.isValid">メールアドレスは必須項目です</p>
                        <input type="email" id="email" name="email" v-model.trim="email.val" @blur="clearValidity('email')">
                    </div>
                    <div class="form-control" :class="{invalid: !password1.isValid}">
                        <label for="password1">パスワード <span class="necessary">[必須]</span></label>
                        <p v-if="!password1.isValid">パスワードは必須項目です</p>
                        <input type="password" id="password1" name="password1" v-model="password1.val" @blur="clearValidity('password1'); clearMatchPassword();">
                    </div>
                    <div class="form-control" :class="{invalid: !password2.isValid || !matchPassword }">
                        <label for="password2">パスワード（確認用） <span class="necessary">[必須]</span></label>
                        <p v-if="!password2.isValid">パスワード（確認用）は必須項目です</p>
                        <p v-if="password1.isValid && password2.isValid && !matchPassword">パスワードが一致していません</p>
                        <input type="password" id="password2" name="password2" v-model="password2.val" @blur="clearValidity('password2')">
                    </div>
                    <BaseButton class="submit">送信</BaseButton>
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
            matchPassword: true,
        };
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        clearMatchPassword() {
            this.matchPassword = true;
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
            this.matchPassword = true;
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

            console.log(this.password1.val !== this.password2.val)
            if (this.password1.val !== this.password2.val) {
                this.matchPassword = false;
            }
        },
        signUp() {
            this.formValidation();

            // formが入力不足、パスワード違いの場合は認めない
            if (!this.isFormValid || !this.matchPassword) {
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

            // redirect to /ideas'
            this.$router.replace({ name: 'ideas' });
        }
    }
}
</script>

<style scoped>
form h1 {
    font-size: 28px;
    margin-bottom: 2rem;
}

.form-control {
    margin-bottom: 1.25rem;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.form-control label {
    font-size: 17px;
    font-weight: bold;
    text-align: left;
    display: block;
    margin-bottom: 0.25rem;
}

.form-control input {
    font-size: 16px;
    width: 100%;
    line-height: 1.5rem;
    padding-left: 0.5rem;
    border: none;
    border-bottom: 1px solid #aaaaaa;
    outline: none;
}

.form-control input:focus {
    border-bottom: 2px solid #ffb01e;
}

.submit {
    font-size: 18px;
    font-weight: bold;
    background-color: #ffeece;
}

.submit:hover {
    background-color: #ffe0a7;
}

.necessary {
    font-size: 14px;
    color: #ff3535;
}

.invalid p {
    color: #ff3535;
}

.invalid input {
    border-color: #ff3535;
}
</style>