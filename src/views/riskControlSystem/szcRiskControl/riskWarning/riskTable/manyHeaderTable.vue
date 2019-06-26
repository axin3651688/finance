<template>
    <div>
        <div>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    :header-cell-style="headerCellStyle"
                    :header-row-style="headerRowStyle"
                    class="risk_table"
                    style="width: 100%">
                <template v-for="(item,index) in columns">
                    <template v-if="item.children">
                        <el-table-column
                            :key="index"
                            :label="item.text"
                        >
                            <template v-for="(childItem,childIndex) in item.children">
                                <template v-if="childItem.children">
                                    <el-table-column
                                        :key="childIndex"
                                        :label="childItem.text"
                                    >
                                    <template v-for="(childrenTwo,indexTwo) in childItem.children">
                                        <el-table-column
                                        :align="childrenTwo.align || 'left'"
                                        :key="indexTwo"
                                        :show-overflow-tooltip="true"
                                        :prop="childrenTwo.id"
                                        header-align="center"
                                        :label="childrenTwo.text"
                                        class="last_class"
                                        :width="childrenTwo.width">
                                        </el-table-column>
                                    </template>
                                    </el-table-column>
                                </template>
                                <template v-else>
                                    <el-table-column
                                        :align="childItem.align || 'left'"
                                        :key="childIndex"
                                        :show-overflow-tooltip="true"
                                        :prop="childItem.id"
                                        header-align="center"
                                        :label="childItem.text"
                                        :width="childItem.width">
                                    </el-table-column>
                                </template>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column
                            :align="item.align || 'left'"
                            :key="index"
                            :show-overflow-tooltip="true"
                            :prop="item.id"
                            header-align="center"
                            :label="item.text"
                            :width="item.width">
                            <template slot-scope="scope">

                                <template v-if="item.id  === 'operation'">
                                    <template v-for="(it,index) in scope.row[item.id]">
                                        <el-button
                                                v-if="it.btnShow"
                                                :key="index"
                                                size="mini"
                                                @click="handleClickBtn(scope,it,index)"
                                        >
                                            {{ it.text }}
                                        </el-button>
                                    </template>
                                </template>

                                <div
                                        v-else-if="item.htmlType && scope.row.htmlType && scope.row.htmlType === 'text'"
                                        :style="styleHandler(scope.row)"
                                        :class="textClassHandler(scope.row)"
                                >
                                    {{ scope.row[scope.column.property] }}
                                </div>
                                <span
                                        v-else-if="item.action && item.action==='click'"
                                        style="color: dodgerblue;cursor: pointer"
                                        @click="clickItemNameHandler(scope,scope.$index)"
                                >
                                    <!-- <el-button @click="elButton(scope)"></el-button> -->
                                    {{ scope.row[scope.column.property] }}
                                </span>
                                <span v-else>
                                    <!-- <el-button @click="elButton(scope)"></el-button> -->
                                    {{ scope.row[scope.column.property] }}
                                </span>
                            </template>
                        </el-table-column>
                    </template>
                    
                </template>
            </el-table>
        </div>
    </div>
</template>
<script>

    export default {

        name: "singleTable",
        props: {
            columns: Array,
            tableData: Array
        },
        data() {
            return {
                headerStyle: {
                    background: "rgb(240, 248, 255)"
                },
                tableHeight: 0
            }
        },
        /**
         * 组件生成的回调。
         */
        created() {
            /**
             * 计算表格高度
             */
            // let offsetHeight = document.body.offsetHeight,//页面整体高度
            //     selectHeight = 40 + 10,//select框高度 加上中间的margin-bottom的值
            //     tabHeight = 39,//tab标签高度
            //     gapHeight = 32,//间隙的高度
            //     pageHeaderHeight = 64;//导航栏高度
            // this.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
        },
        /**
         * 页面渲染之后的回调。
         */
        mounted() {
            /**
             * 屏幕自适应方法调用
             */
            // this.setPageAdaptive();
        },
        methods: {
            headerRowStyle (row,col) {
                let me = this;
                if (row.rowIndex === 2) {
                    return 'display:none';
                } else {
                    return "background:rgb(240, 248, 255)";
                }
            },
            /**
             * 表头样式。
             */
            headerCellStyle(row,col,aa) {
                let me = this;
                return 'background:rgb(240, 248, 255);text-align:center;';
                // if (row.rowIndex === 0) {
                //     return 'background:rgb(240, 248, 255)';
                // } else {
                //     return "";
                // }
            },
            /**
             *
             * @param scope
             * @param it
             * @param index
             */
            handleClickBtn(scope, it, index) {
                this.$emit("changeShowContent", scope, it);
            },
            /**
             * 点击table内容的名字的事件。
             * @author szc 2019年5月16日11:24:42
             */
            clickItemNameHandler(scope, index, row) {
                this.$emit("clickItemName", scope, index, row);
            },
            elButton(scope) {
                console.log(scope)
            },
            /**
             * 根据配置属性生成单元格文本样式。
             */
            textClassHandler(row) {
                let me = this;
                if (row.nlevel) {
                    if (row.nlevel == "1") {
                        return "textClass01";
                    } else if (row.nlevel == "2") {
                        return "textClass02";
                    } else if (row.nlevel == "3") {
                        return "textClass03";
                    }else {
                        return "textClassAll";
                    }
                } else {
                    return "";
                }
            },
            styleHandler (row) {
                let me = this;
                if(row && row.fxlxcolor){
                    return "background-color:" + row.fxlxcolor;
                }
            },
            setPageAdaptive() {
                const _this = this;
                window.onresize = function temp() {
                    let offsetHeight = document.body.offsetHeight,//页面整体高度
                        selectHeight = 40 + 10,//select框高度 加上中间的margin-bottom的值
                        tabHeight = 39,//tab标签高度
                        gapHeight = 32,//间隙的高度
                        pageHeaderHeight = 64;//导航栏高度
                    _this.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
                };
            }

        }
    };
</script>

<style scoped>
    .last_class {
        display: none;
    }
    .risk_table {
        height: 100%;
    }
    .textClass01 {
        background-color: red;
        border-radius: 20px;
        color: #fff;
    }

    .textClass02 {
        background-color: rgb(255, 187, 0);
        border-radius: 20px;
        color: #fff;
    }

    .textClass03 {
        background-color: rgb(48, 172, 48);
        border-radius: 20px;
        color: #fff;
    }

    .textClass04 {
        background-color: red;
        border-radius: 20px;
        color: #fff;
    }
    .textClassAll {
        border-radius: 20px;
        color: #fff;
    }
</style>