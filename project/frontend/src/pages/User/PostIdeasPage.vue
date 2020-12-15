<template>
    <div id="post-ideas">
        <IdeaElement
            v-for="idea in postIdeas"
            :key="idea.idea_id"
            :idea_id="idea.idea_id"
            :user_id="idea.user_id"
            :title="idea.title"
            :overview="idea.overview"
            :background="idea.background"
            :passion="idea.passion"
            :idea_img="idea.idea_img"
            :idea_date="idea.idea_date"
        ></IdeaElement>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaElement,
    },
    data() {
        return {
            postIdeas: [],
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        apiHelper.loadFilteredIdeas(this.myUserId)
        .then( res => {
            this.postIdeas = res;
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get ideas at PostIdeasPage: ", err);
        })
    }
}
</script>