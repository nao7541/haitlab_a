<template>
    <BaseProfileContent v-if="loadComplete">
        <template #contentHeaderLinks>
            <IdeaEventHeader :isMyProfile="isMyProfile" />
        </template>
        <template #contentBody>
            <IdeaElement
                v-for="idea in draftIdeas"
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
        </template>
    </BaseProfileContent>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaEventHeader from '@/components/User/IdeaEventHeader.vue';
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaEventHeader,
        IdeaElement,
    },
    data() {
        return {
            draftIdeas: [],
            isMyProfile: false,
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        // 自分のプロフィールかを確認
        const paramUserId = this.$route.params['userId'];
        if (paramUserId == this.myUserId) {
            this.isMyProfile = true;
        }

        apiHelper.loadFilteredDraftIdeas(this.myUserId)
        .then( res => {
            this.draftIdeas = res;
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get ideas at PostIdeasPage: ", err);
        })
    }
}
</script>