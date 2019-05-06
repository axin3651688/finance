<template>
    <div class="tree-columns">
        <div v-if="item.tableBefore" v-html="titleText">请添加你要显示的内容！</div>
        <!-- 表格 -->
        <el-table 
        border
        stripe
        :data="data"
        :height="heights" 
        :row-style="showTr"
        :cell-style="cellStyle"
        @row-click="onRowClick"
        class="tree_table"
        >
            <el-table-column v-for="(items,index) in columns" :prop="items.id" :label="items.text" :key="items.id" :width="items.width" :align="items.align" :fixed="items.fixed">
                <el-table-column v-for="too in items.children" :prop="too.id" :label="too.text" :key="too.id" :width="too.width" :align="too.align">
                    <template slot-scope="scope">
                        <el-tooltip :content="getCellValues(scope,too)" placement="right" effect="light">
                            <span>{{ getCellValues(scope,too) }}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <template slot-scope="scope">
                    <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
                    <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                        <i v-if="!scope.row._expanded" class="iconfont icon-plus-square" aria-hidden="true"></i>
                        <i v-if="scope.row._expanded" class="iconfont icon-minus-square" aria-hidden="true"></i>
                    </span>
                    <span v-else-if="index===0" class="ms-tree-space"></span>
                    <el-tooltip :content="getCellValues(scope,items)" placement="right" effect="light">
                        <span>{{ getCellValues(scope,items) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能  pagination: 在json中配置为true（或者有这个参数不为''|0 的） 说明具有分页功能-->
        <el-pagination
        v-if="item.pagination && item.show && item.xtype=='elementTree'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.length">
        </el-pagination>
    </div>
</template>
<script>
import Utils from '@c/treeElement/dataTranslate.js';
import EventMixins from "@c/mixins/EventMixins.js";
import tools from "utils/tools";
export default {
    props: ["item","treeStructure","dataSource","columns"],
    mixins: [EventMixins],
    name: "treeColumns",
    data(){
        return{
            defaultExpandAll: false ,
            heights: 0 ,
            titleText: "" ,
            currentPage: 1,
            pagesize: 100
        }
    },
    created(){
        debugger;
        let ate = this.item ;
        let offsetHeight = document.body.offsetHeight ;
        // 得到初始的高度
        this.heights = Utils.setTableScollHeight(ate,offsetHeight) ;
        // 得到存在LocalStorage里的值（比例：应收、预付、其他）
        // this.data = Utils.getLocalStorage(this.data, this) ;
       
    },
    mounted(){
        // 设置表格高度（自适应）
        this.setTableScollHeight();
        // 设置管理驾驶舱下钻的日期提醒
        if(this.item.tableBefore)this.titleText=Utils.tableBefore(this);
    },
    computed: {
        // 格式化数据源
        data: function () { 
            debugger;
            let me = this
            let parent,level ;
            if (me.treeStructure) {
                let data = Utils.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
                console.log("data",data) ;
                // 判断是否自动展开
                let datas = Utils.automaticallyOpen(data, me, null) ;
                return datas ;
            }
            return me.dataSource ;
        }
    },
    methods: {
        // 设置表格高度（自适应）
        setTableScollHeight(){
            this.heights = Utils.setTableScollHeight(this.item, document.body.offsetHeight) ;
            const me = this ;
            window.onresize = function temp(){ 
                me.heights = Utils.setTableScollHeight(me.item, document.body.offsetHeight) ;
            };
        },
        //pagesize改变时触发 ---- 分页功能
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        //currentPage改变时会触发 --- 分页功能
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        // 显示行
        showTr: function (row, index) {
            let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true)
            row.row._show = show
            return show ? '' : 'display:none;'
        },
        // 显示层级关系的空格和图标
        spaceIconShow (index) {
            let me = this ;
            if (me.treeStructure && index === 0) {
                return true ;
            }
            return false ;
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow (index, record) {
            let me = this
            if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        // 展开下级 click事件
        toggle: function (trIndex) { 
            let me = this
            let record = me.data[trIndex]
            record._expanded = !record._expanded
        },
        // 数据处理（千分位、两位小数）
        getCellValues(value,vax){
            debugger;
            let num ;
            if(vax.type != "decimal" )num = value.row[vax.id] ;
            if(vax.type == "decimal" ){
                let val = value.row[vax.id] ;
                if(val != 0 && val){               
                    num = tools.currency(val,'',2);                             
                }else{
                    num = "--" ;
                }
            }    
            return num ;
        },
        // 单元格的 style 的回调方法
        cellStyle(row){
            if (this.item.cellStyle && typeof this.item.cellStyle == "function") {
                return this.item.cellStyle(row, this);
            }
            return Utils.levelProperties(this.item, row);
        },
        // 当某一行被点击时会触发该事件
        onRowClick(row, e, column) {
            if (this.item.onRowClick && typeof this.item.onRowClick == "function") {
                return this.item.onRowClick(row, column, e, this);
            }
        },
        // 点击·刷新·或·导出·或·展开·或·收起·按钮时触发
        btnClick(btn){
            btn.handler(this,btn);
        },
        // 应收、预付、其他比例触发 click事件
        seeChange(see){
            // debugger
            let me = this ;
            // 看看json里有没有handler事件，如果有，直接跳转到json用 json的事件处理
            if(see.handler && typeof see.handler == "function"){
                return see.handler(this, see);
            }
            return Utils.changeFormatData(me.item.proportion, me.data, me, see) ;
        },
        // 导出报表
        handleDownload(vue){
            // debugger
            vue.downloadLoading = true;
            import('@/excel/Export2Excel').then(excel => {debugger
                const tHeader = [],filterVal = [];//tHeader：列名称  filterVal：列id
                const columns = vue.item.config.columns;
                if(columns && columns.length > 0){
                for(let i = 0;i < columns.length;i++){
                    if(columns[i].text && !columns[i].hidden)tHeader.push(columns[i].text);//列名称存在而且列显示
                    if(columns[i].id && !columns[i].hidden)filterVal.push(columns[i].id);//列id存在而且列显示
                }
                // tHeader.push(columns[0].text);
                // filterVal.push(columns[0].id);
                }
                const list = vue.item.datas;//获取数据
                const data = vue.formatJson(filterVal, list);//根据id获取相应的数据
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: vue.item.text,//导出表的表名称
                autoWidth:  "200px",
                bookType: 'xlsx' //导出的类型
                })
                vue.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        
    }
}
</script>
<style scoped>
    .button {
        cursor: pointer;
    }
    .button :hover {
        color: dodgerblue;
    }
    .el-table-icon, .iconfont{
        margin-right: 4px;
    }
</style>
<style>
    .tree-proportion input {
        text-align: right;
    }
    /* 表头居中显示 */
    .el-table th {
        text-align: center !important;
    }
    /* 表头背景颜色的设定 */
    .has-gutter tr th {
        background-color: rgb(240, 248, 255) !important;
        color: #606266;
    }
    /* 固定列表头的颜色设定  加重覆盖*/
    .el-table__fixed tr th {
        background-color: rgb(240, 248, 255) !important;
        color: #606266;
    }
    /** 这是对表行的行高设置*/
    .el-table__body tr, .el-table__body td {
        padding: 0;
        height: 32px;
    }
    /* 表行的滚动条显示 */
    .el-table__body-wrapper {
        overflow: auto;
    }
    .el-table__row {
        color: #606266;
    }
</style>
