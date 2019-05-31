/**
 * 部门选择生成相应的风险批示内容和按钮的切换内容。
 * @author szc 2019年5月17日11:50:50
 */

import {
    deptQueryRisk,
    queryDeparts,
    updateInstruction,
    queryCopingStrategies,
    updateInstructionAll
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
            let judgeParams = {
                id: "stable",
                sqlId: "101"
            };
            me.queryDataOfInstructions(item, judgeParams);
        },
        /**
         * 根据公司查询部门。
         * @author szc 2019年5月21日20:20:36
         */
        queryDepartMent() {
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
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                userStr = storeParams.user.user.userName;
            let params = {
                riskReportStateDtos: [{
                    company: company,
                    id: 0,
                    nrelateid: row.row.id,
                    sisinstructions: "-1",
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
        returnRiskInstruction(row) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                user = storeParams.user.user.userName;
            let params = {
                riskReportStateDtos: [{
                    id: 0,
                    company: company,
                    nrelateid: row.row.id,
                    sinstructionsuser: user,
                    // cstrategy:selectStr,
                    period: me.parsePeriod(),
                    // sinstructscontent:me.instructions,
                    sisinstructions: "-1"
                }],
                users: [
                    row.row.sinstructionsuser
                ]
            };
            let requertParams = {
                data: params,
                success: "退回成功！",
                error: "退回失败！"
            };
            me.publicUpdateInstruction(requertParams);
            let selectItem = me.selectItem,
                judgeParams = me.getJudgeParams();
            me.queryDataOfInstructions(selectItem, judgeParams);
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
         * 公共获取判断参数。
         * @author szc 2019年5月28日16:56:51
         */
        getJudgeParams() {
            let me = this;
            let judgeParams = {
                id: "stable",
                sqlId: "101"
            }
            if (me.activeName == "second") {
                judgeParams = {
                    id: "treeTable",
                    sqlId: "103"
                }
            }
            return judgeParams;
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
                        "text": "批示"
                    },
                    {
                        "id": "3",
                        "btnShow": true,
                        "text": "提醒"
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
            let me = this,
                objLook = {},
                objItems = [];
            lookData.forEach(item => {
                if (item.riskscode && !objLook[item.riskscode]) {
                    objLook[item.riskscode] = item.riskscode;
                    //取出每不同行的唯一一行。
                    objItems.push(item);
                }
            });
            data.reportDataContent.riskFeedData = [];
            //查询风险策略下拉选的内容，放到报告上面去。
            queryCopingStrategies().then(res => {
                if (res.data.code == 200) {
                    let resData = res.data.data;
                    //lookData,查询的风险的所有的条数  objItems 风险的类型个数 
                    //data.reportDataContent.riskFeedData报告的展示内容 resData 下拉选的内容
                    data.reportDataContent.riskFeedData = me.middleContentOfReport(lookData, objItems, data.reportDataContent.riskFeedData, resData);
                    if (me.reportData.type) {
                        data.type = me.reportData.type;
                    }
                    me.reportData = data;
                    me.treeTableShow = false;
                }
            });
            // me.middleContentOfReport(lookData, objItems, data.reportDataContent.riskFeedData);
            // return data;
        },
        /**
         * 报告的中间的内容。
         * @param {*} lookData 
         * @param {*} data 
         */
        middleContentOfReport(lookData, objItems, data, optionsData) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company;
            for (let i = 0; i < objItems.length; i++) {
                let item = objItems[i];
                let objItem = {
                    id: item.riskscode,
                    show: true,
                    riskCount: 0,
                    text: item.risktype,
                    contentUp: {
                        content: []
                    }
                };
                for (let j = 0; j < lookData.length; j++) {
                    let lookItem = lookData[j];
                    let objUpContentFXPG = {
                            title: "风险评估",
                            content: []
                        },
                        objUpContentFXGS = {
                            title: "风险概述",
                            content: []
                        },
                        objUpContentCQCS = {
                            title: "采取措施",
                            content: []
                        },
                        objUpContentYDJY = {
                            title: "应对建议",
                            content: []
                        },
                        contentLast = {
                            responsibility: {
                                text: "社会责任风险",
                                level: "重要",
                                company: "",
                                identificationUser: "张三"
                            },
                            content: [],
                            contentDown: {
                                content: []
                            }
                        },
                        objDownContent = {
                            id: "",
                            type: "select",
                            label: "风险策略为：",
                            options: []
                        };
                    if (item.riskscode == lookItem.riskscode) {
                        if (lookItem.instructionid == '1') {
                            contentLast.contentDown.rowItem = lookItem;
                        } else {
                            contentLast.contentDown.instructionObj = lookItem;
                        }
                        //上报人、等级、类型
                        contentLast.responsibility.text = lookItem.sriskname;
                        contentLast.responsibility.level = lookItem.levelsname || "暂无等级";
                        contentLast.responsibility.company = company;
                        contentLast.responsibility.identificationUser = lookItem.reportuser;
                        //风险评估。
                        objUpContentFXPG.content.push(lookItem.nprobability);
                        objUpContentFXPG.content.push(lookItem.ninfluence);
                        //风险概述。
                        objUpContentFXGS.content.push(lookItem.description);
                        //采取措施。
                        objUpContentCQCS.content.push(lookItem.cqcs);
                        //应对建议
                        objUpContentYDJY.content.push(lookItem.ydjy);
                        //contenDown内容。
                        objDownContent.id = "10" + j;
                        objDownContent.options = optionsData;
                        //下拉选放进去。
                        contentLast.contentDown.content.push(objDownContent);
                        //内容装进去。
                        contentLast.content.push(objUpContentFXPG);
                        contentLast.content.push(objUpContentFXGS);
                        contentLast.content.push(objUpContentCQCS);
                        contentLast.content.push(objUpContentYDJY);
                        objItem.contentUp.content.push(contentLast);
                        //风险的条数。
                        objItem.riskCount++;
                    }
                }
                data.push(objItem);
            }
            return data;
        },
        /**
         * 树表汇总的提醒功能。
         * @author szc 2019年5月29日12:57:35
         */
        remindTreeInstruction(scope) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                user = storeParams.user.user.userName;
            let params = {
                company: company,
                period: me.parsePeriod(),
                sisinstructions: "0",
                sinstructionsuser: scope.row.sinstructionsuser
            };
            let requertParams = {
                data: params,
                success: "提醒成功！",
                error: "提醒失败！"
            };
            me.publicUpdateInstruction(requertParams);
        },
        /**
         * 风险管控汇总树表的退回功能。
         * @author szc 2019年5月29日16:49:22
         */
        returnInstruction(scope) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                user = storeParams.user.user.userName;
            let params = {
                id: 0,
                company: company,
                // nrelateid: row.row.id,/riskreportstate/update_remindback
                // sinstructionsuser: user,
                // cstrategy:selectStr,
                period: me.parsePeriod(),
                // sinstructscontent:me.instructions,
                sisinstructions: "2",
                sinstructionsuser: scope.row.sinstructionsuser
            };
            let requertParams = {
                data: params,
                success: "退回成功！",
                error: "退回失败！"
            };
            me.publicUpdateInstructionAll(requertParams);
        },
        /**
         * 批量退回、提醒的接口
         * @param {*} params 
         */
        publicUpdateInstructionAll(params) {
            let me = this;
            updateInstructionAll(params.data).then(res => {
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
    },
}