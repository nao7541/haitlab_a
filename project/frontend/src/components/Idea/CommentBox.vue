<template>
    <div class="comment-box" v-if="loadComplete">
        <div class="comment-header">
            <img :src="userDetail.prof_img" @click="imagePressed">
            <h3>{{ userDetail.username }}</h3>
        </div>
        <div class="message">
            <slot name="message"></slot>
        </div>
        <div class="comment-footer">
            <slot name="date"></slot>
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
    color: #000;
    background-color: #fff;
    padding: 1rem;
    min-height: 10rem;
    position: relative;
}

.comment-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.comment-header img {
    width: 36px;
    height: 36px;
    border-radius: 36px;
    cursor: pointer;
}

.comment-header h3 {
    font-size: 18px;
    font-weight: bold;
    margin-left: 1rem;
}

.message {
    margin: 0.5rem 0;
}

.comment-footer {
    color: #777;
    position: absolute;
    bottom: 0;
}
</style>