<template>
    <div>
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
                        1,271 36,271 36,361 1,361 36,361 36,451 1,451 "
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

            </div>

            <div class="content-chart">

                <div class="gauge_1">
                    <mchart
                            :echartData="gauge_1EchartData"
                            :dataFresh="dataFresh"
                            :dataType="'gauge'">
                    </mchart>
                </div>

                <div class="gauge_2">
                    <mchart
                            :echartData="gauge_2EchartData"
                            :dataFresh="dataFresh"
                            :dataType="'gauge'">
                    </mchart>
                </div>

                <div class="pie">
                    <mchart
                            :echartData="pieEchartData"
                            :dataFresh="dataFresh"
                            :dataType="'pie'">
                    </mchart>
                </div>

            </div>

            <div class="content-text">
                <div class="title">
                    <span>资产结构状况</span>
                </div>

                <div class="content">
                    <p>
                        总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                    </p>
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
        name: "assetStructurePrediction",
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
                allData: {
                    part1: {
                        cellData1: {
                            id: '001',
                            name: '营业收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '利润总额',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '财务费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '流动资产',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData5: {
                            id: '001',
                            name: '资产总计',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData6: {
                            id: '001',
                            name: '负债合计',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part2: {
                        cellData1: {
                            id: '001',
                            name: '资产负债率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '流动资产增长率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '营业收入增长率（%）',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    partx: {},
                    party: {}
                },
                gauge_1EchartData: {
                    name: '总资产报酬率（%）',
                    data: []
                },
                gauge_2EchartData: {
                    name: '总资产增长率（%）',
                    data: []
                },
                pieEchartData: {
                    name: '资产、负债、权益构成图',
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
             * 获取真实数据
             */
            getRealData() {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '2'
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
                    partx: {},
                    party: {}
                };

                data.forEach((item, index) => {
                    // let _sort = item['SORT'];
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 6) {
                            _data.part1['cellData' + _index] = item;
                        } else if (_index > 6 && _index <= 9) {
                            _data.part2['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _data.partx['cellData' + (_index - 9)] = item;
                    } else if (item.type === 'fc') {
                        _data.party['cellData' + _index] = item;
                    }
                });
                _this.allData = _data;
                _this.initData();
            },

            /**
             * 初始化数据
             */
            initData() {
                let _this = this;
                let _data = _this.allData;
                _this.allData = _this.dataCalculate(_data);
                _this.initEchartData(_this.allData);
            },

            /**
             * 初始化Echart
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                let emptyData = [];
                let eD = ['20', '24', '249', '250'];
                for (let x in data) {
                    let i = data[x];
                    for (let y in i) {
                        let z = i[y];
                        if (eD.indexOf(z.nid) !== -1) {
                            let _m = {name: '', value: 0};
                            _m.name = z.name;
                            _m.value = z.value;
                            if(_m.value !== '0' && _m.value !== '0.00'){
                                emptyData.push(_m);
                            }
                        }
                    }
                }
                _this.gauge_1EchartData.data = data.partx.cellData1;
                _this.gauge_1EchartData.data = data.partx.cellData2;
                _this.pieEchartData.data = emptyData;
                _this.dataFresh = !_this.dataFresh;
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
                _this.initEchartData(_this.allData);
            },
        }
    }
</script>

<style scoped>

    .content-all {
        margin-top: 50px;
        position: relative;
    }

    .content-cell {
        display: flex;

    }

    .part1, .part2, .svg-first {
        position: absolute;
    }

    .part1 {
        left: 150px;
    }

    .part2 {
        left: 450px;
    }

    .part1cell {
        margin-bottom: 20px;
    }

    .part2cell {
        margin-bottom: 20px;
    }

    .cell {

    }

    .svg-first {
        left: 350px;
        top: 30px
    }

    .content-chart .pie {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 300px;
        left: 1000px;
    }

    .content-chart .gauge_1 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 700px;
    }

    .content-chart .gauge_2 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 1000px;
    }

    .content-text {
        position: absolute;
        width: 300px;
        height: 230px;
        top: 300px;
        left: 600px;
        border: 2px solid #303133;
        padding-top: 20px;
        border-radius: 10px;
    }

    .content-text .title {
        font-size: 22px;
        text-align: left;
        padding-left: 16px;
    }

    .content-text .content {
        font-size: 18px;
        padding: 16px;
        text-indent: 36px;
        line-height: 30px;
        color: #bd2c00;
    }

</style>