<template>
    <div class="event-element">
        <div class="header">
            <a class="title" :href="url">{{ name }}</a>
            <small class="location"><FontAwesomeIcon style="marginRight: .5rem" :icon="['fas', 'map-marker-alt']"/>{{ location }}</small>
            <h3 class="date">{{ schedule }}</h3>
        </div>
        <div class="content">
            <p>{{ detail }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'detail', 'schedule',  'location', 'url']
}
</script>

<style scoped>
.event-element {
    padding: 2rem;
    height: 20rem;
    transition: all .5s ease-out;
    border-bottom: 1px solid #dddddd;
}

.event-element:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
}

.header {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin-right: auto;
    font-size: 28px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease;
}

.title:hover {
    border-bottom: 1px solid #000;
}

.date {
    margin-left: 1rem;
    color: #ff4e4e;
}

.content {
    padding-top: 0.5rem;
    text-align: left;
}
</style>