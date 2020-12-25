<template>
    <div id="idea-overview" v-if="loadComplete">
        <div class="container">
            <div class="container-title">
                <h3>概要</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.overview }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>ターゲット</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.target }}</p>
            </div>
        </div>
        <div class="container">
            <div class="image__header">
                <div class="container-title">
                    <h3>イメージ</h3>
                </div>
                <BaseEditButton  @edit="editImage" v-if="isMyIdea"/>
            </div>
            <div class="image-modal" v-if="modalState.image">
                <BaseModal v-model="modalState.image">
                    <template #card>
                        <BaseForm title="イメージの挿入">
                            <input class="image-input" type="file" @change="uploadImage" accept="image/*">
                            <BaseModalButton @clickModalBtn="updateImage" />
                        </BaseForm>
                    </template>
                </BaseModal>
            </div>
            <div class="content" v-if="ideaShow">
                <img :src="ideaData.idea_image" alt="idea-image">
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import BaseEditButton from '../../components/UI/BaseEditButton.vue';

export default {
  components: { BaseEditButton },
    data() {
        return {
            isMyIdea: null,
            ideaId: null,
            ideaData: null,
            loadComplete: false,
            // ------ image ----- //
            uploadedImage: null, // uploadされた画像
            previewImage: null,  // preview用の画像
            // ------ modal ----- //
            modalState: {
                image: false,
            }
        }
    },
    computed: {
        ideaShow() {
            return this.ideaData.idea_image != null ? true : false
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    methods: {
        editImage() {
            this.modalState.image = true;
        },
        uploadImage(event) {
            this.uploadedImage = event.target.files[0];
            if (this.uploadedImage != null) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(this.uploadedImage);
            } else {
                this.previewImage = null;
            }
        },
        updateImage() {
            const data = {
                user_id: this.ideaData.user_id,
                title: this.ideaData.title,
                state: this.ideaData.state,
                idea_image: this.uploadedImage,
            }
            
            apiHelper.putImage(data, this.ideaId)
            .then( () => {
                this.$router.go({ name: 'overview', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to update image: ", err);
            })
        },
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            this.ideaData = res;

            if (this.ideaData.user_id == this.myUserId) {
                this.isMyIdea = true;
            }
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaOverviewPage: ", err);
        })
    },
    beforeRouteLeave(to, from, next) {
        this.modalState.image = false;
        next();
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 1rem;
}

.container-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
}

.image__header { 
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.image__header .container-title {
    margin-right: 0.5rem;
}

.content {
    padding: 1rem;
}

.content img {
    max-width: 800px;
    max-height: 600px;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>