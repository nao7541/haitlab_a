<template>
    <IdeaBoard
        title="注目しているイベントに関連するアイデア"
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