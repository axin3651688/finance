<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 100px">风险类型：</span>
                                <el-input v-model="formData.riskType" placeholder="风险类型"></el-input>
                                <!--<el-form-item label="风险类型">-->
                                <!--<el-input v-model="formData.riskType" placeholder="风险类型"></el-input>-->
                                <!--</el-form-item>-->
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险发生概率：</span>
                                <el-input v-model="formData.riskProbability" placeholder="风险发生概率"></el-input>
                                <!--<el-form-item label="风险发生概率">-->
                                <!--<el-input v-model="formData.riskProbability" placeholder="风险发生概率"></el-input>-->
                                <!--</el-form-item>-->
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险影响程度：</span>
                                <el-input v-model="formData.riskDegree" placeholder="风险影响程度"></el-input>
                                <!--<el-form-item label="风险影响程度">-->
                                <!--<el-input v-model="formData.riskDegree" placeholder="风险影响程度"></el-input>-->
                                <!--</el-form-item>-->
                            </div>
                        </el-col>
                        <el-col :span="4" style="padding-right: 0">
                            <div class="top-form-contents" style="height: 40px">
                                <span style="min-width: 70px;width: 70px">风险等级：</span>
                                <div class="risk-level">
                                    <span>{{this.formData.riskLevel}}</span>
                                </div>
                                <!--<el-form-item label="风险等级">-->
                                <!--<div class="risk-level">-->
                                <!--<span>{{this.formData.riskLevel}}</span>-->
                                <!--</div>-->
                                <!--</el-form-item>-->
                            </div>
                        </el-col>
                    </el-row>


                    <el-form-item label="风险概述" prop="desc" class="risk-detail-area">
                        <el-input type="textarea" :cols="80" v-model="formData.riskOverview"></el-input>
                    </el-form-item>
                    <el-form-item label="采取措施" prop="desc" class="risk-detail-area">
                        <el-input type="textarea" :cols="80" v-model="formData.riskMeasure"></el-input>
                    </el-form-item>
                    <el-form-item label="应对建议" prop="desc" class="risk-detail-area">
                        <el-input type="textarea" :cols="80" v-model="formData.riskSuggest"></el-input>
                    </el-form-item>

                    <el-form-item label="领导批示">
                        <el-form-item label="风险应对策略">
                            <el-input v-model="formData.countermeasures" placeholder="风险应对策略，不可编辑"></el-input>
                        </el-form-item>
                        <el-input type="textarea" v-model="formData.instruction"></el-input>
                    </el-form-item>

                    <el-form-item label="风险反馈" prop="desc" class="risk-detail-area">
                        <el-input type="textarea" :cols="80" v-model="formData.riskFeed"
                                  placeholder="针对风险进行相关反馈录入"></el-input>
                    </el-form-item>

                    <div class="form-foot">
                        <div class="form-foot-left">
                            <el-form-item>
                                <el-button type="primary" @click="lastMessage()">上一条</el-button>
                                <el-button type="primary" @click="nextMessage()">下一条</el-button>
                            </el-form-item>
                        </div>
                        <div class="form-foot-right">
                            <el-form-item>
                                <el-checkbox
                                        label="指定反馈人员"
                                        name="type"
                                        class="form-foot-right-check"
                                        @change="handleCheckedChange"
                                ></el-checkbox>
                                <el-button type="primary" @click="riskSend()">反馈上报</el-button>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>

            </div>
        </div>

        <div class="personnel-list" v-show="personnelListShow">
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                    class="filter-tree"
                    :data="personnelList"
                    show-checkbox
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree"
                    :props="defaultProps">
            </el-tree>
            <div class="btn-sure">
                <el-button type="primary" @click="checkedSure">确定</el-button>
                <el-button @click="resetChecked">重置</el-button>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "dialogComponent",
        components: {},
        props: {
            dialogData: Object
        },
        data() {
            return {
                formData: {
                    riskType: '自动填入',
                    riskProbability: '自动填入',
                    riskDegree: '自动填入',
                    riskLevel: '重大',
                    riskOverview: '自动带出，不可编辑',
                    riskMeasure: '自动查询风险识别的',
                    riskSuggest: '自动查询风险识别的',
                    countermeasures: '风险应对策略，不可编辑',
                    instruction: '自动查询风险识别的',
                    riskFeed: '',
                },
                personnelList: [
                    {
                        id: 1,
                        label: '部门A',
                        children: [
                            {
                                id: 3,
                                label: '人员A-1'
                            },
                            {
                                id: 4,
                                label: '人员A-2'
                            },
                            {
                                id: 5,
                                label: '人员A-3'
                            },
                            {
                                id: 6,
                                label: '人员A-4'
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '部门B',
                        children: [
                            {
                                id: 7,
                                label: '人员B-1'
                            },
                            {
                                id: 8,
                                label: '人员B-2'
                            },
                            {
                                id: 9,
                                label: '人员B-3'
                            },
                            {
                                id: 10,
                                label: '人员B-4'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                personnelListShow: false,
                filterText: ''

            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            /**
             * 查看上一条信息
             */
            lastMessage() {
                alert("查看上一条信息。。。")
            },
            /**
             * 查看下一条信息
             */
            nextMessage() {
                alert("查看下一条信息。。。")
            },
            /**
             * 反馈上报
             */
            riskSend() {
                alert("反馈上报。。。")
            },
            /**
             * 指定反馈人员选中监听
             */
            handleCheckedChange() {
                // alert("反馈上报。。。")
                this.personnelListShow = !this.personnelListShow;
            },

            /**
             * 指定人员搜索
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            checkedSure() {
                alert("反馈成功");
            }

        }
    }
</script>

<style scoped>
    .risk-reference {
        display: flex;
        margin-bottom: 20px;
        justify-content: flex-end;
    }

    .top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }

    .form-foot {
        display: flex;
        justify-content: space-between;
    }

    .form-foot-right-check {
        margin-right: 10px;
    }

    .risk-level {
        min-width: 40px;
        border: 1px solid black;
        border-radius: 10px;
        text-align: center;
        background: red;
    }

    .personnel-list {
        background: white;
        width: 200px;
        margin-top: 10px;
        border: 1px solid #606266;;
        padding: 5px;
        position: absolute;
        bottom: 100px;
        right: 20px;
        height: 354px;
    }
    .btn-sure{
        text-align: right;
        margin-top: 10px;
    }
    .btn-sure button{
        border-radius: 16px;
        padding: 8px 16px;
    }

</style>