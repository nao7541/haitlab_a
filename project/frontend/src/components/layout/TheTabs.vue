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
    background-color: #ccc;
    border-right: 1px solid #999;
}

.title {
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: center;
}

.tabs a {
    text-decoration: none;
    color: #000;
    font-size: 18px;
    padding: .5rem;
    transition: all .15s ease-out;
    display: block;
    cursor: pointer;
}

.tabs a:hover {
    background-color: #ffd588;
}

.router-link-active {
    box-shadow: 0 1px 4px #0002;
    background-color: #ffd588;
    border-right: 3px solid #ffa14e;
}
</style>