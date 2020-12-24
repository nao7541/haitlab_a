<template>
    <div id="idea-detail">
        <MessageModal v-if="messageModalState" :userTo="userDetail.user_id"></MessageModal>
        <div class="idea" v-if="loadComplete">
            <main>
                <section class="container idea-header">
                    <div class="title">
                        <h1>{{ ideaDetail.title }}</h1>
                    </div>
                    <div class="operation" v-if="this.isMyIdea">
                        <div class="publish" v-if="this.ideaDetail.state === 'draft'">
                            <button @click="publishIdea">公開する</button>
                        </div>
                        <div class="edit">
                            <button @click="editIdea">編集する</button>
                        </div>
                        <div class="delete">
                            <button @click="deleteIdea">削除する</button>
                        </div>
                    </div>
                    <div class="tags">
                        <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                    </div>
                </section>

                <section class="idea-body">
                    <IdeaDetailTab />
                    <router-view />
                </section>
            </main>
            <section class="right-sidebar">
                <div class="content">
                    <div class="profile">
                        <div class="profile-image">
                            <router-link :to="userLink"><img :src="userDetail.prof_img"></router-link>
                        </div>
                        <h1>{{ userDetail.username }}</h1>
                        <div class="intro">
                            <p>{{ userDetail.intro }}</p>
                        </div>
                    </div>
                    <div class="message" v-if="!isMyIdea">
                        <MessageButton />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaDetailTab from '@/components/Idea/IdeaDetailTab.vue';
import MessageModal from '@/components/Message/MessageModal.vue';
import MessageButton from '@/components/Message/MessageButton.vue';

export default {
    components: {
        IdeaDetailTab,
        MessageModal,
        MessageButton,
    },
    data() {
        return {
            // general
            loadComplete: false,
            // user
            userDetail: null,
            // idea
            isMyIdea: false,
            ideaDetail: null,
            ideaId: null,
            // tag
            tags: [],
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
        },
        editLink() {
            return { name: 'editIdea', params: { ideaId: this.ideaId }};
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        messageModalState() {
            return this.$store.getters['modal/modalState'];
        }
    },
    methods: {
        publishIdea() {
            apiHelper.publishIdea(this.ideaDetail, this.ideaId)
            .then(() => {
                this.$router.replace('/');  
            }).catch( err => {
                console.log("error to publish idea: ", err);
            })
        },
        editIdea() {
            // アイデア編集ページに遷移する
            this.$router.replace(this.editLink);
        },
        deleteIdea() {
            apiHelper.deleteIdea(this.ideaId)
            .then(() => {
                // 削除後はideasページに遷移
                this.$router.replace({ name: 'ideas' });
            }).catch( err => {
                console.log("error to delete idea: ", err);
            })
        },
    },
    created() {
        // router paramsより本アイデアのideaIdを取得
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            // idea情報を取得
            this.ideaDetail = res;

            // 取得したアイデア情報より、自分のアイデアかを確認
            if (this.myUserId == this.ideaDetail.user_id) {
                this.isMyIdea = true;
            }

            // tag情報を取得
            return apiHelper.loadIdeaTags(this.ideaDetail.idea_id);
        }).then( res => {
            this.tags = res;

            return apiHelper.loadUserDetail(this.ideaDetail.user_id);
        }).then( res => {
            // user情報を取得
            this.userDetail = res;

            // 必要なロードが完了
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load idea detail: ", err);
        });
    }}
</script>

<style scoped>
.idea {
    width: 80%;
    margin: 0 auto;
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
}

main {
    width: 100%;
}

.container {
    padding: 1rem;
}

.idea-header {
    margin-bottom: 1rem;
    text-align: left;
    color: #000;
}

.idea-header .title {
    font-size: 26px;
    margin-bottom: 0.5rem;
}

.idea-header .edit {
    margin: 1rem 0;
}

.idea-header .operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.idea-header button {
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    margin-right: 1rem;
}

.idea-header .publish button {
    background-color: #ffbb3c;
}

.idea-header .publish button:hover {
    background-color: #d89e32;
}

.idea-header .edit button {
    background-color: #12da00;
}

.idea-header .edit button:hover {
    background-color: #0fb800;
}

.idea-header .delete button {
    background-color: #da0000;
}

.idea-header .delete button:hover {
    background-color: #b80000;
}

.idea-header .tags::after {
    content: "";
    display: block;
    clear: both;
}

.idea-header .tags .base-tag {
    background-color: #fff;
}

.idea-body {
    background-color: #fff;
}

.right-sidebar {
    width: 20rem;
    padding: 1rem;
    margin-left: 2rem;
    text-align: center;
}

.right-sidebar .content {
    background-color: #fff;
    padding: 1rem;
}

.right-sidebar .profile-image {
    width: 100%;
    height: 7rem;
    position: relative;
}

.right-sidebar .profile-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.right-sidebar .profile h1 {
    font-size: 24px;
    font-weight: bold;
}

.right-sidebar .profile .intro {
    text-align: left;
    margin-top: 1rem;
}

.right-sidebar .message {
    margin-top: 1.5rem;
}
</style>