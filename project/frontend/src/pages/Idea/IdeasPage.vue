<template>
    <div id="ideas-page">
        <section class="side">
           <TheTabs />
        </section>
        <section class="content">    
            <router-view />
        </section>
    </div>
</template>

<script>
import TheTabs from '@/components/layout/TheTabs.vue';

export default {
    components: {
        TheTabs,
    }
}
</script>

<style scoped>
#ideas-page {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: flex-start;
}

.content {
    width: 100%;
}
</style>