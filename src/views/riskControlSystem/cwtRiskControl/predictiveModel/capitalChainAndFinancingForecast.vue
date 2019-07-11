<template>
    <div>
        <div class="content-all">


            <div class="content-cell">

                <div v-for="(part, key, index) of allData1" :class="key + 'text'">
                    <div v-for="(item, _key, index) of part" :class="key + 'textinner'">
                        <span>{{item.name}}</span>
                    </div>
                </div>


                <div v-for="(part, key, index) of allData2" :class="key">
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


            <div class="content-chart">
                <div class="pie_1">
                    <mchart
                            :echartData="pie_1EchartData"
                            :dataFresh="dataFresh"
                            :dataType="'pie'">
                    </mchart>
                </div>

                <div class="pie_2">
                    <mchart
                            :echartData="pie_2EchartData"
                            :dataFresh="dataFresh"
                            :dataType="'pie'">
                    </mchart>
                </div>

                <div class="pie_3">
                    <mchart
                            :echartData="pie_3EchartData"
                            :dataFresh="dataFresh"
                            :dataType="'pie'">
                    </mchart>
                </div>

                <div class="pie_4">
                    <mchart
                            :echartData="pie_4EchartData"
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

            <div class="content-text">
                <div class="content-text-one">
                    投资活动是协调的
                </div>
                <div class="content-text-two">
                    经营活动存在资金缺口
                </div>
                <div class="content-text-three">
                    <div class="title">
                        现金支付能力状况
                    </div>
                    <div class="content">
                        协调并且有支付能力
                    </div>
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
        name: "capitalChainAndFinancingForecast",
        mixins: [cwtPublicJs, dataCalculation],
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
                allData1: {
                    part1: {
                        cellData1: {
                            name: '结构性资产项',
                        },
                        cellData2: {
                            name: '结构性负债项',
                        },
                        cellData3: {
                            name: '经营性资产项',
                        },
                        cellData4: {
                            name: '经营性负债项',
                        }
                    }
                },
                allData2: {
                    part1: {
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
                        }
                    },
                    part3: {
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
                        }
                    },
                },
                pie_1EchartData: {
                    name: "",
                    data: []
                },
                pie_2EchartData: {
                    name: "",
                    data: []
                },
                pie_3EchartData: {
                    name: "",
                    data: []
                },
                pie_4EchartData: {
                    name: "",
                    data: []
                },
                gaugeEchartData: {
                    name: "",
                    data: []
                },
                dataFresh: false
            }
        },
        created() {
        },
        mounted() {
            this.getRealData();
        },
        methods: {
            /**
             * 请求真实数据
             */
            getRealData() {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '6'
                };

                predictiveModel(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.resDataFormatter(res.data.data);
                    }
                })
            },
            /**
             * 请求回来的数据进行格式化处理
             * @param data
             */
            resDataFormatter(data) {
                let _this = this;

                let _data = {
                    part1: {},
                    part2: {},
                    part3: {},
                    part4: {},
                    part5: {},
                    partx: {},
                    party: {}
                };

                data.forEach((item, index) => {
                    // let _sort = item['SORT'];
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 4) {
                            _data.part1['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 8) {
                            _data.part2['cellData' + _index] = item;
                        } else if (_index > 8 && _index <= 12) {
                            _data.part3['cellData' + _index] = item;
                        } else if (_index > 12 && _index <= 16) {
                            _data.part4['cellData' + _index] = item;
                        } else if (_index > 16 && _index <= 18) {
                            _data.part5['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _data.partx['cellData' + (_index - 34)] = item;
                    } else if (item.type === 'fc') {
                        _data.party['cellData' + (_index - 34)] = item;
                    }
                });
                _this.allData2 = _data;
                _this.initData();
            },
            /**
             * 初始化数据
             */
            initData() {
                let _this = this;
                let _data = _this.allData2;
                _this.allData2 = _this.dataCalculate(_data);
                // _this.gaugeEchartData = _this.allData2.partx;
                _this.initEchartData(_this.allData2);
                _this.dataFresh = !_this.dataFresh;
            },
            /**
             * 初始化Echart
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                // let emptyData = [];
                // let eD = ['101', '103', '104', '105', '106'];
                // for (let x in data) {
                //     let i = data[x];
                //     for (let y in i) {
                //         let z = i[y];
                //         if (eD.indexOf(z.nid) !== -1) {
                //             let _m = {name: '', value: 0};
                //             _m.name = z.name;
                //             _m.value = z.value;
                //             emptyData.push(_m);
                //         }
                //     }
                // }
                // _this.gaugeEchartData.data = data.partx;
                // _this.pieEchartData.data = emptyData;
                // _this.funnelEchartData.data = emptyData;
                // _this.dataFresh = !_this.dataFresh;

            },
            /**
             * 单元格数据发生改变
             * @param params
             */
            cellDatachange(params) {
                this.dataComputed(params);
            },

            /**
             * 数据格式化
             * @param params
             */
            dataComputed(params) {
                let _this = this;
                let _nid = params.id;
                let _value = params.value;
                let _data = _this.allData2;

                for (let x in _data) {
                    let i = _data[x];
                    for (let y in i) {
                        let z = i[y];
                        // z.nid = toString(parseInt(z.nid) - 81);
                        if (z.nid === _nid) {
                            z.value = _value;
                        }
                    }
                }

                _this.allData2 = _this.dataCalculate(_data);

                _this.initEchartData(_this.allData2);
                _this.dataFresh = !_this.dataFresh;
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

    .part1, .part2, .part3, .part4, .part5 {
        position: absolute;
    }

    .part1text {

    }

    .part1textinner {
        height: 70px;
        width: 170px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .part1textinner span {
        display: block;
        font-size: 20px;
        color: green;
    }

    .part1 {
        left: 160px;
    }

    .part2 {
        left: 370px;
    }

    .part3 {
        left: 580px;
    }

    .part4 {
        left: 790px;
    }

    .part5 {
        left: 1000px;
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

    .content-chart .pie_1 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 390px;
        left: 40px;
    }

    .content-chart .pie_2 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 390px;
        left: 400px;
    }

    .content-chart .pie_3 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 390px;
        left: 760px;
    }

    .content-chart .pie_4 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 390px;
        left: 1120px;
    }

    .content-chart .gauge {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 1210px;
    }

    .content-text-one, .content-text-two {
        border: 1px solid black;
        position: absolute;
        padding: 6px;
        width: 170px;
        height: 70px;
        border-radius: 10px;
    }

    .content-text-three {
        border: 1px solid black;
        position: absolute;
        padding: 6px;
        width: 200px;
        height: 100px;
        border-radius: 10px;
    }

    .content-text-one {
        top: 90px;
        left: 1000px;
        color: green;
    }

    .content-text-two {
        top: 270px;
        left: 1000px;
        color: green;
    }

    .content-text-three {
        top: 270px;
        left: 1260px;
    }

    .content-text-three .title {
        border-bottom: 1px solid black;
    }

    .content-text-three .content {
        margin-top: 10px;
        color: green;
    }

</style>