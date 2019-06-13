<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;" v-if="dialogData['dialogRiskType'] === 'riskBack'">风险矩阵参照</a>
            </div>
            <div class="risk-reference">
                <a style="color: dodgerblue;" v-if="dialogData['dialogRiskType'] === 'riskTrack'">风险可能性参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" class="demo-form-inline">

                    <!--弹出层头部-->
                    <risk-header
                            :dialogHeaderData="dialogHeaderData"
                            :dataChanged="dataChanged"
                    >
                    </risk-header>

                    <!--弹出层中间的三个公共部分-->
                    <risk-conventional
                            :dialogMiddleData="dialogMiddleData"
                            :dataChanged="dataChanged"
                    >
                    </risk-conventional>

                    <!--弹出层关于领导批示的部分-->
                    <risk-instruction
                            v-if="dialogData['dialogRiskType'] === 'riskBack'"
                            :dialogInstructionData="dialogInstructionData"
                            :sureBtnClick="sureBtnClick"
                            :riskFeedSuccess="riskFeedSuccess"
                            :dataChanged="dataChanged"
                            @sendRiskInstructionData="sendRiskInstructionData"
                    >
                    </risk-instruction>

                    <!--弹出层有关风险追踪的进度的部分-->
                    <risk-schedule
                            v-if="dialogData['dialogRiskType'] === 'riskTrack'"
                            :dialogScheduleData="dialogScheduleData"
                            :dataChanged="dataChanged"
                    >
                    </risk-schedule>

                    <!--弹出层底部按钮-->
                    <risk-foot
                            :dialogData="dialogData"
                            :riskFeedSuccess="riskFeedSuccess"
                            :dialogState="dialogState"
                            @closeTrackDialogContent="closeTrackDialogContent"
                            @messageChange="messageChange"
                            @personSureBtnClicked="personSureBtnClicked"
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
    import {riskFeedControl} from '~api/cwtRiskControl/riskControlRequest'

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
            dataChanged: Boolean,
            dialogState: String
        },
        data() {
            return {
                dialogHeaderData: {},
                dialogMiddleData: {},
                dialogInstructionData: {},
                dialogScheduleData: {},
                sureBtnClick: false,
                riskInstructionData: '',

                riskFeedSuccess: false,

                // rislFootControl:true
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
        watch: {
            dataChanged(newValue, oldValue) {
                this.riskFeedSuccess = false;
                this.getDialogHeaderData();
                this.getDialogMiddleData();
                this.getDialogInstructionData();
                this.getDialogScheduleData();
            },




            deep: true
        },
        methods: {
            /**
             * 关闭弹窗按钮点击事件
             */
            closeTrackDialogContent() {
                this.$emit('closeTrackDialogContent')
            },
            /**
             * 获取弹窗界面头部数据
             */
            getDialogHeaderData() {
                let data = this.dialogData;
                this.dialogHeaderData = data.contentHeader;
            },
            /**
             * 获取弹窗中间的内容
             */
            getDialogMiddleData() {
                let data = this.dialogData;
                this.dialogMiddleData = data.contentMiddle;
            },
            /**
             * 获取领带批示数据
             */
            getDialogInstructionData() {
                let data = this.dialogData;
                this.dialogInstructionData = data.contentFoot;
            },
            /**
             * 获取追踪进度的相关数据
             */
            getDialogScheduleData() {
                let data = this.dialogData;
                this.dialogScheduleData = data.contentFoot;
            },
            /**
             * 上一条下一条
             * @param flag
             */
            messageChange(flag) {
                this.$emit("dataMessageChange", flag)
            },
            /**
             * 确认下达处理
             */
            personSureBtnClicked(nodes) {
                this.sureBtnClick = !this.sureBtnClick;
                let _this = this,
                    store = _this.$store.getters,
                    company = store.company,
                    user = store.user.user;

                let arrUser = [],
                    userStr = "";
                if (nodes && nodes.length > 0) {
                    nodes.forEach(item => {
                        arrUser.push(item.id);
                    });
                    userStr = arrUser.join(',');
                }

                setTimeout(function () {
                    let _riskInstructionData = _this.riskInstructionData;

                    let params = {
                        riskReportStateDtos: [
                            {
                                company: company,
                                period: _this.parsePeriod(),
                                sisfeedback: "1",
                                sfeedbacksuser: user.userName,
                                sfeedbackscontent: _riskInstructionData,
                                nrelateid: _this.dialogData['riskid'],

                            },
                        ],
                        users: [
                            userStr
                        ]
                    };

                    riskFeedControl(params).then(res => {
                        if (res.data.code === 200) {
                            _this.riskFeedSuccess = true;

                            _this.$emit("riskFeedSuccess");

                            _this.$message({
                                message: "反馈成功。",
                                type: "success"
                            });
                        } else {
                            _this.$message({
                                message: "反馈失败！请联系开发人员"
                            })
                        }
                    });
                }, 500)

            },

            /**
             * 获取风险反馈内容
             * @param data
             */
            sendRiskInstructionData(data) {
                this.riskInstructionData = data;
            },

            /**
             * 获取当前期间
             * @returns {string|string}
             */
            parsePeriod() {
                let me = this, storeParams = me.$store.getters,
                    year = storeParams.year, month = storeParams.month, period = "";
                if (month > 9) {
                    period = year + "" + month;
                } else {
                    period = year + "0" + month;
                }
                return period;
            },
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