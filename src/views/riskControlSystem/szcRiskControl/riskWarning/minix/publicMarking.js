/**
 * 集团对标
 */
import {
    groupQuery
} from '~api/szcRiskControl/riskControl.js'
import { mapGetters } from "vuex";
import { findThirdPartData } from "~api/interface"
export default {
    /**
     * 计算属性。
     */
    computed: {
        ...mapGetters(["year", "month", "company"])
    },
    watch: {
        /**
         * 监听公司
         */
        company(newValue, oldValue) {
            this.updateData();
        },
        year(newValue, oldValue) {
            this.updateData();
        },
        month(newValue, oldValue) {
            this.updateData();
        }
    },
    methods: {
        /**
         * 后台接口直接查询数据。
         */
        queryDataOfBackstage(judgeParams) {
            debugger;
            let me = this;
            let params = judgeParams.params;
            groupQuery(params).then(res => {
                if (res.data.code == 200) {
                    me.tableData = res.data.data;
                    me.queryBackstageDataAfter(res.data.data, judgeParams);
                } else if (res.data.code == 1001) {
                    me.tableData = [];
                    me.queryBackstageDataAfter([], judgeParams);
                }
            });
        },
        /**
         * 查询数据之后的处理。
         */
        queryBackstageDataAfter(datas, judgeParams) {
            debugger;
            let me = this;
            if (judgeParams.id == "profitability") {
                me.profitabilityData(datas);
            } else if (judgeParams.id == "development") {
                me.developmentData(datas);
            } else if (judgeParams.id == "operationQuality") {
                me.operationData(datas);
            } else if (judgeParams.id == "debtRisk") {
                me.debtRiskData(datas);
            }
        },
        profitabilityData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugeTop',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['19', '20', '21']
            }, {
                id: 'gaugeMiddleLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['121', '133']
            }, {
                id: 'gaugeMiddleRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['53', '120']
            }];
            for (let i = 0; i < arr.length; i++) {
                me[arr[i].id] = [];
            }
            me.transData(datas, arr);
            me.createGauges(arr);
            //雷达图的数据格式。
            let radarConfig = {
                id: 'profitability',
                radarField: 'scode',
                radarSname: 'sname',
                radarValue: 'score',
                content: ['19', '20', '53', '120', '21', '121', '133']
            };
            me.transRadarData(datas, radarConfig);
        },
        /**
         * 处理发展能力数据的方法。
         */
        developmentData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugeTopLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['128']
            }, {
                id: 'gaugeTopRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['128']
            }, {
                id: 'gaugeMiddle',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['50', '129', '132']
            }];
            for (let i = 0; i < arr.length; i++) {
                me[arr[i].id] = [];
            }
            me.transData(datas, arr);
            me.createGauges(arr);
            //雷达图的数据格式。
            let radarConfig = {
                id: 'development',
                radarField: 'scode',
                radarSname: 'sname',
                radarValue: 'score',
                content: ['51', '50', '128', '129', '132']
            };
            me.transRadarData(datas, radarConfig);
        },
        /**
         * 运营质量的数据处理。
         */
        operationData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugeLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['52', '122', '124']
            }, {
                id: 'gaugeRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['123', '131', '31']
            }];
            for (let i = 0; i < arr.length; i++) {
                me[arr[i].id] = [];
            }
            me.transData(datas, arr);
            me.createGauges(arr);
            //雷达图的数据格式。
            let radarConfig = {
                id: 'operationQuality',
                radarField: 'scode',
                radarSname: 'sname',
                radarValue: 'score',
                content: ['52', '122', '31', '123', '124', '131']
            };
            me.transRadarData(datas, radarConfig);
        },
        /**
         * 债务风险数据的处理。
         */
        debtRiskData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugeTopLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['3']
            }, {
                id: 'gaugeTopRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['125']
            }, {
                id: 'gaugeMiddle',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['16', '17', '126']
            }];
            for (let i = 0; i < arr.length; i++) {
                me[arr[i].id] = [];
            }
            me.transData(datas, arr);
            me.createGauges(arr);
            //雷达图的数据格式。
            let radarConfig = {
                id: 'debtRisk',
                radarField: 'scode',
                radarSname: 'sname',
                radarValue: 'score',
                content: ['3', '17', '16', '125', '126']
            };
            me.transRadarData(datas, radarConfig);
        },
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
            if (judgeParams.id == "profitability") {
                let arr = [{
                    id: 'gaugeTop',
                    field: 'dim_indicator',
                    gaugeSname: 'sname',
                    gaugeField: 'val',
                    content: ['19', '20', '21']
                }, {
                    id: 'gaugeMiddleLeft',
                    field: 'dim_indicator',
                    gaugeSname: 'sname',
                    gaugeField: 'val',
                    content: ['121', '133']
                }, {
                    id: 'gaugeMiddleRight',
                    field: 'dim_indicator',
                    gaugeSname: 'sname',
                    gaugeField: 'val',
                    content: ['53', '120']
                }];
                for (let i = 0; i < arr.length; i++) {
                    me[arr[i].id] = [];
                }
                me.transData(datas, arr);
                me.createGauges(arr);
                //雷达图的数据格式。
                let radarConfig = {
                    id: 'profitability',
                    radarField: 'dim_indicator',
                    radarSname: 'sname',
                    radarValue: 'qyfz',
                    content: ['19', '20', '21', '121', '133', '53', '120']
                };
                me.transRadarData(datas, radarConfig);
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
            let me = this;
            for (let i = 0; i < arrList.length; i++) {
                let item = arrList[i];
                if (item.content && item.content.length > 0) {
                    let contentLength = item.content.length;
                    for (let k = 0; k < contentLength; k++) {
                        let itemCnt = item.content[k];
                        for (let j = 0; j < datas.length; j++) {
                            let itemArr = datas[j];
                            if (itemArr[item.field] == itemCnt) {
                                me[item.id].push(itemArr);
                                break;
                            }
                        }
                    }
                }
            }
        },
        /**
         * 生成仪表盘的公共方法。
         * @author szc 2019年6月10日11:16:14
         */
        createGauges(arr) {
            debugger;
            let me = this;
            arr.forEach(item => {
                if (me[item.id] && me[item.id].length > 0) {
                    for (let i = 0; i < me[item.id].length; i++) {
                        let itemCnt = me[item.id][i];
                        me.createOptions(itemCnt, item);
                    }
                }
                // me.createOptions(item);
            });
        },
        /**
         * options 仪表盘
         */
        createOptions(itemCnt, item) {
            let options = {
                tooltip: {
                    formatter: function(a, b, c) {
                        return a.seriesName + "<br/>" + a.name + "：" + Math.decimalToLocalString(a.value) + "%";
                    }
                },
                series: [{
                    name: '业务指标',
                    type: 'gauge',
                    min: 0,
                    max: 200, //设置最大刻度
                    splitNumber: 8,
                    //设置仪表盘的园的程度，这里设置的是半圆
                    startAngle: 170,
                    endAngle: 10,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: [
                                [0.25, "#F24764"],
                                [0.5, "#FBCE14"],
                                [0.75, "#11C3C2"],
                                [1, "#2FC35B"]
                            ],
                            width: 20 //表盘宽度
                        }
                    },
                    center: ["50%", "50%"], //整体的位置设置
                    radius: "85%", //仪表盘大小
                    //设置指针样式
                    pointer: {
                        show: true,
                        length: "50%",
                        width: 5
                    },
                    detail: {
                        formatter: function(a, b, c) {
                            return Math.decimalToLocalString(a) + "%";
                        },
                    },
                    data: [{ value: itemCnt[item.gaugeField] || 0, name: itemCnt[item.gaugeSname] || "" }]
                }]
            };
            itemCnt.options = options;
        },
        /**
         * 雷达图的数据转换。
         * @author szc 2019年6月5日14:14:05
         */
        transRadarData(datas, radarConfig) {
            debugger;
            let me = this,
                values = [],
                indicator = [];
            let indicatorCfg = me.getIndicator(datas, radarConfig);
            indicator = indicatorCfg.indicator;
            values = indicatorCfg.values;
            let receive = {
                    title: {
                        text: '企业综合评价对标雷达图',
                        left: '30%',
                        top: '10px'
                    },
                    tooltip: {},
                    legend: {
                        // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: indicator,
                        center: ['50%', '50%']
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [{
                            value: values,
                            name: ''
                        }]
                    }]
                }
                // indicator = indicatorCfg.indicator;
                // values = indicatorCfg.values;
                // data.forEach(item => {
                //     values.push(item.qyfz ? item.qyfz : 0);
                // });
            me.chartDataRadar.receive = receive;
        },
        /**
         * 获取雷达图的指标
         * @author szc 2019年6月10日13:49:56
         */
        getIndicator(datas, radarConfig) {
            let indicator = [],
                values = [],
                resObj = {},
                maxValue = 10;
            datas.forEach(item => {
                for (let i = 0; i < radarConfig.content.length; i++) {
                    let itemradar = radarConfig.content[i];
                    if (item[radarConfig.radarField] == itemradar) {
                        let itemObj = {};
                        itemObj.name = item[radarConfig.radarSname];
                        //暂时写成10
                        itemObj.max = maxValue;
                        indicator.push(itemObj);
                        values.push(item[radarConfig.radarValue] ? item[radarConfig.radarValue] : 0)
                        break;
                    }
                }
            });
            resObj = {
                indicator: indicator,
                values: values
            };
            return resObj;
        }
    }
}