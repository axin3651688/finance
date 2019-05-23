<template>
    <div>
        <div class="risk-back-content">
            <div class="top-tip">
                <public-risk-select
                    @selectChanged="selectChanged"
                >
                </public-risk-select>
            </div>

            <div class="risk-back-table">
                <stable
                        :tableData.sync="tableData"
                        :columns.sync="columns"
                        :dialogVisible="!dialogVisible"
                        @changeShowContent="changeShowContent"
                >
                </stable>
            </div>
        </div>

        <div class="risk-back-dialog">
            <el-dialog
                    :title="getDialogTitle()"
                    width="56%"
                    top="50px"
                    :visible.sync="dialogVisible"
            >
                <!--<span>{{ diaData }}}</span>-->
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <dialog-component
                        :dialogData="this.dialogData"
                >
                </dialog-component>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import dialogComponent from '../../publicRiskControl/dialogComponent'
    import stable from '../../publicRiskControl/table/singleTable'
    import publicRiskSelect from '../../publicRiskControl/publicRiskSelect'
    import {mapGetters} from "vuex"
    // import {getDepartments} from '~api/cwtRiskControl/riskControlRequest'
    import { findThirdPartData } from "~api/interface"
    // import getSql from '../publicJsFill/getSql'


    export default {
        name: "riskBack",
        components: {
            dialogComponent,
            stable,
            publicRiskSelect
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.updateView();
            },
            year(newValue, oldValue) {
                this.updateView();
            },
            month(newValue, oldValue) {
                this.updateView();
            }
        },
        data() {
            return {
                dialogVisible: false,
                tableData: [],
                columns: [],
                dialogData: {
                    dialogRiskType: "riskBack",
                    riskName: "",
                    contentHeader: {
                        content: [
                            {
                                dataType: 'riskType',
                                label: "风险类型",
                                disableEdit: true,
                                text: '风险类型自动填入'
                            },
                            {
                                dataType: 'riskProbability',
                                label: "风险发生概率",
                                disableEdit: true,
                                text: '很大的可能性'
                            },
                            {
                                dataType: 'riskDegree',
                                label: "风险影响程度",
                                disableEdit: true,
                                text: '极重'
                            },
                            {
                                dataType: 'riskLevel',
                                label: "风险等级",
                                disableEdit: true,
                                text: '极重'
                            }
                        ]
                    },
                    contentMiddle: {
                        content: [
                            {
                                dataType: 'riskOverview',
                                label: "风险概述",
                                disableEdit: true,
                                text: '自动带出，不可编辑'
                            },
                            {
                                dataType: 'riskMeasure',
                                label: "采取措施",
                                disableEdit: true,
                                text: '自动查询风险识别的内容显示'
                            },
                            {
                                dataType: 'riskSuggest',
                                label: "应对建议",
                                disableEdit: true,
                                text: '自动查询风险识别的内容显示'
                            }
                        ]
                    },
                    contentFoot: {
                        content: [
                            {
                                dataType: 'countermeasures',
                                label: '风险应对策略',
                                disableEdit: true,
                                text: '风险应对策略，不可编辑'
                            },
                            {
                                dataType: 'instruction',
                                label: '风险应对策略描述',
                                disableEdit: true,
                                text: '显示批示内容，不可编辑'
                            },
                            {
                                dataType: 'riskFeed',
                                label: '风险反馈',
                                disableEdit: false,
                                text: '针对风险进行相关反馈录入'
                            }
                        ]
                    }
                },
            }
        },
        created() {
            // 请求table的数据。
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskSingleTable.json").then(res => {
                if (res.data.code === 200) {
                    // me.tableData = res.data.rows;
                    me.columns = res.data.columns
                }
            });

            this.getRiskBackData();
        },
        methods: {
            /**
             * 关于某个风险的反馈弹出按钮
             */
            changeShowContent(scope, it) {
                if (it.id === '0') {
                    //反馈操作
                    alert('反馈操作')
                } else if (it.id === '1') {
                    //查看操作
                    this.dialogVisible = true;
                    this.dialogData['riskName'] = scope.row.riskName;
                } else if (it.id === '2') {
                    //退回流程操作
                    alert('退回流程操作')
                } else if (it.id === '3') {
                    //提醒操作
                    alert('提醒操作')
                }
            },

            /**
             * 获取当前弹出框title
             * @returns {string}
             */
            getDialogTitle() {
                let _riskName = this.dialogData.riskName;
                return '关于【' + _riskName + '】的反馈';
            },

            /**
             * 获取单个风险反馈页面表格数据
             */
            getRiskBackData(selectedOption) {
                let _this = this;
                let requestParams = _this.getQueryParameter(selectedOption);

                let sqlObj = '', sql = '';
                _this.axios.get("/cnbi/json/source/tjsp/riskSql/cwtRiskControlSql/riskSql.json").then(res => {
                    let sqlList = res.data['sqlList'];
                    if (sqlList.length > 0) {
                        sqlObj = sqlList.filter((item) => {
                            return item.id === '001'
                        })
                    }
                    sql = sqlObj[0].sql;
                    requestParams['sql'] = sql;

                    _this.RiskBackDataQuery(requestParams);

                });
            },

            /**
             * 请求发送
             * @param params
             * @constructor
             */
            RiskBackDataQuery(params){
                let _this = this;
                findThirdPartData(params).then(res => {
                    if (res.data.code) {

                        /**
                         * 获取数据之后进行的数据处理
                         */
                        let datas = res.data.data;
                        let _operations = [];
                        datas.forEach((data)=>{
                            let operations = data.operation.split(',');
                            for(let i = 0, len = operations.length; i < len; i++){
                                let emptyBtn = {
                                    id:'',
                                    btnShow:true,
                                    text:''
                                };
                                let btnDes = operations[i].split('-');
                                let btnId = btnDes[0],
                                    btnText = btnDes[1];
                                emptyBtn.id = btnId;
                                emptyBtn.text = btnText;

                                _operations.push(emptyBtn);
                            }
                            data['operation'] = _operations;
                            _operations = [];
                        });
                        _this.tableData = res.data.data;

                    }
                })
            },

            /**
             * 获取请求发送的参数  --- 没有sql，sql后面添加
             * @param selectedOption
             * @returns {{company: *, year: *, month: *, period: (string|string), departId: string, sql: string}}
             */
            getQueryParameter(selectedOption){
                let _this = this,
                    _getter = _this.$store.getters,
                    company = _getter.company,
                    year = _getter.year,
                    month = _getter.month,
                    period = "";
                if (month > 9) {
                    period = year + "" + month;
                } else {
                    period = year + "0" + month;
                }
                let requestParams = {
                    company: company,
                    // year: year,
                    // month: month,
                    period: period,
                    departId: selectedOption ? selectedOption : "01",
                    sql: ""
                };
                return requestParams;
            },

            /**
             * 子组件里select中的options改变的时候触发的函数
             * @param item
             */
            selectChanged(item){
                this.getRiskBackData(item);
            }
        }
    }
</script>

<style scoped>


    .top-tip {
        margin-bottom: 10px;
    }
</style>