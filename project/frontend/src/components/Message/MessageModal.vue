<template>
    <div class="message-modal">
        <div class="modal-overlay" @click="closeMessageModal"></div>
        <div class="card">
            <h2>メッセージ</h2>
            <FontAwesomeIcon @click="closeMessageModal" class="close__btn" :icon="['fas', 'times']" size="sm" />
            <form>
                <div class="form-control" :class="{invalid: !isFormValid}">
                    <label for="message-title">タイトル <span class="necessary">[必須]</span></label>
                    <p v-if="!isFormValid">タイトルは必須項目です</p>
                    <input type="text" id="message-title" name="message-title" v-model.trim="message.title" @blur="clearValidity">
                </div>
                <div class="form-control">
                    <label for="message-content">内容 <span class="necessary"></span></label>
                    <textarea id="message-content" name="message-content" rows="5" cols="30" v-model.trim="message.content" @blur="clearValidity"></textarea>
                </div>
                <button @click="sendMessage">送信</button>
            </form>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['userTo'],
    data() {
        return {
            message: {
                title: '',
                content: '',
            },
            isFormValid: true,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    methods: {
        formValidation() {
            this.isFormValid = true;

            if (this.message.title === '') {
                this.isFormValid = false;
            }
        },
        clearValidity() {
            this.isFormValid = true;
        },
        sendMessage() {
            apiHelper.sendMessage({
                user_from: this.myUserId,
                user_to: this.userTo,
                title: this.message.title,
                message: this.message.content,
            }).then( () => {
                // メッセージ送信後はモーダルを閉じる
                this.closeMessageModal();
            }).catch( err => {
                console.log("error to send a message: ", err);
            })
        },
        closeMessageModal() {
            this.$store.commit('modal/modalOff');
        },
    }
}
</script>

<style scoped>
.message-modal {
    position: relative;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background-color: #0004;
    cursor: pointer;
}

.card {
    z-index: 99;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 420px;
    padding: 1rem;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #fff;
}

.close__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.card h2 {
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
    margin-bottom: 0.25rem
}

.form-control input,
.form-control textarea {
    font-size: 16px;
    width: 100%;
    background: #e5e5e5;
    outline: none;
}

.form-control input:focus,
.form-control textarea:focus {
    border: 1px solid #444;
}

.form-control input {
    line-height: 1.5rem;
    padding-left: 0.5rem;
}

.form-control textarea {
    resize: none;
}

form button {
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    line-height: 2.5rem;
    background-color: #ffefd1;
}

form button:hover {
    background-color: #ffbb3c;
}

.necessary {
    font-size: 14px;
    color: #ff3535;
}

.invalid p {
    color: #ff4a4a;
}

.invalid input {
    border-color: #ff3535;
}
</style>

