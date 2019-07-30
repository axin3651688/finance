<template>
<!--
    name: sjz
    说明：风险报告内容页面
-->
    <div id="reportComponent" :style="styleHeight">
        <div class="reportComponent_div" :numOpen="flager">
            <el-container style="height: 100%">
                <el-header class="container_header">
                    <div class="container_alert" v-show="isAlertShow">
                        <span><i class="el-icon-warning"></i>查看页面，无法操作此页面！</span>
                    </div>
                    <div class="container_btn">
                        <el-button type="primary" plain @click="exportBtn">导出</el-button>
                        <el-button type="primary" plain @click="cancelBtn">返回</el-button>       
                    </div>                                
                </el-header>
                <el-container style="height: 100%">
                    <!-- 目录部分 -->
                    <el-aside class="container_aside">
                        <div class="aside_title"><p>目&nbsp&nbsp录</p></div>
                        <div v-if="directory.length > 0">
                            <el-menu :default-active="directory[0].scode" class="el-menu-vertical-demo">
                                <el-menu-item class="el-menu-vertical_title" v-for="(item, index) in directory" :key="item.scode" :index="item.scode">
                                    <a :href="item.id" slot="title">{{ item.text }}</a>
                                </el-menu-item>
                            </el-menu>
                        </div>
                        <div class="aside_title_message" v-else>暂无数据显示！</div>
                    </el-aside>
                    <!-- 正文部分标题 -->
                    <el-main class="container_main">
                        <div class="container_main_title">
                            <span>{{ textBody }}</span>
                        </div>
                        <!-- 正文部分总述 -->
                        <div class="container_main_overview">
                            <span>总述</span>
                        </div>
                        <!-- 判断目录没有数据则显示【暂无数据显示！】 -->
                        <div v-if="directory.length == 0" class="container_main_overview_error">
                            <span v-html="html2">暂无数据显示！</span>
                        </div>
                        <!-- 有数据则显示文字详细描述 -->
                        <div v-else class="container_main_overview_success">
                            <span v-html="html2">有数据！</span>
                        </div>
                        <!-- 正文部分的风险类型 -->
                        <div v-if="directory.length > 0">
                            <div v-for="(too, index) in directory" :key="too.id" >
                                <div :id="too.scode" class="container_main_risk_name">
                                    <span>{{ too.text }}</span>
                                </div>
                                <div  v-for="(tool, index) in dataReport" v-if="too.sname == tool.srootrisktypename">
                                    <div class="container_main_risk_dd">
                                        <span class="container_main_risk_text">{{ tool.srisktypename }}</span>
                                        <span class="container_main_risk_color_one" :style="getStyleColor(tool)">{{ tool.ngradename|TextFormat }}</span>
                                        <span class="container_main_risk_text textTitle">{{ textTitle }}</span>
                                        <span class="container_main_risk_color_two">识别人：{{ tool.ssubmituser }}</span>
                                    </div>
                                    <div class="container_main_risk_ff">
                                        <div class="container_main_risk_text textTitle2">风险名称</div>
                                        <div class="textTitle3">{{ tool.sriskname }}</div>
                                    </div>
                                    <div >
                                        <div class="container_main_risk_ff">
                                            <div class="container_main_risk_text textTitle2 textFloat">
                                                <span>风险评估</span>
                                                <el-button v-show="isShow" @click="modifyBtn(tool)" class="container_main_risk_btn textFloat" size="medium "><i class="iconfont icon-xiugai"></i>修改</el-button>
                                            </div>                                           
                                            <!-- <div class="textTitle3">{{ tool.scontrolmeasure|TextIndex }}</div> -->
                                            <!-- <div class="textTitle3">{{ tool.scontrolmeasure|TextIndex }}</div> -->
                                            <div class="textTitle3">{{ tool.text1 }}</div>
                                            <div class="textTitle3">{{ tool.text2 }}</div>
                                        </div>
                                        <div class="container_main_risk_ff">
                                            <div class="container_main_risk_text textTitle2">风险概述</div>
                                            <div class="textTitle3">{{ tool.sriskdescription|TextIndex }}</div>
                                        </div>
                                        <div class="container_main_risk_ff">
                                            <div class="container_main_risk_text textTitle2">采取措施</div>
                                            <div class="textTitle3">{{ tool.smeasures|TextIndex }}</div>
                                        </div>
                                        <div class="container_main_risk_ff">
                                            <div class="container_main_risk_text textTitle2">应对建议</div>
                                            <div class="textTitle3">{{ tool.sproposal|TextIndex }}</div>
                                        </div>                                       
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <!-- 上报按钮 -->
                        <div class="container_main_risk_btn2">
                            <el-button v-show="isShow" @click="onClick" type="primary" plain><i class="iconfont icon-tianjiashangbao"></i>上报</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
        <!-- 上报的弹出框组件 -->
        <report-dialog v-show="nisShow" :data="comtree2" :newThis="me"></report-dialog>
        <!-- 修改弹出框组件 -->
        <el-dialog title="风险评估与识别" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" width="960px" style="marginTop: -15vh;">
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <dia-log :data="view_row" :newThis="me" :number="number" :riskTableRow="riskTableRow" :fsgl="tableDemo1" :yxcd="tableDemo2"
             >
            </dia-log>
        </el-dialog>
    </div>
</template>
<script>
// 引用公用 js 方法
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js";
// 
import report from './import_report_world.js';
// 引用上报的弹出框组件
import reportDialog from "@v/riskControlSystem/sjzRiskControl/report/reportDialog.vue"
// 引用弹出框组件
import diaLog from "@v/riskControlSystem/sjzRiskControl/report/dialog";
// 引用Vue方法
import Vue from "vue";
// 注册"TextFormat"方法
Vue.filter("TextFormat", function(value) {
    // 返回处理后的值
    return mini.currency(value);
});
Vue.filter('TextIndex', function(value){
    return mini.currency_text(value) ;
});
// 引用接口2.（获取数据）
import { 
    riskprobability, 
    risk_influence_degree,
    // deleteRiskdistinguish,
    riskmatrix_tovo,
    // eva_city_Request
} from "~api/cube.js"
export default {
    name: "riskReport",
    props: {
        dataSource: Object,
        newThis: Object,
        numOpen: Number,
        data: Object
    },
    components: {
        reportDialog,
        diaLog
    },
    data(){
        return {
            me : this ,
            dataReport: [] ,    // 总数据
            styleHeight:{       // 报告页面的盖度
                height: ""
            },
            isAlertShow: false, // 用来显示警告的（上报状态隐藏/ 查看状态显示）
            directory: [] ,     // 存放目录数据的
            gradeData: [] ,     // 存放等级用的
            numArray: ["一、","二、","三、","四、","五、","六、","七、","八、","九、","十、","十一、","十二、"] ,
            textBody: "",
            textBody2: "",
            html2: "",          // 没有数据的提示文字
            textTitle: "",      // 公司
            isShow: true ,      // 修改按钮的显示与隐藏 
            nisShow:false,      // 弹出框的显示与隐藏的控制
            comtree2: [] ,      // 上报的树形数据 
            dialogFormVisible: false,
            view_row: {},
            number: 0,
            riskTableRow:[],    // 风险矩阵的数据信息
            tableDemo1:[],      //【参照按钮-发生概率】的json信息
            tableDemo2:[],      //【参照按钮-影响程度】的json信息 
        }
    },
    created(){
        // debugger
        let offsetHeight = document.body.offsetHeight ;
        this.styleHeight.height = offsetHeight - 80 + "px" ;
        if(offsetHeight <= 560)this.styleHeight.height = "560px";
    },
    mounted(){
        // 自适应高度
        this.setClientHeight() ;
        this.axiosRequest() ;   // 风险矩阵请求
        this.table1Request();   // 获取【参照按钮-发生概率】的json信息
        this.table2Request();   // 获取【参照按钮-影响程度】的json信息
    },
    computed: {
        flager: function(){
            // debugger
            if(this.numOpen == 1){
                this.setReportBack(this.numOpen) ;
            }else{
                this.setReportBack(this.numOpen) ;
            }
        }
    },
    methods: {
        /**颜色提示
         * "#db2b08"    巨大风险
         * "#e3b70a"    重大风险
         * "#e3d40a"    中等风险
         * "#0a95e3"    一般风险
         * "#13d708"    可接受风险
         */
        // 背景颜色
        getStyleColor(tool){
            // debugger
            tool.bgColor = {
                "backgroundColor": tool.color
            }
            return tool.bgColor ;
        },
        // 自适应高度
        setClientHeight(){
            let offsetHeight = document.body.offsetHeight ;
            this.styleHeight.height = offsetHeight - 80 + "px" ;
            const me = this ;
            window.onresize = function temp(){ 
                if(document.body.offsetHeight >= 560){
                    me.styleHeight.height = document.body.offsetHeight - 80 + "px" ;
                }else{
                    me.styleHeight.height = "560px";
                }                
            }           
        },
        // 返回按钮
        cancelBtn(){
            this.newThis.numOpen = null ;
            this.newThis.isShow = false ;
            this.nisShow = false ;
        },
        // 导出按钮
        exportBtn(){
            // this.$message('暂无此功能!');
            report.importReportWorld(this) ;
        },
        // 1. 上报（修改）按钮触发 
        // 0. 查看（不能修改）按钮触发
        setReportBack(number){
            debugger
            if(number==null)return false ;
            // number=1，为上报状态；number=0，为查看状态。
            if(number){
                this.isAlertShow = false ;  // 提示-隐藏
                this.isShow = true ;        // 修改按钮 - 显示
            }else{
                this.isAlertShow = true ;   // 提示-显示
                this.isShow = false ;       // 修改按钮 - 隐藏
            }
            let dataRow ;
            // 总数据
            this.dataReport = this.data.report_data ;
            if(this.dataReport.length === 0)this.isShow = false ;
            // 这家公司有几条风险（总共）
            let len = this.dataReport.length ;
            // 过滤出有数据的等级
            this.gradeData = this.data.grade_data.filter((red, index) => { return red.ncount > 0 }) ;
            // 过滤出有数据的数据(目录)
            let directory = this.data.stype_data.filter((res, index) => { return res.ncount > 0 ; }) ;
            this.directory = this.sortByKey(directory, "scode")
            // 前缀+序号的（大写的）
            this.directory.forEach((res, index) => { res.text = this.numArray[index] + res.sname; res.id = '#'+res.scode }) ;
            //   评估
                // this.dataReport.forEach(loli => { 
                //     this.gradeData.forEach(lopi => { 
                //         if(loli.ngradename == lopi.sname)loli.scontrolmeasure = lopi.scontrolmeasure ;
                //     });
                // }) ;
            this.dataReport.forEach(loli => {
                loli.text1 = "1、风险发生概率：" + loli.nprobabilityname ;
                loli.text2 = "2、风险影响程度：" + loli.ninfluencename ;
            }) ;
            // 

            // 获取从父组件传递过来的表格信息数据
            let rowData = this.dataSource.row.row ;
            // 生成文字（正文标题）
            this.textTitle = rowData.label ;
            this.textBody = rowData.label + '' + this.dataSource.year + '年' + this.dataSource.month + '月风险报告' ;
            this.textBody2= rowData.label + '' + '<br>' + this.dataSource.year + '年' + this.dataSource.month + '月风险报告' ; // 导出专用
            // 根据风险类型查出风险几条 ；
            let directory_text = mini.getReportOverviewText(this.directory) ; 
            // 根据风险等级查出风险几条 ；
            let gradeData_text = mini.getReportOverviewText(this.gradeData) ;
            // 没有数据时的提示文字
            if(this.directory.length === 0){
                this.html2 = '截止'+this.dataSource.year + '年' + this.dataSource.month +'月份'+ rowData.company +'无数据显示！' ;
            }else{
                this.html2 = '截止'+this.dataSource.year + '年' + this.dataSource.month +'月份，经风险评估分析，'+rowData.company+'在风险上面共存在'+len+'条，'+
                    '从风险类型来看，其中'+ directory_text + '从风险等级来看，其中' + gradeData_text ;
            }
        },
        /**
         * 数组对象排序
         */
        sortByKey(array, key){
            return array.sort(function(a,b){
                var x = a[key];
                var y = b[key];
                return((x<y)?-1:((x>y)?1:0));
            })
        },
        // 上报按钮
        onClick(){
            // debugger
            let me = this ;
            // 选中的那一行的公司id信息
            let companyId = me.newThis.paramsArray.row.row.id ;
            me.nisShow = !me.nisShow ;
            let $params = me.$store.state.prame.command;
            let _sql = this.newThis.config.sql2 ;
            _sql = _sql.replace(/:company/g,"'"+companyId+"'");
            let params = {
                cubeId: 4,
                sql: encodeURI(_sql)
            }
            mini.getSql_quertData_all( me, params );
        },
        // 请求返回的数据
        setSql_quertData_all(data){
            this.comtree2 = mini.reportDataTree(data, this) ;
        },
        // 修改按钮
        modifyBtn(tool){
            // debugger
            this.view_row = tool ;
            this.view_row.id = this.view_row.nid ;
            this.number = 1 ;
            this.dialogFormVisible = true ;
        },
        // 弹出框的 右上角的 ×
        handleClose(done){
            this.dialogFormVisible = false ;
            this.number = 0 ;
            done() ;
        },
        // 2.获取【风险矩阵】的json信息
        axiosRequest(){ 
            let me = this ;
            riskmatrix_tovo().then(res => { 
                if(res.data.code === 200){
                    me.riskTableRow = res.data.data;
                }else{
                    me.$message.error('发生了个小意外！请联系开发人员哦！') ;
                }
            });
        },
        // 获取【参照按钮-发生概率】的json信息
        table1Request(){
            let me = this ;
            me.axios.get("/cnbi/json/risk/tableDemo1.json").then(res => {
                let data = res.data ;
                data = eval("(" + data + ")");
                riskprobability().then(res => {
                    data.rows = res.data.data ;
                    me.tableDemo1 = data ;
                })
            });
        },
        // 获取【参照按钮-影响程度】的json信息
        table2Request(){
            let me = this ;
            me.axios.get("/cnbi/json/risk/tableDemo2.json").then(res => {
                let data = res.data ;
                data = eval("(" + data + ")");
                risk_influence_degree().then(res => {
                    data.rows = res.data.data ;
                    me.tableDemo2 = data ;
                });
            });
        }
    }
}
</script>
<style lang="scss" scoped src="./reportCss.scss"></style>

<style>
.container_main_risk_btn .icon-xiugai {
    margin-right: 10px;
    color: #000;
}
/*
 * 上报按钮
 */
.container_main_risk_btn2 .icon-tianjiashangbao{
    margin-right: 10px ;
}
</style>
