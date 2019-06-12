/**
* @Author: cwt
* @Date:   2019-5-6
* 树表渲染，列项有按钮的树表
*/
<template>
    <el-table
            :data="formatData"
            :row-style="showRow"
            v-bind="$attrs"
            :height="tableHeight"
            :header-cell-style="headerRowStyle"
            class="public_class"
    >
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
        <template v-else v-for="(column, index) in columns">
            <el-table-column
                :key="column.value" 
                :label="column.text"
                :width="column.width"
                header-align="center"
                :align="column.align || 'center'">
                <template slot-scope="scope">
                    <span v-if="index === 0" 
                        v-for="space in scope.row._level" 
                        class="ms-tree-space"
                        :key="space">
                    </span>
                    <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                        <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                        <i v-else class="el-icon-minus"></i>
                    </span>
                    <span
                        v-if="column.optType === 'click'"
                        @click="drillItemSname(scope)"
                        style="color: dodgerblue;cursor: pointer">
                        {{scope.row[column.value]}}
                    </span>
                    <span
                            v-else-if="column.value === 'companyName'"
                    >
                        {{scope.row[column.value]}}
                    </span>
                    <template v-else-if="column.value === 'operation' && scope.row[column.value]">
                        <template v-for="(it,indx) in scope.row[column.value]">
                            <el-button
                                v-if="it.btnShow"
                                :key="indx"
                                size="mini"
                                @click="btnHandler(scope,it,indx)">
                            {{ it.text }}
                            </el-button>
                        </template>
                    </template>
                    <span v-else>
                        {{scope.row[column.value]}}
                    </span>
                    
                </template>
            </el-table-column>
        </template>
        
        <slot></slot>
    </el-table>
</template>

<script>
    import treeToArray from './eval'
    import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
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
        created(){
            /**
             * 计算表格高度
             */
            let offsetHeight = document.body.offsetHeight,//页面整体高度
                selectHeight = 0,//select框高度 加上中间的margin-bottom的值
                tabHeight = 39,//tab标签高度
                gapHeight = 32,//间隙的高度
                pageHeaderHeight = 64;//导航栏高度
            this.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
        },
        computed: {
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
                // return func.apply(null, args)
                const lyuo = func.apply(null, args) ;
                return mini.getOpenbyDefault(lyuo ) //默认全部展开
            }
        },
        methods: {
            /**
             * 行样式
             */
            headerRowStyle (row) {
                let me =this;
                if(row.rowIndex == 0){
                    return 'background:rgb(240, 248, 255)';
                }else {
                    return "";
                }
            },
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
             * 按钮点击事件 所有的
             * @author szc 2019年5月14日11:20:27
             * 0:批示，1:查看，2:退回，3:催报
             */
            btnHandler (scope,btnItem,index) {
                let me = this;
                me.$emit("buttonHandler",scope,btnItem);
            },
            /**
             * 指标名字的钻取。
             */
            drillItemSname (scope) {
                let me = this;
                me.$emit("drillItemSname",scope);
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
<style lang="scss">
    .public_class {
        .el-table__body-wrapper {
            overflow-y: auto !important;
        }
    }
</style>
