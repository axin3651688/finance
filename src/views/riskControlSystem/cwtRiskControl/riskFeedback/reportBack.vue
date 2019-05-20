<template>
    <div class="app-container">
        <tree-table
                border
                :data.sync="treeData"
                :columns.sync="columns"
                v-show="!reportBackDetail"
                @buttonHandler="buttonHandler"
        >
        </tree-table>

        <div class="report-component-content" v-show="reportBackDetail">
            <div style="text-align: right; padding-right: 4px;">
                <el-button type="primary" @click="pageBack">返回</el-button>
            </div>
            <report-component
                    :reportData.sync="reportData"
            >
            </report-component>
        </div>
    </div>

</template>

<script>
    import treeTable from "../../publicRiskControl/treeTable/treeTable"
    import reportComponent from '../../publicRiskControl/reportComponent'

    export default {
        name: 'reportBack',
        components: {
            treeTable,
            reportComponent
        },
        data() {
            return {
                reportBackDetail: false,
                treeData: [],
                columns: [],
                reportData: {
                    reportCompanyName: '天津食品集团有限公司(合并)',
                    reportType: 'riskFeedCom',
                    reportDataContent:{
                        id:'riskFeed',
                        headerData:{
                            data1:0,
                            data2:3,
                            data3:4,
                            data4:5,
                            data5:23,
                            data6:5,
                            data7:7,
                            data8:345,
                            data9:673,
                            data10:6,
                        },
                        riskFeedData:[
                            {
                                id:'zlfx',
                                text:'一、战略风险',
                                show:true,
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重要',
                                    company:'',
                                    identificationUser:'张三'
                                },
                                contentUp:{
                                    id:"zlfxUp",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ]
                                },
                                contentDown:{
                                    id:"zlfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小智。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                }
                            },
                            {
                                id:'tzfx',
                                text:'二、投资风险',
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重大',
                                    company:'',
                                    identificationUser:'吴某人'
                                },
                                contentUp:{
                                    id:"tzfxUp",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、投资风险可能性为高(30-65%)，对业务和目标的影响额为500万元以下，这是一个好消息',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ],
                                },
                                contentDown:{
                                    id:"tzfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小刘。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                } 
                            },
                            {
                                id:'yyfx',
                                text:'三、运营风险',
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重要',
                                    company:'',
                                    identificationUser:'张三'
                                },
                                contentUp:{
                                    id:"yyfxUp",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ],
                                },
                                contentDown:{
                                    id:"yyfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小智。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                }
                            },
                            {
                                id:'cwfx',
                                text:'四、财务风险',
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重要',
                                    company:'',
                                    identificationUser:'张三'
                                },
                                contentUp:{
                                    id:"cwfx",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ],
                                },
                                contentDown:{
                                    id:"cwfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小智。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                }
                            },
                            {
                                id:'flfx',
                                text:'五、法律风险',
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重要',
                                    company:'',
                                    identificationUser:'张三'
                                },
                                contentUp:{
                                    id:"flfxUp",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ],
                                },
                                contentDown:{
                                    id:"flfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小智。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                }
                            },
                            {
                                id:'ljfx',
                                text:'六、廉洁风险',
                                responsibility:{
                                    text:'社会责任风险',
                                    level:'重要',
                                    company:'',
                                    identificationUser:'张三'
                                },contentUp:{
                                    id:"ljfx",
                                    content:[
                                        {
                                            title:'风险评估',
                                            content:[
                                                '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                                                '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                                            ]
                                        },
                                        {
                                            title:'风险概述',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'采取措施',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        },
                                        {
                                            title:'应对建议',
                                            content:[
                                                '1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失',
                                            ]
                                        }
                                    ],
                                },
                                contentDown:{
                                    id:"ljfxDown",
                                    content:[
                                        {
                                            schedule:'进度一',
                                            text:'风险上报',
                                            state:'已上报',
                                            content:'上报的内容。上报人：小智。上报时间：2019年3月'
                                        },
                                        {
                                            schedule:'进度二',
                                            text:'风险批示',
                                            state:'未批示',
                                            content:'请尽快批示'
                                        },
                                        {
                                            schedule:'进度三',
                                            text:'风险反馈',
                                            state:'未反馈',
                                            content:'请尽快反馈'
                                        }
                                    ]
                                }
                            }
                        ]
                    },

                }
            }
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
            pageBack() {
                this.reportBackDetail = false;
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
        }
    }
</script>

<style scoped>
    .report-component-content button {
        text-align: right;
    }
</style>

