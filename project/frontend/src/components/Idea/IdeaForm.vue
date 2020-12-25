<template>
    <div class="idea-form">
        <form class="form-container">
            <section class="wrapper title">
                <div class="image-wrapper" />
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>タイトル</h1>
                        <h2>魅力的なタイトルをつけよう</h2>
                    </div>
                    <p v-if="!isFormValid" class="invalid">タイトルは必須です</p>
                    <input type="text" placeholder="" v-model="title" @blur="clearValidity">
                </div>
            </section>
            <section class="wrapper overview">
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>概要</h1>
                        <h2>分かりやすく説明しよう</h2>
                    </div>
                    <ResizableTextarea v-model="overview"/>
                </div>
                <div class="image-wrapper" />
            </section>
            <section class="wrapper target">
                <div class="image-wrapper" />
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>ターゲット</h1>
                        <h2>誰に届けたいのかを意識しよう</h2>
                    </div>
                    <ResizableTextarea v-model="target"/>
                </div>
            </section>
            <section class="wrapper background">
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>背景</h1>
                        <h2>ストーリーを語ろう</h2>
                    </div>
                    <ResizableTextarea v-model="background"/>
                </div>
                <div class="image-wrapper" />
            </section>
            <section class="wrapper value">
                <div class="image-wrapper" />
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>価値創造</h1>
                        <h2>生み出す価値を言葉にしよう</h2>
                    </div>
                    <ResizableTextarea v-model="createdValue"/>
                </div>
            </section>
            <section class="wrapper passion">
                <div class="form-wrapper">
                    <div class="sentence">
                        <h1>熱意</h1>
                        <h2>気持ちを表現しよう</h2>
                    </div>
                    <ResizableTextarea v-model="passion"/>
                </div>
                <div class="image-wrapper" />
            </section>
            <section class="wrapper end">
                <div class="image-wrapper" />
                <div class="closing">
                    <div class="sentence">
                        <h1>お疲れ様でした!</h1>
                        <h3>詳細ページでタグ、募集要件、質問などを追加しよう</h3>
                    </div>
                    <div class="form__btns">
                        <button class="post__btn" type="button" @click="postIdea">投稿</button>
                        <button class="savedraft__btn" type="button" @click="saveDraft">下書き保存</button>
                        <button class="notsave__btn" type="button" @click="notSave">保存せずに終了</button>
                    </div>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import ResizableTextarea from '@/components/Idea/ResizableTextarea.vue';

export default {
    components: {
        ResizableTextarea,
    },
    props: {
        ideaId: { required: false, default: null },
        formType: { type: String, required: true }, // edit or post
    },
    data() {
        return {
            retIdeaId: null, // ideaをpostもしくはputしてreturnされてきた結果より取得したID
            isFormValid: true,
            title: '',
            overview: '',
            target: '',
            background: '',
            createdValue: '',
            passion: '',
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
    },
    methods: {
        clearValidity() {
            this.isFormValid = true;
        },
        formValidation() {
            this.isFormValid = true;

            if (this.title.val === '') {
                this.isFormValid = false;
            }
        },
        registerIdea(state) {
            const ideaData = {
                user_id: this.myUserId,
                title: this.title,
                overview: this.overview,
                target: this.target,
                background: this.background,
                value: this.createdValue,
                passion: this.passion,
                state: state,
            }

            if (this.formType === 'new') {
                // Ideaをpostする
                apiHelper.postIdea(ideaData)
                .then( res => {
                    this.retIdeaId = res.idea_id;
                    this.$router.replace({ name: 'ideaDetail', params: { ideaId: this.retIdeaId } });
                }).catch( err => {
                    console.log("error to post new idea: ", err);
                });
            } else if (this.formType === 'edit') {
                // Ideaをputする
                apiHelper.putIdea(ideaData, this.ideaId)
                .then( res => {
                    this.retIdeaId = res.idea_id;
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
        notSave() {
            this.$router.replace('/');
        },
    },
    created() {
        // 編集の場合は、既存のデータをまず読み込む
        if (this.formType === 'edit') {
            apiHelper.loadIdeaDetail(this.ideaId)
            .then( res => {
                // ideaの詳細を読み込み
                const idea = res;
                this.title = idea.title;
                this.overview = idea.overview;
                this.target = idea.target;
                this.background = idea.background;
                this.createdValue = idea.value;
                this.passion = idea.passion;
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
    width: 100%;
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: scroll;
}

.wrapper {
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
    display: flex;
    justify-content: space-between;
}

.image-wrapper,
.form-wrapper {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-wrapper {
    background-size: 30rem;
    background-position: center;
    position: relative;
}

.title,
.target,
.value,
.end {
    background: linear-gradient(to left, #fff, #ffeece);
}

.overview,
.background,
.passion {
    background: linear-gradient(to right, #fff, #ffeece);
}

.title > .image-wrapper {
    background-image: url("~@/assets/images/title_bg.svg");
}

.overview > .image-wrapper {
    background-image: url("~@/assets/images/overview.svg");
}

.target > .image-wrapper {
    background-image: url("~@/assets/images/target.svg");
}

.background > .image-wrapper {
    background-image: url("~@/assets/images/background.svg");
}

.value > .image-wrapper {
    background-image: url("~@/assets/images/value.svg");
}

.passion > .image-wrapper {
    background-image: url("~@/assets/images/passion.svg");
}

.end > .image-wrapper {
    background-image: url("~@/assets/images/end.svg");
}

.sentence {
    width: 30rem;
    text-align: left;
    transform: translateY(-5rem);
}

.sentence h1 {
    color: #333;
    font-weight: bold;
    font-size: 38px;
}

.sentence h2 {
    color: #888;
    font-size: 26px;
}

.sentence h3 {
    color: #888;
}

.form-wrapper input[type="text"] {
    font-size: 25px;
    width: 30rem;
    line-height: 25px;
    outline: none;
    border-bottom: 1px solid #000;
}

.form-wrapper input[type="text"]:focus {
    border-bottom: 2px solid #ffa600;
}

.closing {
    width: 30rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form__btns {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.form__btns button {
    height: 3.5rem;
    min-width: 7rem;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    border: none;
}

.post__btn {
    background-color: #ffb01e;
    margin-right: 0.5rem;
}

.post__btn:hover,
.post__btn:active { 
    background-color: #ffa600;
}

.savedraft__btn {
    background-color: #ddd;
    margin-right: auto;
}

.savedraft__btn:hover,
.savedraft__btn:active { 
    background-color: #ccc;
}

.notsave__btn {
    color: red;
}

.notsave__btn:hover {
    color: #fff;
    background-color: red;
}

.invalid { 
    color: #f00;
}
</style>