<template>
    <IdeaBoard
        v-if="loadComplete"
        title="あなたへのおすすめアイデア"
        :ideas="ideas"
    />
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import IdeaBoard from '@/components/Idea/IdeaBoard.vue'

export default {
    components: {
        IdeaBoard,
    },
    data() {
        return {
            ideas: [],
            myTags: [],
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        apiHelper.loadUserTags(this.myUserId)
        .then( res => {
            this.myTags = res;

            this.loadComplete = true;
            console.log(this.myTags);
        }).catch( err => {
            console.log("error to load usertag at recommendIdeaPage: ", err);
        })

    }
}
</script>