<template>
    <div class="idea-form">
        <form class="form-container" @submit.prevent="postIdea">
            <section class="wrapper title">
                <div class="content">
                    <h1>タイトル</h1>
                    <p v-if="!title.isValid" class="invalid">タイトルは必須です</p>
                    <div class="input-box">
                        <input type="text" placeholder="魅力的なタイトルをつけよう" v-model="title.val" @blur="clearValidity('title')">
                    </div>
                </div>
            </section>
            <section class="wrapper overview">
                <div class="content">
                    <h1>概要</h1>
                    <ResizableTextarea v-model="overview"/>
                </div>
            </section>
            <!-- <section class="wrapper target">
                <div class="content">
                    <h1>ターゲット</h1>
                    <input type="text" placeholder="ターゲットは?" v-model="target">
                </div>
            </section> -->
            <section class="wrapper image">
                <div class="content">
                    <h1>画像</h1>
                    <input class="image-input" type="file" @change="uploadImage" accept="image/*">
                </div>
            </section>
            <section class="wrapper background">
                <div class="content">
                    <h1>背景</h1>
                    <ResizableTextarea v-model="background"/>
                </div>
            </section>
            <section class="wrapper offer">
                <div class="content">
                    <h1>募集要件</h1>
                    <ResizableTextarea v-model="offer"/>
                </div>
            </section>
            <section class="wrapper tag-input">
                <div class="content">
                    <h1>タグ</h1>
                    <IdeaFormInputTag :tags="inputTags" :maximum="5" />
                </div>
            </section>
            <section class="wrapper passion">
                <div class="content">
                    <h1>熱意</h1>
                    <ResizableTextarea v-model="passion"/>
                </div>
            </section>
            <section class="wrapper end">
                <div class="content">
                    <h1>お疲れ様でした!</h1>
                    <div class="home">
                        <router-link to="/">保存せずに終了</router-link>
                    </div>
                    <div class="form-buttons">
                        <button class="post-btn">投稿する</button>
                        <button class="save-draft-btn" type="button" @click="saveDraft">下書きを保存する</button>
                    </div>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js'
import IdeaFormInputTag from '@/components/Tag/IdeaFormInputTag.vue';
import ResizableTextarea from '@/components/Idea/ResizableTextarea.vue';

export default {
    components: {
        IdeaFormInputTag,
        ResizableTextarea,
    },
    props: {
        ideaId: { required: false, default: null },
        formType: { type: String, required: true }, // edit or post
    },
    data() {
        return {
            retIdeaId: null, // ideaをpostもしくはputしてreturnされてきた結果より取得したID
            uploadedImage: null,
            isFormValid: true,
            title: {
                val: '',
                isValid: true,
            },
            overview: '',
            background: '',
            passion: '',
            offer: '',
            previewImage: null,
            tags: [], // 現時点でDBに書くのされているtags
            inputTags: [], // ユーザーの入力を反映したtags
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        formValidation() {
            this.isFormValid = true;

            if (this.title.val === '') {
                this.isFormValid = false;
                this.title.isValid = false;
            }
        },
        registerIdea(state) {
            const ideaData = {
                user_id: this.userId,
                title: this.title.val,
                overview: this.overview,
                background: this.background,
                passion: this.passion,
                idea_image: this.uploadedImage,
                state: state,
                target: this.target,
                offer: this.offer,
            }

            if (this.formType === 'new') {
                // Ideaをpostする
                apiHelper.postIdea(ideaData)
                .then( res => {
                    this.retIdeaId = res.idea_id;

                    // 新規アイデアの場合はそのままtagの追加
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(apiHelper.postIdeaTag(this.retIdeaId, tag));
                    }
                    return Promise.all(promises);
                }).then( () => {
                    this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.retIdeaId } });
                }).catch( err => {
                    console.log("error to post new idea: ", err);
                });
            } else if (this.formType === 'edit') {
                // Ideaをputする
                apiHelper.putIdea(ideaData, this.ideaId)
                .then( res => {
                    this.retIdeaId = res.idea_id;

                    if (this.inputTags.length == 0) return

                    // 元々タグがない場合はそのままpost
                    if (this.tags == null) {
                         const promises = [];
                        for (const tag of this.inputTags) {
                            promises.push(apiHelper.postIdeaTag(this.retIdeaId, tag));
                        }

                        Promise.all(promises)
                        .then( () => {
                            this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.retIdeaId } });
                        }).catch( err => {
                            console.log("error to post new idea: ", err);
                        });
                    } else if (!utils.arrayEqual(this.tags, this.inputTags) ) {
                        // もし元々のタグから変更があるなら全部消してから全てを追加する
                        apiHelper.deleteAllIdeaTag(this.retIdeaId)
                        .then(() => {
                            const promises = [];
                            for (const tag of this.inputTags) {
                                promises.push(apiHelper.postIdeaTag(this.retIdeaId, tag));
                            }

                            return Promise.all(promises)
                        }).then( () => {
                            // reload
                            this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.retIdeaId } });
                        }).catch(err => {
                            console.log("error to update tag: ", err)
                        })
                    } else {
                        this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.retIdeaId } });
                    }
                }).catch( err => {
                    console.log("error to post new idea: ", err);
                });
            }
        },
        postIdea() {
            // 投稿できるか否かの確認
            this.formValidation();
            if (!this.isFormValid) {
                return;
            }

            // パラメータとしてpostを設定
            this.registerIdea("post");
        },
        saveDraft() {
            // 下書き保存できるか否かの確認
            this.formValidation();
            if (!this.isFormValid) {
                return;
            }

            // パラメータとしてdraftを設定
            this.registerIdea("draft");
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
        }
    },
    created() {
        // 編集の場合は、既存のデータをまず読み込む
        if (this.formType === 'edit') {
            apiHelper.loadIdeaDetail(this.ideaId)
            .then( res => {
                // ideaの詳細を読み込み
                const idea = res;
                this.title.val = idea.title;
                this.overview = idea.overview;
                this.background = idea.background;
                this.passion = idea.passion;
                this.offer = idea.offer;
                this.previewImage = idea.idea_image;

                return apiHelper.loadIdeaTags(this.ideaId)
            }).then( res => {
                // タグの読み込み
                this.tags = res.map( (tag) => tag.tag_name );
                this.inputTags = this.tags.slice(); // 値渡し

                this.loadComplete = true;
            }).catch( err => {
                console.log("error to load IdeaDetail at EditIdeaPage: ", err);
            })
        }
    }
}
</script>

<style scoped>
.idea-form {
    overflow: hidden;
}

.form-container {
    position: relative;
    width: 100%;
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: scroll;
}

.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.content h1 {
    font-weight: bold;
    font-size: 28px;
    transform: translateY(-15px);
}

.content input[type="text"] {
    font-size: 25px;
    width: 30rem;
    height: 3rem;
    line-height: 3rem;
    outline: none;
    border-bottom: 1px solid #000;
}

.content input[type="text"]:focus {
    border-bottom: 2px solid #ffbb3c;
}

.title {
    background: linear-gradient(to bottom, #f7f2e9, #ffebc6);
}

.overview {
    background: linear-gradient(to bottom, #ffebc6, #ffe1a8);
}

.image {
    background: linear-gradient(to bottom, #ffe1a8, #ffd483) ;
}

.background {
    background: linear-gradient(to bottom, #ffd483, #ffcb6b);
}

.offer {
    background: linear-gradient(to bottom, #ffcb6b, #ffc559);
}

.tag-input {
    background: linear-gradient(to bottom, #ffc559, #ffc14e);
}

.passion {
    background: linear-gradient(to bottom, #ffc14e, #ffb429);
}

.end {
    background: linear-gradient(to bottom, #ffb429, #ffaf1a);
}

.form-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.form-buttons button {
    width: 15rem;
    height: 3.5rem;
    border-radius: 2px;
    font: inherit;
    font-size: 20px;
    font-weight: bold;
    margin: 0 2rem;
    outline: none;
}

.post-btn {
    background-color: #fff;
}

.post-btn:hover,
.post-btn:active { 
    background-color: #eee;
}

.save-draft-btn {
    background-color: #ddd;
}

.save-draft-btn:hover,
.save-draft-btn:active { 
    background-color: #ccc;
}

.home {
    margin-bottom: 1rem;
}

.home a {
    text-decoration: none;
    color: #f00;
}

.invalid { 
    color: #f00;
}
</style>