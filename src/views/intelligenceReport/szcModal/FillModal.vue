<template>
    <el-dialog
    width="90%"
    :title="modalConfig.title||'上报人员'"
    :modal-append-to-body="false"
    :visible.sync="modalConfig.dialogVisible"
    :before-close="beforeClose"
    >
        <div>
            <div class="fillSelect">
                <el-row>
                    <template v-for="(itemSel,index) in selectOps">
                        <el-col :span="5" :key="index">
                            <label :key="index" style="margin:0 10px;">{{ itemSel.label }}</label>
                            <el-select  v-if="itemSel.id == 'match' && !matchShow && itemSel.type && itemSel.type == 'select'" disabled v-model="itemSel.valueLabel" placeholder="请先选择公司" :key="index" 
                            @change="changeEvent(itemSel,item)"
                            @visible-change="showChange">
                                <el-option
                                v-for="item in itemSel.content"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                            <div :key="index" v-else-if="itemSel.type && itemSel.type == 'input'" class="stateInput">
                                <el-input
                                placeholder="暂无状态"
                                v-model="inputValue"
                                :disabled="true">
                                </el-input>
                            </div>
                            <el-select v-else-if="itemSel.type && itemSel.type == 'select'" v-model="itemSel.valueLabel" placeholder="请选择" :key="index" 
                            @change="changeEvent(itemSel,item)"
                            @visible-change="showChange">
                                <el-option
                                v-for="item in itemSel.content"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-col>
                    </template>
                    <el-col :span="5">
                        <el-button v-if="modalConfig.id != 'urgeToReport'" @click="queryHandler" class="button">确定</el-button>
                        <el-button v-if="modalConfig.id != 'urgeToReport' && auditMonth" @click="queryHandler('audit')" class="button">审计月</el-button>
                    </el-col>
                    <el-col :span="4">
                        <div v-if="urgeToShow" class="btnClass">
                            <el-button @click="urgeToBtnHandler" class="button">催报</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="modalTable">
                <el-table v-if="tableData && tableData.length > 0"
                :data="tableData"
                border
                style="width: 100%;height:100%;"
                >
                <template v-for="(item,index) in columns">
                    <el-table-column
                    :prop="item.id"
                    :label="item.text"
                    :key="index"
                    :show-overflow-tooltip="true"
                    :align="item.type == 'decimal'? 'right':''"
                    >
                    <!-- <template> -->
                        <template slot-scope="scope">
                            <span v-if="item.type == 'decimal'">
                                {{ handlerTypeOfValue(scope) }}
                            </span>
                            <span v-else>
                                {{ scope.row[scope.column.property] }}
                            </span>
                        </template>
                        <!-- <template v-else>
                            <span>
                                {{ scope.row[scope.column.property] }}
                            </span>
                        </template> -->
                        
                    <!-- </template> -->
                        
                    </el-table-column>
                </template>
                </el-table>
            </div>
            <!-- 审阅批示的显示的内容 -->
            <div v-if="tableData && tableData.length > 0 && reviewShow">
                <el-form :model="form" label-width="80px" :inline="true">
                    <el-form-item label="审阅结果">
                        <el-select v-model="form.result" placeholder="请选择">
                        <el-option label="通过" value="3"></el-option>
                        <el-option label="不通过" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结果说明" prop="explain">
                        <el-input type="textarea" v-model="form.explain"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>
<script>

import {
    inquire,
    saveReview,
    queryStateOfTable,
    urgeToReport,
    queryUrgeUsers,
    financingDown
} from "@/api/fill.js"
import SRModal from "@v/intelligenceReport/SRModal";

export default {
    name: "FillModal",
    props: ['modalConfig'],
    data() {
        return {
            auditMonth:false,//审计月显示。
            urgeToShow:false,//催报的按钮的显示与否
            reviewShow:true,//审阅的按钮功能的显示与否
            matchShow:false,//控制没有选择公司不能选后面的下拉框
            value:"",
            companyValue:"",
            options: [],
            selectOps:[],
            selectTables:[],
            tableData:[],
            columns:[],
            //审阅的表单批示内容。
            form: {
                result:"",
                explain:""
            },
            selectCompany:"",//审阅选择的公司
            selectTable:"",//选择表的标记
            inputValue:""//输入框的内容
        }
    },
    created() {
        let me = this;
        this.axios.get("/cnbi/json/source/tjsp/szcJson/fillModal/selectOps.json").then(res => {
            console.log(res);
            // if(res && res.length > 0){
            //     res.forEach(item => {
            //         if(item.id == "company"){
            //             item.content = me.modalConfig.datas.companyDatas;
            //         }
            //     });
            // }
            me.selectTables = res.data.filter(item => {
                return item.id == "match";
            });
            me.selectOps = res.data;
            me.$store.fillParams = {
                selectTables : me.deepCopy(me.selectTables)
            }
        });
        this.axios.get("/cnbi/json/source/tjsp/szcJson/fillModal/financing.json").then(res => {
            if(res.data.code == 200){
                me.financing = res.data.financing;
                me.dataDict = res.data.dataDict;
            }
        });
        let params = 10;
        financingDown(params).then(res => {
            this.financingOptions = res.data.data;
        });
        this.update();
    },
    mounted() {
        let me = this;
    },
    watch : {
        modalConfig(){
            let me = this;
            if(this.selectOps && this.selectOps.length > 0){
                let res = this.selectOps;
                res.forEach(item => {
                    if(item.id == "company"){
                        item.content = me.modalConfig.datas.companyDatas;
                    }
                });
            }
        }
    },
    methods: {
        /**
         * 更新数据。
         */
        update () {
            let me = this;
        },
        /**
         * 深clone
         * @author szc 2019年5月8日11:16:23
         */
        deepCopy(obj) { //深拷贝
            var result = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        result[key] = this.deepCopy(obj[key]); //递归复制
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
        showChange (item,value) {
            
            return
            let me = this;
            if(item){
                item = false;
            }
        },
        /**
         * 选择框改变时的回调。
         * @author szc 2019年5月7日15:34:47
         */
        changeEvent (item,value) {
            let me = this;
            if(item && item.id == "company"){
                me.selectCompany = item.valueLabel;
                me.matchShow = true;
                //根据公司显示不同的报表选项。
                me.tablesByCompany(item);
            }else if(item && item.id == "match") {
                me.selectTable = item;
                //根据三张主表显示审计月。
                me.showAuditMonth(item);
            }
        },
        /**
         * 三张主表的审计月。
         * @author szc 2019年5月16日09:51:44
         */
        showAuditMonth (item) {
            let me = this,arr = ['1','2','3'];
            arr.indexOf(item.valueLabel) != -1? me.auditMonth = true:me.auditMonth = false;
        },
        /**
         * 根据公司来判断要显示的报表。
         * @author szc 2019年5月8日10:12:08
         */
        tablesByCompany (item) {
            
            let me = this;
            if(item){
                let scode = item.valueLabel,content = item.content;
                let companyItem = content.filter(it => {
                    return it.scode == scode;
                });
                if(companyItem && companyItem.length > 0){
                    me.curSelectCompany = companyItem;
                    me.createTableSelect(companyItem[0]);
                }
            }
        },
        /**
         * 生成相应的table下拉选个数。
         * @author szc 2019年5月8日10:17:08
         */
        createTableSelect (companyItem) {
            
            let me = this,isleaf = companyItem.nisleaf,selectTables = me.$store.fillParams.selectTables[0].content,resSelect = [];
            if(isleaf == '0'){
                let arr = ['10'];
                resSelect = selectTables.filter(item => {
                    return arr.indexOf(item.value) != -1;
                });
            }else {
                let arr = ['10','12'];
                resSelect = selectTables.filter(item => {
                    return arr.indexOf(item.value) == -1;
                });
            }
            me.selectOps.forEach(item => {
                if(item.id == "match"){
                    item.content = resSelect;
                }
            });
        },
        /**
         * 查询数据提交按钮。
         * @author szc 2019年5月7日15:35:20
         */
        queryHandler (sign) {
            
            let me = this,storeParams = me.$store.getters,year = storeParams.year,period = "";
            sign && sign == "audit"? period = year + "13":period = me.parsePeriod();
            //放到全局对象上，催报的时候用。
            me.clickPeriod = period;
            //查询选中的报表状态。
            let stateParams = {
                company:me.selectCompany,
                period: period,
                templateid:me.selectTable.valueLabel
            };
            queryStateOfTable(stateParams).then(res => {
                if(res.data.code == 200){
                    //添加一个不是指定的用户不给查询报表显示。
                    // if(res.data.data && res.data.data.stouser){
                    //     let stouser = res.data.data.stouser;
                    //     if(stouser != storeParams.user.user.userName){
                    //         me.inputValue = "未上报";
                    //         me.urgeToShow = true;
                    //         me.tableData = [];
                    //         me.$message({
                    //             message:"此公司的此报表未上报！",
                    //             type: "warning"
                    //         });
                    //         return;
                    //     }
                    // }
                    me.urgeToShow = false;
                    me.tipsOfState(res.data.data);
                }else if(res.data.code == 1001) {
                    me.inputValue = "未上报";
                    me.urgeToShow = true;
                    me.tableData = [];
                    me.$message({
                        message:"此公司的此报表未上报！",
                        type: "warning"
                    });
                }
            })
            // let params = {
            //     company: "1001",
            //     fixed: 0,
            //     period: "201711",
            //     subject: "1004",
            //     templateId: "12"
            // };
            // params = this.parseRequestParams(params);
            // inquire(params).then(res => {
            //     
            //     if(res.data.code == 200){
            //         me.columns = res.data.data.columns;
            //         me.tableData = res.data.data.rows;
            //         me.$message({
            //             message: "成功！",
            //             type: "success"
            //         });
            //     }
            // });
        },
        /**
         * 选中报表的状态结果提示。
         * @author szc 2019年5月8日15:03:09
         */
        tipsOfState (data) {
            
            let me = this;
            if(data){
                let state = data.statemun;
                let params = {
                    company: "1001",
                    fixed: 0,
                    period: "201711",
                    subject: "1004",
                    templateId: "12"
                };
                params = this.parseRequestParams(params);
                switch (state) {
                    case 1:
                        me.inputValue = "已上报";
                        me.reviewShow = true;
                        me.queryDataOfTable(params);
                        break;
                    case 2:
                        me.inputValue = "申请退回中";
                        me.$message({
                            message:"申请退回中..."
                        });
                        break;
                    case 3:
                        me.inputValue = "已审阅";
                        me.reviewShow = false;
                        me.queryDataOfTable(params);
                        me.$message({
                            message:"已审阅！"
                        });
                        break;
                    case 4:
                        me.urgeToShow = true;
                        me.inputValue = "已退回，未上报";
                        me.tableData = [];
                        me.$message({
                            message:"已退回，未上报！"
                        });
                        break;
                    case 0:
                        me.inputValue = "已催报";
                        me.urgeToShow = true;
                        me.tableData = [];
                        me.$message({
                            message:"已催报!"
                        });
                        break;
                    default:
                        break;
                }
            }
        },
        /**
         * 查询table的数据。
         * @author szc 2019年5月8日16:50:13
         */
        queryDataOfTable (params) {
            
            let me = this;
            inquire(params).then(res => {
                if(res.data.code == 200){
                    let columns = res.data.data.columns,arr = ['id','id_','item'];
                    columns = columns.filter(item => {
                        return arr.indexOf(item.id) == -1;
                    });
                    me.columns = columns;
                    let parseItems = ['4','5','6'];
                    //加个融资情况表的判断。
                    if(params.templateId && params.templateId == "7"){
                        let itemNames = [//guarantee repaysource
                            {"text":"cismenu","type":"single"},
                            {"text":"cisguarantee","type":"single"},
                            {"text":"guarantee","type":"MSeries","root":"financing"},
                            {"text":"repaysource","type":"MSeries","root":"financing"},
                            {"text":"finance","type":"MSeries","root":"financingOptions"}
                        ];
                        me.parseNumberToString(itemNames,res.data.data.rows);
                        me.tableData = me.handleFinancingCompany(res.data.data.rows);
                    }else if(params.templateId && parseItems.indexOf(params.templateId) != -1) {
                        let itemNames = [//guarantee repaysource isnormal
                            {"text":"isinside","type":"single"},
                            {"text":"isnormal","type":"single"},
                            {"text":"isnature","type":"MSeries","root":"dataDict"}
                        ];
                        this.parseNumberToString(itemNames,res.data.data.rows);
                        me.tableData = res.data.data.rows;
                    } else{
                        me.tableData = res.data.data.rows;
                    }
                }
            });
        },
        /**
         * 融资的类型转换。
         * @author szc 2019年6月2日14:24:26
         */
        parseNumberToString(itemNames,rows) {
            let me = this;
            if(itemNames && itemNames.length > 0){
                for(let i = 0; i < itemNames.length;i ++){
                    let item = itemNames[i];
                    if(item.type == "single"){
                        rows.forEach(tt => {
                            tt[item.text] && tt[item.text] == 1? tt[item.text] = "是":(tt[item.text] == 0? tt[item.text] = "否":"");
                        });
                    }
                    if(item.type == "MSeries"){
                        for(let j = 0; j < rows.length;j ++){
                            let rowItem = rows[j];
                            let filItem = me[item.root].filter(filIt => {
                                return filIt.id == rowItem[item.text];
                            });
                            if(filItem && filItem.length > 0){
                                rowItem[item.text] = filItem[0].text;
                            }
                        }
                    }
                }
            }
        },
        /**
         * 转换融资情况表的一些关联类型数据。
         * @author szc 2019年6月2日13:44:00
         */
        handleFinancingCompany (data) {
            let me = this,company = me.$store.getters.companyName;
            data.forEach(item => {
                if(!item.companyname){
                    item.companyname = company;
                }
            });
            return data;
        },
        /**
         * 请求参数的转换。
         * @author szc 2019年5月7日17:43:21
         */
        parseRequestParams (params) {
            
            let me = this,selectTable = me.selectTable,itemTable = "";
            if(selectTable && selectTable.valueLabel){
                let content = selectTable.content;
                itemTable = content.filter(item =>{
                    return item.value == selectTable.valueLabel;
                });
            }
            if(itemTable){
                params.company = me.selectCompany;
                params.fixed = itemTable[0].fixed;
                params.subject = itemTable[0].subject;
                params.period = me.parsePeriod();
                params.templateId = selectTable.valueLabel;
            }
            me.reviewParams = params;
            return params;
        },
        /**
         * 转换日期。
         * @author szc 2019年5月7日15:55:29
         */
        parsePeriod () {
            let me = this,paramsStore = this.$store.getters,year = paramsStore.year,month = paramsStore.month,period = "";
            if(month > 9){
                period = year + "" + month;
            }else {
                period = year + "0" + month;
            }
            return period;
        },
        /**
         * 审阅的确定按钮操作。
         * @author szc 2019年5月7日19:07:24
         */
        submitForm (form) {
            
            let me = this,formData = me.form,reviewParams = me.reviewParams,curSelectCompany = me.curSelectCompany[0],
                storeParams = me.$store.getters;
            if(formData){
                // me.queryStateOfTable();/zjb/update_fill_message
                let params = {
                    "company": reviewParams.company,
                    "id": 0,
                    "nreportnum": 0,
                    "period": reviewParams.period,
                    "scompanyname": curSelectCompany.sname,
                    "screatetime": new Date(),
                    "screateuser": storeParams.user.user.userName,
                    "statemun": formData.result,
                    "supdateuser": storeParams.user.user.userName,
                    "templateid": reviewParams.templateId
                }
                let inputMsg = "已审阅";
                if(formData.result == 4){
                    inputMsg = "已退回";
                }
                saveReview(params).then(res => {
                    if(res.data.code == 200){
                        me.inputValue = inputMsg;
                        me.reviewShow = false;
                        me.$message({
                            message: formData.result == 3? "审阅成功！":"退回成功！",
                            type: "success"
                        });
                        me.form.result = "";
                        me.form.explain = "";
                    }
                });
            }
        },
        /**
         * 查询table的状态。
         * @author szc 2019年5月7日19:27:25
         */
        // queryStateOfTable () {
        //     
        //     let me = this;
        // },
        /**
         * 选择相应的表来进行催报。
         * @author szc 2019年5月7日20:22:15
         */
        urgeToBtnHandler () {
            let me = this,curSelectCompany = me.curSelectCompany[0],
                storeParams = me.$store.getters;
            let period = me.clickPeriod? me.clickPeriod:me.parsePeriod();
            let params = {
                "company": me.selectCompany,
                "id": 0,
                "nreportnum": 0,
                "period": period,
                "scompanyname": curSelectCompany.sname,
                "screatetime": new Date(),
                "screateuser": storeParams.user.user.userName,
                "statemun": '0',
                "supdateuser": storeParams.user.user.userName,
                "templateid": me.selectTable.valueLabel,
                "users": storeParams.user.user.userName
            };
            me.queryUserByCompany(params);
            // urgeToReport(params).then(res => {
            //     if(res.data.code == 200) {
            //         me.inputValue = "已催报";
            //         me.$message({
            //             message:"催报成功！",
            //             type:"success"
            //         });
            //     }
            // });
        },
        /**
         * 催报人员选择处理
         * @author szc 2019-5-11 19:52:52
         */
        urgeToUserSelect (userData) {
            let me = this;
            let params = {
                title:"申请退回人员",
                eventListener:"sendfillmessage",//事件监听方法名
                dialogVisible:true,
                checkbox:true,
                type:"tree",
                id:'userReportRT',
                title: "申请退回人员",
                datas: userData,
                props:{
                    label: "label",
                    children: "children"
                }
            };

        },
        urgeToHandler(data,urgeParams) {
            let me = this,arr = [],userStr = "";
            data.forEach(item => {
                arr.push(item.suser);
            });
            userStr = arr.join(',');
            urgeParams.users = userStr;
            urgeToReport(urgeParams).then(res => {
                if(res.data.code == 200) {
                    me.inputValue = "已催报";
                    me.$message({
                        message:"催报成功！",
                        type:"success"
                    });
                }
            });
        },
        /**
         * 查询催报的目标人员。
         * @author szc 2019年4月2日16:10:51
         */
        queryUserByCompany(urgeParams){

            let me = this,companyId = me.selectCompany,userData = [];
            let params = {company:companyId};
            queryUrgeUsers(params).then(res => {
                if(res.data.code == 200){
                    me.urgeToHandler(res.data.data,urgeParams);
                //转换成对应的格式。
                // userData = me.parseTypeOfTree(res.data.data);
                // me.modalConfig.datas = userData;
                // me.urgeToUserSelect(userData);
                // return userData;
                }else if(res.data.code == 1001){
                    me.$message({
                        message:"此公司没有所属人员!",
                        type:"warning"
                    });
                }else{
                    me.$message.error(res.data.data);
                }
            });
        },
        parseTypeOfTree (data) {
      
            let me = this;
            data.forEach(item => {
                if(item){
                item.label = item.susername;
                }
            });
            return data;
        },
        /**
         * 处理设置类型
         */
        handlerTypeOfValue (scope) {
            let me = this,selectTable = me.selectTable;
            let value = scope.row[scope.column.property];
            if(value && selectTable && selectTable.valueLabel == "7"){
                if(scope.column.property == "B" || scope.column.property == "C"){
                    return value.toFixed(4);
                }else {
                    return value.toFixed(2);
                }
            }
            value = value? value:0; 
            return value.toFixed(2);
        },
        /**
         * 转换融资的 融资类型的转换
         */
        parseTypeOfFinance(key,itemOut) {
            let me = this;
            let financingOptions = this.financingOptions;
            if(financingOptions && financingOptions.length > 0){
                for(let i = 0;i < financingOptions.length;i ++){
                    let item = financingOptions[i];
                    if(itemOut[key] == item.text){
                        itemOut[key] = item.id;
                        break;
                    }
                }
            } 
        },
        /**
         * modal框关闭前。
         * @author szc 2019年5月8日16:20:16
         */
        beforeClose (done) {
            let me = this,selectOps = me.selectOps;
            selectOps.forEach(item => {
                item.valueLabel = "";
            });
            me.inputValue = "";
            me.valueLabel ="";
            me.tableData = [];
            me.auditMonth = false;
            done();
        }
    }
}
</script>
<style lang="scss" scoped>
    .modalTable {
        margin: 20px 0;
    }
    //el-input
    .fillSelect {
        .el-button {
            margin-left: 20px;
        }
        // .el-input {
        //     width: 202px;
        // }
        .btnClass {
            display: inline-block;
            // background-color: #ccc;
            float: right;
            padding-right: 20px;
        }
        .el-select {
            width: 60%;
        }
        .stateInput {
            width: 60%;
            display: inline-block;
            // .el-input {
            //     width: 60%;
            // }
        }
    }
</style>

