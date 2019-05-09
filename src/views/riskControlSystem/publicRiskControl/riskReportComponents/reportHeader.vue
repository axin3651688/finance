<template>
    <div>
        <div class="report-title">
            {{this.reportCompanyNameShow}}{{this.period}}风险预警报告
        </div>
        <span class="zs">
            总述
        </span>
        <p class="describe">
            截止2019年3月份，经风险评估分析，天津食品集团有限公司(合并)在风险方面共存在**条，从风险类型来看，其中战略风险**条，投资风险**条，运营风险**条，
            财务风险**条，法律风险**条，廉洁风险**条；从风险等级来看，其中重大风险**条，重要风险**条，一般风险**条
        </p>
    </div>
</template>

<script>
    export default {
        name: "reportHeader",
        components: {},
        props: {
            reportCompanyNameShow: String
        },
        data() {
            return {
                period: '2019年3月',
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
    .report-title {
        padding: 20px;
        text-align: center;
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        font-size: 20px;
    }

    .zs {
        font-size: 24px;
        text-align: left;
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        color: #000000;
    }

    .describe {
        margin-top: 10px;
        line-height: 50px;
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        text-align: left;
        margin-bottom: 20px;
    }
</style>