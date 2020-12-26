<template>
    <div class="profile-content">
        <div class="content-header">
            <slot name="contentHeaderLinks"></slot>
        </div>
        <div class="content-body">
            <div class="item-list">
                <slot name="contentBody"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-header {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}

.content-body {
    background-color: #fff;
    height: 50rem;
}

.item-list {
    height: 100%;
    overflow: scroll;
}

.item-list::-webkit-scrollbar {
    background-color: #fff;
    width: 10px;
}

.item-list::-webkit-scrollbar-thumb {
    background-color: #eaeaea;
    border-radius: 8px;
}

.item-list::-webkit-scrollbar-button {
    display: none;
}
</style>