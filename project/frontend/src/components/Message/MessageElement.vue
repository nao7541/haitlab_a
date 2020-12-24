<template>
    <div class="message" :id="uniqueId" v-if="loadComplete">
        <div class="profile">
            <router-link :to="userLink"><img :src="user.prof_img" alt="profile-picture"></router-link>
        </div>
        <div class="message-body">
            <div class="message-header">
                <div class="username">
                    <span>From: {{ user.username }}</span>
                </div>
                <div class="date">
                    <small>{{ date }}</small>
                </div>
            </div>
            <div class="message-title">
                <span><router-link :to="messageDisplayLink">{{ title }}</router-link></span>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
export default {
    props: {
        messageId: {
            required: true
        },
        user_from: {
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            required: true,
        }
    },
    data() {
        return {
            user: null,
            loadComplete: false,
        }
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.user_from }};
        },
        messageDisplayLink() {
            return { name: 'messageDisplay', params: { messageId: this.messageId }};
        },
        uniqueId() {
            return `message${this.messageId}`
        }
    },
    created() {
        apiHelper.loadUserDetail(this.user_from)
        .then( res => {
            this.user = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load userdetail at MessageElement: ", err);
        })
    }
}
</script>

<style scoped>
.message {
    padding: 0.25rem 0;
    display: flex;
    justify-content: flex-start;
    background-color: #fff;
    border-bottom: 1px solid #aaa;
}

.message:hover {
    background-color: #ffefd1;
}

.profile {
    width: 100px;
    height: 100px;
    position: relative;
}

.profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.message-body {
    width: 100%;
    padding: 0.25rem;
}

.message-header {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.username span {
    font-size: 14px;
    color: #444;
    border-bottom: 1px solid #444;
}

.message-title {
    font-size: 20px;
    font-weight: bold;
    height: 100%;
}

.message-title a {
    color: #000;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
}
</style>