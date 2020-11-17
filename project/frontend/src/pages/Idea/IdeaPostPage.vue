<template>
    <div id="idea-post">
        <BaseCard>
            <form @submit.prevent="submitPost">
                <div class="form-control">
                    <p>Title</p>
                    <input type="text" id="title" name="title">
                </div>
                <div class="form-control">
                    <p>Overview</p>
                    <textarea name="overview" rows="10" cols="33"></textarea>
                </div>
                <div class="form-control">
                    <p>Required Skills</p>
                    <TheCheckBox
                        v-for="skill in skillsList"
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
            requiredSkill: [
                {
                    skill_id: 0,
                    idea_id: 0,
                    skill_name: 'business'
                },
                {
                    skill_id: 1,
                    idea_id: 0, 
                    skill_name: 'design',
                },
                {
                    skill_id: 2,
                    idea_id: 1,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 3,
                    idea_id: 2, 
                    skill_name: 'design',
                },   
                {
                    skill_id: 4,
                    idea_id: 3,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 5,
                    idea_id: 3, 
                    skill_name: 'android app',
                },
                {
                    skill_id: 6,
                    idea_id: 4,
                    skill_name: 'business'
                },
                {
                    skill_id: 7,
                    idea_id: 5, 
                    skill_name: 'business',
                },
            ],
            skillsList: [],
        }
    },
    methods: {
        submitPost() {

        },
        getUniqSkills() {
            const uniqList = [];
            for (const skill of this.requiredSkill) {
                if (!uniqList.includes(skill.skill_name)) {
                    uniqList.push(skill.skill_name);
                }
            }
            return uniqList;
        }
    },
    created() {
        this.skillsList = this.getUniqSkills();
    }
}
</script>

<style scoped>
.card {
    width: 40%;
}

.form-control {
    margin-bottom: 1rem;
}

form {
    padding: 2rem;
}

form p {
    text-align: left;
    font-size: 20px;
}

input, textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #000;
    box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.25);
    padding: .75rem .5rem;
}

input {
    font-size: 20px;
}

textarea {
    font-size: 16px;
}

input:focus,
textarea:focus {
    transition: all .5s ease;
    border: 1px solid #df9203;
    background-color: #ffe1a9;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.check-box {
    text-align: left;
}

form button {
    margin-top: 2rem;
    width: 50%;
    border: 1px solid #ffeece;
    background-color: #ffeece;
}

form button:hover {
    border: 1px solid #ffe0a7;
    background-color: #ffe0a7;
}

form button:focus {
    border: 1px solid #ffca67;
    background-color: #ffca67;
}

</style>