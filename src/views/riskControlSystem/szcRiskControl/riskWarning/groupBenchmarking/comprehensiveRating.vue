<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugesLeft" :key="index">
                        <groupGauge :chartData.sync="chartDataLeft"></groupGauge>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <groupRadar></groupRadar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugesRight" :key="index">
                        <groupGauge :chartData.sync="chartDataRight"></groupGauge>
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
    import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    export default {
        name: "treeTableDemo",
        components: {
            groupGauge,
            groupRadar,
            singleTable
        },
        data() {
            return {
                gaugesLeft:['1','2'],
                gaugesRight:['3','4'],
                tableData:[],
                columns:[],
                chartDataLeft:{},
                chartDataRight:{}
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        mounted() {
        },
        methods: {}
    };
</script>
<style>

</style>