<template>
<!--
    name: sjz
    树表的公用组件
-->
    <div id="riskReport">
        <!-- 按钮 -->
        <!-- <el-button-group>
            <el-button 
            v-if="item.toolbar && item.toolbar.length>0"
            v-show="!isShow"
            v-for="(btn, index) in item.toolbar"
            :key="btn.id" 
            type="primary"
            style="margin: 10px 0px 10px 0"
            @click="btnClick(btn)"
            plain 
            :icon="btn.icon">
                {{ btn.text }}
            </el-button>
        </el-button-group> -->
        <!-- 树表组件 -->
        <tree-table 
        v-show="!isShow"
        :columns="columns" 
        :data="data" 
        :item="item"
        @showreportdetailp="showreportdetailp"
        @backreportdetailp="backreportdetailp"
        >
        </tree-table>
        <!-- 
            跳转报告页面 
            参数名                  数据类型                作用
            dataSource              Object                  点击的那一行的数据（包括其他的信息）
            newThis                 Object                  this对象
            numOpen                 Number                  监控（区分查看按钮还是上报按钮）
            data                    Object                  请求的数据（一切信息）
        -->
        <div v-show="isShow">
            <report-component 
            :dataSource="dataSource" :newThis="me" :numOpen="numOpen"
            :data="reportRow"></report-component>
        </div>
        <!-- dialog弹出框 -->
        <el-dialog title="催报" width="56%" top="40px" :visible.sync="dialogVisible2">               
            <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
            <rush-dialog :newThis="me" :data="comtree2" @rushRequest="rushRequest"></rush-dialog>
        </el-dialog> 
    </div>
    
</template>
<script>
// 引用Vue方法
import Vue from "vue";
// 引用树表
import treeTable from "@v/riskControlSystem/sjzRiskControl/treeTable";
// 引用接口（获取数据）
import { findThirdPartData, findDesignSource } from "~api/interface";
// 引用【催报】弹出框组件
import rushDialog from "@v/riskControlSystem/sjzRiskControl/report/rushDialog"
// 引用跳转的报告页面
import reportComponent from "@v/riskControlSystem/sjzRiskControl/report/reportComponent"
// 引用vuex
import { mapGetters, mapActions } from "vuex";
// 引用公用 js 方法
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
// 引用接口
import { 
    riskreportstate_query_riskreport,
    riskreportstate_update_remindback,
    // 全局参数控制
    globalparam_all,
} from "~api/cube.js";
// 引用 js 方法
import tools from "utils/tools";
import { param } from '../../../utils';
export default {
    name: 'treeTableDemo',
    components: {
        treeTable,
        reportComponent,
        rushDialog
    },
    props: ["jsonAdress","tableHeight"],
    data(){
        return {
            dialogVisible: false,
            dialogVisible2:false,
            me: this ,
            periodtype: 0,          // 全局控制选择的日期类型
            treeName: "",
            title: "",
            columns:[],             // 树表的列
            data:[],                // 树表的行
            item: {},               // json的请求信息
            biYear: "",             // 年
            biMonth: "",            // 月
            biCompany: "",          // 公司
            // 报告页面
            dataSource: {},         // 报告页面的信息
            isShow: false ,         // 报告页面的隐藏与显示
            numOpen: null ,         // 区分【查看】【上报】两个按钮的状态，监控用的
            reportRow: {} ,         // 请求的数据
            paramsArray: {},        // 存储请求信息用的（☆）
            //催报弹框
            comtree2: [], 
            comObj: {}

        }
    },
    created(){ 
        // debugger
        // 全局控制选择的日期类型
        // this.periodtype = this.$store.getters.user.globalparam[0].periodtype ;
        this.biYear = this.$store.getters.year;
        this.biMonth= this.$store.getters.month;
        this.biCompany = this.$store.getters.company;
        // 获取树表的json信息
        this.setTreeTableRequest();
    },
    mounted(){

    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"])
    },
    watch: {
        year(newyear) {
            this.isShow = false ;
            this.loadModuleBefore(newyear, this);
        },
        month(newmonth) {
            this.isShow = false ;
            this.loadModuleBefore(newmonth, this);
        },
        company(newcompany) {
            this.isShow = false ;
            this.loadModuleBefore(newcompany, this);
        }
    },
    methods: {
        /** 树表子组件 传过来 的值
         *  可点击的列 点击之后跳转到父组件的 backreportdetailp的方法
         * 【退回按钮】【催报按钮】
         */ 
        backreportdetailp(scope, val){
            // debugger
            let me = this ;
            let sisreport , params , _sql, toUsers=[] , companyId;
            let $params = me.$store.state.prame.command; 
            let sfilluser = me.$store.getters.user.user.userName;
            if(val === "2"){    // 退回
                sisreport = 2 ;
                params = mini.getBackreportdetailp(me, scope, sisreport, toUsers) ; // 请求参数
                me.backreportdetailp_request(params, me) ;
            }else{              // 催报
                me.comObj = {} ;
                me.comObj = {
                    sisreport : 0 ,
                    scope : scope
                }                
                companyId = scope.row.id ;
                me.dialogVisible2 = !me.dialogVisible2 ;
                _sql = me.config.sql2 ;
                _sql = _sql.replace(/:company/g,"'"+companyId+"'");
                let paramser = {
                    cubeId: 4,
                    sql: encodeURI(_sql)
                }
                mini.getSql_quertData_all( me, paramser );
            }          
            
        },
        /**
         * 【退回按钮】【催报按钮】请求方法
         */
        backreportdetailp_request(params, me){ //debugger
            riskreportstate_update_remindback(params).then(ddf => { //debugger
                if(ddf.data.code === 200){
                    if(params.sisreport==0)me.$message({ message: "催报成功！", type: "success" }) ;
                    if(params.sisreport==2)me.$message({ message: "退回成功！", type: "success" }) ;
                    me.setTreeTableRequest() ;
                    me.dialogVisible2 = false ;
                }else{
                    me.$message.error(ddf.data.msg) ;
                }
            });
        },
        /**
         * 【催报请求人员部门数据】
         */
        setSql_quertData_all(data){ 
            this.comtree2 = mini.reportDataTree(data, this) ;
        },
        /**
         * 【催报确认请求】子组件（rushdialog）的确认按钮
         */
        rushRequest(nodes){
            // debugger
            let toUsers = [] ;
            let sisreport = this.comObj.sisreport ;
            let scope = this.comObj.scope ;
            nodes.forEach(res => {
                toUsers.push(res.id) ;
            });
            let params = mini.getBackreportdetailp(this, scope, sisreport, toUsers) ; // 请求参数
            this.backreportdetailp_request(params, this) ;

        },
        /** 
         * 树表子组件 传过来 的值
         * 可点击的列 点击之后跳转到父组件的 showreportdetailp 方法
         * 组件引用： reportComponent.vue
         * 【上报按钮】【查看按钮】
         */ 
        showreportdetailp(params,scope){ 
            // debugger
                this.paramsArray = {} ;
                this.paramsArray = params ;
            
            let $params = this.$store.state.prame.command;
            let company = params.row.row.id ;
            let sparam = {
                company: company,
                period: $params.year + mini.getPeriod($params) ,
                sissubmit: "Y"
            }
            const me = this ;
            riskreportstate_query_riskreport(sparam).then(her => { 
                // 报告页面显示
                me.isShow = true ;
                // stype：状态；等于 1 即上报状态；等于 0 即查看状态 。
                if(params.stype === "1")me.numOpen = 1 ;
                if(params.stype === "0")me.numOpen = 0 ;
                me.dataSource = params ;
                if(her.data.code === 200){
                    me.reportRow = her.data.data ;
                }else{
                    me.$message.error('请求失败!');
                    
                }
            });
        },
        // 获取树表的json信息
        setTreeTableRequest(){ 
            const me = this ;
            // jsonAdress传入的json地址
            let $json = me.jsonAdress ;
            me.axios.get($json).then(res => {
                // debugger
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                // 把对象变成数组
                Object.keys(obj).forEach(key => { 
                    console.log(key,obj[key]);
                    me[key] = obj[key];
                });
                // 把数组变成对象
                me.items.forEach((item,index)=>{
                    me.item = item;
                });
                // debugger
                // 数据处理加载模块
                this.loadModuleBefore();
            });
        },
        // 数据处理加载模块
        loadModuleBefore(){
            // debugger
            let me = this ;
            let params = me.$store.state.prame.command;
            let datas = {
                sql: me.config.sql,
                year: params.year ,
                month: mini.getPeriod(params),
                company: params.company,
                period: params.year + mini.getPeriod(params),
                comparePeriod: params.year -1 + mini.getPeriod(params),
            };
            this.globalparam_request(me, datas) ;    // 全局参数设置请求
            // 看看json里有没有配置【queryDataBefore】数据获取之前拦截的方法
            // if(me.item.queryDataBefore && typeof me.item.queryDataBefore == "function"){
            //     datas = me.item.queryDataBefore(datas, me);
            // }
            // if(datas.sql){
            //     me.setData(me.item, datas);
            // }else if(me.rows.length){
            //     me.queryDataAfter(me.item,me.rows);
            // }else{
            //     return false ;
            // }

        },
        // 风险类型全局查询
        globalparam_request(me, datas){
            globalparam_all(datas).then(res => {
                me.periodtype = res.data.data[0].periodtype ;       // 日期控制
                // 看看json里有没有配置【queryDataBefore】数据获取之前拦截的方法
                if(me.item.queryDataBefore && typeof me.item.queryDataBefore == "function"){
                    datas = me.item.queryDataBefore(datas, me);
                }
                if(datas.sql){
                    me.setData(me.item, datas);
                }else if(me.rows.length){
                    me.queryDataAfter(me.item,me.rows);
                }else{
                    return false ;
                }
            })
        },
        // 取数总接口
        setData(item, params){ 
            let me = this ;
            findThirdPartData(params).then(res => {
                var data = res.data.data ;
                if(item.isTree){
                    //封装树对象数据
                    const setting = {
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
                            item.label = "(" + item.scode + ") " + item.company;
                            return item;
                        });
                        // me.comtree2 = data;
                        data = tools.transformToeTreeNodes(setting, data);
                        // return me.getCompanyTree_set(me.comtree2);
                        // return me.comtree2
                    }
                } 
                me.queryDataAfter(item, data);
            }).catch(res => {
                console.info(res);
            });
        },
        // 数据获取之后的拦截
        queryDataAfter(item, datas){
            // debugger
            let me = this ;
            // 看看json里有没有配置【queryDataAfter】数据获取之后拦截的方法
            if(me.item.queryDataAfter && typeof me.item.queryDataAfter == "function"){
                me.data = me.item.queryDataAfter(datas, me);
            }
        },
        // 按钮功能: 由于按钮的功能都不一样，所以写在json里的每个按钮方法里，自由发挥。
        btnClick(btn){
            if(btn.handler && typeof btn.handler == "function"){
                return btn.handler(this.data, btn, this);
            }
        }
    }
}
</script>
<style >
/* 表格背景统一 */
#riskReport .el-table{
    background: #F0F2F5 ;
}
</style>
