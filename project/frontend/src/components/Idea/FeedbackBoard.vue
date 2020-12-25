<template>
    <div class="feedback-board">
        <div class="board-title">
            <h3>投稿者からの質問</h3>
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
import FeedbackQuestionElement from '@/components/Idea/FeedbackQuestionElement.vue';
export default {
    props: ['questions'],
    components: {
        FeedbackQuestionElement,
    },
}
</script>

<style scoped>
.feedback-board {
    width: 60%;
    max-height: 30rem;
    padding: 1rem;
    margin: 0 auto;
}

.board-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
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