<template>
    <div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    :height="tableheight"
                    :header-cell-style="headerRowStyle"
                    :row-style="{height:'40px'}"
                    :cell-style="{padding:'0px'}"
                    style="width: 100%"
            >
                <el-table-column
                        :label="tabletitle"
                        align="center"
                >
                    <template slot="header" slot-scope="slot">
                        <div class="table-top">
                            <div class="table-title">{{tabletitle}}</div>

                            <div v-if="tabletitle.substr(0, 1) !== '2'" class="table-unit">单位：万元/次/吨/倍/%</div>

                        </div>
                    </template>

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
                                        <el-button style="color:  #409eff;" size="mini"
                                                   @click="desCompanyClick(scope.row[scope.column.property])">公司明细
                                        </el-button>
                                    </template>

                                </template>

                                <template v-else-if="item.id === 'sname'">
                                    <span :style="{color: scope.row.color}">
                                        {{ scope.row[scope.column.property]}}
                                    </span>
                                </template>

                                <template v-else-if="item.id === 'sjz'">
                                    {{ setNumberToStander(scope.row[scope.column.property], false) }}
                                </template>

                                <template v-else-if="item.id === 'zb'">
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
        mixins: [cwtPublicJS],
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
                    return 'background:rgb(240, 248, 255); padding: 0';
                } else {
                    return "";
                }
            },
            /**
             * 行高设置
             * @return {string}
             */
            RowStyle(row) {
                return 'height: 20px';
            },

            /**
             * 表格内公司点击事件
             * @param scope
             */
            companyClickEvent(scope) {
                this.$emit("companyClicked", scope)
            },

            renderHeader(h, {column}) {
                return h(
                    'div',
                    [
                        h('span', column.label, {style: 'fontWeight: 700'}),
                        h('i', {
                            class: 'el-icon-location',
                            style: 'color:#409eff;margin-left:5px;'
                        })
                    ],
                );
            },

            desCompanyClick(company) {
                this.$emit('companyClicked', company)
            }

        }
    }
</script>

<style scoped>
    .table-top {
        width: 100%;
    }

    .table-title {
        font-size: 18px;

    }

    .table-unit {
        float: right;
        margin-top: 20px;
        /*margin-right: 50px;*/
    }
</style>