<template>
    <div id="idea-post">
        <BaseCard>
            <form @submit.prevent="postIdea">
                <div class="form-header">
                    <h1>Post New Idea</h1>
                </div>
                <div class="form-control" :class="{invalid: !formData.title.isValid}">
                    <label for="title">Title</label>
                    <p v-if="!formData.title.isValid">title should not be empty</p>
                    <input type="text" id="title" name="title" v-model.trim="formData.title.val" @blur="clearValidity('title')">
                </div>
                <div class="form-control">
                    <InputTag :tags="tags" :maximum="5" />
                </div>
                <div class="form-control" :class="{invalid: !formData.overview.isValid}">
                    <label for="overview">Overview</label>
                    <p v-if="!formData.overview.isValid">Idea overview should not be empty</p>
                    <textarea id="overview" name="overview" rows="10" cols="30" v-model.trim="formData.overview.val" @blur="clearValidity('overview')"></textarea>
                </div>
                <div class="form-control">
                    <label for="background">Background</label>
                    <textarea id="background" name="background" rows="10" cols="30" v-model.trim="formData.background.val"></textarea>
                </div>
                <div class="form-control">
                    <label for="passion">Passion</label>
                    <textarea id="passion" name="passion" rows="10" cols="30" v-model.trim="formData.passion.val"></textarea>
                </div>
                <div class="form-control idea-img">
                    <img class="preview-img" :src="previewImgSrc">
                    <input class="image-input" type="file" @change="imageSelect" accept="image/*">
                </div>

                <div class="btns">
                    <router-link class="back" to="/">Back to HOME</router-link>
                    <BaseButton class="btn post">Post</BaseButton>
                    <BaseButton type="button" class="btn save">Save</BaseButton>
                </div>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import InputTag from '@/components/Tag/InputTag.vue';

export default {
    components: {
        InputTag,
    },
    data() {
        return {
            ideaId: null,
            isFormValid: true,
            previewImage: null,
            selectedImage: null, 
            formData: {
                title: {
                    val: '',
                    isValid: true,
                },
                overview: {
                    val: '',
                    isValid: true,
                },
                background: {
                    val: '',
                },
                passion: {
                    val: '',
                }
            },
            tags: []
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        previewImgSrc() {
            return this.previewImage === null ? require('@/assets/images/image.png') : this.previewImage;
        }
    },
    methods: {
        clearValidity(input) {
            this.formData[input].isValid = true;
        },
        formValidation() {
            this.isFormValid = true;

            if (this.formData.title.val === '') {
                this.formData.title.isValid = false;
                this.isFormValid = false;
            }

            if (this.formData.overview.val === '') {
                this.formData.overview.isValid = false;
                this.isFormValid = false;
            }
        },
        postIdea() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const ideaData = {
                user_id: this.userId,
                title: this.formData.title.val,
                overview: this.formData.overview.val,
                background: this.formData.background.val,
                passion: this.formData.passion.val,
                idea_image: this.selectedImage,
                state: "post"
            }
            apiHelper.postIdea(ideaData)
            .then( res => {
                this.ideaId = res.idea_id;

                for (const tag of this.tags) {
                    apiHelper.postIdeaTag(this.ideaId, tag)
                }

                // 詳細ページに画面遷移
                this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
            }).catch( err => {
                console.log("error to post new idea: ", err);
            });
        },
        imageSelect(event) {
            this.selectedImage = event.target.files[0];
            if (this.selectedImage != null) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(this.selectedImage);
            } else {
                this.previewImage = null;
            }
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 80rem;
    padding: 2rem
}

form h1 { 
    font-size: 28px;
}

.form-header {
    margin-bottom: 3rem;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.form-control label,
.form-control .input-tag >>> label { 
    text-align: left;
    display: block;
    margin: 0;
    font-size: 20px;
    font-weight: bold;
}

.form-control input:not(.image-input),
.form-control .input-tag >>> input[type="text"] {
    font-size: 16px;
    width: 100%;
    padding-left: 0.5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #aaaaaa;
}

.form-control input:focus:not(.image-input),
.form-control .input-tag >>> input[type="text"]:focus {
    border-bottom: 2px solid #ffb01e;
}

.form-control textarea {
    font-size: 16px;
    padding: .5rem;
    width: 100%;
    outline: none;
    border: 1px solid #aaaaaa99;
}

.form-control textarea:focus {
    border: 2px solid #ffb01e99;
}

.idea-img .preview-img {
    display: block;
    margin: 0 auto;
    max-width: 480px;
    width: auto;
    height: auto;
    margin-bottom: 1rem;
}

.btns {
    margin-top: 4rem;
}

.back {
    display: block;
    text-decoration: none;
    color: #ffb01d;
}

.btn {
    display: inline-block;
    margin: 1rem;
    width: 30%;
    transition: all .25s ease-in;
}

.post {
    background-color: #ffeece;
}

.post:hover {
    background-color: #ffe0a7;
}

.save {
    background-color: #eeeeee;
}

.save:hover {
    background-color: #dddddd;
}

.invalid p {
    color: #ff4a4a;
}
</style>