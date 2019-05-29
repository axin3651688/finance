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
                            :reportHeaderData="reportHeaderData"
                    >
                    </report-header>

                    <!--报告跳转界面中间公共部分内容-->
                    <report-conventional
                            :reportCompanyNameShow="this.reportData['reportCompanyName']"
                            :middleData.sync="middleData"
                            :showComponent.sync="showComponent"
                    >
                    </report-conventional>

                    <!--报告跳转界面领导批示的内容-->
                    <report-instruction
                            v-if="this.instructionShow"
                            :contentDown.sync="contentDown"
                    >
                    </report-instruction>

                    <!--报告跳转界面关于追踪的进度的内容-->
                    <report-schedule
                            v-if="this.scheduleShow"
                            :contentDown.sync="contentDown"
                    >
                    </report-schedule>
                    <!-- 风险管控的领导批示 -->
                    <!-- <reportControlInstruction v-if="reportControl" :contentDown="contentDown"></reportControlInstruction> -->

                    <div class="sb-btn" style="text-align: right;" v-if="this.instructionShow">
                        <el-button @click="sbRiskFeed">反馈上报</el-button>
                    </div>
                    <div class="sb-btn" style="text-align: right;">
                        <el-button @click="instructionHandle">批示下达</el-button>
                    </div>
                </div>
            </div>

        </el-container>
        <show-personnel-list :personnelListShow="personnelListShow" v-on:personSureBtnClicked="personSureBtnClicked"></show-personnel-list>
    </div>
</template>

<script>
    import reportHeader from './riskReportComponents/reportHeader'
    import reportConventional from './riskReportComponents/reportConventional'
    import reportInstruction from './riskReportComponents/reportInstruction'
    import reportSchedule from './riskReportComponents/reportSchedule'
    import showPersonnelList from './showPersonnelList'
    import reportControlInstruction from './riskReportComponents/reportControlInstruction'

    export default {
        name: "reportComponent",
        components: {
            reportHeader,
            reportConventional,
            reportInstruction,
            reportSchedule,
            showPersonnelList,
            reportControlInstruction
        },
        props: {
            reportData: Object
        },
        data: function () {
            return {
                showComponent:"",//控制显示报告下面的哪个组件，
                reportControl:false,//风险管控的领导批示
                personnelListShow: false,

                //控制显示哪个组件的flag
                instructionShow: true,
                scheduleShow: true,

                //目录信息，在下面进行赋值了
                leftNode: {},

                //传到头部reportHeader的数据
                reportHeaderData:{},
                middleData:{},//报告中间的数据
                contentDown:{}//报告的不同的内容的数据。
            }
        },
        created() {
            this.getShowContentData();
            this.getDirectoryData();
            this.getReportHeaderData();
            //计算中间内容的数据
            this.createDataOfMiddle();
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


            // this.


        },
        methods: {
            /**
             * 左侧导航栏点击事件
             * @param type
             */
            riskTypeChange(type) {
                debugger;
                // alert(type + '   恭喜，风险类型切换了，但是没有实现功能，只是效果展示');
                let me = this,reportData = me.reportData,reportDataList = reportData.reportDataContent.riskFeedData;
                if (reportDataList && reportDataList.length > 0) {
                    let length = reportDataList.length;
                    for(let i = 0; i < length; i++){
                        let item = reportDataList[i];
                        if(item.id == type){
                            item.show = true;
                        }else {
                            item.show = false;
                        }
                    }
                }
                me.createDataOfMiddle();
            },

            /**
             * 反馈上报按钮
             */
            sbRiskFeed() {
                this.personnelListShow = !this.personnelListShow;
            },
            /**
             * 批示下达
             * @author szc 2019年5月28日17:54:02
             */
            instructionHandle () {
                this.personnelListShow = !this.personnelListShow;
            },
            /**
             * 指定的人员的下达。
             */
            personSureBtnClicked (nodes) {
                debugger;
                let me = this,instructionsRpt = me.$store.instructionsRpt,middleData = me.middleData;
                if(instructionsRpt && middleData){
                    if(instructionsRpt.length == 0){
                        me.$message({
                            message:"请填写批示信息！",
                            type:"warning"
                        });
                        return;
                    }
                    if(instructionsRpt.length == middleData.riskCount){
                        me.saveInstructionsRpt(instructionsRpt);
                    }else {
                        me.$message({
                            message:"请完善批示信息！",
                            type:"warning"
                        });
                    }
                }else {
                    me.$message({
                        message:"请填写批示信息！",
                        type:"warning"
                    });
                }
            },
            /**
             * 批示保存批示信息。
             */
            saveInstructionsRpt (instructionsRpt) {
                let me = this,storeParams = me.$store.getters,
                    company = storeParams.company,
                    user = storeParams.user.user.userName;
                let params = {
                    riskReportStateDtos:[],
                    users:[
                        userStr
                    ]
                };
                let riskReportState = {
                    id: 0,
                    company:company,
                    nrelateid: "",
                    sinstructionsuser:user,
                    cstrategy:"",
                    period: me.parsePeriod(),
                    sinstructscontent:"",
                    sisinstructions:"1"
                }
                instructionsRpt.forEach(item => {
                    riskReportState.nrelateid = item.id;
                    riskReportState.cstrategy = item.instructionValues;
                    riskReportState.sinstructscontent = item.instruction;
                    params.riskReportStateDtos.push(riskReportState);
                });
                let requertParams = {
                    data: params,
                    success: "批示成功！",
                    error: "批示失败！"
                };
                me.publicUpdateInstruction(requertParams);
            },
            /**
             * 公共的退回、提醒等操作。
             * @author szc 2019年5月24日15:44:46
             */
            publicUpdateInstruction(params) {
                let me = this;
                updateInstruction(params.data).then(res => {
                    if (res.data.code == 200) {
                        me.$message({
                            message: params.success ? params.success : "操作成功！",
                            type: "success",
                        });
                    } else {
                        me.$message.error(params.error ? params.error : "操作失败！");
                    }
                });
            },
            /**
             * 转换日期。
             * @author szc 2019年5月22日19:04:24
             */
            parsePeriod(){
                let me = this,storeParams = me.$store.getters,
                year = storeParams.year,month = storeParams.month,period = "";
                if(month > 9) {
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                return period;
            },
            /**
             * 根据当前风险节点确定需要显示报告中的领导批示还是进度
             */
            getShowContentData(){
                let data = this.reportData,
                    reportType = data.reportType;
                this.instructionShow = reportType === 'riskFeedCom';
                this.scheduleShow = reportType === 'riskTrackCom';
                this.reportControl = reportType === "riskControlCom";
            },

            /**
             * 获取目录的数据
             */
            getDirectoryData(){
                debugger;
                let data = this.reportData,
                    reportDataList = data.reportDataContent.riskFeedData;
                reportDataList.forEach((report)=>{
                    let _id = report.id,
                        _text = report.text;
                    this.leftNode[_id] = _text;
                });
                // console.log(this.leftNode);
            },

            /**
             *获取报告头部那些数字数据的方法
             */
            getReportHeaderData(){
                let data = this.reportData,
                    headerData = data.reportDataContent.headerData;
                this.reportHeaderData['reportCompanyName'] = data.reportCompanyName;
                // this.reportHeaderData['period'] = data.period;
                this.reportHeaderData['dataList'] = headerData;
            },
            /**
             * 报告中间的数据。
             */
            createDataOfMiddle () {
                debugger;
                let me = this,reportData = me.reportData,contentData = [];
                if(reportData.reportDataContent && reportData.reportDataContent.riskFeedData) {
                    me.showComponent = "riskControl";
                    contentData = reportData.reportDataContent.riskFeedData;
                    let length = contentData.length;
                    for(let i = 0; i < length; i++){
                        let item = contentData[i];
                        if(item.show){
                            me.middleData = item;
                            me.contentDown = item.contentDown;
                            break;
                        }
                    }
                }
            }

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