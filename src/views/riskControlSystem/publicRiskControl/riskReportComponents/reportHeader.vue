<template>
    <div>
        <div class="report-title">
            {{this.company}}{{this.periodStr}}风险预警报告
        </div>
        <span class="zs">
            总述
        </span>
        <p class="describe">
            截止{{ this.periodStr }}份，经风险评估分析，{{this.company}}
            在风险方面共存在{{ this.dataList.data1?this.dataList.data1:0 }}条，
            从风险类型来看，
            其中战略风险{{this.dataList.data2?this.dataList.data2:0}}条，
            投资风险{{this.dataList.data3?this.dataList.data3:0}}条，
            运营风险{{this.dataList.data4?this.dataList.data4:0}}条，
            财务风险{{this.dataList.data5?this.dataList.data5:0}}条，
            法律风险{{this.dataList.data6?this.dataList.data6:0}}条，
            廉洁风险{{this.dataList.data7?this.dataList.data7:0}}条；
            从风险等级来看，
            其中重大风险{{this.dataList.data8?this.dataList.data8:0}}条，
            重要风险{{this.dataList.data9?this.dataList.data9:0}}条，
            一般风险{{this.dataList.data10?this.dataList.data10:0}}条
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
                periodStr:'',
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
                // this.period = this.getPeriod();
                this.periodStr = this.getPeriodStr();
                this.company = this.reportHeaderData['reportCompanyName'];
                this.dataList = this.reportHeaderData['dataList'];
            },
            getPeriod () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,month = storeParams.month,period = "";
                if(month > 9){
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                return period;
            },
            getPeriodStr () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,
                    month = storeParams.month,
                    period = period = year + "年" + month + "月"; 
                return period;
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