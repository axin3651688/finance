<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugesLeft" :key="index">
                        <groupGauge :chartData.sync="item"></groupGauge>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="height:500px;">
                        <groupRadar :chartData.sync="chartDataRadar"></groupRadar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div v-for="(item,index) in gaugesRight" :key="index">
                        <groupGauge :chartData.sync="item"></groupGauge>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <singleTable :tableData.sync="tableData" :columns.sync="columns"></singleTable>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <manyHeaderTable :tableData.sync="ManyTableData" :columns.sync="manyColumns"></manyHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    // import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import singleTable from "./../riskTable/riskTable.vue"
    import manyHeaderTable from "./../riskTable/manyHeaderTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    import { findThirdPartData } from "~api/interface"
    export default {
        name: "treeTableDemo",
        components: {
            groupGauge,
            groupRadar,
            singleTable,
            manyHeaderTable
        },
        data() {
            return {
                gaugesLeft:[{},{}],
                gaugesRight:[{},{}],
                tableData:[],
                columns:[],
                chartDataLeft:{},
                chartDataRight:{},
                chartDataRadar:{
                    receive:{}
                },
                ManyTableData:[],//多表头数据
                manyColumns:[]//多表头列配置
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/comprehensiveRating.json";
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    // me.tableData = res.data.rows;
                    me.columns = res.data.columns;
                    me.manyColumns = res.data.manyColumns;
                    me.ManyTableData = res.data.manyRows;
                    let judgeParams = {
                        sqlId:"106"
                    };
                    me.queryDataPublic(judgeParams);
                }
            });
        },
        mounted() {},
        methods: {
            /**
             * 查询数据的入口
             * @author szc 2019年6月4日16:55:40
             */
            queryDataPublic(judgeParams){
                let me =this,storeParams = me.$store.getters,company = storeParams.company,year = storeParams.year,
                    month = storeParams.month,period = "",monthStr = "";
                if(month > 9) {
                    period = year + "" + month;
                    monthStr = "" + month;
                }else {
                    period = year + "0" + month;
                    monthStr = "0" + month;
                }
                let params = {
                    company:company,
                    year:year,
                    month:monthStr,
                    period:period,
                    sql:""
                };
                me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                    if(res.data.code == 200){
                        let curSqlId = judgeParams? judgeParams.sqlId:"105";
                        me.sqlList = res.data.sqlList;
                        params = me.paramsOfSql(params,res.data.sqlList,curSqlId);
                        findThirdPartData(params).then(res => {
                            if(res.data.code == 200){
                                me.tableData = res.data.data;
                                me.transData(res.data.data);
                                //雷达图的数据转换。
                                me.transRadarData(res.data.data);
                                // me.treeData = me.transformationTreeData(res.data.data);
                            }
                        });
                    }
                });
            },
            /**
             * 请求参数上添加sql语句。
             * @author szc 2019年5月21日14:15:22
             */
            paramsOfSql (params,data,sqlId) {
                let me = this;
                if(data && data.length > 0) {
                    for(let i = 0;i < data.length;i ++) {
                        let item = data[i];
                        if(item.id == sqlId) {
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
            transData (datas) {
                let me = this,arrLeft = [],arrRight = [];
                for(let i = 0; i < datas.length;i++){
                    let item = datas[i];
                    if(item.zbid == "ylnl" || item.zbid == "fznl"){
                        arrLeft.push(item);
                    }else if (item.zbid == "zwfx" || item.zbid == "yyzl"){
                        arrRight.push(item);
                    }
                }
                me.gaugesLeft = arrLeft;
                me.gaugesRight = arrRight;
            },
            /**
             * 雷达图的数据转换。
             * @author szc 2019年6月5日14:14:05
             */
            transRadarData (data) {
                debugger;
                let me = this,values = [];
                let receive = {
                    title: {
                        text: '企业综合评价对标雷达图',
                        left:'30%',
                        top:'10px'
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
                        indicator: [
                            { name: '盈利能力', max: 10},
                            { name: '发展能力', max: 10},
                            { name: '运营质量', max: 10},
                            { name: '债务风险', max: 10}
                        ],
                        center: ['50%', '50%']
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : values,
                                name : ''
                            }
                        ]
                    }]
                }
                data.forEach(item => {
                    values.push(item.qyfz? item.qyfz:0);
                });
                me.chartDataRadar.receive = receive;
            }
        }
    };
</script>
<style>

</style>