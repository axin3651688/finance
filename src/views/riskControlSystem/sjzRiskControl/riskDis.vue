<template>
    <!--
        name: 风险识别
        time: sjz 2019/5/6 9:40:00
    -->
    <div id="riskDis">
        <!-- 
            响应式布局：
            1. xs <768px 响应式栅格数或者栅格属性对象
            2. sm ≥768px 响应式栅格数或者栅格属性对象
            3. md ≥992 响应式栅格数或者栅格属性对象
            4. lg ≥1200 响应式栅格数或者栅格属性对象
            注：全局最大为24
        -->
        <el-row :gutter="10">
            <el-col :xs="12" :md="24" :lg="24">
                <div class="elbtn" style="float: left">
                    <!-- 按钮 -->
                    <el-button-group class="iconbtn">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="dialogFormVisible = true">添加</el-button>
                        <el-button type="primary" icon="el-icon-circle-close-outline" plain @click="deleteRow">删除</el-button>
                        <el-button type="primary" icon="el-icon-refresh" plain @click="refreshRow">刷新</el-button>
                        <el-button type="primary" plain v-show="isbtnShow"><i class="iconfont icon-batch-import"></i>批量下达</el-button>
                        <el-button type="primary" plain>下达记录查询</el-button>
                        <el-button type="primary" plain><i class="iconfont icon-daoru"></i>导入</el-button>
                        <el-button type="primary" plain><i class="iconfont icon-daochu"></i>导出</el-button>
                    </el-button-group>
                </div>
                <!-- <div class="elbtn" style="float: left" v-html="html">divided</div> -->
                <div class="elbtn" style="float: right;marginRight: 10px;">  
                    <!-- 列控制显示按钮 -->
                    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="false">
                        <el-button type="primary" plain icon="el-icon-menu"></el-button>
                        <el-dropdown-menu slot="dropdown" style="height: 100%; overflow: auto">
                            <el-dropdown-item  v-for="(item,index) in items" :key="index"  :command="item.id" divided>
                                <el-checkbox v-model="!item.determine" @change="checkbox(item.id)" >{{ item.text }}</el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <div class="table">
            <el-table
            class="table-call"
            :data="tableData"
            stripe
            highlight-current-row
            style="width: 100%;"
            :height="heights"
            :cell-style="cellStyle"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
            border>
                <el-table-column 
                v-for="element in elements"
                v-if="!element.determine"
                :type="element.type"
                :key="element.index" 
                :prop="element.id" 
                :label="element.text"
                :width="element.width"
                align="center" 
                >
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="135" align="center" >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData4)">查看</el-button>
                        <el-button type="text" size="small" @click.native.prevent="modifyRow(scope.$index, tableData4)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="风险评估与识别" :visible.sync="dialogFormVisible" :width="widths" style="marginTop: -15vh;">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <dia-log :riskTableRow="riskTableRow" :fsgl="tableDemo1" :yxcd="tableDemo2"></dia-log>
        </el-dialog>
    </div>
</template>
<script>
// 引用弹出框组件
import diaLog from "@v/riskControlSystem/sjzRiskControl/dialog";
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
// 引用接口1.（获取数据）
import { findThirdPartData, findDesignSource } from "~api/interface";
// 引用接口2.（获取数据）
import { 
    riskprobability, 
    risk_influence_degree,
    deleteRiskdistinguish
} from "~api/cube.js"
// 引用vuex
import { mapGetters, mapActions } from "vuex";
export default {
    components: {
        diaLog
    },
    name: "riskDis",
    data(){
        return {
            heights: 0,         // 表格的高度
            widths: "960px",    // 弹出框的宽度
            html: "",           // 文字
            tableData: [],      // 表格的数据
            elements: [],       // 表格的列
            items: [],          // 控制列显示【作用于列选择按钮】
            dialogFormVisible: false,   // 默认弹出框不显示
            // 
            riskTableRow:[],    // 风险矩阵的数据信息
            tableDemo1:[],      //【参照按钮-发生概率】的json信息
            tableDemo2:[],      //【参照按钮-影响程度】的json信息 
            // 
            periodtype: 0,      // 全局控制选择的日期类型
            objer: {},          // 对象存储
            isbtnShow: true,    // 批量下达按钮的显示与隐藏控制
            selection: [],      // 存储 Checkbox 选中的行信息 （注：用于删除时 和 下达时） 
        }
    },
    created(){
        // debugger
        // 全局控制选择的日期类型
        this.periodtype = this.$store.getters.user.globalparam[0].periodtype ;
        // 点进节点时默认计算的高度
        this.heights = document.documentElement.offsetHeight - 20 - 42 -64;
        // 弹出框===如果屏幕 <= 1200px 宽度自动变更为 540px；如果 >1200px 宽度为默认宽度 960px
        if(document.body.offsetWidth <= 1200 )this.widths = "540px" ;
    },
    mounted(){
        this.setClientHeight(); // 自适应高度
        this.axiosJson();       // 获取表格json的信息
        this.axiosRequest();    // 获取【风险矩阵】的json信息
        this.table1Request();   // 获取【参照按钮-发生概率】的json信息
        this.tab1e2Request();   // 获取【参照按钮-影响程度】的json信息
        // this.htmlContent();     // 获取表格信息生成文字
    },
    watch: {
        // 切换年触发
        year: function(newyear){
            this.loadModuleBefore() ;
        },
        // 切换月触发
        month: function(newmonth){
            this.loadModuleBefore() ;
        },
        /**
         * @event 切换公司触发
         * 功能：1. 切换公司时变更风险数据；
         *       2. 合并公司显示【批量下达按钮】/单体公司隐藏【批量下达按钮】 
         */
        company: function(newcompany){
            // 查看公司的信息
            let nisleaf = this.$store.getters.treeInfo.nisleaf ;
            // 0合并公司/ 1单体公司
            if(nisleaf){
                this.isbtnShow = false ;
            }else{
                this.isbtnShow = true
            }
            this.loadModuleBefore() ;
        }   
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"])
    },
    methods: {
        // 自适应高度
        setClientHeight(){
            this.heights = document.documentElement.offsetHeight - 20 - 42 -64;
            const me = this ;
            window.onresize = function temp(){ 
                me.heights = document.body.offsetHeight - 20 - 42 -64 ;
                if(document.body.offsetWidth <= 1200 ){
                    me.widths = "540px"; 
                }else{
                    me.widths = "960px"; 
                }
            }
        },
        // 1. 获取json的信息
        axiosJson(){
            // debugger
            let me = this;
            me.axios.get("cnbi/risk/riskDis.json").then(res => { 
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                me.elements = obj.columns;
                me.items = me.elements.filter(res => { return res.type =='string' });
                me.objer = obj ;
                me.loadModuleBefore() ;
            })
        },
        // 1.1 请求模块之前
        loadModuleBefore(){
            // debugger
            let me = this ;
            let obj = me.objer ;
            let $params = me.$store.state.prame.command;
            // 参数
            let params = {
                year: $params.year ,
                month: mini.getPeriod($params),
                company: $params.company,
                period: $params.year + mini.getPeriod($params),
                comparePeriod: $params.year -1 + mini.getPeriod($params),
            } ;
            // json里的queryDataBefore的方法
            if(obj.queryDataBefore && typeof obj.queryDataBefore == "function"){
                params = obj.queryDataBefore(params, obj, me) ;
            }
            // 有：请求数据方法/ 没有：直接赋空值或者假数据（手写的）
            if(params.sql){
                me.setData(params) ;
            }else{
                me.tableData = obj.rows ;
            }
        },
        // 1.2 获取请求的数据
        setData(params){
            let me = this ;
            findThirdPartData(params).then(res => {
                // debugger
                if(res.data.code === 200){
                    // me.tableData = res.data.data ;
                    // 数据获取之后的处理
                    me.queryDataAfter(res.data.data) ;
                }else{
                    me.$message.error('请求数据错误！');
                }
            }) ;
        },
        // 1.3 数据获取之后的处理
        queryDataAfter(datas){
            let me = this ;
            let obj = me.objer ;
            if(obj.queryDataAfter && typeof obj.queryDataAfter == "function"){
                me.tableData = obj.queryDataAfter(datas, me);
            }
        },
        // 2.获取【风险矩阵】的json信息
        axiosRequest(){
            let me = this ;
            me.axios.get("cnbi/risk/riskmatrix.json").then(res => {
                // debugger
                me.riskTableRow = res.data.rows;
            });
        },
        // 3.  获取【参照按钮-发生概率】的json信息
        table1Request(){
            let me = this ;
            me.axios.get("cnbi/risk/tableDemo1.json").then(res => {
                // debugger
                let data = res.data ;
                data = eval("(" + data + ")");
                me.riskprobabilityRequest(data, me) ;
            });
        },
        // 3.1 获取数据请求【参照按钮-发生概率】
        riskprobabilityRequest(data, me){
            riskprobability().then(res => {
                // debugger
                data.rows = res.data.data ;
                me.tableDemo1 = data ;
            })
        },  
        // 4.  获取【参照按钮-影响程度】的json信息
        tab1e2Request(){
            let me = this ;
            me.axios.get("cnbi/risk/tableDemo2.json").then(res => {
                // debugger
                let data = res.data ;
                data = eval("(" + data + ")");
                me.risk_influence_degreeRequest(data, me) ;
            });
        },
        // 4.1 获取数据请求【参照按钮-影响程度】
        risk_influence_degreeRequest(data, me){
            risk_influence_degree().then(res => {
                data.rows = res.data.data ;
                me.tableDemo2 = data ;
            });
        },
        /**
         * @event 选择列
         */
        checkbox(command){ 
            let me = this ;
            me.elements.forEach(res => {
                if(res.id === command){
                    res.determine = !res.determine;
                }
            });
        },
        /**
         * @event 单元格的-style-的回调方法，也可以使用一个固定的-Object-为所有单元格设置一样的-Style。
         */
        cellStyle({row, column, rowIndex, columnIndex}){
            let me = this ;
            if(me.objer.cellStyle && typeof me.objer.cellStyle == "function"){
                return me.objer.cellStyle({row, column, rowIndex, columnIndex}, me) ;
            }
        },
        /**
         * @event 当用户手动勾选数据行的-Checkbox-时触发的事件/当用户手动勾选全选-Checkbox-时触发的事件
         */
        handleSelectionChange(selection, row){
            // debugger
            let me = this ;
            me.selection = [] ;
            me.selection = selection ;
        },
        /**
         * @event 删除按钮
         * @function 1.Checkbox选中时，如果row未提交则可以进行删除；如果row已提交则不能删除
         */
        deleteRow(){
            // debugger
            let me = this ;
            let data = [] ;
            let selection_no = me.selection.filter(res => { return res.sissubmit == "未提交" }) ;
            let selection_yes = me.selection.filter(res => { return res.sissubmit == "已提交" }) ;
            selection_no.forEach(item => { data.push(item.id) ; }) ;
            if(selection_no && selection_no.length > 0){
                me.$confirm('此操作将永久删除该风险, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRiskdistinguish(data).then(res => {
                        if(res.data.code === 200){
                            me.tableData = me.tableData.filter((item, index) => { return item.id != data[index] ; }) ;
                            me.selection = me.selection.filter((item, index) => { return item.id != data[index] ; }) ;
                            me.$message({ type: 'success', message: '删除成功!' });
                        }else{
                            me.$message.error('删除失败!');
                        }
                    }) 
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消删除' });          
                });
            }else{
                if(selection_yes && selection_yes.length > 0){
                    me.$message({message: '温馨提示：已提交的风险不可以删除哦!',type: 'success'}) ;
                }else{
                    if(me.tableData && me.tableData.length > 0){
                        me.$message({message: '温馨提示：没有选择风险哦!无法删除!',type: 'warning'}) ;
                    }else{
                        me.$message({ message: '暂无风险数据，无法删除!', type: 'info' }) ;
                    }
                }
            }
        },
        /**
         * @event 刷新按钮
         * @function 重新走一次请求
         */
        refreshRow(){
            this.loadModuleBefore() ;
        },
        handleCommand(command){},
        
    }
}
</script>
<style scoped>
.elbtn{
    background-color: #fff;
    /* width: 100%; */
    margin-top: 10px;
    margin-bottom: 10px; 
}
.iconbtn .el-button {
    height: 42px;
    font-size: 13px;
}
.iconbtn .icon-batch-import, .icon-daoru, .icon-daochu {
    padding-right: 5px;
}
</style>
<style>
.el-table--border th, .el-table__fixed-right-patch{
    background-color: rgb(240, 248, 255);
}
/** 这是对表行的行高设置*/
.el-table__body tr, .el-table__body td {
    padding: 0;
    height: 32px;
}
.has-gutter tr th {
    background-color: rgb(240, 248, 255) !important;
    text-align: center !important;
    color: #606266 !important;   
}
/* 弹出框滚动条 */
/* .el-dialog__wrapper{
    overflow: hidden;
} */
</style>
