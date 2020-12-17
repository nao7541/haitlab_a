<template>
    <div class="event-element">
        <div class="header">
            <a class="title" :href="url">{{ name }}</a>
            <span class="stock" @click="stockEvent"><FontAwesomeIcon :icon="['fas', 'download']" size="lg" /></span>
            <small class="location"><FontAwesomeIcon style="marginRight: .5rem" :icon="['fas', 'map-marker-alt']"/>{{ location }}</small>
            <h3 class="date">{{ schedule }}</h3>
        </div>
        <div class="content">
            <p>{{ detail }}</p>
        </div>
    </div>
</template>

<script>
// import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['eventId', 'name', 'detail', 'schedule',  'location', 'url'],
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        myStockEvent() {
            return this.$store.getters['myData/myStockEvent'];
        },
        stockState() {
            return this.myStockEvent.includes(this.eventId);
        }
    },
    methods: {
        stockEvent() {
            // apiHelper.stockEvent(this.eventId, this.myUserId)
            // .then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })
            if (this.stockEvent) {
                // すでに追加されているならストックから除く
                this.$store.dispatch('myData/unStockEvent', )
            } else {
                // もしまだストックされていないなら追加する
                this.$store.dispatch('myData/stockEvent', {
                    eventId: this.eventId,
                    userId: this.myUserId,
                });
            }
        },
        
    }
}
</script>

<style scoped>
.event-element {
    padding: 1rem 2rem;
    height: 20rem;
    transition: all .5s ease-out;
    border-bottom: 1px solid #dddddd;
}

.header {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header a:hover {
    color: #ffa600;
}

.title {
    font-size: 28px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease;
}

.stock {
    margin-left: 1rem;
    margin-right: auto;
    cursor: pointer;
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