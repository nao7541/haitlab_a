<template>
    <div class="idea-list">
        <IdeaElement
            v-for="idea in ideas"
            :key="idea.idea_id"
            :idea_id="idea.idea_id"
            :user_id="idea.user_id"
            :title="idea.idea_title"
            :content="idea.idea_str"
            :date="idea.idea_date"
        ></IdeaElement>
    </div>
</template>

<script>
import IdeaElement from './IdeaElement.vue';

export default {
    components: {
        IdeaElement,
    },
    props: ['ideas'],
}
</script>

<style scoped>
.idea-list {
    display: flex;
    flex-wrap: wrap;
}
</style>