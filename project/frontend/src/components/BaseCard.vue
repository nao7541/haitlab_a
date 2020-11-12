<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 12px;
    margin: 2rem auto;
    max-width: 40rem;
}
</style>