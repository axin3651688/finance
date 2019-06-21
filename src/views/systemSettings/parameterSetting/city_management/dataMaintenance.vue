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
            <span class="groupSetting_unit">单位：万元</span>
        </div>
        <div class="groupSetting_btn">
            <el-button plain type="primary">保 存</el-button>
            <el-button plain type="warning">重 置</el-button>
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
                    <el-input class="data_input" size="small" @change="handleClick(scope)" v-model="scope.row.val" placeholder="请输入数值"></el-input>
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
    fcattarget_query_by_fcattarget
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
            value: ""
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
                company: "" ,
                period: me.getPeriod($params) ,
                stype: "SQY" ,
                target: me.value
            }
            fcattarget_query_by_fcattarget(params).then(res => {
                if(res.data.code === 200) {
                    let data = res.data.data ;
                    data.forEach((res,index) => {
                        res.scode = res.cs ;
                        res.sname = res.zbmc ;
                        res.val = tools.currency(res.fact_a, '' , 2) ;
                    });
                    me.tableData2 = data ;
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
            let val = scope.row.val ;
            scope.row.val = val.replace(/[^\d]/g,'') //输入时校验 只能输入数字
            if(val && (val != 0 || val != "")){
                scope.row.val = tools.currency(val,'',2); // 千分位两位小数处理
                scope.row.fact_a = val ;
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
