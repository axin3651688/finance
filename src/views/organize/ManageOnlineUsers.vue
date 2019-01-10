<template>
    <div class="root">
        <div class="main-header">
            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="请输入内容" clearable
                      class="input-with-select">
            </el-input>

            <div class="online-count"> 当前在线：{{tableData.length}}人</div>
        </div>


        <div class="main-table">
            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.aboutCompany.toLowerCase().includes(search.toLowerCase())|| data.role.toLowerCase().includes(search.toLowerCase()))"
                    stripe     :header-cell-style="getRowClass">
                <el-table-column prop="name" align="center" label="用户名" min-width="20%">
                    <template slot-scope="scope">
                        <div class="row-user-an">
                            <div class="row-user-col">
                                <img class="row-user-avatar" :src="scope.row.avatar">
                                <span class="row-user-name">{{ scope.row.name }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="aboutCompany" align="center" label="所属公司" min-width="40%">
                </el-table-column>
                <el-table-column prop="role" align="center" label="角色" min-width="30%">
                </el-table-column>
                <el-table-column prop="time" align="center" label="登录时间" min-width="10%">
                </el-table-column>
            </el-table>
        </div>


        <div class="page" >
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'Todo',
        data() {
            return {
                search: '',
                tableData: [{
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    time: '2016-05-02',
                    name: '王小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    time: '2016-05-02',
                    name: '张小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    time: '2016-05-02',
                    name: '赵小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }]
            }
        },
        mounted() {

        },
        methods: {
            //设置表格第一行的颜色
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(221,235,246,1);font-size:16px;' +
                        'font-family:Microsoft YaHei;' +
                        'font-weight:bold;' +
                        'color:rgba(19,84,143,1);' +
                        'opacity:1;';
                } else {
                    return ''
                }
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
        height: 100%;

        .main-header {
            padding: 20px 20px 0  0px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

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
            border-radius: 20px 20px 20px 20px;
            box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);

            /deep/ .gutter {
                background: rgba(221, 235, 246, 1);
            }

            .row-user-an {
                display: flex;
                flex-direction: row;
                justify-content: center;
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
        .page{
            margin: 10px 0 20px 0;
        }
    }
</style>