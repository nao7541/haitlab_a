<template>
    <BaseProfileContent>
        <template #contentHeaderLinks>
            <FollowHeader />
        </template>
        <template #contentBody v-if="loadComplete">
            <UserFollowElement
                v-for="(userId, index) in followerIds"
                :key="index"
                type="follower"
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
        UserFollowElement,
    },
    data() {
        return {
            // フォロワーのユーザーidのリスト
            followerIds: [],
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        apiHelper.loadFollowers(this.myUserId)
        .then( res => {
            // returnされた情報からフォロワーのidだけ抽出する
            this.followerIds = res.map((data) => data.user_id);

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load following users: ", err);
        })
    }
}
</script>