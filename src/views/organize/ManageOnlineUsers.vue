<template>
    <div>
        <el-input v-model="search"  suffix-icon="el-icon-search" placeholder="请输入内容" clearable class="input-with-select">
        </el-input>

        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.aboutCompany.toLowerCase().includes(search.toLowerCase())|| data.role.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%" class="main_table" :header-cell-style="getRowClass">
            <el-table-column prop="name" align="center" label="用户名" width="180">
                <template slot-scope="scope">
                    <img class="row-user-avatar" :src="scope.row.avatar">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
                search:'',
                tableData: [{
                    avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    time: '2016-05-02',
                    name: '王小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    time: '2016-05-02',
                    name: '张小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
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
            getRowClass({ row, column, rowIndex, columnIndex }) {
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .input-with-select {
        width: 220px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        opacity: 1;
        margin-top: 24px;
        border-radius: 8px;
    }

    .main_table{
        margin-top: 20px;
        border-radius:20px 20px 0px 0px;
        box-shadow:0px 10px 20px rgba(8,69,81,0.1);
        .row-user-avatar{
            height: 40px;
            width: 40px;
        }
    }
</style>