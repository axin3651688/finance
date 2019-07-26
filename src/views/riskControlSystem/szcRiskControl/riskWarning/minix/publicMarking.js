/**
 * 集团对标
 */
import tools from '@/utils/tools.js'
import {
    groupQuery
} from '~api/szcRiskControl/riskControl.js'
import { mapGetters, mapActions } from "vuex";
import { findThirdPartData } from "~api/interface"
export default {
    /**
     * 计算属性。
     */
    computed: {
        ...mapGetters(["year", "month", "company", "showDims"])
    },
    watch: {
        /**
         * 监听公司
         */
        company(newValue, oldValue) {
            // this.updateTabOther();
            this.removeTabOfUseless();
            this.updateData();
        },
        year(newValue, oldValue) {
            // this.updateTabOther();
            this.removeTabOfUseless();
            this.updateData();
        },
        month(newValue, oldValue) {
            // this.updateTabOther();
            this.removeTabOfUseless();
            this.updateData();
        }
        // $route(to, form) {
        //     debugger;
        //     let me = this;
        // }
    },
    methods: {
        ...mapActions(["ShowDims"]),
        /**
         * 去除后面的没用的tab页。
         */
        removeTabOfUseless() {
            let me = this;
            me.$emit("removeTabOfUselessHandler");
        },
        /**
         * 没有描述
         */
        updateTabOther() {
            let me = this;
            me.editableTabs = [];
            me.activeName = "first";
        },
        /**
         * 后台接口直接查询数据。
         */
        queryDataOfBackstage(judgeParams) {
            let me = this;
            let params = judgeParams.params;
            groupQuery(params).then(res => {
                if (res.data.code == 200) {
                    let copyDatas = me.deepCopy(res.data.data);
                    me.queryBackstageDataAfterBefore(copyDatas, judgeParams);
                    me.tableData = copyDatas;
                    me.queryBackstageDataAfter(res.data.data, judgeParams);
                } else if (res.data.code == 1001) {
                    me.tableData = [];
                    me.queryBackstageDataAfter([], judgeParams);
                }
            });
        },
        /**
         * 深拷贝
         * @param {深拷贝} obj 
         */
        deepCopy(obj) { //深拷贝
            let result = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        result[key] = this.deepCopy(obj[key]); //递归复制
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
        /**
         * 数据赋值之前。
         */
        queryBackstageDataAfterBefore(datas, judgeParams) {
            let me = this;
            if (judgeParams.id == "comprehensiveRating") {
                datas.forEach(item => {
                    if (item.zbid == "qypj") {
                        item.drillNo = true;
                    }
                });
                me.retainDecimalOfTwo(datas, "qyfz");
            } else {
                //某些指标不能钻取。
                let arr = ['fznl', 'ylnl', 'yyzl', 'zwfx'];
                datas.forEach(item => {
                    if (arr.indexOf(item.scode) != -1) {
                        item.drillNo = true;
                    }
                });
                //保留一位小数。arr = [a,b,c,d,e]
                me.retainDecimalOfOne(datas, ['a', 'b', 'c', 'd', 'e']);
                //企业分值保留两位小数。
                me.retainDecimalOfTwo(datas, "v");
            }
            //企业分值保留两位小数。
            // me.retainDecimalOfTwo(datas);
        },
        retainDecimalOfOne(datas, inItems) {
            datas.forEach(item => {
                inItems.forEach(it => {
                    item[it] = item[it] ? tools.currency(item[it], "", 1) : 0.0;
                });
            });
        },
        retainDecimalOfTwo(datas, prop) {
            datas.forEach(item => {
                if (item[prop] || item[prop] == 0) {
                    item[prop] = Math.decimalToLocalString(item[prop]);
                }
            });
        },
        /**
         * 查询数据之后的处理。
         */
        queryBackstageDataAfter(datas, judgeParams) {
            let me = this;
            if (judgeParams.id == "profitability") {
                me.profitabilityData(datas);
            } else if (judgeParams.id == "development") {
                me.developmentData(datas);
            } else if (judgeParams.id == "operationQuality") {
                me.operationData(datas);
            } else if (judgeParams.id == "debtRisk") {
                me.debtRiskData(datas);
            } else if (judgeParams.id == "comprehensiveRating") {
                me.comprehensiveData(datas);
            } else if (judgeParams.id == 'ylnl_xz') {
                me.singleIndicatorDrill(datas, judgeParams);
            }
        },
        /**
         * 综合评级。
         */
        comprehensiveData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugesLeft',
                field: 'scode',
                gaugeSname: 'zbmc',
                gaugeField: 'qyfz',
                content: ['fznl', 'ylnl']
            }, {
                id: 'gaugesRight',
                field: 'scode',
                gaugeSname: 'zbmc',
                gaugeField: 'qyfz',
                content: ['zwfx', 'yyzl']
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
                radarSname: 'zbmc',
                radarValue: 'qyfz',
                content: ['zwfx', 'yyzl', 'fznl', 'ylnl']
            };
            me.transRadarData(datas, radarConfig);
        },
        profitabilityData(datas) {
            let me = this;
            let arr = [{
                id: 'gaugeTop',
                // indicatorId: "profitability",
                colSpanConfig: {
                    '19': 6,
                    '20': 12,
                    '21': 6
                },
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
                content: ['19', '20', '21']
            }, {
                id: 'gaugeMiddleLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
                content: ['121', '133']
            }, {
                id: 'gaugeMiddleRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
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
                gaugeField: 'v',
                content: ['51']
            }, {
                id: 'gaugeTopRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
                content: ['128']
            }, {
                id: 'gaugeMiddle',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
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
                customConfig: {
                    title: {},
                    radius: "65%"
                },
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
                gaugeField: 'v',
                content: ['52', '122', '124']
            }, {
                id: 'gaugeRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
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
                gaugeField: 'v',
                content: ['3']
            }, {
                id: 'gaugeTopRight',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'v',
                content: ['125']
            }, {
                id: 'gaugeMiddle',
                field: 'scode',
                colSpanConfig: {
                    '16': 6,
                    '17': 12,
                    '126': 6
                },
                gaugeSname: 'sname',
                gaugeField: 'v',
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
                customConfig: {
                    title: {
                        text: '',
                        left: 'center',
                        top: '1%'
                    },
                    radius: "65%"
                },
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
            let me = this;
            arr.forEach(item => {
                if (me[item.id] && me[item.id].length > 0) {
                    for (let i = 0; i < me[item.id].length; i++) {
                        let itemCnt = me[item.id][i];
                        if (item.colSpanConfig) {
                            itemCnt.colSpan = item.colSpanConfig[itemCnt[item.field]];
                        }
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
                title: {
                    // 	padding:[410,0,0,0],    //标题相对于容器边距
                    text: itemCnt[item.gaugeSname] || "",
                    link: false,
                    top: "10",
                    x: "center", //标题块相对于容器位置
                    // y:260,
                    textAlign: "left",
                    textStyle: {
                        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        // fontWeight: 'bold',
                        fontSize: 16,
                        color: "#8796B0",
                        align: "center"
                    }
                },
                tooltip: {
                    confine: true,
                    formatter: function(a, b, c) {
                        return a.seriesName + a.name + "：" + Math.decimalToLocalString(a.value) + "%";
                    }
                },
                series: [{
                    name: itemCnt[item.gaugeSname] || '业务指标',
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
                    center: ["50%", "60%"], //整体的位置设置
                    radius: "85%", //仪表盘大小
                    //设置指针样式
                    pointer: {
                        show: true,
                        length: "50%",
                        width: 5
                    },
                    detail: {
                        formatter: function(a, b, c) {
                            return Math.decimalToLocalString(a) + (itemCnt.unit ? itemCnt.unit : itemCnt.sunit || "%");
                        },
                    },
                    data: [{ value: itemCnt[item.gaugeField] || 0 }]
                }]
            };
            itemCnt.options = options;

            return options;
        },
        /**
         * 雷达图的数据转换。
         * @author szc 2019年6月5日14:14:05
         */
        transRadarData(datas, radarConfig) {
            let me = this,
                values = [],
                indicator = [];
            let indicatorCfg = me.getIndicator(datas, radarConfig);
            indicator = indicatorCfg.indicator;
            values = indicatorCfg.values;
            let receive = {
                title: {
                    text: '',
                    left: 'center',
                    top: '13%'
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
                    center: ['50%', '60%'],
                    radius: radarConfig.radius || '65%'
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
            radarConfig.customConfig ? receive.title = radarConfig.customConfig.title : "";
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
        },
        /**
         * 单指标下钻。
         */
        singleIndicatorDrill_old() {
            let me = this;
            let arr = [{
                id: 'gaugesLeft',
                field: 'scode',
                gaugeSname: 'sname',
                gaugeField: 'score',
                content: ['19', '20', '21']
            }];
            for (let i = 0; i < arr.length; i++) {
                me[arr[i].id] = [];
            }
            me.createGauges(arr);
        },
        singleIndicatorDrill(datas, judgeParams) {
            let me = this,
                storeParams = me.$store.getters,
                year = storeParams.year,
                month = storeParams.month;
            let obj = {},
                drillContent = {
                    gaugeConfig: {
                        options: {}
                    },
                    lineConfig: {
                        options: {}
                    },
                    allData: datas
                };
            if (datas && datas.length > 0) {
                for (let j = 0; j < datas.length; j++) {
                    let item = datas[j];
                    //月份的数据格式化。
                    for (let key in item) {
                        if (key.indexOf('m') != -1 && typeof(item[key]) == 'number') {
                            item[key] = Math.decimalToLocalString(item[key]);
                        }
                    }
                    if (year == item.cyear) {
                        item.wd = "本期";
                    } else if (item.cyear == (year - 1)) {
                        item.wd = "上年同期";
                    }
                }
                for (let i = 0; i < datas.length; i++) {
                    let item = datas[i];
                    if (year == item.cyear) {
                        obj = item;
                        break;
                    }
                }
                let gaugeConfig = {
                    gaugeSname: "sindicatorname",
                    gaugeField: 'm' + month
                };
                drillContent.gaugeConfig.options = me.createOptions(obj, gaugeConfig);
                drillContent.lineConfig.options = me.createLineChart(datas);
            }
            me.drillContent = drillContent;
            let params = {
                url: "detailedIndicator",
                row: judgeParams.row,
                outData: drillContent,
                field: "scode",
                tabSname: "sname"
            };
            this.$emit("drillHandler", params);
        },
        /**
         * 制造线性chart图。
         */
        createLineChart(datas) {
            let me = this;
            let arrItem = me.getValueOfDatas(datas);
            let option = {
                title: {
                    text: '趋势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['本期数', '上年同期']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [{
                        name: '本期数',
                        type: 'line',
                        data: arrItem.bq || [11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
                        // markPoint: {
                        //     data: [
                        //         { type: 'max', name: '最大值' },
                        //         { type: 'min', name: '最小值' }
                        //     ]
                        // },
                        // markLine: {
                        //     data: [
                        //         { type: 'average', name: '平均值' }
                        //     ]
                        // }
                    },
                    {
                        name: '上年同期',
                        type: 'line',
                        data: arrItem.sntq || [1, -2, 2, 5, 3, 2, 0, 11, 11, 15, 13, 12],
                        // markPoint: {
                        //     data: [
                        //         { type: 'max', name: '最大值' },
                        //         { type: 'min', name: '最小值' }
                        //     ]
                        // },
                        // markLine: {
                        //     data: [
                        //         { type: 'average', name: '平均值' }
                        //     ]
                        // }
                    }
                ]
            }
            return option;
        },
        /**
         * 获取数据的格式。
         */
        getValueOfDatas(datas) {
            let arr = {},
                arr1 = [],
                arr2 = [];
            let me = this,
                storeParams = me.$store.getters,
                year = storeParams.year;
            datas.forEach(item => {
                if (item.cyear == year) {
                    for (let i = 0; i < 12; i++) {
                        arr1.push(item['m' + (i + 1)]);
                    }
                    arr.bq = arr1;
                } else if (item.cyear == (year - 1)) {
                    for (let i = 0; i < 12; i++) {
                        arr2.push(item['m' + (i + 1)]);
                    }
                    arr.sntq = arr2;
                }
            });
            return arr;
        }
    }
}