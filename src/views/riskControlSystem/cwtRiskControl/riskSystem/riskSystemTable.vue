<template>
    <div>
        <div>
            <el-table
                    :data="tableData.list"
                    stripe
                    border
                    height="600"
                    :header-cell-style="headerRowStyle"
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    empty-text="暂无风险制度"
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
                                <a style="color: #2d8cf0" @click="systemOverview(scope)">{{ scope.row[scope.column.property] }}</a>
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


            <div class="tabListPage">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageSizes"
                        :page-size="PageSize"
                        :total="total"
                        layout=" prev, pager, next, jumper"
                >
                </el-pagination>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "talentTable",
        components: {},
        props: {
            columns: Array,
            tableData: Object,
            tableDataFresh: Boolean
        },
        watch:{
            tableDataFresh(){
                this.initData()
            }
        },
        data() {
            return {
                // 默认显示第几页
                currentPage: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [1, 2, 3, 4],
                // 默认每页显示的条数（可修改）
                PageSize: 1,

                //一共多少叶
                total: null,

                //要删除的数组
                // deleteSyatemList:[]
            }
        },
        created() {
            this.initData();
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
            suggestClicled(scope) {
                this.$emit("suggestClicled", scope)
            },

            /**
             * 添加建议按钮点击
             */
            suggestAddClicked(scope) {
                this.$emit("suggestAddClicked", scope)
            },


            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize = val;
                // 点击每页显示的条数时，显示第一页
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1;
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage = val;
                // 切换页码时，要获取每页显示的条数
                this.$emit("currentChange", val);
            },

            /**
             * 初始化页面数据
             */
            initData() {
                let _tableData = this.tableData;
                this.total = _tableData['lastPage'];
            },



            handleSelectionChange(value){
                // this.deleteSyatemList = value;
                this.$emit("riskSystemChangeData", value);
            },


            /**
             * 制度预览
             * @param scope
             */
            systemOverview(scope){
                window.open(scope.row.savePath, '_blank');
            }

        }

    }
</script>

<style scoped>
    .tabListPage {
        margin-bottom: 50px;
    }
</style>