<template>
    <div class="floating-button" :class="fixed">
        <div class="bulb" :class="bgColor">
            <router-link :to="linkTo">
                <slot name="icon"></slot>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        linkTo: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            required: false,
        },
        fixed: {
            type: String,
            default: 'fixed'
        }
    }
}
</script>

<style scoped>
.fixed {
    position: fixed;
    bottom: 50px;
    right: 50px;
}

.floating-button .bulb {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    display: block;
    position: relative;
}

.orange {
    background-color: #ffbb3c;
}

.gray {
    background-color: #999;
}

.floating-button .bulb a {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.floating-button .bulb:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>