<template>
    <div>
        <!--v-if="this.tableType === 'noCurrentPage'"-->
        <div
                class=""
        >
            <el-table
                    :data="tableData"
                    stripe
                    border
                    :height="tableType.height"
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

            <div class="tabListPage">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageSizes"
                        :page-size="PageSize"
                        :total="10"
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
            tableData: Array,
            tableType: Object
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
            // 将页码，及每页显示的条数以参数传递提交给后台
            getData(n1,n2){
                // 这里使用axios，使用时请提前引入
                axios.post(url,{
                        orgCode:1,
                        // 每页显示的条数
                        PageSize:n1,
                        // 显示第几页
                        currentPage:n2,
                    },{emulateJSON: true},
                    {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
                    }
                ).then(reponse=>{
                    console.log(reponse)
                    // 将数据赋值给tableData
                    this.tableData=data.data.body
                    // 将数据的长度赋值给totalCount
                    this.totalCount=data.data.body.length
                })
            },
            // 分页
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 点击每页显示的条数时，显示第一页
                this.getData(val, 1)
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage = val
                // 切换页码时，要获取每页显示的条数
                this.getData(this.PageSize, (val) * (this.pageSize))
            },
        }

    }
</script>

<style scoped>

</style>