<template>
    <header>
        <h1><router-link to="/ideas">カムトル</router-link></h1>
        <nav>
            <ul class="nav-links">
                <div v-if="!isLoggedIn">
                    <li><router-link to="/signup">Sign up</router-link></li>
                    <li><router-link to="/login">Log in</router-link></li>
                </div>
                <div v-if="isLoggedIn">
                    <li><router-link class="post" to="/post">Post</router-link></li>
                    <li><BaseButton @click="logout">LogOut</BaseButton></li>
                    <li><router-link :to="userLink"><FontAwesomeIcon :icon="['fas', 'user']" size="lg"/></router-link></li>
                </div>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId } };
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.replace('/ideas'); // ログイン後は/ideasへ自動的に遷移させる
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: 10vh;
    padding: 1rem 0;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

li, a {
    text-decoration: none;
    color: black;
}

.nav-links {
    list-style: none;
}

.nav-links li {
    display: inline-block;
    padding: 0 1rem;
}

.nav-links li button {
    padding: .5rem 1rem;
}

.nav-links li span {
    cursor: pointer;
}

.nav-links li a {
    transition: all 0.3s ease 0s;
}

.nav-links li a:hover,
.nav-links li a:active {
    color: #ffbb3c;
}

.post {
    color: #000000 !important;
    padding: .5rem 2rem;
    background-color: #ffe0a7;
    border-radius: 4px;
}

.post:hover,
.post:active {
    color: #000000 !important;
    background-color: #ffbb3c;
}
</style>