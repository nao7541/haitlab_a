<template>
    <div id="message-home">
        <section class="side">
            <h1>Message List</h1>
        </section>
        <section class="content">
            <router-view />
        </section>
    </div>
</template>

<style scoped>
#message-home {
    margin: 2rem auto 0;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: flex-start;

}

.side {
    width: 40rem;
    background: #fff;
}

.content { 
    width: 100%;
    background: #eee;
}

</style>