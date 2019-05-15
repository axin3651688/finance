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
             *
             * @param scope
             * @param it
             * @param index
             */
            handleClickBtn(scope, it, index) {
                if (it.id === '0') {
                    //反馈操作
                    alert('反馈操作')
                } else if (it.id === '1') {
                    //查看操作
                    this.$emit("changeShowContent", scope.row);
                } else if (it.id === '2') {
                    //退回流程操作
                    alert('退回流程操作')
                } else if (it.id === '3') {
                    //提醒操作
                    alert('提醒操作')
                }
            },

            elButton(scope) {
                console.log(scope)
            },
            textClassHandler(row) {
                debugger;
                let me = this;
                if (row.levelNum) {
                    if (row.levelNum === "1") {
                        return "textClass01";
                    } else if (row.levelNum === "2") {
                        return "textClass02";
                    } else if (row.levelNum === "3") {
                        return "textClass03";
                    }
                } else {
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