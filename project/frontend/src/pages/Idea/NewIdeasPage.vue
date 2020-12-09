<template>
    <IdeaBoard
        title="新着アイデア"
        :ideas="ideas"
    />
</template>

<script>
import IdeaBoard from '@/components/Idea/IdeaBoard.vue'

export default {
    components: {
        IdeaBoard,
    },
    computed: {
        ideas() {
            return this.$store.getters['idea/ideas'];
        },
    },
    methods: {
        loadIdeas() {
            this.$store.dispatch('idea/loadIdeas');
        }
    },
    created() {
        this.loadIdeas();
    }
}
</script>