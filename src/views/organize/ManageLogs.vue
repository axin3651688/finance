<template>
    <div class="root">

        <div class="header">

            <el-dropdown  trigger="click"  @command="handleCommand">
                <el-button  type="plain" class="btn-module" >{{tipModule}}<i class="el-bi-icon-xiala"  style="margin-left: 10px"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item.module" v-for="item in tableData">{{item.module}}</el-dropdown-item>
                        <el-dropdown-item  command="0">不选择</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable class="input-with-select">
            </el-input>
        </div>


        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.action.toLowerCase().includes(search.toLowerCase()))"
                stripe height="80vh" max-height="80vh" class="main_table" :header-cell-style="getHeaderClass"
                :cell-style="getRowClass" :default-sort="{prop: 'time', order: 'descending'}">
            <el-table-column prop="name" align="center" min-width="20%" label="操作人"  >
                <template slot-scope="scope">
                    <div class="row-user-an">
                    <div class="row-user-col">
                        <img class="row-user-avatar" :src="scope.row.avatar">
                        <span class="row-user-name">{{ scope.row.name }}</span>
                    </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="module" align="center" min-width="20%" label="模块"  >
            </el-table-column>
            <el-table-column prop="action" align="center" min-width="40%" label="动作"  >
            </el-table-column>
            <el-table-column prop="time" min-width="10%" align="center" label="时间">
            </el-table-column>
        </el-table>

        <div class="page">
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
        name: 'ManageLogs',
        data() {
            return {
                search: '',
                currentPage:1,
                tableData: [],
                tipModule:'模块',
            }
        },
        mounted() {
            this.getTableData()
        },
        methods: {
            getTableData(){
                let tempList=[];
                for (let i =0;i<14;i++) {
                  let temp =   {
                        avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                            time: '2016-10-05',
                        name: 'Name:'+i,
                        module: '分析助手:'+i,
                        action: '修改了报告:'+i,
                        id:i,
                    }
                    tempList.push(temp)
                }
                this.tableData = tempList;
            },
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleCommand(command) {
                if (command=='0'){
                    this.tipModule  = "模块"
                }else {
                    this.tipModule  = command
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 20px !important;
        height: 100vh;
        width: 100%;
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

        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:19px;
        color:rgba(102,102,102,0.80);
        opacity:1;
    }

    .root {
        padding: 20px;

        .btn-module{
            height:30px;
            min-width: 160px;
            background:rgba(255,255,255,1);
            box-shadow:0px 3px 6px rgba(0,0,0,0.2);
            opacity:1;
            border-radius:8px;
            border: 0px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            line-height:19px;
            color:rgba(102,102,102,0.80);
            i{
                font-size: 14px;
            }
            /deep/.el-button{
                padding: 0px 20px 0px 20px;
                color:rgba(102,102,102,0.80);
            }
            /deep/.el-button:focus, .el-button:hover{
                color:rgba(102,102,102,0.80);
            }
        }

        .header {
            padding: 20px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: start;
            .input-with-select {
                width: 220px;
                height: 30px;
                margin-left: 20px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                opacity: 1;
                border-radius: 8px;
            }

        }


        .main_table {
            margin: 20px 0px 0px 0px;
            border-radius: 20px 20px 20px 20px;
            box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
            /deep/ .gutter{
                background: rgba(221,235,246,1);
            }

            .row-user-an{
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