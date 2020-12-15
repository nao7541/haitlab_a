<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    text-align: center;
    background-color: #ffffff;
    margin: 2rem auto 0;
}

.rounded {
    border-radius: 12px;
}

.shading { 
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>