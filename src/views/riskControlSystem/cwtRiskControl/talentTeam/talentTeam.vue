<template>
    <div>
        <div class="talent-team-top">
            <span>维度信息</span>

            <div class="top-assort-select">
                <el-select
                        v-model="assortSelectedValue.sname"
                        placeholder="请选择"
                        @change="assortSelect"
                 value="">
                    <el-option
                            v-for="item in assortOptions"
                            :key="item.scode"
                            :label="item.sname"
                            :value="item.scode"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="top-department-select" v-if="false">
                <el-select
                        v-model="departmentSelectedValue.sname"
                        placeholder="请选择"
                        @change="departmentSelect"
                 value="">
                    <el-option
                            v-for="item in departmentOptions"
                            :key="item.scode"
                            :label="item.sname"
                            :value="item.scode"
                    >
                    </el-option>
                </el-select>
            </div>


            <div class="top-button" v-if="false">
                <el-button
                        type="primary"
                        @click="dimSelected"
                >确定
                </el-button>
            </div>


        </div>

        <div class="talent-team-center">
            <div class="center-echart">
                <echart-component
                        :tableData="selectedTableData"
                        :dataFresh="dataFresh"
                >
                </echart-component>
            </div>
            <div class="center-table">
                <talent-table
                        :tableData="selectedTableData"
                        :columns="selectedColumns"
                        :tableType="selectedTableType"

                >
                </talent-table>
            </div>
        </div>

        <div class="talent-team-bottom">
            <talent-table
                    :tableData="allTableData"
                    :columns="allColumns"
                    :tableType="allTableType"
                    :dataFresh="dataFresh"
                    @currentChange="currentChange"
            >
            </talent-table>
        </div>
    </div>
</template>

<script>
    import echartComponent from './echartComponent'
    import talentTable from "./talentTable";
    import {findThirdPartData} from "~api/interface"
    import {getAllPerson, getDepartments, getCurrentPageData} from '~api/cwtRiskControl/riskControlRequest'
    import {mapGetters} from "vuex"
    import cwtPublicJS from '../mixin/cwtPublicJS'
    export default {
        name: "talentTeam",
        mixins:[cwtPublicJS],
        components: {
            echartComponent,
            talentTable
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.getAllData();
            },
            year(newValue, oldValue) {
                this.getAllData();
            },
            month(newValue, oldValue) {
                this.getAllData();
            }
        },

        props: {},
        data() {
            return {
                assortOptions: [
                    {
                        scode: 'SPOLITICSSTATUS',
                        sname: '政治面貌'
                    },
                    {
                        scode: 'SQUALIFICATIONS',
                        sname: '教育程度'
                    },
                    {
                        scode: 'SPROFESSIONALTITLE',
                        sname: '专业职称'
                    },
                    {
                        scode: 'SPRESENTPOST',
                        sname: '现任职务'
                    }
                ],
                departmentOptions: [],
                assortSelectedValue: {
                    scode: 'SPOLITICSSTATUS',
                    sname: '政治面貌'
                },
                departmentSelectedValue: {
                    scode: '',
                    sname: ''
                },

                selectedTableData: [],
                selectedColumns: [],
                selectedTableType: {
                    type: 'noCurrentPage',
                    height: 510
                },

                allTableData: [],
                allColumns: [],
                allTableType: {
                    type: 'currentPage',
                    height: 450
                },
                dataFresh: false
            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/talentTeam/talentTeamTable1.json").then(res => {
                if (res.data.code === 200) {
                    // _this.selectedTableData = res.data.rows;
                    _this.selectedColumns = res.data.columns
                }
            });


            this.axios.get("/cnbi/json/source/tjsp/cwtJson/talentTeam/talentTeamTable2.json").then(res => {
                if (res.data.code === 200) {
                    // _this.allTableData = res.data.rows;
                    _this.allColumns = res.data.columns
                }
            });

            this.setDepartmentOptions();


            // this.getSelectedData();
            this.getAllData();

        },
        mounted() {
            this.doNotShowDim(false);
        },
        methods: {
            /**
             * 获取部门选择的options
             */
            setDepartmentOptions() {
                let _this = this,
                    _getters = _this.$store.getters,
                    company = _getters.company;
                let requestParams = {};
                requestParams['company'] = company;

                getDepartments(requestParams).then(res => {
                    if (res.data.code === 200) {
                        _this.departmentOptions = res.data.data;
                        _this.departmentOptions.push({scode: '', sname: ""})
                    }
                });
            },

            /**
             * 获取条件筛选数据
             */
            getSelectedData() {
                let _this = this;
                let params = this.getDimParams();
                params['type'] = 'selected';
                _this.getSelectedPersonRequestSend(params);
            },

            /**、
             * 获取所有数据
             */
            getAllData() {
                let params = {
                    dim: 'SPOLITICSSTATUS',
                    deptId: ''
                };
                params['type'] = 'all';
                this.getSelectedPersonRequestSend(params);
            },

            /**
             * 维度选择确认按钮
             */
            dimSelected() {
                this.getSelectedData();
                let _selectedColumns = this.selectedColumns;
                _selectedColumns[0].text = this.assortSelectedValue.sname

            },
            /**
             * 获取维度参数数据
             */
            getDimParams() {
                return {
                    dim: this.assortSelectedValue.scode,
                    deptId: this.departmentOptions.scode
                }
            },

            /**
             * 四大维度选择事件
             * @param value
             */
            assortSelect(value) {
                this.assortSelectedValue.scode = value;

                let _allAssortOptions = this.assortOptions;
                let _selectedOption = _allAssortOptions.filter((item) => {
                    return item.scode === value;
                });

                this.assortSelectedValue.sname = _selectedOption[0].sname;

                this.dimSelected();

            },

            /**
             * 部门选择事件
             * @param value
             */
            departmentSelect(value) {
                this.departmentOptions.scode = value;
            },

            /**
             * 获取人员列表请求发送
             * @param params
             */
            getSelectedPersonRequestSend(params) {
                let _this = this;
                getAllPerson(params).then(res => {
                    if (res.data.code === 200) {
                        if (params.type === 'all') {
                            _this.selectedTableData = res.data.data.ratio;
                            _this.allTableData = res.data.data.detail.list;

                            _this.allTableType.lastPage = res.data.data.detail.lastPage;

                        } else {
                            _this.selectedTableData = res.data.data.ratio;
                        }
                    }
                    this.dataFresh = !this.dataFresh;
                });

            },

            /**
             * 分页切换
             * @param value
             */
            currentChange(value) {
                let _this = this;
                let params = {
                    page: value
                };
                getCurrentPageData(params).then(res => {
                    if (res.data.code === 200) {
                        _this.allTableData = res.data.data.list;
                        _this.allTableType.lastPage = res.data.data.lastPage;
                    }
                });
            },

        }
    }
</script>

<style scoped>
    .talent-team-top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .top-assort-select, .top-department-select, .top-button {
        margin-left: 10px;
    }

    .talent-team-top {
        background-color: rgba(228, 228, 228, 1);
        padding: 10px;
    }

    .talent-team-center {
        display: inline-flex;
        overflow: hidden;

    }

    .center-echart {
        /*border: 1px solid red;*/
        width: 700px;
        margin-right: 10px;

    }

    .center-table {
        /*max-height: 550px;*/
        height: 580px;
    }

    .talent-team-bottom {
        margin-top: 16px;
    }


</style>