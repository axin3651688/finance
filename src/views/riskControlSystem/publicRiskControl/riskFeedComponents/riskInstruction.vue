<template>
    <div>
        <el-row>
            <el-col>
                <el-col>
                    <div class="top-form-contents">
                        <span style="min-width: 70px;width: 70px">领导批示：</span>
                        <div class="top-form-contents" style="margin-bottom: 0">
                            <span style="min-width: 98px;width: 150px;font-weight: 200;">风险应对策略：</span>
                            <el-input
                                    v-model="formData['countermeasures'].text"
                                    :disabled="formData['countermeasures'].disableEdit"
                            >
                            </el-input>
                        </div>
                    </div>
                </el-col>

                <el-col>
                    <div class="top-form-contents">
                        <span style="min-width: 70px;width: 70px"></span>
                        <el-input
                                type="textarea"
                                :rows="3"
                                v-model="formData['instruction'].text"
                                :disabled="formData['instruction'].disableEdit"
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
                            type="textarea"
                            :rows="4"
                            ref="riskFeedData"
                            v-model="formData['riskfeed'].text"
                            :disabled="riskFeedDisableEdit"
                            placeholder="针对风险进行相关反馈录入"
                    >
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "riskInstruction",
        components: {},
        props: {
            // v-model="formData['riskfeed'].text"
            dialogInstructionData: Object,
            sureBtnClick: Boolean,
            riskFeedSuccess: Boolean,
            dataChanged: Boolean
        },
        data() {
            return {
                formData: {
                    countermeasures: {
                        text: "",
                        disableEdit: null
                    },
                    instruction: {
                        text: "",
                        disableEdit: null
                    },
                    riskfeed: {
                        text: '',
                        disableEdit: null
                    }
                },
                riskFeedDisableEdit:false
            }
        },
        created() {
            this.getFormData();
        },
        mounted() {
        },
        watch: {
            /**
             * 监听确认反馈按钮点击事件
             * @param newValue
             * @param oldValue
             */
            sureBtnClick(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.$emit("sendRiskInstructionData", this.formData['riskfeed'].text)
                }
            },
            /**
             * 监听上一条下一条中的点击事件，刷新数据
             * @param newValue
             * @param oldValue
             */
            dataChanged(newValue, oldValue) {
                this.getFormData();
            },
            /**
             * 监听反馈成功之后的数据处理
             * @param newValue
             * @param oldValue
             */
            riskFeedSuccess(newValue, oldValue){
                if(newValue !== oldValue){
                    this.riskFeedDisableEdit = true;
                }
            }
        },
        methods: {
            getFormData() {
                let _this = this;
                let data = this.dialogInstructionData['content'];
                data.forEach((item) => {
                    _this.formData[item.dataType] = {};
                    _this.formData[item.dataType]['dataType'] = item.dataType;
                    _this.formData[item.dataType]['disableEdit'] = item.disableEdit;
                    _this.formData[item.dataType]['label'] = item.label;
                    _this.formData[item.dataType]['text'] = item.text;
                });
                this.riskFeedDisableEdit = _this.formData['riskfeed'].disableEdit;
            }
        }
    }
</script>

<style scoped>
    /*.risk-reference {*/
    /*display: flex;*/
    /*margin-bottom: 20px;*/
    /*justify-content: flex-end;*/
    /*}*/

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

    /*.form-foot {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*}*/

    /*.form-foot-right-check {*/
    /*margin-right: 10px;*/
    /*}*/
</style>