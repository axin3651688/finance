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
                        :dialogData.sync="dialogData"
                        :dataChanged="dataChanged"
                        :dialogState="dialogState"
                        @riskFeedSuccess="riskFeedSuccess"
                        @dataMessageChange="dataMessageChange"
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
    import {findThirdPartData} from "~api/interface"
    import {updateInstruction} from "~api/szcRiskControl/riskControl"


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
                selectedItem: '',
                dialogData: {
                    dialogRiskType: "riskBack",
                    riskname: "",
                    riskid: '',
                    contentHeader: {
                        content: [
                            {
                                dataType: 'risktype',
                                label: "风险类型",
                                disableEdit: true,
                                text: '风险类型自动填入'
                            },
                            {
                                dataType: 'riskprobability',
                                label: "风险发生概率",
                                disableEdit: true,
                                text: '很大的可能性'
                            },
                            {
                                dataType: 'riskdegree',
                                label: "风险影响程度",
                                disableEdit: true,
                                text: '极重'
                            },
                            {
                                dataType: 'risklevel',
                                label: "风险等级",
                                disableEdit: true,
                                text: '极重'
                            }
                        ]
                    },
                    contentMiddle: {
                        content: [
                            {
                                dataType: 'riskoverview',
                                label: "风险概述",
                                disableEdit: true,
                                text: '自动带出，不可编辑'
                            },
                            {
                                dataType: 'riskmeasure',
                                label: "采取措施",
                                disableEdit: true,
                                text: '自动查询风险识别的内容显示'
                            },
                            {
                                dataType: 'risksuggest',
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
                                dataType: 'riskfeed',
                                label: '风险反馈',
                                disableEdit: false,
                                text: '针对风险进行相关反馈录入'
                            }
                        ]
                    }
                },
                dataChanged: false,
                dialogState: '',
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
             * 关于某个风险的操作按钮
             */
            changeShowContent(scope, it) {
                if (it.id === '0') {
                    //反馈操作
                    this.dialogVisible = true;

                    this.dialogState = 'fk';

                    this.getDialogData(scope, it);
                } else if (it.id === '1') {
                    //查看操作
                    this.dialogVisible = true;

                    this.dialogState = 'ck';

                    this.getDialogData(scope, it);
                } else if (it.id === '2') {
                    //退回流程操作

                    this.dialogState = 'th';

                    this.riskFeedBackEvent(scope, it);
                    // alert('退回流程操作')
                } else if (it.id === '3') {
                    //提醒操作

                    this.dialogState = 'tx';

                    this.noticeSendEvent(scope, it);
                    alert('提醒操作')
                }
            },

            /**
             * 获取当前弹出框title
             * @returns {string}
             */
            getDialogTitle() {
                let _riskname = this.dialogData.riskname;
                return '关于【' + _riskname + '】的反馈';
            },

            /**
             * 获取单个风险反馈页面表格数据
             */
            getRiskBackData(selectedOption) {
                selectedOption = this.selectedItem || '01';
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
            RiskBackDataQuery(params) {
                let _this = this,
                    _getter = _this.$store.getters,
                    company = _getter.company,
                    userCompany = _getter.user.company.id;
                findThirdPartData(params).then(res => {
                    if (res.data.code) {
                        debugger;
                        /**
                         * 获取数据之后进行的数据处理
                         */
                        let datas = res.data.data;
                        let _operations = [];
                        datas.forEach((data) => {

                            if (company !== userCompany) {
                                data.operation = '1-查看';
                            }

                            let operations = data.operation.split(',');
                            for (let i = 0, len = operations.length; i < len; i++) {
                                let emptyBtn = {
                                    id: '',
                                    btnShow: true,
                                    text: ''
                                };
                                let btnDes = operations[i].split('-');
                                let btnText = btnDes[1];
                                emptyBtn.id = btnDes[0];
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
            getQueryParameter(selectedOption) {
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
                return {
                    company: company,
                    // year: year,
                    // month: month,
                    period: period,
                    departId: selectedOption ? selectedOption : "01",
                    sql: ""
                };
            },

            /**
             * 子组件里select中的options改变的时候触发的函数
             * @param item
             */
            selectChanged(item) {
                this.selectedItem = item;
                this.getRiskBackData(item);
            },

            /**
             * 页面维度改变的时候刷新页面数据
             */
            updateView() {
                this.getRiskBackData();
            },

            /**
             * 点击查看按钮获取弹出页面的数据
             * @param scope
             * @param it
             */
            getDialogData(scope, it) {
                let row = scope.row,
                    dataIndex = row.rownum - 1;
                let _data = this.tableData[dataIndex];
                this.dataFormat(_data);
            },

            /**
             * 格式化单行数据row  传到组件中渲染
             * @param data
             */
            dataFormat(data) {
                let _dialogData = this.dialogData;
                _dialogData.riskname = data.riskname;
                _dialogData.riskid = data.scode;
                _dialogData.rownum = data.rownum;
                _dialogData.isFeeded = data['backstate'] === '已反馈';

                //todo  dialogState 状态改变
                // this.dialogState = '';

                let contentHeader = _dialogData.contentHeader,
                    contentMiddle = _dialogData.contentMiddle,
                    contentFoot = _dialogData.contentFoot;
                contentHeader.content.forEach((item) => {
                    item.text = data[item.dataType]
                });
                contentMiddle.content.forEach((item) => {
                    item.text = data[item.dataType]
                });
                contentFoot.content.forEach((item) => {
                    if (data['backstate'] === '已反馈' && item.dataType === 'riskfeed') {
                        item.disableEdit = true;
                    } else if (data['backstate'] !== '已反馈' && item.dataType === 'riskfeed') {
                        item.disableEdit = false;
                    }
                    item.text = data[item.dataType]
                });

                this.dataChanged = !this.dataChanged;
            },

            /**
             * 反馈成功的回调函数
             */
            riskFeedSuccess() {
                this.getRiskBackData();
            },

            /**
             * 切换上一条下一条
             * @param obj
             */
            dataMessageChange(obj) {
                // $message 可传入的type的值
                // 'success' | 'warning' | 'info' | 'error'

                let _index = obj.rowIndex - 1;
                let _data = this.tableData;
                let newData = null;
                if (obj.flag === 'up') {
                    newData = _data[_index - 1];
                    if (_index - 1 < 0) {
                        this.$message({
                            message: '已经是第一条数据',
                            type: "warning"
                        });
                        return;
                    }
                    this.dataFormat(newData);
                    this.$message({
                        message: '切换上一条成功',
                        type: "success"
                    });
                } else if (obj.flag === 'down') {

                    newData = _data[_index + 1];
                    if (_index - 1 >= _data.length - 2) {
                        this.$message({
                            message: '已经是最后一条数据',
                            type: "warning"
                        });
                        return;
                    }
                    this.dataFormat(newData);
                    this.$message({
                        message: '切换下一条成功',
                        type: "success"
                    });
                }

            },

            /**
             * 风险退回操作
             * @param scope
             * @param it
             */
            riskFeedBackEvent(scope, it) {
                let _this = this;
                let params = _this.getRiskFeedbackParams(scope);
                updateInstruction(params).then(res => {
                    if (res.data.code === 200) {
                        // _this.$emit("riskFeedBackSuccess");

                        _this.updateView();

                        _this.$message({
                            message: "退回成功",
                            type: "success"
                        });
                    } else {
                        _this.$message({
                            message: "退回失败！请联系开发人员"
                        })
                    }
                });
            },

            /**
             * 获取风险退回参数
             * @param scope
             */
            getRiskFeedbackParams(scope) {
                let rowData = scope.row,
                    nRelateId = rowData.scode,
                    risksbuser = rowData.risksbuser;
                let backUser = 'cwt';
                backUser = risksbuser || backUser;
                let _this = this,
                    _getter = _this.$store.getters,
                    user = _getter.user.user,
                    company = _getter.company,
                    year = _getter.year,
                    month = _getter.month,
                    period = "";
                let _month = month > 9 ? month : '0' + month;

                period = year + _month + '';
                return {
                    "riskReportStateDtos": [
                        {
                            "company": company,
                            "nrelateid": nRelateId,
                            "period": period,
                            "scompanyname": user.companyName,
                            "sfeedbacksuser": user.userName,
                            "sfeedbacksusername": user.trueName,
                            "sisfeedback": "-1",
                            "sriskname": rowData.riskname
                        }
                    ],
                    "users": [
                        backUser
                    ]
                };
            },

            /**
             * 提醒操作
             * @param scope
             * @param it
             */
            noticeSendEvent(scope, it) {
                let _this = this;
                let params = _this.getRiskNoticeParams(scope);

                updateInstruction(params).then(res => {
                    if (res.data.code === 200) {

                        _this.updateView();

                        _this.$message({
                            message: "成功提醒批示人员尽快反馈",
                            type: "success"
                        });
                    } else {
                        _this.$message({
                            message: "提醒失败！请联系开发人员"
                        })
                    }
                });
            },

            /**
             * 获取风险提醒的参数
             * @param scope
             */
            getRiskNoticeParams(scope) {
                debugger;
                let rowData = scope.row,
                    nRelateId = rowData.scode,
                    risksbuser = rowData.risksbuser;
                let backUser = 'cwt';
                backUser = risksbuser || backUser;
                let _this = this,
                    _getter = _this.$store.getters,
                    user = _getter.user.user,
                    company = _getter.company,
                    year = _getter.year,
                    month = _getter.month,
                    period = "";
                let _month = month > 9 ? month : '0' + month;

                period = year + _month + '';

                return {
                    "riskReportStateDtos": [
                        {
                            "company": company,
                            "nrelateid": nRelateId,
                            "period": period,
                            "sfeedbacksuser": user.userName,
                            "sisfeedback": "2",
                        }
                    ],
                    "users": [
                        backUser
                    ]
                };
            }
        }
    }
</script>

<style scoped>
    .top-tip {
        margin-bottom: 10px;
    }
</style>