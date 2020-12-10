<template>
    <div class="comment-box" v-if="loadComplete">
        <div class="comment-side">
            <img :src="userDetail.prof_img" @click="imagePressed">
        </div>
        <div class="comment-body">
            <div class="comment-header">
                <h3>{{ userDetail.username }}</h3>
                <slot name="date"></slot>
            </div>
            <div class="message">
                <slot name="message"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
export default {
    props: ['userId'],
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id } };
        }
    },
    data() {
        return {
            userDetail: null,
            loadComplete: false,
        }
    },
    methods: {
        imagePressed() {
            this.$router.replace(this.userLink);
        },
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load userDetail at CommentBox: ", err);
        });
    }
}
</script>

<style scoped>
.comment-box {
    display: flex;
}

.comment-box .comment-side {
    text-align: center;
    width: 10rem;
    border-right: 1px solid #ccc;
}

.comment-box .comment-side img {
    width: 48px;
    height: 48px;
    border-radius: 48px;
    cursor: pointer;
}

.comment-box .comment-body {
    width: 100%;
    margin-left: auto;
    padding-left: 1rem;
}

.comment-box .comment-body .comment-header {
    display: flex;
    justify-content: space-between;
}

.comment-box .comment-body .comment-header h3 {
    font-size: 24px;
    font-weight: bold;
}
</style>