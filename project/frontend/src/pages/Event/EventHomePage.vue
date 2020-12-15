<template>
    <div id="event-home">
        <section class="side">
            <BaseTab title="イベント">
                <template #links>
                    <router-link to="/events/new">新着</router-link>
                    <router-link to="/events/coming">開催間近</router-link>
                </template>
            </BaseTab>
        </section>
        <section class="content">
            <router-view />
        </section>
    </div>
</template>

<style scoped>
#event-home {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: flex-start;
}

.content {
    width: 100%;
}
</style>