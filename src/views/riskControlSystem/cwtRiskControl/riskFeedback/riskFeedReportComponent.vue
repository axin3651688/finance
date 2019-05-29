<template>
    <div class="reportComponent" ref="reportComponent" id="reportComponent">
        <el-container
                class="container-all"
                ref="containerAll"
        >
            <div class="container-left">
                <div class="container-left-inner">
                    <h1 style="font-size: 28px;margin-bottom: 26px;">目&nbsp&nbsp录</h1>
                    <div
                            v-for="(value,key) in leftNode"
                            :key="key"
                            class="risk-items"
                            @click="riskTypeChange(key)"
                    >
                        {{value}}
                    </div>
                </div>
            </div>

            <div ref="containerRightAll">
                <div class="container-right" ref="containerRight">

                    <div class="container-right-top">

                        <div class="report-title">
                            {{this.companyname}}2019年3月
                            <!--{{this.period}}-->
                            风险预警报告
                        </div>
                        <span class="zs">总述</span>
                        <p class="describe">
                            截止2019年3月份，经风险评估分析， {{companyname}} 在风险方面共存在 {{reportTitleData.data1}} 条，从风险类型来看，
                            其中战略风险 {{reportTitleData.data2}} 条，投资风险 {{reportTitleData.data3}} 条，运营风险
                            {{reportTitleData.data4}} 条，
                            财务风险 {{reportTitleData.data5}} 条，法律风险 {{reportTitleData.data6}} 条，廉洁风险
                            {{reportTitleData.data7}} 条；
                            从风险等级来看，其中重大风险 {{reportTitleData.data8}} 条，重要风险 {{reportTitleData.data9}} 条，一般风险
                            {{reportTitleData.data10}} 条
                        </p>
                    </div>

                    <div class="container-right-center">

                        <div class="container-right-loop-title">
                            {{risktype}}
                        </div>

                        <div class="container-right-loop">

                            <div v-for="risk in riskdetaildata" class="container-right-loop-list">

                                <div class="container-right-loop-top">
                                    <div class="container-top-left">
                                    <span class="left_1">
                                        {{ risk.riskname }}
                                    </span>
                                        <span class="left_2">
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
                                        <template>
                                            <p v-for="p in item.content">
                                                {{p}}
                                            </p>
                                        </template>
                                    </div>
                                </div>

                                <div class="container-right-loop-foot">
                                    <div class="top-form-contents" style="margin-top: 30px">
                                        <span>领导批示</span>
                                        <div class="top-form-contents" style="margin-bottom: 0">
                                            <p style="min-width: 98px;width: 150px;margin-left: 30px">风险策略为：</p>
                                            <el-input v-model="risk.risk_ps.risk_ps_cl" disabled></el-input>
                                        </div>
                                    </div>
                                    <div class="top-form-contents">
                                        <span style="min-width: 194px;width: 194px"></span>
                                        <el-input type="textarea" :rows="3" v-model="risk.risk_ps.risk_ps_content"
                                                  disabled></el-input>
                                    </div>

                                    <div class="top-form-contents">
                                        <span style="min-width: 194px;width: 194px">风险反馈</span>
                                        <el-input type="textarea" :rows="4" v-model="risk.risk_feed_content"
                                                  placeholder="this.riskSuggest"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-right-foot">

                    </div>

                </div>
            </div>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: "riskFeedReportComponent",
        components: {},
        props: {
            reportData: Object
        },
        data: function () {
            return {
                leftNode: {},
                selectedNode: '',
                companyname: '天津食品集团有限公司(合并)',
                riskname: '1',
                risklevel: '2',
                riskcompany: '3',
                risksbuser: '4',
                reportTitleData: {},
                risktype: "战略风险",
                riskdetaildata: [],
            }
        },
        created() {
            let _this = this,
                _reportData = _this.reportData.reportDataContent,
                riskFeedDataList = _reportData.riskFeedDataList;
            _this.getReportTitleData(_reportData);
            this.getDirectoryData(riskFeedDataList);
            this.reportDataFormat();
        },
        mounted() {
            /**
             * 设置div高度，并且实现左侧导航栏不跟随滚动，整个页面不滚动，只滚动报告内容部分
             * @type {number}
             */
            let offsetHeight = document.body.offsetHeight,//页面整体高度
                buttonHeight = 40,//select框高度 加上中间的margin-bottom的值
                tabHeight = 39,//tab标签高度
                gapHeight = 32,//间隙的高度
                pageHeaderHeight = 64;//导航栏高度
            let tableHeight = offsetHeight - pageHeaderHeight - buttonHeight - tabHeight - gapHeight;
            this.$refs.containerAll.$el.style.height = tableHeight + 'px';
            this.$refs.containerRightAll.style.height = tableHeight + 'px';
            this.$refs.containerAll.$el.style.overflow = 'hidden';
            this.$refs.containerAll.$el.style['overflow-x'] = 'auto';
            this.$refs.containerRightAll.style.overflow = 'auto';
        },
        methods: {
            reportDataFormat() {
                let _this = this,
                    _reportData = _this.reportData.reportDataContent,
                    riskFeedDataList = _reportData.riskFeedDataList;
                _this.getReportCenterData(riskFeedDataList);
            },

            /**
             * 获取目录的数据
             */
            getDirectoryData(riskFeedDataList) {
                for (let key in riskFeedDataList) {
                    this.leftNode[key] = riskFeedDataList[key].risktype;
                }
            },

            /**
             * 获取报告头部title数据
             * @param _reportData
             */
            getReportTitleData(_reportData) {
                let _this = this;
                _this.reportTitleData = _reportData.headerData;
            },
            /**
             * 获取报告中间部分数据
             * @param riskFeedDataList
             */
            getReportCenterData(riskFeedDataList) {
                let _this = this;
                let riskTpyeId = this.selectedNode === '' ? 'zlfx' : this.selectedNode;
                let allriskFeedDataList = riskFeedDataList[riskTpyeId];
                _this.risktype = allriskFeedDataList.risktype;
                _this.riskdetaildata = allriskFeedDataList.riskdetaildata;
            },

            /**
             * 切换风险类型按钮---点击目录选项
             * @param key
             */
            riskTypeChange(key) {
                if (this.selectedNode === key) return;
                this.selectedNode = key;
                this.reportDataFormat();
            },
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
        border: 1px solid;
    }

    .container-left-inner {
        position: absolute;
        top: 138px;
    }

    .container-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /*padding-top: 50px;*/
        padding-bottom: 50px;
        flex-grow: 0;
        flex-shrink: 0;
        width: 250px;
        /*border-right: 1px solid;*/
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
        border-left: 1px solid;
    }

    .report-title {
        padding: 20px;
        text-align: center;
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        font-size: 20px;
    }

    .zs {
        font-size: 24px;
        text-align: left;
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        color: #000000;
    }

    .describe {
        margin-top: 10px;
        line-height: 50px;
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        text-align: left;
        margin-bottom: 20px;
    }

    .container-right-loop-title {
        font-family: '微软雅黑 Regular', '微软雅黑';
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
        background-color: rgba(255, 0, 153, 1);
    }

    .container-top-right .left_2 {
        background-color: rgba(153, 153, 153, 1);
    }

    .left_1 {
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-size: 16px;
        color: #333333;
    }

    .left_2 {
        margin-left: 20px;
        font-size: 14px;
        padding: 2px 10px;
        font-family: 'Arial Normal', 'Arial';
        border-radius: 10px;
        color: white;
    }

    .container-right-loop-center div {
        font-size: 16px;
        font-family: '微软雅黑 Bold', '微软雅黑';
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .container-right-loop-center p {
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-size: 16px;
        color: #333;
        padding: 5px;
    }

    .top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .top-form-contents span {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }

    .container-right-loop-list {
        margin-bottom: 100px;
    }
</style>