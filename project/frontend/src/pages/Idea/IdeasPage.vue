<template>
    <div id="ideas-page">
        <!-- <section class="explanation" v-if="!isLoggedIn">
            <div class="image-wrapper" />
            <div class="sentence-wrapper">
                <h1>カムトル</h1>
                <p>アイデアで終わらせない</p>
            </div>
        </section> -->
        <div class="ideas-display">
            <section class="side">
                <BaseTab title="アイデア">
                    <template #links>
                        <router-link to="/ideas/new">新着</router-link>
                        <router-link v-if="isLoggedIn" to="/ideas/recommend">おすすめ</router-link>
                        <router-link to="/ideas/tag">タグ</router-link>
                    </template>
                </BaseTab>
            </section>
            <section class="content"> 
                <router-view />
            </section>
        </div>
        <FloatingButton linkTo="/post" bgColor="orange">
            <template #icon>
                <FontAwesomeIcon :icon="['far', 'lightbulb']" size="4x" />
            </template>
        </FloatingButton>
    </div>
</template>

<script>
import FloatingButton from '@/components/Idea/FloatingButton.vue';
export default {
    components: {
        FloatingButton
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        }
    },
}
</script>

<style scoped>
#ideas-page {
    height: 100%;
}

.ideas-display {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: flex-start;
}

/* .explanation {
    height: 90vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.image-wrapper,
.sentence-wrapper {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image-wrapper {
    background-size: 30rem;
    background-position: center;
    background-image: url('~@/assets/images/build.svg');
}

.sentence-wrapper {
    text-align: left;
    padding-left: 10rem;
}

.sentence-wrapper h1 {
    font-size: 64px;
    transform: translateY(-50px);
}

.sentence-wrapper p {
    font-size: 30px;
} */
.content {
    width: 100%;
}
</style>