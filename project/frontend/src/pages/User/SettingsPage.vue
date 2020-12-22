<template>
    <div id="settings">
        <BaseCard>
            <form @submit.prevent="updateProfile" v-if="loadComplete">
                <h1>プロフィール編集</h1>
                <div class="form-control profile-image">
                    <img :src="previewImage" alt="profile">
                    <input class="image-input" type="file" @change="imageSelect" accept="image/*">
                </div>
                <div class="form-control" :class="{invalid: !formData.username.isValid}">
                    <label for="username">ユーザー名</label>
                    <p v-if="!formData.username.isValid">username should not be empty</p>
                    <input type="text" id="username" name="username" v-model.trim="formData.username.val" @blur="clearValidity('username')">
                </div>
                <div class="form-control">
                    <label for="univ">大学</label>
                    <input type="text" id="univ" name="univ" v-model.trim="formData.univ">
                </div>
                <div class="form-control">
                    <label for="major">学部・専攻</label>
                    <input type="text" id="major" name="major" v-model.trim="formData.major">
                </div>
                <div class="form-control">
                    <label for="email">メールアドレス</label>
                    <input type="email" id="email" name="email" v-model.trim="formData.email">
                </div>
                <div class="form-control">
                    <label for="intro">一言</label>
                    <ResizableTextarea idea="intro" v-model="formData.intro"/>
                </div>
                <div class="form-control">
                    <InputTag tagLabel="タグ" :tags="inputTags" :maximum="5"/>
                </div>
                <BaseButton class="submit-btn">更新</BaseButton>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js';
import InputTag from '@/components/Tag/InputTag.vue';
import ResizableTextarea from '@/components/Idea/ResizableTextarea.vue';

export default {
    components: {
        InputTag,
        ResizableTextarea
    },
    data() {
        return {
            loadComplete: false,
            isFormValid: true,
            selectedImage: null,
            previewImage: null,
            formData: {
                username: {
                    val: '',
                    isValid: true,
                },
                univ: '',
                major: '',
                email: null,
                intro: '',
            },
            tags: [],    // 現時点でDBに格納されているtags
            inputTags: [], // ユーザーの入力を反映したtags
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            return apiHelper.loadUserTags(this.userId);
        }).then( res => {
            // tag_nameのみを取り出す
            if (res != null) {
                this.tags = res.map((tag) => tag.tag_name);
                this.inputTags = this.tags.slice(); // 値渡し
            }

            this.initUserForm();
            this.loadComplete = true;
        }).catch (err => {
            console.log("error to load user detail at setting page: ", err);
        })
    },
    methods: {
        initUserForm() {
            // すでに登録されている情報をフォームに反映する
            this.formData.username.val = this.userDetail.username;
            this.formData.univ = this.userDetail.univ_name;
            this.formData.major = this.userDetail.major;
            this.formData.email = this.userDetail.email;
            this.formData.intro = this.userDetail.intro;

            if (this.userDetail.prof_img != null) {
                this.previewImage = this.userDetail.prof_img;
            }
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
                this.previewImage = this.userDetail.prof_img;
            }
        },
        clearValidity(input) {
            this.formData[input].isValid = true;
        },
        formValidation() {
            this.isFormValid = true;

            if (this.formData.username.val === '') {
                this.formData.username.isValid = false;
                this.isFormValid = false;
            }
        },
        updateProfile() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const updateData = {
                userDetail: null,
                userId: this.userId,
                username: this.formData.username.val,
                email: this.formData.email,
                prof_img: this.selectedImage,
                intro: this.formData.intro,
                univ_name: this.formData.univ,
                major: this.formData.major,
            };
            
            // userDetailの更新
            apiHelper.updateUserDetail(updateData)
            .catch( err => {
                console.log("error to update user detail: ", err);
            })

            // タグの追加 / 更新
            if (this.inputTags == null) return;

            // もしタグ未登録なら追加して終了
            if (this.tags == null) {
                const promises = [];
                for (const tag of this.inputTags) {
                    promises.push(apiHelper.postUserTag(this.userId, tag));
                }
                Promise.all(promises)
                .then( () => {
                    // reload
                    this.$router.go({ name: 'userprofile', params: { userId: this.userId }});   
                }).catch( err => {
                    console.log("error to post userTag: ", err);
                })
            } else if (!utils.arrayEqual(this.tags, this.inputTags) ) {
                // もしタグに変更があるなら既存のタグを全削除してから、新しいタグを追加する
                apiHelper.deleteAllUserTag(this.userId)
                .then( () => {
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(apiHelper.postUserTag(this.userId, tag));
                    }

                    return Promise.all(promises)
                }).then( () => {
                    // reload
                    this.$router.go({ name: 'userprofile', params: { userId: this.userId }});
                }).catch(err => {
                    console.log("error to update tag: ", err)
                })
            } else {
                // reload
                this.$router.go({ name: 'userprofile', params: { userId: this.userId }});
            }
        }
    }
}
</script>

<style scoped>
#settings {
    padding: 2rem 0;
}

.card {
    max-width: 40rem;
    padding: 2rem
}

form h1 { 
    font-size: 28px;
    margin-bottom: 2rem;
}

.form-control {
    margin-bottom: 1.25rem;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.profile-image {
    margin: 2rem 0;
}

.profile-image img {
    width: 128px;
    height: 128px;
    border-radius: 128px;
}

.profile-image input {
    margin: 0 auto;
    display: block;
}

.form-control label { 
    font-size: 17px;
    font-weight: bold;
    text-align: left;
    display: block;
    margin-bottom: 0.25rem
}

.form-control input:not(.image-input) {
    font-size: 16px;
    width: 100%;
    line-height: 1.5rem;
    padding-left: 0.5rem;
    outline: none;
    border-bottom: 1px solid #aaa;
}

.form-control input:focus:not(.image-input) {
    border-bottom: 2px solid #ffb01e;
}

.form-control textarea {
    font-size: 16px;
    width: 100%;
    border-color: #aaa;
}

.form-control textarea:focus {
    border-color: #ffb01e;
    border-bottom-width: 2px;
}

.submit-btn {
    font-size: 18px;
    font-weight: bold;
    margin-top: 4rem;
    background-color: #ffeece;
}

.submit-btn:hover {
    background-color: #ffe0a7;
}

.invalid p {
    color: #ff4a4a;
}

.invalid input {
    border-color: #ff3535;
}
</style>