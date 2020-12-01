<template>
    <div class="comment">
        <div class="info">
            <h5>{{ username }}</h5>
            <p>{{ date }}</p>
        </div>
        <div class="message">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['username', 'date', 'message']
}
</script>

<style scoped>
.comment {
    border-top: 1px solid #dddddd;
    background-color: #ffffff;
    display: flex;  
}

.info {
    width: 30%;
    padding: 2rem;
}

.message {
    width: 70%;
}
</style>