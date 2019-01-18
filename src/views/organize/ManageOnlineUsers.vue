<template>
    <div class="root">
        <div class="main-header">
            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="请输入内容" clearable
                      class="input-with-select">
            </el-input>

            <div class="online-count"> 当前在线：{{totalCount}}人</div>
        </div>


        <el-table
                :data="pageData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.aboutCompany.toLowerCase().includes(search.toLowerCase())|| data.role.toLowerCase().includes(search.toLowerCase()))"
                stripe height="100%" max-height="100%" class="main-table"
                :header-cell-style="getHeaderClass"
                :cell-style="getRowClass">
            <el-table-column prop="name" align="center" label="用户名" min-width="20%">
                <template slot-scope="scope">
                    <div class="row-user-an">
                        <div class="row-user-col">
                            <img class="row-user-avatar" :src="scope.row.avatar">
                            <span class="row-user-name">{{ scope.row.userName }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="belongCompanyName" align="center" label="所属公司" min-width="40%">
            </el-table-column>
            <el-table-column prop="roleNames" align="center" label="角色" min-width="30%">
            </el-table-column>
            <el-table-column prop="loginTime" align="center" label="登录时间" min-width="10%">
            </el-table-column>
        </el-table>

        <div class="page-row">
            <div class="page">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        background
                        layout="prev, pager, next, total, jumper"
                        :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
    import {ONLINE_USER_LIST} from '~api/organize.js';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Todo',
        data() {
            return {
                search: '',
                pageSize: 10,
                currentPage: 1,
                pageData: [],
                totalCount: 0,
            }
        },
        mounted() {

        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {
            this.getTableData()
        },
        methods: {
            //设置表格第一行的颜色
            getHeaderClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:rgba(221,235,246,1);font-size:16px;' +
                        'font-family:Microsoft YaHei;' +
                        'font-weight:bold;' +
                        'line-height:21px;' +
                        'color:rgba(19,84,143,1);' +
                        'opacity:1;';
                } else {
                    return ''
                }
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 == 0) {
                    console.log('rowIndex%2==0---' + rowIndex)
                    return 'background:rgba(255,255,255,1);' +
                        'height:50px';
                } else if (rowIndex % 2 == 1) {
                    console.log('rowIndex%2==1---' + rowIndex)
                    return 'background:rgba(196,215,233,0.15);' +
                        'height:50px';
                } else {
                    return ''
                }
            },
            getTableData() {
                let params = {
                    "page": this.currentPage,
                    "size": this.pageSize,
                    "userId": this.loginUserId
                }
                ONLINE_USER_LIST(params).then(res => {
                    console.log('请求ONLINE_USER_LIST：', res.data.data)
                    if (res.data.code === 200) {
                        this.totalCount = res.data.data.totalElements
                        this.pageData = res.data.data.data
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.getTableData()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 20px !important;
        height: 100vh;
    }

    /deep/ .el-input__inner {
        height: 30px;
        line-height: 30px;
        border: 0px;
    }

    /deep/ .el-input__icon {
        height: 100%;
        width: 25px;
        text-align: center;
        -webkit-transition: all .3s;
        transition: all .3s;
        line-height: 0px;
    }

    .root {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: start;

        .main-header {
            padding: 20px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .input-with-select {
                width: 220px;
                height: 30px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                opacity: 1;
                border-radius: 8px;
            }

            .online-count {
                font-size: 22px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                margin-right: 80px;
                color: rgba(24, 144, 255, 1);
                opacity: 1;
            }
        }

        .main-table {
            margin: 20px 0px 0px 0px;
            border-radius:20px 20px 0 0 ;

            /deep/ .gutter {
                background: rgba(221, 235, 246, 1);
            }

            .row-user-an {
                display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;

                .row-user-col {
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: center;

                    .row-user-avatar {
                        margin-left: 20px;
                        height: 40px;
                        border-radius: 50%;
                        width: 40px;
                    }

                    .row-user-name {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        margin-left: 20px;
                        color: rgba(102, 102, 102, 1);
                        opacity: 1;
                    }
                }
            }

        }

        .page-row {
            padding: 0 0 20px 0;
            border-radius: 0px 0px 20px 20px;
            box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
            background: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: center;

            .page {
                margin: 10px 0 0px 0;
            }
        }

    }
</style>