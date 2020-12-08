<template>
    <div id="profile-page">
        <section class="side">
            <div class="profile">
                <div class="profile-image">
                    <img :src="user.prof_img" alt="profile">
                </div>
                <h1>{{ user.username }}</h1>
                <div class="intro">
                    <p>{{ user.intro }}</p>
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'envelope']" size="lg"/></span>
                    <span><a :href="mailAddress">{{ user.email }}</a></span>
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'university']" size="lg"/></span>
                    <span>{{ user.univ_name }}</span>
                </div>
                <div class="info">
                    <span><FontAwesomeIcon :icon="['fas', 'book-open']" size="lg"/></span>
                    <span>{{ user.major }}</span>
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
            <IdeaBoard
                title="過去に投稿したアイデア"
                :ideas="postIdeas"
            />
        </section>
    </div>
</template>

<script>
import IdeaBoard from '@/components/Idea/IdeaBoard.vue';

export default {
    components: {
        IdeaBoard,
    },
    data() {
        return {
            isMyProfile: false,
            postIdeas: [],
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        user() {
            return this.$store.getters['user/userDetail'];
        },
        mailAddress() {
            return "mailto:" + this.user.contact;
        },  
        ideas() {
            return this.$store.getters['idea/ideas'];
        },
    },
    created() {
        // パラメータとして渡されたuserid
        const paramUserId = this.$route.params['userId'];
        // ローカルに保存しているuserIdと比較して、自分のページか否かを確かめる
        if (paramUserId === this.myUserId) {
            // 自分のページであるならtrue
            this.isMyProfile = true;
        }

        // ユーザー情報の取得
        this.$store.dispatch('user/loadUserDetail', {
            userId: paramUserId
        });

        // ユーザーの投稿アイデアの取得
        // TODO フィルタリングでユーザーの投稿したアイデアのみをAPIより取得する
        // this.$store.dispatch('idea/loadUserIdeas');
        this.$store.dispatch('idea/loadIdeas')
        .then( () => {
            for (const idea of this.ideas) {
                this.postIdeas.push(idea);
            }
        })
    }
}
</script>

<style scoped>
#profile-page {
    width: 80%;
    margin: 2rem auto;
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
    margin: 1rem 0 2rem 0;
    border-bottom: 1px solid #eee;
}

.side .profile p {
    padding-bottom: 1rem;
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
    background-color: #ccc;
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


/* 
.info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-line {
    height: 2.5rem;
    border-bottom: 1px solid #bbbbbb;
}

.info-title {
    color: #111111;
    font-size: 14px;
}

.mail {
    text-decoration: none;
    color: #000000;
}

.mail:hover {
    color: #555555;
}

.main-content {
    width: 65%;
    text-align: left;
    padding: 1rem;
}

.topic {
    font-weight: bold;
    border-bottom: 1px solid #cccccc;
} */
</style>