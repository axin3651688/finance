<template>
    <div class="app-container">
        <tree-table
                border
                :data.sync="treeData"
                :columns.sync="columns"
                v-if="!reportBackDetail"
                @buttonHandler="buttonHandler"
        >
        </tree-table>

        <div class="report-component-content" v-if="reportBackDetail">
            <div style="text-align: right; padding-right: 4px;">
                <el-button type="primary" @click="pageExport">导出</el-button>
                <el-button type="primary" @click="pageBack">返回</el-button>
            </div>

            <risk-feed-report-component
                    :reportData.sync="reportData"
                    :dataFresh="dataFresh"
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

    export default {
        mixins: [cwtPublicJS],
        name: 'reportBack',
        components: {
            treeTable,
            riskFeedReportComponent
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
                    this.reportPageOpen(scope);
                } else if (_id === '1') {
                    //显示报告详情
                    this.reportPageOpen(scope);
                } else if (_id === '2') {
                    //风险报告退回
                } else if (_id === '3') {
                    //风险报告提醒
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
                            return item.id === '003'
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
                            return item.id === '004'
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

                debugger;
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
            }

        }
    }
</script>

<style scoped>
    .report-component-content button {
        text-align: right;
    }
</style>

