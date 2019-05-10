import {
    saveReport,
    querySonByspcode,
    queryStateOfTable,
    publicReport
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
                "statemun": item.id,
                // "stouser": fromuser,
                "templateid": me.templateId,
                "users": storeParams.user.user.userName
            };
            publicReport(params).then(res => {
                if (res.data.code == 200) {
                    me.$message({
                        message: "申请退回成功！",
                        type: "success"
                    });
                }
            });
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
                    me.$message.error('撤回失败！');
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
                        me.publicReportHandler(params);
                        break;
                    case 2:
                        // me.$message({
                        //     message: "已"
                        // });
                        me.publicReportHandler(params);
                        break;
                    case 3:
                        me.$message({
                            message: "已审阅！"
                        });
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
        publicReportHandler(params) {
            debugger;
            let me = this;
            publicReport(params).then(res => {
                if (res.data.code == 200) {
                    me.reportData(me.datas);
                    me.$message({
                        message: "撤回成功！",
                        type: "success"
                    });
                }
            });
        }
        // /**
        //  * 查询当前选中的table的状态。
        //  * @author szc 2019年5月8日19:16:48
        //  */
        // queryStateOfFillTable() {
        //     debugger;
        //     let me = this,
        //         company = me.$store.getters.company;
        //     //查询选中的报表状态。
        //     let stateParams = {
        //         company: company,
        //         period: me.parsePeriod(),
        //         templateid: me.templateId
        //     };
        //     queryStateOfTable(stateParams).then(res => {
        //         if (res.data.code == 200) {
        //             me.tableState = res.data.data.statemun;
        //         } else if (res.data.code == 1001) {
        //             me.tableState = "";
        //         }
        //     })
        // }
    }
}