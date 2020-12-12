<template>
    <div class="floating-button">
        <div class="bulb">
            <router-link to="/post"><FontAwesomeIcon :icon="['far', 'lightbulb']" size="4x" /></router-link>
        </div>
    </div>
</template>

<style scoped>
.floating-button {
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
    background-color: #ffbb3c;
}

.floating-button .bulb a {
    color: rgb(248, 255, 155);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.floating-button .bulb:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>