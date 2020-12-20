<template>
    <div class="follow-header">
        <div >
            <router-link :to="postPageLink">
                <FontAwesomeIcon class="arrow" :icon="['fas', 'arrow-left']" size="2x" />
            </router-link>
        </div>
        <ul>
            <li><router-link :to="followersLink">フォロワー</router-link></li>
            <li><router-link :to="followingLink">フォロー中</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        postPageLink() {
            return { name: 'postIdeas'};
        },
        followersLink() {
            return { name: 'followers' };
        },
        followingLink() {
            return { name: 'following' };
        },
    }
}
</script>

<style scoped>
.follow-header {
    position: relative;
}

.arrow {
    position: absolute;
    top: 2rem;
    left: 2rem;
    transform: translate(-50%, -50%);
}

.arrow:hover {
    color: #ffbb3c;
}

.arrow {
    height: 4rem;
    display: block;
}

ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
}

a {
    padding: 0 1rem;
    line-height: 4rem;
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
}

li:hover {
    background-color: #ffefd1;
}

.router-link-active {
    border-bottom: 2px solid #ffbb3c;
}
</style>