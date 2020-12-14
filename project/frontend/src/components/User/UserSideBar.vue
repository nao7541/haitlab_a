<template>
    <div class="user-sidebar">
        <InputTag :tags="tags"/>
    </div>
</template>

<script>
import InputTag from '@/components/Tag/InputTag.vue';

export default {
    components: {
        InputTag,
    },
    data() {
        return {
            tags: []
        }
    }
}
</script>

<style scoped>
.user-sidebar {
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);;
    width: 15rem;
    min-height: 15rem;
    margin-right: 5rem;
}
</style>