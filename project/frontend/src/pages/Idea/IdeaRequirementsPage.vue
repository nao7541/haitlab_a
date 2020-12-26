<template>
    <div id="idea-requirements" v-if="loadComplete">
        <div class="edit-container">
            <BaseEditButton v-if="isMyIdea" @edit="edit" />
            <div class="edit-modal" v-if="modalState">
                <BaseModal v-model="modalState">
                    <template #card>
                        <BaseForm title="募集に関する情報">
                            <div class="form-control">
                                <span>期限 / 締め切り</span>
                                <input type="datetime-local" id="date" name="date" v-model="dateInput" >
                            </div>
                            <div class="form-control">
                                <div class="recruit-title">
                                    <span>募集人材</span>
                                    <input type="button" @click="addRecruitInput" value="+" class="add__btn">
                                </div>
                                <RecruitInput 
                                    v-for="(rec, index) in recruitments"
                                    :key="index"
                                    :index="index"
                                    :recruit="rec"
                                    @delRecruitInput="delRecruitInput"
                                />
                            </div>
                            <BaseModalButton @clickModalBtn="updateData" />
                        </BaseForm>
                    </template>
                </BaseModal>
            </div>
        </div>
        
        <div class="container">
            <div class="container-title">
                <h3>期限 / 締め切り</h3>
            </div>
            <div class="content">
                <p>{{ ideaData.deadline }}</p>
            </div>
        </div>
        <div class="container">
            <div class="container-title">
                <h3>募集人材</h3>
            </div>
            <div class="content">
                <div v-for="(rec, index) in recruitmentsSaved"
                    :key="index"
                >
                    <span>{{ rec.kind }} / {{ rec.number }}人</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js';
import RecruitInput from '@/components/Idea/RecruitInput.vue';

export default {
    components: {
        RecruitInput,
    },
    data() {
        return {
            ideaId: null,
            ideaData: null,
            loadComplete: false,
            isMyIdea: false,
            dateInput: null,
            // ----- 仮 ----- //
            modalState: false,
            recruitmentsSaved: [], // 現在DBで格納されているrecruitment情報
            recruitments: [{
                kind: '',
                number: 1,
            }]
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            this.ideaData = res;

            if (this.ideaData.user_id == this.myUserId) {
                this.isMyIdea = true;
            }

            return apiHelper.loadRecruitments(this.ideaId)
        }).then (res => {
            if (res != null) {
                for (const item of res) {
                    const kind = item.kind;
                    const number = item.number;
                    this.recruitmentsSaved.push({
                        kind: kind,
                        number: number,
                    });
                }
                this.recruitments = this.recruitmentsSaved.slice(); 
            }
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaRequirementsPage: ", err);
        })
    },
    methods: {
        edit() {
            this.modalState = true;
        },
        addRecruitInput() {
            const newRecruit = { type: '', number: 1 };
            this.recruitments.push(newRecruit);
        },
        delRecruitInput(index) {
            this.recruitments.splice(index, 1);
        },
        updateData() {
            this.addDate();
            this.addRecruitments();
        },
        addDate() {
            const dateData = {
                user_id: this.myUserId,
                title: this.ideaData.title,
                state: this.ideaData.state,
                deadline: this.dateInput,
            }
            
            apiHelper.putDate(dateData, this.ideaId)
            .then( () => {
                this.$router.go({ name: 'requirements', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to add date: ", err);
            })
        },
        addRecruitments() {
            if (this.recruitmentsSaved.length === 0 && 
                (this.recruitments.length > 1 && this.recruitments[0] != '')) {
                const promises = [];
                for (const rec of this.recruitments) {
                    promises.push(apiHelper.postRecruitment(this.ideaId, rec.kind, rec.number));
                }

                Promise.all(promises)
                .then(() => {
                    this.$router.go({ name: 'requirements', params: { ideaId: this.ideaId }});
                }).catch(err => {
                    console.log("error to add recruitments: ", err);
                })
            } else if (!utils.recruitmentsEqual(this.recruitmentsSaved, this.recruitments)) {
                apiHelper.deleteAllRecruitments(this.ideaId)
                .then(() => {
                    const promises = [];
                    for (const rec of this.recruitments) {
                        promises.push(apiHelper.postRecruitment(this.ideaId, rec.kind, rec.number))
                    }

                    return Promise.all(promises)
                }).then(() => {
                    this.$router.go({ name: 'requirements', params: { ideaId: this.ideaId }});
                }).catch(err => {
                    console.log("error to update recruitments: ", err);
                })
            } else {
                this.$router.go({ name: 'requirements', params: { ideaId: this.ideaId }});
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.modalState = false;
        next();
    }
}
</script>

<style scoped>
#idea-requirements {
    position: relative;
}

.container {
    width: 100%;
    padding: 1rem;
}

.container-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    margin-right: 1rem;
}

.edit__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
}

.edit-modal input {
    outline: none;
    background-color: #ddd;
    padding: 0.1rem;
    border-radius: 2px;
}

.form-control {
    margin-bottom: 1rem;
}

.form-control span {
    font-size: 17px;
    font-weight: bold;
    display: block;
}

.form-control span,
.recruit-title {
    margin-bottom: 0.5rem;
}

.recruit-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.recruit-title .add__btn {
    width: 30px;
    height: 30px;
    outline: none;
    margin-left: 0.5rem;
}

.recruit-title .add__btn:hover {
    background-color: #eee;
}

.content {
    padding: 1rem;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>