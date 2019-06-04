<template>
    <div>
        <div class="talent-team-top">
            <span>维度信息</span>

            <div class="top-assort-select">
                <el-select
                        v-model="assortSelectedValue.sname"
                        placeholder="请选择"
                        @change="assortSelect"
                >
                    <el-option
                            v-for="item in assortOptions"
                            :key="item.scode"
                            :label="item.sname"
                            :value="item.scode"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="top-department-select">
                <el-select
                        v-model="departmentSelectedValue.sname"
                        placeholder="请选择"
                        @change="departmentSelect"
                >
                    <el-option
                            v-for="item in departmentOptions"
                            :key="item.scode"
                            :label="item.sname"
                            :value="item.scode"
                    >
                    </el-option>
                </el-select>
            </div>


            <div class="top-button">
                <el-button
                        type="primary"
                        @click="dimSelected"
                >确定
                </el-button>
            </div>


        </div>

        <div class="talent-team-center">
            <div class="center-echart">
                <echart-component></echart-component>
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
            >
            </talent-table>
        </div>
    </div>
</template>

<script>
    import echartComponent from './echartComponent'
    import talentTable from "./talentTable";
    import {findThirdPartData} from "~api/interface"
    import {getDepartments, getAllPerson} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "talentTeam",
        components: {
            echartComponent,
            talentTable
        },
        props: {},
        data() {
            return {
                assortOptions: [
                    {
                        scode: '001',
                        sname: '政治面貌'
                    },
                    {
                        scode: '002',
                        sname: '教育程度'
                    },
                    {
                        scode: '003',
                        sname: '专业职称'
                    },
                    {
                        scode: '004',
                        sname: '现任职务'
                    }
                ],
                departmentOptions: [],
                assortSelectedValue: {
                    scode: '001',
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
                    height: 550
                },

                allTableData: [],
                allColumns: [],
                allTableType: {
                    type: 'currentPage',
                    height: 550
                },
            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/talentTeam/talentTeamTable1.json").then(res => {
                if (res.data.code === 200) {
                    _this.selectedTableData = res.data.rows;
                    _this.selectedColumns = res.data.columns
                }
            });


            this.axios.get("/cnbi/json/source/tjsp/cwtJson/talentTeam/talentTeamTable2.json").then(res => {
                if (res.data.code === 200) {
                    _this.allTableData = res.data.rows;
                    _this.allColumns = res.data.columns
                }
            });

            this.setDepartmentOptions();

            this.getSelectedData();
            this.getAllData();

        },
        mounted() {
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
                let params = {};
                params['type'] = 'all';
                this.getSelectedPersonRequestSend(params);
            },

            /**
             * 维度选择确认按钮
             */
            dimSelected() {
                debugger;
                this.getSelectedData();
            },
            /**
             * 获取维度参数数据
             */
            getDimParams() {
                return {
                    assort: this.assortSelectedValue.scode,
                    department: this.departmentOptions.scode
                }
            },

            /**
             * 四大维度选择事件
             * @param value
             */
            assortSelect(value) {
                debugger;
                this.assortSelectedValue.scode = value;
            },

            /**
             * 部门选择事件
             * @param value
             */
            departmentSelect(value) {
                debugger;
                this.departmentOptions.scode = value;
            },

            /**
             * 获取人员列表请求发送
             * @param params
             */
            getSelectedPersonRequestSend(params){
                let _this = this;
                getAllPerson(params).then(res => {
                    if (res.data.code === 200) {
                        debugger;
                        if(params.type === 'all'){
                            _this.allTableData = res.data.data;
                        }else if(params.type === 'selected'){
                            _this.selectedTableData = res.data.data;
                        }
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
        width: 400px;
        margin-right: 10px;

    }

    .center-table {
        /*max-height: 550px;*/
        height: 550px;
    }

    .talent-team-bottom {
        margin-top: 16px;
    }


</style>