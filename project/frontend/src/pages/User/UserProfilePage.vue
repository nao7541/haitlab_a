<template>
    <div id="profile-page" v-if="loadComplete">
        <MessageModal v-if="messageModalState" :userTo="userDetail.user_id"></MessageModal>
        <section class="side">
            <div class="profile">
                <div class="main-info">
                    <div class="profile-image">
                        <img :src="userDetail.prof_img" alt="profile">
                    </div>
                    <h1>{{ userDetail.username }}</h1>
                    <div class="intro">
                        <p>{{ userDetail.intro }}</p>
                    </div>
                    <div class="tag">
                        <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                    </div>
                    <div class="follow">
                        <div class="follow-display">
                            <router-link :to="followersLink">フォロワー {{ followerCount }}人</router-link>
                            <router-link :to="followingLink">フォロー中 {{ followingCount }}人</router-link>
                        </div>
                        <div class="follow__btn" v-if="!isMyProfile" @click="follow">
                            <span>{{ followLabel }}</span>
                            <FontAwesomeIcon class="icon" v-if="!isFollowing" :icon="['fas', 'user-plus']" size="lg" />
                            <FontAwesomeIcon class="icon" v-if="isFollowing" :icon="['fas', 'user-minus']" size="lg" />
                        </div>
                    </div>
                    <div class="message" v-if="!isMyProfile">
                        <MessageButton />
                    </div>
                </div>
                <div class="sub-info">
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'envelope']" size="lg"/></span>
                        <span><a :href="mailAddress">{{ userDetail.email }}</a></span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'university']" size="lg"/></span>
                        <span>{{ userDetail.univ_name }}</span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'book-open']" size="lg"/></span>
                        <span>{{ userDetail.major }}</span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'address-card']" size="lg" /></span>
                        <span><a :href="userDetail.portfolio">{{ userDetail.portfolio }}</a></span>
                    </div>
                    <div class="edit-profile" v-if="isMyProfile">   
                        <router-link to="/settings">
                            <span>Edit Profile</span>
                            <FontAwesomeIcon :icon="['far', 'edit']" size="lg" />
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <section class="content"> 
            <div>
                <router-view />
            </div>
        </section>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import MessageModal from '@/components/Message/MessageModal.vue';
import MessageButton from '@/components/Message/MessageButton.vue';

export default {
    components: {
        MessageModal,
        MessageButton,
    },
    data() {
        return {
            userDetail: null,
            loadComplete: false,
            isMyProfile: false,
            postIdeas: [],
            tags: [],
            followerCount: 0,
            followingCount: 0,
            isFollowing: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        mailAddress() {
            return "mailto:" + this.userDetail.contact;
        },
        paramUserId() {
            return this.$route.params['userId'];
        },
        followersLink() {
            return { name: 'followers' };
        },
        followingLink() {
            return { name: 'following' };
        },
        followLabel() {
            return this.isFollowing ? 'フォロー解除' : 'フォロー';
        },
        messageModalState() {
            return this.$store.getters['modal/modalState'];
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

                // ユーザーが投稿したアイデアのみを抽出
                return apiHelper.loadFilteredPostIdeas(this.paramUserId);
            }).then ( res => {
                this.postIdeas = res;

                // ロード完了
                this.loadComplete = true;
            }).catch ( err => {
                console.log("error to load user profile: ", err);
            });
        },
        loadFollowData() {
            // フォロワーの読み込み
            return apiHelper.loadFollowers(this.paramUserId)
            .then( res => {
                this.followerCount = res.length;

                // フォロー中のユーザーを読み込み
                return apiHelper.loadFollowingUsers(this.paramUserId);
            }).then( res => {
                this.followingCount = res.length;
            }).catch( err => {
                console.log("error to load followers, followingUsers: ", err);
            })
        },
        follow() {
            if (this.isFollowing) {
                // フォロー済みなら、フォロー解除
                apiHelper.stopFollowing(this.myUserId, this.paramUserId)
                .then( () => {
                    this.loadFollowData();
                    this.isFollowing = false;
                }).catch( err => {
                    console.log("error to stop following: ", err);
                })
            } else {
                // フォローしていないなら、フォローする
                apiHelper.follow(this.myUserId, this.paramUserId)
                .then( () => {
                    this.loadFollowData();
                    // フォローなう
                    this.isFollowing = true;
                }).catch( err => {
                    console.log("error to follow: ", err);
                })
            }
        },
        pageLoad() {
            // ローカルに保存しているuserIdと比較して、自分のページか否かを確かめる
            if (this.paramUserId == this.myUserId) {
                // 自分のページであるならtrue
                this.isMyProfile = true;
            } else {
                this.isMyProfile = false;

                // 自分のページでない場合、訪問中のユーザーを既にフォローしているかを確認
                apiHelper.checkFollowing(this.myUserId, this.paramUserId)
                .then( res => {
                    this.isFollowing = res;
                }).catch( err => {
                    console.log("error to check following: ", err);
                })
            }

            this.loadUserData();
            this.loadFollowData();
        }
    },
    created() {
        this.pageLoad();
    },
    watch: {
        // urlのパラメータが変わる度にリロード
        paramUserId() {
            this.pageLoad();
        }
    }
}
</script>

<style scoped>
#profile-page {
    width: 80%;
    margin: 0 auto;
    padding: 2rem 0;
    display: flex;
    justify-content: flex-start;
}

.side {
    width: 30rem;
    /* height: 100%; */
    text-align: center;
    margin-right: 5rem;
}

.main-info,
.sub-info {
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #fff;
}

.profile-image {
    /* TODO 画像のリサイズ */
    margin: 0 auto;
    width: 260px;
    height: 260px;
    border-radius: 260px;
    background-color: #eee;
    position: relative;
}

.profile-image img {
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

.follow-display {
    display: flex;
    justify-content: space-between;
    align-items: center;   
}

.follow-display a {
    text-decoration: none;
    color: #000;
}

.follow-display a:hover {
    border-bottom: 1px solid #000;
}

.follow__btn,
.edit-profile {
    margin-top: 3rem;
}

.edit-profile a,
.follow__btn {
    font-size: 16px;
    width: 100%;
    line-height: 2.5rem;
}

.edit-profile span,
.follow__btn span {
    margin-right: 1rem;
}

.follow__btn {
    cursor: pointer;
    background-color: #ffe0a7;
}

.follow__btn:hover {
    background-color: #ffbb3c;
}

.follow__btn:focus {
    background-color: #c7912d;
}

.message {
    margin-top: 0.5rem
}

.edit-profile a {
    display: block;
    text-decoration: none;
    color: #000;
    background-color: #6cdb51;
}

.edit-profile a:hover {
    background-color: #62c44a;
}

.edit-profile a:focus {
    background-color: #478d36;
}

.sub-info .info-row {   
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.sub-info .info-row a {
    text-decoration: none;
    color: #000;
}

.content {
    width: 100%;
}
</style>