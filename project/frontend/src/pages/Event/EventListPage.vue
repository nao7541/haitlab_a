<template>
    <div id="event-page">
        <section class="side">
           <EventSearch/>
        </section>
        <section class="events">
            <BaseCard>
                <div class="header">
                    <h1>現在開催中のイベント</h1>
                </div>
                <EventElement
                    v-for="event in events"
                    :key="event.event_id"
                    :name="event.event_name"
                    :detail="event.event_detail"
                    :schedule="event.event_schedule"
                    :location="event.event_location"
                    :url="event.event_url"
                ></EventElement>
            </BaseCard>
        </section>
    </div>
</template>

<script>
import EventSearch from '@/components/Event/EventSearch.vue';
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        EventSearch,
        EventElement,
    },
    computed: {
        events() {
            return this.$store.getters['event/events'];
        }
    },
    methods: {
        loadEvents() {
            this.$store.dispatch('event/loadEvents')
        }
    },
    created() {
        this.loadEvents();
    }
}
</script>

<style scoped>
#event-page {
    width: 60%;
    margin: 2rem auto;
    display: flex;
}

.events {
    min-height: 100vh;
    height: 100%;
    background-color: #fff;
}

.events .header {
    padding: 2rem 0;
    border-bottom: 1px solid #999999;
}
</style>