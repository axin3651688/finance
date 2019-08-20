<template>
    <div>

        <div class="top-button">

            <div class="button-right">
                <el-select
                        v-model="selectValue"
                        placeholder="请选择模板"
                        class="button-right-select"
                        value=""
                        @change="modelChange"
                >
                    <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <el-button
                        @click="modelSave"
                >
                    保存
                </el-button>
                <el-button
                        @click="modelReset">
                    重置
                </el-button>
            </div>

        </div>

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
                            :dataType="pie1HasNagetiveData === true ? 'bar' : 'pie'">
                    </mchart>
                </div>

                <div class="pie_2">
                    <mchart
                            :echartData="pie_2EchartData"
                            :dataFresh="dataFresh"
                            :dataType="pie2HasNagetiveData === true ? 'bar' : 'pie'">
                    </mchart>
                </div>

                <div class="pie_3">
                    <mchart
                            :echartData="pie_3EchartData"
                            :dataFresh="dataFresh"
                            :dataType="pie3HasNagetiveData === true ? 'bar' : 'pie'">
                    </mchart>
                </div>

                <div class="pie_4">
                    <mchart
                            :echartData="pie_4EchartData"
                            :dataFresh="dataFresh"
                            :dataType="pie4HasNagetiveData === true ? 'bar' : 'pie'">
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
                <div class="content-text-one" :style="{color: conclusionData.f1.color}">
                    {{conclusionData.f1.content}}
                </div>
                <div class="content-text-two" :style="{color: conclusionData.f2.color}">
                    {{conclusionData.f2.content}}
                </div>
                <div class="content-text-three">
                    <div class="title">
                        现金支付能力状况
                    </div>
                    <div class="content" :style="{color: conclusionData.f3.color}">
                        {{conclusionData.f3.content}}
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

        <div class="dialog-components">
            <el-dialog
                    :title="'模型保存参数设置'"
                    width="40%"
                    top="200px"
                    :close-on-click-modal="dialogCloseByClockOther"
                    :visible.sync="dialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <div class="model-name">
                    <span class="model-name-title">请输入模板名称：</span>
                    <el-input
                            v-model="modelName"
                            placeholder="模板名称"
                    ></el-input>
                </div>
                <div class="model-button">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="modelSaveSend('0')">确 定</el-button>
                </div>

            </el-dialog>
        </div>

        <div class="dialog-components">
            <el-dialog
                    :title="'模型保存参数设置'"
                    width="40%"
                    top="200px"
                    :close-on-click-modal="dialogCloseByClockOther"
                    :visible.sync="changeDialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <div class="model-name">
                    <span class="model-name-title">是否修改该模板数据</span>
                </div>
                <div class="model-button">
                    <el-button @click="changeDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="modelSaveSend('1')">确 定</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import dataCalculation from '../mixin/dataCalculation'
    import mchart from './modelPublic/mchart'
    import {
        getPredictiveModelSelect,
        predictiveModel,
        predictiveModelSave
    } from '~api/cwtRiskControl/riskControlRequest'
    import mtable from './modelPublic/mtable'
    import {mapGetters} from "vuex"

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
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            company(newValue, oldValue) {
                this.getRealData();
                this.getSelectOptions();
            },
            year(newValue, oldValue) {
                this.getRealData();
                this.getSelectOptions();
            },
            month(newValue, oldValue) {
                this.getRealData();
                this.getSelectOptions();
            }
        },
        data() {
            return {
                selectOptions: [
                    {
                        value: '模板一',
                        lable: '001'
                    },
                    {
                        value: '模板二',
                        lable: '002'
                    }
                ],
                selectValue: '',
                dialogCloseByClockOther: false,
                dialogVisible: false,
                modelName: '',
                changeDialogVisible: false,


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
                        "align": "left",
                        "width": "300"
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
                allData2: {},


                pie1HasNagetiveData: false,
                pie2HasNagetiveData: false,
                pie3HasNagetiveData: false,
                pie4HasNagetiveData: false,
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
                dataFresh: false,


                conclusionData: {
                    f1: {
                        color: '',
                        content: ''
                    },
                    f2: {
                        color: '',
                        content: ''
                    },
                    f3: {
                        color: '',
                        content: ''
                    }
                },

                cCapitalChainAndFinancingForecast: {
                    f1: {
                        clu1: {
                            color: 'green',
                            //营运资本>0
                            content: '投融资活动是协调的'
                        },
                        clu2: {
                            color: 'red',
                            //else
                            content: '投融资活动存在资金缺口，并需要占用流动资金为：round'
                        }
                    },
                    f2: {
                        clu1: {
                            color: 'green',
                            //营运资金需求<0
                            content: '经营活动是协调的'
                        },
                        clu2: {
                            color: 'red',
                            //else
                            content: '经营活动存在资金缺口为:round'
                        }
                    },
                    f3: {
                        clu1: {
                            color: 'green',
                            //现金支付能力>0, 营运资金需求>0, 营运资本>0, 营运资本>营运资金需求
                            content: '协调且有支付能力'
                        },
                        clu2: {
                            color: 'green',
                            //AND(现金支付能力>0,营运资金需求<0, 营运资本>0
                            content: '资金大量富裕'
                        },
                        clu3: {
                            color: 'black',
                            //现金支付能力>0,营运资金需求<0, 营运资本<0, ABS(营运资本)<ABS(营运资金需求)
                            content: '不协调但能够维持'
                        },
                        clu4: {
                            color: 'black',
                            //现金支付能力<0, 营运资金需求<0, 营运资本<0,ABS(营运资本)>ABS(营运资金需求)
                            content: '不协调'
                        },
                        clu5: {
                            color: 'red',
                            //现金支付能力<0,营运资金需求>0,营运资本>0,营运资本<营运资金需求
                            content: '协调但有支付困难'
                        },
                        clu6: {
                            color: 'red',
                            //else
                            content: '严重不协调'
                        }
                    }
                }

            }
        },
        created() {
        },
        mounted() {
            this.getRealData();
            this.getSelectOptions();
        },
        methods: {
            /**
             * 请求真实数据
             */
            getRealData(modelId) {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '6'
                };
                if (modelId) {
                    params['versioncode'] = modelId;
                }
                predictiveModel(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.resDataFormatter(res.data.data[1]);
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
                    index1: ['81', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226', '227', '228'],
                    index2: ['82', '229', '230', '231', '232', '233', '234', '86', '235', '237', '236', '90', '238'],
                    index3: ['83', '239', '240', '241', '87', '90', '242', '243'],
                    index4: ['83', '239', '88', '244', '245', '246', '92', '247', '248']
                };

                let nagetiveData1Count = 0;
                let nagetiveData2Count = 0;
                let nagetiveData3Count = 0;
                let nagetiveData4Count = 0;
                let emptyData = {
                    emptyData1: [],
                    emptyData2: [],
                    emptyData3: [],
                    emptyData4: []
                };

                for (let key in data) {
                    let _data = data[key];
                    for (let _key in _data) {
                        let __data = _data[_key];
                        let _m = {
                            name: __data.name,
                            value: __data.value
                        };
                        if (pieIndex.index1.indexOf(__data.nid) !== -1) {
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                if (parseFloat(_m.value) < 0) {
                                    nagetiveData1Count++;
                                }
                                emptyData.emptyData1.push(_m);
                            }
                        } else if (pieIndex.index2.indexOf(__data.nid) !== -1) {
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                if (parseFloat(_m.value) < 0) {
                                    nagetiveData2Count++;
                                }
                                emptyData.emptyData2.push(_m);
                            }
                        } else if (pieIndex.index3.indexOf(__data.nid) !== -1) {
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                if (parseFloat(_m.value) < 0) {
                                    nagetiveData3Count++;
                                }
                                emptyData.emptyData3.push(_m);
                            }
                        } else if (pieIndex.index4.indexOf(__data.nid) !== -1) {
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                if (parseFloat(_m.value) < 0) {
                                    nagetiveData4Count++;
                                }
                                emptyData.emptyData4.push(_m);
                            }
                        }
                    }
                }

                _this.pie1HasNagetiveData = nagetiveData1Count > 0;
                _this.pie2HasNagetiveData = nagetiveData2Count > 0;
                _this.pie3HasNagetiveData = nagetiveData3Count > 0;
                _this.pie4HasNagetiveData = nagetiveData4Count > 0;

                _this.pie_1EchartData.data = emptyData.emptyData1;
                _this.pie_2EchartData.data = emptyData.emptyData2;
                _this.pie_3EchartData.data = emptyData.emptyData3;
                _this.pie_4EchartData.data = emptyData.emptyData4;
                _this.gaugeEchartData.data = data.partx.cellData1;

                this.getConclusionData();

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
                        if (z.nid === _nid) {
                            let __value = _value.replace(/,/g, '');
                            if (__value * 1 === z.value * 1) {
                                return;
                            }
                            z.value = _value;
                        }
                    }
                }
                _this.allData2 = _this.dataCalculate(_data);
                _this.initEchartData(_this.allData2);
            },

            /**
             * 模板保存弹窗调出
             */
            modelSave() {
                let _this = this;
                if (_this.selectValue !== '') {
                    _this.changeDialogVisible = true;
                } else {
                    _this.dialogVisible = true;
                }
            },

            /**
             * 模板保存请求发送
             */
            modelSaveSend(status) {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let _date = new Date();

                let _time = _date.getTime();

                let params = {
                    "company": company,
                    "list": [
                        {
                            "scode": 0,
                            "val": "string"
                        }
                    ],
                    "period": _this.getPeriod(),
                    "spcode": '6',
                    "version": _this.modelName,
                    "versioncode": _time,
                    "status": status
                };
                params.list = _this.getSaveData();

                if (status === '1') {
                    let _code = _this.selectOptions.filter((o) => {
                        return o.value === _this.selectValue;
                    });
                    params.versioncode = _code[0].lable;
                }

                predictiveModelSave(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.dialogVisible = false;
                        _this.changeDialogVisible = false;

                        this.getSelectOptions();
                        this.selectValue = _this.modelName;

                        _this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    }
                })
            },
            /**
             * 模板重置
             */
            modelReset() {
                this.getRealData();
            },

            /**
             * 获取select options
             */
            getSelectOptions() {
                let _this = this;
                let _getters = _this.$store.getters,
                    company = _getters.company;
                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '6'
                };
                getPredictiveModelSelect(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.selectOptions = res.data.data;
                        _this.selectOptions.push({lable: '', value: ''})
                    }
                })
            },

            /**
             * 选择模板
             */
            modelChange(p) {
                let _this = this;
                let options = _this.selectOptions;
                let option = options.filter((o) => {
                    return o.value === p;
                });
                let vcode = option[0].lable;
                _this.getRealData(vcode);
            },

            /**
             * 获取要保存的data
             */
            getSaveData() {
                let _this = this;
                let _list = [];
                let data = _this.allData2;
                for (let key in data) {
                    let _data = data[key];
                    for (let _key in _data) {
                        let __data = _data[_key];
                        if (__data.type === 's') {
                            let emptyData = {
                                scode: parseInt(__data.nid),
                                val: __data.value
                            };
                            _list.push(emptyData);
                        }
                    }
                }
                return _list;
            },


            /**
             * 获取文字评论
             */
            getConclusionData() {
                let _this = this;
                let _conclusionData = _this.conclusionData;
                let _cCapitalChainAndFinancingForecast = _this.cCapitalChainAndFinancingForecast;
                let _newData = _this.setDataToList1(_this.allData2);
                let _needData = {
                    yyzb: '97',
                    yyzjxq: '98',
                    xjzfnl: '99'

                };
                for (let _x in _needData) {
                    let _a = _needData[_x];
                    let _va = _newData.filter((i) => {
                        return i.nid === _a;
                    });
                    _needData[_x] = _va[0].value.replace(/,/g, '') * 1;

                }

                let _flag = 0;
                for (let k1 in _conclusionData) {
                    if (k1 === 'f1') {
                        if (_needData.yyzb > 0) {
                            _flag = 1;
                        } else {
                            _flag = 2;
                        }

                        if(_needData.yyzb === 0) _flag = 0;
                    } else if (k1 === 'f2') {
                        if (_needData.yyzjxq < 0) {
                            _flag = 1;
                        } else {
                            _flag = 2;
                        }
                        if(_needData.yyzjxq === 0) _flag = 0;
                    } else if (k1 === 'f3') {
                        if (_needData.xjzfnl > 0 && _needData.yyzjxq > 0 && _needData.yyzb > 0 && _needData.yyzb > _needData.yyzjxq) {
                            _flag = 1;
                        } else if (_needData.xjzfnl > 0 && _needData.yyzb > 0 && _needData.yyzjxq < 0) {
                            _flag = 2;
                        } else if (_needData.xjzfnl > 0 && _needData.yyzjxq < 0 && _needData.yyzb < 0 && Math.abs(_needData.yyzb) < Math.abs(_needData.yyzjxq)) {
                            _flag = 3;
                        } else if (_needData.xjzfnl < 0 && _needData.yyzjxq > 0 && _needData.yyzb < 0 && Math.abs(_needData.yyzb) > Math.abs(_needData.yyzjxq)) {
                            _flag = 4;
                        } else if (_needData.xjzfnl < 0 && _needData.yyzjxq > 0 && _needData.yyzb > 0 && _needData.yyzb < _needData.yyzjxq) {
                            _flag = 5;
                        } else {
                            _flag = 6;
                        }

                        if(_needData.xjzfnl === 0 && _needData.yyzb === 0 && _needData.yyzjxq === 0) _flag = 0;

                    }


                    let _index = 'clu' + _flag;
                    if (_flag === 0) {
                        _conclusionData[k1].color = 'black';
                        _conclusionData[k1].content = '此期间无数据';
                    } else {
                        _conclusionData[k1].color = _cCapitalChainAndFinancingForecast[k1][_index].color;
                        _conclusionData[k1].content = _cCapitalChainAndFinancingForecast[k1][_index].content;
                    }


                    if (k1 === 'f1') {
                        if (_conclusionData[k1].content.indexOf('round') !== -1) {
                            let _n = _this.setNumberToStander(_needData.yyzb);
                            _conclusionData[k1].content = _conclusionData[k1].content.replace('round', _n);
                        }

                    } else if (k1 === 'f2') {
                        if (_conclusionData[k1].content.indexOf('round') !== -1) {
                            let _m = _this.setNumberToStander(_needData.yyzjxq);
                            _conclusionData[k1].content = _conclusionData[k1].content.replace('round', _m);
                        }
                    }
                }

            }
        }
    }
</script>

<style scoped>

    .top-button {
        height: 50px;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-right: 20px;
        padding: 0 10px;
        align-items: center;
        border-radius: 10px;
        background-color: #D3DCE6;
        display: flex;
        justify-content: flex-end;
    }

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
        font-size: 14px;
        line-height: 20px;
        height: 70px;
        border-radius: 10px;
    }

    .content-text-three {
        border: 1px solid black;
        position: absolute;
        padding: 6px;
        width: 200px;
        font-size: 14px;
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

    .button-right-select {
        margin-right: 10px;
    }

    .model-name {
        display: flex;
        margin: 30px 20px;
    }

    .model-name-title {
        width: 160px;
        align-items: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    .model-button {
        display: flex;
        justify-content: flex-end;
    }
</style>