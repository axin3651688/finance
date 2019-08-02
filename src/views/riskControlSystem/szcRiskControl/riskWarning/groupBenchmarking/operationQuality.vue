<template>
    <div>
        <div v-if="companyTips">
            <p v-html="titleContent"></p>
        </div>
        <div v-if="mainContent">
            <el-row>
                <el-col :span="6">
                    <div v-for="(item,index) in gaugeLeft" :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="opera_radar">
                        <groupRadar :chartData.sync="chartDataRadar" style="height:80%;"></groupRadar>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div v-for="(item,index) in gaugeRight" :key="index">
                        <groupGaugePublic :chartData.sync="item"></groupGaugePublic>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div v-if="tableData && tableData.length > 0">
                        <singleTable :tableData.sync="tableData" :columns.sync="columns" v-on:clickItemName="clickItemName"></singleTable>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div v-if="ManyTableData && ManyTableData.length > 0" style="margin:20px 0px;">
                        <threeHeaderTable :tableData.sync="ManyTableData" :columns.sync="manyColumns" :allData.sync="resData"></threeHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- <div v-if="detailedIndicator">
            <div>
                <el-button @click="returnMainContent">返回</el-button>
            </div>
            <div>
                <detailedIndicator :detailedData.sync="drillContent"></detailedIndicator>
            </div>
        </div> -->
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    import groupGaugePublic from "./../echarts/groupGaugePublic.vue"
    import singleTable from "./../riskTable/riskTable.vue"
    import threeHeaderTable from "./../riskTable/threeHeaderTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    import publicMarking from "./../minix/publicMarking.js"
    import detailedIndicator from "./detailedIndicators"
    export default {
        mixins:[publicMarking],
        name: "treeTableDemo",
        components: {
            groupGauge,
            singleTable,
            groupRadar,
            groupGaugePublic,
            threeHeaderTable,
            detailedIndicator
        },
        props:{
            pComponentData:Object
        },
        data() {
            return {
                gaugeLeft:[{}],
                gaugeRight:[{}],
                chartDataRadar:{
                    receive:{}
                },
                tableData:[],
                columns:[],
                ManyTableData:[],//多表头数据
                manyColumns:[],//多表头列配置
                resData:{},
                detailedIndicator:false,
                mainContent:true,
                drillContent:{},
                companyTips:false,//公司提示的title内容
                titleContent:""
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/operationQuality.json";
            let row;
            if(me.pComponentData){
                row = me.pComponentData;
            }
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns;
                    me.manyColumns = res.data.manyColumns;
                    me.ManyTableData = res.data.manyRows;
                    me.resData = res.data;
                    let judgeParams = {
                        id:"development",
                        text:"发展能力",
                        sqlId:"107"
                    };
                    // me.queryDataPublic(judgeParams);
                    if(row){
                        me.titleContent = row.sname + ";" + "所属行业：农、林、牧、渔业;期间：（" + me.getPeriod() + "）;";
                        me.companyTips = true;
                        // judgeParams.row = row;
                    }
                    me.updateData(row);
                    
                    // me.createEcharts();
                }
            });
            // this.updateData();
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
            updateData(row){
                let me = this,storeParams = me.$store.getters,company = storeParams.company,
                    year = storeParams.year,month = storeParams.month;
                if(month > 9){
                    month = month + "";
                }else {
                    month = "0" + month;
                }
                let judgeParams = {
                    id:"operationQuality",
                    text:"运营质量",
                    params:{
                        company:row? row.scode:company,
                        period:me.getPeriod(),
                        indicator:"'52','122','31','123','124','131'",
                        fact:'B',
                        type:'yyzl',
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
            },
            /**
             * 名称点击的钻取。
             */
            clickItemName (scope, index, row) {
                let me = this,storeParams = me.$store.getters,company = storeParams.company,
                    year = storeParams.year,month = storeParams.month;
                if(month > 9){
                    month = month + "";
                }else {
                    month = "0" + month;
                }
                let judgeParams = {
                    id:"ylnl_xz",
                    text:"盈利能力单指标下钻",
                    row:scope.row,
                    params:{
                        company:me.pComponentData? me.pComponentData.scode:company,
                        period:me.getPeriod(),
                        indicator:scope.row.scode,
                        fact:'B',
                        year:year,
                        month:month,
                        sqlKey:"RiskWarning.nldzb_xz"
                    }
                };
                this.queryDataOfBackstage(judgeParams);
                let showDims = this.showDims;
                if(showDims){
                    this.ShowDims({
                        company:false,
                        year:false,
                        month:false,
                        day:false,
                        conversion:false
                    });
                }
                // me.detailedIndicator = true;
                // me.mainContent = false;
            },
            /**
             * 返回上一级。
             */
            returnMainContent () {
                let me = this;
                me.updateData();
                me.detailedIndicator = false;
                me.mainContent = true;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .opera_radar {
        // margin-top: 40%;
        height: 800px;
    }
</style>