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
        name: "assetStructurePrediction",
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


                allData: {},
                tableData: [
                    {
                        "project": "资产负债率(%)",
                        "formula": "负债总计/资产总计*100"
                    },
                    {
                        "project": "流动资产增长率(%)",
                        "formula": "(流动资产-比较年流动资产)/比较年流动资产*100"
                    },
                    {
                        "project": "营业收入增长率(%)",
                        "formula": "(营业收入-比较年营业收入)/比较年营业收入*100"
                    },
                    {
                        "project": "总资产报酬率",
                        "formula": "(利润总额+利息支出)/((资产总计+年初资产总计)/2)*100"
                    },
                    {
                        "project": "总资产增长率",
                        "formula": "(资产总计-年初资产总计)/年初资产总计*100"
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
                tableHeight: 300,

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
            this.getSelectOptions();
        },
        methods: {

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
                    spcode: '2'
                };
                if (modelId) {
                    params['versioncode'] = modelId;
                }
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
                            if (_m.value !== '0' && _m.value !== '0.00') {
                                emptyData.push(_m);
                            }
                        }
                    }
                }
                _this.gauge_1EchartData.data = data.partx.cellData1;
                _this.gauge_2EchartData.data = data.partx.cellData2;
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
                            let __value = _value.replace(/,/g,'');
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
                    "spcode": '2',
                    "version": _this.modelName,
                    "versioncode": _time,
                    "status": status
                };
                params.list = _this.getSaveData();

                if(status === '1'){
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
                        this.selectValue =  _this.modelName;

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
                    spcode: '2'
                };
                getPredictiveModelSelect(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.selectOptions = res.data.data;
                        _this.selectOptions.push({lable:'',value:''})
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
        background-color: #D3DCE6 ;
        display: flex;
        justify-content: flex-end;
    }

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

    .content-table {
        position: absolute;
        top: 750px;
        width: 100%;
    }
    .button-right-select{
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