<template>
    <div>
        <div class="top-select content-select">
            <span>指标选择：</span>
            <div class="top-select sigle_top">
                <el-select
                        v-model="selectedName"
                        placeholder="请选择"
                        @change="optionChanged"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.scode"
                            :label="item.sname"
                            :value="item.scode"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>

        <bar-echart
                :barData="barData"
                :dataFresh="dataFresh"
                :selectedName="selectedName"
                :barChartType="barChartType"
        >
        </bar-echart>
    </div>
</template>

<script>
    import {getAllHYZB, getHYZBData} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import barEchart from '../industryBenchmarking/barEchart'
    import {mapGetters} from "vuex"

    export default {
        name: "industryBenchmarking",
        mixins: [cwtPublicJS],
        components: {
            barEchart
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                // this.getAllIndustry();
                this.optionChanged();
            },
            year(newValue, oldValue) {
                // this.getAllIndustry();
                this.optionChanged();
            },
            month(newValue, oldValue) {
                // this.getAllIndustry();
                this.optionChanged();
            }
        },
        props: {},
        data() {
            return {
                options: [],
                barData: [],
                dataFresh: false,
                selectedscode: '',
                selectedName: '',
                barChartType:'ndustry'
            }
        },
        created() {
            this.getAllIndustry();
            this.optionChanged();
        },
        mounted() {
            this.doNotShowDim(true);
        },
        methods: {

            /**
             * 选择框发生变化的时候调用的函数
             * @param value
             */
            optionChanged(value) {
                this.selectedscode = value;

                let _scode = this.selectedscode || '';
                let params = this.getSendParams(_scode);
                this.getBarData(params);

                let _selectedOption = this.options.filter((item) => {
                    return item.scode === _scode;
                });
                if(_selectedOption[0]){
                    this.selectedName = _selectedOption[0].sname;
                }

            },

            /**
             * 获取所有的行业选项
             */
            getAllIndustry() {
                let _this = this;
                let param = 'HY';
                getAllHYZB(param).then((res) => {
                    if (res.data.code === 200) {
                        _this.options = res.data.data;
                    }
                })
            },

            /**
             * 获取柱状图数据
             * @param params
             */
            getBarData(params) {
                let _this = this;
                getHYZBData(params).then((res) => {
                    if (res.data.code === 200) {

                        let _data = res.data.data;
                        let emptyArray = [];
                        _data.forEach((item) => {
                            let emptyData = {
                                fact_a: 0,
                                ranknum: 0,
                                sname: '',
                                scode: ''
                            };
                            for (let key in emptyData) {
                                emptyData[key] = item[key];
                            }
                            emptyArray.push(emptyData);
                        });

                        _this.barData = emptyArray;

                        _this.dataFresh = !this.dataFresh;
                    }
                })
            },

            /**
             * 获取请求柱状图数据的参数
             */
            getSendParams(value) {
                let _this = this;
                let _getters = this.$store.getters;
                let company = _getters.company;
                return {
                    company: company,
                    period: this.getPeriod(),
                    year: _this.getYear(),
                    month: _this.getMonth(),
                    sqlKey: 'RiskWarning.hydb',
                    target: value,
                    stype: 'HY'
                }
            }
        }
    }
</script>

<style scoped>
    .top-select {
        display: flex;
        align-items: baseline;
        margin-top: 20px;
    }

    .content-select {
        margin-left: 50px;
    }
    .sigle_top {
        /* width: 20%; */
        width: 300px;
    }
</style>