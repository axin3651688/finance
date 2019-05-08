<template>
    <el-dialog
    width="80%"
    :title="modalConfig.title||'上报人员'"
    :modal-append-to-body="false"
    :visible.sync="modalConfig.dialogVisible"
    >
        <div>
            <div class="fillSelect">
                <template v-for="(itemSel,index) in selectOps">
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
                    <el-input
                    v-else-if="modalConfig.id == 'urgeToReport' && itemSel.type && itemSel.type == 'input'"
                    placeholder="请选择报表"
                    v-model="input"
                    :disabled="true"
                    :key="index">
                    </el-input>
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
                </template>
                <el-button v-if="modalConfig.id != 'urgeToReport'" @click="queryHandler" class="button">确定</el-button>
                <div v-if="modalConfig.operationBtns" class="btnClass">
                    <el-button @click="urgeToBtnHandler" class="button">催报</el-button>
                </div>
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
                    >
                    </el-table-column>
                </template>
                </el-table>
            </div>
            <!-- 审阅批示的显示的内容 -->
            <div v-if="tableData && tableData.length > 0">
                <el-form :model="form" label-width="80px" :inline="true">
                    <el-form-item label="审阅结果">
                        <el-select v-model="form.result" placeholder="请选择">
                        <el-option label="通过" value="pass"></el-option>
                        <el-option label="不通过" value="noPass"></el-option>
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
    saveReview
} from "@/api/fill.js"

export default {
    name: "FillModal",
    props: ['modalConfig'],
    data() {
        return {
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
        }
    },
    created() {
        debugger;
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
        this.update();
    },
    mounted() {
        let me = this;
    },
    watch : {
        modalConfig(){
            debugger
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
            debugger;
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
            debugger;
            let me = this;
            if(item && item.id == "company"){
                me.selectCompany = item.valueLabel;
                me.matchShow = true;
                //根据公司显示不同的报表选项。
                me.tablesByCompany(item);
            }else if(item && item.id == "match") {
                me.selectTable = item;
            }
        },
        /**
         * 根据公司来判断要显示的报表。
         * @author szc 2019年5月8日10:12:08
         */
        tablesByCompany (item) {
            debugger;
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
            debugger;
            let me = this,isleaf = companyItem.nisleaf,selectTables = me.$store.fillParams.selectTables[0].content,resSelect = [];
            if(isleaf == '0'){
                let arr = ['10','12'];
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
        queryHandler () {
            debugger;
            let me = this;
            let params = {
                company: "1001",
                fixed: 0,
                period: "201711",
                subject: "1004",
                templateId: "12"
            };
            params = this.parseRequestParams(params);
            inquire(params).then(res => {
                debugger;
                if(res.data.code == 200){
                    me.columns = res.data.data.columns;
                    me.tableData = res.data.data.rows;
                    me.$message({
                        message: "成功！",
                        type: "success"
                    });
                }
            });
        },
        /**
         * 请求参数的转换。
         * @author szc 2019年5月7日17:43:21
         */
        parseRequestParams (params) {
            debugger;
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
            debugger;
            let me = this,formData = me.form,reviewParams = me.reviewParams,curSelectCompany = me.curSelectCompany[0],
                storeParams = me.$store.getters;
            if(formData){
                // me.queryStateOfTable();
                let params = {
                    "company": reviewParams.company,
                    "id": 0,
                    "nreportnum": 0,
                    "period": reviewParams.period,
                    "scompanyname": curSelectCompany.sname,
                    "screatetime": new data(),
                    "screateuser": storeParams.user.user.userName,
                    "statemun": me.modalConfig.itemObj.id,
                    "supdateuser": storeParams.user.user.userName,
                    "templateid": reviewParams.templateId,
                    "users": storeParams.user.user.userName
                }
                saveReview(params).then(res => {
                    if(res.data.code == 200){
                        me.$message
                    }
                });
            }
        },
        /**
         * 查询table的状态。
         * @author szc 2019年5月7日19:27:25
         */
        queryStateOfTable () {
            debugger;
            let me = this;
        },
        /**
         * 选择相应的表来进行催报。
         * @author szc 2019年5月7日20:22:15
         */
        urgeToBtnHandler () {
            debugger;
            let me = this;
        }
    }
}
</script>
<style lang="scss">
    .modalTable {
        margin: 20px 0;
    }
    //el-input
    .fillSelect {
        .el-button {
            margin-left: 20px;
        }
        .el-input {
            width: 202px;
        }
        .btnClass {
            display: inline-block;
            // background-color: #ccc;
            float: right;
            padding-right: 20px;
        }
    }
</style>

