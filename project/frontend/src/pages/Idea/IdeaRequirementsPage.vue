<template>
    <div id="idea-requirements" v-if="loadComplete">
        <div class="container">
            <div class="requirements__header">
                <div class="container-title">
                    <h3>期限 / 締め切り</h3>
                </div>
                <BaseEditButton v-if="isMyIdea" @edit="editDate" />
            </div>
            <div class="date-modal" v-if="modalState.date">
                <BaseModal v-model="modalState.date">
                    <template #card>
                        <BaseForm title="質問投稿">
                            <input type="datetime-local" id="date" name="date" v-model="dateInput" >
                            <BaseModalButton @clickModalBtn="addDate" />
                        </BaseForm>
                    </template>
                </BaseModal>
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
                <p>{{ ideaData.offer }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    data() {
        return {
            ideaId: null,
            ideaData: null,
            loadComplete: false,
            modalState: {
                date: false,
            },
            isMyIdea: false,
            dateInput: null,
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
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaRequirementsPage: ", err);
        })
    },
    methods: {
        editDate() {
            this.modalState.date = true;
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
        }
    }
}
</script>

<style scoped>
.requirements__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

.date-modal input {
    outline: none;
    background-color: #ddd;
    padding: 0.1rem;
    border-radius: 2px;
}

.content {
    padding: 1rem;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>