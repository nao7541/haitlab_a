<template>
    <div class="feedback-reply" v-if="loadComplete">
        <div class="reply">
            <p>{{ feedback }}</p>
        </div>
        <div class="username">
            <h5>From: <span><router-link :to="userLink">{{ user.username }}</router-link></span></h5>
            <div class="icon__box" v-if="isMyFeedback">
                <FontAwesomeIcon class="icon" :icon="['fas', 'ellipsis-v']" size="sm" />
                <div class="popup">
                    <div class="delete" @click="deleteFeedback">
                        <span>削除</span>
                        <FontAwesomeIcon :icon="['fas', 'trash']" size="sm" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: {
        userId:   { required: true },
        feedbackId: { required: true },
        feedback: { type: String, required: true}
    },
    data() {
        return {
            user: null,
            loadComplete: null,
        }
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId }};
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        isMyFeedback() {
            return this.myUserId == this.userId
        }
    },
    methods: {
        reload() {
            const paramIdeaId = this.$route.params['ideaId'];
            this.$router.go({ name: 'feedback', params: { ideaId: paramIdeaId }});
        },
        deleteFeedback() {
            apiHelper.deleteFeedback(this.feedbackId)
            .then(() => {
                this.reload();
            }).catch( err => {
                console.log("error to delete feedback: ", err);
            })
        },
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.user = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load userDetail: ", err);
        })
    }
}
</script>

<style scoped>
.feedback-reply {
    text-align: right;
    padding: 0.2rem 1rem 0.2rem 0;
    border-bottom: 1px solid #eee;
}

.reply {
    padding: 0.1rem;
}

.username {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.username,
.username a {
    font-size: 14px;
    color: #333;
}

.username a {
    text-decoration: none;
}

.username a:hover {
    border-bottom: 1px solid #333;
}

.icon__box {
    width: 20px;
    height: 20px;
    border-radius: 50%;;
    background-color: #ddd;
    position: relative;
    cursor: pointer;
    margin-left: 0.75rem;
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.popup {
    position: absolute;
    top: -30px;
    right: 0;
    transform: translateY(10px);
    width: 4rem;
    line-height: 2rem;
    background-color: #ff3535e9;
    border-radius: 4px;
    transition: all 0.25s ease-in;
    opacity: 0;
    pointer-events: none;
    z-index: 100;
}

.icon__box:hover > .popup {
    transform: translate(0, 0);
    opacity: 1;
    pointer-events: auto;
}

.delete {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
}

.delete:hover {
    border-radius: 4px;
    background-color: #e93232e9;
}
</style>