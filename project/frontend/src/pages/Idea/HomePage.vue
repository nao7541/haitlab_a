<template>
    <div id="home-page">
        <div class="sidebar">
            <SearchSetting/>
        </div>
        <div class="main-content">
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
        </div>
    </div>
</template>

<script>
import SearchSetting from '@/components/Idea/SearchSetting.vue';
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        SearchSetting,
        IdeaElement,
    },
    computed: {
        ideas() {
            return this.$store.getters['idea/ideas'];
        }
    },
}
</script>

<style scoped>
#home-page {
    width: 60%;
    background-color: #fff;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    grid-template-areas: "sidebar main-content";
}

.sidebar {
    grid-area: sidebar;
}

.main-content {
    grid-area: main-content;
}

.idea-list {
    display: flex;
    flex-wrap: wrap;
}

</style>