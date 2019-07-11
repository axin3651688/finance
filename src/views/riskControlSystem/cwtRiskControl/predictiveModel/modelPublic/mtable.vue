<template>
    <div>
        <div class="content-table-des" @click="showFormula">计算公式明细</div>
        <div v-show="tableShow">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    :height=600
                    :header-cell-style="headerRowStyle"
                    style="width: 100%"
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
                            {{ scope.row[scope.column.property] }}
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mtable",
        components: {},
        props: {
            columns: Array,
            tableData: Array,
            tableHeight: Number
        },
        computed: {},
        watch: {},
        data() {
            return {
                tableShow: false
            }
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

            showFormula() {
                this.tableShow = !this.tableShow
            }
        }
    }
</script>

<style scoped>
    .content-table-des {
        width: 100%;
        height: 40px;
        cursor: pointer;
        background-color: #2db060 ;
        padding-left: 50px;
        line-height: 40px;
        font-size: 20px;
        border-radius: 10px;
    }
</style>