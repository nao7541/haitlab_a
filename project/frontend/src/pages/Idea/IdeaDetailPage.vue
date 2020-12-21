<template>
    <div id="idea-detail">
        <div class="idea" v-if="loadComplete">
            <!-- <section class="left-sidebar">
                <div class="reputation">
                    <div class="icon-btn interesting" :class="stateColor('interesting')" @click="reputationClicked('interesting')">
                        <div class="popup">
                            <span>面白さ</span>
                        </div>
                        <span class="count">{{ reputationCount['interesting'] }}</span>
                        <FontAwesomeIcon class="icon" v-if="reputationState['interesting']"  :icon="['fas', 'check']" size="lg"></FontAwesomeIcon>
                        <FontAwesomeIcon class="icon" v-if="!reputationState['interesting']" :icon="['fas', 'bolt']" size="lg"></FontAwesomeIcon>
                    </div>
                    <div class="icon-btn novelty" :class="stateColor('novelty')" @click="reputationClicked('novelty')">
                        <div class="popup">
                            <span>新規性</span>
                        </div>
                        <span class="count">{{ reputationCount['novelty'] }}</span>
                        <FontAwesomeIcon class="icon" v-if="reputationState['novelty']"  :icon="['fas', 'check']" size="lg"></FontAwesomeIcon>
                        <FontAwesomeIcon class="icon" v-if="!reputationState['novelty']" :icon="['fas', 'brain']" size="lg"></FontAwesomeIcon>
                    </div>
                    <div class="icon-btn possibility" :class="stateColor('possibility')" @click="reputationClicked('possibility')">
                        <div class="popup">
                            <span>実現可能性</span>
                        </div>
                        <span class="count">{{ reputationCount['possibility'] }}</span>
                        <FontAwesomeIcon class="icon" v-if="reputationState['possibility']"  :icon="['fas', 'check']" size="lg"></FontAwesomeIcon>
                        <FontAwesomeIcon class="icon" v-if="!reputationState['possibility']" :icon="['fas', 'dollar-sign']" size="lg"></FontAwesomeIcon>
                    </div>
                </div>
            </section> -->

            <main>
                <section class="container idea-header">
                    <div class="title">
                        <h1>{{ ideaDetail.title }}</h1>
                    </div>
                    <div class="operation" v-if="this.isMyIdea">
                        <div class="publish" v-if="this.ideaDetail.state === 'draft'">
                            <button @click="publishIdea">公開する</button>
                        </div>
                        <div class="edit">
                            <button @click="editIdea">編集する</button>
                        </div>
                        <div class="delete">
                            <button @click="deleteIdea">削除する</button>
                        </div>
                    </div>
                    <div class="tags">
                        <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                    </div>
                </section>

                <section class="idea-body">
                    <IdeaDetailTab />
                    <router-view />
                </section>

                <!-- <section class="reputation-form">
                    <form @submit.prevent="reputate">
                        <input type="range" id="interesting" name="interesting" min="0" max="5" v-model="reputationInput.interesting">
                        <label for="interesting">面白さ</label>
                        <input type="range" id="novelty" name="novelty" min="0" max="5" v-model="reputationInput.novelty">
                        <label for="novelty">新規性</label>
                        <input type="range" id="possibility" name="possibility" min="0" max="5" v-model="reputationInput.possibility">
                        <label for="possibility">実現可能性</label>
                        <button>送信</button>
                    </form>
                </section>
                <section class="container idea-body">
                    <div class="sub-container overview">
                        <div class="sub-title">
                            <p>概要</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.overview }}</p>
                        </div>
                    </div>
                    <div class="sub-container background">
                        <div class="sub-title">
                            <p>背景</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.background }}</p>
                        </div>
                    </div>
                    <div class="sub-container offer">
                        <div class="sub-title">
                            <p>募集要件</p>
                        </div>
                        <div class="content">
                            <p>{{ ideaDetail.offer }}</p>
                        </div>
                    </div>
                    <div class="sub-container passion">
                        <div class="sub-title">
                            <p>熱意</p>
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
                </section> -->
            </main>
            <section class="right-sidebar">
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
import IdeaDetailTab from '@/components/Idea/IdeaDetailTab.vue';

export default {
    components: {
        CommentBox,
        IdeaDetailTab,
    },
    data() {
        return {
            // general
            loadComplete: false,
            // user
            userDetail: null,
            // idea
            isMyIdea: false,
            ideaDetail: null,
            ideaId: null,
            // tag
            tags: [],
            // comment
            comments: [],
            commentInput: '',
            isFormValid: true,
            // reputation
            reputationCount: 0,
            reputationState: false,
            reputationData: { // ideaの評価値(5段階評価の平均を格納する)
                interesting: 0,
                novelty: 0,
                possibility: 0,
            },
            myReputation: { // 自分のアイデアに対する評価情報
                reputation_id: null,
                user: null,
                idea: null,
                interesting: 0,
                novelty: 0,
                possibility: 0,
            },
            reputationInput: { // formのreputationの値
                interesting: 0,
                novelty: 0,
                possibility: 0,
            },
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
        },
        editLink() {
            return { name: 'editIdea', params: { ideaId: this.ideaId }};
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        stateColor() {
            return (name) => {
                return this.reputationState[name] ? 'clicked' : 'not-yet-clicked';
            }
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
        getMean(arr) {
            const sum = arr.reduce((s, e) => s + e);
            const mean = sum / arr.length;
            return mean;
        },
        updateReputationData() {
            apiHelper.loadIdeaReputations(this.ideaId)
            .then(res => {
                // 評価の配列を取得
                const reputationArray = {
                    interesting: res.map(reputation => reputation.interesting),
                    novelty:     res.map(reputation => reputation.novelty),
                    possibility: res.map(reputation => reputation.possibility),
                }

                // 配列より平均値を求める
                this.reputationData = {
                    interesting: this.getMean(reputationArray.interesting),
                    novelty:     this.getMean(reputationArray.novelty),
                    possibility: this.getMean(reputationArray.possibility)
                }
            }).catch( err => {
                console.log("error to udpate ReputationData: ", err);
            })
        },
        reputate() {
            apiHelper.addReputation(this.ideaId, this.myUserId, this.reputationInput)
            .then( () => {
                this.reputationState = true;

                this.updateReputationData();
            }).then( () => {
                
                // reputationを初期化する
                this.initReputation();
            }).catch( err => {
                console.log("error to add reputation at IdeaDetailPage: ", err);
            })
        },
        editReputation() {

        },
        deleteReputation() {
            apiHelper.deleteReputation(this.myReputation.reputation_id)
            .then( () => {
                // 削除後は初期化する
                this.initReputation();
            }).catch( err => {
                console.log("error to remove reputation at IdeaDetailPage: ", err);
            })
        },
        // reputationClicked(name) { // nameはinteresting, novelty, possibility
        //     // 自分のアイデアには評価できない
        //     if (this.isMyIdea) {
        //         return;
        //     }

        //     if (this.reputationState[name]) {
        //         // もし評価済みの場合は評価を外す
        //         this.removeReputation(name);                
        //     } else {
        //         // もし未評価の場合は評価を追加する
        //         this.addReputation(name);
        //     }
        // },
        publishIdea() {
            apiHelper.publishIdea(this.ideaDetail, this.ideaId)
            .then(() => {
                this.$router.replace('/');  
            }).catch( err => {
                console.log("error to publish idea: ", err);
            })
        },
        editIdea() {
            // アイデア編集ページに遷移する
            this.$router.replace(this.editLink);
        },
        deleteIdea() {
            apiHelper.deleteIdea(this.ideaId)
            .then(() => {
                // 削除後はideasページに遷移
                this.$router.replace({ name: 'ideas' });
            }).catch( err => {
                console.log("error to delete idea: ", err);
            })
        },
        // reputationDataの初期化
        initReputation() {
            apiHelper.loadReputation(this.ideaId, this.myUserId) 
            .then( res => {
                if (res != null) {
                    // 登録済みなら初期化する
                    this.myReputation.reputation_id = res.reputation_id;
                    this.myReputation.user = res.user;
                    this.myReputation.idea = res.idea;
                    this.myReputation.interesting = res.interesting;
                    this.myReputation.novelty = res.novelty;
                    this.myReputation.possibility = res.possibility;

                    // formの値に反映する
                    this.reputationInput.interesting = this.myReputation.interesting;
                    this.reputationInput.novelty = this.myReputation.novelty;
                    this.reputationInput.possibility = this.myReputation.possibility;

                    // 評価済みにする
                    this.reputationState = true;
                } else {
                    this.myReputation.reputation_id = null;
                    this.myReputation.user = null;
                    this.myReputation.idea = null;
                    this.myReputation.interesting = 0;    
                    this.myReputation.novelty = 0;
                    this.myReputation.possibility = 0;

                    // formの値に反映する
                    this.reputationInput.interesting = this.myReputation.interesting;
                    this.reputationInput.novelty = this.myReputation.novelty;
                    this.reputationInput.possibility = this.myReputation.possibility;

                    // 評価済みにする
                    this.reputationState = false;
                }

                // reputaionCountの取得
                apiHelper.countIdeaReputation(this.ideaId)
            }).then( res => { 
                this.reputationCount = res;

                this.updateReputationData();
            }).catch( err => {
                console.log("error to init myReputation: ", err);
            })
        }
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

        // 評価の初期化
        this.initReputation();
    }}
</script>

<style scoped>
.idea {
    width: 80%;
    margin: 0 auto;
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
}

/* .left-sidebar {
    width: 10rem;
} */

/* .icon-btn {
    margin: 2.5rem auto;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
    cursor: pointer;
    position: relative;
}

.count {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.clicked { 
    background-color: #ffbb3c;
}

.not-yet-clicked {
    background-color: #fff;
}

.not-yet-clicked:hover {
    background-color: #ffcf76;
}

.icon-btn .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.popup {
    font-size: 14px;
    font-weight: bold;
    background-color: #1e1e1eaa;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    width: 6rem;
    padding: 0.1rem 0.5rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
}

.icon-btn:hover > .popup {
    opacity: 1;
    transform: translate(-50%, -50%);
} */

main {
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

.idea-header .operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.idea-header button {
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    margin-right: 1rem;
}

.idea-header .publish button {
    background-color: #ffbb3c;
}

.idea-header .publish button:hover {
    background-color: #d89e32;
}

.idea-header .edit button {
    background-color: #12da00;
}

.idea-header .edit button:hover {
    background-color: #0fb800;
}

.idea-header .delete button {
    background-color: #da0000;
}

.idea-header .delete button:hover {
    background-color: #b80000;
}

.idea-header .tags::after {
    content: "";
    display: block;
    clear: both;
}

.idea-header .tags .base-tag {
    background-color: #fff;
}

.idea-body {
    background-color: #fff;
}

/* .container .sub-container {
    margin-bottom: 3rem;
}

.container .sub-title {
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}

.container .content {
    font-size: 18px;
}

.idea-footer {
    border-top: 1px solid #bbb;
    margin-top: 10rem;
} */

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

.right-sidebar {
    width: 20rem;
}

.right-sidebar .profile {
    min-height: 10rem;
    background-color: #fff;
    padding: 1rem;
    margin: 0 0 2rem 0.5rem;
    border-radius: 4px;
    text-align: center;
}

.right-sidebar .profile-image {
    margin: 0 auto;
    width: 84px;
    height: 84px;
    border-radius: 84px;
    background-color: #eee;
    position: relative;
}

.right-sidebar .profile-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 80px;
}

.right-sidebar .profile h1 {
    font-size: 24px;
    font-weight: bold;
}

.right-sidebar .profile .intro {
    text-align: left;
    margin: 1rem 0;
}

.right-sidebar .comment-list {
    background-color: #fff;
    margin-left: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px #0005;
}

.comment-list .comment-box {
    border-bottom: 1px solid #ccc;
}
</style>