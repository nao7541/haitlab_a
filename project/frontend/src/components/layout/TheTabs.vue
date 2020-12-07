<template>
    <div class="tabs">
        <div class="title">
            <h3>フィード</h3>
        </div>
        <router-link to="/ideas/new">新着</router-link>
        <router-link to="/ideas/trend">トレンド</router-link>
        <router-link to="/ideas/tag">タグ別</router-link>
        <router-link to="/ideas/event">イベント別</router-link>
    </div>
</template>

<style scoped>
.tabs {
    min-height: 100vh;
    width: 10rem;
    height: 100%;
    background-color: #182b3e;
}

.title {
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: left;
    border-bottom: 1px solid #fff;
}

.tabs a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: .5rem;
    transition: all .15s ease-out;
    display: block;
    cursor: pointer;
}

.tabs a:hover {
    color: #182b3e;
    background-color: #ffd588;
}

.router-link-active {
    color: #182b3e !important;
    background-color: #ffd588;
    border-right: 3px solid #ffa14e;
}
</style>