<template>
    <BaseProfileContent v-if="loadComplete">
        <template #contentHeaderLinks>
            <h3>通知一覧</h3>
        </template>
        <template #contentBody>
            <MessageBoard :messages="messages" />
        </template>
    </BaseProfileContent>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import MessageBoard from '@/components/Message/MessageBoard.vue'

export default {
    components: {
        MessageBoard
    },
    data() {
        return {
            loadComplete: false,
            messages: [],
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        apiHelper.loadReceivedMessages(this.myUserId)
        .then( res => {
            this.messages = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load received messages: ", err);
        })
    }
}
</script>

<style scoped>
.content-header h3 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 4rem;
}
</style>