<template>
    <div id="idea-detail">
        <BaseCard>
            <div class="container title">
                <h2>{{ idea.idea_title }}</h2>
                <router-link :to="userLink"><img :src="user.prof_img" alt="profile"></router-link>
            </div>
            <div class="container overview">
                <p>{{ idea.idea_str }}</p>
            </div>
            <div class="container skills">
                <BaseSkill
                    class="skill"
                    v-for="skill in skillList"
                    :key="skill.skill_id"
                    :tagname="skill.skill_name"
                ></BaseSkill>
            </div>
            <div class="comment-container">
                <Comment :v-if="commentVisibility"
                    v-for="comment in commentList"
                    :key="comment.comment_id"
                    :username="user.username"
                    :date="comment.comment_date"
                    :message="comment.comment"
                ></Comment>
            </div>
        </BaseCard>
    </div>
</template>

<script>
import Comment from '@/components/Idea/Comment.vue';

export default {
    components: {
        Comment,
    },
    data() {
        return {
            idea: null,
            skillList: [],
            commentList: [],
        };
    },
    props: ['ideaId'],
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.user.userId }};
        },
        commentVisibility() {
            return this.commentList.length > 0;
        },
        user() {
            return this.$store.getters['user/user'];
        },
        ideas() {
            return this.$store.getters['idea/ideas'];
        },
        requiredSkills() {
            return this.$store.getters['idea/requiredSkills'];
        },
        comments() {
            return this.$store.getters['idea/comments'];
        }
    },
    methods: {
        loadIdea(ideaId) {
            this.idea = this.ideas.find(idea => idea.idea_id == ideaId);
            
            // アイデア投稿者の情報を取得
            const ideaUserId = this.idea.user_id;
            this.$store.dispatch('user/loadUserData', {
                userId: ideaUserId
            }).catch( errorMsg => {
                console.log("fail to get user data. \n" + errorMsg);
            });
            
            for (const skill of this.requiredSkills) {
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
    max-width: 60rem;
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
</style>