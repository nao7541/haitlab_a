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
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    display: flex;
}

.info {
    width: 30%;
    padding: 2rem;
}

.message { 
    width: 70%;
    /* display: table; */
}
</style>