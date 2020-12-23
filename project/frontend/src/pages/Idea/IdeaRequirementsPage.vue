<template>
    <div id="idea-requirements" v-if="loadComplete">
        <div class="container">
            <div class="container-title">
                <h3>期限</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.deadline }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>募集人材</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.offer }}</p>
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
            console.log("error to get idea data at IdeaRequirementsPage: ", err);
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

.content p {
    font-size: 18px;
    text-align: left;
}
</style>