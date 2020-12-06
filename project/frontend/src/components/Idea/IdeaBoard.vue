<template>
    <div class="idea-board">
        <div class="board-header">
            <h1>{{ title }}</h1>
        </div>
        <div class="idea-list">
            <IdeaElement
                v-for="idea in ideas"
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
    </div>
</template>

<script>
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaElement
    },
    props: ['title', 'ideas']
}
</script>

<style scoped>
.idea-board {
    background-color: #fff;
}

.board-header {
    padding: 1rem;
    border-bottom: 1px solid #999999;
}

.idea-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>