<template>
    <div>
        <div>
            <el-row>
                <el-col :span="14">
                    <div>
                        <treeTable border :data.sync="treeData" :columns.sync="columns"></treeTable>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div>
                        <transverseBar :item.sync="chartData"></transverseBar>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import treeTable from "@v/riskControlSystem/publicRiskControl/treeTable/treeTable.vue"
    import transverseBar from "./../echarts/transverseBar.vue"
    export default {
        name: "treeTableDemo",
        components: {
            treeTable,
            transverseBar
        },
        data() {
            return {
                treeData:[],
                columns:[],
                chartData:{}
            }
        },
        created() {
            debugger;
            let me = this;
            me.axios.get('/cnbi/json/source/tjsp/szcJson/risk/insideBenchmarking.json').then(res => {
                if(res.data.code == 200){
                    me.columns = res.data.columns;
                    me.treeData = res.data.rows;
                }
            });
        },
        mounted() {},
        methods: {}
    };
</script>
<style>

</style>