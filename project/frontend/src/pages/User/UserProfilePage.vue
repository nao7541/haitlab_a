<template>
    <div id="user-profile">
        <BaseCard>
            <div class="side-content">
                <img src="@/assets/images/avatar1.png" alt="profile">
                <h3>{{ user.username }}</h3>
                <p>{{ user.univ_name}} / {{ user.major }}</p>
                <p>{{ user.contact }}</p>
            </div>
            <div class="main-content">
                <div class="intro">
                    <h3 class="topic">自己紹介</h3>
                    <p>{{ user.intro }}</p>
                </div>
                <div class="interests">
                    <h3 class="topic">興味 / 関心</h3>
                    <div class="interests-list">
                        <BaseTag 
                            v-for="interest in interestsList"
                            :key="interest.interest_id"
                            :tagname="interest.interest_name"
                        ></BaseTag>
                    </div>
                </div>
                <div class="skills">
                    <h3 class="topic">タグ</h3>
                    <div class="skills-list">
                        <BaseTag 
                            v-for="tag in tagList"
                            :key="tag.tag_id"
                            :tagname="tag.tag_name"
                        ></BaseTag>
                    </div>
                </div>
            </div>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseTag from '@/components/UI/BaseTag.vue';

export default {
    components: {
        BaseCard,
        BaseTag,
    },
    data() {
        return {
            user: null,
            tagList: [],
            interestsList: [],
        }
    },
    computed: {
        users() {
            return this.$store.getters['user/users'];
        },
        tags() {
            return this.$store.getters['user/tags'];
        },
        interests() {
            return this.$store.getters['user/interests'];
        }
    },
    created() {
        const userId = this.$route.params.userId;
        const selectedUser = this.users.find(user => user.user_id == userId);
        this.user = selectedUser;
        for (const tag of this.tags) {
            if (tag.user_id === selectedUser.user_id) {
                this.tagList.push(tag);
            }
        }
        for (const interest of this.interests) {
            if (interest.user_id === selectedUser.user_id) {
                this.interestsList.push(interest);
            }
        }
    }
}
</script>

<style scoped>
.card {
    width: 60%;
    display: flex;
}

.side-content {
    width: 35%;
    background: linear-gradient(to right, #ffe0a7, #ffeece);
    padding: 1rem 2rem;
}

.side-content img {
    width: 128px;
    height: 128px;
    border-radius: 128px;
}

.side-content h3 {
    font-size: 20px;
    margin-bottom: 3rem;
}

.side-content p {
    text-align: left;
}

.main-content {
    width: 65%;
    text-align: left;
    padding: 1rem;
}

.topic {
    font-weight: bold;
    border-bottom: 1px solid #cccccc;
}

.skills-list, .interests-list {
    display: flex;
    flex-wrap: wrap;
}
</style>