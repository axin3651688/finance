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
                        <el-button type="primary" @click="queryByFiledSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>

        <div class="down">
            <risk-system-table
                    :tableData="tableData"
                    :columns="columns"
                    :tableType="tableType"
                    :tableDataFresh="tableDataFresh"
                    @currentChange="currentChange"
                    @suggestClicled="suggestClicled"
                    @suggestAddClicked="suggestAddClicked"
                    @riskSystemChangeData="riskSystemChangeData"
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
                        v-if="riskSystemData.show"
                        :riskSystemSingleData.sync="riskSystemData.riskSystemSingleData"
                        :riskSystemSingleDataFresh="riskSystemSingleDataFresh"
                        :systemAddFresh="systemAddFresh"
                        @pageClose="pageClose"
                        @addSuccess="addSuccess"
                >
                </risk-system-add-change>

                <risk-system-suggest-detail
                        :riskSystemSuggestDetailData.sync="riskSuggestDetail.riskSystemSuggestDetailData"
                        v-if="riskSuggestDetail.show"

                >
                </risk-system-suggest-detail>

                <risk-system-suggest-add
                        :rowData.sync="riskSuggestAdd.rowData"
                        :systemAddFresh="systemAddFresh"
                        v-if="riskSuggestAdd.show"
                        @pageClose="pageClose"
                        @addSuccess="addSuccess"
                >
                </risk-system-suggest-add>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    import riskSystemTable from './riskSystemTable'
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import riskSystemAddChange from './riskSystemAddChange'
    import riskSystemSuggestDetail from './riskSystemSuggestDetail'
    import riskSystemSuggestAdd from './riskSystemSuggestAdd'
    import {mapGetters} from "vuex"

    import {
        getRiskSystemTableData,
        getQueryByFiledTableData,
        riskSystemDelete,
        riskSystemSuggestDetailQuery
    } from '~api/cwtRiskControl/riskControlRequest'


    export default {
        name: "riskSystem",
        mixins: [cwtPublicJS],
        components: {
            riskSystemTable,
            riskSystemAddChange,
            riskSystemSuggestDetail,
            riskSystemSuggestAdd
        },
        props: {},
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.getTableData();
            },
            year(newValue, oldValue) {
                this.getTableData();
            },
            month(newValue, oldValue) {
                this.getTableData();
            }
        },
        data() {
            return {
                searchData: {
                    searchMessage: '',
                    searchDate1: '',
                    searchDate2: ''
                },
                tableData: {},
                columns: [],
                tableType: {
                    type: 'currentPage',
                    height: 550
                },
                tableDataFresh: false,
                isQueryByFiled: false,


                dataFresh: false,
                dialogCloseByClockOther: false,
                dialogTitle: 'eeee',
                dialogVisible: false,

                riskSystemData: {
                    show: false,
                    riskSystemSingleData: {
                        title: '',
                        issuedNumber: '',
                        writtenDate: '',
                        releaseDate: '',
                        files: ''
                    }
                },
                riskSystemSingleDataFresh: false,

                riskSuggestDetail: {
                    show: false,
                    riskSystemSuggestDetailData: [
                        {
                            proposedDate: '2019年4月1日',
                            proposedUser: '张三',
                            proposedContent: 'q'
                        },
                        {
                            proposedDate: '2019年5月1日',
                            proposedUser: '李四',
                            proposedContent: 'w'
                        },
                        {
                            proposedDate: '2019年6月1日',
                            proposedUser: '王二麻',
                            proposedContent: 'e'
                        }
                    ]
                },

                riskSuggestAdd: {
                    show: false,
                    rowData: {}
                },

                systemAddFresh: false,

                //要删除的数组
                deleteSyatemList: []


            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/riskSystem/riskSystemTable.json").then(res => {
                if (res.data.code === 200) {
                    // _this.tableData = res.data.rows;
                    _this.columns = res.data.columns
                }
            });

            this.getTableData();
        },
        mounted() {
            this.doNotShowDim(true);
        },
        methods: {

            /**
             * 制度添加
             */
            systemAdd(event, change) {
                if (change) return;
                this.dialogVisible = true;
                this.riskSystemData.show = true;
                this.riskSuggestDetail.show = false;
                this.riskSuggestAdd.show = false;

                this.dialogTitle = '添加风险制度';

                this.systemAddFresh = !this.systemAddFresh;

            },

            /**
             * 制度修改
             */
            systemChange() {
                if (this.deleteSyatemList.length === 0) {
                    this.$message({
                        message: '请选择要修改的制度',
                        type: 'warning'
                    });
                    return;
                }
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
                this.dialogVisible = true;
                this.riskSuggestDetail.show = true;
                this.riskSystemData.show = false;
                this.riskSuggestAdd.show = false;

                let _title = scope.row.title;

                this.dialogTitle = '关于【' + _title + '】的相关建议';


                this.riskSuggestDetail.riskSystemSuggestDetailData = []

                let params = {
                    infoId: scope.row.nid
                };

                riskSystemSuggestDetailQuery(params).then(res => {
                    if (res.data.code === 200) {
                        this.riskSuggestDetail.riskSystemSuggestDetailData = res.data.data;
                    }
                });


            },

            /**
             *
             * 添加建议
             * @param scope
             */
            suggestAddClicked(scope) {
                this.dialogVisible = true;
                this.riskSuggestAdd.show = true;
                this.riskSystemData.show = false;
                this.riskSuggestDetail.show = false;

                let _title = scope.row.title;

                this.dialogTitle = '针对【' + _title + '】的制度建议';

                this.riskSuggestAdd.rowData = scope.row;
                this.systemAddFresh = !this.systemAddFresh;

            },

            /**
             * 制度删除
             */
            systemDelete() {
                if (this.deleteSyatemList.length === 0) {
                    this.$message({
                        message: '请选择要删除的制度',
                        type: 'warning'
                    });
                    return;
                }

                let _this = this;
                let _deleteSyatemList = this.deleteSyatemList;
                let vos = [];
                _deleteSyatemList.forEach((item) => {
                    let emptyData = {
                        nid: '',
                        savePath: ''
                    };
                    emptyData.nid = item.nid;
                    emptyData.savePath = item.savePath;
                    vos.push(emptyData);
                });


                let sendParams = JSON.stringify(vos);


                riskSystemDelete(sendParams).then(res => {
                    if (res.data.code === 200) {
                        _this.$message({
                            message:'删除成功',
                            type:'success'
                        });

                        this.getTableData();
                    }else{
                        _this.$message({
                            message:'删除失败',
                            type:'error'
                        });
                    }
                })
            },

            /**
             * 分页改变
             */
            currentChange(val) {
                let _this = this;
                let _isQueryByFiled = _this.isQueryByFiled;
                if (!_isQueryByFiled) {
                    this.getTableData(val);
                } else {
                    this.getQueryByFiledTableData(val);
                }
            },

            /**
             * 获取表格数据
             */
            getTableData(val) {
                let _this = this,
                    _getters = _this.$store.getters,
                    company = _getters.company;
                let params = {
                    com: company,
                    pageNum: val || 1
                };

                getRiskSystemTableData(params).then(res => {
                    if (res.data.code === 200) {
                        _this.tableData = res.data.data;
                        _this.tableDataFresh = !_this.tableDataFresh;
                    }
                });
            },

            /**
             * 模糊查询获取表格数据
             */
            getQueryByFiledTableData(val) {
                let _this = this,
                    _getters = _this.$store.getters,
                    company = _getters.company;

                let _param = this.geQueryByFiledTableDataParam();

                _param.pageNum = val || 1;
                _param.size = 10;
                _param.com = company;

                getQueryByFiledTableData(_param).then(res => {
                    if (res.data.code === 200) {
                        _this.tableData = res.data.data;
                        _this.tableDataFresh = !_this.tableDataFresh;
                    }
                });
            },

            /**
             * 获取弹出层标题
             */
            getDialogTitle() {
                return 'rrrrrr';
            },

            /**
             * 关闭弹窗事件
             */
            pageClose(params) {
                this.dialogVisible = false;
                this.riskSuggestAdd.show = false;
                this.riskSystemData.show = false;
                this.riskSuggestDetail.show = false;
            },

            /**
             * 模糊查询按钮
             */
            queryByFiledSearch() {
                this.getQueryByFiledTableData();
            },

            geQueryByFiledTableDataParam() {
                let params = {};
                let _searchData = this.searchData;
                params.filed = _searchData.searchMessage;
                params.startDate = this.getDateNowYMD(_searchData.searchDate1);
                params.endDate = this.getDateNowYMD(_searchData.searchDate2);
                params.startDate =  _searchData.searchDate1 === null ? '' : params.startDate;
                params.endDate = _searchData.searchDate2 === null ? '' : params.endDate;
                return params;
            },

            /**
             * 制度添加成功回调
             */
            addSuccess() {
                this.getTableData();
            },

            /**
             * 风险选中的数据
             * @param value
             */
            riskSystemChangeData(value) {
                if (!value.length > 0) {
                    this.deleteSyatemList = [];
                    return;
                }
                this.deleteSyatemList = value;
                let selectedData = value[0];

                let _data = this.riskSystemData.riskSystemSingleData;

                _data.title = selectedData.title;
                _data.issuedNumber = selectedData.issuedNumber;
                _data.writtenDate = selectedData.writtenDate;
                _data.releaseDate = selectedData.releaseDate;
                _data['nid'] = selectedData.nid;
                _data['savePath'] = selectedData.savePath;


                this.riskSystemSingleDataFresh = !this.riskSystemSingleDataFresh;
                this.systemAdd(null, 'change');
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

    .dialog-components .el-dialog__header {
        background-color: #2d8cf0;
    }
</style>