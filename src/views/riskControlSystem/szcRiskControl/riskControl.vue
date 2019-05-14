<template>
    <div>
        <div>
            <el-tabs>
                <el-tab-pane label="风险批示">
                    <div class="selectClass">
                        <RiskSelect/>
                    </div>
                    <div>
                        <stable :tableData.sync="tableData" :columns.sync="columns"></stable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="汇总批示">
                    <div>
                        <treeTable :data.sync="treeData" :columns.sync="columns"></treeTable>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div></div>
    </div>
</template>
<script>

import stable from "@v/riskControlSystem/publicRiskControl/table/table";
import RiskSelect from "./riskSelect";
import treeTable from "./../publicRiskControl/treeTable/index"


export default {

    name: "riskControl",
    components:{
        stable,
        RiskSelect,
        treeTable
    },
    data() {
        return {
            tableData:[],
            columns:[],
            treeData:[]
        }
    },
    /**
     * 组件生成的回调。
     */
    created() {
        debugger;
        //请求table的数据。
        let me = this;
        this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/riskTable.json").then(res => {
            debugger;
            if(res.data.code == 200) {
                me.tableData = res.data.rows;
                me.treeData = res.data.rows;
                me.columns = res.data.columns
            }
        });
    },
    /**
     * 页面渲染之后的回调。
     */
    mounted () {},
    methods: {}
};
</script>
<style scope>
    .selectClass {
        margin-bottom: 10px;
    }
</style>