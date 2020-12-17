<template>
    <div id="edit-idea" v-if="loadComplete">
        <IdeaForm
            :title="title"
            :overview="overview"
            :background="background"
            :passion="passion"
            :offer="offer"
            :tags="tags"
        ></IdeaForm>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaForm from '@/components/Idea/IdeaForm.vue';

export default {
    components: {
        IdeaForm,
    },
    data() {
        return {
            ideaId: null,
            title: {
                val: '',
                isValid: true,
            },
            overview: '',
            background: '',
            passion: '',
            offer: '',
            tags: [],
            loadComplete: false,
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            // ideaの詳細を読み込み
            const idea = res;
            this.title.val = idea.title;
            this.overview = idea.overview;
            this.background = idea.background;
            this.passion = idea.passion;
            this.offer = idea.offer;

            return apiHelper.loadIdeaTags(this.ideaId)
        }).then( res => {
            // タグの読み込み
            this.tags = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load IdeaDetail at EditIdeaPage: ", err);
        })
    }
}
</script>