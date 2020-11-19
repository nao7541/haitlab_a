<template>
    <div id="signup-page">
        <BaseCard>
            <form @submit.prevent="signUp">
                <h1>Sign Up</h1>
                <div class="form-control">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" v-model.trim="username.val">
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" v-model.trim="mailAddress.val">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password.val">
                </div>
                <TheButton text="Submit" class="submit"/>
                <div class="line"></div>
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
            mailAddress: {
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
        formValidation() {
            this.isFormValid = true;

            if (this.username.val === '') {
                this.username.isValid = false;
                this.isFormValid = false;
            }

            if (this.mailAddress.val === '') {
                this.mailAddress.isValid = false;
                this.isFormValid = false;
            }

            if (this.password.val === '') {
                this.password.isValid = false;
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
                mailAddress: this.mailAddress.val,
                password: this.password.val,
            };

            console.log(userData);
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

</style>