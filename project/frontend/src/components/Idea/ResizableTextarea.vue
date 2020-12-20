<template>
    <textarea 
        @input="$emit('input', $event.target.value); resize($event)"
        :value=value
        maxlength="500"
        rows="1"
    ></textarea>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        resize(e) {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    }
}
</script>

<style scoped>
textarea {
    font-size: 20px;
    width: 30rem;
    outline: none;
    border-bottom: 1px solid #000;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

textarea::-webkit-scrollbar {
    display: none;
}

textarea:focus {
    border-color: #ffbb3c;
}
</style>