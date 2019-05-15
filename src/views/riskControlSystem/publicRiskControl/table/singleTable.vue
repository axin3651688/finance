<template>
    <div>
        <div>
            <el-table
                    v-if="tableData && tableData.length > 0"
                    :data="tableData"
                    border
                    stripe
                    height="80%"
                    :header-cell-style="headerRowStyle"
                    style="width: 100%">
                <template v-for="(item,index) in columns">
                    <el-table-column
                            :align="item.align || 'left'"
                            :key="index"
                            :show-overflow-tooltip="true"
                            :prop="item.id"
                            header-align="center"
                            :label="item.text"
                            :width="item.width">
                        <template slot-scope="scope">
                            <div v-if="item.id === 'operation'">
                                <el-button
                                        size="mini"
                                >
                                    {{ scope.row[scope.column.property] }}
                                </el-button>
                            </div>
                            <div
                                    v-else-if="item.htmlType && scope.row.htmlType && scope.row.htmlType === 'text'"
                                    :class="textClassHandler(scope.row)"
                            >
                                {{ scope.row[scope.column.property] }}
                            </div>
                            <span
                                    v-else-if="item.action && item.action==='click'"
                                    style="color: dodgerblue;cursor: pointer"
                                    @click="riskDetailShow(scope.$index,scope.row)"
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
                }
            }
        },
        /**
         * 组件生成的回调。
         */
        created() {
        },
        /**
         * 页面渲染之后的回调。
         */
        mounted() {
        },
        methods: {
            headerRowStyle(row) {
                let me = this;
                if (row.rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)';
                } else {
                    return "";
                }
            },
            /**
             * 关于某个风险的反馈弹出按钮
             * @param index
             * @param row
             */
            riskDetailShow(index, row) {
                this.$emit("changeShowContent", row);
            },

            elButton(scope) {
                console.log(scope)
            },
            textClassHandler (row) {
                debugger;
                let me = this;
                if(row.levelNum){
                    if(row.levelNum == "1"){
                        return "textClass01";
                    }else if (row.levelNum == "2") {
                        return "textClass02";
                    }else if (row.levelNum == "3") {
                        return "textClass03";
                    }
                }else {
                    return "";
                }
            }
        }
    };
</script>

<style scoped>
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
</style>