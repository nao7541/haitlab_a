<template>
    <div class="event-element">
        <div class="header">
            <div class="title">
                <a :href="url">{{ name }}</a>
            </div>
            <div class="info">
                <h3 class="date">{{ schedule }}</h3>
                <small class="location"><FontAwesomeIcon style="marginRight: .5rem" :icon="['fas', 'map-marker-alt']"/>{{ location }}</small>
            </div>
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
    transition: all .5s ease-out;
    border-bottom: 1px solid #dddddd;
}

.event-element:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
}

.header {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header a {
    font-size: 28px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease;
}

.header a:hover {
    color: #ffbb3c;
}

.info .date,
.info .location {
    display: block;
    padding: .5rem 2rem;
}

.info .date {
    color: #ff1b1b;
}

.content {
    padding-top: 0.5rem;
    text-align: left;
}
</style>