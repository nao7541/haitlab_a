<template>
     <EventBoard
        title="開催間近"
        v-if="loadComplete"
        :events="events"
    />
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import EventBoard from '@/components/Event/EventBoard.vue';

export default {
    components: {
        EventBoard,
    },
    data() {
        return {
            events: [],
            loadComplete: false,
        }
    },
    created() {
        apiHelper.loadNewEvents()
        .then( res => {
            this.events = res;
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load new events: ", err);
        })
    }
}
</script>