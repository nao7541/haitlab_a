<template>
    <div class="tabs">
        <div class="title">
            <h1>{{ title }}</h1>
        </div>
        <div class="links">
            <slot name="links"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
.tabs {
    width: 15rem;
    color: #000;
    margin-right: 5rem;
}

.title {
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: left;
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
    background-color: #ffe0a7;
}

.router-link-active {
    background-color: #ffbb3c !important;
}
</style>