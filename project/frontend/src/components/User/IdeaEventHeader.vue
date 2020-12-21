<template>
    <ul>
        <li><router-link :to="postPageLink">投稿済み</router-link></li>
        <li v-if="isMyProfile"><router-link :to="draftPageLink">下書き</router-link></li>
        <li v-if="isMyProfile"><router-link :to="stockPageLink">ストック</router-link></li>
    </ul>
</template>

<script>
export default {
    props: {
        isMyProfile: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        postPageLink() {
            return { name: 'postIdeas'};
        },
        draftPageLink() {
            return { name: 'draftIdeas' };
        },
        stockPageLink() {
            return { name: 'stockEvents' };
        },
    }
}
</script>

<style scoped>
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