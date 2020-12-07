<template>
    <div class="comment-box">
        <div class="comment-side">
            <router-link :to="userLink"><img :src="userDetail.prof_img"></router-link>
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
export default {
    props: ['userId'],
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId } };
        }
    },
    created() {
        // propsで受け取ったuserIdをもとに、ユーザーの詳細情報を取得
        this.$store.dispatch('user/loadUserDetail',{
            userId: this.userId
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