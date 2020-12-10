<template>
    <div id="idea-detail">
        <div class="idea" v-if="loadComplete">
            <section class="container idea-header">
                <div class="title">
                    <h1>{{ ideaDetail.title }}</h1>
                </div>
                <div class="profile">
                    <router-link :to="userLink"><img :src="userDetail.prof_img"></router-link>
                </div>
            </section>
            <section class="tags">
                <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
            </section>
            <section class="container idea-body">
                <div class="sub-container overview">
                    <div class="sub-title">
                        <p>アイデアの概要</p>
                    </div>
                    <div class="content">
                        <p>{{ ideaDetail.overview }}</p>
                    </div>
                </div>
                <div class="sub-container background">
                    <div class="sub-title">
                        <p>アイデアの背景</p>
                    </div>
                    <div class="content">
                        <p>{{ ideaDetail.background }}</p>
                    </div>
                </div>
                <div class="sub-container passion">
                    <div class="sub-title">
                        <p>アイデアへのオモイ</p>
                    </div>
                    <div class="content">
                        <p>{{ ideaDetail.passion }}</p>
                    </div>
                </div>
            </section>
            <section class="container idea-footer">
                
            </section>
            <section class="container comments">
                <h1>コメント</h1>
                <div class="comment-post">
                    <CommentBox :userId="myUserId">
                        <template #message>
                            <form class="comment-form" @submit.prevent="postComment">
                                <input type="text" placeholder="コメントを入力" v-model.trim="commentInput">
                                <div>
                                    <button>POST</button>
                                </div>
                            </form>
                        </template>
                    </CommentBox>
                </div>
                <div class="comment-list">
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
                </div>
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
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
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
    width: 60%;
    background-color: #fff;
    margin: 2rem auto;
}

.container {
    padding: 2rem;
    margin: 1rem 0;
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

.idea-header {
    text-align: left;
    color: #fff;
    background-color: #182b3e;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.idea-header .title {
    font-size: 26px;
}

.idea-header .profile {
    text-align: center;
    width: 64px;
    height: 64px;   
}

.idea-header .profile img {
    text-align: center;
    width: 64px;
    height: 64px;
    border-radius: 64px;
}

.tags {
    margin: 0 2rem;
}

.tags::after {
    content: "";
    display: block;
    clear: both;
}

.comments {
    color: #fff;
    background-color: #182b3e;
    margin-top: 5rem;
}

.comments h1 {
    margin-bottom: 1rem;
}

.comment-post .comment-box,
.comment-list .comment-box {
    padding: 1rem;
}

.comment-post .comment-box {
    color: #182b3e;
    background-color: #fff;
}

.comment-list .comment-box {
    min-height: 10rem;
    border-bottom: 1px solid #ccc;
}

.comment-form {
    margin: 1rem 0;
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

.comment-form div {
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

.comment-list .message {
    margin: 1rem 0;
}
</style>