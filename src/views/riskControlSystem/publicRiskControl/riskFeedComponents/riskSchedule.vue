<template>
    <div>
        <el-row>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px;font-size: 14px;color: #606266;font-weight: 700;">风险追踪：</span>
                    <div class="risk-track-content">
                        <div class="schedule-list" v-for="(value, key, index) of formData" :key="key">
                            <div class="risk-content">
                                <div class="risk-num">
                                    {{value.schedule}}
                                </div>
                                <div class="risk-name">
                                    <span class="title-left">{{numberToChineseString(index + 1)}}、名称 :</span>
                                    <span class="content-right">{{value.text}}</span>
                                </div>
                                <div class="risk-state">
                                    <span class="title-left need-more-right">状态 :</span>
                                    <span
                                            class="content-right"
                                            :style="{background:value.state.substr(0,1) === '未' ? 'red' : 'green'}"
                                    >{{value.state}}</span>
                                </div>
                                <div class="risk-content">
                                    <span class="title-left need-more-right">内容 :</span>
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
                formData: {
                    risk_sb: {
                        dataType: 'risk_sb',
                        risk_up_user: '',
                        risk_up_time: '',
                        schedule: '进度一',
                        text: '风险上报',
                        state: '',
                        content: ''
                    },
                    risk_ps: {
                        dataType: 'risk_ps',
                        risk_up_user: '',
                        risk_up_time: '',
                        schedule: '进度二',
                        text: '风险批示',
                        state: '',
                        content: ''
                    },
                    risk_fq: {
                        dataType: 'risk_fq',
                        risk_up_user: '',
                        risk_up_time: '',
                        risk_up_content: '',
                        schedule: '进度三',
                        text: '风险反馈',
                        state: '',
                        content: ''
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
                let data = _this.dialogScheduleData['content'];
                data.forEach((item) => {
                    _this.formData[item.dataType] = {};
                    _this.formData[item.dataType]['schedule'] = item.schedule;
                    _this.formData[item.dataType]['state'] = item.state;
                    _this.formData[item.dataType]['content'] = item.content;
                    _this.formData[item.dataType]['text'] = item.text;

                    _this.formData[item.dataType]['dataType'] = item.dataType;
                    _this.formData[item.dataType]['risk_up_time'] = item.risk_up_time;
                    _this.formData[item.dataType]['risk_up_user'] = item.risk_up_user;
                    _this.formData[item.dataType]['risk_up_content'] = item.risk_up_content;
                });
                let risk_sb = _this.formData['risk_sb'],
                    risk_ps = _this.formData['risk_ps'],
                    risk_fq = _this.formData['risk_fq'];

                if (risk_sb.state === '未上报') {
                    risk_sb.content = '请尽快上报';
                } else {
                    //上报人：小智。上报时间：2019年3月
                    risk_sb.content = '上报人：' + risk_sb.risk_up_user + "。   上报时间：" + risk_sb.risk_up_time;
                }

                if (risk_ps.state === '未批示') {
                    risk_ps.content = '请尽快批示';
                } else {
                    risk_ps.content = '批示内容：' + risk_ps.risk_up_content + '。  批示人：' + risk_ps.risk_up_user + "。   批示时间：" + risk_ps.risk_up_time;
                }

                if (risk_fq.state === '未反馈') {
                    risk_fq.content = '请尽快反馈';
                } else {
                    risk_fq.content = '反馈内容：' + risk_fq.risk_up_content + '。   反馈人：' + risk_fq.risk_up_user + "。   反馈时间：" + risk_fq.risk_up_time;
                }
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
        font-family: '微软雅黑';
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
        /*background: red;*/
        padding: 0 12px;
        border-radius: 10px;
    }

    .risk-track-content {
        border: 1px solid #dcdfe6;
        width: 100%;
        padding: 0 0 12px 12px;
        border-radius: 4px;
    }
    .need-more-right{
        margin-left: 40px;
    }
</style>