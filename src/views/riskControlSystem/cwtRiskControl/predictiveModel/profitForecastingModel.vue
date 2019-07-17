<template>
    <div>

        <div class="top-button">
            <div class="buttom-left">
                <el-button
                        class="bq"
                        :type="this.buttonType === 'bq' ? 'primary' : ''"
                        @click="topButtonClick('bq')"
                >本期
                </el-button>
                <el-button
                        class="lj"
                        :type="this.buttonType === 'lj' ? 'primary' : ''"
                        @click="topButtonClick('lj')"
                >累计
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
                            :lable="item.lable"
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
                            :dataType="hasNagetiveNum === true ? 'funneltobar' : 'funnel'">
                    </mchart>
                </div>
                <div class="pie">
                    <mchart
                            :echartData="pieEchartData"
                            :dataFresh="dataFresh"
                            :dataType="hasNagetiveNum === true ? 'bar' : 'pie'">
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
    import mtable from './modelPublic/mtable'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import dataCalculation from '../mixin/dataCalculation'
    import mchart from './modelPublic/mchart'
    import {
        getPredictiveModelSelect,
        predictiveModel,
        predictiveModelSave
    } from '~api/cwtRiskControl/riskControlRequest'
    import {mapGetters} from "vuex"

    export default {
        name: "profitForecastingModel",
        mixins: [cwtPublicJs, dataCalculation],
        components: {
            mtable,
            cell,
            ccell,
            mchart
        },
        props: {},
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            company(newValue, oldValue) {
                this.getRealData('bq');
                this.getSelectOptions('bq');
            },
            year(newValue, oldValue) {
                this.getRealData('bq');
                this.getSelectOptions('bq');
            },
            month(newValue, oldValue) {
                this.getRealData('bq');
                this.getSelectOptions('bq');
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
                        "project": "毛利",
                        "formula": "营业收入-营业成本"
                    },
                    {
                        "project": "成本费用总额 ",
                        "formula": "营业成本+营业税金及附加+销售费用+管理费用+财务费用"
                    },
                    {
                        "project": "营业利润",
                        "formula": "(营业收入+公允价值变动收益+投资收益)-(成本费用总额+资产减值损失)"
                    },
                    {
                        "project": "利润总额",
                        "formula": "(营业收入+公允价值变动收益+投资收益+营业外收入)-(营业外支出+成本费用总额+产减值损失)"
                    },
                    {
                        "project": "净利润",
                        "formula": "利润总额-所得税费用"
                    },
                    {
                        "project": "归属母公司净利润",
                        "formula": "净利润-少数股东损益"
                    },
                    {
                        "project": "三费率(%)",
                        "formula": "(销售费用+管理费用+财务费用)/营业收入*100"
                    },
                    {
                        "project": "营业利润率(%)",
                        "formula": "营业利润/营业收入*100"
                    },
                    {
                        "project": "销售净利率(%)",
                        "formula": "净利润/营业收入*100"
                    },
                    {
                        "project": "成本费用利润率(%)",
                        "formula": "利润总额/成本费用总额*100"
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
                buttonType: 'bq',

                hasNagetiveNum: false,

                funneltobarEchartData: {
                    name: '各项费用占收入比',
                    data: []
                },
                funnelEchartData: {
                    name: '各项费用占收入比',
                    data: []
                },
                pieEchartData: {
                    name: '成本费用结构图',
                    data: []
                },
                gaugeEchartData: {
                    name: '成本费用利润率（%）',
                    data: []
                },
                dataFresh: false
            }
        },
        created() {
        },
        mounted() {
            this.getRealData('bq');
            this.getSelectOptions('bq');
        },
        methods: {
            /**
             * 单元格数据发生改变
             * @param type
             */
            topButtonClick(type) {
                this.buttonType = type;
                this.getRealData(type);
                this.getSelectOptions(type);
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
                            let __value = _value.replace(/,/g, '');
                            if (__value * 1 === z.value * 1) {
                                return;
                            }
                            z.value = _value;
                        }
                    }
                }
                _this.allData = _this.dataCalculate(_data);

                _this.initEchartData(_this.allData);
            },

            /**
             * 初始化数据
             */
            initData(type) {
                let _this = this;
                let _data = _this.allData;
                _this.allData = _this.dataCalculate(_data, type);
                _this.initEchartData(_this.allData);
            },

            /**
             * 初始化Echart
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                let emptyData = [];
                let eD = ['101', '103', '104', '105', '106'];
                let nagetiveDataCount = 0;
                for (let x in data) {
                    let i = data[x];
                    for (let y in i) {
                        let z = i[y];
                        if (eD.indexOf(z.nid) !== -1) {
                            let _m = {name: '', value: 0};
                            _m.name = z.name;
                            _m.value = z.value;
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                if (parseFloat(_m.value) < 0) {
                                    nagetiveDataCount++;
                                }
                                emptyData.push(_m);
                            }
                        }
                    }
                }
                _this.hasNagetiveNum = nagetiveDataCount > 0;
                _this.gaugeEchartData.data = data.partx.cellData1;
                _this.pieEchartData.data = emptyData;
                _this.funnelEchartData.data = emptyData;
                _this.dataFresh = !_this.dataFresh;

            },

            /**
             * 请求真实数据
             */
            getRealData(type, modelId) {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: type === 'bq' ? '1' : '1.1'
                };
                if (modelId) {
                    params['versioncode'] = modelId;
                }
                predictiveModel(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.resDataFormatter(res.data.data, type);
                    }
                })
            },

            /**
             * 请求回来的数据进行格式化处理
             * @param data
             * @param type
             */
            resDataFormatter(data, type) {
                let _this = this;

                let _data = {
                    part1: {},
                    part2: {},
                    part3: {},
                    part4: {},
                    part5: {},
                    partx: {}
                };

                data.forEach((item, index) => {
                    // let _sort = item['SORT'];
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 2) {
                            _data.part1['cellData' + _index] = item;
                        } else if (_index > 2 && _index <= 10) {
                            _data.part2['cellData' + _index] = item;
                        } else if (_index > 10 && _index <= 15) {
                            _data.part3['cellData' + _index] = item;
                        } else if (_index > 15 && _index <= 20) {
                            _data.part4['cellData' + _index] = item;
                        } else if (_index > 20 && _index <= 22) {
                            _data.part5['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _data.partx['cellData' + (_index - 22)] = item;
                    }
                });
                _this.allData = _data;
                _this.initData(type);
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
                    "spcode": _this.buttonType === 'bq' ? '1' : '1.1',
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

                        this.getSelectOptions(this.buttonType);

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
                this.getRealData('bq');
                this.selectValue = '';
            },

            /**
             * 获取select options
             */
            getSelectOptions(type) {
                let _this = this;
                let _getters = _this.$store.getters,
                    company = _getters.company;
                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: type === 'bq' ? '1' : '1.1'
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
                _this.getRealData(_this.buttonType, vcode);
            },

            /**
             * 获取要保存的data
             */
            getSaveData() {
                let _this = this;
                let _list = [];
                let data = _this.allData;
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

    .content-table {
        position: absolute;
        top: 750px;
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