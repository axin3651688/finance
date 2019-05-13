<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">

                    <risk-header :formData="formData"></risk-header>
                    <risk-conventional :formData="formData"></risk-conventional>
                    <risk-instruction :formData="formData"></risk-instruction>
                    <risk-foot></risk-foot>

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

                    <!-- 风险追踪 -->
                    <!-- <el-row v-if="treeName=='riskTablePublic'">
                        <el-col>
                            <div class="top-form-contents" style="float: left">
                                <span style="min-width: 70px;width: 70px">风险追踪：</span>
                            </div>
                            <div style="border: 1px solid #ccc;width: 955px; height: 100%;float: left; marginBottom: 10px;">
                                <p style="fontSize: 15px;">进度一</p>
                                <p style="margin: 15px 15px 15px 15px">名称：风险上报</p>
                                <p style="margin: 15px 15px 15px 15px">
                                    状态：
                                    <span style="border: 1px solid #ccc; backgroundColor: blue; color: #fff">已上报</span>
                                    <span style="border: 1px solid #ccc; backgroundColor: red; color: #fff">未上报</span>
                                </p>
                                <p style="margin: 15px 15px 15px 15px">内容：<span>状态为：已上报，则显示上报人+上报时间；状态为：未上报，则提示“请将风险尽快上报”</span></p>                                
                                <p style="fontSize: 15px;">进度二</p>
                                <p style="margin: 15px 15px 15px 15px">名称：风险批示</p>
                                <p style="margin: 15px 15px 15px 15px">
                                    状态：
                                    <span style="border: 1px solid #ccc; backgroundColor: blue; color: #fff">已批示</span>
                                    <span style="border: 1px solid #ccc; backgroundColor: red; color: #fff">未批示</span>
                                </p>
                                <p style="margin: 15px 15px 15px 15px">内容：<span>状态为：已批示，则显示领导批示的内容+批示人+批示时间；状态为：未批示，则提示“请尽快对风险进行批示...”</span></p>
                                <p style="fontSize: 15px;">进度三</p>
                                <p style="margin: 15px 15px 15px 15px">名称：风险反馈</p>
                                <p style="margin: 15px 15px 15px 15px">
                                    状态：
                                    <span style="border: 1px solid #ccc; backgroundColor: blue; color: #fff">已反馈</span>
                                    <span style="border: 1px solid #ccc; backgroundColor: red; color: #fff">未反馈</span>
                                </p>
                                <p style="margin: 15px 15px 15px 15px">内容：<span>状态为：已反馈，则显示反馈内容+反馈人+反馈时间；状态为：未反馈，则提示“请尽快对风险进行反馈...”</span></p>
                            </div>
                        </el-col>
                    </el-row> -->

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

    </div>
</template>

<script>

    import riskHeader from './riskFeedComponents/riskHeader'
    import riskConventional from './riskFeedComponents/riskConventional'
    import riskInstruction from './riskFeedComponents/riskInstruction'
    import riskFoot from './riskFeedComponents/riskFoot'

    export default {
        name: "dialogComponent",
        components: {

            riskHeader,
            riskConventional,
            riskInstruction,
            riskFoot
        },
        props: {
            dialogData: Object,
            treeName: Object
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
            }
        },
        created() {
            debugger
            let cc = this.treeName;
        },
        mounted() {
        },
        watch: {},
        methods: {}
    }
</script>

<style scoped>
    .risk-reference {
        display: flex;
        margin-bottom: 20px;
        justify-content: flex-end;
    }

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }

</style>