<template>
    <!--
        name: sjz
        说明：参数设置-> 行业指标数据维护-> 数据维护
    -->
    <div id="industrySetting">
        <!-- 添加按钮 -->
        <div class="groupSetting_select">
            <span>指标选择：</span>
            <el-select v-model="value" placeholder="请选择" @change="selectChange" clearable filterable class="is_select">
                <el-option v-for="item in options" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
            </el-select>
            <span class="groupSetting_unit">单位：{{ sunit }}</span>
        </div>
        <div class="groupSetting_btn">
            <el-button plain type="primary" @click="saveClick">保 存</el-button>
            <el-button plain type="warning" @click="resetClick">重 置</el-button>
        </div>
        <!-- 表格 -->
        <el-table
        class="industry_table"
        :data="tableData2"
        style="width: 100%"
        :height="heightes"
        stripe
        border>
            <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sname" label="地区名称" width="360" align="left"></el-table-column>
            <el-table-column prop="val" label="数值" width="260" align="right">
                <template slot-scope="scope">
                    <vue-numeric id="inputId" :class="getClassColor(scope)" separator="," v-model="scope.row.fact_a" :minus="true" :precision="2"
                        :read-only="readonly"></vue-numeric>

                    <!-- <el-input class="data_input" placeholder="输入数值" :readonly="readonly" v-model="scope.row.val"> -->
                        <!-- <template slot="append"><i class="el-icon-edit-outline"></i></template> -->
                    <!-- </el-input> -->
                    <!-- <el-input class="data_input" size="small" @change="handleClick(scope)" v-model="scope.row.val" :placeholder="placeholder" :readonly="readonly"></el-input> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import tools from 'utils/tools';
import VueNumeric from 'vue-numeric'
import {
    // 表格展现接口（查询）
    fcattarget_query_by_fcattarget,
    // 保存接口
    fcattarget_add
} from '~api/cube'
export default {
    components:{VueNumeric},
    props: {
        height: Number
    },
    data(){
        return {
            tableData2: [] ,
            tableData3: [] ,
            options: [] ,
            readonly: false ,
            value: "",
            placeholder: "" ,
            sunit: "",
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
        getClassColor(scope){
            if(scope.$index % 2 == 0){
                return "inputId_first" ;
            } else {
                return "inputId_second" ;
            }
        },
        /**
         * @description 表格展现查询
         */
        gettableData_request(){ 
            let me = this ;           
            let $params = me.$store.state.prame.command;
            let params = {
                company: "",
                period: me.getPeriod($params) ,
                stype: "HY",
                target: me.value
            }
            fcattarget_query_by_fcattarget(params).then(res => { 
                if(res.data.code === 200) {
                    let data = res.data.data ;                   
                    data.forEach((res,index) => {
                        if(!res.fact_a){
                            res.fact_a = 0 ;
                        }
                        res.scode = res.cs ;
                        res.sname = res.csmc ;
                        res.isEdit = false ;
                        res.isEdit2= 0 ;
                    });
                    me.tableData2 = data ;
                    let arr = me.deepClone(data);
                    me.tableData3 = arr ;
                    if(me.value === "") {
                        me.readonly = true ;
                    }else {
                        me.readonly = false;
                    }
                } else {
                    me.$message.error("数据维护查询失败！") ;
                }
            });
        },
        deepClone(obj) { //深拷贝
            let result = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        result[key] = this.deepClone(obj[key]); //递归复制
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
        /**
         * @description 选中值发生变化时触发
         */
        selectChange(val){ 
            if(!val){
                this.sunit = "" ;
            } else {
                // 单位
                let opt = this.options.filter((res, index) => { return res.scode == val }) ;
                if(opt[0].sunit == "unit") {
                    this.sunit = "万元" ;
                } else {
                    this.sunit = opt[0].sunit ;
                }
            }
            this.gettableData_request() ;
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
         * @description 重置按钮
         */
        resetClick(){ 
            let isTrue = false ;
            let me = this ;
            me.tableData2.forEach(item => {
                me.tableData3.forEach(item2 => {
                    if(item.sname == item2.sname){
                        if(item.fact_a == item2.fact_a){

                        }else{
                            isTrue = true ;
                        }
                    }
                })
            })
            if(!isTrue){
                me.$message({ message: "暂无修改!", type: "warning" }) ;
            }else{           
                me.$confirm('重置该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    me.$message({ type: 'success', message: '重置成功!' });
                    me.gettableData_request() ;
                    // this.getStyleColor("reset") ;
                    
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消重置' });          
                });
            }
        },
        /**
         * @description 保存按钮
         */
        saveClick(){
            // debugger
            let me = this ;
            let params = [] ;
            let isTrue = false ;
            let $params = me.$store.state.prame.command;
            me.tableData2.forEach(item => {
                me.tableData3.forEach(item2 => {
                    if(item.sname == item2.sname){
                        if(item.fact_a == item2.fact_a){

                        }else{
                            isTrue = true ;
                        }
                    }
                })
            })
            if(!isTrue){
                me.$message({ message: "暂无修改!", type: "warning" }) ;
                return false ;
            }
            me.tableData2.forEach((res, index) => { 
                params.push({
                    id: res.id || 0,
                    company: res.scode,
                    period: me.getPeriod($params),
                    target: me.value,
                    stype: "HY",
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
                        me.$message({ type: 'success', message: '保存成功!' });
                        // me.readonly = true ;
                        me.gettableData_request() ;
                        // me.getStyleColor("reset") ;
                    }else{
                        me.$message.error('保存失败！') ;
                    }
                });
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消保存' });          
            });
        }
    }
}
</script>
<style scoped>
.is_select {
    width: 300px ;
}
.groupSetting_select {
    margin-bottom: 10px;
    float: left;
}
.groupSetting_btn {
    float: right ;
    margin-right: 17px;
}
.groupSetting_unit {
    margin-left: 20px ;
}
</style>
<style>
/** 数值框输入框 */
/* .el-input__inner */
#inputId  {
    border: 0px;
    border-radius: 0 ;
    width: 100%;
    text-align: right;
    height: 32px;
    color: #606266;
    font-size: 14px;
}
#inputId:hover {
    background-color: #f5f7fa;
}
.inputId_first {
    background-color: #fff;
}
.inputId_second {
    background-color: #FAFAFA;
}
/** 图标手型 */
.data_input .el-input-group__append {
    cursor: pointer;
}
/** 光标移入变色 */
.data_input .el-input-group__append:hover { color: #ffd04b ; }
.industry_table .el-table__header .has-gutter .gutter { background-color: #F0F2F5 !important; }
.industry_table { background-color: #F0F2F5; }
</style>
