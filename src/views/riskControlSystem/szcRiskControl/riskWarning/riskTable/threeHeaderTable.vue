<template>
    <div>
        <div v-if="columns && columns.length > 0">
            <el-table
                :data="tableData"
                border
                stripe
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle"
                class="risk_table"
                style="width: 100%">
                <tableColumnCompon :columns.sync="columns"></tableColumnCompon>
            </el-table>
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
                let me = this,allData = me.allData;
                if(allData.displayRow && row.rowIndex == allData.displayRow){
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