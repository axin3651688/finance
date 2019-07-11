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
import { findThirdPartData } from "~api/interface"

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
            // globalparam_all().then(res => {
            //     if(res.data.code == 200){
            //         let resData = res.data.data[0];
            //         if(resData.reporttype == 0){

            //         }
            //     }
            // });
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
                    //上次选择的数据。
                    me.selectConfig.currentSelect = me.selectItem;
                } else if (res.data.code == 1001) {
                    me.selectConfig.options = [];
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
            // let params = {
            //     riskReportStateDtos: [{
            //         company: company,
            //         id: 0,
            //         nrelateid: row.row.id,
            //         sisinstructions: "-1",
            //         period: me.parsePeriod()
            //     }],
            //     users: [
            //         userStr
            //     ]
            // };
            let params = {
                company: company,
                period: me.parsePeriod(),
                nrelateid: row.row.id,
                sisinstructions: "0",
                sinstructionsuser: row.row.sinstructionsuser
            };
            let requertParams = {
                data: params,
                success: "提醒成功！",
                error: "提醒失败！"
            };
            me.publicUpdateInstructionAll(requertParams);
            // me.publicUpdateInstruction(requertParams);
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
            // let params = {
            //     riskReportStateDtos: [{
            //         id: 0,
            //         company: company,
            //         nrelateid: row.row.id,
            //         sinstructionsuser: row.row.sinstructionsuser,
            //         // cstrategy:selectStr,
            //         period: me.parsePeriod(),
            //         // sinstructscontent:me.instructions,
            //         sisinstructions: "-1"
            //     }],
            //     users: []
            // };
            let params = {
                id: 0,
                company: company,
                nrelateid: row.row.id,
                period: me.parsePeriod(),
                sisinstructions: "2",
                sinstructionsuser: row.row.sinstructionsuser
            };
            let requertParams = {
                data: params,
                success: "退回成功！",
                error: "退回失败！"
            };
            // me.publicUpdateInstruction(requertParams);
            me.publicUpdateInstructionAll(requertParams);
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
                userName = me.$store.getters.user.user.userName,
                ops01 = [{
                    "id": "1",
                    "btnShow": true,
                    "text": "查看"
                }],
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
            if (userName == item.suser) {
                let retBtn = {
                    "id": "2",
                    "btnShow": true,
                    "text": "退回"
                }
                ops01.push(retBtn);
            }
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
                if (item.riskspcode && !objLook[item.riskspcode]) {
                    objLook[item.riskspcode] = item.riskspcode;
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
                company = storeParams.companyName;
            for (let i = 0; i < objItems.length; i++) {
                //导出用到的格式。
                let jsonItem = {
                    text: "",
                    level: 1,
                    leaf: 0,
                    children: []
                };
                let item = objItems[i];
                let objItem = {
                    id: item.riskspcode,
                    show: true,
                    riskCount: 0,
                    text: item.riskspname,
                    contentUp: {
                        content: []
                    }
                };
                jsonItem.text = item.riskspname;
                for (let j = 0; j < lookData.length; j++) {
                    let jsonTwo = {
                        level: 2,
                        leaf: 1,
                        type: "text",
                        content: ""
                    };
                    let lookItem = lookData[j];
                    let objUpContentFXMC = {
                            title: "风险名称",
                            content: []
                        },
                        objUpContentFXPG = {
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
                                reptcolor: lookItem.reptcolor,
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
                    if (item.riskspcode == lookItem.riskspcode) {
                        if (lookItem.instructionid == '1') {
                            contentLast.contentDown.rowItem = lookItem;
                        } else {
                            contentLast.contentDown.instructionObj = lookItem;
                        }
                        //导出报告的内容。
                        jsonTwo.content = lookItem.risktype + lookItem.levelsname + company + lookItem.sfilluser;
                        jsonItem.children.push(jsonTwo);
                        //上报人、等级、类型
                        contentLast.responsibility.text = lookItem.risktype;
                        contentLast.responsibility.level = lookItem.levelsname || "暂无等级";
                        contentLast.responsibility.company = company;
                        contentLast.responsibility.identificationUser = lookItem.sfilluser;
                        //风险名称。
                        objUpContentFXMC.content.push(lookItem.sriskname);
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
                        contentLast.content.push(objUpContentFXMC);
                        contentLast.content.push(objUpContentFXPG);
                        contentLast.content.push(objUpContentFXGS);
                        contentLast.content.push(objUpContentCQCS);
                        contentLast.content.push(objUpContentYDJY);
                        objItem.contentUp.content.push(contentLast);
                        //风险的条数。
                        objItem.riskCount++;
                        //导出格式从第二个开始的统一格式。
                        me.jsonFormatOfTwo(jsonItem, [objUpContentFXMC, objUpContentFXPG, objUpContentFXGS, objUpContentCQCS, objUpContentYDJY]);
                        //领导批示内容。
                        if (i == objItems.length - 1 && j == lookData.length - 1) {
                            if (objItems[i].instructionid == 1) {
                                me.instructionsContent(jsonItem, objItems[i], optionsData);
                            }
                        }
                    }
                }
                data.push(objItem);
            }
            return data;
        },
        /**
         * 从第二个开始的格式。
         */
        jsonFormatOfTwo(jsonItem, itemArr) {
            let me = this,
                jsonBeanData = me.jsonBeanData;
            itemArr.forEach(item => {
                let jsonTwoBack = {
                    level: 2,
                    leaf: 0,
                    type: "text",
                    content: "<strong>",
                    children: []
                };
                jsonTwoBack.content = jsonTwoBack.content + item.title;
                let childItemOut = {
                    level: 3,
                    leaf: 1,
                    type: "text",
                    content: ""
                }
                for (let i = 0; i < item.content.length; i++) {
                    let itemChild = item.content[i];
                    if (i != item.content.length - 1) {
                        itemChild += "<br>"
                    }
                    childItemOut.content = childItemOut.content + itemChild;
                }
                jsonTwoBack.children.push(childItemOut);
                jsonItem.children.push(jsonTwoBack);
            });
            jsonBeanData.children.push(jsonItem);
        },
        /**
         * 领导批示内容。
         */
        instructionsContent(jsonItem, objItem, optionsData) {
            let me = this,
                jsonTwoBack = {
                    level: 2,
                    leaf: 0,
                    type: "text",
                    content: "<strong>领导批示",
                    children: [{
                        level: 3,
                        leaf: 1,
                        type: "text",
                        content: ""
                    }]
                };
            if (objItem.instructionid == 1) {
                let cstrategy = objItem.cstrategy,
                    arr = cstrategy.split(",");
                let cstrategySelect = "";
                for (let i = 0; i < arr.length; i++) {
                    let itemArr = arr[i];
                    for (let j = 0; j < optionsData.length; j++) {
                        let itemOption = optionsData[j];
                        if (itemArr == itemOption.scode) {
                            cstrategySelect += itemOption.sname;
                            break;
                        }
                    }
                    if (i != arr.length - 1) {
                        cstrategySelect += ",";
                    }
                }
                jsonTwoBack.children[0].content = "风险策略为：" + cstrategySelect + "<br>";
                jsonTwoBack.children[0].content += objItem.psnr;
            }
            jsonItem.children.push(jsonTwoBack);
        },
        /**
         * 树表汇总的提醒功能。
         * @author szc 2019年5月29日12:57:35
         */
        remindTreeInstruction(scope) {
            let judgeParams = {
                id: "remind",
                sqlId: "108",
                scope: scope,
                queryAfter: "remindAfterHandler",
                params: {
                    company: scope.row.scode
                }
            };
            this.queryDataOfInstructions("", judgeParams);
            // let me = this,
            //     storeParams = me.$store.getters,
            //     company = storeParams.company,
            //     user = storeParams.user.user.userName;
            // let params = {
            //     company: company,
            //     period: me.parsePeriod(),
            //     sisinstructions: "0",
            //     sinstructionsuser: user
            // };
            // let requertParams = {
            //     data: params,
            //     success: "提醒成功！",
            //     error: "提醒失败！"
            // };
            // me.publicUpdateInstructionAll(requertParams);
            // me.publicUpdateInstruction(requertParams);
        },
        /**
         * 汇总提醒查询之后
         * @author szc 2019年6月12日14:15:06
         */
        remindAfterHandler(data, judgeParams) {
            let me = this;
            me.remindHandler(judgeParams);
            // me.dptDatas = me.reportDataTree(data);
            // me.prtParams = judgeParams;
            // me.publicVisible = true;
        },
        /**
         * 树表提醒的请求。
         * @param {*} nodes 
         * @param {*} prtParams 
         */
        remindHandler(judgeParams) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                user = storeParams.user.user.userName;
            let params = {
                company: judgeParams.params ? judgeParams.params.company : company,
                period: me.parsePeriod(),
                sisinstructions: "0",
                sinstructionsuser: user
            };
            let requertParams = {
                data: params,
                success: "提醒成功！",
                error: "提醒失败！"
            };
            me.publicUpdateInstructionAll(requertParams);
        },
        remindHandler_old(nodes, prtParams) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                user = storeParams.user.user.userName,
                arr = [];
            nodes.forEach(item => {
                arr.push(item.id);
            });
            let params = {
                company: prtParams.params ? prtParams.params.company : company,
                period: me.parsePeriod(),
                sisinstructions: "0",
                sinstructionsuser: user,
                toUsers: arr
            };
            let requertParams = {
                data: params,
                success: "提醒成功！",
                error: "提醒失败！"
            };
            me.publicUpdateInstructionAll(requertParams);
            me.publicVisible = false;
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
                error: "退回失败！",
                queryAfter: "returnAfterHandler"
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
                    if (params.queryAfter) {
                        me[params.queryAfter]();
                    }
                    me.$message({
                        message: params.success ? params.success : "操作成功！",
                        type: "success",
                    });
                } else {
                    me.$message.error(res.data.msg ? res.data.msg : (params.error ? params.error : "操作失败！"));
                }
            });
        },
        /**
         * 退回之后的处理。
         * 2019年6月12日17:44:41
         */
        returnAfterHandler() {
            let me = this;
            let selectItem = me.selectItem,
                judgeParams = me.getJudgeParams();
            me.queryDataOfInstructions(selectItem, judgeParams);
        },
        reportDataTree(data) {
            let objRes = {};
            if (data && data.length > 0) {
                data.forEach(item => {
                    if (!objRes[item.scode]) {
                        objRes[item.scode] = item.scode;
                    }
                });
            }
            let dptUser = [];
            for (let key in objRes) {
                let objDptUser = {
                    id: "",
                    label: "",
                    children: []
                };
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.scode == key) {
                        if (item.usernid) {
                            let objItem = {
                                id: item.suser,
                                label: item.username
                            };
                            objDptUser.id = item.scode;
                            objDptUser.label = item.sname;
                            objDptUser.children.push(objItem);
                        } else {
                            objDptUser.id = item.scode;
                            objDptUser.label = item.sname;
                        }
                    }
                }
                dptUser.push(objDptUser);
            }
            return dptUser;
        },
    },
}