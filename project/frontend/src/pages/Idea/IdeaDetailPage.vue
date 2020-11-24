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
        },
        ideas() {
            return this.$store.getters['idea/ideas'];
        },
        users() {
            return this.$store.getters['user/users'];
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
            const userId = this.idea.user_id;
            this.user = this.users.find(user => user.user_id == userId);
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