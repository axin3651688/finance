<template>
    <div>
        <div class="report-title">
            {{this.company}}{{this.period}}风险预警报告
        </div>
        <span class="zs">
            总述
        </span>
        <p class="describe">
            截止2019年3月份，经风险评估分析，{{this.company}}在风险方面共存在{{this.dataList.data1}}条，从风险类型来看，
            其中战略风险{{this.dataList.data2}}条，投资风险{{this.dataList.data3}}条，运营风险{{this.dataList.data4}}条，
            财务风险{{this.dataList.data5}}条，法律风险{{this.dataList.data6}}条，廉洁风险{{this.dataList.data7}}条；
            从风险等级来看，其中重大风险{{this.dataList.data8}}条，重要风险{{this.dataList.data9}}条，一般风险{{this.dataList.data10}}条
        </p>
    </div>
</template>

<script>
    export default {
        name: "reportHeader",
        components: {},
        props: {
            reportHeaderData: Object
        },
        data() {
            return {
                period: '2019年3月',
                company:'',
                dataList:{}
            }
        },
        created() {
            this.getAllData()
        },
        mounted() {
        },
        methods: {
            /**
             * 设置当前头部显示的所有数据，包括公司以及具体的风险个数的数据，
             * 期间应该也是获取的，但是还没有写，接口已经完成
             */
            getAllData(){
                this.company = this.reportHeaderData['reportCompanyName'];
                this.dataList = this.reportHeaderData['dataList'];
            }
        }
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