<template>
    <div>
        <div>
            <el-row class="div_form">
                <el-col :span="10">
                    <div>
                        <label for="">公司选择：</label>
                        <el-select v-model="value" placeholder="请选择" class="select_all">
                            <el-option
                            v-for="item in companyOptions"
                            :key="item.value"
                            :label="item.sname"
                            :value="item.scode">
                            </el-option>
                        </el-select>
                    </div>
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
                    </div>
                </el-col>
                <!-- <el-col :span="5">
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
                <el-col :span="9">
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
                        <el-button @click="btnHandler">
                            确定
                        </el-button>
                    </div>
                </el-col> -->
                <!-- <el-col :span="12">
                    <el-row>
                        <el-col :span="24">
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
                    </el-row>
                    <el-row>
                        <el-col :span="24">
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
                                <el-button @click="btnHandler">
                                    确定
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
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
    import groupGauge from "./../echarts/groupGauge.vue"
    import {
        groupQuery
    } from "~api/szcRiskControl/riskControl"
    import { mapGetters } from "vuex";
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
            threeHeaderTable
        },
        data() {
            return {
                options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
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
                resData:{},
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
            /**
             * 制造年月参数。
             */
            createYearMonth () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,month = storeParams.month;
                let yearCount = 5;
                for(let i = 0;i < yearCount;i++){
                    let yearDemo = year - 0 - i;
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
                me.companyOptions = datas[0].company;
                me.companyipoOptions = datas[0].companyipo;
                me.indicatorOptions = datas[0].indicator;
            },
            /**
             * 确定按钮事件。
             */
            btnHandler () {
                let me = this,storeParams = me.$store.getters,year = storeParams.year,month = storeParams.month,
                    company = storeParams.company,params = {
                    company:company,
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
