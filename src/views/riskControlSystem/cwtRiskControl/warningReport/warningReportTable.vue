<template>
    <div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    :height="tableheight"
                    :header-cell-style="headerRowStyle"
                    style="width: 100%"
            >


                <el-table-column
                        :label="tabletitle"
                        align="center"
                >
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
                                <!--<template v-if="item.id === 'company'">
                                    <a style="color: #2d8cf0" @click="companyClickEvent(scope)">{{ scope.row[scope.column.property] }}</a>
                                </template>-->

                                <template v-if="item.id === 'company'">
                                    <template v-for="(com, index) of scope.row[scope.column.property].split(',')">
                                        &nbsp;<a style="color: #2d8cf0" @click="companyClickEvent(com)">{{com}}</a>
                                    </template>
                                </template>

                                <template v-else>
                                    {{ scope.row[scope.column.property] }}
                                </template>
                            </template>


                        </el-table-column>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "warningReportTable",
        components: {},
        props: {
            tableheight: Number,
            tableData: Array,
            columns: Array,
            tabletitle: String
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
             * 表格内公司点击事件
             * @param scope
             */
            companyClickEvent(scope) {
                this.$emit("companyClicked", scope)
            }

        }
    }
</script>

<style scoped>

</style>