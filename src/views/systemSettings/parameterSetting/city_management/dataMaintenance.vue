<template>
    <!--
        name: sjz
        说明：参数设置-> 市企对标数据维护-> 数据维护
    -->
    <div id="groupSetting">
        <!-- 添加按钮 -->
        <div class="groupSetting_select">
            <span>企业选择：</span>
            <el-select v-model="value" placeholder="请选择企业" @change="selectChange" clearable>
                <el-option v-for="item in options" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
            </el-select>
            <!-- <span class="groupSetting_unit">单位：万元</span> -->
        </div>
        <div class="groupSetting_btn">
            <el-button plain type="primary" @click="saveClick">保 存</el-button>
            <el-button plain type="warning" @click="resetClick">重 置</el-button>
        </div>
        <!-- 表格 -->
        <el-table
        class="cityMaintenance_table"
        :data="tableData2"
        style="width: 100%"
        :height="heightes"
        stripe
        border>
            <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sname" label="指标名称" width="360" align="left"></el-table-column>
            <el-table-column prop="val" label="数值" width="260" align="center">
                <template slot-scope="scope">
                    <!-- <el-input class="data_input" placeholder="输入数值" :readonly="readonly" v-model="scope.row.val">
                        <template slot="append"><i class="el-icon-edit-outline"></i></template>
                    </el-input> -->
                    <el-input class="data_input" size="small" @change="handleClick(scope)" v-model="scope.row.val" :placeholder="placeholder" :readonly="readonly"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import tools from 'utils/tools.js';
import {
    // 表格展现接口（查询）
    // dim_target_query_all
    // dimIndex_queryfact_bystype
    fcattarget_query_by_fcattarget,
    // 保存接口
    fcattarget_add
} from '~api/cube.js'
export default {
    props: {
        height: Number
    },
    data(){
        return {
            tableData2: [] ,
            options: [] ,
            readonly: false ,
            value: "",
            placeholder: ""
        }
    },
    created(){
        
    },
    mounted(){
        // 表格展现查询
        // this.gettableData_request() ;
    },
    computed: {
        heightes(){
            return this.height ;
        }
    },
    methods: {
        /**
         * @description 表格展现查询
         */
        gettableData_request(){ 
            let me = this ;           
            let $params = me.$store.state.prame.command;
            let params = {
                company: me.value ,
                period: me.getPeriod($params) ,
                stype: "SQY" ,
                target: ''
            }
            // if(me.value == ""){
            //     me.$message({ message: "请选择企业", type: "warning" }) ;
            //     return false ;
            // }
            fcattarget_query_by_fcattarget(params).then(res => {
                if(res.data.code === 200) {
                    let data = res.data.data ;
                    data.forEach((res,index) => {
                        if(res.fact_a == 0){
                            res.fact_a = null ;
                        }else{
                            res.val = tools.currency(res.fact_a, '' , 2) ;
                        }
                        res.scode = res.zb ;
                        res.sname = res.zbmc ;
                        res.isEdit = true ;
                    });
                    me.tableData2 = data ;
                    if(me.value == ""){
                        me.placeholder = "请选择企业" ;
                        me.readonly = true ;
                    }else{
                        me.placeholder = "请输入数值" ;
                        me.readonly = false ;
                    }
                } else {
                    me.$message.error("数据维护查询失败！") ;
                }
            });
        },
        /**
         * @description 日期处理
         */
        getPeriod($params){
            let month = $params.month ;
            let year = $params.year ;
            if(month > 0 && month < 10){
                month = '0' + month ;
            }else {
                month = month ;
            }
            return year + month ;
        },
        /**
         * @description 选中值发生变化时触发
         */
        selectChange(val){
            this.gettableData_request() ;
        },
        /**
         * @description 输入数值改变时触发
         */
        handleClick(scope){ 
            // debugger
            let me = this ;
            let regex = /\((.+?)\)/g ;
            let t = scope.row.val ; // 负数用到，先把输入的值赋值
            let options = scope.row.sname.match(regex) ; // 得到小括号内的内容 
            scope.row.val = scope.row.val.replace(/[^\d.]/g,"");  // 清除“数字”和“.”以外的字符            
            if(scope.row.val != "" && scope.row.val != 0){
                let option = options[0] ; // 得到字符串                
                let rus = option.substring(1, option.length - 1); // 得到小括号内的内容 / 截取（）取出内容                               
                scope.row.val = scope.row.val.replace(/\.{2,}/g,"."); // 只保留第一个. 清除多余的  
                scope.row.val = scope.row.val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
                scope.row.val = Math.decimalToLocalString(scope.row.val) ; // 已处理好的千分位，两位小数
                scope.row.val = scope.row.val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数  
                if(scope.row.val.indexOf(".")< 0 && scope.row.val !=""){ // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                    scope.row.val= parseFloat(scope.row.val); 
                }
                if(t.charAt(0) == "-"){ // 是不是'-'开头，如果是，则拼接上，否则不是负数不予理会。
                    scope.row.val  = '-' + scope.row.val ;
                }
                // 修改的省份
                scope.row.isEdit = false ;
                // 输入数字(string => number)
                scope.row.fact_a = t.replace(/^0/, "") - 0 ;
                // 改变字体颜色
                me.getStyleColor("modify", scope) ;
            }else{
                scope.row.val = "" ;
                scope.row.fact_a = null ;
                scope.row.isEdit = false ;
            }
        },
        /**
         * @description 颜色处理
         */
        getStyleColor(vax, scope){ 
            let index = 0 ;
            let len = this.tableData2.length ;
            let cc = document.getElementsByClassName('data_input')[0].children[0].className ;
            if(scope!=null)index = scope.$index + 1 ;
            if(vax == "reset"){
                for(let i=0 ; i < len ; i++){
                    document.getElementsByClassName(cc)[i].style.color= "#000" ;                    
                }
            }else{
                document.getElementsByClassName(cc)[index].style.color= "#ff0000" ;
            }     
        },
        /**
         * @description 保存按钮
         */
        saveClick(){ //debugger
            let me = this ;
            let isEdit = [] ;
            let params = [] ;
            let $params = me.$store.state.prame.command;
            let isTrue = me.tableData2.some((res, index) => { return !res.isEdit }) ;
            if(!isTrue){
                me.$message({ message: "暂无修改！" , type: "warning" }) ;
            }else{
                isEdit = me.tableData2.filter((res, index) => { return !res.isEdit }) ;
                isEdit.forEach((res, index) => {
                    params.push({
                        id: res.id || 0,
                        company: me.value,
                        period: me.getPeriod($params),
                        target: res.scode ,
                        stype: "SQY",
                        fact_a: res.fact_a || 0
                    });
                });
                me.$confirm('保存该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fcattarget_add(params).then(res => {
                        if(res.data.code === 200){
                            me.gettableData_request() ;
                            me.getStyleColor("reset") ;
                            me.$message({ type: 'success', message: '保存成功!' });
                        }else{
                            me.$message.error('保存失败！') ;
                        }
                    });
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消保存' });          
                });
            }
        },
        /**
         * @description 重置按钮
         */
        resetClick(){
            let isTrue = this.tableData2.some((res, index) => { return !res.isEdit }) ;
            if(!isTrue){
                this.$message({ type: 'warning', message: '暂无更改!' }) ;
            }else{           
                this.$confirm('重置该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.gettableData_request() ;
                    this.getStyleColor("reset") ;
                    this.$message({ type: 'success', message: '重置成功!' });
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消重置' });          
                });
            }
        }
    }
}
</script>
<style scoped>
.groupSetting_select {
    margin-bottom: 10px;
    float: left;
}
.groupSetting_btn {
    float: right ;
    margin-right: 17px;
}
.groupSetting_unit {
    margin-left: 20px;
}
.cityMaintenance_table {
    background-color: #F0F2F5;
}
</style>
<style>
/** 数值框输入框 */
.data_input .el-input__inner {
    border-top: 1px solid #fff ;
    border-left:1px solid #fff ;
    border-right: 1px solid #fff ;
    border-bottom: 1px solid blue ;
    padding: 0 15px -10px 15px;
    border-radius: 0 ;
    text-align: right;
}
/** 图标手型 */
.data_input .el-input-group__append {
    cursor: pointer;
}
/** 光标移入变色 */
.data_input .el-input-group__append:hover { color: #ffd04b ; }
</style>
