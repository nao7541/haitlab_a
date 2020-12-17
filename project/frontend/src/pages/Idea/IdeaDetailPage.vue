<template>
    <div id="idea-detail">
        <div class="idea" v-if="loadComplete">
            <main class="main-content">
                <section class="container idea-header">
                    <div class="title">
                        <h1>{{ ideaDetail.title }}</h1>
                    </div>
                    <div class="edit" v-if="this.isMyIdea">
                        <router-link :to="editLink">編集する</router-link>
                    </div>
                    <div class="tags">
                        <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                    </div>
                </section>
                <section class="container idea-body">
                    <div class="sub-container overview">
                        <div class="sub-title">
                            <p>Overview</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.overview }}</p>
                        </div>
                    </div>
                    <div class="sub-container background">
                        <div class="sub-title">
                            <p>Background</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.background }}</p>
                        </div>
                    </div>
                    <div class="sub-container passion">
                        <div class="sub-title">
                            <p>Passion</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.passion }}</p>
                        </div>
                    </div>
                    <div class="idea-footer comment-post">
                        <CommentBox :userId="myUserId">
                            <template #message>
                                <form class="comment-form" @submit.prevent="postComment">
                                    <input type="text" placeholder="コメントを入力" v-model.trim="commentInput">
                                    <div class="post-button">
                                        <button>POST</button>
                                    </div>
                                </form>
                            </template>
                        </CommentBox>
                    </div>
                </section>
            </main>
            <section class="sidebar">
                <section class="profile">
                    <div class="profile-image">
                        <router-link :to="userLink"><img :src="userDetail.prof_img"></router-link>
                    </div>
                    <h1>{{ userDetail.username }}</h1>
                    <div class="intro">
                        <p>{{ userDetail.intro }}</p>
                    </div>
                </section>
                <section class="comment-list">
                    <CommentBox 
                        v-for="comment in comments"
                        :key="comment.id"
                        :userId="comment.user_id"
                    >
                        <template #date>
                            <small class="comment-date">{{ comment.comment_date }}</small>
                        </template>
                        <template #message>
                            <p>{{ comment.comment }}</p>
                        </template>
                    </CommentBox>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import CommentBox from '@/components/Idea/CommentBox.vue';

export default {
    components: {
        CommentBox,
    },
    data() {
        return {
            userDetail: null,
            ideaDetail: null,
            ideaId: null,
            comments: [],
            tags: [],
            loadComplete: false,
            isFormValid: true,
            commentInput: '',
            isMyIdea: false,
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
        },
        editLink() {
            return '/post/edit/' + this.ideaId;
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
    },
    methods: {
        //TODO: comment postの入力許可改善
        formValidation() {
            this.isFormValid = true;

            if (this.commentInput.length === 0) {
                this.isFormValid = false;
            }
        },
        postComment() {
            // ログイン状態の確認
            if (!this.$store.getters['auth/isLoggedIn']) {
                // ログインしていない時はログイン画面に遷移
                this.$router.replace({ name: 'login' });
            }

            // コメント入力が不適切な場合は受け付けない
            this.formValidation();
            if (!this.isFormValid) {
                return;
            }

            // コメントを投稿
            apiHelper.postComment({
                idea_id: this.ideaId,
                user_id: this.myUserId,
                comment: this.commentInput
            }).then( res => {
                console.log(res);
            }).catch( err => {
                console.log("error to post comment: ", err);
            });

            this.commentInput = ''; // コメントの初期化
            //TODO: コメント投稿後の画面遷移でトップに画面上部に戻れるようにする
            this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.ideaId }}); // reload
        },
    },
    created() {
        // router paramsより本アイデアのideaIdを取得
        this.ideaId = this.$route.params['ideaId'];
        
        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            // idea情報を取得
            this.ideaDetail = res;

            // 取得したアイデア情報より、自分のアイデアかを確認
            if (this.myUserId == this.ideaDetail.user_id) {
                this.isMyIdea = true;
            }

            // tag情報を取得
            return apiHelper.loadIdeaTags(this.ideaDetail.idea_id);
        }).then( res => {
            this.tags = res;

            return apiHelper.loadUserDetail(this.ideaDetail.user_id);
        }).then( res => {
            // user情報を取得
            this.userDetail = res;

            return apiHelper.loadComments(this.ideaId);
        }).then( res => {
            // コメントを取得
            this.comments = res;

            // 必要なロードが完了
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load idea detail: ", err);
        });
    }}
</script>

<style scoped>
.idea {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: space-between;
}

.main-content {
    width: 100%;
}

.container {
    padding: 1rem;
}

.idea-header {
    margin-bottom: 1rem;
    text-align: left;
    color: #000;
}

.idea-header .title {
    font-size: 26px;
    margin-bottom: 0.5rem;
}

.idea-header .edit {
    margin: 1rem 0;
}

.idea-header .edit a {
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #12da00;
    border-radius: 4px;
    padding: 0.4rem 1.25rem;
}

.idea-header .edit a:hover {
    background-color: #0fb800;
}

.idea-header .tags::after {
    content: "";
    display: block;
    clear: both;
}

.idea-header .tags .base-tag {
    background-color: #fff;
}

.container .sub-container {
    margin-bottom: 3rem;
}

.container .sub-title {
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #ccc;
}

.container .content {
    font-size: 18px;
}

.idea-body {
    background-color: #fff;
}

.idea-footer {
    border-top: 1px solid #bbb;
    margin-top: 10rem;
}

.comment-form input {
    font-size: 18px;
    width: 100%;
    padding-left: 0.5rem;
    outline: none;
    border-bottom: 1.5px solid #333;
}

.comment-form input:focus {
    border-bottom: 2px solid #ffb01e;
}

.comment-form .post-button {
    text-align: right;
}

.comment-form button {
    outline: none;
    padding: 0.5rem 1rem;
    margin: 2rem 1rem 0 0;
    background: #ffe0a7;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
    transition: all 0.5s ease;
}

.comment-form button:hover {
    background-color: #ffb01e;
}

.sidebar {
    width: 20rem;
}

.sidebar .profile {
    min-height: 10rem;
    background-color: #fff;
    padding: 1rem;
    margin: 0 0 2rem 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px #0005;
    text-align: center;
}

.sidebar .profile-image {
    margin: 0 auto;
    width: 84px;
    height: 84px;
    border-radius: 84px;
    background-color: #eee;
    position: relative;
}

.sidebar .profile-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 80px;
}

.sidebar .profile h1 {
    font-size: 24px;
    font-weight: bold;
}

.sidebar .profile .intro {
    text-align: left;
    margin: 1rem 0;
}

.sidebar .comment-list {
    background-color: #fff;
    margin-left: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px #0005;
}

.comment-list .comment-box {
    border-bottom: 1px solid #ccc;
}
</style>