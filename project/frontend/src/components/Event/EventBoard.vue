<template>
    <BaseBoard>
        <template #header>
            <h1>{{ title }}</h1>
        </template>
        <template #content>
            <EventElement
                v-for="event in events"
                :key="event.event_id"
                :eventId="event.event_id"
                :name="event.event_name"
                :detail="event.event_detail"
                :schedule="event.event_schedule"
                :location="event.event_location"
                :url="event.event_url"
            ></EventElement>
        </template>
    </BaseBoard>
</template>

<script>
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        EventElement
    },
    props: ['title', 'events']
}
</script>