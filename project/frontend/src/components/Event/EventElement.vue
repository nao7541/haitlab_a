<template>
    <div class="event-element">
        <div class="header">
            <a class="title" :href="url">{{ name }}</a>
            <div class="stock">
                <span class="hover-msg">{{ hoverMessage }}</span>
                <span :class="stockColor" class="stock-icon" @click="stockEvent"><FontAwesomeIcon :icon="['fas', 'bookmark']" size="lg" /></span>
            </div>
            <small class="location"><FontAwesomeIcon style="marginRight: .5rem" :icon="['fas', 'map-marker-alt']"/>{{ location }}</small>
            <h3 class="date">{{ schedule }}</h3>
        </div>
        <div class="content">
            <p>{{ detail }}</p>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['eventId', 'name', 'detail', 'schedule',  'location', 'url'],
    data() {
        return {
            stockState: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        myEventStocks() {
            return this.$store.getters['myData/myEventIDs'];
        },
        stockColor() {
            return this.stockState ? 'filled' : 'empty';
        },
        hoverMessage() {
            return this.stockState ? 'ストックから外す' : 'ストックする';
        }
    },
    methods: {
        stockEvent() {
            if (this.stockState) {
                // すでに追加されているならストックから除く
                apiHelper.removeEventStock(this.eventId, this.myUserId)
                .then(() => {
                    this.stockState = false;
                    this.$store.dispatch('myData/removeEventStock', {
                        eventId: this.eventId
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // もしまだストックされていないなら追加する
                apiHelper.addEventStock(this.eventId, this.myUserId)
                .then(() => {
                    this.stockState = true;
                    this.$store.dispatch('myData/addEventStock', {
                        eventId: this.eventId
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        },
    },
    created() {
        if (this.myEventStocks != null) {
            this.stockState = this.myEventStocks.includes(this.eventId) ? true : false;
        }
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
    position: relative;
}

.date {
    margin-left: 1rem;
    color: #ff4e4e;
}

.content {
    padding-top: 0.5rem;
    text-align: left;
}

.hover-msg {
    font-size: 14px;
    font-weight: bold;
    background-color: #1e1e1eaa;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    width: 8rem;
    padding: 0.1rem 0.5rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
}

.stock:hover > .hover-msg {
    opacity: 1;
    transform: translate(-50%, -30px);
}

.filled {
    color: #ffbb3c;
}

.empty {
    color: #000;
}
</style>