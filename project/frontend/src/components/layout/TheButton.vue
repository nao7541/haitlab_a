<template>
    <button>{{ text }}</button>
</template>

<script>
export default {
    props: ['text'],
}
</script>

<style scoped>
button {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    border-radius: 8px;
    border: 1px solid #ffffff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
    background-color: #ffffff;
    padding: 1rem 3rem;
    outline: none;
    cursor: pointer;
}

button:focus {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>