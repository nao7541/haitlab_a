<template>
    <div class="feedback-question">
        <div class="display" :class="{borderHighlight: isDropdownOpen}">
            <h4>{{ question }}</h4>
            <FontAwesomeIcon @click="toggleFeedbacks" class="icon" :icon="['fas', 'sort-down']" size="sm" v-if="!isDropdownOpen" />
            <FontAwesomeIcon @click="toggleFeedbacks" class="icon" :icon="['fas', 'sort-up']" size="sm" v-if="isDropdownOpen" />
        </div>
        <div class="feedback__dropdown" v-if="isDropdownOpen">
            <form @submit.prevent="addFeedback" :class="{invalid: !isInputValid}">
                <span v-if="!isInputValid">空文字は送信できません</span>
                <input type="text" name="feedback" placeholder="質問に答える" v-model.trim="feedbackInput" @blur="clearValidation">
                <div class="form__btn">
                    <button>送信</button>
                </div>
            </form>
            <div class="feedbacks" v-if="loadComplete">
                <FeedbackReply
                    v-for="(feedback, key) in feedbacks"
                    :key="key"
                    :userId="feedback.user_id"
                    :feedbackId="feedback.feedback_id"
                    :feedback="feedback.feedback"
                ></FeedbackReply>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import FeedbackReply from '@/components/Idea/FeedbackReplyElement.vue';

export default {
    props: {
        question: {
            type: String,
            required: true,
        },
        questionId: {
            required: true,
        },
    },
    components: {
        FeedbackReply,
    },
    data() {
        return {
            isDropdownOpen: false,
            loadComplete: false,
            feedbacks: [],
            feedbackInput: '',
            isInputValid: true,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    methods: {
        toggleFeedbacks() {
            // もしまだreplyが読み込まれていなければ、読み込む
            // すでに読み込まれているならスキップ
            if (!this.loadComplete && !this.isDropdownOpen) {
                apiHelper.loadFeedbacks(this.questionId)
                .then( res => {
                    this.feedbacks = res;

                    this.loadComplete = true;
                }).catch( err => {
                    console.log("error to load feedbacks: ", err);
                })
            }

            // drowdownをtoggle
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        clearValidation() {
            this.isInputValid = true;
        },
        formValidation() {
            this.isInputValid = true;

            if (this.feedbackInput === '') {
                this.isInputValid = false;
            }
        },
        reload() {
            const paramIdeaId = this.$route.params['ideaId'];
            this.$router.go({ name: 'feedback', params: { ideaId: paramIdeaId }});
        },
        addFeedback() {
            this.formValidation();
            if (!this.isInputValid) return;

            apiHelper.addFeedback({
                user_id: this.myUserId,
                feedback_question_id: this.questionId,
                feedback: this.feedbackInput
            }).then(() => {
                this.reload();
            }).catch( err => {
                console.log("error to add feedback: ", err);
            })
        }
    }
}
</script>

<style scoped>
.display {
    border-bottom: 1px solid #999;
    padding: 0.1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 3rem;
}

.display h4 {
    text-align: center;
    color: black;
    background-color: #fff;
}

.icon {
    width: 3rem;
    cursor: pointer;
}

form {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #ddd;
}

form input {
    font-size: 18px;
    width: 100%;
    background-color: #fff;
    outline: none;
    border-bottom: 1px solid #ddd;
}

.form__btn {
    margin-top: 0.5rem;
    text-align: right;
}

form button {
    width: 5rem;
    height: 2rem;
    background-color: #ffe0a7;
    border-radius: 4px;
    outline: none;
}

form input:focus {
    border-color: #ffbb3c;
}

form button:hover {
    background-color: #ffbb3c;
}

.invalid span {
    color: #ff3535;
}

.borderHighlight {
    border-color: #ffbb3c;
    border-width: 1.2px;
}
</style>