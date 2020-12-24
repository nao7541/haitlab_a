<template>
    <div class="message-board">
        <div class="message-list">
            <MessageElement
                v-for="(message, index) in messages"
                :key="index"
                :messageId="message.message_id"
                :user_from="message.user_from"
                :message="message.message"
                :title="message.title"
                :date="message.message_date"
                @click.native="selectMessage($event)"
            ></MessageElement>
        </div>
        <div class="message-display">
            <router-view />
        </div>
    </div>
</template>

<script>
import MessageElement from '@/components/Message/MessageElement.vue';

export default {
    components: {
        MessageElement,
    },
    props: {
        messages: {
            type: Array,
            required: true,
        },
    },
    methods: {
        selectMessage(e) {
            if (this.prevPressedId != null) {
                document.getElementById(this.prevPressedId).style.borderRightColor = "#fff";
            }

            const targetMessage = e.currentTarget;
            targetMessage.style.borderRightWidth="4px"
            targetMessage.style.borderRightStyle="solid"
            targetMessage.style.borderRightColor="#ffbb3c"
            this.prevPressedId = targetMessage.id;
        }
    },
    data() {
        return {
            prevPressedId: null,
        }
    }
}
</script>

<style scoped>
.message-board {
    height: 100%;
    display: flex;
    justify-content: flex-start;
}

.message-list {
    min-width: 20rem;
    height: 100%;
    background-color: #ddd;
    border-right: 0.5px solid #333;
    overflow: scroll;
}

.message-list::-webkit-scrollbar {
    background-color: #fff;
    width: 10px;
}

.message-list::-webkit-scrollbar-thumb {
    background-color: #eaeaea;
    border-radius: 8px;
}

.message-list::-webkit-scrollbar-button {
    display: none;
}

.message-list .message.router-link-active {
    /* background-color: red; */
}

.message-display {
    width: 100%;
}
</style>