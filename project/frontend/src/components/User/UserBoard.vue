<template>
    <BaseBoard>
        <template #header>
            <h1>{{ title }}</h1>
        </template>
        <template #content>
            <UserElement v-for="(user, id) in users"
                :key="id"
                :userId="user.user_id"
                :username="user.username"
                :profImg="user.prof_img"
                :intro="user.intro"
            />
        </template>
    </BaseBoard>
</template>

<script>
import UserElement from '@/components/User/UserElement.vue';
export default {
    components: {
        UserElement,
    },
    props: ['title', 'users']
}
</script>