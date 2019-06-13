<template>
    <div>
        <div class="report-title">
            {{this.company}}{{this.periodStr}}风险预警报告
        </div>
        <span class="zs">
            总述
        </span>
        <template>
            <p v-if="reportHeaderData.headerReport.totalCount > 0" class="describe">
                截止{{ this.periodStr }}份，经风险评估分析，{{this.company}}
                在风险方面共存在{{ reportHeaderData.headerReport.totalCount || 0 }}条，
                从风险类型来看，其中
                <template v-for="(item) in reportHeaderData.headerReport.contentType">
                    {{ item.text }}
                    {{ item.count }} 条，
                </template>
                从风险等级来看，
                <template v-for="(item) in reportHeaderData.headerReport.contentLevel">
                    {{ item.text }}
                    {{ item.count }} 条，
                </template>
            </p>
            <p v-else class="describe">
                <span>暂无报告内容！</span>
            </p>
        </template>
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
                debugger;
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
        line-height: 30px;
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        text-align: left;
        margin-bottom: 20px;
        text-indent: 2em ;
    }
</style>