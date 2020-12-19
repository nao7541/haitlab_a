<template>
    <div id="profile-page" v-if="loadComplete">
        <section class="side">
            <div class="profile">
                <div class="profile-image">
                    <img :src="userDetail.prof_img" alt="profile">
                </div>
                <h1>{{ userDetail.username }}</h1>
                <div class="follow">
                    <span>フォロワー {{ }}人</span>
                    <span>フォロー中 {{ }}人</span>
                </div>
                <div class="intro">
                    <p>{{ userDetail.intro }}</p>
                </div>
                <div class="tag">
                    <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'envelope']" size="lg"/></span>
                    <span><a :href="mailAddress">{{ userDetail.email }}</a></span>
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'university']" size="lg"/></span>
                    <span>{{ userDetail.univ_name }}</span>
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'book-open']" size="lg"/></span>
                    <span>{{ userDetail.major }}</span>
                </div>
                <div class="edit-profile" v-if="isMyProfile">
                    <router-link to="/settings">
                        <span>Edit Profile</span>
                        <FontAwesomeIcon :icon="['far', 'edit']" size="lg" />
                    </router-link>
                </div>
            </div>
        </section>

        <section class="content"> 
            <div v-if="isMyProfile">
                <div class="content-header">
                    <ul>
                        <li><router-link :to="postPageLink">投稿済み</router-link></li>
                        <li><router-link :to="draftPageLink">下書き</router-link></li>
                        <li><router-link :to="stockPageLink">ストック</router-link></li>
                    </ul>
                </div>
                <div class="content-page">
                    <router-view />
                </div>
            </div>
            <div v-if="!isMyProfile">
                <IdeaBoard
                    title="投稿したアイデア"
                    :ideas="postIdeas"
                />
            </div>
        </section>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import IdeaBoard from '@/components/Idea/IdeaBoard.vue';

export default {
    components: {
        IdeaBoard
    },
    data() {
        return {
            userDetail: null,
            loadComplete: false,
            isMyProfile: false,
            postIdeas: [],
            tags: [],
            paramUserId: null,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        mailAddress() {
            return "mailto:" + this.userDetail.contact;
        },
        postPageLink() {
            return { name: 'postIdeas'};
        },
        draftPageLink() {
            return { name: 'draftIdeas' };
        },
        stockPageLink() {
            return { name: 'stockEvents' };
        }
    },
    methods: {
        loadUserData() {
            apiHelper.loadUserDetail(this.paramUserId) 
            .then( res => {
                this.userDetail = res;

                // userのタグを取得
                return apiHelper.loadUserTags(this.paramUserId);
            }).then( res => {
                this.tags = res;

                return apiHelper.loadFilteredPostIdeas(this.paramUserId);
            }).then ( res => {
                // ユーザーが投稿したアイデアのみを抽出
                this.postIdeas = res;

                // ロード完了
                this.loadComplete = true;
            }).catch ( err => {
                console.log("error to load user profile: ", err);
            });
        }
    },
    created() {
        // パラメータとして渡されたuserid
        this.paramUserId = this.$route.params['userId'];
        // ローカルに保存しているuserIdと比較して、自分のページか否かを確かめる
        if (this.paramUserId == this.myUserId) {
            // 自分のページであるならtrue
            this.isMyProfile = true;
        }

        this.loadUserData();
    },
}
</script>

<style scoped>
#profile-page {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: flex-start;
}

.side {
    background-color: #fff;
    width: 30rem;
    height: 100%;
    text-align: center;
    padding: 1rem;
    margin: 0 1rem;
}

.side .profile-image {
    /* TODO 画像のリサイズ */
    margin: 0 auto;
    width: 260px;
    height: 260px;
    border-radius: 260px;
    background-color: #eee;
    position: relative;
}

.side .profile-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 256px;
    height: 256px;
    border-radius: 256px; 
}

.side .profile h1 {
    font-size: 28px;
}

.side .profile .intro {
    text-align: left;
    margin: 1rem 0;
    border-bottom: 1px solid #eee;
}

.side .profile p {
    padding-bottom: 0.5rem;
}

.side .tag {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.side .tag::after {
    content: "";
    display: block;
    clear: both;
}

.side .follow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0.5rem 2rem;
}

.side .info {   
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.side .info a {
    text-decoration: none;
    color: #000;
}

.content {
    width: 100%;
}

.side .edit-profile {
    margin-top: 3rem;
    width: 100%;   
}

.side .edit-profile a {
    display: block;
    text-decoration: none;
    color: #000;
    background-color: #6cdb51;
    padding: .5rem 0;
}

.side .edit-profile span {
    margin-right: 1rem;
}

.side .edit-profile a:hover {
    background-color: #62c44a;
}

.side .edit-profile a:focus {
    background-color: #478d36;
}

.content {
    background-color: #fff;
}

.content-header {
    padding: 1rem 5rem 0;
    border-bottom: 1px solid #ddd;
}

.content-header ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
}

.content-header li > a {
    padding: 1rem 3rem;
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
}

.router-link-active {
    border-bottom: 2px solid #ffbb3c;
}
</style>