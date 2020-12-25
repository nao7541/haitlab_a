<template>
    <div id="idea-reputation" v-if="loadComplete">
        <div class="container">
            <div class="container-title">
                <h3>評価</h3>
            </div>
            <div class="content" v-if="readyDrawChart">
                <div class="chart">
                    <span>現在の評価数: {{ reputationCount }}</span>
                    <Plotly :data="chartData" :layout="chartLayout" :display-mode-bar="false"></Plotly>
                </div>
                <div class="reputation-form">
                    <ReputationForm 
                        :ideaId="ideaId"
                        :userId="ideaData.user_id"
                    ></ReputationForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import utils from '@/services/utils.js';
import { Plotly } from 'vue-plotly'
import ReputationForm from '@/components/Idea/ReputationForm.vue';

export default {
    components: {
        Plotly,
        ReputationForm,
    },
    data() {
        return {
            ideaId: null,
            ideaData: null,
            loadComplete: false,
            reputationData: { // 各要素は配列を格納している
                interesting: [],
                novelty: [],
                possibility: [],
            },
            reputationMean: {
                interesting: 0,
                novelty: 0,
                possibility: 0,
            },
            readyDrawChart: false,
            chartData: null,
            chartLayout: null,
        }
    },
    computed: {
        reputationCount() {
            return this.reputationData.interesting.length;
        }
    },
    methods: {
        drawChart() {
            if (this.reputationData.interesting.length > 0) {
                // 評価数が0でなければ平均値を計算する
                this.reputationMean = {
                    interesting: utils.calcArrayMean(this.reputationData.interesting),
                    novelty: utils.calcArrayMean(this.reputationData.novelty),
                    possibility: utils.calcArrayMean(this.reputationData.possibility)
                };
            } else {
                // 評価数が0の場合は0にセットする
                this.reputationMean = {
                    interesting: 0,
                    novelty: 0,
                    possibility: 0
                };
            }

            // ここで描画する
            this.chartData = [{
                type: 'scatterpolar',
                r: [this.reputationMean.interesting, this.reputationMean.novelty, this.reputationMean.possibility],
                theta: ['面白さ', '新規性', '実現可能性'],
                fill: 'toself'
            }]
            this.chartLayout = {
                polar: {
                    radialaxis: {
                        visible: true,
                        range: [0, 5]
                    }
                },
                showlegend: false
            }

            this.readyDrawChart = true;
        },
    },
    created() {
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            this.ideaData = res;
            
            // アイデアの評価全て読み込む
            return apiHelper.loadIdeaReputations(this.ideaId)
        }).then( res => {
            this.reputationData.interesting = res.map( rep => rep.interesting );
            this.reputationData.novelty = res.map( rep => rep.novelty );
            this.reputationData.possibility = res.map( rep => rep.possibility );
            
            this.loadComplete = true;

            this.drawChart();
        }).catch( err => {
            console.log("error to get idea data at IdeaReputationPage: ", err);
        })
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 1rem;
}

.container-title {
    display: inline-block;
    background-color: #ffe0a7;
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
}

.content {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

.chart {
    width: 30rem;
}

.reputation-form {
    width: 20rem;
}

.content p {
    font-size: 18px;
    text-align: left;
}
</style>