/**
* @Author: cwt
* @Date:   2019-5-6
* 树表渲染，列项有按钮的树表
*/
<template>
    <div id="index">
        <!-- button按钮 -->
        <el-button-group  class="toolbar" v-if="item.toolbar && item.toolbar.length > 0 ">
            <el-button type="primary" plain v-for="btn in item.toolbar" v-bind:key="btn.id" :style="btn.styles" @click="btnClick(btn)">
                {{btn.text}}
            </el-button>
        </el-button-group>
        <!-- table表格 -->
        <el-table 
        :data="formatData" 
        :row-style="showRow"
        :height="heights" 
        v-bind="$attrs" 
        border 
        stripe 
        class="tree-table"
        :cell-style="cellStyle"
        @row-click="rowClick">
            <el-table-column v-if="item.index" type="index" width="80" label="序号" align="center" fixed></el-table-column>
            <el-table-column v-if="columns.length===0" width="150">
                <template slot-scope="scope">
                    <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                    <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                        <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                        <i v-else class="el-icon-minus"></i>
                    </span>
                    {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column 
            v-else v-for="(column, index) in columns" :prop="column.id" :key="column.id" 
            :label="column.text" :width="column.width" :align="column.align" :fixed="column.fixed">
                <template slot-scope="scope">
                    <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                    <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                        <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                        <i v-else class="el-icon-minus"></i>
                    </span>
                    <el-button 
                    type="primary" plain size="mini" id="minibtn" v-if="column.id === 'cz'" 
                    v-for="tool in item.tableBtn" :key="tool.id" :class="tool.icon" @click="tabtnClick(tool)">
                        <!-- {{scope.row[column.id]}} -->
                        {{ tool.text }}
                    </el-button>
                    <span>{{ scope.row[column.id] }}</span>
                </template>
            </el-table-column>
            <slot></slot>
        </el-table>
    </div>  
</template>

<script>
    import treeToArray from './eval'
    export default {
        name: 'treeTable',
        props: {
            dialogVisible:Boolean,
            data: {
                type: [Array, Object],
                required: true
            },
            columns: {
                type: Array,
                default: () => []
            },
            evalFunc: Function,
            evalArgs: Array,
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                
                heights: "",
                $height: 0
            }
        },
        created(){
            // debugger
            this.$height = this.tableHeight;
            this.heights = document.documentElement.clientHeight - this.$height + "px";
        },
        mounted(){
            // 页面自适应
            let me = this ;
            me.setClientHeight();
        },
        computed: {
            // 页面自适应
            setClientHeight(){
                this.heights = document.documentElement.clientHeight - this.$height + "px" ;
                const me = this ;
                window.onresize = function temp(){
                    me.heights = document.documentElement.clientHeight - me.$height + "px" ;
                }
            },
            // 格式化数据源
            formatData: function () {
                let tmp;
                if (!Array.isArray(this.data)) {
                    tmp = [this.data]
                } else {
                    tmp = this.data
                }
                const func = this.evalFunc || treeToArray;
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll];
                return func.apply(null, args)
            }
        },
        methods: {
            showRow: function (row) {
                const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
                row.row._show = show;
                return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            },
            // 切换下级是否展开
            toggleExpanded: function (trIndex) {
                const record = this.formatData[trIndex];
                record._expanded = !record._expanded
            },
            // 图标显示
            iconShow(index, record) {
                return (index === 0 && record.children && record.children.length > 0)
            },
            /**
             * 点击公司显示具体报告内容
             * @param row
             */
            showReportDetail() {
                this.$emit('showreportdetailp');
            },
            // 表格上面的按钮事件方法
            btnClick(btn){
                if(btn.handler && typeof btn.handler == "function"){
                    return btn.handler(this.formatData, btn, this) ; 
                }else{
                    this.$message('暂无此功能');
                }
            },
            // 表格里面的按钮事件方法
            tabtnClick(tool){ debugger
                if(tool.handler && typeof tool.handler == "function"){
                    return tool.handler(tool, this) ; 
                }else{
                    this.$message('暂无此功能');
                }
            },
            // 单元格的 style 的回调方法
            cellStyle({row, column, rowIndex, columnIndex}){ //debugger
                if (this.item.cellStyle && typeof this.item.cellStyle == "function") {
                    return this.item.cellStyle({row, column, rowIndex, columnIndex}, this);
                }
                // return Utils.levelProperties(this.item, row);
            },
            // 单元格的 click 的回调方法/ 当某个单元格被点击时会触发该事件
            // cellClick(row, column, cell, event){ debugger
            //     if (this.item.cellClick && typeof this.item.cellClick == "function") {
            //         return this.item.cellClick(row, column, rowIndex, columnIndex, this);
            //     }
            // },
            // 行的 click 的回调方法/ 当某一行被点击时会触发该事件
            rowClick(row, event, column){ 
                if (this.item.rowClick && typeof this.item.rowClick == "function") {
                    return this.item.rowClick(row, event, column, this);
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