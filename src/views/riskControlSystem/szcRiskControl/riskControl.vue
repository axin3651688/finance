<template>
    <div>
        <div>
            <el-tabs v-model="activeName"
            @tab-click="handleTabClick">
                <el-tab-pane label="风险批示" name="first" v-if="firstFlag">
                    <div class="selectClass">
                        <RiskSelect v-on:changeOption="changeOption" :selectConfig.sync="selectConfig" />
                    </div>
                    <div>
                        <stable :tableData.sync="tableData" :columns.sync="columns" v-on:clickItemName="clickItemName" v-on:changeShowContent="changeShowContent"></stable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="汇总批示" name="second" v-if="secondFlag">
                    <div v-if="treeTableShow">
                        <treeTable border :data.sync="treeData" :columns.sync="columns" v-on:buttonHandler="buttonHandler"></treeTable>
                    </div>
                    <div v-else>
                        <el-row>
                            <el-col :span="24" style="border:1px solid #ccc;">
                                <!-- <div>
                                    <el-button @click="returnCurrentClick">返回</el-button>
                                </div> -->
                                <el-header class="container_header">
                                    <div class="container_alert" v-if="isAlertShow">
                                        <span><i class="el-icon-warning"></i>查看页面，无法操作此页面！</span>
                                    </div>
                                    <div class="container_alert" v-else>
                                        <span>报告批示</span>
                                    </div>
                                    <div class="container_btn">
                                        <el-button type="primary" plain @click="exportBtn">导出</el-button>
                                        <el-button type="primary" plain @click="returnCurrentClick">返回</el-button>       
                                    </div>                                
                                </el-header>
                                <reportContent :reportData="reportData"></reportContent>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="70%"
                top="50px"
                :before-close="beforeClose">
                <div>
                    <!-- <dialogContent :dialogData="dialogData"></dialogContent> -->
                    <basicsModal v-if="basicsDiv" :formConfig.sync="modalData" v-on:changMessage="changMessage" v-on:eventHandler="eventHandler" ref="riskModal"/>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :title="publicTitle"
                :visible.sync="publicVisible"
                width="50%"
                top="50px">
                <div v-if="false">
                    <remindReport :data.sync="dptDatas" :prtParams.sync="prtParams" v-on:remindHandler="remindHandler"></remindReport>
                </div>
                <div v-if="referenceShow">
                    <referenceModal></referenceModal>
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
//提醒的弹出框内容。
import remindReport from "./dialogModal/remindReport"
import referenceModal from "./dialogModal/reference"
import deptSelect from "./mixin/deptSelectHandler"
// import reportContent from "@v/riskControlSystem/publicRiskControl/riskReportComponents/reportConventional"
import {
    queryInstructions,
    queryCopingStrategies,
    queryUserOfCompany,
    queryReference,
    globalparam_all
} from "~api/szcRiskControl/riskControl"
import { findThirdPartData } from "~api/interface"
import { mapGetters,mapActions } from "vuex";
import publicTools from './../sjzRiskControl/riskJavaScript.js'
import { exportRiskWorld } from '~api/SZCExport'
export default {
    mixins: [deptSelect],
    name: "riskControl",
    components:{
        stable,
        RiskSelect,
        treeTable,
        reportContent,
        dialogContent,
        basicsModal,
        remindReport,
        referenceModal
    },
    data() {
        return {
            // showComponent:""//控制显示报告下面的组件批示
            dialogTitle:"关于【风险名称】的批示",
            publicTitle:"参照",
            fixedTitle:"关于【风险名称】的批示",
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
                currentSelect:"",
                options:[]
            },//下拉框的内容配置
            publicVisible:false,
            dptDatas:[],//部门人员的数据
            prtParams:{},
            basicsDiv:true,
            isAlertShow:false,
            referenceShow:false,//参照显示与否。
            firstFlag:true,
            secondFlag:true,
            jsonBeanData:{
                level:0,
                leaf:0,
                text:"",
                children:[
                    {
                        text: "总述",
                        level: 1,
                        leaf: 1,
                        content: ""
                    }
                ]
            }//导出数据格式
        }
    },
    /**
     * 计算属性。
     */
    computed: {
        ...mapGetters(["year", "month", "company","showDims"])
    },
    /**
     * 监听属性。
     */
    watch: {
        /**
         * 监听公司
         */
        company (newValue,oldValue) {
            this.treeTableShow = true;
            this.updateView();
        },
        year (newValue,oldValue) {
            this.treeTableShow = true;
            this.updateView();
        },
        month (newValue,oldValue) {
            this.treeTableShow = true;
            this.updateView();
        }
    },
    /**
     * 组件生成的回调。
     */
    created() {
        let me = this;
        this.ShowDims({
            company:true,
            year:true,
            month:true,
            day:false,
            conversion:false
        });
        me.queryDepartMent();
        globalparam_all().then(res => {
            if(res.data.code == 200){
                let resData = res.data.data[0];
                // me.globalparam = resData;
                let url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
                if(resData.reporttype == 0){
                    me.activeName = "second"
                    me.firstFlag = false;
                    me.secondFlag = true;
                }else {
                    me.activeName = "first";
                    me.firstFlag = true;
                    me.secondFlag = false;
                    url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
                }
                let selectItem = me.selectItem;
                let judgeParams = {
                    id:"treeTable",
                    sqlId:"103"
                };
                me.axios.get(url).then(res => {
                    if(res.data.code == 200) {
                        me.columns = res.data.columns;
                        me.queryDataOfInstructions(selectItem,judgeParams);
                    }
                })
            }
        });
        // if(me.activeName == "second") {
        //     let selectItem = me.selectItem;
        //     let judgeParams = {
        //         id:"treeTable",
        //         sqlId:"103"
        //     };
        //     let url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
        //     this.axios.get(url).then(res => {
        //         if(res.data.code == 200) {
        //             me.columns = res.data.columns;
        //             me.queryDataOfInstructions(selectItem,judgeParams);
        //         }
        //     })
        // }else {
        //     let selectItem = me.selectItem;
        //     let judgeParams = {
        //         id:"treeTable",
        //         sqlId:"103"
        //     };
        //     let url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
        //     this.axios.get(url).then(res => {
        //         if(res.data.code == 200) {
        //             me.columns = res.data.columns;
        //             me.queryDataOfInstructions(selectItem,judgeParams);
        //         }
        //     })
        // }
        //请求table的数据。
        // let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
        // if(me.activeName == "second"){
        //     url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
        // }
        // this.axios.get(url).then(res => {
        //     debugger;
        //     if(res.data.code == 200) {
        //         me.tableData = res.data.rows;
        //         me.treeData = res.data.rows;
        //         me.columns = res.data.columns
        //     }
        // });
    },
    /**
     * 页面渲染之后的回调。
     */
    mounted () {},
    methods: {
        ...mapActions(["ShowDims"]),
        /**
         * 更新视图。
         * @author szc 2019年5月21日19:37:42
         */
        updateView () {
            let me = this,selectItem = me.selectItem;
            let currentTab = me.activeName,judgeParams = {
                id:"stable",
                sqlId:'101'
            };
            if(currentTab == "second") {
                judgeParams = {
                    id:"treeTable",
                    sqlId:"103"
                }
            }
            me.queryDataOfInstructions(selectItem,judgeParams);
            me.queryDepartMent();
        },
        /**
         * 处理tab切换点击事件。
         * @author szc 2019年5月14日14:55:16
         */
        handleTabClick (tab, event) {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            if(tab.name == "second"){
                url = "/cnbi/json/source/tjsp/szcJson/risk/riskTreeTable.json";
                me.treeTableShow = true;
            }
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    me.columns = res.data.columns
                    if(tab.name == "first"){
                        // me.tableData = res.data.rows;
                        let selectItem = "",judgeParams = {
                            id:"stable",
                            sqlId:"101"
                        };
                        if(me.selectItem){
                            selectItem = me.selectItem;
                        }
                        me.queryDepartMent();
                        me.queryDataOfInstructions(selectItem,judgeParams);
                    }else {
                        // me.treeData = res.data.rows;
                        let selectItem = me.selectItem;
                        let judgeParams = {
                            id:"treeTable",
                            sqlId:"103"
                        };
                        me.queryDataOfInstructions(selectItem,judgeParams);
                    }
                }
            });
        },
        /**
         * 查询风险管控的数据。
         * @author szc 2019年5月21日11:32:47
         */
        queryDataOfInstructions (item,judgeParams) {
            let me =this,storeParams = me.$store.getters,company = storeParams.company,year = storeParams.year,
                month = storeParams.month,period = "",monthStr = "";
            if(month > 9) {
                period = year + "" + month;
                monthStr = "" + month;
            }else {
                period = year + "0" + month;
                monthStr = "0" + month;
            }
            //判断是不是点击报告的scope
            if(judgeParams && judgeParams.scope){
                company = judgeParams.scope.row.scode;
            }
            let params = {
                company:company,
                year:year,
                month:monthStr,
                period:period,
                departId:"",
                sql:""
            };
            if(judgeParams.params){
                params = judgeParams.params;
            }
            me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                if(res.data.code == 200){
                    let curSqlId = judgeParams? judgeParams.sqlId:"101";
                    me.sqlList = res.data.sqlList;
                    params = me.paramsOfSql(params,res.data.sqlList,curSqlId);
                    //如果没有选择部门默认是第一个。
                    if(!params.departId){
                        let options = me.selectConfig.options;
                        params.departId = item? item:(options[0]? options[0]:"01")
                    }
                    globalparam_all().then(res => {
                        if(res.data.code == 200){
                            let resData = res.data.data[0];
                            me.paramsSqlOfGlobal(params,resData);
                            findThirdPartData(params).then(res => {
                                if(res.data.code == 200) {
                                    if(judgeParams.id == "treeTable"){
                                        let treeDatas = me.transformationTreeData(res.data.data);
                                        me.treeData = treeDatas;
                                    }else if (judgeParams.id == "stable") {
                                        let resData = res.data.data;
                                        resData.forEach(item => {
                                            item.htmlType = "text";
                                        });
                                        resData = me.setOperationBtns(resData);
                                        me.tableData = resData;
                                    }else if (judgeParams.id == "lookInstruc"){
                                        // res.data.data = res.data.data.sort();
                                        me.lookInstructionRes(res.data.data,judgeParams);
                                    }else if (judgeParams.queryAfter) {
                                        me[judgeParams.queryAfter](res.data.data,judgeParams);
                                    }
                                }
                            });
                        }
                    });
                }
            }); 
        },
        /**
         * 请求参数上添加sql语句。
         * @author szc 2019年5月21日14:15:22
         */
        paramsOfSql (params,data,sqlId) {
            let me = this,globalparam = me.globalparam;
            if(data && data.length > 0) {
                for(let i = 0;i < data.length;i ++) {
                    let item = data[i];
                    if(item.id == sqlId) {
                        params.sql = item.sql;
                        break;
                    }
                }
            }
            // if(globalparam && globalparam[0].periodtype && globalparam[0].periodtype == 1){
            //     params.sql = params.sql.replace(/:globalPeriod/g,"DIM_PERIOD = :period");
            // }else {
            //     params.sql = params.sql.replace(/:globalPeriod/g,"DIM_PERIOD <= :period");
            // }
            return params;
        },
        /**
         * sql参数的替换。
         */
        paramsSqlOfGlobal (params,resData) {
            let me = this;
            if(resData.periodtype && resData.periodtype == 1){
                params.sql = params.sql.replace(/:globalPeriod/g,"= :period");
            }else {
                params.sql = params.sql.replace(/:globalPeriod/g,"<= :period");
            }
        },
        /**
         * 根据行的批示状态生成按钮。
         * @author szc 2019年5月24日11:08:51
         */
        setOperationBtns (data) {
            let me = this,userName = me.$store.getters.user.user.userName,btns01 = [
                {
                    "id": "1",
                    "btnShow": true,
                    "text": "查看"
                }
            ],
            btns02 = [
                {
                    "id": "0",
                    "btnShow": true,
                    "text": "批示"
                },
                {
                    "id": "3",
                    "btnShow": true,
                    "text": "提醒"
                }
            ];
            data.forEach(item => {
                if(item.psztid == "1"){
                    if(item.sinstructionsuser == userName){
                        let itemBtn = {
                            "id": "2",
                            "btnShow": true,
                            "text": "退回"
                        };
                        btns01.push(itemBtn);
                    }
                    item.operation = btns01;
                }else if (item.psztid == "-1" || item.psztid == "0" || item.psztid == "2" || item.psztid == null) {
                    item.operation = btns02;
                }
            });
            return data;
        },
        /**
         * 查看之后的查询结果。
         * @author szc 2019年5月27日16:31:38
         */
        lookInstructionRes (lookData,judgeParams) {
            // let me = this,company = me.$store.getters.companyName;
            let me = this,company = me.$store.getters.treeInfo.sfullname;
            if(judgeParams && judgeParams.scope){
                company = judgeParams.scope.row.sname;
            }
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/reportText.json").then(res => {
                if(res.data.code == 200) {
                    // me.reportData = res.data.reportData;
                    res.data.reportData.reportCompanyName = company;
                    //把所有的数据放上去。
                    res.data.reportData.allData = lookData;
                    me.showDataOfInstruction(lookData,res.data.reportData,judgeParams);
                    // me.reportData = res.data.reportData;
                    // me.treeTableShow = false;
                }
            });
        },
        /**
         * 按钮的处理。
         * @author szc 2019-5-14 11:56:40
         * 0 批示 1 查看 2 退回 3 提醒
         */
        buttonHandler (scope,btnItem) {
            let me = this;
            if(btnItem){
                let id = btnItem.id;
                if(id == "0"){
                    //批示.
                    // me.instructionsState(scope);
                    // globalparam_all().then(res => {
                    //     if(res.data.code == 200){
                    //         me.globalparam = res.data.data;
                    //         me.reportData.type = "0";
                    //         me.lookInstructions(scope);
                    //     }
                    // })
                    me.reportData.type = "0";
                    me.lookInstructions(scope);
                }else if (id == "1") {
                    // globalparam_all().then(res => {
                    //     if(res.data.code == 200){
                    //         me.globalparam = res.data.data;
                    //         me.reportData.type = "1";
                    //         me.lookInstructions(scope);
                    //     }
                    // })
                    me.reportData.type = "1";
                    me.lookInstructions(scope);
                }else if (id == "2") {
                    me.returnInstruction(scope);
                }else if (id == "3") {
                    me.remindTreeInstruction(scope);
                }
            }
        },
        /**
         * 批示状态的改变。
         * @author szc 2019年5月14日13:48:28
         */
        instructionsState (scope) {
            let me = this,$index = scope.$index,scode = scope.row.scode;
            if(scode){
                // me.treeData.forEach();
                me.changeValue(me.treeData,scode);
                console.log("ooooooooooo",me.treeData)
                me.treeData;
            }
        },
        changeValue (treeData,scode) {
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
        lookInstructions (scope) {
            let me = this,selectItem = me.selectItem,judgeParams = {
                id:"lookInstruc",
                sqlId:"104",
                scope:scope
            };
            me.queryDataOfInstructions(selectItem,judgeParams);
        },
        /**
         * 查看批示的内容
         * @author szc 2019年5月14日14:24:14
         */
        lookInstructions_old () {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/reportText.json").then(res => {
                if(res.data.code == 200) {
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
            let me = this;
            let selectItem = me.selectItem;
            let judgeParams = {
                id:"treeTable",
                sqlId:"103"
            };
            me.queryDataOfInstructions(selectItem,judgeParams);
            me.treeTableShow = true;
        },
        /**
         * 风险名称项目的点击事件
         * @author szc 2019年5月14日15:26:03
         */
        clickItemName (row) {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/basicsModalConfig.json").then(res => {
                if(res.data.code == 200){
                    queryCopingStrategies().then(resData => {
                        if(resData.data.code == 200) {
                            // me.copingStrategies(res.data.formConfig,res.data.data);
                            me.parseData(res.data.formConfig,row.row,resData.data.data);
                            me.currentRowIndex = row.$index;
                            me.dialogVisible = true;
                        }else {
                            me.$message({
                                message:"查询风险策略失败！",
                                type:"warning"
                            });
                        }
                    });
                    
                }
            });
        },
        // copingStrategies (formConfig,data) {
        //     debugger;
        //     let me = this;
        //     if(formConfig && data) {

        //     }
        // },
        /**
         * 装换数据。
         * @author szc 2019年5月16日17:59:32
         */
        parseData (formConfig,row,options) {
            let me = this;
            if(formConfig && row){
                let groups = formConfig.groups,itemData = row,psztid = row.psztid;
                formConfig.rowData = row;
                if(psztid == "1"){
                    me.dialogTitle = me.fixedTitle + "--【已批示】"
                }else {
                    me.dialogTitle = me.fixedTitle;
                }
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
                            if(contenItem.type == "labelSelect" && options){
                                //暂时就一个，先写死，后面可以循环
                                contenItem.selectConfig[0].options = options;
                            }
                            if(contenItem.type == "labelSelect"){
                                psztid && psztid == "1"? contenItem.disabled = "disabled":contenItem.disabled = undefined;
                            }
                            //人员指定的判断 10101是自己规定的
                            if(contenItem.id == "10401"){
                                psztid && psztid == "1"? contenItem.checkbox.disabled = "disabled":contenItem.checkbox.disabled = undefined;
                            }
                        }
                    }
                }
            }
            me.selectItem? formConfig.departId = me.selectItem:formConfig.departId = "01";
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
        },
        /**
         * 事件处理公共出口。
         * @author szc 2019年5月22日19:39:07
         */
        eventHandler (params) {
            let me = this,selectItem = me.selectItem;
            //10401 自定义的 表示批示下达之后要进行的操作。
            if(params.id == "10401"){
                let judgeParams = me.getJudgeParams();
                me.queryDataOfInstructions(selectItem,judgeParams);
            }else if (params.id == "reference") {
                me.reference();
            }
        },
        /**
         * 参照按钮事件  /riskstrategy/query_all
         */
        reference () {
            this.publicVisible = true;
            this.referenceShow = true;
            // queryReference().then(res => {
            //     if(res.data.code == 200) {

            //     }
            // });
        },
        /**
         * 关闭modal框的回调。
         * @author szc 2019年5月23日11:35:08
         */
        beforeClose (done) {
            let me = this;
            this.$refs.riskModal.recoveryDefault();
            done();
        },
        /**
         * 报告导出。
         */
        exportBtn () {
            let me = this,jsonBeanData = me.jsonBeanData,storeParams = me.$store.getters,
                company = storeParams.company,year = storeParams.year,month = storeParams.month;
            me.transformJsonBeanData(jsonBeanData);
            let params = {
                company:company,
                year:year,
                month:month > 9? month + "":"0" + month,
                // jsonBean:JSON.stringify(jsonBeanData),
                jsonBean:jsonBeanData,
                text:"风险管控报告"
            };
            exportRiskWorld(params).then(res => {
                if(res.status == 200){
                    let blob = res.data;
                    let href = window.URL.createObjectURL(blob); // 创建下载的链接
                    let downloadElement = document.createElement('a');
                    downloadElement.href = href;
                    downloadElement.download = '风险管控报告.docx'; // 下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); // 点击下载
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href);
                }
            });
        },
        /**
         * json数据格式
         */
        transformJsonBeanData (jsonBeanData) {
            let me = this,storeParams = me.$store.getters,
                companyName = storeParams.companyName,year = storeParams.year,month = storeParams.month;
            let title = companyName + year + "年" + month + "月风险预警报告";
            jsonBeanData.text = title;
            let headerReport = document.getElementById("risk_report_header"),headerContent = headerReport.innerText;
            jsonBeanData.children[0].content = headerContent;
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
    .container_header{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: right;
        background-color: #D3DCE6;
    }
    .container_alert{
        color: #e6a23c;
        width: 250px;
        height: 40px;
        margin-left: 40%;
        float: left;
    }
    /*按钮（查看按钮时提示用的）*/
    .container_btn{
        float: right ;
        height: 40px;
        width: 150px;
    }
</style>