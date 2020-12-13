<template>
    <IdeaBoard
        v-if="loadComplete"
        title="あなたへのおすすめアイデア"
        :ideas="ideas"
    />
</template>

<script>
// import apiHelper from '@/services/apiHelper.js'
import IdeaBoard from '@/components/Idea/IdeaBoard.vue'

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
    computed: {
        myUserDetail() {
            return this.$store.getters['myInfo/myUserDetail'];
        }
    }
    // created() {
    //     apiHelper.
    // }
}
</script>