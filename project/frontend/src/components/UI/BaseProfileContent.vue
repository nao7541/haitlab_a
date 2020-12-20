<template>
    <div class="profile-content">
        <div class="content-header">
            <slot name="contentHeaderLinks"></slot>
        </div>
        <div class="content-e">
            <slot name="contentBody"></slot>
        </div>
    </div>
</template>

<style scoped>
.content-header {
    border-bottom: 1px solid #ddd;
}
</style>