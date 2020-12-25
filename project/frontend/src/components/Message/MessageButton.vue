<template>
    <div class="message__btn" @click="$emit('showMessageModal')">
        <span>メッセージを送る</span>
        <FontAwesomeIcon class="icon" :icon="['fas', 'paper-plane']" size="lg" />
    </div>
</template>

<style scoped>
.message__btn {
    font-size: 16px;
    width: 100%;
    line-height: 2.5rem;
    color: #000;
    background-color: #6cdb51;
    cursor: pointer;
}

.message__btn span {
    margin-right: 1rem;
}

.message__btn:hover {
    background-color: #62c44a;
}

.message__btn:focus {
    background-color: #478d36;
}
</style>