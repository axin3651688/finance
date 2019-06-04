<template>
    <div>
        <div>
            <el-row>
                <el-col v-for="(item,index) in gaugeTop" :key="index" :span="item">
                    <div>
                        <groupGauge></groupGauge>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeMiddleLeft" :key="index">
                        <groupGauge></groupGauge>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <groupRadar></groupRadar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugeMiddleRight" :key="index">
                        <groupGauge></groupGauge>
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
    import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    export default {
        name: "treeTableDemo",
        components: {
            groupGauge,
            singleTable,
            groupRadar
        },
        data() {
            return {
                gaugeTop:[8,8,8],
                gaugeMiddleLeft:[8,8],
                gaugeMiddleRight:[8,8],
                tableData:[],
                columns:[]
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
        mounted() {},
        methods: {}
    };
</script>
<style>

</style>