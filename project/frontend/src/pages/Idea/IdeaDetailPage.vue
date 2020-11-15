<template>
    <div id="idea-detail">
        <BaseCard>
            <div class="container title">
                <h2>{{ idea.idea_title }}</h2>
                <router-link :to="userLink"><img src="@/assets/images/avatar1.png" alt="profile"></router-link>
            </div>
            <div class="container overview">
                <p>{{ idea.idea_str }}</p>
            </div>
            <div class="container skills">
                <BaseTag
                    class="skill"
                    v-for="skill in skillList"
                    :key="skill.skill_id"
                    :tagname="skill.skill_name"
                ></BaseTag>
            </div>
        </BaseCard>
        <BaseCard v-if="commentVisibility">
            <Comment
                v-for="comment in commentList"
                :key="comment.comment_id"
                :username="user.username"
                :date="comment.comment_date"
                :message="comment.comment"
            ></Comment>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseTag from '@/components/UI/BaseTag.vue';
import Comment from '@/components/Idea/Comment.vue';

export default {
    components: {
        BaseCard,
        BaseTag,
        Comment,
    },
    data() {
        return {
            users: [
                {
                    user_id: 0,
                    username: 'Tanaka',
                    intro: '田中です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: '情報学部',
                    prof_img: '../assets/images/avatar1.png',
                    contact: 'tanaka@example.com',
                },
                {
                    user_id: 1,
                    username: 'Yamada',
                    intro: '山田です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: 'デザイン学科',
                    prof_img: '../assets/images/avatar2.png',
                    contact: 'yamada@example.com',
                },
                {
                    user_id: 2,
                    username: 'Satoh',
                    intro: '佐藤です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: '理学部',
                    prof_img: '../assets/images/avatar3.png',
                    contact: 'sato@example.com',
                },
            ],
            ideas: [
                {
                    idea_id: 0,
                    user_id: 0,
                    idea_title: 'ロボットによる介護サービス',
                    idea_str: 'ロボットによる介護サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 1,
                    user_id: 0,
                    idea_title: '薬の宅配サービス',
                    idea_str: '薬の宅配サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 2,
                    user_id: 1,
                    idea_title: 'AI企業評価サービス',
                    idea_str: 'AI企業評価サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 3,
                    user_id: 1,
                    idea_title: 'AIによる古文翻訳サービス',
                    idea_str: 'AIによる古文翻訳サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 4,
                    user_id: 2,
                    idea_title: '店の混雑状況提示アプリの開発',
                    idea_str: '店の混雑状況提示アプリの開発',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 5,
                    user_id: 2,
                    idea_title: '方言翻訳サービス',
                    idea_str: '方言翻訳サービス',
                    idea_date: '2020-11-14',
                },
            ],
            requiredSkill: [
                {
                    skill_id: 0,
                    idea_id: 0,
                    skill_name: 'business'
                },
                {
                    skill_id: 1,
                    idea_id: 0, 
                    skill_name: 'design',
                },
                {
                    skill_id: 2,
                    idea_id: 1,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 3,
                    idea_id: 2, 
                    skill_name: 'design',
                },   
                {
                    skill_id: 4,
                    idea_id: 3,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 5,
                    idea_id: 3, 
                    skill_name: 'android app',
                },
                {
                    skill_id: 6,
                    idea_id: 4,
                    skill_name: 'business'
                },
                {
                    skill_id: 7,
                    idea_id: 5, 
                    skill_name: 'business',
                },
            ],
            comments: [
                {
                    comment_id: 0,
                    idea_id: 0,
                    user_id: 1,
                    comment_date: '2020-11-14',
                    comment: '凄い！面白いですね！'
                },
                {
                    comment_id: 1,
                    idea_id: 0,
                    user_id: 2,
                    comment_date: '2020-11-14',
                    comment: 'この考えは思いつきませんでした！'
                },
            ],
            idea: null,
            user: null, 
            skillList: [],
            commentList: [],
        };
    },
    props: ['ideaId'],
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.user.user_id }};
        },
        commentVisibility() {
            return this.commentList.length > 0;
        }
    },
    methods: {
        loadIdea(ideaId) {
            this.idea = this.ideas.find(idea => idea.idea_id == ideaId);
            const userId = this.idea.user_id;
            this.user = this.users.find(user => user.user_id == userId);
            for (const skill of this.requiredSkill) {
                if (skill.idea_id == this.idea.idea_id) {
                    this.skillList.push(skill);
                }
            }
            for (const comment of this.comments) {
                if (comment.idea_id == this.idea.idea_id) {
                    this.commentList.push(comment);
                }
            }
        }
    },
    created() {
        this.loadIdea(this.ideaId);
    },
    watch: {
        ideaId(newId) {
            this.loadIdea(newId);
        }
    }
}
</script>

<style scoped>
.card {
    width: 60%;
    padding: 2rem;
    text-align: left;
    background: linear-gradient(to top right, #ffe0a7, #ffffff);
}

.container {
    margin-bottom: 2rem;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title h2 {
    padding-bottom: 1rem;
    border-bottom: 1px solid #000000;
    flex-grow: 1;
}

.title img {
    width: 128px;
    height: 128px;
    border-radius: 128px;
    cursor: pointer;
    flex-basis: 128px;
}

.skills { 
    display: flex;
    flex-wrap: wrap;
}

.skill {
    margin: 0 .25rem;
}

.comment {
    margin: 1rem 0;
}
</style>