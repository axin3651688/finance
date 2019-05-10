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
                    <el-button-group class="iconbtn">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="dialogFormVisible = true">添加</el-button>
                        <el-button type="primary" icon="el-icon-circle-close-outline" plain>删除</el-button>
                        <el-button type="primary" icon="el-icon-refresh" plain>刷新</el-button>
                        <el-button type="primary" plain><i class="iconfont icon-batch-import"></i>批量下达</el-button>
                        <el-button type="primary" plain>下达记录查询</el-button>
                        <el-button type="primary" plain><i class="iconfont icon-daoru"></i>导入</el-button>
                        <el-button type="primary" plain><i class="iconfont icon-daochu"></i>导出</el-button>
                    </el-button-group>
                </div>
                <!-- <div class="elbtn" style="float: left" v-html="html">divided</div> -->
                <div class="elbtn" style="float: right;marginRight: 10px;">                   
                    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="false">
                        <el-button type="primary" plain icon="el-icon-menu"></el-button>
                        <el-dropdown-menu slot="dropdown" style="height: 100%; overflow: auto">
                            <el-dropdown-item  v-for="(item,index) in items" :key="index"  :command="item.id" divided>
                                <el-checkbox @change="checkbox(item.id)" >{{ item.text }}</el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <div class="table">
            <el-table
            class="table-call"
            :data="tableData"
            stripe
            highlight-current-row
            style="width: 100%;"
            :height="heights"
            border>
                <el-table-column 
                v-for="element in elements"
                v-if="element.determine"
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
        <el-dialog title="风险评估与识别" :visible.sync="dialogFormVisible" :width="widths">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <dia-log :riskTableRow="riskTableRow" :fsgl="tableDemo1" :yxcd="tableDemo2"></dia-log>
        </el-dialog>
    </div>
</template>
<script>
import diaLog from "@v/riskControlSystem/dialog";
export default {
    components: {
        diaLog
    },
    name: "riskDis",
    data(){
        return {
            heights: 0,
            widths: "960px",
            html: "", 
            tableData: [],
            elements: [],
            items: [],
            dialogFormVisible: false,
            // 
            riskTableRow:[],
            tableDemo1:[],
            tableDemo2:[]
        }
    },
    created(){
        this.heights = document.documentElement.offsetHeight - 20 - 42 -64;
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
    computed: {
        
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
                me.elements = res.data.columns;
                me.tableData = res.data.rows;
                me.items = me.elements.filter(res => { return res.type=='string' });
            })
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
                me.tableDemo1 = res.data ;
            });
        },
        // 4.  获取【参照按钮-影响程度】的json信息
        tab1e2Request(){
            let me = this ;
            me.axios.get("cnbi/risk/tableDemo2.json").then(res => {
                // debugger
                me.tableDemo2 = res.data ;
            });
        },
        // 选择列
        checkbox(command){ 
            let me = this ;
            me.elements.forEach(res => {
                if(res.id === command){
                    res.determine = !res.determine;
                }
            });
        },
        handleCommand(command){}
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
