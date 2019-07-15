<template>
    <div class="reportComponent" ref="reportComponent" id="reportComponent">
        <el-container
                class="container-all"
                ref="containerAll"
                v-if="pageDataFresh"
        >
            <div class="container-left">
                <div class="container-left-inner">
                    <h1 style="font-size: 28px;margin-bottom: 26px;">目&nbsp&nbsp录</h1>
                    <div
                            v-for="(value, key, index) in leftNode"
                            :key="key"
                            class="risk-items"
                    >
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
                        <span class="zs">总述</span>
                        <p class="describe">
                            截止2019年3月份，经风险评估分析， {{companyname}} 在风险方面共存在 {{riskCount.allRiskCount}} 条。
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


                        <template v-for="(riskfeed, key) in riskFeedDataList">

                            <div class="container-right-loop-title" :id="key">
                                {{riskfeed.risksptype}}
                            </div>

                            <div class="container-right-loop">

                                <div v-for="risk in riskfeed.riskdetaildata" class="container-right-loop-list">

                                    <div class="container-right-loop-top">
                                        <div class="container-top-left">
                                    <span class="left_1">
                                        {{ risk.risktype}}
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
                                            <p>
                                                {{item.content}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="container-right-loop-foot">
                            <div class="top-form-contents" style="margin-top: 30px">
                                <span>领导批示</span>
                                <div class="top-form-contents" style="margin-bottom: 0">
                                    <p style="min-width: 98px;width: 150px;margin-left: 30px">风险策略为：</p>
                                    <el-input v-model="writeData.risk_ps.risk_ps_cl" disabled></el-input>
                                </div>
                            </div>
                            <div class="top-form-contents">
                                <span style="min-width: 194px;width: 194px"></span>
                                <el-input type="textarea" :rows="3" v-model="writeData.risk_ps.risk_ps_content"
                                          disabled></el-input>
                            </div>

                            <div class="top-form-contents">
                                <span style="min-width: 194px;width: 194px">风险反馈</span>
                                <el-input
                                        type="textarea"
                                        :rows="4"
                                        v-model="writeData.risk_feed_content"
                                        placeholder="请填写反馈内容。。。"
                                        :disabled="reportState !== 'fk'"
                                ></el-input>
                            </div>
                        </div>


                    </div>

                    <div class="container-right-foot" v-if="this.dialogState !== 'ck'">
                        <el-checkbox
                                label="指定反馈人员"
                                name="type"
                                ref="checkBox"
                                class="form-foot-right-check"
                                id="form-foot-right-check"
                                :disabled="reportState !== 'fk'"
                                @change="handleCheckedChange"
                        ></el-checkbox>
                        <el-button
                                type="primary"
                                @click="showPersonnelListClicked"
                        >
                            反馈上报
                        </el-button>
                    </div>


                </div>
            </div>
        </el-container>

        <show-personnel-list
                :personnelListShow="personnelListShow"
                @personSureBtnClicked="personSureBtnClicked"
        >
        </show-personnel-list>

    </div>
</template>

<script>
    import showPersonnelList from '../../publicRiskControl/showPersonnelList'
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {updateInstruction} from "~api/szcRiskControl/riskControl"

    import {riskFeedControl} from '~api/cwtRiskControl/riskControlRequest'
    import {mapGetters} from "vuex"

    export default {
        name: "riskFeedReportComponent",
        mixins: [cwtPublicJS],
        components: {
            showPersonnelList
        },
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        props: {
            reportData: Object,
            dataFresh: Boolean,
            dialogState: String
        },
        data: function () {
            return {
                leftNode: {},
                companyname: this.$store.getters.companyName,
                riskname: '',
                risklevel: '',
                riskcompany: '',
                risksbuser: '',
                riskCount: {},
                risksptype: "",
                riskdetaildata: [],
                personnelListShow: false,
                pageHeight: document.body.offsetHeight,


                riskFeedDataList: {},
                writeData: {
                    risk_ps: {},
                    risk_feed_content: ''
                },
                period: this.$store.getters.year + '年' + this.$store.getters.month + '月',
                pageDataFresh: true,
                reportState: this.dialogState
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
                this.reportState = this.dialogState
            },

            /**
             * 设置div高度，并且实现左侧导航栏不跟随滚动，整个页面不滚动，只滚动报告内容部分
             * @type {number}
             */
            pageScrollSet() {
                let offsetHeight = document.body.offsetHeight,//页面整体高度
                    buttonHeight = 40,//select框高度 加上中间的margin-bottom的值
                    tabHeight = 39,//tab标签高度
                    gapHeight = 54,//间隙的高度
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

                            _this.writeData['risk_ps']['risk_ps_cl'] = _list[key].riskdetaildata[0].risk_ps.risk_ps_cl;
                            _this.writeData['risk_ps']['risk_ps_content'] = _list[key].riskdetaildata[0].risk_ps.risk_ps_content;
                            _this.writeData['risk_feed_content'] = _list[key].riskdetaildata[0].risk_feed_content;
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
             * @param riskFeedDataList
             */
            /*getReportCenterData(riskFeedDataList) {
                let _this = this;
                let riskTpyeId = this.selectedNode === '' ? 'flfx' : this.selectedNode;
                let allriskFeedDataList = riskFeedDataList[riskTpyeId];
                _this.risksptype = allriskFeedDataList.risksptype;
                _this.riskdetaildata = allriskFeedDataList.riskdetaildata;
            },*/

            /**
             * 切换风险类型按钮---点击目录选项
             * @param key
             */
            /*riskTypeChange(key) {
                // if (this.selectedNode === key) return;
                // this.selectedNode = key;
                // this.reportDataFormat();
            },*/

            /**
             * 反馈上报按钮点击
             */
            showPersonnelListClicked() {
                if (this.dialogState === 'ck') {
                    this.$message({
                        message: "请勿重复反馈"
                    });
                    return;
                }
                // this.personnelListShow = !this.personnelListShow;
                let _stoUser = this.reportData['stouser'];
                this.personSureBtnClicked(null, _stoUser);
            },


            /**
             * 点击了人员列表里面的确认上报
             * 这里已经获取了参数，
             * 传递给下一个发送请求的方法就行了
             */
            personSureBtnClicked(nodes, defaultUser) {
                let _this = this,
                    store = _this.$store.getters,
                    company = store.company,
                    user = store.user.user;

                let arrUser = [],
                    userStr = "";
                if (nodes && nodes.length > 0) {
                    nodes.forEach(item => {
                        arrUser.push(item.id);
                    });
                    userStr = arrUser.join(',');
                } else {
                    userStr = defaultUser;
                }

                let params = {
                    riskReportStateDtos: [],
                    users: [
                        userStr
                    ]
                };
                let _riskFeedDataList = _this.riskFeedDataList;

                for (let key in _riskFeedDataList) {
                    let detailData = _riskFeedDataList[key].riskdetaildata;
                    detailData.forEach((item) => {
                        let emptyData = {
                            company: company,
                            period: _this.getPeriod(),
                            sisfeedback: "1",
                            sfeedbacksuser: user.userName,
                            sfeedbackscontent: _this.writeData.risk_feed_content,
                            nrelateid: item.riskid,
                        };
                        params.riskReportStateDtos.push(emptyData);
                    })
                }
                _this.riskFeedSend(params);
            },

            /**
             * 反馈上报发送请求
             * @param params
             */
            riskFeedSend(params) {
                let _this = this;
                updateInstruction(params).then(res => {
                    if (res.data.code === 200) {
                        _this.$message({
                            message: "反馈成功。",
                            type: "success"
                        });
                        _this.reportState = '';
                        _this.personnelListShow = false;

                        _this.$emit("reportFeedSuccess")

                    } else if (res.data.code === '0') {
                        _this.$message({
                            message: res.data.msg
                        });
                    } else {
                        _this.$message({
                            message: "反馈失败！请联系开发人员"
                        })
                    }
                });
            },

            handleCheckedChange() {
                this.personnelListShow = !this.personnelListShow;
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
        /*background-color: rgba(255, 0, 153, 1);*/
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
        margin-bottom: 50px;
    }

    .container-right-foot {
        text-align: right;
    }

    .form-foot-right-check {
        margin-right: 20px;
    }
</style>