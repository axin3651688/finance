<template>
    <div class="app-container" v-if="pageDataFresh">
        <tree-table
                border
                :data.sync="treeData"
                :columns.sync="columns"
                v-if="!reportBackDetail"
                @buttonHandler="buttonHandler"
        >
        </tree-table>

        <div class="report-component-content" v-if="reportBackDetail">
            <el-header class="container_header">
                <div class="container_alert" v-if="isPageReadOnly">
                    <span><i class="el-icon-warning"></i>查看页面，无法操作此页面！</span>
                </div>
                <div class="container_alert" v-else>
                    <span>报告反馈</span>
                </div>
                <div class="container_btn">
                    <el-button type="primary" plain @click="exportBtn">导出</el-button>
                    <el-button type="primary" plain @click="pageBack">返回</el-button>
                </div>
            </el-header>

            <risk-feed-report-component
                    :reportData.sync="reportData"
                    :dataFresh="dataFresh"
                    :dialogState="dialogState"
                    @reportFeedSuccess="reportFeedSuccess"
            >
            </risk-feed-report-component>
        </div>
    </div>

</template>

<script>
    import treeTable from "../../publicRiskControl/treeTable/treeTable"
    import riskFeedReportComponent from './riskFeedReportComponent'
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {findThirdPartData} from "~api/interface"
    import {mapGetters} from "vuex"
    import {riskReportExport, riskBackAndNotice} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        mixins: [cwtPublicJS],
        name: 'reportBack',
        props: {
            isPeriodNow: Boolean
        },
        components: {
            treeTable,
            riskFeedReportComponent
        },
        mounted() {
            this.doNotShowDim(true);
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.getReportData();
            },
            year(newValue, oldValue) {
                this.getReportData();
            },
            month(newValue, oldValue) {
                this.getReportData();
            }
        },
        data() {
            return {
                reportBackDetail: false,
                treeData: [],
                columns: [],
                isPageReadOnly: false,
                reportData: {
                    reportcompanyname: '',
                    reportperiod: '',
                    reportDataContent: {
                        headerData: {
                            riskLevelCountArray: {
                                level_5: 0,
                                level_4: 0,
                                level_3: 0,
                                level_2: 0,
                                level_1: 0
                            },
                            riskStypeCountArray: {
                                flfx: 0,
                                yyfx: 0,
                                scfx: 0,
                                cwfx: 0,
                                zlfx: 0,
                                syfx: 0,
                                ljfx: 0,
                            }
                        },
                        riskFeedDataList: {
                            flfx: {
                                risksptype: '',
                                riskdetaildata: [
                                    {
                                        riskname: '',
                                        risklevel: '',
                                        riskcompany: '',
                                        risksbuser: '',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '',
                                                content: []
                                            },
                                            {
                                                title: '',
                                                content: []
                                            },
                                            {
                                                title: '',
                                                content: []
                                            },
                                            {
                                                title: '',
                                                content: []
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '',
                                            risk_ps_content: ''
                                        },
                                        risk_feed_content: ''
                                    }
                                ],
                            },
                            yyfx: {},
                            scfx: {},
                            cwfx: {},
                            zlfx: {},
                            syfx: {},
                            ljfx: {}
                        }
                    },
                },
                dataFresh: false,
                pageDataFresh: true,
                dialogState: '',


                jsonDataTemplate: {
                    "level": 0,
                    "leaf": 0,
                    "children": [
                        {
                            "text": "总述",
                            "level": 1,
                            "leaf": 1,
                            "content": ""
                        },
                        {
                            "text": "",
                            "level": 1,
                            "leaf": 0,
                            "children": [
                                {
                                    "level": 2,
                                    "leaf": 1,
                                    "type": "text",
                                    "content": ""
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>风险名称:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>风险评估:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }

                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>风险概述:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>采取措施:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>应对建议:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>领导批示:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": "风险策略为：",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "leaf": 1,
                                                    "type": "text",
                                                    "content": ""
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "leaf": 0,
                                    "type": "text",
                                    "content": "<strong>风险反馈:",
                                    "children": [
                                        {
                                            "level": 3,
                                            "leaf": 1,
                                            "type": "text",
                                            "content": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }


            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskTreeBack.json").then(res => {
                if (res.data.code === 200) {
                    // me.treeData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
            this.getReportData();
        },
        methods: {
            /**
             * 按钮点击事件 所有的
             * 0:反馈，1:查看，2:退回，3:提醒
             */
            buttonHandler(scope, btnItem) {
                let _id = btnItem.id;
                if (_id === '0') {
                    //风险报告反馈
                    this.dialogState = 'fk';

                    this.reportPageOpen(scope);
                } else if (_id === '1') {
                    this.dialogState = 'ck';
                    //显示报告详情
                    this.reportPageOpen(scope);
                } else if (_id === '2') {
                    this.dialogState = 'th';
                    //风险报告退回
                    this.reportFeedBackEvent();
                } else if (_id === '3') {
                    this.dialogState = 'tx';
                    //风险报告提醒
                    this.reportFeedNoticeEvent();
                }
            },

            /**
             * 页面关闭事件
             */
            pageBack() {
                this.reportBackDetail = false;
            },

            /**
             * 页面报告导出事件
             */
            pageExport() {
                this.$message({
                    message: '导出功能搁浅',
                    type: 'success'
                })
            },

            /**
             * 获取报告页面表格展现数据
             */
            getReportData() {
                let _this = this;
                let requestParams = _this.getQueryParameter();
                let sqlObj = '',
                    sql = '';
                _this.axios.get("/cnbi/json/source/tjsp/riskSql/cwtRiskControlSql/riskSql.json").then(res => {
                    let sqlList = res.data['sqlList'];
                    if (sqlList.length > 0) {
                        sqlObj = sqlList.filter((item) => {
                            if (_this.isPeriodNow) {
                                return item.id === '003_1'
                            } else {
                                return item.id === '003'
                            }
                        })
                    }
                    sql = sqlObj[0].sql;
                    requestParams['sql'] = sql;

                    _this.RiskBackDataQuery(requestParams);

                });
            },

            /**
             * 获取发送树表数据的请求参数
             */
            getQueryParameter() {
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
                    period: period,
                };
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
                        /**
                         * 获取数据之后进行的数据处理
                         */
                        let datas = res.data.data;
                        let _operations = [];
                        datas.forEach((data) => {
                            if (data.operation) {
                                if (company !== userCompany) {
                                    data.operation = '1-查看'
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
                            }
                        });

                        _this.treeData = _this.TreeDataFormat(res.data.data);
                    }
                })
            },

            /**
             * 点击反馈和查看调用的事件
             * @param scope
             */
            reportPageOpen(scope) {
                this.reportBackDetail = true;
                let isFeeded = scope.row.status;
                this.isPageReadOnly = isFeeded === '已反馈';
                this.getReportHandleData(scope);
            },

            /**
             * 获取报告界面数据
             * sql 获取在这个里面
             * @param scope
             */
            getReportHandleData(scope) {
                let _this = this;
                let row = scope.row,
                    company = row.scode;
                let period = _this.publicGetPeriodMethod();
                let params = {
                    company: company,
                    period: period
                };

                let sqlObj = null,
                    sql = '';
                _this.axios.get("/cnbi/json/source/tjsp/riskSql/cwtRiskControlSql/riskSql.json").then(res => {
                    let sqlList = res.data['sqlList'];
                    if (sqlList.length > 0) {
                        sqlObj = sqlList.filter((item) => {
                            if (_this.isPeriodNow) {
                                return item.id === '004_1'
                            } else {
                                return item.id === '004'
                            }
                        })
                    }
                    sql = sqlObj[0].sql;
                    params['sql'] = sql;

                    _this.requestSend(params);

                });
            },

            /**
             * 发送请求报告页面方法
             * 维度在这个方法里面
             * @param params
             */
            requestSend(params) {
                let _this = this;
                findThirdPartData(params).then((res) => {
                    let datas = res.data;
                    if (datas.code === 200) {
                        let _data = datas.data;
                        _this.reportPageDataFormat(_data);
                    }
                })
            },

            /**
             * 发送到报告页面的数据格式化操作
             * @param data
             * @author cwt
             */
            reportPageDataFormat(data) {
                let _this = this;
                let _reportData = _this.reportData;
                _reportData.reportcompanyname = data.reportcompanyname;
                _reportData.reportperiod = data.reportperiod;
                let _reportDataContent = _reportData.reportDataContent;
                let _riskFeedDataList = _reportDataContent.riskFeedDataList;

                /**
                 * 根据大的风险类型分成七个部分
                 */
                let flfx = data.filter((item) => {
                    return item['typespcode'] === '01'
                });
                let yyfx = data.filter((item) => {
                    return item['typespcode'] === '02'
                });
                let scfx = data.filter((item) => {
                    return item['typespcode'] === '03'
                });
                let cwfx = data.filter((item) => {
                    return item['typespcode'] === '04'
                });
                let zlfx = data.filter((item) => {
                    return item['typespcode'] === '05'
                });
                let syfx = data.filter((item) => {
                    return item['typespcode'] === '06'
                });
                let ljfx = data.filter((item) => {
                    return item['typespcode'] === '07'
                });

                let riskArray = {
                    flfx: flfx,
                    yyfx: yyfx,
                    scfx: scfx,
                    cwfx: cwfx,
                    zlfx: zlfx,
                    syfx: syfx,
                    ljfx: ljfx,
                };


                let riskCount = {
                    riskLevelCountArray: {
                        level_5: 0,
                        level_4: 0,
                        level_3: 0,
                        level_2: 0,
                        level_1: 0
                    },
                    riskStypeCountArray: {
                        flfx: 0,
                        yyfx: 0,
                        scfx: 0,
                        cwfx: 0,
                        zlfx: 0,
                        syfx: 0,
                        ljfx: 0,
                    }
                };

                /**
                 * 将七个风险类型分别放到数据结构中
                 */
                for (let key in riskArray) {
                    if (riskArray[key].length > 0) {
                        let emptyData = {
                            risksptype: '',
                            riskdetaildata: []
                        };
                        riskArray[key].forEach((item) => {

                            riskCount.riskStypeCountArray[key] = item['risktypecount'];

                            if (item.risklevel === '巨大风险') {
                                riskCount.riskLevelCountArray.level_5 += 1;
                            } else if (item.risklevel === '重大风险') {
                                riskCount.riskLevelCountArray.level_4 += 1;
                            } else if (item.risklevel === '中等风险') {
                                riskCount.riskLevelCountArray.level_3 += 1;
                            } else if (item.risklevel === '一般风险') {
                                riskCount.riskLevelCountArray.level_2 += 1;
                            } else if (item.risklevel === '可接受风险') {
                                riskCount.riskLevelCountArray.level_1 += 1;
                            }

                            let riskModel = _this.getEmptyRiskTpl();
                            let riskModel_riskdetaildata = riskModel.riskdetaildata;
                            let riskModel_riskdetaildata_risk_pg_gs_cs_jy = riskModel_riskdetaildata.risk_pg_gs_cs_jy;
                            let riskModel_riskdetaildata_risk_ps = riskModel_riskdetaildata.risk_ps;

                            riskModel.risksptype = item.risksptype;

                            riskModel_riskdetaildata.riskname = item.riskname;
                            riskModel_riskdetaildata.risktype = item.risktype;
                            riskModel_riskdetaildata.risklevel = item.risklevel;
                            riskModel_riskdetaildata.riskcompany = item.companyname;
                            riskModel_riskdetaildata.risksbuser = item.risksbuser;
                            riskModel_riskdetaildata.risk_feed_content = item.risk_feed_content;
                            riskModel_riskdetaildata['riskid'] = item.nid;
                            riskModel_riskdetaildata['companyid'] = item['dim_company'];
                            riskModel_riskdetaildata['riskcode'] = key;

                            riskModel_riskdetaildata_risk_pg_gs_cs_jy[0].content = item.riskname;
                            riskModel_riskdetaildata_risk_pg_gs_cs_jy[1].content = item.risk_pg;
                            riskModel_riskdetaildata_risk_pg_gs_cs_jy[2].content = item.risk_gs;
                            riskModel_riskdetaildata_risk_pg_gs_cs_jy[3].content = item.risk_cs;
                            riskModel_riskdetaildata_risk_pg_gs_cs_jy[4].content = item.risk_jy;

                            riskModel_riskdetaildata_risk_ps['risk_ps_cl'] = item.risk_ps_cl;
                            riskModel_riskdetaildata_risk_ps['risk_ps_content'] = item.risk_ps_content;

                            emptyData['risksptype'] = riskModel.risksptype;

                            emptyData['riskdetaildata'].push(riskModel_riskdetaildata);
                        });
                        _riskFeedDataList[key] = emptyData;

                    }
                    _reportDataContent.headerData = riskCount;
                    _this.dataFresh = !_this.dataFresh;
                }
            },

            /**
             * 获取空的风险模板数据
             */
            getEmptyRiskTpl() {
                return {
                    risksptype: '',
                    riskdetaildata:
                        {
                            riskname: '',
                            risktype: '',
                            risklevel: '',
                            riskcompany: '',
                            risksbuser: '',
                            risk_pg_gs_cs_jy: [
                                {
                                    title: '风险名称',
                                    content: []
                                },
                                {
                                    title: '风险评估',
                                    content: []
                                },
                                {
                                    title: '风险概述',
                                    content: []
                                },
                                {
                                    title: '采取措施',
                                    content: []
                                },
                                {
                                    title: '应对建议',
                                    content: []
                                }
                            ],
                            risk_ps: {
                                risk_ps_cl: '',
                                risk_ps_content: ''
                            },
                            risk_feed_content: ''
                        }
                };
            },

            /**
             * 反馈成功以后页面刷新
             */
            reportFeedSuccess() {

                this.isPageReadOnly = true;
                this.getReportData();
            },

            /**
             * 报告反馈退回事件
             */
            reportFeedBackEvent() {
                let _this = this;
                let params = this.getTUTXParams();
                params.sisfeedback = '2';

                riskBackAndNotice(params).then(res => {
                    if (res.data.code === 200) {
                        _this.$message({
                            message: "退回成功",
                            type: "success"
                        });
                        this.getReportData();

                    } else {
                        _this.$message({
                            message: "退回失败！请联系开发人员"
                        })
                    }
                });
            },

            /**
             * 提醒功能
             */
            reportFeedNoticeEvent() {
                let _this = this;
                let params = this.getTUTXParams();
                params.sisfeedback = '0';

                riskBackAndNotice(params).then(res => {
                    if (res.data.code === 200) {
                        _this.$message({
                            message: "提醒成功",
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
             * 获取退回参数
             * @returns {{company: *, period: (string|string), sfeedbacksuser: string, sisfeedback: string}}
             */
            getTUTXParams() {
                let _this = this,
                    _getter = _this.$store.getters,
                    company = _getter.company,
                    year = _getter.year,
                    month = _getter.month,
                    user = _getter.user.user,
                    period = "";
                if (month > 9) {
                    period = year + "" + month;
                } else {
                    period = year + "0" + month;
                }

                return {
                    company: company,
                    period: period,
                    sfeedbacksuser: user.userName,
                    sisfeedback: "2",
                }
            },

            /**
             *
             * 导出事件
             */
            exportBtn() {
                let _this = this;
                let _jsonBean = _this.getJsonData();
                debugger;
                _this.reportExportRequest(_jsonBean);
            },

            /**
             * 获取完整json数据
             * 并从页面元素中获取内容，形成完整的数据类型并格式化用来发送请求
             *
             */
            getJsonData() {
                let _this = this;
                let _riskFeedDataList = _this.reportData.reportDataContent.riskFeedDataList;
                let _data = [];
                for (let key in _riskFeedDataList) {
                    if (_riskFeedDataList[key].risksptype) {
                        _data.push(_riskFeedDataList[key]);
                    }
                }

                let reportJSONData = {
                    "level": 0,
                    "leaf": 0,
                    "children": []
                };

                _data.forEach((item, index) => {
                    let _jsonDataTemplate = _this.jsonDataTemplate;
                    let _template = _jsonDataTemplate.children[1];
                    let data = item.riskdetaildata[0];
                    let _type = item.risksptype;
                    let __data = _this.getreportChildrenData(data, _type, _template);
                    reportJSONData.children.push(__data);
                    reportJSONData.children[index].children[0].content = _this.getInnerTextByClassName("describe");
                });
                return reportJSONData;
            },

            /**
             * 通过类名获取内容  innerText
             * @param className
             * @returns {*}
             */
            getInnerTextByClassName(className) {
                return document.getElementsByClassName(className)[0].innerText;
            },

            /**
             * 通过模板，真是数据，形成真正的json
             * @param data
             * @param t
             * @param type
             */
            getreportChildrenData(data, type, t) {
                let _returnT = t;
                t.text = type;
                let c = _returnT.children;
                let risk_pg_gs_cs_jy = data.risk_pg_gs_cs_jy;
                let risk_ps = data.risk_ps;
                c.forEach((item, index) => {
                    if (index === 6) {
                        item.children[0].children[0].content = risk_ps.risk_ps_cl;
                        item.children[1].content = risk_ps.risk_ps_content;
                    } else if (index === 7) {
                        item.children[0].content = data.risk_feed_content;
                    } else if (index > 0) {
                        item.children[0].content = risk_pg_gs_cs_jy[index - 1].content;
                    }
                });
                return _returnT;
            },

            /**
             * 导出请求发送
             * @param reportJSONData
             */
            reportExportRequest(reportJSONData) {
                let _this = this;
                let _params = {
                    jsonBean: reportJSONData,
                    company: _this.company,
                    year: _this.getYear(),
                    month: _this.getMonth(),
                    text: _this.getInnerTextByClassName('report-title')
                };
                riskReportExport(_params).then((res) => {
                    debugger;
                    if (res.data.code === 200) {

                    }
                })
            }

        }
    }
</script>

<style scoped>
    .report-component-content button {
        text-align: right;
    }

    .container_header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: right;
        background-color: #D3DCE6;
    }

    .container_alert {
        color: #e6a23c;
        width: 250px;
        height: 40px;
        margin-left: 40%;
        float: left;
    }

    .container_btn {
        float: right;
        height: 40px;
        width: 150px;
    }
</style>

