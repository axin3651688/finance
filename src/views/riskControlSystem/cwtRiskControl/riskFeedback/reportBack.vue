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
                <el-button type="primary" @click="pageBack">返回</el-button>
            </div>

            <risk-feed-report-component
                    :reportData.sync="reportData"
            >
            </risk-feed-report-component>
        </div>
    </div>

</template>

<script>
    import treeTable from "../../publicRiskControl/treeTable/treeTable"
    import riskFeedReportComponent from './riskFeedReportComponent'

    export default {
        name: 'reportBack',
        components: {
            treeTable,
            riskFeedReportComponent
        },
        data() {
            return {
                reportBackDetail: false,
                treeData: [],
                columns: [],
                reportData: {
                    reportCompanyName: '天津食品集团有限公司(合并)',
                    reportType: 'riskFeedCom',
                    reportDataContent: {
                        headerData: {
                            data1: 0,
                            data2: 3,
                            data3: 4,
                            data4: 5,
                            data5: 23,
                            data6: 5,
                            data7: 7,
                            data8: 345,
                            data9: 673,
                            data10: 6,
                        },
                        riskFeedDataList: {

                            zlfx: {
                                risktype: '战略风险',
                                riskdetaildata: [
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '严重',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                    '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    },
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '严重',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                    '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    }
                                ],
                            },
                            tzfn: {
                                risktype: '投资风险',
                                riskdetaildata: [
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '轻量级',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                    '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    },
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '严重',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                    '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    }
                                ],
                            },
                            lcfx: {
                                risktype: '理财风险',
                                riskdetaildata: [
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '极重',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                    '2、此风险对声誉的影响：对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    },
                                    {
                                        riskname: '天津食品集团风险',
                                        risklevel: '严重',
                                        riskcompany: '天津食品集团',
                                        risksbuser: '德玛西亚',
                                        risk_pg_gs_cs_jy: [
                                            {
                                                title: '风险评估',
                                                content: [
                                                    '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                    '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                                ]
                                            },
                                            {
                                                title: '风险概述',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '采取措施',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            },
                                            {
                                                title: '应对建议',
                                                content: [
                                                    '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                                ]
                                            }
                                        ],
                                        risk_ps: {
                                            risk_ps_cl: '5',
                                            risk_ps_content: '6'
                                        },
                                        risk_feed_content: '7'
                                    }
                                ],
                            },
                        }
                    },

                }
            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskTreeBack.json").then(res => {
                if (res.data.code === 200) {
                    me.treeData = res.data.rows;
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

                } else if (_id === '1') {
                    //显示报告详情
                    this.reportBackDetail = true;
                } else if (_id === '2') {

                } else if (_id === '3') {

                }
            },

            /**
             * 页面关闭事件
             */
            pageBack() {
                this.reportBackDetail = false;
            },

            /**
             * 获取报告页面数据
             */
            getReportData() {
                let _this = this,
                    _reportData = _this.reportData;
            }
        }

    }
</script>

<style scoped>
    .report-component-content button {
        text-align: right;
    }
</style>

