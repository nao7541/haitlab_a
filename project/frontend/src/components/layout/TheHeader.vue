<template>
    <header>
        <h1><router-link to="/">カムトル</router-link></h1>
        <nav>
            <div class="nav-links">
                <ul class="nav-link-container">
                    <li class="nav-link"><router-link to="/user/search">仲間を探す</router-link></li>
                    <li class="nav-link"><router-link to="/">アイデアを探す</router-link></li>
                    <li class="nav-link"><router-link to="/events">イベントを探す</router-link></li>
                    <li class="nav-link" v-if="!isLoggedIn"><router-link to="/signup">新規登録</router-link></li>
                    <li class="nav-link" v-if="!isLoggedIn"><router-link to="/login">ログイン</router-link></li>
                    <li class="nav-link profile" v-if="isLoggedIn && loadComplete">
                        <img :src="profileImage" alt="profile">
                        <div class="dropdown">
                            <ul>
                                <li class="dropdown-link"><router-link :to="userLink">マイページ</router-link></li>
                                <li class="dropdown-link"><a href="#" @click="logout">ログアウト</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    data() {
        return {
            user: null,
            loadComplete: false,
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId } };
        },
        profileImage() {
            return this.user.prof_img;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
            this.$router.replace('/'); // ログイン後は/ideasへ自動的に遷移させる
        },
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.user = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get userDetail at TheHeader: ", err);
        })
    }
}
</script>

<style scoped>
header {
    top: 0;
    width: 100%;
    height: 10vh;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: #000;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1,
header nav {
    margin: 0 2rem;
}

li, a {
    color: #000;
    text-decoration: none;
}

.nav-links ul {
    list-style: none;
}

.nav-link-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.nav-links .nav-link:not(:nth-last-child(1)) {
    margin-right: 1rem;
}

.nav-links .nav-link a {
    transition: all 0.3s ease 0s;
}

.nav-links .nav-link a:hover,
.nav-links .nav-link a:active {
    color: #ffbb3c;
}

.nav-links .profile {
    position: relative;
    width: 50px;
    height: 50px;
}

.nav-links .profile img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 32px;
    cursor: pointer;
}

.nav-link .dropdown {
    background-color: #333;
    width: 10rem;
    position: absolute;
    top: 100%;
    right: 0;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
}

.nav-link:hover > .dropdown {
    transform: translate(0, 0);
    opacity: 1;
    pointer-events: auto;
}

.dropdown-link {
    margin: 1rem 0;
    text-align: center;
}

.dropdown-link a {
    display: block;
    color: #fff;
    width: 100%;
}
</style>