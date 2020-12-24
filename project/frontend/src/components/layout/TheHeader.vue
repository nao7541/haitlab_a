<template>
    <header>
        <ul class="nav-links">
            <li class="nav-link title"><router-link to="/ideas">カムトル</router-link></li>
            <li class="nav-link search">
                <FontAwesomeIcon class="icon" :icon="['fas', 'search']" size="lg" />
                <div class="dropdown">
                    <ul>
                        <li class="dropdown-link"><router-link to="/user/search">仲間</router-link></li>
                        <li class="dropdown-link"><router-link to="/ideas">アイデア</router-link></li>
                        <li class="dropdown-link"><router-link to="/events">イベント</router-link></li>
                    </ul>
                </div>
            </li>
            <li class="nav-link auth" v-if="!isLoggedIn">
                <FontAwesomeIcon class="icon" :icon="['fas', 'sign-in-alt']" size="2x" />
                <div class="dropdown">
                    <ul>
                        <li class="dropdown-link"><router-link to="/signup">新規登録</router-link></li>
                        <li class="dropdown-link"><router-link to="/login">ログイン</router-link></li>
                    </ul>
                </div>
            </li>
            <li class="nav-link profile" v-if="isLoggedIn && loadComplete">
                <img :src="profileImage" alt="profile">
                <div class="dropdown">
                    <ul>
                        <li class="dropdown-link"><FontAwesomeIcon class="icon" :icon="['fas', 'user']" /><router-link :to="userLink">マイページ</router-link></li>
                        <li class="dropdown-link"><FontAwesomeIcon class="icon" :icon="['fas', 'bell']" /><router-link :to="notificationLink">通知</router-link></li>
                        <li class="dropdown-link"><FontAwesomeIcon class="icon" :icon="['fas', 'sign-out-alt']" /><a href="#" @click="logout">ログアウト</a></li>
                    </ul>
                </div>
            </li>
        </ul>
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
        notificationLink() {
            return { name: 'notification', params: { userId: this.userId }};
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
        loadUserDetail() {
            apiHelper.loadUserDetail(this.userId)
            .then( res => {
                this.user = res;
                this.loadComplete = true;
            }).catch( err => {
                console.log("error to get userDetail at TheHeader: ", err);
            })
        }
    },
    beforeMount () {
        if (this.userId) {
            // userがセットされている時のみ
            this.loadUserDetail();
        }
    },
    watch: {
        userId() {
            this.loadUserDetail();
        }
    }
}
</script>

<style scoped>
header {
    top: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: #000;
    font-weight: bold;
}

ul {
    list-style: none;
}

li, a {
    color: #000;
    text-decoration: none;
}

.nav-links {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: none;
}

.nav-link:not(:nth-child(1)):not(:nth-last-child(1)) {
    margin-right: 0.5rem;
}

.nav-link a {
    display: block;
    line-height: 5rem;
    height: 100%;
}

.title {
    font-size: 28px;
    margin-right: auto;
}

.nav-links .search,
.nav-links .auth,
.nav-links .profile {
    position: relative;
    width: 50px;
    height: 50px;
}

.nav-links .search .icon,
.nav-links .auth .icon,
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
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    width: 10rem;
    position: absolute;
    top: 100%;
    right: 0;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease-out;
    z-index: 100;
}

.nav-link:hover > .dropdown {
    transform: translate(0, 0);
    opacity: 1;
    pointer-events: auto;
}

.dropdown-link {    
    text-align: center;
}

.profile .dropdown-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.profile .dropdown-link .icon {
    width: 3rem;
}

.dropdown-link a {
    display: block;
    line-height: 3rem;
    color: #000;
    cursor: pointer;
}

.dropdown-link:hover {
    background-color: #ffe0a7;
}
</style>