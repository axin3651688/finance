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
    import {
        getPredictiveModelSelect,
        predictiveModel,
        predictiveModelSave
    } from '~api/cwtRiskControl/riskControlRequest'
    import mtable from './modelPublic/mtable'
    import {mapGetters} from "vuex"

    export default {
        name: "EVAPredictionModel",
        mixins: [cwtPublicJs, dataCalculation],
        components: {
            cell,
            ccell,
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
                            if (__value === z.value) {
                                return;
                            }
                            z.value = _value;
                        }
                    }
                }
                _this.allData = _this.dataCalculate(_data);
            },
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
                    spcode: '5'
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
                    "spcode": '5',
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
                    spcode: '5'
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