<template>
    <div id="post-step1">
        <label for="title">What is the title?</label>
        <input id="title" name="title" v-model="ideaTitle">
    </div>
</template>

<script>
export default {
    inject: ['ideaTitle' ]
}
</script>

<style scoped>

#post-step1 {background-color: #eeeeee;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

label {
    font-size: 30px;
    font-weight: bold;
}

input {
    width: 100%;
    color: #000;
    background-color: #fff;
    padding-left: .5rem;
    /* margin: 1rem 2rem; */
    font-size: 20px;
    line-height: 3rem;
    border-bottom: 1px solid #000000;
    outline: none;
}
</style>