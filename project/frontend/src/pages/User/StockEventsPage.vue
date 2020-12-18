<template>
    <div id="stock-events">
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
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        EventElement
    },
    data() {
        return {
            eventIDs: [],
            events: [],
        }
    },
    computed: {
        myEventIDs() {
            return this.$store.getters['myData/myEventIDs'];
        }
    },
    created() {
        console.log(this.myEventIDs)
        if (this.myEventIDs != null) {
            this.eventIDs = this.myEventIDs;

            const promises = [];
            for (const id of this.eventIDs) {
                promises.push(apiHelper.loadEventDetail(id));
            }

            Promise.all(promises)
            .then( results => {
                for (const res of results) {
                    this.events.push(res);
                }
            }).catch( err => {
                console.log("error to load stock events at StockEventsPage: ", err);
            })
        }
    }
}
</script>