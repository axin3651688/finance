<template>
    <div>
        <el-row>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px;font-size: 14px;color: #606266;font-weight: 700;">风险追踪：</span>
                    <div class="risk-track-content">
                        <div class="schedule-list" v-for="(value, key) of formData" :key="key">
                            <div class="risk-content">
                                <div class="risk-num">
                                    {{value.schedule}}
                                </div>
                                <div class="risk-name">
                                    <span class="title-left">名称 :</span>
                                    <span class="content-right">{{value.text}}</span>
                                </div>
                                <div class="risk-state">
                                    <span class="title-left">状态 :</span>
                                    <span class="content-right">{{value.state}}</span>
                                </div>
                                <div class="risk-content">
                                    <span class="title-left">内容 :</span>
                                    <span class="content-right">{{value.content}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "riskSchedule",
        components: {},
        props: {
            dialogScheduleData: Object,
            dataChanged: Boolean
        },
        data() {
            return {
                formData: {},
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
                let data = this.dialogScheduleData['content'];
                data.forEach((item) => {
                    _this.formData[item.dataType] = {};
                    _this.formData[item.dataType]['schedule'] = item.schedule;
                    _this.formData[item.dataType]['state'] = item.state;
                    _this.formData[item.dataType]['content'] = item.content;
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
        font-weight: 400;
    }

    .risk-num, .title-left {
        font-family: '微软雅黑 Bold', '微软雅黑';
        font-weight: 400;
        font-size: 14px;
    }

    .risk-name, .risk-state, .risk-content {
        margin-top: 20px;
    }

    .risk-num {
        margin-top: 0;
    }

    .title-left {
        margin-left: 10px;
    }

    .content-right {
        margin-left: 10px;
    }

    .risk-state .content-right {
        color: white;
        background: red;
        padding: 0 12px;
        border-radius: 10px;
    }

    .risk-track-content {
        border: 1px solid #dcdfe6;
        width: 100%;
        padding: 0 0 12px 12px;
        border-radius: 4px;
    }
</style>