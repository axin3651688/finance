<template>
    <!--
        name: sjz
        说明：参数设置-> 上市指标数据维护-> 信息维护
    -->
    <div id="cityMaintenance">
        <!-- 添加按钮 -->
        <div class="groupSetting_btn">
            <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="addClick" :disabled="disabled">添加</el-button>
        </div>
        <!-- 表格 -->
        <el-table
        class="cityMaintenance_table"
        :data="tableData"
        style="width: 100%"
        :height="heighter"
        stripe
        border>
            <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="scode" label="公司编码" width="260" align="center"></el-table-column>
            <el-table-column prop="sname" label="公司名称" width="360" align="left"></el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                    <el-button class="deleteBtn" @click="modifyClick(scope)" icon="el-icon-edit-outline" type="warning" size="medium" plain>修改</el-button>
                    <el-button class="deleteBtn" @click="deleteClick(scope)" icon="el-icon-circle-close-outline" type="warning" size="medium" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加弹出框 -->
        <el-dialog
            class="groupSetting_dialog"
            :title="title"
            :visible.sync="dialogVisible"
            width="25%"
            :show-close="false"
            :close-on-click-modal="false">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="公司编码：" prop="scode">
                    <el-input class="dialog_textarea" :rows="2" placeholder="请输入公司编码" v-model="form.scode" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="公司名称：" prop="sname">
                    <el-input class="dialog_textarea" :rows="2" placeholder="请输入公司名称" v-model="form.sname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determineClick('form')">保 存</el-button>
                <el-button @click="cancelClick('form')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    // 查询表格数据接口
    dim_listedcompany_query_all,
    // 添加企业接口
    dim_listedcompany_add,
    // 删除企业接口
    dim_listedcompany_delete,
    // 修改企业接口
    dim_listedcompany_update
} from '~api/cube.js';
export default {
    props: {
        height: Number
    },
    data(){
        var validateScode = (rule, value, callback) => { 
            let some ;
            if(!value){
                callback(new Error('请输入公司编码')) ;
            }else{
                if(this.stype == 1){
                    some = this.tableData.some((res, index) => { return res.scode === value }) ;
                    if(some){
                        callback(new Error('企业公司已重复')) ;
                    }else{
                        callback() ;
                    }
                } else {
                    callback() ;
                }         
            }
        };
        var validateSname = (rule, value, callback) => {
            let some ;
            if(!value){
                callback(new Error('请输入公司名称')) ;
            }else{
                if(this.stype == 1){
                    some = this.tableData.some((res, index) => { return res.sname === value }) ;
                    if(some){
                        callback(new Error('企业公司已重复')) ;
                    }else{
                        callback() ;
                    }
                }else{
                    some = this.tableData2.some((res, index) => { return res.sname === value }) ;
                    if(some){
                        callback(new Error('企业公司已重复')) ;
                    }else{
                        callback() ;
                    }
                }                
            }
        };
        return {
            disabled: false ,
            tableData: [] ,
            tableData2: [],
            tableData3: [],
            dialogVisible: false ,
            readonly: false ,   // 是否只读属性
            title: "",
            stype: 0 ,          // 修改状态/添加状态
            form : {
                scode: "",
                sname: ""
            },
            // 验证
            rules: {
                scode: [{validator: validateScode, trigger: 'blur', required: true}],
                sname: [{validator: validateSname, trigger: 'blur', required: true}]
            }
        }
    },
    created(){},
    mounted(){
        // 查询表格数据
        this.dimIndex_query_by_stypeA() ;
    },
    computed: {
        heighter(){
            return this.height ;
        }
    },
    methods: {
        /**
         * @description 查询表格数据
         */
        dimIndex_query_by_stypeA(){
            let me = this ;
            dim_listedcompany_query_all().then(res => { 
                if(res.data.code === 200){
                    me.tableData = res.data.data ;
                    if(me.tableData.length >= 9){
                        me.disabled = true ;
                    }else{
                        me.disabled = false ;
                    }
                }else{
                    me.$message.error('查询数据失败！请添加企业数据！') ;
                }
            });
        },
        /**
         * @description 添加按钮
         */
        addClick(){
            let me = this ;
            me.title = "新增公司信息" ;
            me.stype = 1 ;
            me.readonly = false ;
            me.dialogVisible = true ;
            me.form = {
                scode : "" ,
                sname : ""
            }
        },
        /**
         * @description 修改按钮
         */
        modifyClick(scope){ 
            let me = this ; 
            me.tableData2 = []; me.tableData3 = [] ;
            me.title = "修改公司信息" ;
            me.dialogVisible = true ;
            me.readonly = true ;
            me.tableData2 = me.tableData.filter((res, index) => { return res.scode != scope.row.scode }) ;
            me.tableData3 = me.tableData.filter((res, index) => { return res.scode == scope.row.scode }) ;
            me.stype = 0 ; 
            me.form = {
                scode : scope.row.scode ,
                sname : scope.row.sname
            }
        },
        /**
         * @description 删除按钮
         */
        deleteClick(scope){
            let me = this ;
            let params = [scope.row.scode] ;
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                dim_listedcompany_delete(params).then(res => {
                    if(res.data.code === 200){
                        me.dimIndex_query_by_stypeA() ;
                        me.$message({ message: "删除成功！", type: "success" }) ;
                    }else{
                        me.$message.error('删除失败！') ;
                    }
                }); 
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除' });          
            });
        },
        /**
         * @description 保存按钮
         */
        determineClick(form){
            let me = this ;
            let params ;
            me.$refs[form].validate((valid) => { 
                if (valid && me.stype==1) {     // 添加状态
                    params = [{
                        scode: me.form.scode,
                        sname: me.form.sname,
                        spcode: "Z"
                    }]
                    dim_listedcompany_add(params).then(res => {
                        if(res.data.code === 200){
                            me.dimIndex_query_by_stypeA() ;
                            me.cancelClick("form") ;
                            me.$message({ message: "添加成功！", type: "success" }) ;
                        }else{
                            me.$message.error('添加失败！') ;
                        }
                    });
                } else if (valid && me.stype==0) {  // 修改状态
                    if(me.getIsChanger()) {
                        me.$message({ message: "暂无改动！", type: "warning" }) ;
                    } else {
                        params = [{
                            scode: me.form.scode ,
                            sname: me.form.sname ,
                            spcode: "Z"
                        }]
                        dim_listedcompany_update(params).then(res => {
                            if(res.data.code === 200){
                                me.dimIndex_query_by_stypeA() ;
                                me.cancelClick("form") ;
                                me.$message({ message: "修改成功！", type: "success" }) ;
                            }else{
                                me.$message.error('修改失败！') ;
                            }
                        }) ;
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * @description 取消按钮
         */
        cancelClick(form){
            let me = this ;
            me.dialogVisible = false ;
            me.$refs[form].resetFields();
        },
        /**
         * @description 判断有无改动
         */
        getIsChanger(){ //debugger
            let isTrue ; 
            for(let key in this.form){
                if(this.form[key] == this.tableData3[0][key]) {
                    isTrue = true ;
                } else {
                    return false ;
                }
            }
            return isTrue ;
        }
    }
}
</script>
<style scoped>
    /* 添加按钮样式 */
    .groupSetting_btn {
        text-align: right ;
        margin-right: 10px;
        padding: 0 10px 10px 0 ;
    }
    /* 添加弹出框的选择器宽度 */
    .dialog_select {
        width: 100%;
    }
    /* 表格背景 */
    .cityMaintenance_table {
        background-color: #F0F2F5;
    }
</style>
<style>
    /** 删除按钮图标颜色 */
    .deleteBtn .el-icon-circle-close-outline {
        color: #ff0000 ;
    }
    /** 添加弹出框头部内边距 */
    .groupSetting_dialog .el-dialog .el-dialog__header {
        border-bottom: 1px solid #ccc;
        padding: 10px 0px 10px 10px;
    }
    /** 添加弹出框按钮的内边距 */
    .groupSetting_dialog .el-dialog .el-dialog__footer {
        padding: 0 20px 20px 0 ;
    }
    /** 添加弹出框内容的内边距 */
    .groupSetting_dialog .el-dialog .el-dialog__body {
        padding: 20px 20px 0px 0 ;
    }
    /** 添加弹出框文本框的高度 */
    .dialog_textarea .el-textarea__inner{
        height: 100px;
    }
    /** 这是对表头的行高设置*/
    .el-table__header tr, .el-table__header th {
        padding: 0;
        height: 45px;
    }
    /** 这是对表行的行高设置*/
    .el-table__body tr, .el-table__body td {
        padding: 0;
        height: 32px;
    }
    /** 这是对表头的背景颜色设置*/
    .has-gutter tr th {
        background-color: rgb(240, 248, 255);
        text-align: center;
    }
    /** 这是对表头文本的样式设置*/
    .el-table td, .el-table th{
        /* text-align: center;  */
    }
</style>
