<template>
    <div class="idea" v-if="loadComplete">
        <div class="idea-header">
            <router-link :to="ideaLink">{{ title }}</router-link>
        </div>
        <div class="tags">
            <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
        </div>
        <div class="overview">
            <p>{{ content }}</p>
        </div>
        <div class="idea-footer">
            <div class="profile-image">
                <img :src="profileImage" alt="profile">
            </div>
            <div class="username">
                <span><router-link :to="userLink">{{ userDetail.username }}</router-link></span>
            </div>
            <div class="date">
                <small>{{ idea_date }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['idea_id', 'user_id', 'title', 'overview', 'background', 'passion', 'idea_img', 'idea_date'],
    computed: {
        content() {
            // TODO overviewより文字数を制限して返す
            return this.overview;
        },
        ideaLink() {
            return { name: 'ideaDetail', params: { ideaId: this.idea_id } };
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.user_id } };
        },
        profileImage() {
            return this.userDetail.prof_img === null ? require('@/assets/images/person.png') : this.userDetail.prof_img;
        },
        loadComplete() {
            return this.loadTag && this.loadUser;
        }
    },
    data() {
        return {
            userDetail: null,
            tags: [],
            loadTag: false,
            loadUser: false,
        }
    },
    created() {
        // user_idよりユーザー情報を取得
        apiHelper.loadUserDetail(this.user_id)
        .then( res => {
            this.userDetail = res;
            this.loadUser = true;
        }).catch( err => {
            console.log("error to load userDetail at IdeaElement: ", err);
        });

        // idea_idよりタグを取得
        apiHelper.loadIdeaTags(this.idea_id) 
        .then( res => {
            this.tags = res;
            this.loadTag = true;
        }).catch( err => {
            console.log("error to load idea tags at IdeaElement: ", err);
        });
    },
}
</script>

<style scoped>
.idea {
    width: 100%;
    background-color: #fff;
    padding: 1rem 2rem;
    border-bottom: 1px solid #dddddd;
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
}

.idea-header a:hover {
    color: #ffa600;
}

.tags::after {
    content: "";
    display: block;
    clear: both;
}

.overview {
    text-align: left;
    height: 7rem;
}

.idea-footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.username {
    margin-right: auto;
}

.username a {
    color: #000;
    text-decoration: none;
}

.username a:hover {
    border-bottom: 1px solid #000;
}

.profile-image {
    position: relative;
    height: 50px;
    width: 50px;
}

.profile-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>