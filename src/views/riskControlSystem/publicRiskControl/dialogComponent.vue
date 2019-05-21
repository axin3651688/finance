<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;" v-show="dialogData['dialogRiskType'] === 'riskBack'">风险矩阵参照</a>
            </div>
            <div class="risk-reference">
                <a style="color: dodgerblue;" v-show="dialogData['dialogRiskType'] === 'riskTrack'">风险可能性参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" class="demo-form-inline">

                    <!--弹出层头部-->
                    <risk-header
                            :dialogHeaderData="dialogHeaderData"
                    >
                    </risk-header>

                    <!--弹出层中间的三个公共部分-->
                    <risk-conventional
                            :dialogMiddleData="dialogMiddleData"
                    >
                    </risk-conventional>

                    <!--弹出层关于领导批示的部分-->
                    <risk-instruction
                            v-if="dialogData['dialogRiskType'] === 'riskBack'"
                            :dialogInstructionData="dialogInstructionData"
                    >
                    </risk-instruction>

                    <!--弹出层有关风险追踪的进度的部分-->
                    <risk-schedule
                            v-if="dialogData['dialogRiskType'] === 'riskTrack'"
                            :dialogScheduleData="dialogScheduleData"
                    >
                    </risk-schedule>

                    <!--弹出层底部按钮-->
                    <risk-foot
                            :formData="formData"
                            :dialogData="dialogData"
                            @closeDialogContent="closeDialogContent"
                            @messageChange="messageChange"
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
    import riskSchedule from './riskFeedComponents/riskSchedule'
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
                formData: {},
                dialogHeaderData: {},
                dialogMiddleData: {},
                dialogInstructionData: {},
                dialogScheduleData: {}
            }
        },
        created() {
            this.getDialogHeaderData();
            this.getDialogMiddleData();
            this.getDialogInstructionData();
            this.getDialogScheduleData();
        },
        mounted() {
        },
        watch: {},
        methods: {
            closeDialogContent() {
                this.$emit('closeDialogContent1')
            },
            /**
             * 获取弹窗界面头部数据
             */
            getDialogHeaderData() {
                let data = this.dialogData,
                    headerData = data.contentHeader;
                this.dialogHeaderData = headerData;
            },
            /**
             * 获取弹窗中间的内容
             */
            getDialogMiddleData() {
                let data = this.dialogData,
                    middleData = data.contentMiddle;
                this.dialogMiddleData = middleData;
            },
            /**
             * 获取领带批示数据
             */
            getDialogInstructionData() {
                let data = this.dialogData,
                    footData = data.contentFoot;
                this.dialogInstructionData = footData;
            },
            /**
             * 获取追踪进度的相关数据
             */
            getDialogScheduleData() {
                let data = this.dialogData,
                    footData = data.contentFoot;
                this.dialogScheduleData = footData;
            },
            /**
             * 上一条下一条
             * @param flag
             */
            messageChange(flag){

                //$message 可传入的type的值
                //'success' | 'warning' | 'info' | 'error'
                if(flag === 'up'){
                    this.$message({
                        message:'切换上一条成功',
                        type:"success"
                    });
                }else if(flag === 'down'){
                    this.$message({
                        message:'切换下一条成功',
                        type:"success"
                    });
                }

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