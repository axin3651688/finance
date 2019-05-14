<template>
    <div>
        <div>
            <el-tabs v-model="activeName"
            @tab-click="handleTabClick">
                <el-tab-pane label="风险批示" name="first">
                    <div class="selectClass">
                        <RiskSelect/>
                    </div>
                    <div>
                        <stable :tableData.sync="tableData" :columns.sync="columns" v-on:changeShowContent="clickItemName"></stable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="汇总批示" name="second">
                    <div v-if="treeTableShow">
                        <treeTable border :data.sync="treeData" :columns.sync="columns" v-on:buttonHandler="buttonHandler"></treeTable>
                    </div>
                    <div v-else>
                        <el-row>
                            <el-col :span="24">
                                <div>
                                    <el-button @click="returnCurrentClick">返回</el-button>
                                </div>
                                <reportContent :reportCompanyName="reportCompanyName"></reportContent>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-dialog
                title="【风险名称】批示"
                :visible.sync="dialogVisible"
                width="56%"
                top="50px">
                <div>
                    <dialogContent></dialogContent>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

import stable from "@v/riskControlSystem/publicRiskControl/table/singleTable";
import RiskSelect from "./riskSelect";
import treeTable from "./../publicRiskControl/treeTable/treeTable"
import reportContent from "../publicRiskControl/reportComponent"
import dialogContent from '../publicRiskControl/dialogComponent'
// import reportContent from "@v/riskControlSystem/publicRiskControl/riskReportComponents/reportConventional"


export default {

    name: "riskControl",
    components:{
        stable,
        RiskSelect,
        treeTable,
        reportContent,
        dialogContent
    },
    data() {
        return {
            tableData:[],
            columns:[],
            treeData:[],
            activeName:"second",
            treeTableShow:true,
            reportCompanyName:"天津食品有限公司",
            dialogVisible:false
        }
    },
    /**
     * 组件生成的回调。
     */
    created() {
        debugger;
        //请求table的数据。
        let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
        if(me.activeName == "second"){
            url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
        }
        this.axios.get(url).then(res => {
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
    methods: {
        /**
         * 处理tab切换点击事件。
         * @author szc 2019年5月14日14:55:16
         */
        handleTabClick (tab, event) {
            debugger;
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            if(tab.name == "second"){
                url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
            }
            this.axios.get(url).then(res => {
                debugger;
                if(res.data.code == 200) {
                    if(tab.name == "first"){
                        me.tableData = res.data.rows;
                    }else {
                        me.treeData = res.data.rows;
                    }
                    me.columns = res.data.columns
                }
            });
        },
        /**
         * 按钮的处理。
         * @author szc 2019-5-14 11:56:40
         * 查看
         */
        buttonHandler (scope,btnItem) {
            debugger;
            let me = this;
            if(btnItem){
                let id = btnItem.id;
                if(id == "0"){
                    //批示.
                    me.instructionsState(scope);
                }else if (id == "1") {
                    me.lookInstructions(scope);
                }else if (id == "2") {

                }else if (id == "3") {

                }
            }
        },
        /**
         * 批示状态的改变。
         * @author szc 2019年5月14日13:48:28
         */
        instructionsState (scope) {
            debugger;
            let me = this,$index = scope.$index,scode = scope.row.scode;
            if(scode){
                // me.treeData.forEach();
                me.changeValue(me.treeData,scode);
                debugger;
                console.log("ooooooooooo",me.treeData)
                me.treeData;
            }
        },
        changeValue (treeData,scode) {
            debugger;
            let me = this;
            for(let i = 0; i < treeData.length; i++) {
                let item = treeData[i];
                if(item.scode == scode) {
                    item.status = "已批示";
                    item.operation[0].btnShow = false;
                    break;
                }
                if(i == treeData.length - 1 && item.children){
                    me.changeValue(item.children,scode);
                }
            }
        },
        /**
         * 查看批示的内容
         * @author szc 2019年5月14日14:24:14
         */
        lookInstructions () {
            debugger;
            let me = this;
            me.treeTableShow = false;
        },
        /**
         * 返回当前点击的选择。
         * @author szc 2019年5月14日15:13:52
         */
        returnCurrentClick () {
            debugger;
            let me = this;
            me.treeTableShow = true;
        },
        /**
         * 风险名称项目的点击事件
         * @author szc 2019年5月14日15:26:03
         */
        clickItemName (row) {
            debugger;
            let me = this;
            me.dialogVisible = true;
        }
    }
};
</script>
<style scoped>
    .selectClass {
        margin-bottom: 10px;
    }
    .riskNameContent {
        max-height: 600px;
        overflow: auto;
    }
</style>