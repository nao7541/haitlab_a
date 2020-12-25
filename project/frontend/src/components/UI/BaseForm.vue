<template>
    <div class="base-form">
        <form>
            <h2>{{ title }}</h2>
            <slot></slot>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            style: String,
            required: false,
        }
    }
}
</script>

<style scoped>
.base-form {
    color: #000;
    width: 30rem;
    background: #fff;
    text-align: left;
    padding: 1rem 0;
    margin: 2rem;
}

form h2 {
    font-weight: bold;
    margin-bottom: 2rem;
}
</style>