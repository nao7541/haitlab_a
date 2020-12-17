<template>
    <div id="post-new-idea">
        <IdeaForm
            formType="new"
        ></IdeaForm>
    </div>
</template>

<script>
import IdeaForm from '@/components/Idea/IdeaForm.vue';

export default {
    components: {
        IdeaForm,
    }
}
</script>