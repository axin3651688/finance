<template>
    <div>
        <div v-if="columns && columns.length > 0">
            <div v-if="allData && allData.fixedHeader">
                <el-table
                :data="tableData"
                border
                :height="allData.tableHeight || tableHeight"
                stripe
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle"
                :cell-style="cellStyle"
                :span-method="arraySpanMethod"
                class="risk_table"
                id="publicTable"
                style="width: 100%">
                    <tableColumnCompon :columns.sync="columns"></tableColumnCompon>
                </el-table>
            </div>
            <div v-else>
                <el-table
                :data="tableData"
                border
                stripe
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle"
                :cell-style="cellStyle"
                class="risk_table"
                style="width: 100%">
                    <tableColumnCompon :columns.sync="columns"></tableColumnCompon>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>

    import tableColumnCompon from './tableColumn'
    export default {

        name: "threeHeaderTable",
        props: {
            columns: Array,
            tableData: Array,
            allData:Object
        },
        components:{
            tableColumnCompon
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
            debugger;
            let me = this;
            /**
             * 计算表格高度
             */
            if(me.allData.tableHeight){
                me.tableHeight = me.allData.tableHeight;
                return;
            }
            let offsetHeight = document.body.offsetHeight,//页面整体高度
                selectHeight = 40 + 10,//select框高度 加上中间的margin-bottom的值
                tabHeight = 39,//tab标签高度
                gapHeight = 32,//间隙的高度
                pageHeaderHeight = 64;//导航栏高度
            this.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
        },
        /**
         * 页面渲染之后的回调。
         */
        mounted() {
            /**
             * 屏幕自适应方法调用
             */
            if(this.allData.tableHeight){
                this.tableHeight = this.allData.tableHeight;
                return;
            }
            this.setPageAdaptive();
        },
        methods: {
            headerRowStyle (row,col) {
                let me = this,allData = me.allData;
                if(allData && allData.displayRow && row.rowIndex == allData.displayRow){
                    return 'display:none';
                }else {
                    return "background:rgb(240, 248, 255)";
                }
                // if (row.rowIndex === 2) {
                //     return 'display:none';
                // } else {
                //     return "background:rgb(240, 248, 255)";
                // }
                // return "background:rgb(240, 248, 255)";
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
             * 颜色的添加。
             */
            cellStyle (row,column,rowIndex,columnIndex) {
                let me = this,allData = me.allData;
                if(allData && allData.cellColor && row.rowIndex == allData.cellColor.rowIndex){
                    if(row.columnIndex > 0 && row.columnIndex < 3){
                        return "background-color:#399E38";
                    }else if(row.columnIndex >= 3 && row.columnIndex < 5) {
                        return "background-color:#5CACEE";
                    }else if(row.columnIndex >= 5 && row.columnIndex < 7) {
                        // return "background-color:#EEB422";
                        return "background-color:#ffd700";
                    }else if(row.columnIndex >= 7 && row.columnIndex < 9) {
                        // return "background-color:#FFDD00";
                        return "background-color:#ff7f24";
                    }else if(row.columnIndex >= 9 && row.columnIndex < 12) {
                        return "background-color:#EF4D4D";
                    }
                }
                return "";
            },
            /**
             * 合并单元格。
             */
            arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
                if(this.allData && this.allData.spanObj){
                    let spanArr = this.allData.spanObj;
                    if(rowIndex == 0){
                        if (columnIndex === 0) {
                            return [spanArr[0], 1];
                        } else {
                            return [1, 1];
                        }
                    }else {
                        let rIndex,spanNum;
                        for(let i = 0;i < spanArr.length;i++){
                            let item = spanArr[i];
                            if(item == rowIndex){
                                rIndex = item;
                                spanNum = spanArr[i + 1] - spanArr[i];
                                break;
                            }
                        }
                        if(rowIndex == rIndex){
                            if (columnIndex === 0) {
                                return [spanNum, 1];
                            } else {
                                return [1, 1];
                            }
                        }else {
                            if (columnIndex === 0) {
                                return [0, 0];
                            } else {
                                return [1, 1];
                            }
                        }
                    }
                    // if (rowIndex % 2 === 0) {
                    //     if (columnIndex === 0) {
                    //         return [2, 1];
                    //     } else {
                    //         return [1, 1];
                    //     }
                    // }else{
                    //     if(columnIndex === 0){
                    //         return [0,0];
                    //     }else {
                    //         return [1, 1]; 
                    //     }
                    // }
                }else {
                    return [1,1]
                }
                // return [1,1];
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