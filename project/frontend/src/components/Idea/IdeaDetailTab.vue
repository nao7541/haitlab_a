<template>
    <ul>
        <li><router-link :to="overviewLink">概要</router-link></li>
        <li><router-link :to="detailInfoLink">詳細</router-link></li>
        <li><router-link :to="requirementsLink">募集</router-link></li>
        <li><router-link :to="reputationLink">評価</router-link></li>
        <li><router-link :to="feedbackLink">フィードバック</router-link></li>
    </ul>
</template>

<script>
export default {
    computed: {
        overviewLink() {
            return { name: 'overview' };
        },
        detailInfoLink() {
            return { name: 'detailInfo' };
        },
        requirementsLink() {
            return { name: 'requirements' };
        },
        reputationLink() {
            return { name: 'reputation' };
        },
        feedbackLink() {
            return { name: 'feedback' };
        }
    }
}
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #ddd;
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