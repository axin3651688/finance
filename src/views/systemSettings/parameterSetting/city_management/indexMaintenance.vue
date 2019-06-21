<template>
    <!--
        name: sjz
        说明：参数设置-> 行业指标数据维护-> 指标维护
    -->
    <div id="groupSetting">
        <!-- 添加按钮 -->
        <div class="groupSetting_btn">
            <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="addClick" :disabled="disabled">添加</el-button>
        </div>
        <!-- 表格 -->
        <el-table
        :data="tableData"
        style="width: 100%"
        :height="heighter"
        stripe
        border>
            <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sname" label="指标名称" width="360" align="center"></el-table-column>
            <el-table-column prop="sdescription" label="说明" align="left" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
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
                <el-form-item label="指标名称：" prop="scode">
                    <el-select class="dialog_select" v-model="form.scode" placeholder="请选择指标" @change="changeClick">
                        <el-option v-for="item in options" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                    </el-select>
                    <div class="el-form-item__error">{{ text }}</div>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input class="dialog_textarea" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.sdescription"></el-input>
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
    // 添加弹出框指标选择器接口
    dim_target_queryall_bystype,
    // 表格展现接口
    dimIndex_query_by_stype,
    // 添加接口
    dimIndex_add,
    // 删除接口
    dimIndex_delete
} from '~api/cube.js'
import { helper } from 'handsontable';
export default {
    props: {
        height: Number
    },
    data(){
        return {
            tableData: [],              // 表格的数据
            dialogVisible: false ,      // 弹出框的控制显现与隐藏
            title: "新增指标信息",       // 弹出框标题
            options:[],                 // 弹出框指标选择器数据
            inform: [],                 // 选中值发生变化时的数据
            disabled: false,            // 控制添加按钮的禁用与启用（>9）
            disabled: false,            // 控制添加按钮的禁用与启用（>9）
            isTrue: false ,             // 判断是否重复
            form: {                     // form表单
                scode: "" ,
                sdescription: ""
            },
            rules: {                    // 验证
                scode: [{ required: true, message: '请选择指标名称', trigger: 'blur' },]
            }
        }
    },
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
            let params = { stype: "SQY" } ;
            dimIndex_query_by_stype(params).then(res => {
                if(res.data.code === 200){
                    me.tableData = res.data.data ;
                    if(me.tableData.length >= 9){
                        me.disabled = true ;
                    }else{
                        me.disabled = false ;
                    }
                } else {
                    me.tableData = [] ;
                    me.$message.error(res.data.msg + '，请添加数据！') ;
                }
            });
        },
        /**
         * @description 添加按钮
         */
        addClick(){
            let me = this ;
            me.dialogVisible = true ;
            let params = { stype: "SQY" };
            dim_target_queryall_bystype(params).then(res => {
                if(res.data.code === 200){
                    me.options = res.data.data ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @description 选中值发生变化时触发
         */
        changeClick(value){
            let me = this ;
            me.inform = [];
            me.inform = me.options.filter((res, index) => { return res.scode == value }) ;
            me.form.sdescription = me.inform[0].sdescription ;
            me.isTrue = me.tableData.some(res => { return res.scode == value }) ;
            if(!me.isTrue){
                let cc = document.getElementsByClassName('el-input__inner')[0].style ;
                cc.borderColor= "#67c23a";
                me.text = "" ;
            }else{
                let cc = document.getElementsByClassName('el-input__inner')[0].style ;
                cc.borderColor= "#f56c6c";
                me.text = "指标名称已重复" ;
            }
        },
        /**
         * @description 添加弹出框-保存按钮
         */
        determineClick(form){
            let me = this ;
            me.$refs[form].validate((valid) => { 
                if (valid && !me.isTrue) {
                    let params = [{
                        scode: me.inform[0].scode ,
                        sname: me.inform[0].sname ,
                        stype: "SQY" ,
                        sunit: me.inform[0].sunit ,
                        sdescription: me.form.sdescription
                    }]
                    dimIndex_add(params).then(res => { 
                        if(res.data.code === 200){
                            me.form.sdescription = "" ;
                            me.dimIndex_query_by_stypeA() ;
                            me.cancelClick("form") ;
                        } else {
                            me.$message.error("添加失败！") ;
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        /**
         * @description 添加弹出框-取消按钮
         */
        cancelClick(form){
            this.dialogVisible = false ;
            let cc = document.getElementsByClassName('el-input__inner')[0].style ;
            cc.borderColor= "#dcdfe6";
            this.text = "" ;
            this.$refs[form].resetFields();
        },
        /**
         * @description 表格内-删除按钮
         */
        deleteClick(scope){
            let me = this ;
            let params = [scope.row.scode] ;
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                dimIndex_delete(params,"SQY").then(res => { 
                    if(res.data.code === 200){
                        me.$message({ type: "success", message: res.data.msg }) ;
                        me.dimIndex_query_by_stypeA() ;
                    } else {
                        me.$message.error('删除失败！') ;
                    }
                });
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除' });          
            });
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
