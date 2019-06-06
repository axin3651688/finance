<template>
    <div>
        <div class="up">
            <div class="up-left">
                <el-button @click="systemAdd">添加</el-button>
                <el-button @click="systemChange">修改</el-button>
                <el-button @click="systemDelete">删除</el-button>
            </div>

            <div class="up-right">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="信息搜索">
                        <el-input placeholder="信息" v-model="searchData.searchMessage"></el-input>
                    </el-form-item>
                    <el-form-item label="时间搜索">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" v-model="searchData.searchDate1" placeholder="选择日期"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">至</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-date-picker type="date" v-model="searchData.searchDate2" placeholder="选择日期"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>

        <div class="down">
            <risk-system-table
                    :tableData="tableData"
                    :columns="columns"
                    :tableType="tableType"
                    @currentChange="currentChange"
                    @suggestClicled="suggestClicled"
                    @suggestAddClicked="suggestAddClicked"
            >
            </risk-system-table>
        </div>

        <div class="dialog-components">
            <el-dialog
                    :title="dialogTitle"
                    width="56%"
                    top="50px"
                    :close-on-click-modal="dialogCloseByClockOther"
                    :visible.sync="dialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <risk-system-add-change
                        :riskSystemData.sync="riskSystemData"
                        v-if="riskSystemData.show"
                >
                </risk-system-add-change>

                <risk-system-suggest-detail
                        :riskSystemSuggestDetailData.sync="riskSuggestDetail.riskSystemSuggestDetailData"
                        v-if="riskSuggestDetail.show"

                >
                </risk-system-suggest-detail>

                <risk-system-suggest-add
                        :riskSuggestAddData.sync="riskSuggestAdd.riskSuggestAddData"
                        v-if="riskSuggestAdd.show"
                >
                </risk-system-suggest-add>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    import riskSystemTable from './riskSystemTable'

    import riskSystemAddChange from './riskSystemAddChange'
    import riskSystemSuggestDetail from './riskSystemSuggestDetail'
    import riskSystemSuggestAdd from './riskSystemSuggestAdd'


    export default {
        name: "riskSystem",
        components: {
            riskSystemTable,
            riskSystemAddChange,
            riskSystemSuggestDetail,
            riskSystemSuggestAdd
        },
        props: {},
        data() {
            return {
                searchData: {
                    searchMessage: '',
                    searchDate1: '',
                    searchDate2: ''
                },
                tableData: [],
                columns: [],
                tableType: {
                    type: 'currentPage',
                    height: 550
                },


                dataFresh: false,
                dialogCloseByClockOther:false,
                dialogTitle: 'eeee',
                dialogVisible: false,

                riskSystemData: {
                    show: false,
                    title: '',
                    issuedNumber: '',
                    writtenDate: '',
                    releaseDate: '',
                    files: ''
                },

                riskSuggestDetail: {
                    show: false,
                    riskSystemSuggestDetailData:[
                        {
                            publishDept: '纪检部',
                            proposedDate: '2019年4月1日',
                            proposedUser: '张三',
                            proposedContent: 'q'
                        },
                        {
                            publishDept: '考核部',
                            proposedDate: '2019年5月1日',
                            proposedUser: '李四',
                            proposedContent: 'w'
                        },
                        {
                            publishDept: '外交部',
                            proposedDate: '2019年6月1日',
                            proposedUser: '王二麻',
                            proposedContent: 'e'
                        }
                    ]
                },

                riskSuggestAdd: {
                    show: false,
                    riskSuggestAddData:{
                        riskName: 'rrr',
                        riskDate: '2019年4月1号',
                        riskUser: 'ffffff',
                        riskContent: ''
                    }
                }

            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/riskSystem/riskSystemTable.json").then(res => {
                if (res.data.code === 200) {
                    _this.tableData = res.data.rows;
                    _this.columns = res.data.columns
                }
            });

            this.getTableData();
        },
        mounted() {
        },
        methods: {

            /**
             * 制度添加
             */
            systemAdd() {
                this.dialogTitle = 'wwww';
                this.dialogVisible = true;
                this.riskSystemData.show = true;
                this.riskSuggestDetail.show = false;
                this.riskSuggestAdd.show = false;

                this.dialogTitle = '添加风险制度';
            },

            /**
             * 制度修改
             */
            systemChange() {
                this.dialogTitle = 'qqq';
                this.dialogVisible = true;
                this.riskSystemData.show = true;
                this.riskSuggestDetail.show = false;
                this.riskSuggestAdd.show = false;

                this.dialogTitle = '修改风险制度';
            },

            /**
             *
             * 建议详情
             * @param scope
             */
            suggestClicled(scope) {
                this.dialogTitle = 'rrrr';
                this.dialogVisible = true;
                this.riskSuggestDetail.show = true;
                this.riskSystemData.show = false;
                this.riskSuggestAdd.show = false;

                let _title = scope.row.title;

                this.dialogTitle = '关于【' + _title + '】的相关建议';
            },

            /**
             *
             * 添加建议
             * @param scope
             */
            suggestAddClicked(scope){
                this.dialogTitle = 'ttttt';
                this.dialogVisible = true;
                this.riskSuggestAdd.show = true;
                this.riskSystemData.show = false;
                this.riskSuggestDetail.show = false;

                let _title = scope.row.title;

                this.dialogTitle = '针对【' + _title + '】的制度建议';
            },

            /**
             * 制度删除
             */
            systemDelete() {

            },

            /**
             * 分页改变
             */
            currentChange() {

            },

            /**
             * 获取表格数据
             */
            getTableData() {

            },

            /**
             * 获取弹出层标题
             */
            getDialogTitle() {
                return 'rrrrrr';
            }
        }
    }
</script>

<style scoped>
    .up {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .dialog-components .el-dialog__header{
        background-color: #2d8cf0;
    }
</style>