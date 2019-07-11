<template>
<!--
    name : sjz
    time : sjz 2019/5/6 9:40:00
    说明 : 风险识别的弹出框组件 :modify="flagar"
-->
    <div id="dialog" :flag="flager" :addOpen="numOpen">
        <!-- 内层弹出框 -->
        <el-dialog width="1396px" style="height: 560px;" :title="title" :visible.sync="riskProbability" append-to-body>
            <!-- 下划线 -->
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <!-- 内层表格（供参考使用） -->
            <el-table
            class="table-call" style="width: 100%"
            :data="tableData"
            :height="heights"
            border
            stripe
            highlight-current-row>
                <el-table-column 
                v-for="element in elements"
                :type="element.type"
                :key="element.index" 
                :prop="element.id" 
                :label="element.text"
                :width="element.width"
                :align="element.align" >
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 1 -->
        <p class="title1">风险表现</p>
            <el-form :model="form" :inline="true" :rules="rules2" ref="sub2" label-width="120px" >
                <el-form-item label="风险名称：" prop="sriskname">
                    <el-input v-model="form.sriskname" auto-complete="off" maxlength="50" :readonly="readonly" @change="descInput_sriskname" placeholder="请输入风险名称" class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险类型：" prop="srisktype">
                    <el-select v-model="form.srisktype"  placeholder="请选择风险类型" class="input" @focus="focusClick" :disabled="readonly">
                        <!-- <el-option v-for="(option,index) in options" :key="option.id" :label="option.sname" :value="option.scode"></el-option> -->
                        <el-option :value="form.srisktype " :label="valueTitle " style="height: 200px;overflow: auto;background-color: #fff;">
                            <el-tree 
                                v-show="isFocus"                                
                                id="tree-option"
                                ref="selectTree"
                                :accordion="accordion"
                                :data="options"
                                :props="defaultProps"
                                :node-key="defaultProps.scode"    
                                :default-expanded-keys="defaultExpandedKey"
                                @node-click="handleNodeClick">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="填报部门："> 
                    <el-input v-model="form.departmentname" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
                <el-form-item label="填报人：">
                    <el-input v-model="form.sfilluser" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :inline="false" :rules="rules3" ref="sub3" label-width="120px">
                <el-form-item label="风险概述：" prop="sriskdescription">
                    <el-input type="textarea" v-model="form.sriskdescription" maxlength="1000" :readonly="readonly" @change="descInput_sriskdescription" placeholder="请输入风险概述..."></el-input>
                </el-form-item>
            </el-form>
        <!-- 2 -->
        <p class="title1">风险分析</p>
            <el-form :model="form" :inline="true" :rules="rules4" ref="sub4" label-width="120px">
                <el-form-item label="风险发生概率：" prop="nprobability">
                    <el-select v-model="form.nprobability" :disabled="readonly" @change="selectChange" placeholder="请选择风险概率" class="input2">
                        <el-option v-for="(option,index) in optionl" :key="option.id" :label="option.sname" :value="option.id"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_first" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险影响程度：" prop="ninfluence">
                    <el-select v-model="form.ninfluence" :disabled="readonly" @change="selectChange2" placeholder="请选择风险影响" class="input2">
                        <el-option v-for="(option,index) in optiond" :key="option.id" :label="option.sname" :value="option.id"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_second" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险分值：">
                    <el-input v-model="form.nscore" auto-complete="off" placeholder="不可编辑，自动计算出，根据R=L*S" readonly class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险等级：">
                    <el-input v-model="form.gradename" auto-complete="off" placeholder="不可编辑" readonly class="input"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :inline="false" :rules="rules5" ref="sub5" label-width="120px">
                <el-form-item label="风险矩阵：">
                    <risk-matrix :data="riskTableRow" :fsgl="fsgl" :yxcd="yxcd"></risk-matrix>
                </el-form-item>
                <el-form-item label="报告类型：" v-show="isReportType" prop="sreporttype">
                    <el-select style="width: 100%" v-model="form.sreporttype" :disabled="readonly" placeholder="请选择报告类型">
                        <el-option v-for="(option, inedx) in optione" :key="option.scode" :label="option.sname" :value="option.scode"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        <!-- 3 -->
        <p class="title1">风险处理方法</p>
        <el-form :model="form" :inline="false" :rules="rules6" ref="sub6" label-width="120px">
            <el-form-item label="采取措施：" prop="smeasures">
                <el-input type="textarea" placeholder="请输入采取措施..." maxlength="1000" :readonly="readonly" @change="descInput_smeasures" v-model="form.smeasures"></el-input>
            </el-form-item>
            <el-form-item label="应对建议：" prop="sproposal">
                <el-input type="textarea" placeholder="请输入应对建议..." maxlength="1000" :readonly="readonly" @change="descInput_sproposal" v-model="form.sproposal"></el-input>
            </el-form-item>
            <div v-show="isCheckbox" style="marginLeft: 38px;marginBottom: 15px;">
                <bulk-orderser v-show="riskbulkOrderser" :data="comtree2" :newThis="newThis" :isAddParse="isAddParse" :nthis="nthis"></bulk-orderser>
                <el-checkbox :disabled="readonly2" v-model="checkbox" @change="riskReleaseVo">下达</el-checkbox>
            </div>          
        </el-form>
        <!-- 4 -->
        <div slot="footer" class="dialog-footer">
            <el-row type="flex" justify="end">
                <el-col :span="0.1">
                    <el-button type="primary" v-show="isBtn" @click="saveClick('save')">保 存</el-button>
                    <el-button type="success" v-show="isBtn2" @click="saveClick('sub2','sub3','sub4','sub5','sub6')">提 交</el-button>
                    <el-button type="info" v-show="isBtn3" @click="riskCloseClick">风险关闭</el-button>
                    <el-button @click="resetClick('sub2','sub3','sub4','sub5','sub6')">取 消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
// 引用的风险矩阵
import riskMatrix from "@v/riskControlSystem/sjzRiskControl/riskMatrix";
// 引用的下达弹出框
import bulkOrderser from "@v/riskControlSystem/sjzRiskControl/bulkOrderser";
// 引用的tools.js文件
import tools from "utils/tools";
// 引用接口
import { 
    risktype, 
    riskreporttype, 
    riskmatrix,
    riskdistinguish_add,
    riskdistinguish_update,
    riskdistinguish_update_sisclose ,
    eva_city_Request
    } from "~api/cube.js";
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
// 树形选择框组件
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    components:{
        riskMatrix,
        bulkOrderser,
        Treeselect
    },
    // props:["riskTableRow","fsgl","yxcd","newThis","fsgl"],
    props: {
        riskTableRow : Array,
        fsgl: Object,
        fsglTwo: Object,
        yxcd: Object,
        newThis: Object,
        flag: Boolean,
        modify: Boolean,
        numOpen: Number
    },
    data(){
        
        return {
            defaultProps: {
                children: 'children',
                label: 'sname',
                value: 'scode'
            },
            riskProbability: false, nthis: this ,
            readonly: false ,       // 只读属性（查看按钮触发时用到）
            readonly2: false,       // 下达专用
            isBtn: true,            // 保存 按钮的显示与隐藏
            isBtn2: true,           // 提交 按钮的显示与隐藏
            isBtn3: true,           // 风险关闭 按钮的显示与隐藏
            title: "",
            heights: "300px",
            type: null,
            defaultExpandedKey: [],accordion:true,
            tableData: [],
            elements: [],
            options: [],            // 风险类型的数组（请求的数据）
            optionl: [],            // 风险发生概率数组（请求的数据）
            optionl_nscore: "",
            optiond: [],            // 风险影响程度数组（请求的数据）
            optiond_nscore: "",
            optione: [],            // 报告类型数组（请求的数据）
            optiong: [],
            comtree2: [],           // 下达的树形数据
            checkbox: false ,       // 下达按钮的状态
            riskbulkOrderser: false,        // 下达弹出框的状态（显示与隐藏）
            addOpen: "",
            riskRelease: "",
            valueTitle: "",isFocus:true,params_cloning:{},

            form: {
                sriskname: "",              // 风险名称
                srisktype: null,            // 风险类型
                departmentname: "",         // 填报部门（只读）
                sfilluser: "",              // 填报人（只读）
                sriskdescription: "",       // 风险概述
                smeasures: "",              // 采取措施
                sproposal: "",              // 应对建议
                nprobability: "",           // 风险发生概率
                ninfluence: "",             // 风险影响程度
                nscore: "",                 // 风险分值（只读，自动计算，根据R=L*S）
                gradename: "",              // 风险等级（只读）
                sreporttype: ""             // 报告类型
            },
            reporttype: 0,          // 全局控制报告类型，0不显示，1显示
            isReportType: false,    // 控制报告类型的显示与隐藏

            textShow: false ,           //提示的显示与隐藏
            html: "" ,                  //文字 
            isAddParse: 0,
            isCheckbox: true ,      // 控制下达选择按钮的显示与隐藏（注：单体公司无法下达故此隐藏，合并公司可以下达故此显示）
            // 
            rules2:{
                // sriskname: [{ validator: validate_sriskname, trigger: 'blur' }],
                // srisktype: [{ validator: validate_srisktype, trigger: 'change' }]
            },
            rules3:{
                // sriskdescription: [{ validator: validate_sriskdescription, trigger: 'blur' }]
            },
            rules4:{
                // nprobability: [{ validator: validate_nprobability, trigger: 'change' }],
                // ninfluence: [{ validator: validate_ninfluence, trigger: 'change' }]
            },
            rules5:{
                // sreporttype: [{ validator: validate_sreporttype, trigger: 'change' }]
            },
            rules6:{
                // smeasures: [{ validator: validate_smeasures, trigger: 'blur' }],
                // sproposal: [{ validator: validate_sproposal, trigger: 'blur' }]
            }
        }
    },
    created(){ 
        // debugger
        let viewBtn = this.newThis.view_btn ;
        let $params = this.$store.state.prame.command;
        let sfilluser = this.$store.getters.user.user.trueName;
        let departmentname = this.$store.getters.user.dept[0].sname ;
        // 全局控制选择的报告类型0显示，1不显示
            this.reporttype = this.$store.getters.user.globalparam[0].reporttype ;
            if(this.reporttype){
                this.isReportType = false ;
            }else{
                this.isReportType = true ;
            }
        // 自动获取登录人作为填报人
            // this.form.sfilluser = sfilluser ;
        // 自动获取当前用户的所属部门
            // this.form.departmentname = departmentname ;;view_row
        // 风险发生概率下拉框数据
            // this.optionl = this.fsglTwo.rows.reverse() ;
            this.optionl = this.fsgl.rows ;
        // 风险影响程度下拉框数据
            this.optiond = this.yxcd.rows ;  
        // 风险发生概率 + 风险影响程度 的分值赋值（初始化）
            if(this.optionl_nscore == "" || this.optiond_nscore == ""){
                let d1 = this.newThis.view_row.nprobability ;
                let d2 = this.newThis.view_row.ninfluence ;
                let c1 = this.fsgl.rows.filter(rel => { return rel.id == d1 }) ;
                let c2 = this.yxcd.rows.filter(red => { return red.id == d2 }) ;
                if(c1 && c1.length > 0)this.optionl_nscore = c1[0].nscore ;
                if(c2 && c2.length > 0)this.optiond_nscore = c2[0].nscore ; 
                
            } 
    },
    mounted(){
        // 风险类型请求
        this.srisktypeRequest() ;
        // 报告类型请求
        this.sreporttypeRequest() ;
    },
    watch: {
        numOpen(){
            // debugger
            this.valueTitle = "";
            this.isAddParse = 0 ;
            this.riskbulkOrderser = false ;
            this.checkbox = false ;
            this.addDialog() ;
        }
    },
    computed: {
        // 监听事件（区分查看状态和添加状态）
        flager: function(){
            // debugger
            let viewRow = {} ;
            let viewBtn = this.newThis.view_btn ;
            let modifyBtn = this.newThis.modify_btn ;
            if(this.newThis.reporttype){
                this.isReportType = false ;
            }else{
                this.isReportType = true ;
            }
            if(viewBtn){
                this.$message({ message: '温馨小提示，只能查看哦！不能编辑！', type: "warning" }) ;
                this.readonly = true ;      // 只读/禁用
                this.readonly2= true ;      // 下达禁用
                this.isBtn = false ;        // 保存 按钮的隐藏
                this.isBtn2 = false ;       // 提交 按钮的隐藏
                this.isBtn3 = true ;       // 风险关闭 按钮的隐藏
            }else if(modifyBtn){
                this.readonly = false ;     // 可填写/可选择
                this.isBtn = true ;        // 保存 按钮的显示
                this.isBtn2 = true ;       // 提交 按钮的显示
                this.isBtn3 = true ;       // 风险关闭 按钮的显示
                if(this.newThis.view_row.sissubmit == "已提交"){    // 已提交的可以风险关闭/ 未提交的不允许风险关闭
                    this.isBtn3 = true ;
                    this.readonly2= false ;      // (已提交)下达启用
                }else{
                    this.isBtn3 = false ;
                    this.readonly2= true ;       // (未提交)下达禁用
                }
            }
            if(modifyBtn || viewBtn){
                this.isAddParse = 1 ;
                this.riskbulkOrderser = false ;
                this.checkbox = false ;
                viewRow = this.newThis.view_row ;
                let $cc = viewRow.srisktypename ;
                this.valueTitle = $cc ;
                for(let key in this.form){
                    this.form[key] = "" ;
                }               
                for(let key in viewRow){
                    this.form[key] = viewRow[key] ;
                }  
                // debugger            
            }else{
                this.valueTitle = "";
                this.isAddParse = 0 ;
                this.riskbulkOrderser = false ;
                this.checkbox = false ;
                this.addDialog() ;
            }
        }
    },
    methods: {
        // 切换选项[风险类型]
        handleNodeClick(node){
            // debugger
            if(node.children && node.children.length > 0){
                this.valueTitle = "" ; 
                this.form.srisktype = "" ;
                this.isFocus = true ; 
            }else{
                this.valueTitle = node[this.defaultProps.label]
                this.form.srisktype = node[this.defaultProps.value]
                this.$emit('getValue',this.valueId)
                this.defaultExpandedKey = []
                this.isFocus = false 
                this.$refs.sub2.$children[1].$children[0].blur() // 下拉框隐藏
            }
        },
        // 清除下拉选【风险类型】的
        clearHandle(){
            this.valueTitle = ''
            this.defaultExpandedKey = []
            this.$emit('getValue',null)
        },
        // 下拉框的焦点聚焦事件【风险类型】的
        focusClick(event){
            this.isFocus = true ;
        },
        addDialog(){
            // debugger
            // 0合并公司/ 1单体公司
            // 控制下达选择按钮的显示与隐藏（注：单体公司无法下达故此隐藏，合并公司可以下达故此显示）
            if(this.$store.getters.treeInfo.nisleaf){
                this.isCheckbox = false ;
            }else{
                this.isCheckbox = true ;
            }
            this.readonly = false ;     // 可填写/可选择
            this.readonly2= true ;      // 添加弹出框下达按钮禁用
            this.isBtn = true ;        // 保存 按钮的显示
            this.isBtn2 = true ;       // 提交 按钮的显示
            // 刚点击添加按钮弹出框显示，风险关闭按钮隐藏，提交之后显现。
            this.isBtn3 = false ;       // 风险关闭 按钮的显示
            if(this.form.sfilluser){
                this.form = {} ;
                this.form = mini.getForm(this) ;
            }else {
                this.form = mini.getForm(this) ;
            }
        },
        // 0. 风险名称输入超出限制提示 <=50
        descInput_sriskname(){
            let txtVal = this.form.sriskname.length;
            if(txtVal == 50){
                this.$message.error('您输入的字符已达50上限，无法输入！') ;
            }else{
                this.$message({ message: '限制50个字符之内，您已输入：'+txtVal, type: "warning" }) ;
            }
        },
        // 1. 风险概述文本框输入超出限制提示 <=1000
        descInput_sriskdescription(){
            let txtVal = this.form.sriskdescription.length;
            if(txtVal == 1000){
                this.$message.error('您输入的字符已达1000上限，无法输入！') ;
            }else{
                this.$message({ message: '限制1000个字符之内，您已输入：'+txtVal, type: "warning" }) ;
            }
        },
        // 2. 采取措施文本框输入超出限制提示 <=1000
        descInput_smeasures(){ 
            let txtVal = this.form.smeasures.length;
            if(txtVal == 1000){
                this.$message.error('您输入的字符已达1000上限，无法输入！') ;
            }else{
                this.$message({ message: '限制1000个字符之内，您已输入：'+txtVal, type: "warning" }) ;
            }
        },
        // 3. 应对建议文本框输入超出限制提示 <=1000
        descInput_sproposal(){
            let txtVal = this.form.sproposal.length;
            if(txtVal == 1000){
                this.$message.error('您输入的字符已达1000上限，无法输入！') ;
            }else{
                this.$message({ message: '限制1000个字符之内，您已输入：'+txtVal, type: "warning" }) ;
            }
        },
        // 发生概率选择器  触发
        selectChange(val){ 
            // debugger
            let cc = this.optionl.filter(res => { return res.id == val }) ;
            if(this.optionl_nscore!="")this.optionl_nscore = "" ;
            this.optionl_nscore = cc[0].nscore ;
            this.nscoreCalculate();
        },
        // 影响程度选择器  触发
        selectChange2(val){
            let cc = this.optiond.filter(res => { return res.id == val }) ;
            if(this.optiond_nscore!="")this.optiond_nscore = "" ;
            this.optiond_nscore = cc[0].nscore ;
            this.nscoreCalculate();
        },
        // 风险分值自动计算
        nscoreCalculate(){ 
            if(this.form.nprobability == '' || this.form.ninfluence == ''){
                this.form.nscore = "" ;
            }else{
                // this.form.nscore = this.form.nprobability * this.form.ninfluence ;
                this.form.nscore = this.optionl_nscore * this.optiond_nscore ;
                // 风险等级请求 
                this.riskmatrixRequest(this.form.nscore) ;
            }
        },
        // 风险等级请求 
        riskmatrixRequest(num){
            let me = this ;
            let params = {
                score : num
            }
            riskmatrix(params).then(res => { //debugger
                if(res.data.code === 200){ 
                    me.optiong = res.data.data ;
                    me.form.ngrade = res.data.data[0].nid ;
                    me.form.gradename = res.data.data[0].sname ;
                }else{

                }
            });
        },
        // 风险类型请求
        srisktypeRequest(){
            let me = this ;
            risktype().then(res => {
                if(res.data.code === 200){
                    // me.options = res.data.data ;
                    me.options = mini.elementUI_tree(res.data.data, this, "1") ;
                }else{
                    me.$message.error("风险类型请求失败，请联系开发人员哦！")
                }
            });
        },
        // 报告类型请求
        sreporttypeRequest(){
            let me = this ;
            riskreporttype().then(res => {
                if(res.data.code === 200){
                    me.optione = res.data.data ;
                }else{
                    me.$message.error("报告类型请求失败，请联系开发人员哦！")
                }
            });
        },
        // 风险发生概率 按钮 的事件
        probability_first(){
            // debugger
            this.riskProbability = true ;
            this.title = "风险发生概率" ;
            // 列
            this.elements = [] ;
            this.elements = this.fsgl.columns ;
            // 行
            this.tableData= this.fsgl.rows;           
        },
        // 风险影响程度 按钮 的事件
        probability_second(){
            // debugger
            this.riskProbability = true ;
            this.title = "风险影响程度" ;
            // 列
            this.elements = [] ;
            this.elements = this.yxcd.columns ;
            // 行
            this.tableData= this.yxcd.rows;
        },
        /**
         * @event (1)保存按钮/提交按钮
         */
        saveClick(value, value2,value3,value4,value5){ 
            debugger
            let me = this ;
            let viewTrue = false ;
            me.newThis.axiosJson() ;
            // 查询上报状态
            let submit = me.newThis.tableData.filter(dd => { return dd.sissubmit == "已提交" }) ;
            let isTrue = submit.some(ee => { return ee.sisreport == 1 }) ; 
            if(isTrue)return false ;
            // if(isTrue) {
            //     me.$message('风险已上报，无法添加和提交！') ;
            //     return false ;
            // }
            // let t1 = false,t2 = false,t3 = false,t4 = false,t5 = false ;
            let params = mini.getParams(me, value) ;               // 获取请求参数
            this.params_cloning = params ;
            // 添加页面的保存与提交
            if(me.newThis.modify_btn !== 1){
                if(value != "save"){
                    // 有没有空的  
                    if(!me.isEmpty(me)){
                        me.$message({message:'请填写完整再提交哦！',type: "warning"});
                    } else {
                        // 判断风险名称是否重复，重复则提示‘风险名称已重复，不可保存或者提交！’，反之，则可以提交、保存或者修改 ；
                        if(mini.isSriskName(me, "add")) {
                            me.$message({ message: "风险名称已重复，不可保存或者提交！", type: "warning" }) ;
                            return false ;
                        }
                        // 提交
                        me.riskdistinguishRequest(params) ;      
                    }         
                }else{
                    // 判断风险名称是否重复，重复则提示‘风险名称已重复，不可保存或者提交！’，反之，则可以提交、保存或者修改 ；
                    if(mini.isSriskName(me, "add")) {
                        me.$message({ message: "风险名称已重复，不可保存或者提交！", type: "warning" }) ;
                        return false ;
                    }
                    // 保存 
                    me.riskdistinguishRequest(params) ;                
                } 
            // 修改页面的保存与提交  
            }else{
                // 已提交的修改页面
                if(me.form.sissubmit === "已提交"){
                    // 判断风险名称是否重复，重复则提示‘风险名称已重复，不可保存或者提交！’，反之，则可以提交、保存或者修改 ；
                    if(mini.isSriskName(me, "modify")) {
                        me.$message({ message: "风险名称已重复，不可保存或者提交！", type: "warning" }) ;
                        return false ;
                    }
                    me.modify_add_yes(me, params) ;
                // 未提交的修改页面
                }else{
                    // 判断风险名称是否重复，重复则提示‘风险名称已重复，不可保存或者提交！’，反之，则可以提交、保存或者修改 ；
                    if(mini.isSriskName(me, "modify")) {
                        me.$message({ message: "风险名称已重复，不可保存或者提交！", type: "warning" }) ;
                        return false ;
                    }
                    me.modify_add_no(me, params, value) ;
                }
            }            
        },
        /**
         * @event 修改弹出框页面/保存+提交的事件（已提交的风险）yes
         */
        modify_add_yes(me, params){ 
            // debugger
            // 有没有空的
            if(!me.isEmpty(me)){
                me.$message({message:'请填写完整再提交哦！',type: "warning"});
            }else{
            // 没有改动的提示一下，不给保存，浪费资源
                if(mini.getForChange(me))me.$message({ message: '暂无改动！', type: 'warning' }) ;
            }
            // 即无空亦有改动则保存/提交也
            if(me.isEmpty(me) && !mini.getForChange(me)){
                me.modify_riskdistinguishRequest(params) ;
            }
        },
        /**
         * @event 修改弹出框页面/保存+提交的事件（未提交的风险）no
         */
        modify_add_no(me, params, value){ 
            // debugger
            // 保存按钮
            if(value === "save"){
                // (1)有没有变动
                if(mini.getForChange2(me))me.$message({ message: "暂无改动！", type: "warning" }) ;
                // (2)没有变动直接保存修改即可
                if(!mini.getForChange2(me)){
                    me.modify_riskdistinguishRequest(params) ;
                }
            // 提交按钮
            }else{
                // (1)有没有空的
                if(!me.isEmpty(me)){
                    me.$message({ message: "请填写完整！", type: "warning" }) ;
                }else{
                // (2)没有就提交修改
                    me.modify_riskdistinguishRequest(params) ;
                }
                
            }
        },
        // empty 判断提交的时候有没有空的  空则不提交  并且提示(★☆)
        isEmpty(me){
            // debugger
            // 有没有空的
            // 判断报告类型是否是启用/禁用状态 0=启用 | 1=不启用
            let foom = {} ;
            if(me.newThis.reporttype) {
                for(let keyy in me.form) {
                    if(keyy !== "sreporttype" && keyy !== "sreporttypename")foom[keyy] = me.form[keyy] ;
                }
                for(let keys in foom){
                    if((!me.form[keys] || me.form["department"]!="") && ((me.form[keys]=="" && me.form["department"]!="") || me.form["nprobability"]==0 || me.form["ninfluence"]==0)){
                        return false ;
                    }
                }
            } else {
                for(let keyd in me.form){
                    if((!me.form[keyd] || me.form["department"]!="") && ((me.form[keyd]=="" && me.form["department"]!="") || me.form["nprobability"]==0 || me.form["ninfluence"]==0)){
                        return false ;
                    }
                }
            } 
            return true ;   
        },
        /**
         * @event 添加弹出框的下达按钮/修改弹出框的下达按钮
         */
        riskReleaseVo(){
            let me = this ;
            // debugger
            if(this.checkbox){
                // this.$message('下达') ;
                this.riskbulkOrderser = true ;
                mini.getCompanyTree(me) ;
            }else{
                this.riskbulkOrderser = false ;
            }
        },
        /**
         * @event (2)添加/提交请求接口
         */
        riskdistinguishRequest(params){ 
            // debugger
            let me = this ;
            riskdistinguish_add(params).then(res => { 
                if(res.data.code === 200){
                    if(params[0].sissubmit == "Y"){
                        me.readonly2 = false ;
                        me.isBtn3 = true ;
                    }
                    me.$message({message: res.data.msg, type: "success"}) ;
                }else{
                    me.$message.error(res.data.msg) ;
                }
                me.newThis.axiosJson() ;
            });
        },
        /**
         * @event (3)添加/提交请求接口（注：修改弹出框的按钮）
         */
        modify_riskdistinguishRequest(params){ 
            // debugger
            let me = this ;
            riskdistinguish_update(params).then(res => { 
                // debugger
                if(res.data.code === 200){
                    if(params[0].sissubmit == "Y")me.readonly2 = false ;    //注：提交之后才可以下达
                    me.$message({message: res.data.msg, type: "success"}) ;
                }else{
                    if(res.data.code !== 200)me.$message.error(res.data.msg) ;
                }
                me.newThis.axiosJson() ;
            });
        },
        /**
         * @event (4)风险关闭按钮
         */
        riskCloseClick(){
            // debugger
            let me = this ;
            let params = mini.getParams(me, "sub2") ;  
            let data = {
                id : me.form.id
            } ;
            if(me.newThis.modify_btn === 1){
                if(me.form.sissubmit == "已提交"){
                    me.riskdistinguish_update_sisclose_request(data, me) ;
                }       
            }else{
                me.riskdistinguish_update_sisclose_request(data, me) ;
            }   
        },
        // 风险关闭按钮请求
        riskdistinguish_update_sisclose_request(data, me){
            riskdistinguish_update_sisclose(data).then(ress => {
                // debugger
                if(ress.data.code === 200){
                    me.$message({ message: "关闭成功!", type: "success" });
                    me.newThis.axiosJson() ;
                }else{
                    me.$message({ message: "温馨提示：未批示/未反馈的风险无法关闭！", type: "warning" });
                }
            })
        },
        
        /**
         * @event (5)取消按钮
         */
        resetClick(value, value2,value3,value4,value5){
            this.riskbulkOrderser = false ;
            this.newThis.viewReadonly = false ;
            this.newThis.dialogFormVisible = false ;
            this.checkbox = false ;
            this.params_cloning = {} ;
        }
    }
}
</script>
<style scoped>
#tree-option {
    color:#606266;
    font-weight: 500 ;
}
.title1 {
    color: blue;
    font-size: 20px;
    font-family: '微软雅黑';
    font-weight: 700;
    margin-bottom: 30px;
    width: 100%;
}
#dialog { width: 100%; }
.form{ width: 100%; }
/* .input{
    width: 360px;
    min-width: 180px;
    max-width: 360px;
} */
.textarea {
    width: 810px;
    min-width: 180px;
    max-width: 810px;
    /* width: 100%; */
}
.input{
    width: 330px;
}
.input2 {
    width: 260px;
}
</style>
<style>
#tree-option .el-tree-node__label:hover{
    color: #409EFF;
}
#tree-option .is-current > .el-tree-node__content{
    font-weight: 200px;
}
#tree-option .el-tree-node__label{
    font-size: 15px;
    font-family: "宋体";
}
</style>
