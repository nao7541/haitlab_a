<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    width: 100%;
    font-size: 16px;
    font: inherit;
    font-weight: bold;
    color: #000;
    background-color: #ffffff;
    padding: 1rem 3rem;
    border-radius: 6px;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>