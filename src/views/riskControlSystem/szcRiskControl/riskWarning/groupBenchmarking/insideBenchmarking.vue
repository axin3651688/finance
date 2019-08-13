<template>
    <div>
        <div v-if="rootRender">
            <el-tabs v-model="activeName" @tab-click="tabClick" @tab-remove="removeTab">
                <el-tab-pane label="内部对标" name="first">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <div>
                                    <treeTable border :data.sync="treeData" :columns.sync="columns" v-on:drillItemSname="drillItemSname"></treeTable>
                                </div>
                            </el-col>
                            <el-col :span="12" style="height:100%;">
                                <div class="transverseBar" style="height:100%;">
                                    <transverseBar :chartData.sync="chartData"></transverseBar>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <template v-if="editableTabs && editableTabs.length > 0">
                    <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="index"
                        :label="item.title"
                        :name="item.name"
                        closable
                        ref="tabChild"
                    >
                        <component :is="item.content" :pComponentData.sync="item.params" v-on:drillHandler="drillHandler" :ref="item.name"></component>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import treeTable from "@v/riskControlSystem/publicRiskControl/treeTable/treeTable.vue"
    import comprehensiveRating from "./comprehensiveRating"

    import profitability from "./profitability"
    import developmentAbility from "./developmentAbility"
    import operationQuality from "./operationQuality"
    import debtRisk from "./debtRisk"
    import detailedIndicator from "./detailedIndicators"

    // import router from "@v/layout/router"
    import transverseBar from "./../echarts/transverseBar.vue"
    import {
        groupQuery
    } from '~api/szcRiskControl/riskControl.js'
    import { mapGetters,mapActions } from "vuex";
    import { findThirdPartData } from "~api/interface"
    export default {
        name: "treeTableDemo",
        components: {
            treeTable,
            transverseBar,
            comprehensiveRating,
            profitability,
            developmentAbility,
            operationQuality,
            debtRisk,
            detailedIndicator
        },
        data() {
            return {
                treeData:[],
                columns:[],
                chartData:[],
                activeName:"first",
                editableTabs: [],
                rootRender:true
            }
        },
        /**
         * 计算属性。
         */
        computed: {
            ...mapGetters(["year", "month", "company","showDims"])
        },
        watch: {
            /**
             * 监听公司
             */
            company(newValue, oldValue) {
                this.updateTabOther();
                this.updateData();
            },
            year(newValue, oldValue) {
                this.updateTabOther();
                this.updateData();
            },
            month(newValue, oldValue) {
                this.updateTabOther(); 
                this.updateData();
            }
        },
        created() {
            let me = this;
            let showDims = this.showDims;
            if(showDims){
                this.ShowDims({
                    company:true,
                    year:true,
                    month:true,
                    day:false,
                    conversion:false
                });
                // showDims.company = true,
                // showDims.year = true,
                // showDims.month = true,
                // showDims.conversion = false;
            }
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
            let bodyHgt = document.body.offsetHeight,heightNum = bodyHgt - 115;
            $div[0].children[0].style.height = heightNum + "px";
            window.onresize = function temp(){
                bodyHgt = document.body.offsetHeight,heightNum = bodyHgt - 115;
                $div[0].children[0].style.height = heightNum + "px";
            }
        },
        methods: {
            ...mapActions(["ShowDims"]),
            /**
             * 清除後面的tab頁
             */
            updateTabOther () {
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
                        me.tableData = res.data.data;
                        me.chartData = me.deepCopy(res.data.data);
                        me.treeData = me.transformationTreeData(res.data.data);
                        // me.queryBackstageDataAfter(res.data.data, judgeParams);
                    } else if (res.data.code == 1001) {
                        me.tableData = [];
                        me.queryBackstageDataAfter([], judgeParams);
                    }
                });
            },
            deepCopy (obj) { //深拷贝
                let result = Array.isArray(obj) ? [] : {};
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if(obj[key] == null){
                            result[key] = null;
                        }else if (obj[key] == undefined) {
                            result[key] = undefined;
                        }else if (typeof obj[key] === 'object') {
                            result[key] = this.deepCopy(obj[key]); //递归复制
                        } else {
                            result[key] = obj[key];
                        }
                    }
                }
                return result;
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
                        indicator:"qypj",
                        fact:'B',
                        year:year,
                        month:monthStr,
                        sqlKey:"RiskWarning.nbdbs"
                    }
                };
                this.queryDataOfBackstage(judgeParams);
            },
            /**
             * tab页的切换。
             */
            tabClick (tab, event) {
                let me = this,url = me.$router.currentRoute.name,clickItemROW = me.clickItemROW;
                if(tab.name == "first"){
                    this.ShowDims({
                        company:true,
                        year:true,
                        month:true,
                        day:false,
                        conversion:false
                    });
                    me.updateData();
                }else {
                    this.ShowDims({
                        company:false,
                        year:false,
                        month:false,
                        day:false,
                        conversion:false
                    });
                    me.$refs[tab.name][0].updateData(clickItemROW);
                }
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
            drillItemSname(scope){
                let me = this,editableTabs = me.editableTabs;
                //不能重复下钻一样的。
                if(me.editableTabs && me.editableTabs.length > 0){
                    let editableTabs = me.editableTabs;
                    for(let i =0; i< editableTabs.length;i ++){
                        let item = editableTabs[i];
                        if(item.name == scope.row.scode){
                            me.activeName = item.name;
                            return;
                        }
                    }
                }
                let obj = {
                    title: scope.row.sname,
                    name: scope.row.scode,
                    content: 'comprehensiveRating',
                    params:scope.row
                };
                me.clickItemROW = scope.row;
                me.activeName = scope.row.scode;
                editableTabs.push(obj);
                me.editableTabs = editableTabs;
                if(me.showDims){
                    me.ShowDims({
                        company:false,
                        year:false,
                        month:false,
                        day:false,
                        conversion:false
                    });
                }
            },
            drillItemSname_old (scope) {
                let me = this;
                // me.$router.push("/comprehensiveRating");
                me.$router.push({
                    name: 'comprehensiveRating',
                    // replace:true,
                    params: {
                        scope: scope.row
                    }
                });
            },
            /**
             * 钻取
             */
            drillHandler (params) {
                let me = this,editableTabs = me.editableTabs;
                //不能重复下钻一样的。
                if(me.editableTabs && me.editableTabs.length > 0){
                    let editableTabs = me.editableTabs;
                    for(let i =0; i< editableTabs.length;i ++){
                        let item = editableTabs[i];
                        if(item.name == params.row[params.field]){
                            me.activeName = item.name;
                            return;
                        }
                    }
                }
                let obj = {
                    title: params.row[params.tabSname],
                    name: params.row[params.field],
                    content: params.url,
                    params:params.outData
                };
                me.activeName = params.row[params.field];
                editableTabs.push(obj);
                me.editableTabs = editableTabs;
            },
            removeTab(targetName) {
                // this.removeOperation = "remove";
                let tabs = this.editableTabs;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                if(this.editableTabs && this.editableTabs.length == 0){
                    activeName = "first";
                    this.ShowDims({
                        company:true,
                        year:true,
                        month:true,
                        day:false,
                        conversion:false
                    });
                    // this.showDims.company = true;
                    // this.showDims.year = true;
                    // this.showDims.month = true;
                }
                this.activeName = activeName;
                this.rootRender = false;
                this.$nextTick(() => {
                    this.rootRender = true;
                });
            },
            /**
             * 暂时没用。
             */
            beforeLeave (activeName, oldActiveName) {
                let me = this,clickItemROW = me.clickItemROW;
                if(me.$refs[activeName] && me.$refs[activeName].length > 0){
                    me.$refs[activeName][0].updateData(clickItemROW);
                }
                return true;
            }
        }
    };
</script>
<style>

</style>