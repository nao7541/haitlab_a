<template>
    <div id="settings">
        <BaseCard>
            <form @submit.prevent="updateProfile">
                <h1>Edit My Profile</h1>
                <div class="form-control profile-image">
                    <img :src="user.prof_img" alt="profile">
                    <input class="image-input" type="file" @change="imageSelect" accept="image/*">
                </div>
                <div class="form-control" :class="{invalid: !formData.username.isValid}">
                    <label for="username">username</label>
                    <p v-if="!formData.username.isValid">username should not be empty</p>
                    <input type="text" id="username" name="username" v-model.trim="formData.username.val" @blur="clearValidity('username')">
                </div>
                <div class="form-control" :class="{invalid: !formData.univ.isValid}">
                    <label for="univ">university</label>
                    <p v-if="!formData.univ.isValid">university should not be empty</p>
                    <input type="text" id="univ" name="univ" v-model.trim="formData.univ.val" @blur="clearValidity('univ')">
                </div>
                <div class="form-control">
                    <label for="major">major</label>
                    <input type="text" id="major" name="major" v-model.trim="formData.major">
                </div>
                <div class="form-control">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" v-model.trim="formData.email">
                </div>
                <div class="form-control">
                    <label for="intro">Self Introduction</label>
                    <textarea id="intro" name="intro" rows="10" cols="30" v-model.trim="formData.intro"></textarea>
                </div>
                <div class="form-control" :class="{invalid: !skill.level.isValid}">
                    <h4 class="skill-input-title">Skill Tags</h4>
                    <p v-if="!skill.level.isValid">Select level please.</p>
                    <div class="skill-input">
                        <input type="text" placeholder="Enter a Skill" class="skill-input-text" v-model.trim="skill.name">
                        <select name="levels" class="levels" v-model="skill.level.val">
                            <option disabled value="">Your Level</option>
                            <option v-for="op in levelOptions"
                                :key="op.level"
                                :val="op.level"
                            >
                                {{ op.level }}
                            </option>
                        </select>
                        <button type="button" @click="addSkill">Add</button>
                    </div>
                    <div class="tags">
                        <!-- skills to add -->
                        <BaseSkill v-for="(sk, index) in inputSkills"
                            :key="index"
                            :name="sk.name"
                            :level="sk.level"
                        >
                            <template #delete-icon>
                                <!-- <span @click="removeSkill(index)"><FontAwesomeIcon :icon="['fas', 'times']" size="sm" /></span> -->
                            </template>
                        </BaseSkill>
                        <!-- stored skills -->
                    </div>
                </div>
                <BaseButton class="submit-btn">Update</BaseButton>
            </form>
        </BaseCard>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFormValid: true,
            selectedImage: null,
            formData: {
                username: {
                    val: '',
                    isValid: true,
                },
                univ: {
                    val: '',
                    isValid: true,  
                },
                major: '',
                email: null,
                intro: '',
            },
            inputSkills: [],
            skill: {
                name: '',
                level: {
                    val: '',
                    isValid: true,
                }
            },
            levelOptions: [
                { level: 'beginner' },
                { level: 'intermediate' },
                { level: 'advanced' },
                { level: 'expert' },
            ]
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        user() {
            return this.$store.getters['user/user'];
        }
    },
    created() {
        // user storeに現在保存されているuser情報が、自分の情報であるかを確認
        if (this.userId !== this.user.user_id) {
            // もし自分の情報でなければ、自分の情報にセットする
            this.$store.dispatch('user/loadUserData', {
                userId: this.userId
            }).then(() => {
                // load完了後にformをinitする
                this.initUserForm();
            }).catch( errorMsg => {
                console.log(errorMsg);
            });
        } 
    },
    methods: {
        initUserForm() {
            // すでに登録されている情報をフォームに反映する
            this.formData.username.val = this.user.username;
            this.formData.univ.val = this.user.univ_name;
            this.formData.major = this.user.major;
            this.formData.email = this.user.email;
            this.formData.intro = this.user.intro;
        },  
        addSkill() {
            // if skill level is not selected, not to add to the list.
            if (this.skill.level.val === '') {
                this.skill.level.isValid = false;
                return;
            }

            // add a new skill to the skill list
            this.inputSkills.push({
                name: this.skill.name,
                level: this.skill.level.val,
            });

            // clear skill input
            this.skill.name = '';
            this.skill.level = {
                val: '',
                isValid: true,
            };
        },
        removeSkill(index) {
            this.skills.splice(index, 1);
        },  
        imageSelect(event) {
            console.log(event);
            this.selectedImage = event.target.files[0];
        },
        clearValidity(input) {
            this.formData.this[input].isValid = true;
        },
        currentState() {
            // load current user profile state
        },
        formValidation() {
            this.isFormValid = true;

            if (this.formData.username.val === '') {
                this.formData.username.isValid = false;
                this.isFormValid = false;
            }

            if (this.formData.univ.val === '') {
                this.formData.univ.isValid = false;
                this.isFormValid = false;
            }
        },
        updateProfile() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const updateData = {
                userId: this.userId,
                username: this.formData.username.val,
                email: this.formData.email,
                prof_img: this.selectedImage,
                intro: this.formData.intro,
                univ_name: this.formData.univ.val,
                major: this.formData.major,
            };

            this.$store.dispatch('user/updateUserData', updateData);
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 30rem;
    padding: 2rem
}

form h1 { 
    font-size: 28px;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control p {
    text-align: left;
    font-size: 14px;
}

.profile-image img {
    width: auto;
    height: auto;
    max-width: 200px;
    max-height: 200px;
    border-radius: 128px;
}

.profile-image input {
    margin: 0 auto;
    display: block;
}

.form-control label { 
    text-align: left;
    display: block;
    margin: 0;
    font-weight: bold;
}

.form-control input:not(.image-input) {
    font-size: 16px;
    width: 100%;
    padding: .5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #aaaaaa;
}

.form-control input:focus:not(.image-input) {
    border-bottom: 2px solid #ffb01e;
}

.form-control textarea {
    font-size: 16px;
    padding: .5rem;
    width: 100%;
    outline: none;
    border: 1px solid #aaaaaa99;
}

.form-control textarea:focus {
    border: 2px solid #ffb01e99;
}

.skill-input-title {
    text-align: left;
    font-weight: bold;
}

.skill-input {
    display: flex;
    justify-content: flex-start;
}

.skill-input-text {
    width: 100%;
}

.skill-input .levels {
    margin-left: auto;
}

.levels,    
.skill-input > button {
    padding: 0.5rem;
}

.submit-btn {
    margin-top: 4rem;
    background-color: #ffeece;
}

.submit-btn:hover {
    transition: all .25s ease-in;
    background-color: #ffe0a7;
}

.invalid p {
    color: #ff4a4a;
}
</style>