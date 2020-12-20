<template>
    <div id="edit-idea">
        <IdeaForm
            :ideaId="ideaId"
            formType="edit"
        ></IdeaForm>
    </div>
</template>

<script>
import IdeaForm from '@/components/Idea/IdeaForm.vue';

export default {
    components: {
        IdeaForm,
    },
    data() {
        return {
            ideaId: null,
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];
    }
}
</script>