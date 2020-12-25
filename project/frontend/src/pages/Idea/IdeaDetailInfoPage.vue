<template>
    <div id="idea-detail-info" v-if="loadComplete">
        <div class="container">
            <div class="container-title">
                <h3>背景</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.background }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>価値創造</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.value }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>投稿者の思い</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.passion }}</p>
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
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            this.ideaData = res;
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaDetailInfo: ", err);
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
}

.content {
    padding: 1rem;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>