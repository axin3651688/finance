<template>
    <div>
        <div>
            <el-row>
                <el-col v-for="(item,index) in gaugeTop" :key="index" :span="8">
                    <div>
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeMiddleLeft" :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <groupRadar :chartData.sync="chartDataRadar"></groupRadar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeMiddleRight" :key="index">
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
                <el-col :span="24">
                    <div v-if="ManyTableData && ManyTableData.length > 0" style="margin:20px 0px;">
                        <!-- <singleTable :tableData.sync="tableData" :columns.sync="columns"></singleTable> -->
                        <threeHeaderTable :tableData.sync="ManyTableData" :columns.sync="manyColumns" :allData.sync="resData"></threeHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    import groupGaugePublic from "./../echarts/groupGaugePublic.vue"
    import singleTable from "./../riskTable/riskTable.vue"
    import threeHeaderTable from "./../riskTable/threeHeaderTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    import publicMarking from "./../minix/publicMarking.js"
    export default {
        mixins:[publicMarking],
        name: "treeTableDemo",
        components: {
            groupGauge,
            singleTable,
            groupRadar,
            groupGaugePublic,
            threeHeaderTable
        },
        data() {
            return {
                gaugeTop:[{},{},{}],
                gaugeMiddleLeft:[{},{}],
                gaugeMiddleRight:[{},{}],
                chartDataRadar:{
                    receive:{}
                },
                tableData:[],
                columns:[],
                ManyTableData:[],//多表头数据
                manyColumns:[],//多表头列配置
                resData:{}
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/profitability.json";
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    debugger;
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns;
                    me.manyColumns = res.data.manyColumns;
                    me.ManyTableData = res.data.manyRows;
                    me.resData = res.data;
                    let judgeParams = {
                        id:"profitability",
                        text:"盈利能力",
                        sqlId:"107"
                    };
                    me.queryDataPublic(judgeParams);
                    
                    // me.createEcharts();
                }
            });
        },
        mounted() {},
        methods: {
            /**
             * 制造echart图形。
             * @author szc 2019年6月10日11:08:45
             */
            createEcharts(){
                let me = this;

            }
        }
    };
</script>
<style>

</style>