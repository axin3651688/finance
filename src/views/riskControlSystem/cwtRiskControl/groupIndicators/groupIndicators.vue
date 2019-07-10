<template>
    <div>
        <div class="all-echarts-content">
            <el-row>
                <el-col
                        :span="8"
                        class="echarts-content"
                        v-for="(item, index) in echartsData"
                        :key="index"
                >
                    <echarts-component
                            :echartData="item"
                    >
                    </echarts-component>
                </el-col>
            </el-row>
        </div>

        <div class="table-content">
            <table-component
                    :tableData="tableData"
                    :columns="tableColumns"
                    :tableheight="550"
                    :tabletitle="tableTitle"
                    :dataChange="dataChange"
            >
            </table-component>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import echartsComponent from './echartsComponent'
    import tableComponent from '../warningReport/warningReportTable'
    import cwtPublicJS from '../mixin/cwtPublicJS'
    import {getGroupIndicatorsData} from '~api/cwtRiskControl/riskControlRequest'


    export default {
        name: "groupIndicators",
        mixins: [cwtPublicJS],
        components: {
            echartsComponent,
            tableComponent
        },
        props: {},
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司， 年， 月
             */
            company(newValue, oldValue) {
                this.echartsData = [];
                this.tableData = [];
                this.getAllData();
            },
            year(newValue, oldValue) {
                this.echartsData = [];
                this.tableData = [];
                this.getAllData();
            },
            month(newValue, oldValue) {
                this.echartsData = [];
                this.tableData = [];
                this.getAllData();
            }
        },
        data() {
            return {
                echartsData: [],
                tableData: [],
                tableColumns: [],
                tableTitle: '指标明细表',
                dataChange: false,
            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/warningReport/table1.json").then(res => {
                if (res.data.code === 200) {
                    // _this.tableData = res.data.rows;
                    _this.tableColumns = res.data.columns
                }
            });

            this.getAllData();

        },
        mounted() {
            let _this = this;
            let _showDims = _this.showDims;
            _showDims.conversion= false;
        },
        methods: {
            /**
             * 获取所有数据
             */
            getAllData() {
                let _this = this;
                let params = _this.getParams();
                getGroupIndicatorsData(params).then((res) => {
                    if (res.data.code === 200) {
                        let _data = res.data.data;
                        _this.dataFormatter(_data);
                    }
                })
            },

            /**
             * 获取请求集团指标数据的参数
             * @returns {{company: *, year: (*|string), month: (*|string), period: (*|string), fact: string, sqlKey: string}}
             */
            getParams() {
                let _getters = this.$store.getters;
                let company = _getters.company;
                return {
                    company: company,
                    year: this.getYear(),
                    month: this.getMonth(),
                    period: this.getPeriod(),
                    fact: 'B',
                    sqlKey: 'RiskWarning.jtzb'
                }
            },


            /**
             * 格式化发送到echart组件中的数据，同时也格式化发送到表格组件中的数据
             * @param data
             */
            dataFormatter(data) {
                let _this = this;
                let _echartsData = _this.echartsData;
                let _year = _this.getYear();
                let _month = _this.getMonth();


                // _this.echartsData = [];

                // _this.tableData = [];


                data.forEach((item) => {
                    let emptyData = {
                        sname: '',
                        sunit: '',
                        sdata: {}
                    };
                    let emptyTableData = {
                        pjz: item.pjz,
                        sjz: item.sjz,
                        sname: item.sname,
                        zdz: item.zdz,
                        zgz: item.zgz,
                        zgznf: item.zgznf,
                        zdznf: item.zdznf
                    };

                    emptyData['sname'] = item.sname;
                    emptyData['sunit'] = item.sunit;
                    emptyData.sdata[_year + _month] = item['bn'];
                    emptyData.sdata[(_year - 1) + _month] = item['sn1'];
                    emptyData.sdata[(_year - 2) + _month] = item['sn2'];
                    emptyData.sdata[(_year - 3) + _month] = item['sn3'];
                    emptyData.sdata[(_year - 4) + _month] = item['sn4'];

                    _echartsData.push(emptyData);

                    _this.tableData.push(emptyTableData);

                });
                _this.dataChange = !_this.dataChange;
            },
        }
    }
</script>

<style scoped>
    .all-echarts-content {
        padding-right: 20px;
    }

    .echarts-content {
        height: 300px;
        margin-bottom: 20px;
    }
</style>