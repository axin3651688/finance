import {
    saveReport
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
            let me = this;
            let params = {

            }
        },
        /**
         * 审阅
         */
        reviewHandler(item) {
            debugger;
            let me = this,
                fillModalConfig = {
                    title: "申请退回人员",
                    eventListener: "sendfillmessage", //事件监听方法名
                    dialogVisible: true,
                    checkbox: true,
                    type: "tree",
                    id: 'userReportRT',
                    title: "申请退回人员",
                    datas: [],
                    props: {
                        label: "label",
                        children: "children"
                    }
                };
            me.fillModalConfig = fillModalConfig;
        },
        /**
         * 退回
         */
        returnHandler(item) {},
        /**
         * 催报
         */
        urgeToReport(item) {

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
        }
    }
}