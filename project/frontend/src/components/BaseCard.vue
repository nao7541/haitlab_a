<template>
    <div class="card">
        <div class="card-title">
            <h2>{{ title }}</h2>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['title'],
}
</script>

<style scoped>
.card-title {
    margin: 2rem 0;
    border-bottom: 1px solid black;
}

.card {
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 40rem;
}
</style>