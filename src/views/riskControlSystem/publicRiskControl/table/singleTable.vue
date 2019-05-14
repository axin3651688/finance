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
                            :align="item.align || left"
                            :key="index"
                            :show-overflow-tooltip="true"
                            :prop="item.id"
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
                                    class="textClass"
                            >
                                {{ scope.row[scope.column.property] }}
                            </div>
                            <span
                                    v-else-if="item.id==='riskName'"
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
                debugger;
                this.$emit("changeShowContent", row);
            },

            elButton(scope) {
                debugger;
                console.log(scope)
            }
        }
    };
</script>

<style scoped>
    .textClass {
        background-color: red;
        border-radius: 20px;
        color: #fff;
    }
</style>