<template>
    <div>

        <div class="top-button">
            <el-button
                    class="bq"
                    :type="this.buttonType === 'bq' ? 'primary' : ''"
                    @click="topButtonClick('bq')"
            >本年实际数
            </el-button>
            <el-button
                    class="lj"
                    :type="this.buttonType === 'lj' ? 'primary' : ''"
                    @click="topButtonClick('lj')"
            >累计实际数
            </el-button>
        </div>

        <div class="content-all">

            <div class="content-cell">
                <div v-for="(part, key, index) of allData" :class="key">
                    <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                        <div class="cell">
                            <template v-if="item.type">
                                <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                            </template>

                            <template v-else>
                                <cell :cellData="item" @cellDatachange="cellDatachange"></cell>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-svg">
                <div class="svg-first">
                    <svg width="150px" height="720px">
                        <polyline points="1,1 71,1 36,1 36,91 1,91 36,91 36,181 1,181, 36,181 36,271,
                        1,271 36,271 36,361 1,361 36,361 36,451 1,451 36,451 36,541 1,541 36,541 36,631 1,631"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

                <div class="svg-second">
                    <svg width="150px" height="450px">
                        <polyline points="1,1 71,1 36,1 36,91 1,91 36,91 36,181 1,181 "
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

                <div class="svg-third">
                    <svg width="150px" height="200px">
                        <polyline points="1,1 71,1 36,1 36,91 1,91 36,91 36,181 1,181"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

            </div>

            <div class="content-chart">
                <div class="funnel">
                    <mchart
                            :echartData="echartData"
                            :dataType="'funnel'">
                    </mchart>
                </div>
                <div class="pie">
                    <mchart
                            :echartData="echartData"
                            :dataType="'pie'">
                    </mchart>
                </div>
                <div class="gauge">
                    <mchart
                            :echartData="echartData"
                            :dataType="'gauge'">
                    </mchart>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import mchart from './modelPublic/mchart'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "profitForecastingModel",
        mixins: [cwtPublicJs],
        components: {
            cell,
            ccell,
            mchart
        },
        props: {},
        computed: {},
        watch: {},
        data() {
            return {
                allData: {
                    part1: {
                        cellData1: {
                            id: '001',
                            name: '营业收入',
                            value: this.setNumberToStander(1555.36),
                            type:'c'
                        },
                        cellData2: {
                            id: '001',
                            name: '营业成本',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part2: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '管理费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData5: {
                            id: '001',
                            name: '财务费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData6: {
                            id: '001',
                            name: '资产减值损失',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData7: {
                            id: '001',
                            name: '公允价值变动利益',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData8: {
                            id: '001',
                            name: '投资利益',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part3: {
                        cellData1: {
                            id: '001',
                            name: '营业利润',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业外收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '营业外支出',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '三废率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData5: {
                            id: '001',
                            name: '营业利润率（%）',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part4: {
                        cellData1: {
                            id: '001',
                            name: '利润总额',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '所得税费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '少数股东损益',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '成本费用总额',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData5: {
                            id: '001',
                            name: '销售净利率（%）',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part5: {
                        cellData1: {
                            id: '001',
                            name: '净利润',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '归属母公司净利润',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                },
                buttonType: 'bq',
                echartData: {},
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {

            /**
             * 单元格数据发生改变
             * @param type
             */
            topButtonClick(type) {
                this.buttonType = type;
            },


            /**
             * 单元格数据发生改变
             * @param params
             */
            cellDatachange(params) {
                this.cellData.value = params.value;
                this.dataComputed(params.value);
            },
            dataComputed(v) {
                // this.cellDataC.value = this.setNumberToStander(v);
            },
        }
    }
</script>

<style scoped>
    .top-button {
        margin-bottom: 20px;
    }

    .content-all {
        position: relative;
    }

    .content-cell {
        display: flex;

    }

    .part1, .part2, .part3, .part4, .part5, .svg-first, .svg-second, .svg-third {
        position: absolute;
    }

    .part1 {
        left: 0;
    }

    .part2 {
        left: 300px;
    }

    .part3 {
        left: 600px;
    }

    .part4 {
        left: 900px;
    }

    .part5 {
        left: 1200px;
    }

    .part1cell {
        margin-bottom: 20px;
    }

    .part2cell {
        margin-bottom: 20px;
    }

    .part3cell {
        margin-bottom: 20px;
    }

    .part4cell {
        margin-bottom: 20px;
    }

    .part5cell {
        margin-bottom: 110px;
    }

    .cell {

    }

    .svg-first {
        left: 500px;
        top: 30px
    }

    .svg-second {
        left: 800px;
        top: 30px
    }

    .svg-third {
        left: 1100px;
        top: 30px
    }

    .content-chart .funnel {
        position: absolute;
        width: 240px;
        height: 500px;
        top: 200px;
    }

    .content-chart .pie {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 455px;
        left: 600px;
    }

    .content-chart .gauge {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 455px;
        left: 1000px;
    }

</style>