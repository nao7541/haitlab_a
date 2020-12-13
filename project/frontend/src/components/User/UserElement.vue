<template>
    <div class="user-element" v-if="loadComplete">
        <div class="card-header">
            <img :src="profImg" alt="profile">
            <h2>{{ username }}</h2>
        </div>
        <div class="card-body">
            <div class="tag">
                <BaseTag v-for="(tag, id) in tags"
                    :key="id"
                    :name="tag.tag_name"
                />
            </div>
            <div class="reputation">

            </div>
            <div class="intro">
                <p>{{ intro }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['userId', 'username', 'profImg', 'intro'],
    data() {
        return {
            tags: [],
            loadComplete: false,
        }
    },
    created() {
        apiHelper.loadUserTags(this.userId)
        .then( res => {
            this.tags = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load user tags at UserElement: ", err);
        })
    }
}
</script>

<style scoped>
.user-element {
    width: 20rem;
    height: 25rem;
    margin: 1rem;
    border-radius: 8px;
    text-align: center;
    background-color: #eaeaea;
}

.card-header {
    background: linear-gradient(45deg,  #ffeece, #ffbb3c);
    height: 8rem;
}

.card-header img {
    width: 64px;
    height: 64px;
    border-radius: 64px;
}

.card-body {
    padding: 1rem;
}

.tag::after {
    content: "";
    display: block;
    clear: both;
}

.intro p {
    text-align: left;
}
</style>