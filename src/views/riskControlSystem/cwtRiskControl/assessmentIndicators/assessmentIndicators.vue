<template>
    <div>
        <div class="all-echarts-content">

            <!--<el-button type="primary" @click="pageStyleChange('1')">样式一</el-button>-->
            <!--&lt;!&ndash;<el-button type="primary" @click="pageStyleChange('2')">样式二</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" @click="pageStyleChange('3')">样式二</el-button>-->
            <div class="top-tip">
                <div class="tip-tip">
                    tips
                </div>
                <div class="tip-loop" v-for="(item, index) in topTip">
                    <div class="tip-color" :style="{'background-color':item.color, width:'14px', height: '12px'}"></div>
                    <div class="tip-text">{{item.pjname}}</div>
                </div>
            </div>
            <el-row>
                <el-col
                        :span="8"
                        class="echarts-content"
                        v-for="(item, index) in echartsData"
                        :key="index"
                >
                    <div class="dic-title">
                        <span>{{item.echartsrightdata['zbsname']}}</span>
                    </div>
                    <div class="content-all">


                        <div class="left-content-all">
                            <div class="left-content" v-for="(left, key, index) of item['echartsleftdata']">
                                <div class="left-content-num" :style="{'background-color':left.color, width:'14px'}">

                                </div>
                                <div class="left-content-text" style="font-size: 12px; margin-left: 10px;">
                                    {{left.val}}
                                </div>
                            </div>

                            <div class="" style="display: inline-flex; margin-left: 10px; margin-top: 10px">
                                <div class="left-content-num" style="background-color:black; width:14px; height: 14px">

                                </div>
                                <div class="left-content-text" style="font-size: 12px; margin-left: 10px;width: 500px">
                                    {{item.echartsrightdata.expression}}
                                </div>
                            </div>


                        </div>


                        <div class="right-content" style="width: 64%;padding: 20px 100px 10px 0;">

                            <div class="right-content-name" :style="{'color':item.echartsrightdata.color}">
                                {{item.echartsrightdata.grade}}
                            </div>
                            <div class="right-content-value" :style="{'color':item.echartsrightdata.color}">
                                当期值：{{setNumberToStander(item.echartsrightdata.v)}}{{item.echartsrightdata.unit}}
                            </div>

                        </div>


                    </div>
                </el-col>
            </el-row>

            <el-row v-if="false">
                <el-col
                        :span="8"
                        class="echarts-content"
                        v-for="(item, index) in echartsData"
                        :key="index"
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
    import {mapGetters, mapActions} from "vuex"
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
                dataChange: false,
                showPageFlag: '1',
                topTip: []
            }
        },
        created() {
            this.showPageFlag = 1;
            this.ShowDims({
                company: true,
                year: true,
                month: true,
                day: false,
                conversion: false
            });
            this.getAllData();
        },
        mounted() {
            this.doNotShowDim(true);
        },
        methods: {
            ...mapActions(["ShowDims"]),
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
                    let _rightData = item['echartsrightdata'][0];

                    _this.topTip = [];
                    for (let key in _rightData) {
                        if (key === 'color') {
                            _rightData[key] = '#' + _rightData[key];
                        }
                    }
                    item.echartsrightdata = _rightData;

                    let pjArray = [];

                    _leftData.forEach((_data) => {
                        let pjObj = {};
                        let tipObj = {};
                        for (let key in _data) {
                            if (key === 'color') {
                                _data[key] = '#' + _data[key];
                            }

                            if (key === 'pjname' || key === 'val') {
                                pjObj[key] = _data[key];
                            }
                            if (key === 'pjname' || key === 'color') {
                                tipObj[key] = _data[key];
                            }
                        }
                        pjArray.push(pjObj);
                        _this.topTip.push(tipObj)

                    });

                    if (_this.showPageFlag == '1') {
                        let newArray = [],
                            ii = '';
                        pjArray.forEach((item, index) => {
                            debugger;
                            let emptyVlaue = {
                                pjname: item.pjname,
                                value: ''
                            };

                            if (index === 0) {
                                emptyVlaue.value = ' V >= ' + item.val;
                            } else if (index === 1) {
                                emptyVlaue.value = item.val + ' <= V < ' + ii;
                            } else if (index === 2) {
                                emptyVlaue.value = item.val + ' <= V < ' + ii;
                            } else if (index === 3) {
                                emptyVlaue.value = item.val + ' <= V < ' + ii;
                            } else if (index === 4) {
                                emptyVlaue.value = ' V < ' + ii;
                            }
                            ii = item.val;
                            newArray.push(emptyVlaue)
                        });

                        _leftData.forEach((_data, index) => {
                            for (let key in _data) {
                                if (key === 'val') {
                                    _data[key] = newArray[index].value;
                                }
                            }
                        });
                    }
                });
                _this.echartsData = data;
                _this.dataChange = !_this.dataChange;
            },

            /**
             * 切换页面展现样式
             * @param style
             */
            pageStyleChange(style) {
                this.showPageFlag = style;
                this.getAllData();
            }

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

    .echarts-content {
        /*border: 1px solid black;*/
    }

    .content-all {
        display: inline-flex;
        width: 100%;

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
        width: 60px;
        text-align: center;
    }

    .right-content {
        /*width: 380px;*/
        /*height: 248px;*/
        /*padding-left: 50px;*/
        text-align: center;

    }

    .right-content-name {
        font-size: 60px;
        font-family: monospace;
    }

    .right-content-value {
        margin-top: 20px;
        font-size: 20px;
        padding-right: 10px;
        text-align: right;
        font-family: monospace;
    }

    .top-tip {
        display: flex;
        height: 50px;
        background-color: #D3DCE6;
        margin-top: 20px;
        border-radius: 10px;
        padding-left: 20px;
        align-items: center;
    }

    .tip-tip {
        font-weight: 700;
        margin-right: 20px;
    }

    .tip-loop {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .tip-color {
        margin-right: 2px;
    }

    .tip-text {

    }
</style>