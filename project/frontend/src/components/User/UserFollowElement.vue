<template>
    <div class="user-follow-element" v-if="loadComplete">
        <div class="profile__img">
            <img :src="userDetail.prof_img" alt="profile" @click="toProfilePage">
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
</template>

<script>
import apiHelper from '@/services/apiHelper.js'

export default {
    props: {
        userId: {
            required: true,
        },
        type: { // following or follower
            type: String,
            required: true,
        }
    },
    data() {
        return {
            userDetail: null,
            tags: [],
            isFollowing: false,
            loadComplete: false,
        }
    },
    created() {
        // ユーザーの詳細情報の読み込み
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            if (this.type === "follower") {
                // このフォロワーさんをフォローしているか否か
                // フォロワーさんのフォロワーリストに自分のIDがあるか
                if (this.userDetail.followers.includes(this.myUserId)) {
                    this.isFollowing = true;
                }
            } else {
                // followingの場合は確実にフォローしている
                this.isFollowing = true;
            }

            // tagの読み込み
            return apiHelper.loadUserTags(this.userId)
        }).then( res => {
            this.tags = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to loadUserDetaili at UserFollowElement: ", err);
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
        toProfilePage() {
            this.$router.go(this.userLink);
        },
        reload() {
            this.$router.go();
        },
        follow() {
            if (this.isFollowing) {
                // もしフォロー済みならフォロー解除
                apiHelper.stopFollowing(this.myUserId, this.paramUserId)
                .then( () => {
                    this.reload();
                }).catch( err => {
                    console.log("error to stop following: ", err);
                })
            } else {
                // フォローしていないなら、フォローする
                apiHelper.follow(this.myUserId, this.paramUserId)
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
    display: flex;
    justify-content: flex-start;
}

.element-body {
    margin-left: 0.5rem;
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
    font-size: 18px;
    width: 7rem;
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