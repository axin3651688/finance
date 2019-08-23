/**
* @Author: sjz
* @Date:   2019-5-6
* 树表渲染，列项有按钮的树表
*/
<template>
    <el-table 
    :data="formatData"  
    v-bind="$attrs" 
    stripe border 
    row-key="id"
    :height="heights"
    :cell-style="cellStyle"
    :expand-row-keys="expandRowKeys"
    :default-expand-all="defaultExpandAll"
    @row-click="rowClick"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    ref="ddtable"
    >
        <el-table-column v-if="columns.length===0" width="150">
            <template slot-scope="scope">
                <!-- <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span> -->
                {{scope.$index}}
            </template>
        </el-table-column>
        <!-- sjz 序号 -->
        <el-table-column v-if="item.index" type="index" width="60" prop="index" label="序号"></el-table-column>
        <el-table-column v-if="columns.length > 0" v-for="(column, index) in columns" :key="column.id" :prop="column.id" :label="column.text" :width="column.width" :align="column.align">
            <el-table-column v-for="tool in column.children" :prop="tool.id" :label="tool.text" :key="tool.id" :width="tool.width" :align="tool.align">
                <template slot-scope="scope">
                    <el-tooltip :content="getCellValues(scope,tool)" placement="right" effect="light">
                        <span>{{ getCellValues(scope,tool) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <!-- 图标 -->
                <!-- <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)"> -->
                    <!-- <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i> -->
                    <!-- <i v-if="!scope.row._expanded" class="iconfont icon-plus-square" aria-hidden="true"></i> -->
                    <!-- <i v-else class="iconfont icon-minus-square" aria-hidden="true"></i> -->
                <!-- </!--> 
                <!-- {{scope.row[column.id]}} -->
                <el-tooltip :content="getCellValues(scope,column)" placement="right" effect="light">
                    <span>{{ getCellValues(scope,column) }}</span>
                </el-tooltip>
                <!-- sjz 按钮 -->
                <span v-if="column.id === 'cz' && item.tableBtn.length>0" >
                    <el-button                 
                    v-for="(btn,index) in item.tableBtn"
                    v-show="btn.show"
                    style="fontSize: 14px;height: 30px"
                    :key="btn.id"
                    :class="btn.icon"
                    @click="btnClick(btn)"
                    size="mini"
                    type="primary" 
                    plain>
                        {{ btn.text }}
                    </el-button>
                </span>
            </template>
        </el-table-column>
        <slot></slot>
    </el-table>
</template>

<script>
    // import treeToArray from './eval'
    import tools from "utils/tools";
    export default {
        name: 'treeTable',
        props: {
            data: {
                type: [Array, Object],
                required: true
            },
            item: Object,
            row: {
                type: Array,
                default: () => []
            },           
            columns: {
                type: Array,
                default: () => []
            },
            newThis: Object
        },
        data(){
            return {
                heights: 700,
                expandRowKeys: [],
                defaultExpandAll: false ,
            }
        },
        created(){
            // debugger
            this.heights = document.body.offsetHeight - 168 ;
        },
        mounted(){
            debugger
            this.setClientHeight();
        },
        computed: {
            // 格式化数据源
            formatData: function () { //debugger
                let isTrue = this.newThis.defaultExpandAll
                let me = this ;
                let tmp;
                if (!Array.isArray(this.data)) {
                    tmp = [this.data]
                } else {
                    tmp = this.data
                }
                if(isTrue)tmp.forEach(element => { me.expandRowKeys.push(element.id, true) });
                if(!isTrue)me.expandRowKeys = [] ;
                return tmp ;
                // const func = this.evalFunc || treeToArray;
                // const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll];
                // return func.apply(null, args)
            }  
        },
        methods: {
            setClientHeight(){
                this.heights = document.body.offsetHeight - 168 ;
                const me = this ;
                window.onresize = function temp(){ 
                    me.heights = document.body.offsetHeight - 168 ;
                }
            },
            // showRow: function (row) {
            //     const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
            //     row.row._show = show;
            //     return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            // },
            // 切换下级是否展开
            // toggleExpanded: function (trIndex) {
            //     const record = this.formatData[trIndex];
            //     record._expanded = !record._expanded
            // },
            // 图标显示
            // iconShow(index, record) {
            //     return (index === 0 && record.children && record.children.length > 0)
            // },
            /**
             * 点击公司显示具体报告内容
             * @param row
             */
            showReportDetail() {
                this.$emit('showreportdetailp');
            },
            /**
             * 点击操作列按钮触发，由于按钮功能不一致，所以写在json里面，自由发挥！
             */
            btnClick(btn){
                if(btn.handler && typeof btn.handler == "function"){
                    return btn.handler(btn, this)
                }else{
                    this.$message('暂无此功能开发！');
                }   
            },
            // 数据处理（千分位、两位小数）
            getCellValues(value,vax){
                // debugger
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
            // 当某一行被点击时会触发该事件
            rowClick(row, event, column){
                if(this.item.rowClick && typeof this.item.rowClick == "function"){
                    return this.item.rowClick({row, event, column}, this);
                }
            },
            // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
            cellStyle(row, column, cell, event){ 
                if(this.item.cellStyle && typeof this.item.cellStyle == "function"){
                    return this.item.cellStyle({row, column, cell, event}, this);
                }
            }
        }
    }
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
    $color-blue: #2196F3;
    $space-width: 18px;
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: $space-width;
        height: 14px;
        &::before {
            content: ""
        }
    }

    .processContainer {
        width: 100%;
        height: 100%;
    }

    table td {
        line-height: 26px;
    }

    .tree-ctrl {
        position: relative;
        cursor: pointer;
        color: $color-blue;
        margin-left: -$space-width;
    }
</style>
<style>
    /* 表头居中显示 */
    .el-table th {
        text-align: center !important;
    }
    /* 表头背景颜色的设定 */
    .has-gutter tr th {
        background-color: rgb(240, 248, 255) !important;
        color: #606266;
    }
    /** 这是对表行的行高设置*/
    .el-table__body tr, .el-table__body td {
        padding: 0;
        height: 32px;
    }
</style>
