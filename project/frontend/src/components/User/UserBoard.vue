<template>
    <div class="user-board">
        <UserElement v-for="(user, id) in users"
            :key="id"
            :userId="user.user_id"
            :username="user.username"
            :profImg="user.prof_img"
            :intro="user.intro"
        />
    </div>
</template>

<script>
import UserElement from '@/components/User/UserElement.vue';
export default {
    components: {
        UserElement,
    },
    props: ['users']
}
</script>