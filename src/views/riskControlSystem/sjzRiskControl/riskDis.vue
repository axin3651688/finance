<template>
    <!--
        name: 风险识别
        time: sjz 2019/5/6 9:40:00
    -->
    <div id="riskDis">
        <!-- 
            响应式布局：
            1. xs <768px 响应式栅格数或者栅格属性对象
            2. sm ≥768px 响应式栅格数或者栅格属性对象
            3. md ≥992 响应式栅格数或者栅格属性对象
            4. lg ≥1200 响应式栅格数或者栅格属性对象
            注：全局最大为24 @click="importBtn"
        -->
        <el-row :gutter="10">
            <el-col :xs="12" :md="24" :lg="24">
                <div class="elbtn" style="float: left">
                    <!-- 按钮 -->
                    <el-button-group class="iconbtn">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" plain v-show="isbtnShow3" @click="addClick">添加</el-button>
                        <el-button type="primary" icon="el-icon-circle-close-outline" plain v-show="isbtnShow2" @click="deleteRow">删除</el-button>
                        <el-button type="primary" icon="el-icon-refresh" plain @click="refreshRow">刷新</el-button>
                        <el-button type="primary" plain v-show="isbtnShow" @click="bulkOrders"><i class="iconfont icon-batch-import"></i>批量下达</el-button>
                        <el-button type="primary" plain v-show="isbtnShow" @click="orderRecord">下达记录查询</el-button>
                        <el-button type="primary" plain v-show="isbtnShow4" @click="importBtn"><i class="iconfont icon-daoru"></i>导入</el-button>
                        <el-button type="primary" plain v-show="isbtnShow2" @click="exportBtn"><i class="iconfont icon-daochu"></i>导出</el-button>
                    </el-button-group>
                </div>
                <!-- 文字 -->
                <div class="elbtn" style="float: left;lineHeight: 40px;marginLeft: 10px">
                    <span>共</span><span style="color: #409EFF; margin: 0 5px 0px 5px;fontSize: 15px">{{ tableLength }}</span><span>条风险：</span>
                    <span style="color: #409EFF; fontSize: 14px;margin: 0 0 0 10px;textDecoration:underline" 
                    v-for="(element, index) in elementui" :key="element.id" v-html="element.html" @click="textClick(element)">
                    </span>
                </div>

                <div class="elbtn" style="float: right;marginRight: 10px;">  
                    <!-- 列控制显示按钮 -->
                    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="false">
                        <el-button type="primary" plain icon="el-icon-menu"></el-button>
                        <el-dropdown-menu slot="dropdown" style="height: 100%; overflow: auto">
                            <el-dropdown-item  v-for="(item,index) in items" :key="index"  :command="item.id" divided>
                                <el-checkbox v-model="!item.determine" @change="checkbox(item.id)" :disabled="item.disabled">{{ item.text }}</el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <!-- 批量下达弹出框 -->
        <bulk-ordersers ref="mychild" v-if="riskRelease" :newThis="me" :data="comtree2"></bulk-ordersers>
        <!-- 表格 -->
        <div class="table">
            <el-table
            class="table-call"
            id="publicTable"
            :data="tableData2.length > 0 ? tableData2: tableData"
            stripe
            highlight-current-row
            style="width: 100%;"
            :height="heights"
            :cell-style="cellStyle"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
            :cell-class-name="cellClassName"
            border>
                <el-table-column type="index" width="55" label="序号" align="center" ></el-table-column>
                <el-table-column type="selection" width="55" align="center" ></el-table-column>
                <el-table-column 
                v-for="element in elements"
                v-if="!element.determine"
                :type="element.type"
                :key="element.index" 
                :prop="element.id" 
                :label="element.text"
                :width="element.width"
                :show-overflow-tooltip="element.showOverflow"
                :align="element.align"                 
                >
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="135" align="center" >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.native.prevent="viewRow(scope.$index, tableData)">查看</el-button>
                        <el-button type="text" size="small" v-show="isbtnModify" @click.native.prevent="modifyRow(scope.$index, tableData)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="风险评估与识别" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" :width="widths" style="marginTop: -15vh;">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <!-- 
                参数名                  数据类型                作用
                riskTableRow:           Array                  风险矩阵的数据
                fsgl:                   Object                 发生概率参照图数据
                fsglTwo                 Object                 发生概率第二数据
                yxcd:                   Object                 影响程度参照图数据
                newThis：               Object                 this对象
                flag:                   Boolean                作为监听作用（区分查看按钮和添加按钮）
                modify:                 Boolean                作为监听作用（区分修改按钮）
                numOpen:                Number                 作为添加按钮的监听事件（每按一次添加按钮重置一次）
                
             -->
            <dia-log 
            :riskTableRow="riskTableRow" :fsgl="tableDemo1" :yxcd="tableDemo2" 
            :newThis="me" :flag="viewReadonly" :modify="modifyReadonly"
            :numOpen="numOpen">
            </dia-log>
        </el-dialog>
        <!-- 下达记录弹出框 -->
        <el-dialog title="下达记录" :visible.sync="dialogFormVisible2" :close-on-click-modal="false" width="960px" style="marginTop: -8vh;height:600px;overflow: hidden;">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <order-dialog :data="orderData" :newThis="me"></order-dialog>
        </el-dialog>
        <!-- 导入弹出框 -->
        <!-- <el-dialog title="风险识别导入" :visible.sync="dialogFormVisible3" :close-on-click-modal="false" width="960px" style="marginTop: -8vh;height:600px;overflow: hidden;">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <import-dialog :newThis="me"></import-dialog>
        </el-dialog> -->
        <div v-if="dialogFormVisible3">
            <import-dialog :newThis="me"></import-dialog>
        </div>
    </div>
</template>
<script>
// 引用导出的组件
import EventMixins from "./mixins/EventMixins";
// 引用批量下达弹出框
import bulkOrdersers from "@v/riskControlSystem/sjzRiskControl/bulkOrdersers";
// 引用弹出框组件
import diaLog from "@v/riskControlSystem/sjzRiskControl/dialog";
// 引用弹出框组件2(下达记录)
import orderDialog from "@v/riskControlSystem/sjzRiskControl/orderDialog";
// 引用导入弹出框组件
import importDialog from "@v/riskControlSystem/sjzRiskControl/importDialog" ;
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
// 引用接口1.（获取数据）
import { findThirdPartData, findDesignSource, riskdistinguish_risk_release } from "~api/interface";
// 引用接口2.（获取数据）
import { 
    // 风险发生概率-参照按钮
    riskprobability, 
    // 风险影响程度-参照按钮
    risk_influence_degree,
    // 删除按钮
    deleteRiskdistinguish,
    // 风险矩阵
    riskmatrix_tovo,
    // sql查询数据接口
    eva_city_Request,
    // 下达记录按钮
    riskdistinguish_query_release,
    // 全局参数控制
    globalparam_all,
    // 导入按钮
    risk_excel_excel_input
} from "~api/cube.js"
// 引用vuex
import { mapGetters, mapActions } from "vuex";
import { debounce } from '../../../utils';
export default {
    components: {
        diaLog,
        bulkOrdersers,
        orderDialog,
        importDialog
    },
    name: "riskDis",
    mixins: [ EventMixins ],
    data(){
        return {
            heights: 0,         // 表格的高度
            widths: "960px",    // 弹出框的宽度
            elementui: [],           // 文字
            tableLength: 0,          // 共多少条数据
            tableData: [],      // 表格的数据
            tableData_new: [],  // 表格的复制数据
            elements: [],       // 表格的列
            items: [],          // 控制列显示【作用于列选择按钮】
            dialogFormVisible: false,   // 默认弹出框不显示
            dialogFormVisible2:false,   // 下达记录弹出框不显示
            dialogFormVisible3:false,   // 导入弹出框不显示
            orderData: {},
            // 
            riskTableRow: [],    // 风险矩阵的数据信息
            tableDemo1: [],      //【参照按钮-发生概率】的json信息
            tableDemo2: [],      //【参照按钮-影响程度】的json信息 
            // 
            periodtype: 0,      // 全局控制选择的日期类型
            reporttype: 0,      // 全局控制风险类型显示与隐藏
            submitdeletetype:0, // 全局控制已提交的风险删除或不能删除
            // 
            objer: {},          // 对象存储
            isbtnShow: true,    // 批量下达按钮的显示与隐藏控制
            isbtnShow2: true,   // 其他（导出、删除）按钮的显示与隐藏
            isbtnShow3: true,   // 添加按钮的显示与隐藏
            isbtnShow4: true,   // 导入按钮的显示与隐藏
            isbtnModify: true,  // 修改按钮的显示与隐藏
            selection: [],      // 存储 Checkbox 选中的行信息 （注：用于删除时 和 下达时） 
            me: this,
            // 
            view_row: [],
            view_btn: 0 ,
            viewReadonly: false,
            // 
            numOpen: 0 ,        // 添加的监听事件
            riskRelease: false,     // 批量下达按钮的监听事件，打开弹出框用的
            comtree2: [],          // 批量下达按钮公司树数据
            modify_btn: 0 ,
            modifyReadonly: false,
            tableData2: [],
            htmlText: "",
        }
    },
    created(){
        // debugger
        // 全局控制选择的日期类型
        // this.periodtype = this.$store.getters.user.globalparam[0].periodtype ;
        // this.reporttype = this.$store.getters.user.globalparam[0].reporttype ;
        let $params = this.$store.state.prame.command;
        // this.uploadData.company = $params.company ;
        // this.uploadData.period = this.getPeriod($params) ;
        // 点进节点时默认计算的高度
        this.heights = document.documentElement.offsetHeight - 20 - 42 -64;
        // 弹出框===如果屏幕 <= 1200px 宽度自动变更为 540px；如果 >1200px 宽度为默认宽度 960px
        if(document.body.offsetWidth <= 1200 )this.widths = "540px" ;
    },
    mounted(){
        // this.globalparam_request() ;    // 全局参数设置请求
        this.showDimsControl(); // 日期的控制显示
        this.setClientHeight(); // 自适应高度
        this.axiosJson();       // 获取表格json的信息
        this.axiosRequest();    // 获取【风险矩阵】的json信息
        this.table1Request();   // 获取【参照按钮-发生概率】的json信息
        this.tab1e2Request();   // 获取【参照按钮-影响程度】的json信息
        // this.htmlContent();     // 获取表格信息生成文字
        
    },
    watch: {
        // 切换年触发
        year: function(newyear){
            this.selection = [] ;
            this.loadModuleBefore() ;
        },
        // 切换月触发
        month: function(newmonth){
            this.selection = [] ;
            this.loadModuleBefore() ;
        },
        /**
         * @event 切换公司触发
         * 功能：1. 切换公司时变更风险数据；
         *       2. 合并公司显示【批量下达按钮】/单体公司隐藏【批量下达按钮】 
         */
        company: function(newcompany){
            this.selection = [] ;
            // 查看公司的信息
            let nisleaf = this.$store.getters.treeInfo.nisleaf ;
            // 0合并公司/ 1单体公司
            if(nisleaf){
                this.isbtnShow = false ;
            }else{
                this.isbtnShow = true
            }
            this.loadModuleBefore() ;
        }   
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"]),
        ...mapGetters(["device", "user","showDims"])
    },
    methods: {
        // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
        cellClassName({row, column, rowIndex, columnIndex}){
            // debugger
            if(column.property == "gradename"){
                if(row.gradename == "中等风险"){
                    return "gradename_yellow" ;
                }else if(row.gradename == "重大风险"){
                    return "gradename_orange" ;
                }else if(row.gradename == "巨大风险" || row.gradename == "高风险"){
                    return "gradename_red" ;
                }else if(row.gradename == "可接受风险" || row.gradename == "最低风险"){
                    return "gradename_green" ;
                }else {
                    return "gradename_blue" ;
                }               
            }   
        },
        // 日期的显示控制
        showDimsControl(){
            let me = this,showDims = this.showDims;
            showDims.year = true;
            showDims.month = true;
            showDims.company = true;
        },
        // 自适应高度
        setClientHeight(){
            this.heights = document.documentElement.offsetHeight - 20 - 42 -64;
            const me = this ;
            window.onresize = function temp(){ 
                me.heights = document.body.offsetHeight - 20 - 42 -64 ;
                if(document.body.offsetWidth <= 1200 ){
                    me.widths = "540px"; 
                }else{
                    me.widths = "960px"; 
                }
            }
        },
        // 1. 获取json的信息
        axiosJson(){
            // debugger
            let me = this;
            me.axios.get("/cnbi/json/risk/riskDis.json").then(res => { 
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                me.elements = obj.columns;
                me.items = me.elements.filter(res => { return res.type =='string' });
                me.objer = obj ;
                me.loadModuleBefore() ;
            })
        },
        // 1.1 请求模块之前
        loadModuleBefore(){
            // debugger
            let me = this ;
            let obj = me.objer ;
            let $params = me.$store.state.prame.command;
            // 参数
            let params = {
                year: $params.year ,
                month: mini.getPeriod($params),
                company: $params.company,
                period: $params.year + mini.getPeriod($params),
                comparePeriod: $params.year -1 + mini.getPeriod($params),
            } ;
            this.globalparam_request(obj, params) ;    // 全局参数设置请求
            // // json里的queryDataBefore的方法
            // if(obj.queryDataBefore && typeof obj.queryDataBefore == "function"){
            //     params = obj.queryDataBefore(params, obj, me) ;
            // }
            // // 有：请求数据方法/ 没有：直接赋空值或者假数据（手写的）
            // if(params.sql){
            //     me.setData(params) ;
            // }else{
            //     me.tableData = obj.rows ;
            // }
        },
        // 风险类型全局查询
        globalparam_request(obj, params){
            let me = this ;
            globalparam_all().then(res => {  //debugger
                if(res.data.code === 200) {
                    me.reporttype = res.data.data[0].reporttype ;       // 报告类型控制
                    me.periodtype = res.data.data[0].periodtype ;       // 日期控制
                    me.submitdeletetype = res.data.data[0].submitdeletetype ;   // 已提交的删除控制
                    if(me.reporttype) { // true 不启用
                        // sreporttypename
                        me.objer.columns.forEach(res => { 
                            if(res.id === "sreporttypename" ) {
                                res.determine = true ;
                                res.disabled = true ;
                            }
                        })
                        me.objer.columns = me.objer.columns.filter(res => {
                            return !res.determine ;
                        });
                        me.elements = me.objer.columns;
                    } else {    // false 启用
                        me.objer.columns.forEach(res => { res.determine = false ; }) ;
                        me.elements = me.objer.columns;
                    }
                    // json里的queryDataBefore的方法
                    if(obj.queryDataBefore && typeof obj.queryDataBefore == "function"){
                        params = obj.queryDataBefore(params, obj, me) ;
                    }
                    // 有：请求数据方法/ 没有：直接赋空值或者假数据（手写的）
                    if(params.sql){
                        me.setData(params) ;
                    }else{
                        me.tableData = obj.rows ;
                    }
                    // me.reportType_quest(vax,index, tableData) ;
                }else{
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        // 1.2 获取请求的数据
        setData(params){ 
            let me = this ;
            findThirdPartData(params).then(res => { 
                // debugger
                if(res.data.code === 200){
                    // me.tableData = res.data.data ;
                    // 数据获取之后的处理
                    me.queryDataAfter(res.data.data) ;
                }else{
                    me.$message.error('请求数据错误！');
                }
            }) ;
        },
        // 1.3 数据获取之后的处理
        queryDataAfter(datas){
            // debugger
            let me = this ;
            let obj = me.objer ;
            let $params = me.$store.state.prame.command;
            let information = me.$store.getters.user.user ;
            // 查看公司的信息
            let nisleaf = this.$store.getters.treeInfo.nisleaf ;
            if(obj.queryDataAfter && typeof obj.queryDataAfter == "function"){
                me.tableData = obj.queryDataAfter(datas, me);
                me.tableData_new = me.tableData ;
            }
            me.tableLength = me.tableData.length ;
            // 必须要有数据
            if(me.tableData.length > 0){
                me.elementui = [] ;
                let one = me.tableData.filter(first => { return first.gradename=="可接受风险" }) ;
                let two = me.tableData.filter(second => { return second.gradename=="一般风险" }) ;
                let three = me.tableData.filter(third => { return third.gradename=="中等风险" }) ;
                let four = me.tableData.filter(fourth => { return fourth.gradename=="重大风险" }) ;
                let five = me.tableData.filter(fifth => { return fifth.gradename == "巨大风险" }) ;
                let six = me.tableData.filter(sixth => { return sixth.gradename == "最低风险" }) ;
                let seven = me.tableData.filter(seventh => { return seventh.gradename == "高风险" }) ;
                if(one.length > 0)me.elementui.push({ text: "可接受风险", html: "<a>可接受风险"+one.length+"条</a>" }) ;
                if(two.length > 0)me.elementui.push({ text: "一般风险", html: "<a>一般风险"+two.length+"条</a>" }) ;
                if(three.length > 0)me.elementui.push({ text: "中等风险", html: "<a>中等风险"+three.length+"条</a>" }) ;
                if(four.length > 0)me.elementui.push({ text: "重大风险", html: "<a>重大风险"+four.length+"条</a>" }) ;
                if(five.length > 0)me.elementui.push({ text: "巨大风险", html: "<a>巨大风险"+five.length+"条</a>" }) ;
                if(six.length > 0)me.elementui.push({ text: "最低风险", html: "<a>最低风险"+six.length+"条</a>" }) ;
                if(seven.length > 0)me.elementui.push({ text: "高风险", html: "<a>高风险"+seven.length+"条</a>" }) ;
            }else{
                me.elementui = [] ;
            }
            // 本属公司才能操作按钮，切换到非本属公司只能刷新和查看。单体公司不显示下达(2个)按钮，
            if($params.company === information.companyId){
                if(nisleaf){
                    me.isbtnShow = false ;      me.isbtnShow3 = true ;
                    me.isbtnShow2= true ;       me.isbtnShow4 = true ;
                    me.isbtnModify = true ;
                }else{
                    me.isbtnShow = true ;       me.isbtnShow3 = true ;
                    me.isbtnShow2= true ;       me.isbtnShow4 = true ;
                    me.isbtnModify = true ;
                }
                // 上报状态下当前月的识别无添加、导入、修改按钮
                if(me.tableData.length > 0){
                    // debugger
                    let submit = me.tableData.filter(dd => { return dd.sissubmit == "已提交" }) ;    // 过滤出来提交的风险
                    let isTrue = submit.some(ee => { return ee.sisreport == 1 }) ;                  // 一真即真 1为上报状态
                    // 为上报状态
                    if(isTrue){
                        me.isbtnModify = false ;    // 修改按钮隐藏
                        me.isbtnShow3 = false ;     // 添加按钮隐藏
                        me.isbtnShow4 = false ;     // 导入按钮隐藏
                        me.$message({ message: "温馨提示：风险已上报！", type: "warning" }) ;
                    }else{
                        me.isbtnModify = true ;     // 修改按钮显示
                        me.isbtnShow3 = true ;      // 添加按钮显示
                        me.isbtnShow4 = true ;      // 导入按钮显示
                    }
                }
            }else{
                me.isbtnShow = false ;          me.isbtnShow3 = false ;
                me.isbtnShow2= false ;          me.isbtnShow4 = false ;
                me.isbtnModify = false ;
            }
            
        },
        // 点击文字触发检索功能（☆）
        textClick(element){
            // debugger
            let len = element.html.length , risk = element.text ;
            this.tableData2 = [] ;
            // if(len == 12)risk = element.html.slice(3,6) ;
            // if(len == 13)risk = element.html.slice(3,7) ;
            // if(len == 14)risk = element.html.slice(3,8) ;
            // this.tableData2 = this.tableData.filter(res => {
            //     if(res.gradename == risk)return res ;
            // }) ;
            this.tableData = this.tableData_new.filter(res => {
                if(res.gradename == risk)return res ;
            }) ;
        },
        // 2.获取【风险矩阵】的json信息
        axiosRequest(){ 
            let me = this ;
            // me.axios.get("cnbi/json/risk/riskmatrix.json").then(res => {
            //     debugger
            //     me.riskTableRow = res.data.rows;
            // });
            riskmatrix_tovo().then(res => { 
                if(res.data.code === 200){
                    me.riskTableRow = res.data.data;
                }else{
                    me.$message.error('风险矩阵请求失败，请联系开发人员！') ;
                }
            });
        },
        // 3.  获取【参照按钮-发生概率】的json信息
        table1Request(){
            let me = this ;
            me.axios.get("/cnbi/json/risk/tableDemo1.json").then(res => {
                // debugger
                let data = res.data ;
                data = eval("(" + data + ")");
                me.riskprobabilityRequest(data, me) ;
            });
        },
        /**
         * 通过某个属性排序。
         */
        sortByProp(data,prop){
            let me = this;
            data.sort((a,b) => {
                if(a[prop] > b[prop]){
                    return -1;
                }else if(a[prop] < b[prop]) {
                    return 1;
                }else {
                    return 0;
                }
            });
        },
        // 3.1 获取数据请求【参照按钮-发生概率】
        riskprobabilityRequest(data, me){
            riskprobability().then(res => {
                this.sortByProp(res.data.data,"nscore");
                data.rows = res.data.data;
                me.tableDemo1 = data;
            })
        },  
        // 4.  获取【参照按钮-影响程度】的json信息
        tab1e2Request(){
            let me = this ;
            me.axios.get("/cnbi/json/risk/tableDemo2.json").then(res => {
                // debugger
                let data = res.data ;
                data = eval("(" + data + ")");
                me.risk_influence_degreeRequest(data, me) ;
            });
        },
        // 4.1 获取数据请求【参照按钮-影响程度】
        risk_influence_degreeRequest(data, me){
            risk_influence_degree().then(res => {
                // this.sortByProp(res.data.data,"nscore");
                data.rows = res.data.data ;
                if(data.rows && data.rows.length > 0){
                    data.rows.reverse();
                }
                me.tableDemo2 = data ;
            });
        },
        /**
         * @event 选择列
         */
        checkbox(command){ 
            let me = this ;
            me.elements.forEach(res => {
                if(res.id === command){
                    res.determine = !res.determine;
                }
            });
        },
        /**
         * @event 单元格的-style-的回调方法，也可以使用一个固定的-Object-为所有单元格设置一样的-Style。
         */
        cellStyle({row, column, rowIndex, columnIndex}){
            let me = this ;
            if(me.objer.cellStyle && typeof me.objer.cellStyle == "function"){
                return me.objer.cellStyle({row, column, rowIndex, columnIndex}, me) ;
            }
        },
        /**
         * @event 当用户手动勾选数据行的-Checkbox-时触发的事件/当用户手动勾选全选-Checkbox-时触发的事件
         */
        handleSelectionChange(selection, row){
            // debugger
            let me = this ;
            me.selection = [] ;
            me.selection = selection ;
        },
        /**
         * @event 删除按钮
         * @function 1.Checkbox选中时，如果row未提交则可以进行删除；如果row已提交则不能删除
         */
        deleteRow(){ //submitdeletetype
            // debugger
            let me = this ;
            let data = [] ;
            let submit = me.tableData.filter(dd => { return dd.sissubmit == "已提交" }) ;    // 过滤出来提交的风险
            let isTrue = submit.some(ee => { return ee.sisreport == 1 }) ;                  // 一真即真 1为上报状态
            
            let selection_no = me.selection.filter(res => { return res.sissubmit == "未提交" }) ;
            let selection_yes = me.selection.filter(res => { return res.sissubmit == "已提交" }) ;
            if(me.submitdeletetype == 0){
                selection_no.forEach(item => { data.push(item.id) ; }) ;
            }else{
                me.selection.forEach(item => { data.push(item.id) ; }) ;
            }
            // 不论在何种状态下。未提交的风险都可以进行删除
            if(selection_no.length > 0){
                data = [] ;
                selection_no.forEach(item => { data.push(item.id) ; }) ;
                me.$confirm('此操作将永久删除该风险, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除请求接口
                    me.deleteRiskdistinguish(data,selection_no) ;
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消删除' });          
                });
                return false ;
            }
            // submitdeletetype:0 => 已提交的风险不可以删除
            if(selection_no && selection_no.length > 0 && me.submitdeletetype == 0){
                me.$confirm('此操作将永久删除该风险, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除请求接口
                    me.deleteRiskdistinguish(data,selection_no) ;
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消删除' });          
                });
            // submitdeletetype:1 => 已提交的风险可以删除
            }else if(me.selection && me.selection.length > 0 && me.submitdeletetype == 1){
                // 对于已上报的风险是不能删除的
                if(isTrue) {
                    me.$message({ message: "已上报的风险无法删除！", type: "warning" }) ;
                    return false ;
                }
                me.$confirm('此操作将永久删除该风险, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除请求接口
                    me.deleteRiskdistinguish(data) ;
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消删除' });          
                });
            }
            else
            {
                if(selection_yes && selection_yes.length > 0 && me.submitdeletetype == 0){
                    me.$message({message: '温馨提示：已提交的风险不可以删除哦!',type: 'warning'}) ;
                }else{
                    if(me.tableData && me.tableData.length > 0){
                        me.$message({message: '温馨提示：没有选择风险哦!无法删除!',type: 'warning'}) ;
                    }else{
                        me.$message({ message: '暂无风险数据，无法删除!', type: 'info' }) ;
                    }
                }
            }
        },
        // 【删除按钮】删除请求接口
        deleteRiskdistinguish(data,selection_no){
            let me = this ;
            deleteRiskdistinguish(data).then(res => { 
                if(res.data.code === 200){
                    data.forEach(ris => {
                        me.tableData = me.tableData.filter(rds => {
                            return ris != rds.id ;
                        });
                    })
                    if(me.submitdeletetype == 0)selection_no = [] ;
                    me.selection = me.selection.filter((item, index) => { return item.id != data[index] ; }) ;
                    me.axiosJson() ;
                    me.$message({ type: 'success', message: '删除成功!' });
                }else{
                    me.$message.error('删除失败!');
                }
            }) 
        },
        /**
         * @event 刷新按钮
         * @function 重新走一次请求
         */
        refreshRow(){
            this.selection = [] ;
            this.tableData2= [] ;
            this.loadModuleBefore() ;
        },
        // 添加 + 修改的  ......
        reportType_quest(vax,index, tableData){
            // debugger
            let me = this ;
            let $params = me.$store.state.prame.command;
            let _sql = me.objer.config.sql2 ;
            _sql = _sql.replace(/:company/g, "'"+ $params.company +"'").replace(/:period/g, "'"+ $params.year + mini.getPeriod($params) +"'");
            let params = {
                cubeId: 4 ,
                sql: encodeURI(_sql)
            }
            eva_city_Request(params).then(res => {
                // debugger
                if(res.data.code === 200){
                    let isTrue = res.data.data.some(ree => { return ree.sisreport == 1 }) ; // 已上报
                    if(isTrue){
                        me.dialogFormVisible = false ;
                        me.isbtnModify = false ;    // 修改按钮隐藏
                        me.isbtnShow3 = false ;     // 添加按钮隐藏
                        me.isbtnShow4 = false ;     // 导入按钮隐藏
                        me.$message("风险已上报，无法添加和修改！")
                    }else{
                        if(vax === "add"){
                            me.view_row = [] ;
                            me.view_btn = 0 ;
                            me.modify_btn = 0 ;
                            if(me.numOpen===0){
                                me.numOpen = 1 ;
                            }else{
                                me.numOpen = 0 ;
                            }
                            me.viewReadonly = !me.viewReadonly;
                            me.dialogFormVisible = true ;
                        }else if(vax === "modify"){
                            me.modify_btn = 1 ;
                            me.view_btn = 0 ;
                            me.view_row = [] ;
                            me.view_row = tableData[index] ;
                            me.dialogFormVisible = true ;
                        }
                    }
                }
            })
        },
        /**
         * @event 添加按钮
         */
        addClick(){
            // debugger
            // this.globalparam_request("add") ;
            this.reportType_quest("add") ;
            
            // this.view_row = [] ;
            // this.view_btn = 0 ;
            // this.modify_btn = 0 ;
            // if(this.numOpen===0){
            //     this.numOpen = 1 ;
            // }else{
            //     this.numOpen = 0 ;
            // }
            // this.viewReadonly = !this.viewReadonly;
            // this.dialogFormVisible = true ;
        },
        /**
         * @event 查看按钮
         */
        viewRow(index, tableData){
            // debugger
            let me = this ;
            me.view_btn = 1 ;
            me.view_row = [] ;
            me.modify_btn = 0 ;
            me.view_row = tableData[index] ;
            me.viewReadonly = true ;
            me.dialogFormVisible = true ;
        },
        /**
         * @event 修改按钮
         */
        modifyRow(index, tableData){
            // debugger
            // this.globalparam_request("modify", index, tableData) ;
            this.reportType_quest("modify",index, tableData) ;
            // let me = this ;
            // me.modify_btn = 1 ;
            // me.view_btn = 0 ;
            // me.view_row = [] ;
            // me.view_row = tableData[index] ;
            // me.dialogFormVisible = true ;
        },
        /**
         * @event 关闭前的回调，会暂停-Dialog-的关闭
         */
        handleClose(done){
            // debugger
            let me = this ;
            me.view_row = [] ;
            me.view_btn = 0 ;
            me.modify_btn = 0 ;
            done() ;
        },
        /**
         * @event 批量下达按钮
         */
        bulkOrders(){
            // debugger
            let me = this ;
            let dataArray_y = [], dataArray_n = [] ;
            let data = me.selection ;
            if(data.length===0){
                me.$message({ message: "暂无要下达的风险，请选择风险！", type: "warning" });
            }else{
                // 看勾选的已提交/未提交数量多少
                data.forEach(res => {
                    if(res.sissubmit === "未提交")dataArray_n.push(res) ;
                    if(res.sissubmit === "已提交")dataArray_y.push(res) ;
                });
                let isClose = data.some(res => { return res.isclosename === "已关闭" }) ;
                // 如果勾选了已关闭的风险，不允许下达，进行提示，并且停止继续运行
                if(isClose) {
                    me.$message({ message: "您勾选了已关闭的风险！无法下达！请重新勾选！", type: "warning" }) ;
                    return false ;
                }
                // 如果未提交的数量 > 0 说明勾选了未提交的风险，不允许下达，进行提示，并且停止继续运行
                if(dataArray_n.length > 0){
                    me.$message({ message: "您勾选了未提交的风险！无法下达！请重新勾选！", type: "warning" }) ;
                    return false ;
                }
                // 如果已提交的数量 > 0 说明勾选了已提交的风险，可以下达，批量下达或者单次下达都可以
                if(dataArray_y.length > 0){
                    mini.getCompanyTree(me) ;
                    me.riskRelease = !me.riskRelease ;
                }
            }
        },
        /**
         * @event 下达记录按钮
         */
        orderRecord(btn, currentPage, pageSize){ 
            this.dialogFormVisible2 = true ;
            let me = this ;
            let $params = me.$store.state.prame.command; 
            if(!currentPage)currentPage = 1 ;
            if(!pageSize)pageSize = 100 ;
            let params = {
                pageNum: currentPage,
                pageSize: pageSize,
                company: $params.company,
                period: $params.year + mini.getPeriod($params) 
            }
            riskdistinguish_query_release(params).then(www => {
                if(www.data.code === 200){
                    me.orderData = www.data.data ;
                } else if(www.data.code === 0) {
                    me.orderData = {} ;
                    me.$message({ message: www.data.msg, type: "warning"}) ;
                } else {
                    me.$message.error('查询失败！') ;
                }
            })
        },
        handleCommand(command){},
        /**
         * @description 导入按钮
         */
        importBtn() {
            this.dialogFormVisible3 = true ;
        },
        /**
         * @description 导出按钮
         */
        exportBtn(){
            // this.$message('暂无此功能！')
            let me = this ;
            me.downloadLoading = true ;
            me.$confirm('是否导出该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                import('./excel/SJZExport2ExcelTable').then(excel => { //debugger
                    //制造一个columns格式传过去。
                    let rootColmuns = [],columns = me.objer.columns;
                    let firstItem = columns[0];
                    columns = columns.filter((item,index) => {
                        return index != 0 ;
                    });
                    columns.push(firstItem) ;
                    // me.parseColmns(columns,rootColmuns);
                    excel.export_table_to_excel("publicTable",me.objer.text,rootColmuns);
                    me.$message({ type: 'success', message: '导出成功!' });
                })
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消' });          
            });
        }
    }
}
</script>
<style scoped>
.importBtn {
    border-radius: 0px;
}
.elbtn{
    /* background-color: #fff; */
    /* width: 100%; */
    margin-top: 10px;
    margin-bottom: 10px; 
}
.iconbtn .el-button {
    height: 42px;
    font-size: 13px;
}
.iconbtn .icon-batch-import, .icon-daoru, .icon-daochu {
    padding-right: 5px;
}
</style>
<style>
.el-table--border th, .el-table__fixed-right-patch{
    background-color: rgb(240, 248, 255);
}
/** 这是对表行的行高设置*/
.el-table__body tr, .el-table__body td {
    padding: 0;
    height: 32px;
}
.has-gutter tr th {
    background-color: rgb(240, 248, 255) !important;
    text-align: center !important;
    color: #606266 !important;   
}
/* 弹出框滚动条 */
/* .el-dialog__wrapper{
    overflow: hidden;
} */
.table-call .gradename_red .cell {
    color: #fff ;
    background-color: rgb(219, 43, 8);
    width: 90px;
    border-radius: 11px ;
    margin: 0 auto ;
}
.table-call .gradename_green .cell {
    color: #fff ;
    background-color: rgb(19, 215, 8);
    width: 90px;
    border-radius: 11px ;
    margin: 0 auto ;
}
.table-call .gradename_yellow .cell {
    color: #fff ;
    background-color: rgb(227, 212, 10);
    width: 90px;
    border-radius: 11px ;
    margin: 0 auto ;
}
.table-call .gradename_orange .cell {
    color: #fff ;
    background-color: rgb(227, 183, 10);
    width: 90px;
    border-radius: 11px ;
    margin: 0 auto ;
}
.table-call .gradename_blue .cell {
    color: #fff ;
    background-color: rgb(10, 149, 227);
    width: 90px;
    border-radius: 11px ;
    margin: 0 auto ;
}
</style>
