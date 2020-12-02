<template>
    <div id="home-page">
        <section class="search">
            <IdeaSearch/>
        </section>
        <section class="ideas">
            <BaseCard>
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
            </BaseCard>
        </section>
    </div>
</template>

<script>
import IdeaSearch from '@/components/Idea/IdeaSearch.vue';
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaSearch,
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
    width: 80%;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    grid-template-areas: "search ideas";
}

.search {
    padding: 0 1rem;
    grid-area: search;
}

.ideas {
    grid-area: ideas;
}

.idea-list {
    display: flex;
    flex-wrap: wrap;
}

</style>