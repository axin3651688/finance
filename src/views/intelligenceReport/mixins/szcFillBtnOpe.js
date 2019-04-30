/**
 * 填报的上报、审阅等按钮的操作。
 * 当前默认@author szc 2019年4月30日08:56:51
 */
export default {
    methods: {
        /**
         * 上报
         */
        reportHandler(item) {
            debugger;
            let me = this,
                id = this.templateId,
                storeParams = this.$store.getters,
                company = storeParams.company,
                period = storeParams.period,
                companyname = storeParams.company,
                fromuser = storeParams.user.user.username,
                statemun = item.id;
            let params = {
                "company": company,
                "nreportnum": 1,
                "period": period,
                "scompanyname": companyname,
                "sfromuser": fromuser,
                "statemun": statemun,
                // "stouser": "string",
                "templateid": id
            };
            saveReport(params).then(res => {
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