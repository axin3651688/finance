<template>
    <div>


        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">
                    <el-form-item label="风险类型">
                        <el-input v-model="formData.riskType" placeholder="风险类型"></el-input>
                    </el-form-item>
                    <el-form-item label="风险发生概率">
                        <el-input v-model="formData.riskProbability" placeholder="风险发生概率"></el-input>
                    </el-form-item>
                    <el-form-item label="风险影响程度">
                        <el-input v-model="formData.riskDegree" placeholder="风险影响程度"></el-input>
                    </el-form-item>
                    <el-form-item label="风险等级">
                        <div class="risk-level">
                            <!--{{this.formData.riskLevel}}-->
                            <span>{{this.formData.riskLevel}}</span>
                        </div>
                    </el-form-item>

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

        <!--<el-dialog-->
                <!--:title="getDialogTitle()"-->
                <!--width="56%"-->
                <!--:visible.sync="dialogVisible"-->
        <!--&gt;-->
        <!--</el-dialog>-->

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
                }
            }
        },
        created() {
        },
        mounted() {
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
                alert("反馈上报。。。")
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
</style>