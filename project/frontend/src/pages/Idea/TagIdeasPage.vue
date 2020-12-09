<template>
    <IdeaBoard
        title="タグにヒットしたアイデア"
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
        }
    }
}
</script>