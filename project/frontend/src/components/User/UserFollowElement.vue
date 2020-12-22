<template>
    <div class="user-follow-element" v-if="loadComplete">
        <div class="user-follow__card">
            <div class="profile__img">
                <img :src="userDetail.prof_img" alt="profile" @click="imagePressed">
            </div>
            <div class="element-body">
                <div class="user-follow__header">
                    <div class="name">
                        <span>{{ userDetail.username }}</span>
                    </div>
                    <div class="follow__btn">
                        <button @click="follow">{{ followLabel }}</button>
                    </div>
                </div>
                <div class="tags">
                    <BaseTag
                        v-for="(tag, id) in tags"
                        :key="id"
                        :name="tag.tag_name"
                    ></BaseTag>
                </div>
                <div class="intro">
                    <p>{{ userDetail.intro }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'

export default {
    props: {
        userId: {
            required: true,
        },
    },
    data() {
        return {
            userDetail: null,
            paramUserId: null,
            tags: [],
            isFollowing: false,
            loadComplete: false,
        }
    },
    created() {
        // プロフィールページ主のIdを取得する
        this.paramUserId = this.$route.params['userId'];

        // ユーザーの詳細情報の読み込み
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            // tagの読み込み
            return apiHelper.loadUserTags(this.userId)
        }).then( res => {
            this.tags = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to loadUserDetaili at UserFollowElement: ", err);
        })

        // ページ訪問者がこのユーザーをフォローしているか否か
        apiHelper.checkFollowing(this.myUserId, this.userId).
        then(res => {
            this.isFollowing = res;
        }).catch( err => {
            console.log("error to check following: ", err);
        })
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId } };
        },
        followLabel() {
            return this.isFollowing ? 'フォロー解除' : 'フォロー';
        }
    },
    methods: {
        imagePressed() {
            this.$router.replace(this.userLink);
        },
        reload() {
            // プロフィール主のプロフィールページへと遷移する
            this.$router.replace({ name: 'userprofile', params: { userId: this.paramUserId }});
        },
        follow() {
            if (this.isFollowing) {
                // もしフォロー済みならフォロー解除
                apiHelper.stopFollowing(this.myUserId, this.userId)
                .then( () => {
                    this.reload();
                }).catch( err => {
                    console.log("error to stop following: ", err);
                })
            } else {
                // フォローしていないなら、フォローする
                apiHelper.follow(this.myUserId, this.userId)
                .then( () => {
                    this.reload();
                }).catch( err => {
                    console.log("error to follow: ", err);
                })
            }
        }
    }
}
</script>

<style scoped>
.user-follow-element {
    padding: 1rem 0;  
    border-bottom: 1px solid #aaa;
}

.user-follow__card {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.element-body {
    margin-left: 2.5rem;
}

.user-follow__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
}

.profile__img {
    width: 5rem;
    text-align: right;
}

.profile__img img {
    width: 50px;
    height: 50px;
    border-radius: 64px;
    cursor: pointer;
}

.name {
    font-size: 18px;
    font-weight: bold;
}

.tags::after {
    content: "";
    display: block;
    clear: both;
}

.follow__btn button {
    font-size: 16px;
    width: 7rem;
    border-radius: 4px;
    line-height: 40px;
    background-color: #ffe0a7;
}

.follow__btn button:hover {
    background-color: #ffbb3c;
}

.user-follow-element p {
    text-align: left;
}
</style>