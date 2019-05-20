<template>
    <div>
        <div class="risk-back-content">
            <div class="top-tip">
                <span class="select-name">部门选择:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
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
    import stable from "@v/riskControlSystem/publicRiskControl/table/singleTable";

    export default {
        name: "riskBack",
        components: {
            dialogComponent,
            stable
        },
        data() {
            return {
                dialogVisible: false,
                tableData: [],
                columns: [],
                options: [
                    {
                        value: '选项1',
                        label: '财务部'
                    }, {
                        value: '选项2',
                        label: '风控部'
                    }, {
                        value: '选项3',
                        label: '其他部门'
                    }
                ],
                value: '',
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
                                width: ""
                            },
                            {
                                dataType: 'riskMeasure',
                                label: "采取措施",
                                width: ""
                            },
                            {
                                dataType: 'riskSuggest',
                                label: "应对建议",
                                width: ""
                            }
                        ]
                    },
                    contentFoot: {
                        content: [
                            {
                                schedule: '进度一',
                                text: '风险上报',
                                state: '已上报',
                                content: '上报的内容。上报人：小智。上报时间：2019年3月'
                            },
                            {
                                schedule: '进度二',
                                text: '风险批示',
                                state: '未批示',
                                content: '请尽快批示'
                            },
                            {
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
            //请求table的数据。
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskSingleTable.json").then(res => {
                if (res.data.code === 200) {
                    me.tableData = res.data.rows;
                    me.treeData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        methods: {
            /**
             * 操作列里面的反馈或者已反馈触发的事件
             * @param index
             * @param row
             */
            riskHandle(index, row) {
                console.log(index, row);
            },
            /**
             * 表头改变颜色
             * @param rowIndex
             * @returns {string}
             */
            getRowClass({rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)'
                } else {
                    return ''
                }
            },

            /**
             * 关于某个风险的反馈弹出按钮
             *
             **/
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
            }
        }
    }
</script>

<style scoped>
    .select-name {
        margin-right: 10px;
    }

    .top-tip {
        margin-bottom: 10px;
    }
</style>