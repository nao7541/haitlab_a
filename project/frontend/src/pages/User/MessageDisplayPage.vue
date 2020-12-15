<template>
    <div id="message-display">
        <div class="message"
            v-for="(message, index) in receiveMessages"
            :key="index"
        >
            <p>{{ message.message }}</p>
        </div>
    </div>
</template>

<script>
import {db} from '@/plugins/firebase.js';

export default {
    data() {
        return {
            chatUserId: null,
            sendMessages: [],
            receiveMessages: [],
        }
    },
    created() {
        // チャット相手のuserId
        this.chatUserId = this.$route.params['userId'];
    },
    firestore() {
        return {
            receiveMessages: db.collection('chat').orderBy('createdAt')
        }
    }
}
</script>