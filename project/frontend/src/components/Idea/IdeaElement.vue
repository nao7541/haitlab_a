<template>
    <div class="idea" >
        <div class="idea-header" @click.prevent="ideaPressed">
            <router-link :to="ideaLink">{{ title }}</router-link>
        </div>
        <div class="tags">
        </div>
        <div class="overview">
            <p>{{ content }}</p>
        </div>
        <div class="idea-footer">
            <div class="profile">
                <router-link :to="userLink"><img :src="profileImage" alt="profile"></router-link>
            </div>
            <div class="date">
                <small>{{ idea_date }}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['idea_id', 'user_id', 'title', 'overview', 'background', 'passion', 'idea_img', 'idea_date'],
    computed: {
        content() {
            return this.overview;
        },
        user() {
            return this.$store.getters['user/user'];
        },
        ideaLink() {
            return { name: 'ideaDetail', params: { ideaId: this.idea_id } };
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.user_id } };
        }
    },
    data() {
        return {
            profileImage: require('@/assets/images/person.png'),
        }
    },
    created() {
        this.$store.dispatch("user/loadUserData", {
            userId: this.user_id
        }).catch( err => {
            console.log(err);
        });
    },
}
</script>

<style scoped>
.idea {
    width: 100%;
    height: 15rem;
    background-color: #fff;
    padding: 1rem;
    transition: all 0.5s ease-out;
    border-bottom: 1px solid #dddddd;
}

.idea:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.idea-header {
    padding: 1rem 0;
}

.idea-header a {
    color: #000;
    display: block;
    text-decoration: none;
    font-size: 22px;
    font-weight: bold;
    border-bottom: 1px solid #cccccc;
    transition: all 0.25s ease-out;
}

.idea-header a:hover {
    color: #ffa600;
    border-bottom: 1.2px solid #ffbb3c;
}

.overview {
    text-align: left;
    height: 7rem;
}

.idea-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.idea-footer .profile {
    cursor: pointer;
}

.idea-footer .profile img {
    z-index: 10;
    background-color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    transition: all 0.25s ease-out;
    padding: .15rem;
}

.idea-footer .profile img:hover {
    background-color: #ffbb3c;
}
</style>