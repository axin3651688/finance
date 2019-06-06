<template>
    <div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    :header-cell-style="headerRowStyle"
                    style="width: 100%"
            >

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <template v-for="(item,index) in columns">
                    <el-table-column
                            :align="item.align || 'left'"
                            :key="index"
                            :show-overflow-tooltip="true"
                            :prop="item.id"
                            header-align="center"
                            :label="item.text"
                            :width="item.width"
                    >
                        <template slot-scope="scope">


                            <template v-if="item.id === 'title'">
                                <a style="color: #2d8cf0">{{ scope.row[scope.column.property] }}</a>
                            </template>

                            <template v-else-if="item.id === 'suggest'">
                                <a style="color: #2d8cf0" @click="suggestClicled(scope)">建议内容</a>
                            </template>

                            <template v-else-if="item.id === 'operation'">
                                <el-button
                                        :key="index"
                                        size="mini"
                                        @click="suggestAddClicked(scope)"
                                >
                                    添加
                                </el-button>
                            </template>

                            <template v-else>
                                {{ scope.row[scope.column.property] }}
                            </template>

                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "talentTable",
        components: {},
        props: {
            columns: Array,
            tableData: Array,
            tableType: Object
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * 表头样式。
             */
            headerRowStyle(row) {
                if (row.rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)';
                } else {
                    return "";
                }
            },

            /**
             * 点击了建议详情标签
             */
            suggestClicled(scope){
                this.$emit("suggestClicled", scope)
            },

            /**
             * 添加建议按钮点击
             */
            suggestAddClicked(scope){
                this.$emit("suggestAddClicked", scope)
            }

        }

    }
</script>

<style scoped>
    .tabListPage {
        margin-bottom: 50px;
    }
</style>