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
                if (res.code == 0) {
                    me.$message({
                        message: "上报成功！",
                        type: "success"
                    });
                } else {
                    me.$message({
                        message: "上报出错！",
                        type: "errer"
                    });
                }
            });
        },
        /**
         * 申请退回
         */
        applicationForRefund(item) {
            debugger;
            let me = this;
        },
        /**
         * 审阅
         */
        reviewHandler(item) {
            debugger;
            let me = this,
                storeParams = this.$store.getters;
            let params = {
                "company": storeParams.scode,
                "nreportnum": 1,
                "period": storeParams.period,
                "scompanyname": storeParams.company,
                "sfromuser": storeParams.user.user.username,
                "statemun": item.id,
                // "stouser": "string",
                "templateid": me.templateId
            }
            saveReview(params).then(res => {

            });
        },
        /**
         * 退回
         */
        returnHandler(item) {},
        /**
         * 催报
         */
        urgeToReport(item) {

        }
    }
}