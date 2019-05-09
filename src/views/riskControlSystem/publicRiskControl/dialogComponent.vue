<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 100px">风险类型：</span>
                                <el-input v-model="formData.riskType" placeholder="风险类型"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险发生概率：</span>
                                <el-input v-model="formData.riskProbability" placeholder="风险发生概率"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险影响程度：</span>
                                <el-input v-model="formData.riskDegree" placeholder="风险影响程度"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4" style="padding-right: 0">
                            <div class="top-form-contents" style="height: 40px;justify-content: space-around;">
                                <span style="min-width: 70px;width: 70px">风险等级：</span>
                                <div class="risk-level">
                                    <span>{{this.formData.riskLevel}}</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">风险概述：</span>
                                <el-input type="textarea" :rows="4" v-model="formData.riskOverview"></el-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">采取措施：</span>
                                <el-input type="textarea" :rows="4" v-model="formData.riskMeasure"></el-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">应对建议：</span>
                                <el-input type="textarea" :rows="4" v-model="formData.riskSuggest"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <el-col>
                                <div class="top-form-contents">
                                    <span style="min-width: 70px;width: 70px">领导批示：</span>
                                    <div class="top-form-contents" style="margin-bottom: 0">
                                        <span style="min-width: 98px;width: 150px;font-weight: 200;">风险应对策略：</span>
                                        <el-input v-model="formData.countermeasures"></el-input>
                                    </div>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="top-form-contents">
                                    <span style="min-width: 70px;width: 70px"></span>
                                    <el-input type="textarea" :rows="3" v-model="formData.instruction"></el-input>
                                </div>
                            </el-col>

                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">风险反馈：</span>
                                <el-input type="textarea" :rows="4" v-model="formData.riskFeed"
                                          placeholder="针对风险进行相关反馈录入"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
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
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

        <show-personnel-list :personnelListShow="personnelListShow"></show-personnel-list>

    </div>
</template>

<script>
    import showPersonnelList from './showPersonnelList'
    export default {
        name: "dialogComponent",
        components: {
            showPersonnelList
        },
        props: {
            dialogData: Object,
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
                    instruction: '显示批示内容，不可编辑',
                    riskFeed: '',
                },

                personnelListShow: false,

            }
        },
        created() {
        },
        mounted() {
        },
        watch: {

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
</style>