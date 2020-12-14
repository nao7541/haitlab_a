<template>
    <div class="user-element" v-if="loadComplete">
        <div class="side">
            <div class="profile-img">
                <img :src="profImg" alt="profile">
            </div>
            <div class="username">
                <h3>{{ username }}</h3>
            </div>
            <div class="detail-link">
                <router-link :to="userLink">詳細ページ</router-link>
            </div>
        </div>
        <div class="content">
            <div class="tag">
                <BaseTag v-for="(tag, id) in tags"
                    :key="id"
                    :name="tag.tag_name"
                />
            </div>
            <div class="reputation">
                <h3>評価</h3>
                <div class="reputation-container">
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['far', 'lightbulb']" size="lg"></FontAwesomeIcon>
                            <span>アイデア数</span>
                        </div>
                        <div class="val">
                            34
                        </div>  
                    </div>
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['fas', 'search']" size="lg"></FontAwesomeIcon>
                            <span>ユニークさ</span>
                        </div>
                        <div class="val">
                            34
                        </div>  
                    </div>
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['fas', 'comments']" size="lg"></FontAwesomeIcon>
                            <span>フィードバック貢献度</span>
                        </div>
                        <div class="val">
                            34
                        </div>  
                    </div>
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['far', 'grin-tongue-wink']" size="lg">面白さ</FontAwesomeIcon>
                            <span>面白さ</span>
                        </div>
                        <div class="val">
                            100
                        </div>  
                    </div>
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['fas', 'users']" size="lg">フォロワー数</FontAwesomeIcon>
                            <span>フォロワー数</span>
                        </div>
                        <div class="val">
                            80
                        </div>  
                    </div>
                    <div class="reputation-item">
                        <div class="title">
                            <FontAwesomeIcon class="icon" :icon="['fas', 'dollar-sign']" size="lg">実現可能性</FontAwesomeIcon>
                            <span>実現可能性</span>
                        </div>
                        <div class="val">
                            32
                        </div>  
                    </div>
                </div>
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
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId }};
        },
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
    display: flex;
    justify-content: flex-start;
    margin: 1rem;
    padding: 1rem;
    /* background: linear-gradient(to top right, #ffeece, #ffe0a7);  */
    border-bottom: 1px solid #dddddd;
}

.side {
    width: 12rem;
    padding: 1rem;
    text-align: center;
    border-right: 1px solid #333;
}

.profile-img img { 
    width: 64px;
    height: 64px;
    border-radius: 64px;
}

.detail-link {
    margin-top: 5rem;
    padding: 0.3rem 1rem;
    background-color: #ffeece;
    cursor: pointer;
    transition: all 0.25s ease-out;
}

.detail-link:hover {
    background-color: #ffbb3c;
}

.detail-link a {
    font-weight: bold;
    display: block;
    color: #000;
    text-decoration: none;
}

.content {
    margin-left: 0.5rem;
    width: 100%;
}

.tag {
    height: 2rem;
    margin: 1rem 0;
}

.tag::after {
    content: "";
    display: block;
    clear: both;
}

.reputation h3 {
    font-size: 22px;
    text-align: center;
}

.reputation-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.reputation-item {
    width: 50%;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon {
    width: 2rem;
}

.val {
    font-size: 24px
}
</style>