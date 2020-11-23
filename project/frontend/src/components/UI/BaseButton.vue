<template>
    <button :class="mode">{{ text }}</button>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: 'highlight',
        },
        text: {
            type: String,
            required: false,
        }
    },
}
</script>

<style scoped>
button {
    width: 100%;
    font-size: 16px;
    font: inherit;
    font-weight: bold;
    color: #000;
    border-radius: 8px;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    padding: 1rem 3rem;
    outline: none;
    cursor: pointer;
}

.flat {
    
}

.highlight {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
}

.highlight:focus {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>