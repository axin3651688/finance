<template>
    <div>
        <div class="top-tip">
            <public-risk-select
                    @selectChanged="selectChanged"
            >
            </public-risk-select>
        </div>
        <div class="track-table">
            <single-table
                    :tableData="tableData"
                    :columns="columns"
                    @changeShowContent="showRiskSingleTrack"
            >
            </single-table>
        </div>
        <div class="track-dialog">
            <el-dialog
                    :title="getDialogTitle()"
                    width="56%"
                    top="50px"
                    :visible.sync="trackDialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <dialog-component
                        :dialogData.sync="this.dialogData"
                        :dataChanged="dataChanged"
                        @dataMessageChange="dataMessageChange"
                        @closeTrackDialogContent="closeTrackDialogContent"
                >
                </dialog-component>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import SingleTable from "../../publicRiskControl/table/singleTable";
    import dialogComponent from '../../publicRiskControl/dialogComponent';
    import publicRiskSelect from '../../publicRiskControl/publicRiskSelect'
    import {findThirdPartData} from "~api/interface"
    import {mapGetters} from "vuex"

    export default {
        name: "riskSingleTrack",
        components: {
            SingleTable,
            dialogComponent,
            publicRiskSelect
        },
        props: {},
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
                trackDialogVisible: false,
                tableData: [],
                columns: [],
                selectedItem: '',
                value: '',
                dataChanged: false,
                dialogData: {
                    dialogRiskType: "riskTrack",
                    riskname: "",
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
                                dataType: 'risk_sb',
                                risk_up_user:'',
                                risk_up_time:'',
                                schedule: '进度一',
                                text: '风险上报',
                                state: '已上报',
                                content: '上报的内容。上报人：小智。上报时间：2019年3月'
                            },
                            {
                                dataType: 'risk_ps',
                                risk_up_user:'',
                                risk_up_time:'',
                                schedule: '进度二',
                                text: '风险批示',
                                state: '未批示',
                                content: '请尽快批示'
                            },
                            {
                                dataType: 'risk_fq',
                                risk_up_user:'',
                                risk_up_time:'',
                                risk_up_content:'',
                                schedule: '进度三',
                                text: '风险反馈',
                                state: '未反馈',
                                content: '请尽快反馈'
                            }
                        ]
                    }
                },
            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskSingleTrack.json").then(res => {
                if (res.data.code === 200) {
                    // me.tableData = res.data.rows;
                    me.columns = res.data.columns
                }
            });

            this.getRiskTrackData();

        },
        mounted() {
        },
        methods: {
            /**
             * 改变控制弹出层的参数，显示弹出层
             * */
            showRiskSingleTrack(scope, it) {
                if (it.id === '0') {
                    //反馈操作
                    alert('反馈操作')
                } else if (it.id === '1') {
                    //查看操作
                    this.trackDialogVisible = true;
                    // this.dialogData['riskname'] = scope.row.riskname;
                    this.dialogContentShow(scope);

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
                let _riskname = this.dialogData.riskname;
                return '关于【' + _riskname + '】的追踪';
            },

            /**
             * 选择部门的时候触发的事件
             * @param item
             */
            selectChanged(item) {
                debugger;
                this.selectedItem = item;
                this.getRiskTrackData(item);
            },

            /**
             * 获取当前风险追踪单个风险数据
             * @param selectedOption
             */
            getRiskTrackData(selectedOption) {
                selectedOption = this.selectedItem || '01';
                let _this = this;
                let requestParams = _this.getQueryParameter(selectedOption);

                let sqlObj = '', sql = '';
                _this.axios.get("/cnbi/json/source/tjsp/riskSql/cwtRiskControlSql/riskSql.json").then(res => {
                    let sqlList = res.data['sqlList'];
                    if (sqlList.length > 0) {
                        sqlObj = sqlList.filter((item) => {
                            //通过id获取对应的sql
                            return item.id === '002'
                        })
                    }
                    sql = sqlObj[0].sql;
                    requestParams['sql'] = sql;

                    _this.RiskBackDataQuery(requestParams);

                });
            },

            /**
             * 获取请求发送的参数
             * @param selectedOption
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
             * 发送请求
             * @param params
             * @constructor
             */
            RiskBackDataQuery(params) {
                let _this = this;
                findThirdPartData(params).then(res => {
                    if (res.data.code) {
                        /**
                         * 获取数据之后进行的数据处理
                         */
                        let datas = res.data.data;
                        let _operations = [];
                        datas.forEach((data) => {
                            let operations = data.operation.split(',');
                            for (let i = 0, len = operations.length; i < len; i++) {
                                let emptyBtn = {
                                    id: '',
                                    btnShow: true,
                                    text: ''
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
                        //将处理好的数据给tableData渲染查询出来的数据
                        _this.tableData = res.data.data;

                    }
                })
            },

            /**
             * 页面维度改变的时候刷新页面数据
             */
            updateView() {
                this.getRiskTrackData();
            },

            /**
             * 风险追踪弹出层展示
             * @param scope
             */
            dialogContentShow(scope) {
                let row = scope.row,
                    dataIndex = row.rownum - 1;
                let _data = this.tableData[dataIndex];
                this.dialogDataFormat(_data);
            },

            /**
             * 格式化数据用于显示在弹出层里面
             * @param data
             */
            dialogDataFormat(data) {
                let _dialogData = this.dialogData;
                _dialogData.riskname = data.riskname;
                _dialogData.riskid = data.scode;
                _dialogData.rownum = data.rownum;
                let contentHeader = _dialogData.contentHeader,
                    contentMiddle = _dialogData.contentMiddle,
                    contentFoot = _dialogData.contentFoot;

                contentHeader.content.forEach((item) => {
                    item.text = data[item.dataType]
                });
                contentMiddle.content.forEach((item) => {
                    item.text = data[item.dataType]
                });
                contentFoot.content.forEach((item)=>{
                    item.state = data[item.dataType];
                    if(item.dataType === 'risk_sb'){
                        item.risk_up_user = data.sreportuser;
                        item.risk_up_time = data.sreporttime;
                    }else if(item.dataType === 'risk_ps'){
                        item.risk_up_user = data.sinstructionsuser;
                        item.risk_up_time = data.sinstructiontime;
                        item.risk_up_content = data.sinstructscontent;
                    }else if(item.dataType === 'risk_fq'){
                        item.risk_up_user = data.sfeedbacksuser;
                        item.risk_up_time = data.sfeedbacktime;
                        item.risk_up_content = data.sfeedbackscontent;
                    }

                });

                this.dataChanged = !this.dataChanged;
            },

            /**
             * 上一条下一条数据变化
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
                    this.dialogDataFormat(newData);
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
                    this.dialogDataFormat(newData);
                    this.$message({
                        message: '切换下一条成功',
                        type: "success"
                    });
                }

            },

            /**
             * 弹出层关闭按钮事件处理
             */
            closeTrackDialogContent(){
                this.trackDialogVisible = false;
            }
        }
    }
</script>

<style scoped>
    .top-tip {
        margin-bottom: 10px;
    }
</style>