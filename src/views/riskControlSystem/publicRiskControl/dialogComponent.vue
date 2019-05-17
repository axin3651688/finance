<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;" v-show="dialogData['dialogRiskType'] === 'riskBack'">风险矩阵参照</a>
            </div>
            <div class="risk-reference">
                <a style="color: dodgerblue;"v-show="dialogData['dialogRiskType'] === 'riskTrack'">风险可能性参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">

                    <!--弹出层头部-->
                    <risk-header
                            :formData="formData"
                    >
                    </risk-header>

                    <!--弹出层中间的三个公共部分-->
                    <risk-conventional
                            :formData="formData"
                    >
                    </risk-conventional>

                    <!--弹出层关于领导批示的部分-->
                    <risk-instruction
                            v-show="dialogData['dialogRiskType'] === 'riskBack'"
                            :formData="formData"
                    >
                    </risk-instruction>

                    <!--弹出层有关风险追踪的进度的部分-->
                    <risk-schedule
                            v-show="dialogData['dialogRiskType'] === 'riskTrack'"
                            :formData="formData"
                    >
                    </risk-schedule>

                    <!--弹出层底部按钮-->
                    <risk-foot
                            :formData="formData"
                            :dialogData="dialogData"
                            @closeDialogContent="closeDialogContent"
                    >
                    </risk-foot>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    import riskHeader from './riskFeedComponents/riskHeader'
    import riskConventional from './riskFeedComponents/riskConventional'
    import riskInstruction from './riskFeedComponents/riskInstruction'
    import riskSchedule from './riskFeedComponents/riskSchedule';
    import riskFoot from './riskFeedComponents/riskFoot'

    export default {
        name: "dialogComponent",
        components: {
            riskHeader,
            riskConventional,
            riskInstruction,
            riskSchedule,
            riskFoot
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
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            closeDialogContent(){
                this.$emit('closeDialogContent1')
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

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }

</style>