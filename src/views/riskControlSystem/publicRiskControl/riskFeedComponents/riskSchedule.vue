<template>
    <div>
        <el-row>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px;font-size: 14px;color: #606266;font-weight: 700;">风险追踪：</span>
                    <div class="risk-track-content">
                        <div class="schedule-list" v-for="(value, key) of scheduleList" :key="key">
                            <div class="risk-content">
                                <div class="risk-num">
                                    {{value.risk_count}}
                                </div>
                                <div class="risk-name">
                                    <span class="title-left">名称 :</span>
                                    <span class="content-right">{{value.risk_name}}</span>
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
            formData: Object
        },
        data() {
            return {
                scheduleList: {
                    risk_sb: {
                        risk_count: '进度一',
                        risk_name: '风险上报',
                        user_name: '',
                        time: '',
                        state: '未上报',
                        content: '请将风险尽快上报'
                    },
                    risk_ps: {
                        risk_count: '进度二',
                        risk_name: '风险批示',
                        user_name: '',
                        time: '2019年3月',
                        state: '已批示',
                        content: '领导批示的内容。批示人：小智。批示时间：2019年3月'
                    },
                    risk_fq: {
                        risk_count: '进度三',
                        risk_name: '风险反馈',
                        user_name: '',
                        time: '2019年3月',
                        state: '已反馈',
                        content: '反馈内容。反馈人：小智。反馈时间：2019年3月'
                    }
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {}
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