<template>
    <div>
        <div>
            <el-row class="div_form">
                <el-col :span="10">
                    <div>
                        <label for="">公司选择：</label>
                        <el-select v-model="valueSname" placeholder="请选择" class="select_all" ref="company_select">
                            <el-option
                                class="tree_select_option"
                                :value="'1111'"
                                :label="''"
                            >
                                <el-tree 
                                    :data="comtree2" 
                                    :props="defaultProps"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick"
                                >
                                </el-tree>
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <div>
                        <label for="">公司选择：</label>
                        <el-select v-model="value" placeholder="请选择" class="select_all">
                            <el-option
                            v-for="item in companyOptions"
                            :key="item.value"
                            :label="item.sname"
                            :value="item.scode">
                            </el-option>
                        </el-select>
                    </div> -->
                    <!-- <div class="tree_spcompany">
                        <label for="" class="tree_company_label">公司选择：</label>
                        <div class="tree_company">
                            <treeselect
                                v-model="value"
                                :options="comtree2"
                                placeholder="请选择所属公司"
                                class="tree_select"
                            />
                        </div>
                    </div> -->
                </el-col>
                <el-col :span="14">
                    <div>
                        <label for="">上市公司：</label>
                        <el-select v-model="listedCompany" placeholder="请选择" class="select_all" multiple>
                            <el-option
                            v-for="item in companyipoOptions"
                            :key="item.value"
                            :label="item.sname"
                            :value="item.scode">
                            </el-option>
                        </el-select>
                        <el-button style="float:right;margin-right:20px;" @click="exportExcle">
                            导出
                        </el-button>
                    </div>
                </el-col>
                <!-- <el-col :span="2">
                    <div>
                        <el-button>
                            导出
                        </el-button>
                    </div>
                </el-col> -->
            </el-row>
            <el-row class="div_form">
                <el-col :span="10">
                    <div>
                        <label for="">指标名称：</label>
                        <el-select v-model="indicatorNames" placeholder="请选择" class="select_all" multiple>
                            <el-option
                            v-for="item in indicatorOptions"
                            :key="item.value"
                            :label="item.sname"
                            :value="item.scode">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div>
                        <label for="">期间选择：</label>
                        <el-select v-model="yearValue" placeholder="请选择" class="select_left">
                            <el-option
                            v-for="item in optionYears"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="monthValue" placeholder="请选择" class="select_right" multiple>
                            <el-option
                            v-for="item in optionMonths"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button @click="btnHandler" style="margin-left:2%;">
                            确定
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div v-if="manyColumns && manyColumns.length > 0">
                        <threeHeaderTable v-if="renderFlag" :tableData.sync="ManyTableData" :columns.sync="manyColumns" :allData.sync="resData"></threeHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Treeselect from "@riophae/vue-treeselect";
    // import the styles
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import tools from '@/utils/tools.js'
    import groupGauge from "./../echarts/groupGauge.vue"
    import {
        groupQuery
    } from "~api/szcRiskControl/riskControl"
    import { mapGetters, mapActions } from "vuex";
    // import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import threeHeaderTable from "./../riskTable/threeHeaderTable.vue"
    import listingBenchmarking from "./../minix/listingBenchmarking.js"
    import groupRadar from "./../echarts/groupRadar.vue"
    export default {
        mixins:[listingBenchmarking],
        name: "treeTableDemo",
        components: {
            groupGauge,
            // singleTable,
            groupRadar,
            threeHeaderTable,
            Treeselect
        },
        data() {
            return {
                //选中公司名称。
                valueSname:'',
                treeData: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                comtree2:[],
                options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }],
                companyOptions:[],
                companyipoOptions:[],
                indicatorOptions:[],
                listedCompany:[],
                indicatorNames:[],
                yearValue:"",
                monthValue:[],
                optionYears:[],
                optionMonths:[
                    {
                        value: '01',
                        label: '1月'
                    },
                    {
                        value: '02',
                        label: '2月'
                    },
                    {
                        value: '03',
                        label: '3月'
                    },
                    {
                        value: '04',
                        label: '4月'
                    },
                    {
                        value: '05',
                        label: '5月'
                    },
                    {
                        value: '06',
                        label: '6月'
                    },
                    {
                        value: '07',
                        label: '7月'
                    },
                    {
                        value: '08',
                        label: '8月'
                    },
                    {
                        value: '09',
                        label: '9月'
                    },
                    {
                        value: '10',
                        label: '10月'
                    },
                    {
                        value: '11',
                        label: '11月'
                    },
                    {
                        value: '12',
                        label: '12月'
                    },
                    {
                        value: 'Q1',
                        label: '一季度'
                    },
                    {
                        value: 'Q2',
                        label: '二季度'
                    },
                    {
                        value: 'Q3',
                        label: '三季度'
                    },
                    {
                        value: 'Q4',
                        label: '四季度'
                    },
                    {
                        value: 'Y1',
                        label: '年度'
                    }
                ],
                value: '',
                tableData:[],
                columns:[],
                ManyTableData:[],//多表头数据
                manyColumns:[],//多表头列配置
                resData:{
                    fixedHeader:true
                },
                renderFlag:true//重新渲染的标识。
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
                let me = this;
                me.createYearMonth();
                //查询选择框的下拉选内容。
                me.selectAllOptions();
                //制造多表头数据格式。
                me.createMoreHeader();
            },
            year(newValue, oldValue) {
                let me = this;
                me.createYearMonth();
                //查询选择框的下拉选内容。
                me.selectAllOptions();
                //制造多表头数据格式。
                me.createMoreHeader();
            },
            month(newValue, oldValue) {
                let me = this;
                me.createYearMonth();
                //查询选择框的下拉选内容。
                me.selectAllOptions();
                //制造多表头数据格式。
                me.createMoreHeader();
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/listingBenchmarking.json";
            //隐藏公司、年、月。
            me.hideNavInfo();
            //生成需要的年月参数。
            me.createYearMonth();
            //查询选择框的下拉选内容。
            me.selectAllOptions();
            //制造多表头数据格式。
            me.createMoreHeader();
            // this.axios.get(url).then(res => {
            //     if(res.data.code == 200) {

            //         // debugger;
            //         // me.tableData = res.data.rows;
            //         // me.columns = res.data.columns;
            //         // me.manyColumns = res.data.manyColumns;
            //         // me.ManyTableData = res.data.manyRows;
            //         // me.resData = res.data;
            //         // me.updateData();
            //     }
            // });
            // let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            // this.axios.get(url).then(res => {
            //     if(res.data.code == 200) {
            //         me.tableData = res.data.rows;
            //         me.columns = res.data.columns
            //     }
            // });
        },
        mounted() {},
        methods: {
            ...mapActions(["ShowDims"]),
            exportExcle () {
                debugger;
                let me = this;
                import('@/excel/SZCExport2ExcelTable').then(excel => {
                    //制造一个columns格式传过去。
                    let rootColmuns = [],columns = me.manyColumns;
                    let firstItem = columns[0];
                    columns = columns.filter((item,index) => {
                        return index != 0;
                    });
                    columns.push(firstItem);
                    this.parseColmns(columns,rootColmuns);
                    excel.export_table_to_excel("publicTable","上市对标",rootColmuns);
                })
            },
            parseColmns (columns,rootColmuns) {
                let me = this;
                for(let i = 0;i < columns.length;i ++){
                    if(columns[i].children && columns[i].children.length > 0){
                        me.parseColmns(columns[i].children,rootColmuns);
                    }else {
                        if(!columns[i].hidden){
                            rootColmuns.push(columns[i]);
                        }
                    }
                }
            },
            /**
             * 公司树节点点击事件。
             */
            nodeClick (data,node,treeObj) {
                this.valueSname = data.sname;
                this.value = data.scode;
                this.$refs["company_select"].blur();
            },
            hideNavInfo () {
                let me = this;
                me.ShowDims({
                    company:false,
                    year:false,
                    month:false,
                    day:false,
                    conversion:false
                });
            },
            /**
             * 制造年月参数。
             */
            createYearMonth () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,month = storeParams.month;
                let yearCount = 5;
                let date = new Date(),yearNew = date.getFullYear(); 
                for(let i = 0;i < yearCount;i++){
                    let yearDemo = yearNew - 0 - i;
                    let obj = {
                        value: yearDemo + "",
                        label: yearDemo + ""
                    };
                    me.optionYears.push(obj);
                }
            },
            /**
             * 查询各个下拉选的内容。
             * @author szc 2019年6月18日09:47:06
             */
            selectAllOptions () {
                let me = this,storeParams = me.$store.getters,params = {
                    suser:storeParams.user.user.userName,
                    sqlKey:"Dim.findDimSsgs"
                };
                groupQuery(params).then(res => {
                    if (res.data.code == 200) {
                        me.renderSelectOptions(res.data.data);
                    }
                });
            },
            /**
             * 渲染各个指标下拉选。
             */
            renderSelectOptions (datas) {
                let me = this;
                // me.companyOptions = datas[0].company;
                me.treeCompanyFormat(datas[0].company);
                me.companyipoOptions = datas[0].companyipo;
                me.indicatorOptions = datas[0].indicator;
            },
            treeCompanyFormat(data){
                let me = this;
                let setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "scode",
                            pIdKey: "spcode"
                        },
                        key: {
                            name: "scode",
                            children: "children"
                        }
                    }
                };
                if (Array.isArray(data) && data.length > 0) {
                    data = tools.sortByKey(data, "scode");
                    data = data.filter(function(item) {
                        item.id = item.scode;
                        item.label = item.sname;
                        // item.sname = item.label;
                        return item;
                    });
                    me.comtree2 = data;
                    data[0].open = true;
                    // me.expandKeys.push(data[0].scode);
                    me.comtree2 = tools.transformToeTreeNodes(setting, data);
                    // me.value = me.comtree2[0].id ;
                }   
            },
            /**
             * 确定按钮事件。
             */
            btnHandler () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,month = storeParams.month,
                    company = storeParams.company,params = {
                    company:me.value || company,
                    periodSpace:me.getPeriodSpace(),
                    period:me.getPeriod(),
                    companyIPO:me.listedCompany.toString(),
                    indicator:me.indicatorNames.toString(),
                    fact:'B',
                    year:year,
                    month:month > 9? month + "":"0" + month,
                    stype:"sj",
                    sqlKey:"RiskWarning.ssdb"
                };
                me.renderFlag = false;
                me.$nextTick(()=>{
                    me.renderFlag = true;
                })
                me.createMoreHeader();
                groupQuery(params).then(res => {
                    if (res.data.code == 200) {
                        me.renderTableOfDatas(res.data.data);
                    }
                });
            },
            /**
             * 渲染查询table的数据。
             */
            renderTableOfDatas (datas) {
                debugger;
                let me = this;
                me.ManyTableData = datas;
            },
            /**
             * 渲染查询table的数据。不用转换了
             */
            renderTableOfDatas_old (datas) {
                let me = this,value = me.value,indicatorNames = me.indicatorNames,listedCompany = me.listedCompany;
                let companyItem,resArr = [];
                datas.forEach(item => {
                    for(let i = 0; i < indicatorNames.length;i ++){
                        let indicatorItem = indicatorNames[i];
                        if(item.comscode == value && indicatorItem == item.sindicator && !companyItem){
                            companyItem = item;
                        }else if (item.comscode == value && indicatorItem == item.sindicator) {
                            for(let key in item){
                                if(typeof(item[key]) == 'number'){
                                    companyItem[key] = item[key];
                                }
                            }
                            // companyItem[item.sindicator]
                        }
                    }
                    for(let j = 0;j < listedCompany.length;j ++){
                        let listItem = listedCompany[j];
                    }
                });
                resArr.push(companyItem);

            },
            /**
             * 得到下拉选的日期。
             */
            getPeriodSpace () {
                let me = this,yearValue = me.yearValue,monthValue = me.monthValue,periodSpace = "";
                let arr = [];
                for(let i = 0;i < monthValue.length;i ++){
                    let item = monthValue[i];
                    arr.push(yearValue + item);
                }
                periodSpace = arr.toString();
                return periodSpace;
            },
            /**
             * 获取日期。
             */
            getPeriod () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,
                    month = storeParams.month,period = "";
                if(month > 9){
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                return period;
            }
        }
    };
</script>
<style scoped>
    .select_all {
        width: 55%;
    }
    .select_company {
        width: 55%;
    }
    .select_left {
        width: 25%;
    }
    .select_right {
        width: 25%;
        margin-left: 5%;
    }
    .div_form {
        margin: 10px 0px;
    }
</style>
<style lang="scss" scoped>
    //公司树表的样式。
    .tree_select_option {
        height:100%;
        // max-height:300px;
        padding: 0;
    }
    // .tree_select {
    //     font-weight: normal !important;
    //     color: red;
    // }
    .tree_spcompany {
        display: flex;
    }
    .tree_company {
        display: inline-block;
        width: 55%;
    }
    .tree_company_label {
        align-self: center;
    }
    .tree_company {
        align-self: center;
    }

  .el-table thead.is-group th {
    background: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type {
    border-bottom: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-53deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
  .el-table thead.is-group tr:nth-child(2) th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-54deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
    // background:red;
  }
</style>
