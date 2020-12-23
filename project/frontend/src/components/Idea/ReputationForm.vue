<template>
    <form>
        <h3>評価フォーム</h3>
        <div class="form-control">
            <label for="interesting">面白さ</label>
            <div class="slider">
                <div class="slider-value">
                    <span ref="interestingValue">{{ interesting }}</span>
                </div>
                <div class="field">
                    <input type="range" id="interesting" name="interesting" min="0" max="5" v-model="interesting">
                </div>
            </div>
        </div>

         <div class="form-control">
            <label for="novelty">新規性</label>
            <div class="slider">
                <div class="slider-value">
                    <span ref="noveltyValue">{{ novelty }}</span>
                </div>
                <div class="field">
                    <input type="range" id="novelty" name="novelty" min="0" max="5" v-model="novelty">
                </div>
            </div>
        </div>

        <div class="form-control">
            <label for="possibility">実現可能性</label>
            <div class="slider">
                <div class="slider-value">
                    <span ref="possibilityValue">{{ possibility }}</span>
                </div>
                <div class="field">
                    <input type="range" id="possibility" name="possibility" min="0" max="5" v-model="possibility">
                </div>
            </div>
        </div>

        <button type="button" class="reputation" v-if="!reputationState" @click="addReputation">評価</button>
        <button type="button" class="update" v-if="reputationState"  @click="updateReputation">更新</button>
        <button type="button" class="delete" v-if="reputationState"  @click="deleteReputation">削除</button>
    </form>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: {
        ideaId: {
            required: true,
        },
        userId: {
            requried: true,
        },
    },
    data() {
        return {
            reputationId: null,
            interesting: 0,
            novelty: 0,
            possibility: 0,
            reputationState: false,
        }
    },
    watch: {
        interesting() {
            this.$refs.interestingValue.style.left = `${this.interesting * 20 + 2 * (2 - this.interesting)}%`;
        },
        novelty() {
            this.$refs.noveltyValue.style.left = `${this.novelty * 20 + 2 * (2 - this.novelty)}%`;
        },
        possibility() {
            this.$refs.possibilityValue.style.left = `${this.possibility * 20 + 2 * (2 - this.possibility)}%`;
        }
    },
    methods: {
        addReputation() {
            apiHelper.addReputation(this.ideaId, this.userId, {
                interesting: this.interesting,
                novelty: this.novelty,
                possibility: this.possibility,
            }).then( res => {
                this.reputationId = res.reputation_id;

                this.$router.go({name: 'reputation', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to add reputaiton: ", err);
            })
        },
        deleteReputation() {
            apiHelper.deleteReputation(this.reputationId)
            .then( () => {
                this.$router.go({name: 'reputation', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to remove reputation at IdeaDetailPage: ", err);
            })
        },
        updateReputation() {
            apiHelper.updateReputation(this.reputationId, this.ideaId, this.userId, {
                interesting: this.interesting,
                novelty: this.novelty,
                possibility: this.possibility,
            }).then(() => {
                this.$router.go({name: 'reputation', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to update reputation: ", err);
            })
        },
        initReputation() {
            // 評価状態を確認（評価済み / 未評価）
            apiHelper.getReputationState(this.ideaId, this.userId)
            .then( res => {
                this.reputationState = res;
                
                // 評価済みの場合
                if (this.reputationState) {
                    return apiHelper.loadReputation(this.ideaId, this.userId)
                }
            }).then( res => {
                if (res != null) {
                    // 既存評価値を反映
                    this.reputationId = res.reputation_id;
                    this.interesting = res.interesting;
                    this.novelty = res.novelty;
                    this.possibility = res.possibility;
                } else {
                    this.reputationId = null;
                    this.interesting = 0;
                    this.novelty = 0;
                    this.possibility = 0;
                }

                // formのvalueアイコンの初期化
                this.$refs.interestingValue.style.left = `${this.interesting * 20 + 1 * (2 - this.interesting)}%`;
                this.$refs.noveltyValue.style.left = `${this.novelty * 20 + 1 * (2 - this.novelty)}%`;
                this.$refs.possibilityValue.style.left = `${this.possibility * 20 + 1 * (2 - this.possibility)}%`;
            }).catch( err => {
                console.log("error to init reputation form: ", err);
            })
        }
    },
    created() {
        this.initReputation();
    }
}
</script>

<style scoped>
form {
    padding: 0.5rem;
    background-color: #ffe0a7;
}

form h3 {
    text-align: center;
    margin-bottom: 3rem;
}

.form-control {
    height: 3rem;
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
}

.form-control label {
    width: 9rem;
    text-align: right;
}

.slider { 
    width: 100%;
    margin: 0 1rem;
}

.slider-value {
    position: relative;
    width: 100%;
    text-align: center;
}

.slider-value span {
    font-size: 16px;
    position: absolute;
    top: -40px;
    width: 35px;
    height: 35px;
    line-height: 40px;
    transform: translateX(-50%);
    transition: all 0.25s ease-in;
    z-index: 2;
}

.slider-value span::after {
    position: absolute;
    content: "";
    width: 35px;
    height: 35px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background-color: #ffbb3c;
    z-index: -1;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
}

input[type="range"] {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 4px;
    background-color: #fff;
    width: 100%;
    outline: none;
    border: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffbb3c;
}

form button {
    font-size: 18px;
    height: 2.5rem;
    width: 100%;
    background-color: #fff;
    outline: none;
    border: none;
}

.reputation {
    background-color: #fff;
}

.reputation:hover {
    background-color: #e2e2e2;
}

.update {
    margin-bottom: 1rem;
    background-color: #ffffff;
}

.update:hover {
    background-color: #e2e2e2;
}

.delete {
    color: #fff;
    background-color: #ff2626;
}

.delete:hover {
    background-color: #cf1f1f;
}
</style>