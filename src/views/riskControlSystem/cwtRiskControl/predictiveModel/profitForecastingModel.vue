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
                            <template v-if="item.type === 's'">
                                <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                            </template>

                            <template v-else-if="item.type === 'c'">
                                <cell :cellData="item"></cell>
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
                            :echartData="funnelEchartData"
                            :dataFresh="dataFresh"
                            :dataType="'funnel'">
                    </mchart>
                </div>
                <div class="pie">
                    <mchart
                            :echartData="pieEchartData"
                            :dataFresh="dataFresh"
                            :dataType="'pie'">
                    </mchart>
                </div>
                <div class="gauge">
                    <mchart
                            :echartData="gaugeEchartData"
                            :dataFresh="dataFresh"
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
    import dataCalculation from '../mixin/dataCalculation'
    import mchart from './modelPublic/mchart'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "profitForecastingModel",
        mixins: [cwtPublicJs, dataCalculation],
        components: {
            cell,
            ccell,
            mchart
        },
        props: {},
        computed: {
            aaa() {

            }
        },
        watch: {},
        data() {
            return {
                allData: {
                    part1: {
                        cellData1: {
                            name: '营业收入',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '100'
                        },
                        cellData2: {
                            name: '营业成本',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '101'
                        }
                    },
                    part2: {
                        cellData1: {
                            name: '毛利',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '102'
                        },
                        cellData2: {
                            name: '营业税金及附加',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '103'
                        },
                        cellData3: {
                            name: '销售费用',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '104'
                        },
                        cellData4: {
                            name: '管理费用',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '105'
                        },
                        cellData5: {
                            name: '财务费用',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '106'
                        },
                        cellData6: {
                            name: '资产减值损失',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '107'
                        },
                        cellData7: {
                            name: '公允价值变动利益',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '108'
                        },
                        cellData8: {
                            name: '投资利益',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '109'
                        }
                    },
                    part3: {
                        cellData1: {
                            name: '营业利润',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '110'
                        },
                        cellData2: {
                            name: '营业外收入',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '111'
                        },
                        cellData3: {
                            name: '营业外支出',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '112'
                        },
                        cellData4: {
                            name: '三废率（%）',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '113'
                        },
                        cellData5: {
                            name: '营业利润率（%）',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '114'
                        }
                    },
                    part4: {
                        cellData1: {
                            name: '利润总额',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '115'
                        },
                        cellData2: {
                            name: '所得税费用',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '116'
                        },
                        cellData3: {
                            name: '少数股东损益',
                            value: 10,
                            type: 's',
                            ssortby: '1',
                            nid: '117'
                        },
                        cellData4: {
                            name: '成本费用总额',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '118'
                        },
                        cellData5: {
                            name: '销售净利率（%）',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '119'
                        }
                    },
                    part5: {
                        cellData1: {
                            name: '净利润',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '120'
                        },
                        cellData2: {
                            name: '归属母公司净利润',
                            value: 0,
                            type: 'c',
                            ssortby: '1',
                            nid: '121'
                        }
                    },
                    partx: {
                        cellData1: {
                            name: '成本费用利润率（%）',
                            value: 0,
                            type: 'l',
                            ssortby: '1',
                            nid: '122'
                        }
                    },
                },
                buttonType: 'bq',
                gaugeEchartData: {},
                funnelEchartData: {
                    data:[]
                },
                pieEchartData: {
                    data: []
                },
                dataFresh: false
            }
        },
        created() {
        },
        mounted() {
            this.initData();
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
                this.dataComputed(params);
            },
            dataComputed(params) {
                let _this = this;
                let _nid = params.id;
                let _value = params.value;
                let _data = _this.allData;

                for (let x in _data) {
                    let i = _data[x];
                    for (let y in i) {
                        let z = i[y];
                        if (z.nid === _nid) {
                            z.value = _value;
                        }
                    }
                }

                _this.allData = _this.dataCalculate(_data);
                _this.gaugeEchartData = _this.allData.partx;
                _this.initPieEchartData(_this.allData);
                _this.dataFresh = !_this.dataFresh;
            },

            /**
             * 初始化数据
             */
            initData() {
                let _this = this;
                let _data = _this.allData;
                _this.allData = _this.dataCalculate(_data);
                _this.gaugeEchartData = _this.allData.partx;
                _this.initPieEchartData(_this.allData);
                _this.dataFresh = !_this.dataFresh;
            },
            /**
             * 初始化饼状图
             * @param data
             */
            initPieEchartData(data) {

                let _this = this;
                let emptyData = [];
                let eD = ['101', '103', '104', '105', '106'];
                for (let x in data) {
                    let i = data[x];
                    for (let y in i) {
                        let z = i[y];
                        if (eD.indexOf(z.nid) !== -1) {
                            let _m = {name: '', value: 0};
                            _m.name = z.name;
                            _m.value = z.value;
                            emptyData.push(_m);
                        }
                    }
                }
                _this.pieEchartData.data = emptyData;
                _this.funnelEchartData.data = emptyData;
            }
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