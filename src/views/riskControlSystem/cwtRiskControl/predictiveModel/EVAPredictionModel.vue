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
                        <polyline points="36,1 71,1 36,1 36,321 1,321, 71,321, 36,321 36,641 71,641"
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

                <div class="svg-second">
                    <svg width="150px" height="450px">
                        <polyline
                                points="36,1 71,1 36,1 36,131 71,131 36,131 36,201 1,201 36,201 36,261 71,261 36,261 36,391 71,391"
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

            <div class="content-table">
                <mtable
                        :tableData="tableData"
                        :columns="tableColumns"
                        :height="tableHeight"
                >
                </mtable>
            </div>
        </div>
    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import dataCalculation from '../mixin/dataCalculation'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'
    import mtable from './modelPublic/mtable'

    export default {
        name: "EVAPredictionModel",
        mixins: [cwtPublicJs, dataCalculation],
        components: {
            cell,
            ccell,
            mtable
        },
        props: {},
        computed: {},
        watch: {},
        data() {
            return {

                tableData: [
                    {
                        "project": "期初无息流动负债",
                        "formula": "(期初应付票据+期初应付账款+期初应付利息+期初预收款项+期初其他应付款+期初其他流动负债+期初应交税费)"
                    },
                    {
                        "project": "期末无息流动负债",
                        "formula": "(期末应付票据+期末应付账款+期末应付利息+期末预收款项+期末其他应付款+期末其他流动负债+期末应交税费)"
                    },
                    {
                        "project": "平均无息流动负债",
                        "formula": "(期初无息流动负债+期末无息流动负债)/2"
                    },
                    {
                        "project": "所得税率",
                        "formula": "所得税费用/利润总额*100"
                    },
                    {
                        "project": "平均在建工程",
                        "formula": "(期初在建工程+期末在建工程)/2"
                    },
                    {
                        "project": "平均所有者权益",
                        "formula": "(期初所有者权益+期末所有者权益)/2"
                    },
                    {
                        "project": "平均负债",
                        "formula": "(期初负债总额+期末负债总额)/2"
                    },
                    {
                        "project": "税后净营业利润",
                        "formula": "净利润+(研究开发+利息支出-(营业外收入-营业外支出)/2)*0.75"
                    },
                    {
                        "project": "调整后资本",
                        "formula": "平均所有者权益+平均负债-(期初无息流动负债+期末无息流动负债)/2-平均在建工程"
                    },
                    {
                        "project": "平均资本成本率",
                        "formula": "0.055*当前月份/12"
                    },
                    {
                        "project": "经济增加值(EVA)",
                        "formula": "税后净营业利润-调整后资本*平均资本成本率"
                    }
                ],
                tableColumns: [
                    {
                        "id": "project",
                        "type": "string",
                        "text": "项目",
                        "align": "left"
                    },
                    {
                        "id": "formula",
                        "type": "string",
                        "text": "计算公式",
                        "align": "left"
                    }
                ],
                tableHeight: 500,
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
            this.getRealData();
        },
        methods: {
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
                        // z.nid = toString(parseInt(z.nid) - 81);
                        if (z.nid === _nid) {
                            z.value = _value;
                        }
                    }
                }
                _this.allData = _this.dataCalculate(_data);
            },
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
                    spcode: '5'
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
                        if (_index <= 1) {
                            _data.part1['cellData' + _index] = item;
                        } else if (_index > 1 && _index <= 4) {
                            _data.part2['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 12) {
                            _data.part3['cellData' + _index] = item;
                        } else if (_index > 12 && _index <= 20) {
                            _data.part4['cellData' + _index] = item;
                        } else if (_index > 20 && _index <= 34) {
                            _data.part5['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _data.partx['cellData' + (_index - 34)] = item;
                    } else if (item.type === 'fc') {
                        _data.party['cellData' + (_index - 34)] = item;
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

    .content-table {
        position: absolute;
        top: 1400px;
        width: 100%;
    }
</style>