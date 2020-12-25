<template>
    <div class="modal__btn">
        <button type="button" @click="$emit('clickModalBtn')">更新</button>
    </div>
</template>

<style scoped>
.modal__btn {
    text-align: right;
}

.modal__btn button {
    font-size: 18px;
    font-weight: bold;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    color: #000;
    outline: none;
    border: none;
    background-color: #ffe0a7;
}

.modal__btn button:hover {
    background-color: #ffbb3c;
}
</style>