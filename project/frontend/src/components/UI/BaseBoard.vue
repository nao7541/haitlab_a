<template>
    <div class="base-board">
        <div class="board-header">
            <slot name="header"></slot>
        </div>
        <div class="board-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
.base-board {
    margin-bottom: 2rem;
    background-color: #fff;
}

.board-header {
    color: #000;
    padding: 1rem;
    border-bottom: 1px solid #999;
}

.board-content {
    background-color: #fff;
}
</style>