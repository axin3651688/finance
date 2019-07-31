<template>
    <div class="reportComponent" ref="reportComponent" id="reportComponent">
        <el-container
                class="container-all"
                ref="containerAll"
        >
            <div class="container-left">
                <div class="container-left-inner">
                    <h1 style="font-size: 28px;margin-bottom: 50px;color: rgb(48, 49, 51);">目&nbsp&nbsp录</h1>
                    <div
                            v-for="(value, key, index) in leftNode"
                            :key="key"
                            class="risk-items"
                    >
                        <!--{{value}}-->
                        <a :href="'#' + key" slot="title">{{numberToChineseString(index + 1)}}、{{value}}</a>
                    </div>
                </div>
            </div>

            <div ref="containerRightAll" style="width: 100%">

                <div class="container-right" ref="containerRight">

                    <div class="container-right-top">

                        <div class="report-title">
                            {{this.companyname}}
                            {{this.period}}
                            风险预警报告
                        </div>
                        <div class="zs_div"><span class="zs">总述</span></div>
                        <p class="describe">
                            截止{{this.period}}份，经风险评估分析， {{companyname}} 在风险方面共存在 {{riskCount.allRiskCount}} 条。
                            <template v-if="riskCount.allRiskCount > 0">
                                从风险类型来看，其中
                            </template>

                            <template v-if="riskCount.riskStypeCountArray.cwfx > 0">
                                财务风险 {{riskCount.riskStypeCountArray.cwfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.flfx > 0">
                                法律风险 {{riskCount.riskStypeCountArray.flfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.ljfx > 0">
                                廉洁风险 {{riskCount.riskStypeCountArray.ljfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.scfx > 0">
                                市场风险 {{riskCount.riskStypeCountArray.scfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.syfx > 0">
                                声誉风险 {{riskCount.riskStypeCountArray.syfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.yyfx > 0">
                                运营风险 {{riskCount.riskStypeCountArray.yyfx}} 条，
                            </template>
                            <template v-if="riskCount.riskStypeCountArray.zlfx > 0">
                                战略风险 {{riskCount.riskStypeCountArray.zlfx}} 条，
                            </template>


                            <template v-if="riskCount.allRiskCount > 0">
                                其中
                            </template>

                            <template v-if="riskCount.riskLevelCountArray.level_1 > 0">
                                可接受风险 {{riskCount.riskLevelCountArray.level_1}} 条，
                            </template>
                            <template v-if="riskCount.riskLevelCountArray.level_2 > 0">
                                一般风险 {{riskCount.riskLevelCountArray.level_2}} 条，
                            </template>
                            <template v-if="riskCount.riskLevelCountArray.level_3 > 0">
                                中等风险 {{riskCount.riskLevelCountArray.level_3}} 条，
                            </template>
                            <template v-if="riskCount.riskLevelCountArray.level_4 > 0">
                                重大风险 {{riskCount.riskLevelCountArray.level_4}} 条，
                            </template>
                            <template v-if="riskCount.riskLevelCountArray.level_5 > 0">
                                巨大风险 {{riskCount.riskLevelCountArray.level_5}} 条，
                            </template>
                        </p>
                    </div>

                    <div class="container-right-center">


                        <template v-for="(riskfeed, key, index) in riskFeedDataList">


                            <div class="container-right-loop-title" :id="key">
                                {{numberToChineseString(index+1)}}、{{riskfeed.risksptype}}
                            </div>

                            <div class="container-right-loop">

                                <div v-for="risk in riskfeed.riskdetaildata" class="container-right-loop-list">
                                    <div class="container-right-loop-top">
                                        <div class="container-top-left">
                                    <span class="left_1">
                                        {{ risk.risktype }}
                                    </span>
                                            <span class="left_2" :style="{'background-color': risk.riskcolor}">
                                        {{ risk.risklevel }}
                                    </span>
                                        </div>
                                        <div class="container-top-right">
                                        <span class="left_1">
                                         {{ risk.riskcompany }}
                                        </span>
                                            <span class="left_2">
                                    识别人：{{ risk.risksbuser }}
                                        </span>
                                        </div>
                                    </div>
                                    <div class="container-right-loop-center">
                                        <div v-for="item in risk.risk_pg_gs_cs_jy">
                                            <div>
                                                {{ item.title }}
                                            </div>
                                            <p v-html="item.content">
                                                <!--{{item.content }}-->
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>


                        <div class="container-right-loop-foot">
                            <div class="schedule-title">
                                风险追踪
                            </div>
                            <div class="schedule-list">
                                <template v-for="(item, key, index) in riskScheduleData">
                                    <div class="risk-content">
                                        <div class="risk-num">
                                            {{item.risk_count}}
                                        </div>
                                        <div class="risk-name">
                                            <span class="title-left">{{numberToChineseString(index + 1)}}、名称 :</span>
                                            <span class="content-right">{{item.risk_name}}</span>
                                        </div>
                                        <div class="risk-state">
                                            <span class="title-left need-more-right">状态 :</span>
                                            <span
                                                    class="content-right"
                                                    :style="{background:item.state.substr(0,1) === '未' ? 'red' : 'green'}"
                                            >{{item.state}}</span>
                                        </div>
                                        <div class="risk-content">
                                            <span class="title-left need-more-right">内容 :</span>
                                            <span class="content-right">{{item.content}}</span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>


    </div>
</template>

<script>
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {updateInstruction} from "~api/szcRiskControl/riskControl"
    import {mapGetters} from "vuex"

    export default {
        name: "riskFeedReportComponent",
        mixins: [cwtPublicJS],
        components: {
            // showPersonnelList
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        props: {
            reportData: Object,
            dataFresh: Boolean
        },
        data: function () {
            return {
                leftNode: {},
                selectedNode: '',
                companyname: this.$store.getters.companyName,
                period: this.$store.getters.year + '年' + this.$store.getters.month + '月',
                riskname: '',
                risklevel: '',
                riskcompany: '',
                risksbuser: '',
                riskCount: {},
                risksptype: "",
                riskdetaildata: [],
                pageHeight: document.body.offsetHeight,

                riskFeedDataList: {},
                riskScheduleData: []
            }
        },
        watch: {
            dataFresh() {
                this.updateData();
            },
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.updateData();
            },
            year(newValue, oldValue) {
                this.updateData();
            },
            month(newValue, oldValue) {
                this.updateData();
            }
        },
        created() {
            this.updateData();

        },
        mounted() {
            this.pageScrollSet();
        },
        methods: {

            /**
             * 更新数据
             */
            updateData() {
                let _this = this,
                    _reportData = _this.reportData.reportDataContent,
                    riskFeedDataList = _reportData.riskFeedDataList;
                _this.getReportTitleData(_reportData);
                this.getDirectoryData(riskFeedDataList);
                this.reportDataFormat();
            },

            /**
             * 设置div高度，并且实现左侧导航栏不跟随滚动，整个页面不滚动，只滚动报告内容部分
             * @type {number}
             */
            pageScrollSet() {
                let offsetHeight = document.body.offsetHeight,//页面整体高度
                    buttonHeight = 40,//select框高度 加上中间的margin-bottom的值
                    tabHeight = 0,//tab标签高度
                    gapHeight = 45,//间隙的高度
                    pageHeaderHeight = 64;//导航栏高度
                let tableHeight = offsetHeight - pageHeaderHeight - buttonHeight - tabHeight - gapHeight;
                this.$refs.containerAll.$el.style.height = tableHeight + 'px';
                this.$refs.containerRightAll.style.height = tableHeight + 'px';
                this.$refs.containerAll.$el.style.overflow = 'hidden';
                this.$refs.containerAll.$el.style['overflow-x'] = 'auto';
                this.$refs.containerRightAll.style.overflow = 'auto';
            },

            reportDataFormat() {
                let _this = this,
                    _reportData = _this.reportData.reportDataContent,
                    _list = _reportData.riskFeedDataList;

                let _riskFeedDataList = {};
                for (let key in _list) {
                    if (_list[key].riskdetaildata && _list[key].riskdetaildata.length > 0) {
                        if (_list[key].risksptype !== '') {
                            _riskFeedDataList[key] = _list[key];

                            _this.getRiskScheduleData(_list[key]);
                        }
                    }
                }
                this.riskFeedDataList = _riskFeedDataList;
            },

            /**
             * 获取目录的数据
             */
            getDirectoryData(riskFeedDataList) {
                for (let key in riskFeedDataList) {
                    if (riskFeedDataList[key].risksptype) {
                        this.leftNode[key] = riskFeedDataList[key].risksptype;
                    }
                }
            },

            /**
             * 获取报告头部title数据
             * @param _reportData
             */
            getReportTitleData(_reportData) {
                let _this = this;
                let _headerData = _reportData.headerData;
                let _riskLevelCountArray = _headerData.riskLevelCountArray;
                let allRiskCount = 0;
                for (let key in _riskLevelCountArray) {
                    allRiskCount += _riskLevelCountArray[key];
                }
                _headerData['allRiskCount'] = allRiskCount;
                _this.riskCount = _headerData;
            },

            /**
             * 获取报告中间部分数据
             * @param item
             */
            //fixme  修改显示内容为所有风险
            getRiskScheduleData(item) {
                let _this = this;
                let _scheduleList = item.riskdetaildata[0].scheduleList;

                _this.riskScheduleData = _scheduleList;

                for (let key in _scheduleList) {
                    let _risk = _scheduleList[key];
                    if (key === 'risk_sb') {
                        if (_risk.state === '已上报') {
                            _this.riskScheduleData[key].content = '上报人： ' + _risk.user_name + '。 上报时间： ' + _risk.time;
                        } else {
                            _this.riskScheduleData['risk_fk'].content = '请尽快反馈';
                            _this.riskScheduleData['risk_ps'].content = '请尽快批示';
                            _this.riskScheduleData['risk_sb'].content = '请尽快上报';
                            return;
                        }
                    } else {
                        if (_risk.state === '已批示') {
                            _this.riskScheduleData[key].content = '批示内容： ' + _risk.content + '。 批示人： ' + _risk.user_name + '。 批示时间： ' + _risk.time;
                        } else if (_risk.state === '未批示') {
                            _this.riskScheduleData[key].content = '请尽快批示'
                        } else if (_risk.state === '已反馈') {
                            _this.riskScheduleData[key].content = '反馈内容： ' + _risk.content + '。 反馈人： ' + _risk.user_name + '。 反馈时间： ' + _risk.time;
                        } else if (_risk.state === '未反馈') {
                            _this.riskScheduleData[key].content = '请尽快反馈'
                        }
                    }
                }
            },

            /**
             * 切换风险类型按钮---点击目录选项
             * @param key
             */
            /*riskTypeChange(key) {
                if (this.selectedNode === key) return;
                this.selectedNode = key;
                this.reportDataFormat();
            },*/

        }
    }
</script>

<style scoped>
    .container-all {
        display: flex;
        flex-direction: row;
        flex: 1;
        flex-basis: auto;
        box-sizing: border-box;
        min-width: 0;
        border: 2px solid #CCCCCC;
    }

    .container-left-inner {
        margin-top: 50px;
        text-align: center;
        color: rgb(96, 98, 102);
    }

    .container-left {
        display: flex;
        justify-content: center;
        width: 300px;
        min-width: 300px;
        border: 0;
    }

    .container-left .risk-items {
        color: #333333;
        font-size: 20px;
        margin-bottom: 26px;
        cursor: pointer;
    }

    .container-right {
        width: 100%;
        padding: 20px;
        border: 1px solid #CCCCCC;
    }

    .report-title {
        padding: 20px;
        text-align: center;
        font-family: '微软雅黑';
        font-weight: 700;
        font-style: normal;
        font-size: 24px;
        color: #303133;
    }

    .zs_div{
        width: 100%;
        background: #ddd;
        height: 42px;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .zs {
        font-size: 22px;
        /*text-align: left;*/
        font-family: '微软雅黑';

        /*font-weight: 700;*/
        font-style: normal;
        color: #303133;
    }

    .describe {
        margin-top: 10px;
        line-height: 40px;
        text-indent: 32px;
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        text-align: left;
        margin-bottom: 20px;
    }

    .container-right-loop-title {
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        text-align: left;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        background-color: rgba(228, 228, 228, 1);
    }

    .container-right-loop-top {
        display: flex;
        margin-bottom: 30px;
    }

    .container-top-left {
        margin-right: 20px;
    }

    .container-top-left .left_2 {
        /*background-color: rgba(255, 0, 153, 1);*/
    }

    .container-top-right .left_2 {
        background-color: rgba(153, 153, 153, 1);
    }

    .left_1 {
        font-family: '微软雅黑';
        font-weight: 700;
        font-size: 16px;
        color: #333333;
    }

    .left_2 {
        margin-left: 20px;
        font-size: 14px;
        padding: 2px 10px;
        font-family: '微软雅黑';
        border-radius: 10px;
        color: white;
    }

    .container-right-loop-center div {
        font-size: 18px;
        font-family: '微软雅黑';
        font-weight: 550;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .container-right-loop-center p {
        font-family: '微软雅黑';
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        padding: 5px;
    }

    /*.top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }*/

    .top-form-contents span {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }

    .container-right-loop-list {
        margin-bottom: 50px;
    }

    .container-right-foot {
        text-align: right;
    }

    .schedule-title, .risk-num, .title-left {
        font-family: '微软雅黑';
        font-weight: 700;
        font-size: 16px;
    }

    .risk-name, .risk-state, .risk-content {
        margin-top: 20px;
    }

    .schedule-title {
        margin-top: 20px;
    }

    .risk-num {
        margin-top: 26px;
    }

    .title-left {
        margin-left: 10px;
    }

    .content-right {
        margin-left: 10px;
    }

    .risk-state .content-right {
        color: white;
        /*background: red;*/
        padding: 0 12px;
        border-radius: 10px;
    }
    /*.risk-state */
    .need-more-right{
        margin-left: 40px;
    }
</style>