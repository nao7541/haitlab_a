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
    width: 60%;
    margin: 2rem auto;
    display: flex;
    justify-content: flex-start;
}

.content {
    width: 100%;
}
</style>