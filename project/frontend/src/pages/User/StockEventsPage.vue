<template>
    <BaseProfileContent v-if="loadComplete">
        <template #contentHeaderLinks>
            <IdeaEventHeader :isMyProfile="isMyProfile" />
        </template>
        <template #contentBody>
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
    </BaseProfileContent>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import IdeaEventHeader from '@/components/User/IdeaEventHeader.vue';
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        IdeaEventHeader,
        EventElement,
    },
    data() {
        return {
            eventIDs: [],
            events: [],
            isMyProfile: false,
            loadComplete: false,
        }
    },
    computed: {
        myEventIDs() {
            return this.$store.getters['myData/myEventIDs'];
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        // 自分のプロフィールかを確認
        const paramUserId = this.$route.params['userId'];
        if (paramUserId == this.myUserId) {
            this.isMyProfile = true;
        }

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

                this.loadComplete = true;
            }).catch( err => {
                console.log("error to load stock events at StockEventsPage: ", err);
            })
        }
    }
}
</script>