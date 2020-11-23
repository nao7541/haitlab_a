<template>
    <div class="check-box">
        <input type="checkbox" :id="value" :name="value" :value="value">
        <label :for="value">{{ value }}</label>
    </div>
</template>

<script>
export default {
    props: ['value']
}
</script>

<style scoped>
label {
    margin-left: .5rem;
}
</style>