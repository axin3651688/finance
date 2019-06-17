<template>
    <div>
        <div>
            <el-row>
                <el-col :span="14">
                    <div>
                        <treeTable border :data.sync="treeData" :columns.sync="columns" v-on:drillItemSname="drillItemSname"></treeTable>
                    </div>
                </el-col>
                <el-col :span="10" style="height:100%;">
                    <div class="transverseBar" style="height:100%;">
                        <transverseBar :chartData.sync="chartData"></transverseBar>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import treeTable from "@v/riskControlSystem/publicRiskControl/treeTable/treeTable.vue"
    // import router from "@v/layout/router"
    import transverseBar from "./../echarts/transverseBar.vue"
    import {
        groupQuery
    } from '~api/szcRiskControl/riskControl.js'
    import { findThirdPartData } from "~api/interface"
    export default {
        name: "treeTableDemo",
        components: {
            treeTable,
            transverseBar
        },
        data() {
            return {
                treeData:[],
                columns:[],
                chartData:[]
            }
        },
        created() {
            let me = this;
            me.axios.get('/cnbi/json/source/tjsp/szcJson/risk/insideBenchmarking.json').then(res => {
                if(res.data.code == 200){
                    me.columns = res.data.columns;
                    me.updateData();
                    // let judgeParams = {
                    //     sqlId:"105"
                    // };
                    // me.queryDataPublic(judgeParams);
                    // findThirdPartData().then(res => {
                    //     if(res.data.code == 200){

                    //     }
                    // });
                    me.treeData = res.data.rows;
                }
            });
        },
        mounted() {
            let $div = document.getElementsByClassName("transverseBar");
            let bodyHgt = document.body.offsetHeight,heightNum = bodyHgt - 80;
            $div[0].children[0].style.height = heightNum + "px";
            window.onresize = function temp(){
                bodyHgt = document.body.offsetHeight,heightNum = bodyHgt - 80;
                $div[0].children[0].style.height = heightNum + "px";
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
                        me.chartData = res.data.data;
                        me.treeData = me.transformationTreeData(res.data.data);
                        // me.queryBackstageDataAfter(res.data.data, judgeParams);
                    } else if (res.data.code == 1001) {
                        me.tableData = [];
                        me.queryBackstageDataAfter([], judgeParams);
                    }
                });
            },
            /**
             * 更新数据。
             */
            updateData(){
                let me =this,storeParams = me.$store.getters,company = storeParams.company,year = storeParams.year,
                    month = storeParams.month,period = "",monthStr = "";
                if(month > 9) {
                    period = year + "" + month;
                    monthStr = "" + month;
                }else {
                    period = year + "0" + month;
                    monthStr = "0" + month;
                }
                let judgeParams = {
                    id:"insideBenchmarking",
                    text:"内部对标",
                    params:{
                        company:company,
                        period:period,
                        indicator:"'19','20','53','120','21','121','133'",
                        fact:'B',
                        year:year,
                        month:monthStr,
                        sqlKey:"RiskWarning.nbdbs"
                    }
                };
                this.queryDataOfBackstage(judgeParams);
            },
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
                                me.chartData = res.data.data;
                                me.treeData = me.transformationTreeData(res.data.data);
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
                // if (rootItemData.sstate) {
                //     me.setOperations(rootItemData);
                // }
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
                        // if (item.sstate) {
                        //     me.setOperations(item);
                        // }
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
             * 公司的名称的下钻。
             * @author szc 2019年6月4日19:19:23
             */
            drillItemSname (scope) {
                let me = this;
                me.$router.push("/comprehensiveRating");
            }
        }
    };
</script>
<style>

</style>