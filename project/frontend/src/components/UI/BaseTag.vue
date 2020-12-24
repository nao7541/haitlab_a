<template>
    <div class="base-tag" :class="{clickable: clickable}" @click="$emit('clickTag', name)">
        <span class="tag-icon"><FontAwesomeIcon :icon="['fas', 'tag']" /></span>
        <span class="tag-name">{{ name }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        clickable: {
            type: Boolean,
            required: false,
            default: false,
        }
    }
}
</script>

<style scoped>
.base-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ddd;
    border-radius: 4px;
    float: left;
    padding: 0.1rem 0.25rem;
    margin: 0 0.5rem 0.5rem 0;
}

.base-tag .tag-icon {
    margin-right: 0.5rem;
}

.clickable:hover {
    background-color: #ffe0a7;
    cursor: pointer;
}

.clickable:active {
    background-color: #ffbb3c;
}

</style>