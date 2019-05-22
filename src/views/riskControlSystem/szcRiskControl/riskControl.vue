<template>
    <div>
        <div>
            <el-tabs v-model="activeName"
            @tab-click="handleTabClick">
                <el-tab-pane label="风险批示" name="first">
                    <div class="selectClass">
                        <RiskSelect v-on:changeOption="changeOption" :selectConfig.sync="selectConfig" />
                    </div>
                    <div>
                        <stable :tableData.sync="tableData" :columns.sync="columns" v-on:clickItemName="clickItemName"></stable>
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
                                <reportContent :reportData="reportData"></reportContent>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-dialog
                title="关于【风险名称】的批示"
                :visible.sync="dialogVisible"
                width="70%"
                top="50px">
                <div>
                    <!-- <dialogContent :dialogData="dialogData"></dialogContent> -->
                    <basicsModal :formConfig.sync="modalData" v-on:changMessage="changMessage"/>
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
// import dialogContent from '../publicRiskControl/dialogComponent'
import dialogContent from '../publicRiskControl/dialogComponentS'
import basicsModal from "./dialogModal/basicsModal"
import deptSelect from "./mixin/deptSelectHandler"
// import reportContent from "@v/riskControlSystem/publicRiskControl/riskReportComponents/reportConventional"
import {
    queryInstructions,
    queryCopingStrategies
} from "~api/szcRiskControl/riskControl"
import { findThirdPartData } from "~api/interface"
import { mapGetters } from "vuex";

export default {
    mixins: [deptSelect],
    name: "riskControl",
    components:{
        stable,
        RiskSelect,
        treeTable,
        reportContent,
        dialogContent,
        basicsModal
    },
    data() {
        return {
            tableData:[],
            columns:[],
            treeData:[],
            activeName:"second",
            treeTableShow:true,
            reportCompanyName:"天津食品有限公司",
            dialogVisible:false,
            dialogData:{
                dialogRiskType:"riskBack"
            },
            modalData:{},
            reportData:{//报告的数据
                reportCompanyName:"天津食品"
            },
            selectConfig:{
                id:"101",
                text:"",
                options:[]
            }//下拉框的内容配置
        }
    },
    /**
     * 计算属性。
     */
    computed: {
        ...mapGetters(["year", "month", "company"])
    },
    /**
     * 监听属性。
     */
    watch: {
        /**
         * 监听公司
         */
        company (newValue,oldValue) {
            this.updateView();
        },
        year (newValue,oldValue) {
            this.updateView();
        },
        month (newValue,oldValue) {
            this.updateView();
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
        //查询部门。
        // me.queryDepartMent()
    },
    /**
     * 页面渲染之后的回调。
     */
    mounted () {},
    methods: {
        /**
         * 更新视图。
         * @author szc 2019年5月21日19:37:42
         */
        updateView () {
            debugger;
            let me = this,selectItem = me.selectItem;
            me.queryDataOfInstructions(selectItem);
        },
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
                        // me.tableData = res.data.rows;
                        let selectItem = "";
                        if(me.selectItem){
                            selectItem = me.selectItem;
                        }
                        me.queryDepartMent();
                        me.queryDataOfInstructions(selectItem);
                    }else {
                        me.treeData = res.data.rows;
                    }
                    me.columns = res.data.columns
                }
            });
        },
        /**
         * 查询风险管控的数据。
         * @author szc 2019年5月21日11:32:47
         */
        queryDataOfInstructions (item) {
            debugger;
            let me =this,storeParams = me.$store.getters,company = storeParams.company,year = storeParams.year,
                month = storeParams.month,period = "";
            if(month > 9) {
                period = year + "" + month;
            }else {
                period = year + "0" + month;
            }
            let params = {
                company:company,
                year:year,
                month:month,
                period:period,
                departId:item? item:"",
                sql:""
            };
            me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                if(res.data.code == 200){
                    debugger;
                    params = me.paramsOfSql(params,res.data.sqlList);
                    findThirdPartData(params).then(res => {
                        debugger;
                        if(res.data.code == 200) {
                            let resData = res.data.data;
                            resData.forEach(item => {
                                item.htmlType = "text";
                            });
                            me.tableData = resData;
                            // me.$message({
                            //     message:"成功！",
                            //     type:"success"
                            // });
                        }
                    });
                }
            }); 
        },
        /**
         * 请求参数上添加sql语句。
         * @author szc 2019年5月21日14:15:22
         */
        paramsOfSql (params,data) {
            debugger;
            let me = this;
            if(data && data.length > 0) {
                for(let i = 0;i < data.length;i ++) {
                    let item = data[i];
                    if(item.id == "101") {
                        params.sql = item.sql;
                        break;
                    }
                }
            }
            return params;
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
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/reportText.json").then(res => {
                debugger;
                if(res.data.code == 200) {
                    debugger;
                    me.reportData = res.data.reportData;
                    me.treeTableShow = false;
                }
            });
            // me.treeTableShow = false;
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
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/basicsModalConfig.json").then(res => {
                if(res.data.code == 200){
                    // queryCopingStrategies().then(res => {
                    //     if(res.data.code == 200) {

                    //     }else {
                    //         me.$message({
                    //             message:"查询风险策略失败！",
                    //             type:"warning"
                    //         });
                    //     }
                    // });
                    me.parseData(res.data.formConfig,row.row);
                    me.currentRowIndex = row.$index;
                    me.dialogVisible = true;
                }
            });
        },
        /**
         * 装换数据。
         * @author szc 2019年5月16日17:59:32
         */
        parseData (formConfig,row) {
            debugger;
            let me = this;
            if(formConfig && row){
                let groups = formConfig.groups,itemData = row;
                for(let i = 0;i < groups.length;i ++){
                    let groupItem = groups[i];
                    if(groupItem.content && groups.length > 0) {
                        let content = groupItem.content;
                        for(let j = 0;j < content.length;j ++){
                            let contenItem = content[j];
                            if(itemData[contenItem.text]){
                                contenItem[contenItem.text] = itemData[contenItem.text];
                                contenItem.text == "fxdj" && itemData.nlevel? contenItem.nlevel = itemData.nlevel:"";
                            }
                        }
                    }
                }
            }
            me.modalData = formConfig;
        },
        /**
         * 上一条、下一条。
         * @author szc 2019年5月17日08:26:42
         */
        changMessage (sign) {
            let me = this,$index = me.currentRowIndex,tableData = me.tableData;
            if(typeof($index) != "undefined"){
                if($index == 0 && sign == "up"){
                    me.$message({
                        message:"已是第一条！",
                        type:"warning"
                    });
                    return;
                }
                if($index == tableData.length - 1 && sign == "down") {
                    me.$message({
                        message:"已是最后一条！",
                        type:"warning"
                    });
                    return;
                }
                if(sign == "up"){
                    $index = $index - 1;
                    me.parseData(me.modalData,me.tableData[$index]);
                    me.currentRowIndex = $index;
                }else {
                    $index = $index + 1;
                    me.parseData(me.modalData,me.tableData[$index]);
                    me.currentRowIndex = $index;
                }
            }
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