<template>
    <div id="idea-post">
        <div class="post-card">
            <div class="progress-bar">
                <div class="step">
                    <div class="step-at">
                        <span>1</span>
                    </div>
                    <FontAwesomeIcon class="check" :icon="['fas', 'check']" />
                </div>
                <div class="step">
                    <div class="step-at">
                        <span>2</span>
                    </div>
                    <FontAwesomeIcon class="check" :icon="['fas', 'check']" />
                </div>
                <div class="step">
                    <div class="step-at">
                        <span>3</span>
                    </div>
                    <FontAwesomeIcon class="check" :icon="['fas', 'check']" />
                </div>
                <div class="step">
                    <div class="step-at">
                        <span>4</span>
                    </div>
                    <FontAwesomeIcon class="check" :icon="['fas', 'check']" />
                </div>
                <div class="step">
                    <div class="step-at">
                        <span>5</span>
                    </div>
                    <FontAwesomeIcon class="check" :icon="['fas', 'check']" />
                </div>
            </div>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            overview: '',
        };
    },
    provide: {
        ideaTitle: '',
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
#idea-post {
    text-align: center;
    background-color: #ffffff;
}

.post-card {
    max-width: 50rem;
    margin: 5rem auto;
    background-color: #cccccc;
}

.progress-bar {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress-bar .step {
    position: relative;
    margin: 0 1rem;
    text-align: center;
    background-color: #fff;
    width: 100%;
}

.progress-bar .step .step-at {
    font-size: 25px;
    font-weight: bold;
    height: 40px;
    width: 40px;
    border: 2px solid #333333;
    border-radius: 50%;
    display: inline-block;
    line-height: 40px;
    position: relative;
}

.progress-bar .step .step-at::before,
.progress-bar .step .step-at::after {
    position: absolute;
    bottom: 15px;
    right: -55px;
    content: '';
    height: 3px;
    width: 50px;
    background-color: #333333;
}

.progress-bar .step .step-at:after {
    background-color: #ffbb3c;
    transform: scaleX(0);
    transform-origin: left;
    animation: animate 0.3s linear forwards;
}
@keyframes animate {
    100% {
        transform: scaleX(1);
    }
}

.progress-bar .step:last-child .step-at::before,
.progress-bar .step:last-child .step-at::after {
    display: none;
}

.progress-bar .step span {
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
}

.progress-bar .step .check {
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    display: none;
}
</style>