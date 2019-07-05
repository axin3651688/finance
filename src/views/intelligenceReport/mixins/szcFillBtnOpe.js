import {
    saveReport,
    querySonByspcode,
    queryStateOfTable,
    publicReport,
    saveBatchFillMessage,
    queryBatchReport
} from "~api/fill.js";

/**
 * 填报的上报、审阅等按钮的操作。
 * 当前默认@author szc 2019年4月30日08:56:51
 */
export default {
    methods: {
        /**
         * 上报
         * @param userStr 上报选择的人员拼接。
         */
        reportHandler(userStr) {
            debugger;
            let me = this,
                item = this.currentItem,
                id = this.templateId,
                storeParams = this.$store.getters,
                company = storeParams.company,
                period = '',
                year = storeParams.year,
                month = storeParams.month,
                companyname = storeParams.companyName,
                fromuser = storeParams.user.user.userName,
                statemun = item.id;
            if (month > 9) {
                period = year + "" + month;
            } else {
                period = year + "0" + month;
            }
            let tableFillInfoDto = {
                "company": company,
                "id": 0,
                "nreportnum": 1,
                "period": period,
                "scompanyname": companyname,
                "screatetime": new Date(),
                "screateuser": fromuser,
                "statemun": statemun,
                // "stouser": fromuser,
                "templateid": id,
                "users": userStr
            };
            // users = userStr;
            let params = {
                tableFillInfoDto: tableFillInfoDto
            };
            // params = JSON.stringify(params);
            saveReport(tableFillInfoDto).then(res => {
                if (res.data.code == 200) {
                    me.reportData(me.datas);
                    me.$message({
                        message: "上报成功！",
                        type: "success"
                    });
                } else {
                    me.$message.error(res.data.msg);
                    // me.$message({
                    //     message: res.data.msg,
                    //     type: "errer"
                    // });
                }
            });
        },
        /**
         * 申请退回
         */
        applicationForRefund(item) {
            debugger;
            let me = this,
                storeParams = this.$store.getters;
            let params = {
                "company": storeParams.company,
                "id": 0,
                "nreportnum": 1,
                "period": me.parsePeriod(),
                "scompanyname": storeParams.companyName,
                "screatetime": new Date(),
                "screateuser": storeParams.user.user.userName,
                "supdateuser": storeParams.user.user.userName,
                "statemun": item.id,
                // "stouser": fromuser,
                "templateid": me.templateId
            };
            queryStateOfTable(params).then(res => {
                if (res.data.code == 200) {
                    me.handlerStateOfTable(res.data.data, params);
                } else {
                    me.$message.error(res.data.data);
                }
            });
            // publicReport(params).then(res => {
            //     if (res.data.code == 200) {
            //         me.$message({
            //             message: res.data.data,
            //             type: "success"
            //         });
            //     }
            // });
        },
        /**
         * 撤回
         * @author szc 2019-5-9 14:08:03
         */
        revoke(item) {
            debugger;
            let me = this,
                storeParams = this.$store.getters;
            let params = {
                "company": storeParams.company,
                "id": 0,
                "nreportnum": 1,
                "period": me.parsePeriod(),
                "scompanyname": storeParams.companyName,
                "screatetime": new Date(),
                "screateuser": storeParams.user.user.userName,
                "supdateuser": storeParams.user.user.userName,
                "statemun": 4,
                // "stouser": fromuser,
                "templateid": me.templateId,
                "users": storeParams.user.user.userName
            };
            //查询报表的状态。
            let stateParams = {
                company: storeParams.company,
                period: me.parsePeriod(),
                templateid: me.templateId
            };
            queryStateOfTable(stateParams).then(res => {
                if (res.data.code == 200) {
                    me.handlerStateOfTable(res.data.data, params);
                } else {
                    me.$message.error(res.data.data);
                }
            });
            // publicReport(params).then(res => {
            //     if (res.data.code == 200) {
            //         me.$message({
            //             message: "撤回成功！",
            //             type: "success"
            //         });
            //     }
            // });
        },
        /**
         * 审阅
         */
        reviewHandler(item) {
            debugger;
            let me = this,
                companyscode = me.$store.getters.company,
                fillModalConfig = {
                    title: "审阅报表",
                    eventListener: "sendfillmessage", //事件监听方法名
                    dialogVisible: true,
                    checkbox: true,
                    type: "tree",
                    id: 'review',
                    title: "审阅报表",
                    datas: {
                        companyDatas: []
                    },
                    props: {
                        label: "label",
                        children: "children"
                    },
                    itemObj: item
                };
            //请求子公司的内容。
            querySonByspcode(companyscode).then(res => {
                if (res.data.code == 200) {
                    let resData = me.parseCompanyOfNeed(res.data.data);
                    fillModalConfig.datas.companyDatas = resData;
                    me.fillModalConfig = fillModalConfig;
                }
            });
            // me.fillModalConfig = fillModalConfig;
        },
        /**
         * 退回
         */
        returnHandler(item) {},
        /**
         * 催报
         */
        urgeToReport(item) {
            debugger;
            let me = this,
                fillModalConfig = {
                    title: "催报列表",
                    eventListener: "sendfillmessage", //事件监听方法名
                    dialogVisible: true,
                    checkbox: true,
                    type: "tree",
                    id: 'urgeToReport',
                    title: "催报列表",
                    datas: [],
                    props: {
                        label: "label",
                        children: "children"
                    },
                    operationBtns: [{
                        id: "urgeToBtn",
                        text: "催报"
                    }]
                };
            me.fillModalConfig = fillModalConfig;
        },
        /**
         * 可能存在一样的操作与请求。
         * @author szc 2019年5月5日17:01:47
         */
        publicHandler(userStr) {
            debugger;
            let me = this,
                item = this.currentItem,
                id = this.templateId,
                storeParams = this.$store.getters,
                company = storeParams.company,
                period = '',
                year = storeParams.year,
                month = storeParams.month,
                companyname = storeParams.companyName,
                fromuser = storeParams.user.user.userName,
                statemun = item.id;
            if (month > 9) {
                period = year + "" + month;
            } else {
                period = year + "0" + month;
            }
            let tableFillInfoDto = {
                "company": company,
                "id": 0,
                "nreportnum": 1,
                "period": period,
                "scompanyname": companyname,
                "screatetime": new Date(),
                "screateuser": fromuser,
                "statemun": statemun,
                // "stouser": fromuser,
                "templateid": id,
                "users": userStr
            };
            // let params = {
            //     tableFillInfoDto: tableFillInfoDto
            // };
            // params = JSON.stringify(params);
            saveReport(tableFillInfoDto).then(res => {
                if (res.data.code == 200) {
                    me.$message({
                        message: "申请退回成功！",
                        type: "success"
                    });
                } else {
                    me.$message.error(res.data.msg);
                    // me.$message({
                    //     message: res.data.msg,
                    //     type: "errer"
                    // });
                }
            });
        },
        /**
         * 公司数据转换成select想要的格式。
         * @author szc 2019年5月8日09:33:09
         */
        parseCompanyOfNeed(data) {
            debugger;
            let me = this;
            if (data && data.length > 0) {
                data.forEach(item => {
                    item.label = item.companyname;
                    item.value = item.scode;
                });
            }
            return data;
        },
        /**
         * 处理当前填报报表的结果。
         * @author szc 2019年5月9日19:05:19
         */
        handlerStateOfTable(data, params) {
            debugger;
            let me = this;
            if (data) {
                let state = data.statemun;
                switch (state) {
                    case 1:
                        // me.inputValue = "已上报";
                        //没有审阅直接点击申请退回，走撤回流程。
                        let msgObj = {};
                        if (params.statemun == 2) {
                            msgObj = {
                                text: "报表还未审阅，已撤回！"
                            };
                            params.statemun = 4;
                            me.publicReportHandler(params, msgObj);
                        } else if (params.statemun == 4) {
                            msgObj = {
                                text: "撤回成功！"
                            };
                            me.publicReportHandler(params, msgObj);
                        } else {
                            me.publicReportHandler(params);
                        }
                        break;
                    case 2:
                        //申请退回
                        me.$message({
                            message: "报表已在申请退回中..."
                        });
                        // let msgObj = {
                        //     msg:""
                        // };
                        // me.publicReportHandler(params);
                        // me.applicationForRefund();
                        break;
                    case 3:
                        //通过传的参数来判断，是不是申请退回。
                        if (params.statemun == 2) {
                            let msgObj = {
                                text: "申请成功..."
                            };
                            me.publicReportHandler(params, msgObj);
                        } else {
                            me.$message({
                                message: "报表已被审阅，请申请退回！"
                            });
                        }
                        break;
                    case 4:
                        me.reportData(me.datas);
                        me.$message({
                            message: "已撤回！"
                        });
                        break;
                    case 0:
                        // me.$message({
                        //     message: "已催报!"
                        // });
                        break;
                    default:
                        break;
                }
            }
        },
        /**
         * 撤回请求等通用的
         * @author szc 2019年5月9日19:14:12
         */
        publicReportHandler(params, msgObj) {
            debugger;
            let me = this;
            publicReport(params).then(res => {
                if (res.data.code == 200) {
                    me.reportData(me.datas);
                    me.$message({
                        message: msgObj ? msgObj.text : "操作成功！",
                        type: "success"
                    });
                }
            });
        },
        /**
         * 批量上报。
         */
        bulkReporting() {
            debugger;
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                period = me.parsePeriod(),
                params = {
                    company: company,
                    period: period
                };
            queryBatchReport(params).then(res => {
                if (res.data.code == 200) {
                    me.modalConfig = {
                        title: "批量上报",
                        eventListener: "confirmationButton", //事件监听方法名
                        dialogVisible: true,
                        type: "checkbox",
                        id: 'bulkReporting',
                        // datas: me.list,
                        datas: res.data.data,
                        footConfig: {
                            footBtn: true
                        }
                    };
                } else if (res.data.code == 1001) {
                    me.modalConfig = {
                        title: "批量上报",
                        eventListener: "confirmationButton", //事件监听方法名
                        dialogVisible: true,
                        type: "checkbox",
                        id: 'bulkReporting',
                        // datas: me.list,
                        datas: [],
                        footConfig: {
                            footBtn: true
                        }
                    };
                }
            });
        },
        /**
         * 确定按钮的公共处理。
         */
        confirmPublicHandler(params) {
            debugger;
            let me = this,
                requestParams = {};
            if (params.id == "checkbox") {
                requestParams = me.checkboxParams(params.tableTemplates);
            }
            saveBatchFillMessage(requestParams).then(res => {
                if (res.data.code == 200) {
                    me.$message({
                        message: "批量上报成功！",
                        type: "success"
                    });
                    me.modalConfig.dialogVisible = false;
                } else {
                    me.$message.error(res.data.msg);
                }
            });
        },
        checkboxParams(params) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                companyName = storeParams.companyName,
                userName = storeParams.user.user.userName,
                period = me.parsePeriod();
            let arr = [];
            params.forEach(item => {
                arr.push(item.templateid);
            });
            let requestParams = {
                company: company,
                period: period,
                templateids: arr.toString(),
                screateuser: userName,
                supdateuser: userName,
                statemun: 1,
            };
            return requestParams;
        }
    }
}