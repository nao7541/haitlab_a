<template>
    <div class="idea-element">
        <div class="profile">
            <router-link :to="userLink"><img src="@/assets/images/avatar1.png" alt="image"></router-link>
        </div>
        <div class="card-body">
            <div class="skills">
                <BaseTag
                    v-for="skill in skillsList"
                    :key="skill.skill_id"
                    :tagname="skill.skill_name"
                    class="skill-tag"
                ></BaseTag>
            </div>
            <div class="title">
                <h2>{{ title }}</h2>
            </div>
            <div class="content">
                <p>{{ content }}</p>
            </div>
            <div class="detail-button">
                <BaseButton @click="moveDetail">詳細</BaseButton>
            </div>
            <div class="footer">
                <small>{{ date }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import BaseTag from '@/components/UI/BaseTag.vue';

export default {
    components: {
        BaseTag,
    },
    data() {
        return {
            skillsList: [],
        };
    },
    computed: {
        detailLink() {
            return { name: 'idea', params: { ideaId: this.idea_id } };
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.user_id }}
        },
        requiredSkills() {
            return this.$store.getters['idea/requiredSkills'];
        }
    },
    props: ['idea_id', 'user_id', 'title', 'content', 'date'],
    methods: {
        moveDetail() {
            this.$router.push('/ideas/' + this.idea_id);
        }
    },
    created() {
        for (const skill of this.requiredSkills) {
            if (skill.idea_id == this.idea_id) {
                this.skillsList.push(skill);
            }
        }
    }
}
</script>

<style scoped>
.idea-element {
    width: 45%;
    text-align: center;
    background-color: #ffffff;
    margin: 2rem auto;
}

.idea-element:hover {
    transition: all 0.25s ease-in;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

.profile {
    background-color: #f7f2e9;
}

.profile img{
    width: 128px;
    height: 128px;
    border-radius: 128px;
    margin: 1rem 0;
    cursor: pointer;
}

.card-body {
    background: linear-gradient(to top, #ffe0a7, #ffeece);
    display: grid;
    grid-template-rows: 0.1fr 1fr 1.2fr .25fr 0.1fr;
    grid-template-areas:
                "skills"
                "title"
                "content"
                "detail"
                "footer";
}

.card-body .skills {
    grid-area: skills;
    display: flex;
    flex: wrap;
}

.card-body .skills .skill-tag {
    margin: 0 auto;
}

.card-body .title {
    grid-area: title;
    padding: 0 1rem;
    height: 5rem;
}

.card-body .title h2 {
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #000000;
}

.card-body .content {
    grid-area: content;
}

.card-body .detail-button {
    grid-area: detail;
}

.card-body .detail-button button {
    width: 60%;
}

.card-body .detail-button button:hover {
    background-color: #f5f5f5;
}

.card-body .detail-button button:focus {
    background-color: #eeeeee;
}

.card-body .footer {
    grid-area: footer;
    text-align: right;
    padding: 1rem 2rem 1rem 0;
}
</style>