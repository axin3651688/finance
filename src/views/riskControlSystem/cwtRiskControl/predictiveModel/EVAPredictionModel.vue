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
                    <svg width="150px" height="720px">
                        <polyline points="36,1 71,1 36,1 36,321 1,321, 71,321, 36,321 36,641 71,641"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

                <div class="svg-second">
                    <svg width="150px" height="450px">
                        <polyline points="36,1 71,1 36,1 36,131 71,131 36,131 36,201 1,201 36,201 36,261 71,261 36,261 36,391 71,391"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

                <div class="svg-third">
                    <svg width="150px" height="450px">
                        <polyline points="1,1 71,1 36,1 36,131 71,131 36,131 36,261 71,261 36,261 36,391 71,391 36,391"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-fourth">
                    <svg width="150px" height="200px">
                        <polyline points="36,1 71,1 36,1 36,81 71,81 1,81"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-fifth">
                    <svg width="150px" height="200px">
                        <polyline points="36,1 71,1 36,1 36,55 1,55 36,55 36,81 71,81 36,81"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-sixth">
                    <svg width="150px" height="200px">
                        <polyline points="36,1 71,1 36,1 36,30 1,30 36,30 36,81 71,81 36,81"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-seventh">
                    <svg width="150px" height="200px">
                        <polyline points="36,1 71,1 1,1 36,1 36,81 71,81 36,81"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-eighth">
                    <svg width="150px" height="600px">
                        <polyline points="36,1 71,1 36,1 36,78 71,78 36,78 36,154 71,154 36,154 36,234 71,234 36,234
                                            36,314 71,314 36,314 36,390 71,390 36,390 36,468 71,468 1,468"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>
                <div class="svg-ninth">
                    <svg width="150px" height="600px">
                        <polyline points="1,1 71,1 36,1 36,78 71,78 36,78 36,154 71,154 36,154 36,234 71,234 36,234
                                            36,314 71,314 36,314 36,390 71,390 36,390 36,468 71,468"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "EVAPredictionModel",
        mixins: [cwtPublicJs],
        components: {
            cell,
            ccell
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
                    part4: {
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
                    part5: {
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
                            name: '营业利润',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData10: {
                            id: '001',
                            name: '营业外收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData11: {
                            id: '001',
                            name: '营业外支出',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData12: {
                            id: '001',
                            name: '三废率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData13: {
                            id: '001',
                            name: '营业利润率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData14: {
                            id: '001',
                            name: '三废占比（%）',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                },
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

    .part1, .part2, .part3, .part4, .part5, .svg-first, .svg-second, .svg-third, .svg-fourth, .svg-fifth, .svg-sixth, .svg-seventh, .svg-eighth, .svg-ninth {
        position: absolute;
    }

    .part1 {
        left: 0;
        top: 520px;
    }

    .part2 {
        left: 300px;
        top: 200px;
    }

    .part3 {
        left: 600px;
    }

    .part4 {
        left: 900px;
        top: 440px;
    }

    .part5 {
        left: 1200px;
        top: 285px;
    }

    .part1cell {
        margin-bottom: 0;
    }

    .part2cell {
        margin-bottom: 250px;
    }

    .part3cell {
        margin-bottom: 60px;
    }

    .part4cell {
        margin-bottom: 8px;
    }

    .part5cell {
        margin-bottom: 8px;
    }

    .cell {

    }

    .svg-first {
        left: 200px;
        top: 230px
    }

    .svg-second {
        left: 500px;
        top: 30px
    }

    .svg-third {
        left: 500px;
        top: 550px
    }
    .svg-fourth {
        left: 800px;
        top: 470px
    }

    .svg-fifth {
        left: 800px;
        top: 626px
    }

    .svg-sixth {
        left: 800px;
        top: 782px
    }
    .svg-seventh {
        left: 800px;
        top: 936px
    }

    .svg-eighth {
        left: 1100px;
        top: 316px
    }

    .svg-ninth {
        left: 1100px;
        top: 862px
    }
</style>