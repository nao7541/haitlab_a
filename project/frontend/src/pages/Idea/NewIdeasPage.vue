<template>
    <IdeaBoard
        v-if="loadComplete"
        title="新着アイデア"
        :ideas="ideas"
    />
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaBoard from '@/components/Idea/IdeaBoard.vue';

export default {
    components: {
        IdeaBoard,
    },
    data() {
        return {
            ideas: [],
            loadComplete: false,
        }
    },
    created() {
        apiHelper.loadPostIdeas()
        .then( res => {
            this.ideas = res;

            this.loadComplete = true;        
        }).catch( err => {
            console.log(err);
        });
    }
}
</script>