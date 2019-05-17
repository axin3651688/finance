<template>
    <div class="reportComponent" ref="reportComponent" id="reportComponent">
        <el-container
                class="container-all"
                ref="containerAll"
        >
            <div class="container-left">
                <div class="container-left-inner">
                    <h1 style="font-size: 28px;margin-bottom: 26px;margin-left: 26px;">目&nbsp&nbsp录</h1>
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
                    <!--报告跳转界面头部内容-->
                    <report-header
                            :reportCompanyNameShow="this.reportData['reportCompanyName']"
                    >
                    </report-header>

                    <!--报告跳转界面中间公共部分内容-->
                    <report-conventional
                            :reportCompanyNameShow="this.reportData['reportCompanyName']"
                    >
                    </report-conventional>

                    <!--报告跳转界面领导批示的内容-->
                    <report-instruction
                            v-show="this.instructionShow"
                    >
                    </report-instruction>

                    <!--报告跳转界面关于追踪的进度的内容-->
                    <report-schedule
                            v-show="this.scheduleShow"
                    >
                    </report-schedule>


                    <div class="sb-btn" style="text-align: right;" v-show="this.instructionShow">
                        <el-button @click="sbRiskFeed">反馈上报</el-button>
                    </div>

                    <!--<div class="sb-btn" style="text-align: right;" v-show="this.scheduleShow">-->
                    <!--<el-button type="primary" @click="exportBtn">导出</el-button>-->
                    <!--<el-button @click="closeBtn">关闭</el-button>-->
                    <!--</div>-->


                </div>
            </div>

        </el-container>
        <show-personnel-list :personnelListShow="personnelListShow"></show-personnel-list>
    </div>
</template>

<script>
    import reportHeader from './riskReportComponents/reportHeader'
    import reportConventional from './riskReportComponents/reportConventional'
    import reportInstruction from './riskReportComponents/reportInstruction'
    import reportSchedule from './riskReportComponents/reportSchedule'
    import showPersonnelList from './showPersonnelList'

    export default {
        name: "reportComponent",
        components: {
            reportHeader,
            reportConventional,
            reportInstruction,
            reportSchedule,
            showPersonnelList
        },
        props: {
            reportData: Object
        },
        data: function () {
            return {
                personnelListShow: false,

                //控制显示哪个组件的flag
                instructionShow: this.reportData['reportType'] === 'riskFeedCom',
                scheduleShow: this.reportData['reportType'] === 'riskTrackCom',


                leftNode: {
                    zlfx: '一、战略风险',
                    tzfx: '二、投资风险',
                    yyfx: '三、运营风险',
                    cwfx: '四、财务风险',
                    flfx: '五、法律风险',
                    ljfx: '六、廉洁风险'
                }
            }
        },
        created() {
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

            this.$refs.containerAll.$el.style.height = tableHeight +'px';
            this.$refs.containerRightAll.style.height = tableHeight +'px';
            this.$refs.containerAll.$el.style.overflow  = 'hidden';
            this.$refs.containerAll.$el.style['overflow-x']  = 'auto';
            this.$refs.containerRightAll.style.overflow  = 'auto';
        },
        methods: {
            /**
             * 左侧导航栏点击事件
             * @param type
             */
            riskTypeChange(type) {
                alert(type + '   恭喜，风险类型切换了，但是没有实现功能，只是效果展示');
            },

            /**
             * 反馈上报按钮
             */
            sbRiskFeed() {
                this.personnelListShow = !this.personnelListShow;
            },

            // /**
            //  * 导出按钮
            //  */
            // exportBtn() {
            //     alert('导出成功')
            // },
            // /**
            //  * 关闭按钮
            //  */
            // closeBtn() {
            //     alert('关闭事件')
            // }
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
</style>