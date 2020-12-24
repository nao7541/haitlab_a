<template>
    <div id="message-display" v-if="loadComplete">
        <div class="title">
            <h3>{{ message.title }}</h3>
        </div>
        <div class="content">
            <p>{{ message.message }}</p>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
export default {
    data() {
        return {
            messageId: null,
            loadComplete: false,
            message: null,
        }
    },
    methods: {
        loadMessage() {
            this.loadComplete = false;
            this.messageId = this.$route.params['messageId'];

            apiHelper.loadMessage(this.messageId)
            .then( res => {
                this.message = res;

                this.loadComplete = true;
            }).catch( err => {
                console.log("error to load message: ", err);
            })
        }
    },
    created() {
        this.loadMessage();
    },
    watch: {
        $route() {
            this.loadMessage();
        }
    }
}
</script>

<style scoped>
#message-display {
    height: 100%;
    width: 100%;
    padding: 1rem;
    background-color: #fff;
}

</style>