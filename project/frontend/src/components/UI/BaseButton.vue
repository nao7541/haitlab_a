<template>
    <button @click="buttonEvent">
        <slot></slot>
    </button>
</template>

<script>
export default {
    emits: ['buttonEvent'],
    methods: {
        buttonEvent() {
            this.$emit('buttonEvent');
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
    font-size: 16px;
    font: inherit;
    font-weight: bold;
    color: #000;
    padding: 1rem 3rem;
    border-radius: 6px;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>