<template>
    <div id="user-profile">
        <BaseCard>
            <div class="side-content">
                <img :src="user.prof_img" alt="profile">
                <h3>{{ user.username }}</h3>
                <div class="edit-profile" v-if="isMyProfile">
                    <router-link to="/settings">
                        <span class="title">Edit Profile</span>
                        <FontAwesomeIcon :icon="['far', 'edit']" size="lg" />
                    </router-link>
                </div>
                <div class="info-container info-line">
                    <p class="info-title">univ</p>
                    <p>{{ user.univ_name }}</p>
                </div>
                <div class="info-container info-line">
                    <p class="info-title">major</p>
                    <p>{{ user.major }}</p>
                </div>
                <div class="info-container info-line">
                    <p class="info-title">email</p>
                    <a class="mail" :href="mailAddress">{{ user.email }}</a>
                </div>
            </div>
            <div class="main-content">
                <div class="intro">
                    <h3 class="topic">自己紹介</h3>
                    <p>{{ user.intro }}</p>
                </div>
                <div class="skills">
                    <h3 class="topic">スキル</h3>
                    <div class="skills-list">
                        <BaseSkill
                            v-for="tag in tagList"
                            :key="tag.tag_id"
                            :tagname="tag.tag_name"
                        ></BaseSkill>
                    </div>
                </div>
            </div>
        </BaseCard>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMyProfile: false,
            tagList: [],
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        user() {
            return this.$store.getters['user/user'];
        },
        skill() {
            return this.$store.getters['user/skill'];
        },
        mailAddress() {
            return "mailto:" + this.user.contact;
        }
    },
    methods: {
        
    },
    created() {
        // パラメータとして渡されたuserid
        const paramUserId = this.$route.params.userId;
        // ローカルに保存しているuserIdと比較して、自分のページか否かを確かめる
        if (paramUserId === this.userId) {
            // 自分のページであるならtrue
            this.isMyProfile = true;
        }

        // load userdata
        this.$store.dispatch('user/loadUserDetail', {
            userId: paramUserId
        });
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
    width: 200px;
    height: 200px;
    border-radius: 128px;
}

.side-content h3 {
    font-size: 20px;
}

.edit-profile {
    margin-bottom: 3rem;
}

.edit-profile a {
    text-decoration: none;
    color: #000;
    background-color: #6cdb51;
    padding: .5rem 1.5rem;
}

.edit-profile .title {
    margin-right: 1rem;
}

.edit-profile a:hover {
    background-color: #62c44a;
}

.edit-profile a:focus {
    background-color: #478d36;
}

.info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-line {
    height: 2.5rem;
    border-bottom: 1px solid #bbbbbb;
}

.info-title {
    color: #111111;
    font-size: 14px;
}

.mail {
    text-decoration: none;
    color: #000000;
}

.mail:hover {
    color: #555555;
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

.skills-list {
    display: flex;
    flex-wrap: wrap;
}
</style>