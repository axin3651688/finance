/**
* @Author: cwt
* @Date:   2019-5-6
* 树表渲染，列项有按钮的树表
*/
<template>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" border stripe>
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
        <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space":key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span>
                <el-button size="mini" v-if="column.id === 'cz'" v-for="tool in toolBar" :key="tool.id" :class="tool.icon">
                    <!-- {{scope.row[column.id]}} -->
                    {{ tool.text }}
                </el-button>
                <span v-if="column.value !== 'handle'">{{scope.row[column.id]}}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column>
            <el-button v-for="(tool,index) in toolBar" :key="tool.id" :class="tool.icon">{{ tool.text }}</el-button>
        </el-table-column> -->
        <slot></slot>
    </el-table>
</template>

<script>
    import treeToArray from './eval'

    export default {
        name: 'treeTable',
        props: {
            toolBar: {
                type: Array,
                default: () => []
            },
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

            }
        },
        created(){
            debugger
            let cc = this.columns;
            let ss = this.toolBar;
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