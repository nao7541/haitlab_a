<template>
    <div id="settings">
        <BaseCard>
            <form @submit.prevent="updateProfile" v-if="loadComplete">
                <h1>Edit My Profile</h1>
                <div class="form-control profile-image">
                    <img :src="previewImgSrc" alt="profile">
                    <input class="image-input" type="file" @change="imageSelect" accept="image/*">
                </div>
                <div class="form-control" :class="{invalid: !formData.username.isValid}">
                    <label for="username">username</label>
                    <p v-if="!formData.username.isValid">username should not be empty</p>
                    <input type="text" id="username" name="username" v-model.trim="formData.username.val" @blur="clearValidity('username')">
                </div>
                <div class="form-control" :class="{invalid: !formData.univ.isValid}">
                    <label for="univ">university</label>
                    <p v-if="!formData.univ.isValid">university should not be empty</p>
                    <input type="text" id="univ" name="univ" v-model.trim="formData.univ.val" @blur="clearValidity('univ')">
                </div>
                <div class="form-control">
                    <label for="major">major</label>
                    <input type="text" id="major" name="major" v-model.trim="formData.major">
                </div>
                <div class="form-control">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" v-model.trim="formData.email">
                </div>
                <div class="form-control">
                    <label for="intro">Self Introduction</label>
                    <textarea id="intro" name="intro" rows="10" cols="30" v-model.trim="formData.intro"></textarea>
                </div>
                <div class="form-control">
                    <InputTag :tags="inputTags" :maximum="5"/>
                </div>
                <BaseButton class="submit-btn">Update</BaseButton>
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
            userDetail: null,
            loadComplete: false,
            isFormValid: true,
            selectedImage: null,
            previewImage: null,
            formData: {
                username: {
                    val: '',
                    isValid: true,
                },
                univ: {
                    val: '',
                    isValid: true,  
                },
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
        previewImgSrc() {
            return this.previewImage === null ? require('@/assets/images/person.png') : this.previewImage;
        }
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            return apiHelper.loadUserTags(this.userId);
        }).then( res => {
            // tag_nameのみを取り出す
            this.tags = res;
            this.inputTags = res.map((tag) => tag.tag_name);

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
            this.formData.univ.val = this.userDetail.univ_name;
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
                if (this.userDetail.prof_img != null) {
                    this.previewImage = this.userDetail.prof_img;
                } else {
                    this.previewImage = null;
                }
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

            if (this.formData.univ.val === '') {
                this.formData.univ.isValid = false;
                this.isFormValid = false;
            }
        },
        arrayEqual(x, y) {
            if (!Array.isArray(x)) return false;
            if (!Array.isArray(y)) return false;
            if (x.length != y.length) return false;
            for (const item of x) {
                if (!y.includes(item)) return false;
            }
            return true;
        },
        updateProfile() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const updateData = {
                userId: this.userId,
                username: this.formData.username.val,
                email: this.formData.email,
                prof_img: this.selectedImage,
                intro: this.formData.intro,
                univ_name: this.formData.univ.val,
                major: this.formData.major,
            };
            
            // userDetailの更新
            apiHelper.updateUserDetail(updateData)
            .then( () => {
                const tag_names = this.tags.map((tag) => tag.tag_name);
                // step1 タグの更新の有無を確認
                if (this.arrayEqual(tag_names, this.inputTags)) {
                    return;
                }

                // step2 追加された要素を確認
                const newTags = [];
                for (const tag of this.inputTags) {
                    if (!tag_names.includes(tag)) {
                        newTags.push(tag);
                    }
                }

                // step3 削除された要素を確認
                const delTags = [];
                for (const tag of tag_names) {
                    if (!this.inputTags.includes(tag)) {
                        // 配列に追加するのはタグ名でなく、タグのid
                        const target = this.tags.find((t) => {
                            return t.tag_name == tag
                        });
                        delTags.push(target.tag_id);
                    }
                }

                // step4 削除された要素があればideaTagMapより削除する
                // TODO django-filterないと無理だね。userTagMapにてtag_idに対して消さないといけないから
                // if (delTags.length > 0) {
                //     for (const tag of delTags) {
                        
                //     }
                // }

            }).catch( err => {
                console.log("error to update user detail: ", err);
            })

            // 設定変更後は自分のプロフィール画面に戻る
            this .$router.replace({ name: 'userprofile', params: { userId: this.userId} });
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 30rem;
    padding: 2rem
}

form h1 { 
    font-size: 28px;
}

.form-control {
    margin: 0.5rem 0;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.profile-image {
    margin: 2rem 0;
}

.profile-image img {
    max-width: 128px;
    max-height: 128px;
    width: auto;
    height: auto;
    border-radius: 128px;
}

.profile-image input {
    margin: 0 auto;
    display: block;
}

.form-control label { 
    text-align: left;
    display: block;
    margin: 0;
    font-weight: bold;
}

.form-control input:not(.image-input) {
    font-size: 16px;
    width: 100%;
    padding: .5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #aaaaaa;
}

.form-control input:focus:not(.image-input) {
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

.submit-btn {
    margin-top: 4rem;
    background-color: #ffeece;
}

.submit-btn:hover {
    transition: all .25s ease-in;
    background-color: #ffe0a7;
}

.invalid p {
    color: #ff4a4a;
}
</style>