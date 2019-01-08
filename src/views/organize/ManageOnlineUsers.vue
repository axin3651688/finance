<template>
    <div>
        <div class="main-header">
            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="请输入内容" clearable
                      class="input-with-select">
            </el-input>

            <div class="online-count"> 当前在线：{{tableData.length}}人</div>
        </div>


        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.aboutCompany.toLowerCase().includes(search.toLowerCase())|| data.role.toLowerCase().includes(search.toLowerCase()))"
                stripe style="width: 100%" class="main_table" :header-cell-style="getRowClass">
            <el-table-column prop="name" align="center" label="用户名" width="180">
                <template slot-scope="scope">
                    <div class="row-user-col">
                        <img class="row-user-avatar" :src="scope.row.avatar">
                        <span class="row-user-name">{{ scope.row.name }}</span>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="aboutCompany" align="center" label="所属公司" width="180">
            </el-table-column>
            <el-table-column prop="role" align="center" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="time" align="center" label="登录时间">
            </el-table-column>
        </el-table>
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
        padding-left: 0 !important;
        height: 100vh;
    }

    .main-header {
        padding: 20px 20px 0 20px;
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

    .main_table {
        width: 100%;
        margin : 20px;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);

        .row-user-col {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .row-user-avatar {
                margin-left: 20px;
                height: 40px;
                border-radius: 50%;
                width: 40px;
            }
            .row-user-name{
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                margin-left: 40px;
                color:rgba(102,102,102,1);
                opacity:1;
            }
        }
    }
</style>