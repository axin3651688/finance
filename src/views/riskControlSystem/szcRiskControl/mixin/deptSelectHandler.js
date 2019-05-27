/**
 * 部门选择生成相应的风险批示内容和按钮的切换内容。
 * @author szc 2019年5月17日11:50:50
 */

import {
    deptQueryRisk,
    queryDeparts,
    updateInstruction
} from '~api/szcRiskControl/riskControl.js'
import { findThirdPartData } from "~api/interface";

export default {
    methods: {
        /**
         * 切换部门查询相应的风险批示内容。
         * 2019年5月17日13:41:32
         */
        changeOption(item, param) {
            let me = this;
            me.selectItem = item;
            me.queryDataOfInstructions(item);
        },
        /**
         * 根据公司查询部门。
         * @author szc 2019年5月21日20:20:36
         */
        queryDepartMent() {
            debugger;
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company;
            queryDeparts(company).then(res => {
                if (res.data.code == 200) {
                    me.selectConfig.options = res.data.data;
                }
            });
        },
        /**
         * 风险管控的table的所有的按钮事件总入口
         * @author szc 2019年5月24日13:29:47
         */
        changeShowContent(row, item) {
            debugger;
            let me = this;
            //0 批示 1 查看 2 退回 3 提醒
            if (item.id == "1") {
                me.clickItemName(row);
            } else if (item.id == "0") {
                me.clickItemName(row);
            } else if (item.id == "2") {
                me.returnRiskInstruction(row);
            } else if (item.id == "3") {
                me.remindInstruction(row);
            }
        },
        /**
         * 风险提醒。
         * @author szc 2019年5月24日16:50:58
         */
        remindInstruction(row) {
            debugger;
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                userStr = storeParams.user.user.userName;
            let params = {
                riskReportStateDtos: [{
                    company: company,
                    id: 0,
                    nrelateid: row.row.id,
                    sisinstructions: "0",
                    period: me.parsePeriod()
                }],
                users: [
                    userStr
                ]
            };
            let requertParams = {
                data: params,
                success: "提醒成功！",
                error: "提醒失败！"
            };
            me.publicUpdateInstruction(requertParams);
        },
        /**
         * 退回风险批示。
         * @author szc 2019年5月24日15:39:45
         */
        returnRiskInstruction() {
            debugger;
            let me = this;
            let params = {
                "riskReportStateDtos": [{
                    "company": "string",
                    "cstrategy": "string",
                    "id": 0,
                    "nrelateid": 0,
                    "period": "string",
                    "scompanyname": "string",
                    "sfeedbackscontent": "string",
                    "sfeedbacksuser": "string",
                    "sfeedbacksusername": "string",
                    "sfeedbacktime": "string",
                    "sinstructionsuser": "string",
                    "sinstructionsusername": "string",
                    "sinstructiontime": "string",
                    "sinstructscontent": "string",
                    "sisfeedback": "string",
                    "sisinstructions": "string",
                    "sisreport": "string",
                    "sissummary": "string",
                    "sreporttime": "string",
                    "sreportuser": "string",
                    "sreportusername": "string",
                    "sriskname": "string"
                }],
                "users": [
                    "string"
                ]
            };
            let requertParams = {
                data: "",
                success: "退回成功！",
                error: "退回失败！"
            };
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
        parsePeriod() {
            let me = this,
                storeParams = me.$store.getters,
                year = storeParams.year,
                month = storeParams.month,
                period = "";
            if (month > 9) {
                period = year + "" + month;
            } else {
                period = year + "0" + month;
            }
            return period;
        },
        /**
         * 下面是树表的数据的处理方法。
         * @author szc 2019年5月24日17:57:02
         * 
         * 此方法是转换树表的数据。当前切换公司的所有下级。
         */
        transformationTreeData(data) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company;
            //findroot
            let root = company,
                treeData = [],
                rootItem = {};
            rootItem = data.filter(item => {
                return item.scode == root;
            });
            data = data.filter(item => {
                return item.scode != company;
            });
            let rootItemData = rootItem[0];
            if (rootItemData.sstate) {
                me.setOperations(rootItemData);
            }
            me.recursionData(data, rootItemData);
            return rootItemData;
        },
        /**
         * 递归转换数据。
         * @author szc 2019年5月27日09:20:29
         */
        recursionData(data, rootItem) {
            let me = this,
                arr = [];
            rootItem.children = [];
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (rootItem.scode == item.spcode) {
                    if (item.sstate) {
                        me.setOperations(item);
                    }
                    rootItem.children.push(item);
                } else {
                    arr.push(item);
                }
            }
            if (rootItem.children && rootItem.children.length > 0) {
                for (let j = 0; j < rootItem.children.length; j++) {
                    let childItme = rootItem.children[j];
                    me.recursionData(arr, childItme);
                }
            }
        },
        /**
         * 设置操作按钮。
         * @author szc 2019年5月27日16:02:58
         */
        setOperations(item) {
            let me = this,
                ops01 = [{
                        "id": "1",
                        "btnShow": true,
                        "text": "查看"
                    },
                    {
                        "id": "2",
                        "btnShow": true,
                        "text": "退回"
                    }
                ],
                ops02 = [{
                        "id": "0",
                        "btnShow": true,
                        "text": "查看"
                    },
                    {
                        "id": "3",
                        "btnShow": true,
                        "text": "退回"
                    }
                ];
            if (item.sstate == "已批示") {
                item.operation = ops01;
            } else if (item.sstate == "未批示") {
                item.operation = ops02;
            }

        },
        /**
         * 这以下的一段是报告的查看方法处理。
         * @author szc 2019年5月27日16:56:28
         */
        showDataOfInstruction(lookData, data) {
            debugger;
            let me = this,
                objLook = {};
            lookData.forEach(item => {
                if (item.riskscode && !objLook[item.riskscode]) {
                    objLook[item.riskscode] = item.riskscode;
                }
            });
        }
    },
}