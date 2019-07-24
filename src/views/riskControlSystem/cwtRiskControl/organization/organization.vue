<template>
    <div>


        <div class="parent">
            <div class="title">天津食品集团有限公司风险组织架构图</div>


            <template v-for="item in leaderList">
                <span :class="'leaderList' + item.id" @click="deptClick(item)">
                    {{item.value}}
                    </span>
            </template>


            <div class="first-svg">
                <svg width="121px" height="160px">
                    <polyline points="1,80 60,80 60,1 60,160 60,110 120,110" fill="none" stroke="#C3D8CE"
                              stroke-width="4"></polyline>

                </svg>
            </div>

            <div class="second-svg">
                <svg width="1005px" height="120px">
                    <polyline points="1,120 20,100 500,100 500,1 500,50 560,50 500,50 500,100 985,100 1004,120"
                              fill="none" stroke="#C3D8CE" stroke-width="4"></polyline>
                </svg>
            </div>

            <div class="single-dept">
                <div
                        v-for="(item, key) in deptList"
                        :key="key"
                        class="dept"
                        @click="deptClick(item)"
                >
                    {{item.value}}
                </div>
            </div>
        </div>

        <div class="risk-back-dialog" v-if="dialogVisible">
            <el-dialog
                    :title="getDialogTitle()"
                    width="1160px"
                    top="70px"
                    @close="dialogCloseEvent"
                    :visible.sync="dialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px;"></div>

                <div class="content-all">
                    <div class="content-div">
                        <el-table
                                :data="responsibility"
                                :span-method="objectSpanMethod"
                                :max-height='tableHeight'
                                :header-cell-style="headerRowStyle"
                                border
                                style="width: 100%; margin-top: 20px">
                            <el-table-column
                                    prop="responsibility"
                                    label="部门职责"
                                    align="center"
                                    width="400"
                            >
                            </el-table-column>

                        </el-table>
                    </div>
                    <div class="content-table">
                        <el-table
                                :data="tableData"
                                :span-method="objectSpanMethod"
                                :max-height='tableHeight'
                                :header-cell-style="headerRowStyle"
                                border
                                style="width: 100%; margin-top: 20px">


                            <el-table-column
                                    prop="ROW_ID"
                                    label="序号"
                                    width="60"
                                    align="center"
                            >
                            </el-table-column>

                            <el-table-column
                                    prop="userId"
                                    label="用户名"
                                    width="110"
                                    align="center"
                            >
                            </el-table-column>

                            <el-table-column
                                    prop="userName"
                                    label="姓名"
                                    width="110"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="political"
                                    label="政治面貌"
                                    width="100"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="education"
                                    label="教育程度"
                                    width="100"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="profession"
                                    label="专业职称"
                                    width="100"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="job"
                                    label="现任职务"
                                    width="100"
                                    align="center"
                            >
                            </el-table-column>
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
            </el-dialog>
        </div>


    </div>
</template>

<script>
    import {departmentClickEvent, getAllDepartment} from '~api/cwtRiskControl/riskControlRequest'
    // import { mapGetters } from "vuex";
    import cwtPublicJS from '../mixin/cwtPublicJS'


    export default {
        name: "organization",
        mixins: [cwtPublicJS],
        components: {},
        props: {},
        data() {
            return {
                leaderList: [
                    {
                        id: '01',
                        value: '董事会'
                    }
                ],
                deptList: [
                    {
                        id: '01',
                        value: '董事会'
                    }
                ],

                dialogVisible: false,
                tableHeight: 550,
                clickedDepart: null,
                tableData: [],
                responsibility: [],


                // 默认显示第几页
                currentPage: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [1, 2, 3, 4],
                // 默认每页显示的条数（可修改）
                PageSize: 1,

                //一共多少叶
                total: null
            }
        },
        created() {
            this.initDepartmentData();
        },
        mounted() {
            this.doNotShowDim(false);
        },
        methods: {
            /**
             * 部门点击事件
             * @param params
             */
            deptClick(params) {
                this.dialogVisible = true;
                this.clickedDepart = params;

                this.getAllData();
            },

            /**
             * 翻页事件
             * @param pagenum
             */
            getAllData(pagenum) {
                let _this = this;
                let _getters = _this.$store.getters,
                    company = _getters.company;
                let deptId = this.clickedDepart.id;

                let sendParams = {
                    dept: deptId,
                    com: company,
                    page: pagenum || 1,
                    size: 10
                };

                departmentClickEvent(sendParams).then((res) => {
                    if (res.data.code === 200) {
                        let _data = res.data.data;

                        _this.total = _data.users.lastPage;
                        _this.responsibility = [{responsibility: _data['deptDesc']}];
                        _this.tableData = _data.users.list;
                    }
                })
            },

            /**
             * 获取弹窗title的犯方法
             */
            getDialogTitle() {
                // return "fffffffff";
                let _clickedDepart = this.clickedDepart;
                let sname = _clickedDepart.value;
                return '【' + sname + '】部门详细信息'
            },

            /**
             * 弹窗关闭的时候调用的方法
             */
            dialogCloseEvent() {

            },

            /**
             * 格式化行列格式
             * @param row
             * @param column
             * @param rowIndex
             * @param columnIndex
             * @returns {{rowspan: number, colspan: number}}
             */
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                /*let _dataLength = this.tableData.length;
                if (columnIndex === 0) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: _dataLength,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }*/
            },

            /**
             * 改变表头样式
             */
            headerRowStyle(row) {
                if (row.rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)';
                } else {
                    return "";
                }
            },

            /**
             * 部门职责单元格格式化
             * @param row
             * @param column
             * @param cellValue
             * @param index
             */
            responsibilityDataFormatter(row, column, cellValue, index) {
                /*// return row.responsibility;
                let html = '<span style="max-height: 400px">' + row.responsibility + '</span>';
                return html;*/
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
                this.getAllData(val)
            },

            /**
             * 获取所有部门数据请求
             */
            initDepartmentData() {
                let _this = this;
                let params = {};
                getAllDepartment(params).then((res) => {
                    if (res.data.code === 200) {
                        let _data = res.data.data;
                        _this.leaderList = _data[0];
                        _this.deptList = _data[1];
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .parent {
        position: relative;
        width: 1000px;
        height: 800px;
        margin-left: 260px;
        margin-top: 50px;
    }

    .title {
        font-size: 30px;
        text-align: center;
        color: #016A36;
        font-weight: 700;
    }

    .leaderList01, .leaderList0101, .leaderList0102, .leaderList0103, .leaderList0104 {
        position: absolute;
        padding: 8px 36px;
        border: 1px solid darkgray;
        border-radius: 3px;
        cursor: pointer;
        color: #F6F6F6;
    }

    .leaderList01 {
        left: 440px;
        top: 50px;
        background: #016A36;
    }

    .leaderList0101 {
        top: 142px;
        left: 271px;
        background-color: #4BBA62;
    }

    .leaderList0102 {
        top: 174px;
        left: 560px;
        background-color: #016A36;
    }

    .leaderList0103 {
        top: 242px;
        left: 440px;
        background-color: #4BBA62;
    }

    .leaderList0104 {
        top: 306px;
        left: 560px;
        z-index: 2;
        background-color: #4BBA62;
    }

    .first-svg, .second-svg, .single-dept {
        position: absolute;
        color: #439354;
    }

    .first-svg {
        top: 82px;
        left: 440px;
    }

    .second-svg {
        top: 274px;
    }

    .single-dept {
        display: flex;
        top: 400px;
        width: 1008px;
        justify-content: space-around;
    }

    .dept {
        width: 38px;
        word-wrap: break-word;
        padding: 10px;
        border: 1px solid darkgray;
        border-radius: 3px;
        cursor: pointer;
        background-color: #ADD684;
    }

    .content-all {
        display: inline-flex;
    }

    /*.content-div{
        border: 1px solid red;
        width: 200px;
        height: 420px;
    }*/
</style>