<template>
    <div>
        <div v-if="companyTips">
            <p v-html="titleContent"></p>
        </div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div>
                        <groupGaugePublic :chartData.sync="pComponentData.gaugeConfig"></groupGaugePublic>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div>
                        <groupLine :chartData.sync="pComponentData.lineConfig"></groupLine>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <div>
                        <singleTable :tableData.sync="pComponentData.allData" :columns.sync="columns"></singleTable>
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
            pComponentData:Object
        },
        data() {
            return {
                tableData:[],
                columns:[
                    {
                        id:"wd",
                        text:"维度",
                        align:'center'
                    },
                    {
                        id:"m1",
                        text:"一月",
                        align:'right'
                    },
                    {
                        id:"m2",
                        text:"二月",
                        align:'right'
                    },
                    {
                        id:"m3",
                        text:"三月",
                        align:'right'
                    },
                    {
                        id:"m4",
                        text:"四月",
                        align:'right'
                    },
                    {
                        id:"m5",
                        text:"五月",
                        align:'right'
                    },
                    {
                        id:"m6",
                        text:"六月",
                        align:'right'
                    },
                    {
                        id:"m7",
                        text:"七月",
                        align:'right'
                    },
                    {
                        id:"m8",
                        text:"八月",
                        align:'right'
                    },
                    {
                        id:"m9",
                        text:"九月",
                        align:'right'
                    },
                    {
                        id:"m10",
                        text:"十月",
                        align:'right'
                    },
                    {
                        id:"m11",
                        text:"十一月",
                        align:'right'
                    },
                    {
                        id:"m12",
                        text:"十二月",
                        align:'right'
                    }
                ],
                gaugeChartData:{},
                lineChartData:{},
                companyTips:false,//公司提示的title内容
                titleContent:""
            }
        },
        created() {
            let me = this;
        },
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