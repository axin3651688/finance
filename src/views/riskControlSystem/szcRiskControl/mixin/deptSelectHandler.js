/**
 * 部门选择生成相应的风险批示内容。
 * @author szc 2019年5月17日11:50:50
 */

import {
    deptQueryRisk
} from '~api/szcRiskControl/riskControl.js'

export default {
    methods: {
        /**
         * 切换部门查询相应的风险批示内容。
         * 2019年5月17日13:41:32
         */
        changeOption(item, param) {
            debugger;
            let me = this;
            let params = {
                company: "",
                period: "",
                department: ""
            };
            // deptQueryRisk(params).then(res => {
            //     if (res.data.code) {

            //     }
            // })
        }
    },
}