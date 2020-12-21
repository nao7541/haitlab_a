<template>
    <BaseProfileContent>
        <template #contentHeaderLinks>
            <FollowHeader />
        </template>
        <template #contentBody v-if="loadComplete">
            <UserFollowElement
                v-for="(userId, index) in followingUserIds"
                :key="index"
                :userId="userId"
            ></UserFollowElement>
        </template>
    </BaseProfileContent>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import FollowHeader from '@/components/User/FollowHeader.vue';
import UserFollowElement from '@/components/User/UserFollowElement.vue';

export default {
    components: {
        FollowHeader,
        UserFollowElement
    },
    data() {
        return {
            // フォローしているユーザーのユーザーidのリスト
            followingUserIds: [],
            loadComplete: false,
        }
    },
    created() {
        const paramUserId = this.$route.params['userId'];
        apiHelper.loadFollowingUsers(paramUserId)
        .then( res => {
            // returnされた情報からフォローしているユーザーのidだけ抽出する
            this.followingUserIds = res.map((data) => data.following_user_id);

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load following users: ", err);
        })
    }
}
</script>