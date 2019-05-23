/**
 * 部门选择生成相应的风险批示内容。
 * @author szc 2019年5月17日11:50:50
 */

import {
    deptQueryRisk,
    queryDeparts
} from '~api/szcRiskControl/riskControl.js'
import { findThirdPartData } from "~api/interface";

export default {
    methods: {
        /**
         * 切换部门查询相应的风险批示内容。
         * 2019年5月17日13:41:32
         */
        changeOption(item, param) {
            debugger;
            let me = this;
            me.queryDataOfInstructions(item);
        },
        /**
         * 根据公司查询部门。
         * @author szc 2019年5月21日20:20:36
         */queryDepartMent() {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company;
            queryDeparts(company).then(res => {
                debugger;
                if (res.data.code == 200) {
                    me.selectConfig.options = res.data.data;
                }
            });
        }

    },
}