/**
 * 集团对标
 */
import { findThirdPartData } from "~api/interface"
export default {
    methods: {
        /**
         * 查询数据的入口
         * @author szc 2019年6月4日16:55:40
         */
        queryDataPublic(judgeParams) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company,
                year = storeParams.year,
                month = storeParams.month,
                period = "",
                monthStr = "";
            if (month > 9) {
                period = year + "" + month;
                monthStr = "" + month;
            } else {
                period = year + "0" + month;
                monthStr = "0" + month;
            }
            let params = {
                company: company,
                year: year,
                month: monthStr,
                period: period,
                sql: ""
            };
            me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                if (res.data.code == 200) {
                    let curSqlId = judgeParams ? judgeParams.sqlId : "105";
                    me.sqlList = res.data.sqlList;
                    params = me.paramsOfSql(params, res.data.sqlList, curSqlId);
                    findThirdPartData(params).then(res => {
                        if (res.data.code == 200) {
                            me.tableData = res.data.data;
                            me.queryDataAfter(res.data.data, judgeParams);
                            // me.transData(res.data.data);
                            // //雷达图的数据转换。
                            // me.transRadarData(res.data.data);
                            // me.treeData = me.transformationTreeData(res.data.data);
                        }
                    });
                }
            });
        },
        /**
         * 查询数据之后。
         * @author szc 2019年6月6日19:21:00
         */
        queryDataAfter(datas, judgeParams) {
            debugger;
            let me = this;
            if (judgeParams.text == "profitability") {
                let arr = [{
                    id: 'gaugeTop',
                    content: ['', '', '']
                }, 'gaugeMiddleLeft', 'gaugeMiddleRight'];
                for (let i = 0; i < arr.length; i++) {
                    me[arr[i]] = [];
                }
                me.transData(datas, arr);
            }
        },
        /**
         * 请求参数上添加sql语句。
         * @author szc 2019年5月21日14:15:22
         */
        paramsOfSql(params, data, sqlId) {
            let me = this;
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id == sqlId) {
                        params.sql = item.sql;
                        break;
                    }
                }
            }
            return params;
        },
        /**
         * 处理数据
         * @author szc 2019年6月5日11:23:51
         */
        transData(datas, arrList) {
            let me = this,
                arrLeft = [],
                arrRight = [];
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                if (item.zbid == "ylnl" || item.zbid == "fznl") {
                    arrLeft.push(item);
                } else if (item.zbid == "zwfx" || item.zbid == "yyzl") {
                    arrRight.push(item);
                }
            }
            me.gaugesLeft = arrLeft;
            me.gaugesRight = arrRight;
        },
    }
}