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
                        :tableheight="530"
                >
                </warning-report-table>
            </div>

            <div class="content-up-loop">
                <template v-for="(item, index) of loopData1">
                    <div class="loop-title">
                        {{numberToChineseString(index + 1)}}、{{item.sname}}
                    </div>
                    <p class="loop-content">
                        {{companyname}},{{showperiod}}{{item.sname}}为{{setNumberToStander(item.sjz)}}。较以往五年数据相比，与最高值相比
                        <template v-if="item.yzgzxc>=0">多出</template>
                        <template v-if="item.yzgzxc<0">相差</template>
                        {{setNumberToStanderABS(item.yzgzxc)}}，与平均值相比
                        <template v-if="item.ypjzxc>=0">多出</template>
                        <template v-if="item.ypjzxc<0">相差</template>
                        {{setNumberToStanderABS(item.ypjzxc)}}
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
                        :tableheight="680"
                        :tabletitle="tableTitle2"
                        @companyClicked="companyClicked"
                >
                </warning-report-table>
            </div>


            <div class="content-down-title">
                {{companyDownName}}{{showyear}}国内对标情况如下
            </div>

            <div class="content-up-loop">
                <template v-if="loopData2.length > 0">
                    <template v-for="(item, index) of loopData2">
                        <div class="loop-title">
                            {{numberToChineseString(index + 1)}}、{{item.sname}}
                        </div>


                        <template v-if="item.val === 0 && item.val_1 === 0 && item.cz === 0 && item.grade === '不予评级'">
                            <p>此期间无数据</p>
                        </template>

                        <template v-else>
                            <p class="loop-content">
                                {{companyDownName}},{{showperiod}}，{{item.sname}}为{{setNumberToStander(item.val)}}。处于行业{{item.grade}}水平，与行业值
                                {{setNumberToStander(item.val_1)}}相比
                                <template v-if="item.cz>=0">多出</template>
                                <template v-if="item.cz<0">相差</template>
                                {{setNumberToStanderABS(item.cz)}}。
                            </p>
                        </template>

                    </template>
                </template>
                <template v-else>
                    <div>
                        暂无数据
                    </div>
                </template>

            </div>

        </div>

    </div>
</template>

<script>
    import warningReportTable from './warningReportTable'
    import {mapGetters} from "vuex"
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {getwarningReportTable1Data, getwarningReportBottomData} from '~api/cwtRiskControl/riskControlRequest'


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
                this.showDataFresh();
                this.getAllData();
            },
            year(newValue, oldValue) {
                this.showDataFresh();
                this.getAllData();
            },
            month(newValue, oldValue) {
                this.showDataFresh();
                this.getAllData();
            }
        },
        props: {},
        data() {
            return {
                showperiod: this.$store.getters.year + '年' + this.$store.getters.month + '月',
                showyear: this.$store.getters.year + '年',
                compareYear: parseInt(this.$store.getters.year) - 5 + '年',
                companyname: '天津食品集团有限公司',
                companyDownName: '天津食品集团有限公司',

                table1data: [],
                table1columns: [],
                tableTitle1: '风险预警指标情况表',

                loopData1: [],
                loopData2: [],

                table2data: [],
                table2columns: [],
                tableTitle2: this.$store.getters.year + '年' + '国内对标指标情况表',
            }
        },
        created() {
            let _this = this;
            // this.monthParams();
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/warningReport/table1.json").then(res => {
                if (res.data.code === 200) {
                    // _this.table1data = res.data.rows;
                    _this.table1columns = res.data.columns
                }
            });
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/warningReport/table2.json").then(res => {
                if (res.data.code === 200) {
                    // _this.table2data = res.data.rows;
                    _this.table2columns = res.data.columns
                }
            });
            this.getAllData();
        },
        mounted() {
            this.doNotShowDim(true);
        },
        methods: {
            monthParams() {
                let me = this;
                let monthConfig = {quarterCount: 4, yearEnd: 1};
                me.$store.monthConfig = monthConfig;
            },
            /**
             * 表格内公司点击事件触发函数
             * @param scope
             */
            companyClicked(scope) {
                let com = scope.split('-')[1];

                let _this = this;
                _this.companyDownName = scope.split('-')[0];
                let params = {
                    year: this.getYear(),
                    month: this.getMonth(),
                    company: com
                };
                getwarningReportBottomData(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.loopData2 = res.data.data;
                    }
                })
            },

            /**
             * 获取表格一的数据
             */
            getAllData() {
                let _this = this;
                let params = this.getTableData('table1');
                getwarningReportTable1Data(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.table1data = res.data.data[0];

                        _this.loopData1 = res.data.data[1];

                        _this.table2data = res.data.data[2];

                        _this.loopData2 = res.data.data[3];

                    }
                })
            },

            /**
             * 获取请求发送参数
             * @param table
             */
            getTableData(table) {
                return {
                    year: this.getYear(),
                    month: this.getMonth(),
                    company: this.$store.getters.company
                }
            },

            /**
             * 期间维度切换页面显示维度刷新
             */
            showDataFresh() {
                this.showperiod = this.$store.getters.year + '年' + this.$store.getters.month + '月';
                this.showyear = this.$store.getters.year + '年';
                this.compareYear = parseInt(this.$store.getters.year) - 5 + '年';
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
        margin-top: 30px;
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
        margin-bottom: 30px;
    }

    .content-down-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }
</style>