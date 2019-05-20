<template>
    <div>
        <div v-if="scheduleData.title" class="schedule-title">
            {{ scheduleData.title }}
        </div>
        <div v-for="(item,index) in scheduleData.content" :key="index" class="schedule-list">
            <div :key="index" class="risk-content">
                <div class="risk-num">
                    {{ item.schedule }}
                </div>
                <div class="risk-name">
                    <span class="title-left">名称 :</span>
                    <span class="content-right">{{ item.text }}</span>
                </div>
                <div class="risk-state">
                    <span class="title-left">状态 :</span>
                    <span class="content-right">{{ item.state }}</span>
                </div>
                <div class="risk-content">
                    <span class="title-left">内容 :</span>
                    <span class="content-right">{{ item.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportSchedule",
        components: {},
        props: {
            scheduleData:Object
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
    .schedule-title, .risk-num, .title-left {
        font-family: '微软雅黑 Bold', '微软雅黑';
        font-weight: 700;
        font-size: 16px;
    }

    .risk-name, .risk-state, .risk-content {
        margin-top: 20px;
    }

    .schedule-title {
        margin-top: 20px;
    }

    .risk-num {
        margin-top: 26px;
    }

    .title-left {
        margin-left: 10px;
    }
    .content-right {
        margin-left: 10px;
    }
    .risk-state .content-right{
        color: white;
        background: red;
        padding: 0 12px;
        border-radius: 10px;
    }

</style>