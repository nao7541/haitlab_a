<template>
    <div class="tabs">
        <div class="title">
            <h3>フィード</h3>
        </div>
        <router-link to="/ideas/new">新着</router-link>
        <router-link to="/ideas/trend">トレンド</router-link>
        <router-link to="/ideas/tag">タグ別</router-link>
    </div>
</template>

<style scoped>
.tabs {
    width: 10rem;
    min-height: 100vh;
    height: 100%;
    color: #000;
    background-color: #ffe0a7;
}

.title {
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: left;
    border-bottom: 1px solid #fff;
}

.tabs a {
    color: #000;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: .5rem;
    transition: all .15s ease-out;
    display: block;
    cursor: pointer;
}

.tabs a:hover {
    color: #182b3e;
    background-color: #ffb575;
}

.router-link-active {
    background-color: #ffa14e !important;
    border-right: 3px solid #ffa14e;
}
</style>