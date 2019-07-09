<template>
    <el-dialog
    width="90%"
    :title="modalConfig.title||'上报人员'"
    :modal-append-to-body="false"
    :visible.sync="modalConfig.dialogVisible"
    :before-close="beforeClose"
    >
        <div>
            <div>
                <span class="dialog-footer" v-if="tableData && (tableData.length > 0 || modalConfig.row.nopratebuttonname == '退回')&& reviewShow && modalConfig.row.nopratebuttonname != '查看'">
                    <el-button type="primary" @click="submitForm">{{ modalConfig.row.nopratebuttonname == '退回'? '退回':'通过' }}</el-button>
                </span>
            </div>
            <div class="modalTable">
                <el-table
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
            <!-- <div v-if="tableData && tableData.length > 0 && reviewShow && modalConfig.row.nopratebuttonname != '查看'">
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
            </div> -->
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
import tool from '@/utils/tools.js'

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
    },
    mounted() {},
    watch : {},
    methods: {
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
        /**
         * 查询table的数据。
         * @author szc 2019年5月8日16:50:13
         */
        queryDataOfTable (params) {
            let me = this;
            inquire(params).then(res => {
                if(res.data.code == 200){
                    let columns = res.data.data.columns,arr = ['id','id_','item','ssrccode'];
                    columns = columns.filter(item => {
                        return arr.indexOf(item.id) == -1;
                    });
                    me.columns = columns;
                    res.data.data.rows = me.queryDataAfter(res.data.data.rows,params);
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
         * 查询数据之后。
         * @author szc 2019年6月6日11:50:16
         */
        queryDataAfter (data,params) {
            let me = this;
            if(params.templateId == 8){
                data = data.filter(item => {
                    return item.accountbanks != "";
                });
            }
            return data;
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
            let me = this,requestParams = me.modalConfig.requestParams,storeParams = me.$store.getters,
                row = me.modalConfig.row,statemunStr = me.modalConfig.row.nopratebuttonname == '退回'? 4:3;
                // me.queryStateOfTable();/zjb/update_fill_message
            let params = {
                "company": requestParams.company,
                "id": 0,
                "nreportnum": 0,
                "period": requestParams.period,
                "scompanyname": row.companyname,
                "screatetime": new Date(),
                "screateuser": storeParams.user.user.userName,
                "statemun": statemunStr,
                "supdateuser": storeParams.user.user.userName,
                "templateid": requestParams.templateId
            }
            let inputMsg = "已审阅";
            if(statemunStr == 4){
                inputMsg = "已退回";
            }
            saveReview(params).then(res => {
                if(res.data.code == 200){
                    me.inputValue = inputMsg;
                    me.reviewShow = false;
                    me.$message({
                        message: statemunStr == 3? "审阅成功！":"退回成功！",
                        type: "success"
                    });
                    me.$emit("publicEvent",me.modalConfig.row)
                    // me.form.result = "";
                    // me.form.explain = "";
                }
            });
        },
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
            let me = this,selectTable = me.modalConfig.templateParams;
            let value = scope.row[scope.column.property],unit = "";
            if(typeof value == "string" && value.indexOf("%") != -1){
                unit = "%";
                value = value.replace("%","") - 0;
            }
            //value不能为null
            value = value? value:0;
            if(value && selectTable && selectTable.templateId == "7"){
                if(scope.column.property == "B" || scope.column.property == "C"){
                    // return value.toFixed(4);
                    return tool.currency(value,'',4);
                }else {
                    // return value.toFixed(2);
                    return tool.currency(value,'',2);
                }
            }
            value = tool.currency(value,'',2);; 
            return unit? value + unit:value;
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
            // let me = this,selectOps = me.selectOps;
            // selectOps.forEach(item => {
            //     item.valueLabel = "";
            // });
            // me.inputValue = "";
            // me.valueLabel ="";
            // me.tableData = [];
            // me.auditMonth = false;
            let me = this;
            me.reviewShow = true;
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
    .dialog-footer {
        float: right;
        margin-bottom: 10px;
    }
</style>

