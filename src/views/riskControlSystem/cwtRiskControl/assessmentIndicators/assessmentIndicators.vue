<template>
    <div>
        <div class="all-echarts-content">
            <el-row>
                <el-col
                        :span="8"
                        class="echarts-content"
                        v-for="(item) in echartsData"
                >

                    <div class="dic-title">
                        <span>{{item.echartsrightdata['zbsname']}}</span>
                    </div>

                    <div class="content-all">

                        <div class="left-content-all">
                            <div class="left-content" v-for="(left, key, index) of item.echartsleftdata">
                                <div class="left-content-text">
                                    {{left.pjname}}
                                </div>

                                <div class="left-content-num" :style="{'background-color':left.color}">
                                    {{left.val}}
                                </div>
                            </div>
                        </div>

                        <div class="right-content">
                            <echarts-component
                                    :echartData="item"
                                    :dataChange="dataChange"
                            >
                            </echarts-component>
                        </div>

                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import cwtPublicJS from '../mixin/cwtPublicJS'
    import {getAssessmentIndicatorsData} from '~api/cwtRiskControl/riskControlRequest'
    import echartsComponent from './echartsComponent'

    export default {
        name: "assessmentIndicators",
        mixins: [cwtPublicJS],
        components: {
            echartsComponent
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
                this.getAllData();
            },
            year(newValue, oldValue) {
                this.getAllData();
            },
            month(newValue, oldValue) {
                this.getAllData();
            }
        },
        data() {
            return {
                echartsData: [],
                dataChange: false
            }
        },
        created() {
            this.getAllData();
        },
        mounted() {
        },
        methods: {
            /**
             * 获取所有数据
             */
            getAllData() {
                let _this = this;
                let leftParams = this.getParams();
                getAssessmentIndicatorsData(leftParams).then((res) => {
                    if (res.data.code === 200) {
                        _this.dataFormatter(res.data.data);
                    }
                });
            },

            /**
             * 获取请求发送参数
             * @returns {{company: *, period: (*|string), fact: string, year: (*|string), month: (*|string), sqlKey: string}}
             */
            getParams() {
                let _getters = this.$store.getters;
                let company = _getters.company;
                return {
                    company: company,
                    period: this.getPeriod(),
                    fact: 'B',
                    year: this.getYear(),
                    month: this.getMonth(),
                    sqlKey: 'RiskWarning.gzwzb',
                }
            },

            /**
             * 左侧数据格式化处理
             * @param data
             */
            dataFormatter(data) {
                let _this = this;
                data.forEach((item) => {
                    let _leftData = item['echartsleftdata'];
                    let _rightData = item['echartsrightdata'];
                    item.echartsrightdata = _rightData[0];
                    _leftData.forEach((_data) => {
                        for (let key in _data) {
                            if (key === 'color') {
                                _data[key] = '#' + _data[key];
                            }
                        }
                    });
                });
                _this.echartsData = data;
                _this.dataChange = !_this.dataChange;
            },
        }
    }
</script>

<style scoped>
    .dic-title {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .all-echarts-content {
        padding-right: 20px;
    }

    .content-all {
        display: inline-flex;
    }

    .echarts-content {
        height: 260px;
        margin-bottom: 20px;
    }

    .left-content-all {
        width: 164px;
    }

    .left-content {
        display: flex;
        padding: 8px 10px;
    }

    .left-content-text {
        padding-right: 10px;
    }

    .left-content-num {
        border: 1px solid #555555;
        width: 100px;
        text-align: center;
    }

    .right-content {
        width: 380px;
        height: 248px;
    }
</style>