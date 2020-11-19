<template>
    <div id="idea-post">
        <BaseCard>
            <form @submit.prevent="submitPost">
                <div class="form-control">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" v-model="title">
                </div>
                <div class="form-control">
                    <label for="overview">Overview</label>
                    <textarea name="overview" rows="10" cols="33" v-model="overview"></textarea>
                </div>
                <div class="form-control">
                    <h3>Required Skills</h3>
                    <TheCheckBox
                        v-for="skill in skills"
                        v-model="requiredSkills"
                        :key="skill"
                        :value="skill"
                    ></TheCheckBox>
                </div>
                <TheButton text="Post"/>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';

export default {
    components: {
        BaseCard,
    },
    data() {
        return {
            title: '',
            overview: '',
            requiredSkills: []
        };
    },
    computed: {
        skills() {
            return this.$store.getters['idea/skills'];
        }
    },
    methods: {
        submitPost() {
            // ideaとrequiredSkillsは別々のテーブルに格納する。
            
            // register new idea
            const ideaData = {
                title: this.title,
                overview: this.overview,
            };
            this.$store.dispatch('idea/registerIdea', ideaData);

            // register new required skills
            // ---- step 1 ---- //
            // get idea id 
            
            // ---- step 2 ---- //
            // create requried skill data
            this.requiredSkills.foreach( (skill) => {
                const skillData = {
                    id: '',
                    skill: skill
                };
                
                this.$store.dispatch('idea/registerRequiredSkill', skillData);
            })
        },
    },
}
</script>

<style scoped>
.card {
    width: 60%;
    max-width: 40rem;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control h3 {
    text-align: left;
}

form {
    padding: 2rem;
}

form label {
    text-align: left;;
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: .25rem;
}

input, textarea {
    font: inherit;
    font-size: 18px;
    display: block;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #000;
    outline: none;
    padding: .3rem .5rem;
}

input:focus,
textarea:focus {
    transition: all .5s ease;
    border-color: #ad7100;
    background-color: #ffe1a9;
}

.check-box {
    text-align: left;
}

form button {
    margin-top: 2rem;
    border-color: #ffeece;
    background-color: #ffeece;
}

form button:hover {
    border-color: #ffe0a7;
    background-color: #ffe0a7;
}

form button:focus {
    border-color: #ffca67;
    background-color: #ffca67;
}

</style>