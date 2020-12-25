<template>
    <div class="feedback-board">
        <div class="feedback__header">
            <div class="board-title">
                <h3>投稿者からの質問</h3>
            </div>
            <BaseEditButton v-if="isMyIdea" @edit="editQuestion" />
        </div>
        <div class="question-modal" v-if="modalState.question">
            <BaseModal v-model="modalState.question">
                <template #card>
                    <BaseForm title="質問投稿">
                        <input type="text" id="question" name="question" placeholder="質問を入力" v-model.trim="inputQuestion">
                        <BaseModalButton @clickModalBtn="addQuestion" />
                    </BaseForm>
                </template>
            </BaseModal>
        </div>
        <div class="questions">
            <FeedbackQuestionElement
                v-for="(question, index) in questions"
                :key="index"
                :question="question.question"
                :questionId="question.feedback_question_id"
            ></FeedbackQuestionElement>
        </div>          
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import FeedbackQuestionElement from '@/components/Idea/FeedbackQuestionElement.vue';

export default {
    props: ['questions'],
    components: {
        FeedbackQuestionElement,
    },
    data() {
        return {
            modalState: {
                question: false,
            },
            inputQuestion: '',
            ideaId: null,
            isMyIdea: null,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    methods: {
        editQuestion() {
            this.modalState.question = true;
        },
        addQuestion() {
            apiHelper.addQuestion(this.ideaId, this.inputQuestion) 
            .then( () => {
                this.$router.go({name: 'feedback', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to add question: ", err);
            })
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then((res) => {
            if (res.user_id == this.myUserId) {
                this.isMyIdea = true;
            }
        }).catch( err => {
            console.log("error to load idea detail at feedbackBoard: ", err);
        })
    },
    beforeRouteLeave(to, from, next) {
        // 他のページに遷移する前にmodalを全てfalseにする
        this.modalState.question = false;
        next();
    }
}
</script>

<style scoped>
.feedback-board {
    width: 60%;
    max-height: 30rem;
    padding: 1rem;
    margin: 0 auto;
}

.feedback__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.board-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    margin-right: 1rem;
}

.question-modal input {
    font-size: 18px;
    line-height: 2rem;
    padding-left: 0.5rem;
    width: 100%;
    outline: none;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    margin-bottom: 1rem;
}

.input-tag input:focus {
    border: 1px solid #444;
}

.questions {
    max-height: 20rem;
    background: #fff;
    overflow: scroll;
}

.questions::-webkit-scrollbar {
    background-color: #fff;
    width: 10px;
}

.questions::-webkit-scrollbar-thumb {
    background-color: #eaeaea;
    border-radius: 8px;
}

.questions::-webkit-scrollbar-button {
    display: none;
}
</style>