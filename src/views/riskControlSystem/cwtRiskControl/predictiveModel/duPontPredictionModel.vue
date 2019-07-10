<template>
    <div>

        <div class="content-all">
            <div class="content-cell">
                <div v-for="(part, key, index) of allData" :class="key">
                    <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                        <div class="cell">
                            <cell :cellData="item" @cellDatachange="cellDatachange"></cell>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-svg">
                <div class="svg-first">
                    <svg width="500px" height="32px">
                        <polyline points="1,16 1,31 1,16 131,16 131,1 131,16 361,16 361,31"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-second">
                    <svg width="600px" height="32px">
                        <polyline points="1,16 1,31 1,16 270,16 270,1 270,16 541,16 541,31"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-third">
                    <svg width="600px" height="32px">
                        <polyline points="1,16 1,31 1,16 176,16 176,1 176,16 361,16 361,31"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-fourth">
                    <svg width="600px" height="32px">
                        <polyline points="1,16 1,31 1,1 1,16  361,16 361,31"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-fifth">
                    <svg width="600px" height="32px">
                        <polyline points="1,16 1,31 1,1 1,16 270,16 270,31 270,16 541,16 541,31"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-sixth">
                    <svg width="600px" height="32px">
                        <polyline points="1,16 1,31 1,16 270,16 270,31 270,1"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-seventh">
                    <svg width="600px" height="32px">
                        <polyline
                                points="1,16 1,31 1,16 100,16 100,1 100,16 178,16 178,31 178,16 356,16 356,31 356,16 533,16 533,31"
                                fill="none" stroke="black"
                                stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-eighth">
                    <svg width="600px" height="32px">
                        <polyline
                                points="1,16 1,31 1,16 178,16 178,31 178,16 290,16 290,1 290,16 355,16 355,31 355,16 535,16 535,31"
                                fill="none" stroke="black"
                                stroke-width="2"></polyline>
                    </svg>
                </div>
            </div>

            <div class="content-chart">
                <div class="gauge_1">
                    <mchart
                            :echartData="echartData"
                            :dataType="'gauge'">
                    </mchart>
                </div>

                <div class="gauge_2">
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
        name: "duPontPredictionModel",
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
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part2: {
                        cellData1: {
                            id: '001',
                            name: '营业收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业成本',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part3: {
                        cellData1: {
                            id: '001',
                            name: '营业收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业成本',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part4: {
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
                        }
                    },
                    part5: {
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
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part6: {
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
                        },
                        cellData9: {
                            id: '001',
                            name: '投资利益',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part7: {
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
                        }
                    },
                    part8: {
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
                        }
                    },
                    part9: {
                        cellData1: {
                            id: '001',
                            name: '净利润',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '归属母公司净利润',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '少数股东损益',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                },
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
             * @param params
             */
            cellDatachange(params) {
                this.cellData.value = params.value;
                this.dataComputed(params.value);
            },
        }
    }
</script>

<style scoped>
    .content-all {
        position: relative;
        margin-top: 50px;
    }

    .content-cell {
        display: flex;
    }

    .part1, .part2, .part3, .part4, .part5, .part6, .part7, .part8, .part9,
    .svg-first, .svg-second, .svg-third, .svg-fourth, .svg-fifth, .svg-sixth, .svg-seventh, .svg-eighth {
        position: absolute;
        display: flex;
    }

    .part1 {
        left: 680px;
    }

    .part2 {
        left: 550px;
        top: 110px;
    }

    .part3 {
        left: 280px;
        top: 220px;
    }

    .part4 {
        left: 100px;
        top: 330px;
    }

    .part5 {
        left: 100px;
        top: 440px;
    }

    .part6 {
        left: 0;
        top: 550px;
    }

    .part7 {
        left: 40px;
        top: 660px;
    }

    .part8 {
        left: 40px;
        top: 770px;
    }

    .part9 {
        left: 40px;
        top: 880px;
    }

    .part1cell {
        /*margin-bottom: 20px;*/
    }

    .part2cell {
        margin-right: 190px;
    }

    .part3cell {
        margin-right: 370px;
    }

    .part4cell {
        margin-right: 190px;
    }

    .part5cell {
        margin-right: 100px;
    }

    .part6cell {
        margin-right: 8px;
    }

    .part7cell {
        margin-right: 20px;
    }

    .part8cell {
        margin-right: 20px;
    }

    .part9cell {
        margin-right: 20px;
    }

    .cell {

    }

    .svg-first {
        left: 630px;
        top: 75px
    }

    .svg-second {
        left: 362px;
        top: 185px;
    }

    .svg-third {
        left: 185px;
        top: 295px
    }

    .svg-fourth {
        left: 904px;
        top: 295px
    }

    .svg-fifth {
        left: 185px;
        top: 405px
    }

    .svg-sixth {
        left: 995px;
        top: 405px
    }

    .svg-seventh {
        left: 85px;
        top: 515px
    }

    .svg-eighth {
        left: 975px;
        top: 515px
    }

    .content-chart .gauge_1 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 730px;
        left: 770px;
    }

    .content-chart .gauge_2 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 730px;
        left: 1140px;
    }
</style>