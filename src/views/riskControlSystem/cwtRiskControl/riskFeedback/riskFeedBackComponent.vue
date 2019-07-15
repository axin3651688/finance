<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>

            <div class="form-content">
                <el-form :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="6">
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 100px">风险类型：</span>
                                <el-input
                                        v-model="dialogHeaderData[0].text"
                                        :disabled="dialogHeaderData[0].disableEdit"
                                        style="color: white"
                                        class="el-input-text"
                                        placeholder="风险类型"
                                >
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险发生概率：</span>
                                <el-input
                                        v-model="dialogHeaderData[1].text"
                                        :disabled="dialogHeaderData[1].disableEdit"
                                        class="el-input-text"
                                        placeholder="风险发生概率"

                                >
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="top-form-contents">
                                <span style="min-width: 98px;width: 150px">风险影响程度：</span>
                                <el-input
                                        v-model="dialogHeaderData[2].text"
                                        :disabled="dialogHeaderData[2].disableEdit"
                                        class="el-input-text"
                                        placeholder="风险影响程度"
                                >
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="4" style="padding-right: 0">
                            <div class="top-form-contents" style="height: 40px;justify-content: space-around;" >
                                <span style="min-width: 70px;width: 70px">风险等级：</span>
                                <div class="risk-level" :style="{background: this.dialogData['riskcolor']}">
                                    <span >{{dialogHeaderData[3].text}}</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">风险概述：</span>
                                <el-input
                                        v-model="dialogMiddleData[0].text"
                                        :disabled="dialogMiddleData[0].disableEdit"
                                        type="textarea"
                                        :rows="4"
                                        class="el-input-text"
                                >
                                </el-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">采取措施：</span>
                                <el-input
                                        v-model="dialogMiddleData[0].text"
                                        :disabled="dialogMiddleData[0].disableEdit"
                                        type="textarea"
                                        :rows="4"
                                        class="el-input-text"

                                >
                                </el-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">应对建议：</span>
                                <el-input
                                        v-model="dialogMiddleData[0].text"
                                        :disabled="dialogMiddleData[0].disableEdit"
                                        type="textarea"
                                        :rows="4"
                                        class="el-input-text"
                                >
                                </el-input>
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
                                        <el-input
                                                v-model="dialogInstructionData[0].text"
                                                :disabled="dialogInstructionData[0].disableEdit"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="top-form-contents">
                                    <span style="min-width: 70px;width: 70px"></span>
                                    <el-input
                                            v-model="dialogInstructionData[1].text"
                                            :disabled="dialogInstructionData[1].disableEdit"
                                            type="textarea"
                                            :rows="3"
                                    >
                                    </el-input>
                                </div>
                            </el-col>

                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <div class="top-form-contents">
                                <span style="min-width: 70px;width: 70px">风险反馈：</span>
                                <el-input
                                        v-model="dialogInstructionData[2].text"
                                        :disabled="dialogInstructionData[2].disableEdit"
                                        type="textarea"
                                        :rows="4"
                                        ref="riskFeedData"
                                        placeholder="针对风险进行相关反馈录入"
                                >
                                </el-input>
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
                                <div class="form-foot-right" v-if="!riskFeedSuccess">
                                    <el-form-item>
                                        <el-checkbox
                                                label="指定反馈人员"
                                                name="type"
                                                ref="checkBox"
                                                :disabled="riskFeedSuccess"
                                                class="form-foot-right-check"
                                                id="form-foot-right-check"
                                                @change="handleCheckedChange"
                                        ></el-checkbox>
                                        <!--:disabled="dialogState !== 'fk'"-->
                                        <el-button type="primary" @click="riskSend">反馈上报</el-button>
                                    </el-form-item>
                                </div>

                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </div>


        <show-personnel-list
                :personnelListShow="personnelListShow"
                :dataChanged="dataChanged"
                :defaultData="dialogData.stouser"
                @personSureBtnClicked="personSureBtnClicked"

        >
        </show-personnel-list>


    </div>
</template>

<script>
    import showPersonnelList from '../../publicRiskControl/showPersonnelList'
    import {riskFeedControl} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"

    export default {
        name: "riskFeedBackComponent",
        mixins: [cwtPublicJS],
        components: {
            showPersonnelList
        },
        props: {
            dialogData: Object,
            dataChanged: Boolean
        },
        watch: {
            dataChanged() {
                this.getDialogHeaderData();
                this.getDialogMiddleData();
                this.getDialogInstructionData();
            }
        },
        data() {
            return {
                personnelListShow: false,
                dialogHeaderData: [],
                dialogMiddleData: [],
                dialogInstructionData: [],
                riskFeedSuccess: false
            }
        },
        created() {
            this.getDialogHeaderData();
            this.getDialogMiddleData();
            this.getDialogInstructionData();
        },
        mounted() {
        },
        methods: {
            /**
             * 查看上一条信息
             */
            lastMessage() {
                let rowIndex = this.dialogData['rownum'];
                let obj = {
                    flag: 'up',
                    rowIndex: rowIndex
                };
                this.$emit("dataMessageChange", obj)
            },
            /**
             * 查看下一条信息
             */
            nextMessage() {
                let rowIndex = this.dialogData['rownum'];
                let obj = {
                    flag: 'down',
                    rowIndex: rowIndex
                };
                this.$emit("dataMessageChange", obj)
            },

            /**
             * 指定反馈人员选中监听
             */
            handleCheckedChange() {
                this.personnelListShow = !this.personnelListShow;
            },
            /**
             * 获取弹窗界面头部数据
             */
            getDialogHeaderData() {
                debugger;
                let data = this.dialogData;
                this.dialogHeaderData = data.contentHeader.content;
            },
            /**
             * 获取弹窗中间的内容
             */
            getDialogMiddleData() {

                let data = this.dialogData;
                this.dialogMiddleData = data.contentMiddle.content;
            },
            /**
             * 获取领带批示数据
             */
            getDialogInstructionData() {
                let data = this.dialogData;
                this.dialogInstructionData = data.contentFoot.content;


                this.riskFeedSuccess = this.dialogData['isFeeded'];

            },

            /**
             * 人员列表中确定按钮点击事件
             */
            personSureBtnClicked(nodes, defaultUser) {
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
                } else {
                    userStr = defaultUser;
                }


                // setTimeout(function () {
                let _riskInstructionData = this.$refs.riskFeedData.value;
                let params = {
                    riskReportStateDtos: [
                        {
                            company: company,
                            period: _this.getPeriod(),
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

                        _this.personnelListShow = false;

                        _this.$message({
                            message: "反馈成功。",
                            type: "success"
                        });
                    } else if (res.data.code === '0') {
                        _this.$message({
                            message: res.data.msg
                        });
                    } else {
                        _this.$message({
                            message: "反馈失败！请联系开发人员"
                        })
                    }
                });
                // }, 500)
            },


            /**
             * 默认反馈事件
             */
            riskSend() {


                // let _isFeeded = this.dialogData['isFeeded'];
                let _isFeeded = this.riskFeedSuccess;
                if (_isFeeded) {
                    this.$message({
                        message: '请勿重复反馈'
                    });
                    return;
                }
                let _dialogData = this.dialogData;
                let _stouser = _dialogData.stouser;
                this.personSureBtnClicked(null, _stouser);

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

    .risk-level {
        min-width: 40px;
        border: 1px solid black;
        border-radius: 10px;
        text-align: center;
        /*background: red;*/
        padding: 5px 10px;
    }

    .el-input-text input {
        color: #606266 !important;
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

    .el-input-text textarea {
        color: #606266 !important;
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
</style>