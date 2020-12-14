<template>
    <div id="user-search">
        <section class="side">
            <UserSideBar />
        </section>
        <section class="content">
            <UserBoard 
                title="お探しのユーザー" 
                :users="users" 
            />
        </section>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import UserSideBar from '@/components/User/UserSideBar.vue';
import UserBoard from '@/components/User/UserBoard.vue';

export default {
    components: {
        UserSideBar,
        UserBoard,
    },
    data() {
        return {
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
    display: flex;
    justify-content: flex-start;
}

.content {
    width: 100%;
}
</style>