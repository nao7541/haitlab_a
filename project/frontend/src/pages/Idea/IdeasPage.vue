<template>
    <div id="ideas-page">
        <section class="side">
            <BaseTab title="アイデア">
                <template #links>
                    <router-link to="/ideas/new">新着</router-link>
                    <router-link to="/ideas/trend">トレンド</router-link>
                    <router-link to="/ideas/recommend">おすすめ</router-link>
                    <router-link to="/ideas/tag">タグ</router-link>
                </template>
            </BaseTab>
        </section>
        <section class="content"> 
            <router-view />
        </section>
        <FloatingButton />
    </div>
</template>

<script>
import FloatingButton from '@/components/Idea/FloatingButton.vue';
export default {
    components: {
        FloatingButton
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