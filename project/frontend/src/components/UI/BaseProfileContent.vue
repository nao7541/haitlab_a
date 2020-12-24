<template>
    <div class="profile-content">
        <div class="content-header">
            <slot name="contentHeaderLinks"></slot>
        </div>
        <div class="content-body">
            <slot name="contentBody"></slot>
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
</style>