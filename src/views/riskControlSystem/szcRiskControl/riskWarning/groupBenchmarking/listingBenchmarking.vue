<template>
    <div>
        <div>
            <el-row>
                <div ref="root_div" style="max-width:1300px;overflow-x:auto;">
                    <div>
                        <span class="public_span">集团公司选择：</span>
                        <el-tag type="info" effect="plain" class="tag_public">天津食品集团有限公司</el-tag>
                    </div>
                    <div class="public_div_class">
                        <span class="public_span">上市公司选择：</span>
                        <div style="display:inline-block;">
                            <el-checkbox-group v-model="listedCompanyList" size="small" style="display:inline-block;" @change="changeSelect('list')">
                                <el-checkbox-button v-for="item in companyipoOptions" 
                                :label="item.scode" 
                                class="check_box_span"
                                :key="item.scode">{{ item.sname }}</el-checkbox-button>
                            </el-checkbox-group>
                            <el-button @click="pointsEventHandler('list')" size="small" style="position: relative;top: 4px;">...</el-button>
                        </div>
                        <!-- <template v-for="item in companyipoOptions">
                            <el-tag 
                            :key="item.scode"
                            @click="listedCompanyHandler(item,'list')"
                            class="tag_public"
                            :ref="'select_'+ item.scode"
                            type="info" 
                            effect="plain">
                                {{ item.sname }}
                            </el-tag>
                        </template> -->
                    </div>
                    <div class="public_div_class">
                        <span class="public_span">财务指标选择：</span>
                        <div style="display:inline-block;">
                            <el-checkbox-group v-model="indicatorNamesLeft" size="small" style="display:inline-block;" @change="changeSelect('indicator')">
                                <el-checkbox-button v-for="item in indicatorOptions" 
                                :label="item.scode" 
                                class="check_box_span"
                                :key="item.scode">{{ item.sname }}</el-checkbox-button>
                            </el-checkbox-group>
                            <el-button @click="pointsEventHandler('indicator')" size="small" style="position: relative;top: 4px;">...</el-button>
                        </div>
                        <!-- <template v-for="item in indicatorOptions">
                            <el-tag 
                            :key="item.value"
                            type="info" 
                            @click="listedCompanyHandler(item,'target')"
                            class="tag_public"
                            :ref="'select_'+ item.scode"
                            effect="plain">
                                {{ item.sname }}
                            </el-tag>
                        </template> -->
                    </div>
                    <div class="public_div_class">
                        <span class="public_span">期间选择(年)：</span>
                        <template v-for="item in optionYears">
                            <el-tag 
                            :key="item.value"
                            type="info" 
                            @click="listedCompanyHandler(item,'year')"
                            class="tag_public"
                            :ref="'select_'+ item.value"
                            effect="plain">
                                {{ item.label }}
                            </el-tag>
                        </template>
                    </div>
                    <div class="public_div_class">
                        <span class="public_span">期间选择(月)：</span>
                        <div style="display:inline-block;">
                            <el-checkbox-group v-model="monthValue" size="small">
                                <el-checkbox-button v-for="item in optionMonths" 
                                :label="item.value"
                                class="check_month" 
                                :key="item.value">{{ item.label }}</el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                        <!-- <template v-for="item in optionMonths">
                            <el-tag 
                            :key="item.value"
                            type="info" 
                            @click="listedCompanyHandler(item,'month')"
                            class="tag_public"
                            :ref="'select_'+ item.value"
                            effect="plain">
                                {{ item.label }}
                            </el-tag>
                        </template> -->
                    </div>
                </div>
                <div>
                    <div>
                        <el-button @click="resetBtnHandler" style="margin:0 2%;float:right;">
                            重置
                        </el-button>
                        <el-button @click="btnHandler" style="margin-left:2%;float:right;">
                            确定
                        </el-button>
                    </div>
                </div>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div v-if="manyColumns && manyColumns.length > 0">
                        <threeHeaderTable v-if="renderFlag" :tableData.sync="ManyTableData" :columns.sync="manyColumns" :allData.sync="resData"></threeHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog :title="titleName" :visible.sync="dialogTableVisible">
                <el-table
                    v-if="tableFlag"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;height:100%;"
                    @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection">
                        </el-table-column>
                        <el-table-column
                            prop="sname"
                            label="名称">
                        </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitClick">确 定</el-button>
                </span>
            </el-dialog>
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
                titleName:"维度选择",
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
                    }
                ],
                value: '',
                tableData:[],
                columns:[],
                ManyTableData:[],//多表头数据
                manyColumns:[],//多表头列配置
                resData:{
                    fixedHeader:true,
                    tableHeight:0
                },
                renderFlag:true,//重新渲染的标识。
                selectClass:"",
                activeItem:"",
                dialogTableVisible:false,
                afterIndicators:[],
                afterCompanyipo:[],
                submitSign:"",
                multipleSelection:[],
                tableFlag:true,
                allIndicatorOptions:[],
                allCompanyipoOptions:[],
                indicatorNamesLeft:[],
                listedCompanyList:[]

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
            /**
             * 计算表格高度
             */
            let offsetHeight = document.body.offsetHeight,//页面整体高度
                selectHeight = 40 + 10 + 160,//select框高度 加上中间的margin-bottom的值
                tabHeight = 39,//tab标签高度
                gapHeight = 32,//间隙的高度
                pageHeaderHeight = 64;//导航栏高度
            this.resData.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
        },
        mounted() {
            const _this = this;
            window.onresize = function temp() {
                    let offsetHeight = document.body.offsetHeight,//页面整体高度
                        selectHeight = 40 + 10 + 170,//select框高度 加上中间的margin-bottom的值
                        tabHeight = 39,//tab标签高度
                        gapHeight = 32,//间隙的高度
                        pageHeaderHeight = 64;//导航栏高度
                    _this.resData.tableHeight = offsetHeight - pageHeaderHeight - selectHeight - tabHeight - gapHeight;
                };
        },
        methods: {
            ...mapActions(["ShowDims"]),
            /**
             * 窗口刷新重新布局。
             */
            selectLayout (width) {
                let me = this,listedCompany = me.listedCompany,indicatorOptions = me.indicatorOptions;

            },
            /**
             * 上市公司的选择。暂时废弃了  2019年8月20日11:31:55
             */
            listedCompanyHandler (item,sign) {
                let me = this,listedCompany = me.listedCompany,indicatorNames = me.indicatorNames,monthValue = me.monthValue;
                if(sign == 'month' || sign == 'year'){
                    item.scode = item.value;
                }
                let classNameSelect = me.$refs['select_' + item.scode][0].$el.className;
                if(classNameSelect.indexOf("select_class") != -1){
                    classNameSelect = classNameSelect.replace("select_class","");
                    if(sign && sign == 'list'){
                        listedCompany = listedCompany.filter(it => {
                            return it != item.scode;
                        });
                    }else if(sign && sign == 'target'){
                        indicatorNames = indicatorNames.filter(it => {
                            return it != item.scode;
                        });
                    }else if(sign == 'month'){
                        monthValue = monthValue.filter(it => {
                            return it != item.value;
                        });
                    }else if (sign == 'year'){

                        me.transYearClass(item);
                        classNameSelect += 'select_class';
                    }
                }else {
                    classNameSelect += " select_class";
                    if(sign && sign == 'list'){
                        listedCompany.push(item.scode);
                    }else if(sign && sign == 'target'){
                        indicatorNames.push(item.scode);
                    }else if(sign == 'month'){
                        monthValue.push(item.value);
                    }else if(sign == 'year'){
                        me.transYearClass(item);
                        me.yearValue = item.value;
                    }
                }
                me.$refs['select_' + item.scode][0].$el.className = classNameSelect;
                // me["selectClass" + item.scode + ""] = "select_class";
            },
            listedCompanyHandler_old (item,sign) {
                let me = this,listedCompany = me.listedCompany,indicatorNames = me.indicatorNames,monthValue = me.monthValue;
                if(sign == 'year'){
                    me.activeItem = 'select' + item.value;
                    me.yearValue = item.value;
                }else {
                    if(sign == 'month'){
                        item.scode = item.value;
                    }
                    let classNameSelect = me.$refs['select_' + item.scode][0].$el.className;
                    if(classNameSelect.indexOf("select_class") != -1){
                        classNameSelect = classNameSelect.replace("select_class","");
                        if(sign && sign == 'list'){
                            listedCompany = listedCompany.filter(it => {
                                return it != item.scode;
                            });
                        }else if(sign && sign == 'target'){
                            indicatorNames = indicatorNames.filter(it => {
                                return it != item.scode;
                            });
                        }else if(sign == 'month'){
                            monthValue = monthValue.filter(it => {
                                return it != item.value;
                            });
                        }
                    }else {
                        classNameSelect += " select_class";
                        if(sign && sign == 'list'){
                            listedCompany.push(item.scode);
                        }else if(sign && sign == 'target'){
                            indicatorNames.push(item.scode);
                        }else if(sign == 'month'){
                            monthValue.push(item.value);
                        }
                    }
                    me.$refs['select_' + item.scode][0].$el.className = classNameSelect;
                }
                // me["selectClass" + item.scode + ""] = "select_class";
            },
            /**
             * 装换年的class
             */
            transYearClass(item) {
                let me = this,optionYears = me.optionYears,pClassSelect = "";
                optionYears.forEach(it => {
                    if(item.value != it.value){
                        let classNameSelect = me.$refs['select_' + it.value][0].$el.className;
                        if(classNameSelect.indexOf('select_class') != -1){
                            classNameSelect = classNameSelect.replace('select_class','');
                            me.$refs['select_' + it.value][0].$el.className = classNameSelect;
                        }
                    }
                });
            },
            exportExcle () {
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
                me.transformDataOfSelect(datas);
                me.allCompanyipoOptions = datas[0].companyipo;
                me.allIndicatorOptions = datas[0].indicator;
            },
            /**
             * 转换选择框的数据。
             */
            transformDataOfSelect (datas) {
                let me = this,companyipos = datas[0].companyipo,indicator = datas[0].indicator;
                if(companyipos && companyipos.length > 6){
                    for(let i = 0;i < 6;i++){
                        let item = companyipos[i];
                        me.companyipoOptions.push(item);
                    }
                    me.afterCompanyipo = companyipos.slice(6);
                }else {
                    me.companyipoOptions = companyipos;
                    me.afterCompanyipo = [];
                }
                if(indicator && indicator.length > 6){
                    for(let i = 0;i < 6;i++){
                        let item = indicator[i];
                        me.indicatorOptions.push(item);
                    }
                    me.afterIndicators = indicator.slice(6);
                }else {
                    me.indicatorOptions = indicator;
                    me.afterIndicators = [];
                }
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
                        // me.selectTarget();
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
                // me.selectTarget();
            },
            selectTarget () {
                let me = this,listedCompany = me.listedCompany,indicatorNames = me.indicatorNames;
                if(listedCompany && listedCompany.length > 0){
                    listedCompany.forEach(item => {
                        let className = me.$refs['select_' + item][0].$el.className;
                        className += ' select_class';
                        me.$refs['select_' + item][0].$el.className = className;
                    });
                }
                if(indicatorNames && indicatorNames.length > 0){
                    indicatorNames.forEach(item => {
                        let className = me.$refs['select_' + item][0].$el.className;
                        className += ' select_class';
                        me.$refs['select_' + item][0].$el.className = className;
                    });
                }
                
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
<style lang="scss">
    .check_box_span {
        span{
            width: 180px;
        }
    }
    .check_month {
        span {
            width: 90px;
        }
    }
</style>
<style lang="scss" scoped>
    .public_div_class {
        margin: 10px 0px;
        width: 1300px;
    }
    .public_span {
        width: 120px;
        display: inline-block;
        text-align: right;
    }
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
    .tag_public {
        width: 180px;
        text-align: center;
    }
    /* 悬浮 */
    .tag_public:hover{
        cursor: pointer;
    }
    .select_class {
        background-color: #409eff;
        color: #fff;
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
