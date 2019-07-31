<template>
    <div class="reportComponent" ref="reportComponent" id="reportComponent">
        <el-container
                class="container-all"
                ref="containerAll"
        >
            <div class="container-left">
                <div class="container-left-inner">
                    <h1 style="font-size: 28px;margin-bottom: 28px;textAlign:center;color: #333333;">目&nbsp&nbsp录</h1>
                    <div v-if="leftNode && leftNode.length > 0">
                        <el-menu :default-active="leftNode[0].id" class="el-menu-vertical-demo">
                            <el-menu-item class="el-menu-vertical_title" v-for="(item,key) in leftNode" :key="key" :index="item.id">
                                <a :href="'#' + item.id" slot="title">{{ item.text }}</a>
                            </el-menu-item>
                        </el-menu>
                    </div>
                    <!-- <div
                            v-for="(value,key) in leftNode"
                            :key="key"
                            class="risk-items"
                            @click="riskTypeChange(key)"
                    >
                        <a :href="'#' + key">
                            {{value}}
                        </a>
                    </div> -->
                </div>
            </div>

            <div ref="containerRightAll" style="width:100%;">
                <div class="container-right" ref="containerRight">
                    <!--报告跳转界面头部内容-->
                    <report-header
                            :reportHeaderData="reportHeaderData"
                    >
                    </report-header>

                    <!--报告跳转界面中间公共部分内容-->
                    <report-conventional v-if="reportConventional"
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
                        <el-button plain type="primary" @click="sbRiskFeed">反馈上报</el-button>
                    </div>
                     <!-- v-if="instructionRelease" -->
                    <div class="sb-btn" style="text-align: right;" v-if="instructionRelease">
                        <el-button plain type="primary" @click="instructionHandle">批示下达</el-button>
                    </div>
                </div>
            </div>

        </el-container>

        <show-personnel-list v-if="personRender" 
            :personnelListShow="personnelListShow" 
            v-on:personSureBtnClicked="personSureBtnClicked"
            v-on:publicHandler="publicHandler"></show-personnel-list>
    </div>
</template>

<script>
    import reportHeader from './riskReportComponents/reportHeader'
    import reportConventional from './riskReportComponents/reportConventional'
    import reportInstruction from './riskReportComponents/reportInstruction'
    import reportSchedule from './riskReportComponents/reportSchedule'
    import showPersonnelList from './showPersonnelList'
    import reportControlInstruction from './riskReportComponents/reportControlInstruction'
    import {
        updateInstruction
    } from '~api/szcRiskControl/riskControl.js'
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
                reportConventional:true,//重新渲染用的。
                instructionRelease:false,//批示下达按钮的显示与否
                showComponent:"",//控制显示报告下面的哪个组件，
                reportControl:false,//风险管控的领导批示
                personnelListShow: false,

                //控制显示哪个组件的flag
                instructionShow: true,
                scheduleShow: true,

                //目录信息，在下面进行赋值了
                leftNode: [],

                //传到头部reportHeader的数据
                reportHeaderData:{},
                middleData:{},//报告中间的数据
                contentDown:{},//报告的不同的内容的数据。
                personRender:true
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
                tabHeight = 0,//tab标签高度
                gapHeight = 45,//间隙的高度
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
                let me = this;
                // this.personRender = false;
                // this.$nextTick(()=>{
                //     me.personRender = true;
                // })
                this.personnelListShow = !this.personnelListShow;
            },
            /**
             * 指定的人员的下达。只有一个批示，ly说的。2019年6月12日15:36:37
             */
            personSureBtnClicked (nodes) {
                debugger;
                let me = this,instructionsRpt = me.$store.instructionsRpt,allData = me.reportData.allData;
                if(!instructionsRpt){
                    me.$message({
                        message:"请选择应对策略！",
                        type:"warning"
                    });
                    return
                }
                //判断字数不能超出1000
                if(instructionsRpt && instructionsRpt.length > 0){
                    let instruction = instructionsRpt[0].instruction;
                    if(instruction && instruction.length > 1000){
                        me.$message({
                            message:"批示内容不能超出一千字！",
                            type:"warning"
                        });
                        return;
                    }
                }
                me.saveInstructionsRpt(instructionsRpt,nodes,allData);
            },
            personSureBtnClicked_old (nodes) {
                let me = this,instructionsRpt = me.$store.instructionsRpt,middleData = me.middleData,riskCount = 0;
                //因为要全部显示，所以要遍历相加。
                middleData.forEach(item => {
                    riskCount += item.riskCount;
                });
                if(instructionsRpt && middleData){
                    if(instructionsRpt.length == 0){
                        me.$message({
                            message:"请填写批示信息！",
                            type:"warning"
                        });
                        return;
                    }
                    if(instructionsRpt.length == riskCount){
                        me.saveInstructionsRpt(instructionsRpt,nodes);
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
            saveInstructionsRpt (instructionsRpt,nodes,allData) {
                let me = this,storeParams = me.$store.getters,
                    company = storeParams.company,
                    user = storeParams.user.user.userName;
                // let userStr = nodes
                let arr = [],userStr = "";
                nodes.forEach(item => {
                    arr.push(item.id)
                });
                // userStr = arr.join(',');
                let params = {
                    riskReportStateDtos:[],
                    users:arr
                };
                allData.forEach(item => {
                    let riskReportState = {
                        id: 0,
                        company:item.scode || company,
                        nrelateid: "",
                        sinstructionsuser:user,
                        cstrategy:"",
                        period: me.parsePeriod(),
                        sinstructscontent:"",
                        sisinstructions:"1"
                    }
                    riskReportState.nrelateid = item.nrelateid;
                    riskReportState.cstrategy = instructionsRpt[0].instructionValues;
                    riskReportState.sinstructscontent = instructionsRpt[0].instruction;
                    params.riskReportStateDtos.push(riskReportState);
                });
                let requertParams = {
                    data: params,
                    success: "批示成功！",
                    error: "批示失败！",
                    afterHandler:"afterInstructionRpt",
                    afterParams:instructionsRpt
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
                            message: res.data.msg? res.data.msg:(params.success ? params.success : "操作成功！"),
                            type: "success",
                        });
                        if(params.afterHandler){
                            me[params.afterHandler](params.afterParams);
                        }
                    } else {
                        // me.$message.error(params.error ? params.error : "操作失败！");
                        me.$message.error(res.data.msg? res.data.msg : (params.error ? params.error : "操作失败！"));
                    }
                });
            },
            /**
             * 风险批示之后的处理。
             * @author szc 2019年5月29日14:15:01
             */
            afterInstructionRpt (afterParams) {
                let me = this,middleData = me.middleData;
                let itemMiddle = middleData[middleData.length - 1];
                let content = itemMiddle.contentUp.content;
                for(let i = 0;i < content.length;i++){
                    let item = content[i];
                    if(item.contentDown && i == content.length - 1){
                        item.contentDown.rowItem = item.contentDown.instructionObj;
                        delete item.contentDown.instructionObj;
                        for(let j = 0;j < afterParams.length;j ++){
                            let afterParamsItem = afterParams[j];
                            if(item.contentDown.rowItem.nrelateid == afterParamsItem.id){
                                item.contentDown.rowItem.cstrategy = afterParamsItem.instructionValues;
                                item.contentDown.rowItem.instructionid = "1";
                                item.contentDown.rowItem.psnr = afterParamsItem.instruction;
                                break;
                            }
                        }
                    }
                }
                //删除添加到全局对象上的批示内容
                if(me.$store.instructionsRpt){
                    delete me.$store.instructionsRpt;
                }
                me.instructionRelease = false;
                // middleData.contentUp.content = content;
                // middleData.changeValue = Math.floor(Math.random()*1000);
                me.middleData = middleData;
                me.personnelListShow = !me.personnelListShow;
                me.reportConventional = false;
                me.$nextTick(()=>{
                    me.reportConventional = true;
                })
            },
            afterInstructionRpt_old (afterParams) {
                let me = this,middleData = me.middleData;
                for(let k = 0;k < middleData.length;k++){
                    let itemMiddle = middleData[k];
                    let content = itemMiddle.contentUp.content;
                    for(let i = 0;i < content.length;i++){
                        let item = content[i];
                        if(item.contentDown){
                            item.contentDown.rowItem = item.contentDown.instructionObj;
                            for(let j = 0;j < afterParams.length;j ++){
                                let afterParamsItem = afterParams[j];
                                if(item.contentDown.rowItem.nrelateid == afterParamsItem.id){
                                    item.contentDown.rowItem.cstrategy = afterParamsItem.instructionValues;
                                    item.contentDown.rowItem.instructionid = "1";
                                    item.contentDown.rowItem.psnr = afterParamsItem.instruction;
                                    break;
                                }
                            }
                        }
                    }
                }
                //删除添加到全局对象上的批示内容
                if(me.$store.instructionsRpt){
                    delete me.$store.instructionsRpt;
                }
                me.instructionRelease = false;
                // middleData.contentUp.content = content;
                // middleData.changeValue = Math.floor(Math.random()*1000);
                me.middleData = middleData;
                me.personnelListShow = !me.personnelListShow;
                me.reportConventional = false;
                me.$nextTick(()=>{
                    me.reportConventional = true;
                })
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
                let data = this.reportData,
                    reportDataList = data.reportDataContent.riskFeedData,
                    numCh = {
                        1:'一、',
                        2:'二、',
                        3:'三、',
                        4:'四、',
                        5:'五、',
                        6:'六、',
                        7:'七、'
                    };
                reportDataList.forEach((report,index)=>{
                    let _id = report.id,
                        _text = report.text;
                    let obj = {
                        id:_id,
                        // text:numCh[index + 1] + _text
                        text:_text
                    };
                    this.leftNode.push(obj);
                    // this.leftNode[_id] = _text;
                });
                // console.log(this.leftNode);
            },

            /**
             *获取报告头部那些数字数据的方法
             */
            getReportHeaderData(){
                let data = this.reportData,
                    headerData = data.reportDataContent.headerData,allData = data.allData,
                    headerReport = {
                        totalCount:allData.length,
                        contentType:[],
                        contentLevel:[]
                    };
                if(allData && allData.length > 0){
                    let objParent = {},objLevel = {};
                    allData.forEach(item => {
                        if(item.riskspcode && !objParent[item.riskspcode]){
                            objParent[item.riskspcode] = item.riskspname;
                            // objParent.riskspname = item.riskspname;
                        }
                        if(item.levelnid && !objLevel[item.levelnid]){
                            objLevel[item.levelnid] = item.levelsname;
                        }
                    });
                    // headerReport.totalCount = allData.length;
                    //风险类型
                    for(let key in objParent){
                        let itemObj = {
                            count:0,
                            text:""
                        };
                        allData.forEach(item => {
                            if(item.riskspcode == key){
                                itemObj.count ++;
                                itemObj.text = objParent[key];
                            }
                        });
                        headerReport.contentType.push(itemObj);
                    }
                    //风险等级
                    for(let key in objLevel){
                        let itemObj = {
                            count:0,
                            text:""
                        };
                        allData.forEach(item => {
                            if(item.levelnid == key){
                                itemObj.count ++;
                                itemObj.text = objLevel[key];
                            }
                        });
                        headerReport.contentLevel.push(itemObj);
                    }
                    // headerData.headerReport = headerReport;
                }
                this.reportHeaderData['reportCompanyName'] = data.reportCompanyName;
                // this.reportHeaderData['period'] = data.period;
                this.reportHeaderData['dataList'] = headerData;
                this.reportHeaderData['headerReport'] = headerReport;
                

            },
            /**
             * 报告中间的数据。
             */
            createDataOfMiddle () {
                let me = this,reportData = me.reportData,contentData = [],leftNode = me.leftNode;
                if(reportData.type == "0" && leftNode && leftNode.length > 0){
                    me.instructionRelease = true
                }else {
                    me.instructionRelease = false
                }
                if(reportData.reportDataContent && reportData.reportDataContent.riskFeedData) {
                    me.showComponent = "riskControl";
                    contentData = reportData.reportDataContent.riskFeedData;
                    me.middleData = contentData;
                    // let length = contentData.length;
                    // for(let i = 0; i < length; i++){
                    //     let item = contentData[i];
                    //     if(item.show){
                    //         me.middleData = item;
                    //         me.contentDown = item.contentDown;
                    //         break;
                    //     }
                    // }
                }
            },
            /**
             * 公共的处理方式。
             */
            publicHandler (params) {
                let me = this;
                if(params.id == "close"){
                    me.personnelListShow = false;
                }
            }

        }
    }
</script>

<style scoped>
    .sb-btn {
        /* text-align: right ; */
        position: fixed ;
        z-index: 2;
        bottom: 0.42rem;
        right: 20px;
    }
    .container-all {
        display: flex;
        flex-direction: row;
        flex: 1;
        flex-basis: auto;
        box-sizing: border-box;
        min-width: 0;
        border: 1px solid #ccc;
        /* border: 1px solid; */
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
        width: 300px;
        border-right: 1px solid #ccc;
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
        /* border-left: 1px solid; */
    }
    .el-menu-vertical_title {
        margin-left: 0;
        font-size: 20px;
        color: #333333;
    }
    .el-menu-vertical-demo {
        background-color: #f0f2f5;
        border: 0;
    }
</style>