<template>
    <div id="idea-feedback">
        <FeedbackBoard :questions="questions" />
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import FeedbackBoard from '@/components/Idea/FeedbackBoard.vue';

export default {
    components: {
        FeedbackBoard,
    },
    data() {
        return {
            ideaId: null,
            questions: [],
            loadComplete: false,
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadFeedbackQuestions(this.ideaId)
        .then( res => {
            this.questions = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaFeedbackPage: ", err);
        })
    }
}
</script>