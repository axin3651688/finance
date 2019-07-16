<template>
    <div>
        <el-row :gutter="3">
            <el-col :span="6">
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 100px">风险类型：</span>
                    <el-input
                            v-model="formData['risktype'].text"
                            :disabled="formData['risktype'].disableEdit"
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
                            v-model="formData['riskprobability'].text"
                            :disabled="formData['riskprobability'].disableEdit"
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
                            v-model="formData['riskdegree'].text"
                            :disabled="formData['riskdegree'].disableEdit"
                            class="el-input-text"
                            placeholder="风险影响程度"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4" style="padding-right: 0">
                <div class="top-form-contents" style="height: 40px;justify-content: space-around;">
                    <span style="min-width: 70px;width: 70px">风险等级：</span>
                    <div class="risk-level" :style="{background: this.dialogData['riskcolor']}">
                        <span style="color: #606266">{{this.formData['risklevel'].text}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "riskHeader",
        components: {},
        props: {
            dialogHeaderData: Object,
            dialogData: Object,
            dataChanged: Boolean
        },
        data() {
            return {
                formData: {
                    risktype: {
                        text: "",
                        disableEdit: null
                    },
                    riskprobability: {
                        text: "",
                        disableEdit: null
                    },
                    riskdegree: {
                        text: '',
                        disableEdit: null
                    },
                    risklevel: {
                        text: '',
                        disableEdit: null
                    }
                },
            }
        },
        created() {
            this.getFormData();
        },
        mounted() {
        },
        watch: {
            dataChanged(newValue, oldValue) {
                this.getFormData();
            }
        },
        methods: {
            getFormData() {
                let _this = this;
                let data = this.dialogHeaderData['content'];
                data.forEach((item) => {
                    _this.formData[item.dataType] = {};
                    _this.formData[item.dataType]['dataType'] = item.dataType;
                    _this.formData[item.dataType]['disableEdit'] = item.disableEdit;
                    _this.formData[item.dataType]['label'] = item.label;
                    _this.formData[item.dataType]['text'] = item.text;
                });
            }
        }
    }
</script>

<style>
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
        background: red;
        padding: 5px 10px;
    }

    .el-input-text input {
        color: #606266 !important;
    }

</style>