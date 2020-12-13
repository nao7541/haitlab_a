<template>
    <div id="user-search">
        <InputTag :tags="tags"/>
        <UserBoard :users="users" />
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import InputTag from '@/components/Tag/InputTag.vue';
import UserBoard from '@/components/User/UserBoard.vue';

export default {
    components: {
        InputTag,
        UserBoard,
    },
    data() {
        return {
            tags: [],
            users: [],
        }
    },
    created() {
        apiHelper.loadAllUsers()
        .then( res => {
            this.users = res;
        }).catch( err => {
            console.log("error to get users at userSearch: ", err);
        })
    }
}
</script>

<style scoped>
#user-search {
    margin: 2rem auto 0;
    width: 80%;
    background-color: #fff;
}
</style>