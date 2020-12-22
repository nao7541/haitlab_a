<template>
    <div id="idea-overview" v-if="loadComplete">
        <div class="container">
            <div class="container-title">
                <h3>概要</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.overview }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>ターゲット</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.target }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>イメージ</h3>
            </div>
            <div class="content" v-if="ideaShow">
                <img :src="ideaData.idea_image" alt="idea-image">
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    data() {
        return {
            ideaId: null,
            ideaData: null,
            loadComplete: false,
        }
    },
    computed: {
        ideaShow() {
            return this.ideaData.idea_image != null ? true : false
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            this.ideaData = res;
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaOverviewPage: ", err);
        })
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 1rem;
}

.container-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px #00000040;
}

.content {
    padding: 1rem;
}

.content img {
    max-width: 800px;
    max-height: 800px;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>