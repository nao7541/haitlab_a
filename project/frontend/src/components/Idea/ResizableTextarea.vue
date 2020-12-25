<template>
    <textarea 
        ref="resizableTextarea"
        @input="$emit('input', $event.target.value); resize($event)"
        :value=value
        maxlength="500"
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
    },
    mounted() {
        // 初期化
        // 入力がなければ1行にして、入力があるなら、その分だけの行数をセット
        const resizableTextarea = this.$refs.resizableTextarea;
        if (resizableTextarea.value === '') {
            resizableTextarea.rows = "1";
        } else {
            resizableTextarea.style.height = 'auto';
            resizableTextarea.style.height = `${resizableTextarea.scrollHeight}px`;
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
    border-bottom: 2px solid #ffa600;
}
</style>