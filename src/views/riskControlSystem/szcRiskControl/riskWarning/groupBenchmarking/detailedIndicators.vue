<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div>
                        <groupGaugePublic :chartData.sync="detailedData.gaugeConfig"></groupGaugePublic>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div>
                        <groupLine :chartData.sync="detailedData.lineConfig"></groupLine>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <div>
                        <singleTable :tableData.sync="detailedData.allData" :columns.sync="columns"></singleTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

    import groupGaugePublic from "./../echarts/groupGaugePublic.vue"
    import groupLine from "./../echarts/groupLine.vue"
    import singleTable from "./../riskTable/riskTable.vue"
    export default {
        name: "debtRisk",
        components: {
            singleTable,
            groupGaugePublic,
            groupLine
        },
        props:{
            detailedData:Object
        },
        data() {
            return {
                tableData:[],
                columns:[
                    {
                        id:"wd",
                        text:"维度"
                    },
                    {
                        id:"m1",
                        text:"一月"
                    },
                    {
                        id:"m2",
                        text:"二月"
                    },
                    {
                        id:"m3",
                        text:"三月"
                    },
                    {
                        id:"m4",
                        text:"四月"
                    },
                    {
                        id:"m5",
                        text:"五月"
                    },
                    {
                        id:"m6",
                        text:"六月"
                    },
                    {
                        id:"m7",
                        text:"七月"
                    },
                    {
                        id:"m8",
                        text:"八月"
                    },
                    {
                        id:"m9",
                        text:"九月"
                    },
                    {
                        id:"m10",
                        text:"十月"
                    },
                    {
                        id:"m11",
                        text:"十一月"
                    },
                    {
                        id:"m12",
                        text:"十二月"
                    }
                ],
                gaugeChartData:{},
                lineChartData:{}
            }
        },
        created() {},
        mounted() {},
        methods: {
            /**
             * 获取日期。
             */
            getPeriod () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,
                    month = storeParams.month,period = "";
                if(month > 9){
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                return period;
            }
        }
    };
</script>
<style>

</style>