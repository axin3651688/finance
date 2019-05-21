<template>
    <div>
        <el-row>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">风险概述：</span>
                    <el-input
                            type="textarea"
                            :rows="4"
                            v-model="formData.riskOverview.text"
                            :disabled="formData.riskOverview.disableEdit"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">采取措施：</span>
                    <el-input
                            type="textarea"
                            :rows="4"
                            v-model="formData.riskMeasure.text"
                            :disabled="formData.riskMeasure.disableEdit"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">应对建议：</span>
                    <el-input
                            type="textarea"
                            :rows="4"
                            v-model="formData.riskSuggest.text"
                            :disabled="formData.riskSuggest.disableEdit"
                    >
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "riskConventional",
        components: {},
        props: {
            dialogMiddleData: Object
        },
        data() {
            return {
                formData:{}
            }
        },
        created() {
            this.getFormData();
        },
        mounted() {
        },
        methods: {
            getFormData() {
                let _this = this;
                let data = this.dialogMiddleData['content'];
                data.forEach((item) => {
                    _this.formData[item.dataType] = {};
                    _this.formData[item.dataType]['riskOverview'] = item.dataType;
                    _this.formData[item.dataType]['disableEdit'] = item.disableEdit;
                    _this.formData[item.dataType]['label'] = item.label;
                    _this.formData[item.dataType]['text'] = item.text;
                });
            }
        }
    }
</script>

<style scoped>
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
</style>