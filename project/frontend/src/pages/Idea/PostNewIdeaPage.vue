<template>
    <div id="post-new-idea">
        <IdeaForm
            :title="title"
            :overview="overview"
            :background="background"
            :passion="passion"
            :offer="offer"
            :previewImage="previewImage"
            :tags="tags"
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
            title: {
                val: '',
                isValid: true,
            },
            overview: '',
            background: '',
            passion: '',
            offer: '',
            previewImage: null,
            tags: []
        }
    },
}
</script>