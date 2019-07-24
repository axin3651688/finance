<template>
    <div>
        <div class="top-button">
            <div class="button-left">
                <el-button
                        class="bq"
                        :type="this.buttonType === 'fzjyknx' ? 'primary' : ''"
                        @click="topButtonClick('fzjyknx')"
                >负债经营可能性
                </el-button>
                <el-button
                        class="lj"
                        :type="this.buttonType === 'zfnl' ? 'primary' : ''"
                        @click="topButtonClick('zfnl')"
                >支付能力
                </el-button>
                <el-button
                        class="lj"
                        :type="this.buttonType === 'ldfzbl' ? 'primary' : ''"
                        @click="topButtonClick('ldfzbl')"
                >流动/负债比率
                </el-button>
                <el-button
                        class="lj"
                        :type="this.buttonType === 'cdqlxnl' ? 'primary' : ''"
                        @click="topButtonClick('cdqlxnl')"
                >长/短期利息能力
                </el-button>
            </div>

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

        <div class="fzjyknx" v-if="this.buttonType === 'fzjyknx'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData1" :class="key + 'data1'">
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
                    <div class="svg-first-data1">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,135 71,135 36,135 36,181 1,181, 36,181 36,271 1,271 "
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>

                    <div class="svg-second-data1">
                        <svg width="150px" height="180px">
                            <polyline points="1,1 36,1 36,46 71,46 36,46 36,91 1,91"
                                      fill="none" stroke="black"
                                      stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_1">
                    <div class="title">
                        <span>负债经营可能性</span>
                    </div>

                    <div class="content" :style="{color:conclusionData.f1.s1.color}">
                        <p>
                            {{conclusionData.f1.s1.content}}
                        </p>
                    </div>
                </div>

                <div class="content-table" style="top: 370px">
                    <mtable
                            :tableData="tableData"
                            :columns="tableColumns"
                            :height="tableHeight"
                    >
                    </mtable>
                </div>
            </div>
        </div>

        <div class="zfnl" v-if="this.buttonType === 'zfnl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData2" :class="key + 'data2'">
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
                    <div class="svg-first-data2">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,135 71,135 36,135 36,181 1,181, 36,181 36,271 1,271 "
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>

                    <div class="svg-second-data2">
                        <svg width="150px" height="200px">
                            <polyline points="1,1 36,1  36,91 1,91 71,91 36,91 36,181 1,181 "
                                      fill="none" stroke="black"
                                      stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_1">
                    <div class="title">
                        <span>支付能力状况</span>
                    </div>

                    <div class="content">
                        <div class="content-title">
                            <span>从支付能力来看</span>
                        </div>
                        <p :style="{color:conclusionData.f2.s1.color}">
                            {{conclusionData.f2.s1.content}}
                        </p>
                        <div class="content-title">
                            <span>从发展角度来看</span>
                        </div>
                        <p :style="{color:conclusionData.f2.s2.color}">
                            {{conclusionData.f2.s2.content}}
                        </p>
                    </div>
                </div>

                <div class="content-table" style="top: 370px">
                    <mtable
                            :tableData="tableData"
                            :columns="tableColumns"
                            :height="tableHeight"
                    >
                    </mtable>
                </div>
            </div>
        </div>

        <div class="ldfzbl" v-if="this.buttonType === 'ldfzbl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData3" :class="key + 'data3'">
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
                    <div class="svg-first-data3">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 71,91 36,91  36,181 1,181"
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_2_1 content-text_2">
                    <div class="title">
                        <span>速动比率</span>
                    </div>

                    <div class="content" style="color: green">
                        <p :style="{color:conclusionData.f3.s1.color}">
                            {{conclusionData.f3.s1.content}}
                        </p>
                    </div>
                </div>
                <div class="content-text_2_2 content-text_2">
                    <div class="title">
                        <span>流动比率</span>
                    </div>

                    <div class="content" style="color: green">
                        <p :style="{color:conclusionData.f3.s2.color}">
                            {{conclusionData.f3.s2.content}}
                        </p>
                    </div>
                </div>

                <div class="content-chart content-chart-1">
                    <div class="gauge">
                        <mchart
                                :echartData="gauge_1EchartData"
                                :dataFresh="dataFresh"
                                :dataType="'gauge'">
                        </mchart>
                    </div>
                </div>

                <div class="content-table" style="top: 300px">
                    <mtable
                            :tableData="tableData"
                            :columns="tableColumns"
                            :height="tableHeight"
                    >
                    </mtable>
                </div>

            </div>
        </div>

        <div class="cdqlxnl" v-if="this.buttonType === 'cdqlxnl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData4" :class="key + 'data4'">
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
                    <div class="svg-first-data4">
                        <svg width="150px" height="540px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,181 1,181, 36,181 36,226 71,226 36,226 36,271,
                                            1,271 36,271 36,361 1,361 36,361 36,451 1,451"
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="content-text_2_1 content-text_2 content-text_3">
                    <div class="title">
                        <span>短期付息能力状况</span>
                    </div>

                    <div class="content" style="color: green">
                        <p :style="{color:conclusionData.f4.s1.color}">
                            {{conclusionData.f4.s1.content}}
                        </p>
                    </div>
                </div>
                <div class="content-text_2_2 content-text_2 content-text_4">
                    <div class="title">
                        <span>长期付息能力状况</span>
                    </div>

                    <div class="content">
                        <p :style="{color:conclusionData.f4.s2.color}">
                            {{conclusionData.f4.s2.content}}
                        </p>
                    </div>
                </div>

                <div class="content-chart content-chart-2">
                    <div class="gauge">
                        <mchart
                                :echartData="gauge_2EchartData"
                                :dataFresh="dataFresh"
                                :dataType="'gauge'">
                        </mchart>
                    </div>
                </div>

                <div class="content-table" style="top: 600px">
                    <mtable
                            :tableData="tableData"
                            :columns="tableColumns"
                            :height="tableHeight"
                    >
                    </mtable>
                </div>

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
        name: "forecastOfSolvency",
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

                conclusionData: {
                    f1: {
                        s1: {
                            color: '',
                            content: ''
                        },
                    },
                    f2: {
                        s1: {
                            color: '',
                            content: ''
                        },
                        s2: {
                            color: '',
                            content: ''
                        }
                    },
                    f3: {
                        s1: {
                            color: '',
                            content: ''
                        },
                        s2: {
                            color: '',
                            content: ''
                        }
                    },
                    f4: {
                        s1: {
                            color: '',
                            content: ''
                        },
                        s2: {
                            color: '',
                            content: ''
                        }
                    },
                },

                buttonType: 'fzjyknx',

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
                        "project": "付息负债",
                        "formula": "短期借款+一年内到期的非流动负债+长期借款"
                    },
                    {
                        "project": "实际借款利率(%)",
                        "formula": "财务费用/((付息负债+(年初短期借款+年初一年内到期的非流动负债+年初长期借款))/2)*100"
                    },
                    {
                        "project": "财务风险系数",
                        "formula": "(1+付息负债/股东权益合计)*(1-(财务费用/(财务费用+利润总额)))"
                    },
                    {
                        "project": "现金支付能力",
                        "formula": "(货币资金+交易性金融资产+应收票据)-(短期借款+交易性金融负债+应付票据)"
                    },
                    {
                        "project": "偿还负债支付的现金",
                        "formula": "年初流动资产合计*(1+(营业利润/((年初流动资产+年末流动资产)/2))/流动资产合计)^((营业收入/当前月份)/((年初流动资产合计+流动资产合计)/2))"
                    },
                    {
                        "project": "流动比率(%)",
                        "formula": "流动资产/流动负债*100"
                    },
                    {
                        "project": "速动比率(%)",
                        "formula": "(流动资产合计-存货)/流动负债合计*100"
                    },
                    {
                        "project": "已获利息倍数(倍)",
                        "formula": "(利润总额+利息支出)/利息支出"
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

                allData: {},

                echartData: {},
                dataFresh: false,
                gauge_1EchartData: {
                    name: '速动比率行业对标预警',
                    data: []
                },
                gauge_2EchartData: {
                    name: '已获利息倍数（倍）',
                    data: []
                },


                cForecastOfSolvency: {
                    f1: {
                        s1: {
                            clu1: {
                                color: 'red',
                                //付息负债的期末数=0
                                content: '本公司无付息负债，不存在负债经营风险。'
                            },
                            clu2: {
                                color: 'red',
                                //净利润的累计数<=0
                                content: '公司净利润为负，负债经营是否可行，取决于能否扭亏为盈。'
                            },
                            clu3: {
                                color: 'red',
                                //净利润的累计数>0,财务风险系数<1
                                content: '从公司当期资本结构、借款利率和盈利水平三者的关系来看，公司增加负债不会增加公司的盈利水平，相反会降低公司现在的盈利水平。'
                            },
                            clu4: {
                                color: 'red',
                                //净利润的累计数>0,财务风险系数>=1
                                content: '从公司当期资本结构、借款利率和盈利水平三者的关系来看，公司增加负债能够给企业带来利润的增加，负债经营可行。'
                            }
                        }
                    },
                    f2: {
                        s1: {
                            clu1: {
                                color: 'green',
                                //现金支付能力<=0,短期借款的期末余额>应付票据的期末余额
                                content: '从支付能力来看，日常现金支付资金比较紧张，主要依靠短期借款。'
                            },
                            clu2: {
                                color: 'green',
                                //现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                                content: '从支付能力来看，日常现金支付资金比较紧张，主要依靠应付票据。'
                            },
                            clu3: {
                                color: 'green',
                                //else
                                content: '有现金支付能力的。'
                            }
                        },
                        s2: {
                            clu1: {
                                color: 'black',
                                //偿还流动负债的资金<(1/2*流动负债合计的期末余额
                                content: '从发展角度来看，按照当前资产的周转速度和盈利水平，公司短期债务的偿还没有充足的资金保证，需要依靠借新债还旧债。'
                            },
                            clu2: {
                                color: 'black',
                                //else
                                content: '从发展角度来看，按照当前资产的周转速度和盈利水平，公司有能力偿还短期借款。'
                            }
                        }
                    },
                    f3: {
                        s1: {
                            clu1: {
                                color: 'blue',
                                //流动比率<=0.8
                                content: '当期流动比率过低，如果经营形势没有大的变化，偿还流动负债比较困难。'
                            },
                            clu2: {
                                color: 'blue',
                                //0.8<流动比率<1.2
                                content: '流动资产处于相对较低水平，流动比率不太合理。'
                            },
                            clu3: {
                                color: 'blue',
                                //else
                                content: '用当期流动资产偿还流动负债，没有困难，流动比率比较合理。'
                            }
                        },
                        s2: {
                            clu1: {
                                color: 'black',
                                //速动比率<=0.6
                                content: '速动资产过低，速动比率不太合理。'
                            },
                            clu2: {
                                color: 'black',
                                //0.6<速动比率<1
                                content: '速动资产处于相对较低水平。'
                            },
                            clu3: {
                                color: 'black',
                                //else
                                content: '速动资产充足，速动比率合理。'
                            }
                        }
                    },
                    f4: {
                        s1: {
                            clu1: {
                                color: 'purpule',
                                //现金支付能力<=0,短期借款期末数>应付票据期末数
                                content: '从短期来看，公司经营活动的资金主要依靠短期借款。全部偿还短期债务本息会有一定困难。'
                            },
                            clu2: {
                                color: 'purpule',
                                //现金支付能力<=0, 短期借款期末数<应付票据期末数
                                content: '从短期来看，公司经营活动的资金主要依靠应付票据。全部偿还短期债务本息会有一定困难。'
                            },
                            clu3: {
                                color: 'purpule',
                                //else
                                content: '从短期来看，公司拥有支付利息的能力。'
                            }
                        },
                        s2: {
                            clu1: {
                                color: 'black',
                                //财务费用累计数<=0
                                content: '本期财务费用为负，无法进行长期付息能力判断。'
                            },
                            clu2: {
                                color: 'black',
                                //财务费用累计数>0,利润总额累计数<0
                                content: '本期亏损，利息支出没有保障。'
                            },
                            clu3: {
                                color: 'black',
                                //财务费用累计数>0,利润总额累计数=0
                                content: '本期没有实现盈利，利息支出没有保障。'
                            },
                            clu4: {
                                color: 'black',
                                //财务费用累计数>0,利润总额累计数>0,利息保障倍数>=4
                                content: '从盈利情况来看，公司盈利对利息的保障倍数为lxbzbsdown倍。从实现利润和利息的关系来看，公司盈利能力较强，利息支付有保证。'
                            },
                            clu5: {
                                color: 'black',
                                //财务费用累计数>0,利润总额累计数>0,1<=利息保障倍数<4
                                content: '从盈利情况来看，公司盈利对利息的保障倍数为lxbzbs倍。公司盈利能力对利息的保障程度偏低。'
                            },
                            clu6: {
                                color: 'black',
                                //财务费用累计数>0,利润总额累计数>0,利息保障倍数<=1
                                content: '从盈利情况来看，公司盈利对利息的保障倍数为"&利息保障倍数&"倍。公司盈利能力对利息的保障程度比较差。'
                            }
                        }
                    },
                },
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
             * 单元格数据发生改变
             * @param type
             */
            topButtonClick(type) {
                this.buttonType = type;
            },
            /**
             * 获取真实数据
             */
            getRealData(modelId) {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '3'
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
                let _allData = {
                    allData1: {
                        part1: {},
                        part2: {},
                        part3: {},
                        partx: {},
                        party: {}
                    },
                    allData2: {
                        part1: {},
                        part2: {},
                        part3: {},
                        partx: {},
                        party: {}
                    },
                    allData3: {
                        part1: {},
                        part2: {},
                        partx: {},
                        party: {}
                    },
                    allData4: {
                        part1: {},
                        part2: {},
                        partx: {},
                        party: {}
                    }
                };
                let _data = {
                    data1: [],
                    data2: [],
                    data3: [],
                    data4: []
                };
                data.forEach((item) => {
                    let _sort = item['SORT'];
                    if (_sort < 2000) {
                        _data.data1.push(item);
                    } else if (_sort > 2000 && _sort < 3000) {
                        _data.data2.push(item);
                    } else if (_sort > 3000 && _sort < 4000) {
                        _data.data3.push(item);
                    } else if (_sort > 4000) {
                        _data.data4.push(item);
                    }
                });

                _data.data1.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 4) {
                            _allData.allData1.part1['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 6) {
                            _allData.allData1.part2['cellData' + _index] = item;
                        } else if (_index > 6) {
                            _allData.allData1.part3['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData1.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData1.party['cellData' + _index] = item;
                    }
                });

                _data.data2.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 4) {
                            _allData.allData2.part1['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 7) {
                            _allData.allData2.part2['cellData' + _index] = item;
                        } else if (_index > 7) {
                            _allData.allData2.part3['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData2.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData2.party['cellData' + _index] = item;
                    }
                });

                _data.data3.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 3) {
                            _allData.allData3.part1['cellData' + _index] = item;
                        } else if (_index > 3) {
                            _allData.allData3.part2['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData3.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData3.party['cellData' + _index] = item;
                    }
                });

                _data.data4.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 6) {
                            _allData.allData4.part1['cellData' + _index] = item;
                        } else if (_index > 6) {
                            _allData.allData4.part2['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData4.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData4.party['cellData' + _index] = item;
                    }
                });

                _this.allData = _allData;
                _this.initData();
            },

            /**
             * 初始化数据
             */
            initData() {
                let _this = this;
                let _data = _this.allData;
                // _this.allData = _this.dataCalculate(_data);
                for (let key in _data) {
                    _data[key] = _this.dataCalculate(_data[key]);
                }
                _this.initEchartData(_this.allData);
            },

            /**
             * 初始化Echart
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                _this.gauge_1EchartData.data = data.allData3.partx['cellData6'];
                _this.gauge_2EchartData.data = data.allData4.partx['cellData9'];
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
                let _data = _this.allData;

                let _changeData = {};
                let _buttonType = _this.buttonType;

                if (_buttonType === 'fzjyknx') {
                    _changeData = _data.allData1;
                } else if (_buttonType === 'zfnl') {
                    _changeData = _data.allData2;
                } else if (_buttonType === 'ldfzbl') {
                    _changeData = _data.allData3;
                } else if (_buttonType === 'cdqlxnl') {
                    _changeData = _data.allData4;
                }

                for (let x in _changeData) {
                    let i = _changeData[x];
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

                _changeData = _this.dataCalculate(_changeData);
                _this.initEchartData(_this.allData);
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
                    "spcode": '3',
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
                    spcode: '3'
                };
                getPredictiveModelSelect(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.selectOptions = res.data.data;
                        _this.selectOptions.push({value: '', lable: ''})
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

                let _data = _this.allData;
                let _data1 = _data.allData1;
                let _data2 = _data.allData2;
                let _data3 = _data.allData3;
                let _data4 = _data.allData4;
                for (let key in _data1) {
                    let _data = _data1[key];
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

                for (let key in _data2) {
                    let _data = _data2[key];
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

                for (let key in _data3) {
                    let _data = _data3[key];
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

                for (let key in _data4) {
                    let _data = _data4[key];
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
                // _this.conclusionData = _this.getConclusion(_this.allData, 'forecastOfSolvency', _this.conclusionData)
                let _conclusionData = _this.conclusionData;
                let _cForecastOfSolvency = _this.cForecastOfSolvency;
                let _newData = _this.setDataToList(_this.allData);
                let _needData = {
                    fxfz: '56',
                    jlr: '281',
                    fxxs: '58',
                    xjzfnl: '66',
                    dqjk: '253',
                    yfpj: '65',
                    chzj: '67',
                    fzhj: '69',
                    ldbl: '71',
                    sdbl: '72',
                    cwfy: '51',
                    lrze: '78',
                    lxbz: '80'

                };
                for (let _x in _needData) {
                    let _a = _needData[_x];
                    let _va = _newData.filter((i) => {
                        return i.nid === _a;
                    });
                    _needData[_x] = _va[0].value.replace(/,/g, '') * 1;

                }

                let _flag = 0;
                for (let k1 in _conclusionData) {    // x 是  f
                    let _v = _conclusionData[k1];
                    for (let k2 in _v) {        // y 是  s
                        let _b = _v[k2];

                        if (k1 === 'f1') {

                            if (_needData.fxfz === '0') {
                                _flag = 1;
                            } else if (_needData.jlr <= 0) {
                                _flag = 2;
                            } else if (_needData.jlr > 0 && _needData.fxxs < 1) {
                                _flag = 3;
                            } else if (_needData.jlr > 0 && _needData.fxxs >= 1) {
                                _flag = 4;
                            }

                        } else if (k1 === 'f2') {
                            if (k2 === 's1') {
                                if (_needData.xjzfnl <= 0 && _needData.dqjk > _needData.yfpj) {//现金支付能力<=0,短期借款的期末余额>应付票据的期末余额
                                    _flag = 1;
                                } else if (_needData.xjzfnl <= 0 && _needData.dqjk < _needData.yfpj) {//现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                                    _flag = 2;
                                } else {//现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                                    _flag = 3;
                                }
                            } else if (k2 === 's2') {//偿还流动负债的资金<(1/2*流动负债合计的期末余额
                                if (_needData.chzj < (1 / 2 * _needData.fzhj)) {
                                    _flag = 1;
                                } else {
                                    _flag = 2;
                                }
                            }
                        } else if (k1 === 'f3') {
                            if (k2 === 's1') {
                                if (_needData.ldbl <= 0.8) {//流动比率<=0.8
                                    _flag = 1;
                                } else if (_needData.ldbl > 0.8 && _needData.ldbl < 1.2) {
                                    _flag = 2;
                                } else {
                                    _flag = 3;
                                }
                            } else if (k2 === 's2') {
                                if (_needData.sdbl <= 0.6) {//流动比率<=0.8
                                    _flag = 1;
                                } else if (_needData.sdbl > 0.6 && _needData.sdbl < 1) {
                                    _flag = 1;
                                } else {
                                    _flag = 3;
                                }
                            }
                        } else if (k1 === 'f4') {
                            if (k2 === 's1') {
                                if (_needData.xjzfnl <= 0 && _needData.dqjk > _needData.yfpj) {//现金支付能力<=0,短期借款的期末余额>应付票据的期末余额
                                    _flag = 1;
                                } else if (_needData.xjzfnl <= 0 && _needData.dqjk < _needData.yfpj) {//现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                                    _flag = 2;
                                } else {//现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                                    _flag = 3;
                                }
                            } else if (k2 === 's2') {
                                if (_needData.cwfy <= 0) {
                                    _flag = 1;
                                } else if (_needData.cwfy > 0 && _needData.lrze < 0) {
                                    _flag = 2;
                                } else if (_needData.cwfy > 0 && _needData.lrze === 0) {
                                    _flag = 3;
                                } else if (_needData.cwfy > 0 && _needData.lrze > 0 && _needData.lxbz >= 4) {
                                    _flag = 4;
                                } else if (_needData.cwfy > 0 && _needData.lrze > 0 && _needData.lxbz >= 1 && _needData.lxbz < 4) {
                                    _flag = 5;
                                } else if (_needData.cwfy > 0 && _needData.lrze > 0 && _needData.lxbz <= 1) {
                                    _flag = 6;
                                }
                            }
                        }

                        let _index = 'clu' + _flag;
                        _conclusionData[k1][k2].color = _cForecastOfSolvency[k1][k2][_index].color;
                        _conclusionData[k1][k2].content = _cForecastOfSolvency[k1][k2][_index].content;

                        //"&ROUNDDOWN(利息保障倍数,1)&"

                        if(k1 === 'f4' && k2 === 's2'){
                            if(_conclusionData[k1][k2].content.indexOf('lxbzbs') !== -1){
                                _conclusionData[k1][k2].content = _conclusionData[k1][k2].content.replace('lxbzbs',_needData.lxbz);
                            }
                            if(_conclusionData[k1][k2].content.indexOf('lxbzbsdown') !== -1){
                                let __d = _needData.lxbz.split('.')[0];
                                _conclusionData[k1][k2].content = _conclusionData[k1][k2].content.replace('lxbzbs',__d);
                            }

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
        justify-content: space-between;
    }

    .content-all {
        position: relative;
    }

    .content-cell {
        display: flex;

    }

    .part1data1, .part2data1, .part3data1, .part4data1, .part5data1, .svg-first-data1, .svg-second-data1 {
        position: absolute;
    }

    .part1data1 {
        left: 100px;
    }

    .part2data1 {
        left: 400px;
        top: 90px;
    }

    .part3data1 {
        left: 700px;
        top: 50px;
    }

    .part4data1 {
        left: 1000px;
    }

    .part5data1 {
        left: 1300px;
    }

    .part1data2, .part2data2, .part3data2, .part4data2, .part5data2, .svg-first-data2, .svg-second-data2 {
        position: absolute;
    }

    .part1data2 {
        left: 100px;
    }

    .part2data2 {
        left: 400px;
        top: 44px;
    }

    .part3data2 {
        left: 700px;
        top: 90px;
    }

    .part4data2 {
        left: 1000px;
    }

    .part5data2 {
        left: 1300px;
    }

    .part1data3, .part2data3, .svg-first-data3 {
        position: absolute;
    }

    .part1data3 {
        left: 100px;
    }

    .part2data3 {
        left: 400px;
        top: 44px;
    }

    .part1data4, .part2data4, .svg-first-data4 {
        position: absolute;
    }

    .part1data4 {
        left: 100px;
    }

    .part2data4 {
        left: 400px;
        top: 180px;
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

    .svg-first-data1 {
        left: 300px;
        top: 30px
    }

    .svg-second-data1 {
        left: 600px;
        top: 120px
    }

    .svg-first-data2 {
        left: 300px;
        top: 30px
    }

    .svg-second-data2 {
        left: 600px;
        top: 76px
    }

    .svg-first-data3 {
        left: 300px;
        top: 30px
    }

    .svg-first-data4 {
        left: 300px;
        top: 30px
    }

    .content-text_1 {
        position: absolute;
        width: 300px;
        height: 280px;
        top: 50px;
        left: 1000px;
        border: 2px solid #303133;
        border-radius: 10px;
        padding-top: 20px;
    }

    .content-text_1 .title {
        font-size: 22px;
        text-align: left;
        padding-left: 16px;
    }

    .content-text_1 .content {
        font-size: 18px;
        padding: 16px;
        text-indent: 36px;
        line-height: 30px;
        /*color: #bd2c00;*/
    }

    .content-text_1 .content .title {
        font-size: 18px;
        text-indent: 36px;
        line-height: 30px;
        /*color: #bd2c00;*/
    }

    .content-text_1 .content p {
        font-size: 16px;
        text-indent: 36px;
        line-height: 30px;
        /*color: #bd2c00;*/
    }

    .content-title {
        padding: 0;
        text-indent: 0;
        color: black;
    }

    .content-chart .gauge {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 650px;
    }

    .content-text_2 {
        position: absolute;
        width: 300px;
        height: 70px;
        top: 44px;
        left: 600px;
        border: 1px solid #303133;
        border-radius: 10px;
        padding: 2px 8px;
    }

    .content-text_2 p {
        text-indent: 36px;
    }

    .content-text_2_1 {
        top: 134px;
    }

    .content-text_3 {
        top: 180px;
    }

    .content-text_4 {
        top: 270px;
    }

    .content-chart-1 .gauge {
        left: 930px;
        top: 0;
    }

    .content-chart-2 .gauge {
        left: 930px;
        top: 136px;
    }

    .content-table {
        position: absolute;
        top: 680px;
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