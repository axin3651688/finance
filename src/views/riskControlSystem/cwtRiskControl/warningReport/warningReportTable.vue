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
                                <template v-if="item.id === 'company'">

                                    <template v-if="scope.row[scope.column.property]">
                                        <template v-for="(com, index) of scope.row[scope.column.property].split(',')">
                                            &nbsp;<a style="color: #2d8cf0" @click="companyClickEvent(com)">{{com.split('-')[0]}}</a>
                                        </template>
                                    </template>

                                </template>

                                <template v-else-if="item.id === 'sjz'">
                                    {{ setNumberToStander(scope.row[scope.column.property], false) }}
                                </template>
                                <template v-else-if="item.id === 'zgz'">
                                    {{ setNumberToStander(scope.row[scope.column.property], false) }}
                                </template>
                                <template v-else-if="item.id === 'pjz'">
                                    {{ setNumberToStander(scope.row[scope.column.property], false) }}
                                </template>
                                <template v-else-if="item.id === 'zdz'">
                                    {{ setNumberToStander(scope.row[scope.column.property], false) }}
                                </template>

                                <template v-else>
                                    {{ setNumberToStander(scope.row[scope.column.property], true) }}
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
    import cwtPublicJS from '../mixin/cwtPublicJS'
    export default {
        name: "warningReportTable",
        mixins:[cwtPublicJS],
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