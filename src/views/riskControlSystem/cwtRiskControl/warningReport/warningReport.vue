<template>
    <div>
        <div class="top">
            <span class="top-title">
                {{companyname}}{{showperiod}}风险报告
            </span>
        </div>

        <div class="content-up">

            <div class="content-up-title">
                一、风险报告
            </div>

            <div class="content-des">
                {{companyname}}风险预警对标参数来源于{{companyname}}{{compareYear}}~{{showyear}}历史五年的财务报表数据，对历史数据进行大数据分析比对得出的各种评级数值
            </div>

            <div class="content-up-table">
                <warning-report-table
                        :tableData="table1data"
                        :columns="table1columns"
                        :tabletitle="tableTitle1"
                        :tableheight="400"
                >

                </warning-report-table>
            </div>

            <div class="content-up-loop">
                <template v-for="(item, index) of loopData1">
                    <div class="loop-title">
                        一、{{item.sname}}
                    </div>
                    <p class="loop-content">
                        {{companyname}},{{showperiod}}{{item.sname}}为{{item.sjz}}。较以往五年数据相比，与最高值相比相差{{item.persent}}个百分点，与平均值相比，多出/相差
                        {{item.xc}}
                    </p>
                </template>
            </div>

        </div>


        <div class="content-down">
            <div class="content-up-title">
                二、国内对标
            </div>
            <div class="content-des">
                天津食品集团行业对标参数来源于国务院国资委财务监督与考核评价局每年发布的《企业绩效评价标准值》
            </div>

            <div class="content-down-table">
                <warning-report-table
                        :tableData="table2data"
                        :columns="table2columns"
                        :tableheight="400"
                        :tabletitle="tableTitle2"
                        @companyClicked="companyClicked"
                >
                </warning-report-table>
            </div>


            <div class="content-down-title">
                {{companyname}}{{showyear}}国内对标情况如下
            </div>

            <div class="content-up-loop">
                <template v-for="(item, index) of loopData1">
                    <div class="loop-title">
                        一、{{item.sname}}
                    </div>
                    <p class="loop-content">
                        {{companyname}},{{showperiod}}，{{item.sname}}为{{item.sjz}}。处于行业{{item.persent}}水平，与行业{{item.persent}}值相比，相差{{item.persent.xc}}个百分点。
                    </p>
                </template>
            </div>

        </div>

    </div>
</template>

<script>
    import warningReportTable from './warningReportTable'
    import {mapGetters} from "vuex"
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {getwarningReportTable1Data} from '~api/cwtRiskControl/riskControlRequest'


    export default {
        name: "warningReport",
        mixins: [cwtPublicJS],
        components: {
            warningReportTable
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.getTable1Data();
            },
            year(newValue, oldValue) {
                this.getTable1Data();
            },
            month(newValue, oldValue) {
                this.getTable1Data();
            }
        },
        props: {},
        data() {
            return {
                showperiod: this.$store.getters.year + '年' + this.$store.getters.month + '月',
                showyear: this.$store.getters.year + '年',
                compareYear: parseInt(this.$store.getters.year) - 5 + '年',
                companyname: '天津食品集团有限公司',

                table1data: [],
                table1columns: [],
                tableTitle1: '风险预警指标情况表',


                loopData1: [
                    {
                        sname: '净利润增长率（%）',
                        sjz: '100',
                        persent: '10',
                        xc: '123'
                    },
                    {
                        sname: '净资产收益率（%）',
                        sjz: '55',
                        persent: '50',
                        xc: '54'
                    },
                    {
                        sname: '存货周转率（%）',
                        sjz: '3',
                        persent: '40',
                        xc: '18723'
                    }
                ],

                loopData2: [
                    {
                        sname: '净利润增长率（%）',
                        sjz: '100',
                        persent: '10',
                        xc: '123'
                    },
                    {
                        sname: '净资产收益率（%）',
                        sjz: '55',
                        persent: '50',
                        xc: '54'
                    },
                    {
                        sname: '存货周转率（%）',
                        sjz: '3',
                        persent: '40',
                        xc: '18723'
                    }
                ],

                table2data: [],
                table2columns: [],
                tableTitle2: this.$store.getters.year + '年' + '国内对标指标情况表',
            }
        },
        created() {
            let _this = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/warningReport/table1.json").then(res => {
                if (res.data.code === 200) {
                    // _this.table1data = res.data.rows;
                    _this.table1columns = res.data.columns
                }
            });

            this.axios.get("/cnbi/json/source/tjsp/cwtJson/warningReport/table2.json").then(res => {
                if (res.data.code === 200) {
                    _this.table2data = res.data.rows;
                    _this.table2columns = res.data.columns
                }
            });

            this.getTable1Data();

        },
        mounted() {
        },
        methods: {


            /**
             * 表格内公司点击事件触发函数
             * @param scope
             */
            companyClicked(scope) {
                this.$message({
                    message: scope,
                    type: 'success'
                })
            },

            /**
             * 获取表格一的数据
             */
            getTable1Data(){
                let _this = this;
                let params = this.getTableData('table1');

                getwarningReportTable1Data(params).then((res)=>{
                    if(res.data.code === 200){
                        debugger;
                        _this.table1data = res.data.data;
                    }
                })

            },


            /**
             * 获取请求发送参数
             * @param table
             */
            getTableData(table){
                return {
                    year: this.getYear(),
                    month: this.getMonth(),
                    company: this.$store.getters.company
                }
            }

        }
    }
</script>

<style scoped>
    .top {
        text-align: center;
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .content-up-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .content-des {
        margin-bottom: 20px;
    }

    .loop-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .content-up-loop {
        margin-bottom: 40px;
    }

    .loop-content {
        margin-left: 20px;
    }

    .content-down-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }
</style>