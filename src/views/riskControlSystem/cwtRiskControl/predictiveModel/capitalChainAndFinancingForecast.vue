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
    import mchart from './modelPublic/mchart'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'
    import mtable from './modelPublic/mtable'

    export default {
        name: "capitalChainAndFinancingForecast",
        mixins: [cwtPublicJs, dataCalculation],
        components: {
            cell,
            ccell,
            mchart,
            mtable
        },
        props: {},
        computed: {},
        watch: {},
        data() {
            return {

                tableData: [
                    {
                        "project": "结构性资产",
                        "formula": "可供出售金融资产+持有至到期投资+长期应收款+长期股权投资+投资性房地产+固定资产净值+在建工程+工程物资+固定资产清理+生产性生物资产+油气资产+无形资产+开发支出+商誉+长期待摊费用+递延所得税资产+其他非流动资产"
                    },
                    {
                        "project": "结构性负债",
                        "formula": "长期借款+应付债券+长期应付款+专项应付款+预计负债+递延所得税负债+其他非流动负债+实收资本+资本公积-库存股+盈余公积+未分配利润+少数股东权益"
                    },
                    {
                        "project": "经营性资产",
                        "formula": "应收账款+预付款项+应收利息+应收股利+其他应收款+存货+一年内到期的非流动资产+其他流动资产"
                    },
                    {
                        "project": "经营性负债",
                        "formula": "应付账款+预收款项+应付职工薪酬+应交税费+应付利息+应付股利+其他应付款+一年内到期的非流动负债+其他流动负债"
                    },
                    {
                        "project": "营运资本",
                        "formula": "结构性负债-结构性资产"
                    },
                    {
                        "project": "营运资金需求",
                        "formula": "经营性资产-经营性负债"
                    },
                    {
                        "project": "现金支付能力",
                        "formula": "营运资本-营运资金需求"
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
                    name: "结构性资产占用构型图",
                    data: []
                },
                pie_2EchartData: {
                    name: "结构性负债来源构成图",
                    data: []
                },
                pie_3EchartData: {
                    name: "经营性资产占用构成图",
                    data: []
                },
                pie_4EchartData: {
                    name: "经营性负债来源构成图",
                    data: []
                },
                gaugeEchartData: {
                    name: "现金支付能力",
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
                        _data.partx['cellData' + (_index - 18)] = item;
                    } else if (item.type === 'fc') {
                        _data.party['cellData' + (_index - 18)] = item;
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
                _this.initEchartData(_this.allData2);
            },
            /**
             * 初始化Echart
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                let pieIndex = {
                    index1:['81','213','215','216','217','218','219','220','221','222','223','224','225','226','227','228'],
                    index2:['82','229','230','231','232','233','234','86','235','237','236','90','238'],
                    index3:['83','239','240','241','87','90','242','243'],
                    index4:['83','239','88','244','245','246','92','247','248']
                };

                let emptyData = {
                    emptyData1: [],
                    emptyData2: [],
                    emptyData3: [],
                    emptyData4: []
                };

                for(let key in data){
                    let _data = data[key];
                    for(let _key in _data){
                        let __data = _data[_key];
                        let _m = {
                            name:__data.name,
                            value : __data.value
                        };
                        if(pieIndex.index1.indexOf(__data.nid) !== -1){
                            if(_m.value !== '0' && _m.value !== '0.00'){
                                emptyData.emptyData1.push(_m);
                            }
                        }else if(pieIndex.index2.indexOf(__data.nid) !== -1){
                            if(_m.value !== '0' && _m.value !== '0.00'){
                                emptyData.emptyData2.push(_m);
                            }
                        }else if(pieIndex.index3.indexOf(__data.nid) !== -1){
                            if(_m.value !== '0' && _m.value !== '0.00'){
                                emptyData.emptyData3.push(_m);
                            }
                        }else if(pieIndex.index4.indexOf(__data.nid) !== -1){
                            if(_m.value !== '0' && _m.value !== '0.00'){
                                emptyData.emptyData4.push(_m);
                            }
                        }
                    }
                }

                _this.pie_1EchartData.data = emptyData.emptyData1;
                _this.pie_2EchartData.data = emptyData.emptyData2;
                _this.pie_3EchartData.data = emptyData.emptyData3;
                _this.pie_4EchartData.data = emptyData.emptyData4;
                _this.gaugeEchartData.data = data.partx.cellData1;

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
    .content-table {
        position: absolute;
        top: 700px;
        width: 100%;
    }
</style>