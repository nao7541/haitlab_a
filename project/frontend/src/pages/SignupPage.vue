<template>
    <div id="signup-page">
        <BaseCard title="Sign up">
            <form>
                <div class="registration">
                    <div class="input-registration">
                        <div class="form-control">
                            <!-- <label for="username">ユーザー名</label> -->
                            <input type="text" id="username" name="username">
                        </div>
                        <div class="form-control">
                            <!-- <label for="password">パスワード</label> -->
                            <input type="password" id="password" name="password">
                        </div>
                        <button @click="acceptUser">Sing up</button>
                    </div>
                    <div class="ref-registration">
                    </div>
                </div>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';

export default {
    components: {
        BaseCard,
    },
    methods: {
        acceptUser() {
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>
.registration label {
    margin-right: .5rem;
}

form .form-control {
    margin: 1rem 0;
}

.registration {
    display: inline-block;
}
</style>