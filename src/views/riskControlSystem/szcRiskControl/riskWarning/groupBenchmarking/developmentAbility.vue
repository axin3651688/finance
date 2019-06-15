<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeTopLeft" :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <groupRadar :chartData.sync="chartDataRadar"></groupRadar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeTopRight" :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-for="(item,index) in gaugeMiddle" :key="index" :span="8">
                    <div :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <singleTable :tableData.sync="tableData" :columns.sync="columns"></singleTable>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <div>
                        <singleTable :tableData.sync="tableData" :columns.sync="columns"></singleTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    import groupGaugePublic from "./../echarts/groupGaugePublic.vue"
    import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    import publicMarking from "./../minix/publicMarking.js"
    export default {
        mixins:[publicMarking],
        name: "treeTableDemo",
        components: {
            groupGauge,
            singleTable,
            groupRadar,
            groupGaugePublic
        },
        data() {
            return {
                gaugeTopLeft:[{}],
                radarMiddle:[{}],
                gaugeTopRight:[{}],
                gaugeMiddle:[{},{},{}],
                chartDataRadar:{
                    receive:{}
                },
                // gaugeMiddleLeft:[8,8],
                // gaugeMiddleRight:[8,8],
                tableData:[],
                columns:[]
            }
        },
        created() {
            this.updateData();
            // let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            // this.axios.get(url).then(res => {
            //     if(res.data.code == 200) {
            //         me.tableData = res.data.rows;
            //         me.columns = res.data.columns
            //     }
            // });
        },
        mounted() {},
        methods: {
            updateData(){
                let me = this,storeParams = me.$store.getters,company = storeParams.company,
                    year = storeParams.year,month = storeParams.month;
                if(month > 9){
                    month = month + "";
                }else {
                    month = "0" + month;
                }
                let judgeParams = {
                    id:"development",
                    text:"发展能力",
                    params:{
                        company:company,
                        period:me.getPeriod(),
                        indicator:"'51','50','128','129','132'",
                        fact:'B',
                        year:year,
                        month:month,
                        sqlKey:"RiskWarning.fzhpj"
                    }
                };
                this.queryDataOfBackstage(judgeParams);
            },
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