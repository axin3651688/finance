<template>
    <!--
        name: sjz
        说明：参数设置-> 国资指标数据维护-> 数据维护
    -->
    <div id="groupSetting">
        <!-- 添加按钮 -->
        <!-- <div class="groupSetting_btn">
            <el-button type="primary" plain @click="addClick">保 存</el-button>
            <el-button @click="resetClick">重 置</el-button>
        </div> -->
        <!-- 表格 -->
        <el-table
        :data="tableData2"
        style="width: 100%"
        :height="heightes"
        stripe
        border>
            <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sname" label="指标名称" width="360" align="center"></el-table-column>
            <el-table-column prop="val" label="数值" width="260" align="center">
                <template slot-scope="scope">
                    <span>{{ getValue(scope) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {
    // 表格展现接口（查询）
    dimIndex_queryfact_bystype
} from '~api/cube.js'
export default {
    props: {
        height: Number
    },
    data(){
        return {
            tableData2: [] ,
            readonly: true 
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
                company: $params.company ,
                period: me.getPeriod($params) ,
                stype: "GZW" ,
                fact: "B"
            }
            dimIndex_queryfact_bystype(params).then(res => {
                if(res.data.code === 200) {
                    me.tableData2 = res.data.data ;
                } else if(res.data.code === 1001) {
                    me.$message(res.data.msg) ;
                } else {
                    me.$message.error(res.data.msg) ;
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
         * @description 数值处理（千分位，两位小数）
         */
        getValue(scope){
            debugger
            let val = scope.row.val ;
            let num ;
            if(val && val != 0){
                num = tools.currency(val,'',2) ;
            }else{
                num = "--" ;
            }
            return num ;
        }
    }
}
</script>
<style scoped>

</style>
<style>
/** 数值框输入框 */
.data_input .el-input__inner {
    border-top: 1px solid #fff ;
    border-left:1px solid #fff ;
    /* border-right: 1px solid #fff ; */
    border-bottom: 1px solid blue ;
    padding: 0 15px -10px 15px;
    border-radius: 0 ;
}
/** 图标手型 */
.data_input .el-input-group__append {
    cursor: pointer;
}
/** 光标移入变色 */
.data_input .el-input-group__append:hover { color: #ffd04b ; }
</style>
