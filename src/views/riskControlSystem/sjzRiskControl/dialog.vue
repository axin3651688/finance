<template>
<!--
    name : sjz
    time : sjz 2019/5/6 9:40:00
    说明 : 风险识别的弹出框组件 
-->
    <div id="dialog">
        <!-- 内层弹出框 -->
        <el-dialog width="660px" :flag="flager" style="height: 560px;" :title="title" :visible.sync="riskProbability" append-to-body>
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
                    <el-select v-model="form.srisktype" :disabled="readonly" placeholder="请选择风险类型" class="input">
                        <el-option v-for="(option,index) in options" :key="option.id" :label="option.sname" :value="option.scode"></el-option>
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
                    <el-input type="textarea" v-model="form.sriskdescription" maxlength="1000" :readonl="readonly2" @change="descInput_sriskdescription" placeholder="请输入风险概述..."></el-input>
                </el-form-item>
            </el-form>
        <!-- 2 -->
        <p class="title1">风险分析</p>
            <el-form :model="form" :inline="true" :rules="rules4" ref="sub4" label-width="120px">
                <el-form-item label="风险发生概率：" prop="nprobability">
                    <el-select v-model="form.nprobability" :disabled="readonly" @change="selectChange" placeholder="请选择风险概率" class="input2">
                        <el-option v-for="(option,index) in optionl" :key="option.id" :label="option.sname" :value="option.nscore"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_first" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险影响程度：" prop="ninfluence">
                    <el-select v-model="form.ninfluence" :disabled="readonly" @change="selectChange2" placeholder="请选择风险影响" class="input2">
                        <el-option v-for="(option,index) in optiond" :key="option.id" :label="option.sname" :value="option.nscore"></el-option>
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
        <p class="title1">风险分析</p>
        <el-form :model="form" :inline="false" :rules="rules6" ref="sub6" label-width="120px">
            <el-form-item label="采取措施：" prop="smeasures">
                <el-input type="textarea" placeholder="请输入采取措施..." maxlength="1000" :readonly="readonly" @change="descInput_smeasures" v-model="form.smeasures"></el-input>
            </el-form-item>
            <el-form-item label="应对建议：" prop="sproposal">
                <el-input type="textarea" placeholder="请输入应对建议..." maxlength="1000" :readonly="readonly" @change="descInput_sproposal" v-model="form.sproposal"></el-input>
            </el-form-item>
            <div style="marginLeft: 38px;marginBottom: 15px;">
                <el-checkbox v-model="form.checked">下达</el-checkbox>
            </div>           
        </el-form>
        <!-- 4 -->
        <div slot="footer" class="dialog-footer">
            <el-row type="flex" justify="end">
                <el-col :span="0.1">
                    <el-button type="primary" v-show="isBtn" @click="saveClick('save')">保 存</el-button>
                    <el-button type="success" v-show="isBtn2" @click="saveClick('sub2','sub3','sub4','sub5','sub6')">提 交</el-button>
                    <el-button type="info" v-show="isBtn3">风险关闭</el-button>
                    <el-button @click="resetClick('sub2','sub3','sub4','sub5','sub6')">取 消</el-button>
                </el-col>
            </el-row>
        </div>   
    </div>
</template>
<script>
// 引用的风险矩阵
import riskMatrix from "@v/riskControlSystem/sjzRiskControl/riskMatrix";
// 引用接口
import { 
    risktype, 
    riskreporttype, 
    riskmatrix,
    riskdistinguish_add 
    } from "~api/cube.js";
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
export default {
    components:{
        riskMatrix
    },
    // props:["riskTableRow","fsgl","yxcd","newThis","fsgl"],
    props: {
        riskTableRow : Array,
        fsgl: Object,
        yxcd: Object,
        newThis: Object,
        flag: Boolean,
        modify: Boolean
    },
    data(){
        var validate_sriskname = (rule, value, callback) => { 
            if (value === '')callback(new Error('请输入风险名称'));
            if (value !== '')callback();
        };
        var validate_srisktype = (rule, value, callback) => { 
            if (value === '' || value === null)callback(new Error('请选择风险类型'));
            if (value !== '' && value !== null)callback();
        };
        var validate_sriskdescription = (rule, value, callback) => {
            if (value === '')callback(new Error('请输入风险概述'));
            if (value !== '')callback();
        };
        var validate_nprobability = (rule, value, callback) => {
            if (value === '' || value === null)callback(new Error('请选择风险发生概率'));
            if (value !== '' && value !== null)callback();
        };
        var validate_ninfluence = (rule, value, callback) => {
            if (value === '' || value === null)callback(new Error('请选择风险影响程度'));
            if (value !== '' && value !== null)callback();
        };
        var validate_sreporttype = (rule, value, callback) => {
            if (value === '' || value === null)callback(new Error('请选择风险报告类型'));
            if (value !== '' && value !== null)callback();
        };
        var validate_smeasures = (rule, value, callback) => {
            if (value === '')callback(new Error('请输入采取措施'));
            if (value !== '')callback();
        };
        var validate_sproposal = (rule, value, callback) => {
            if (value === '')callback(new Error('请输入应对建议'));
            if (value !== '')callback();
        };
        return {
            riskProbability: false,
            readonly: false ,       // 只读属性（查看按钮触发时用到）
            isBtn: true,            // 保存 按钮的显示与隐藏
            isBtn2: true,           // 提交 按钮的显示与隐藏
            isBtn3: true,           // 风险关闭 按钮的显示与隐藏
            title: "",
            heights: "300px",
            type: null,
            tableData: [],
            elements: [],
            options: [],            // 风险类型的数组（请求的数据）
            optionl: [],            // 风险发生概率数组（请求的数据）
            optiond: [],            // 风险影响程度数组（请求的数据）
            optione: [],            // 报告类型数组（请求的数据）
            optiong: [],
            // form2: {},
            form: {
                sriskname: "",              // 风险名称
                srisktype: "",              // 风险类型
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
            // 
            rules2:{
                sriskname: [{ validator: validate_sriskname, trigger: 'blur' }],
                srisktype: [{ validator: validate_srisktype, trigger: 'change' }]
            },
            rules3:{
                sriskdescription: [{ validator: validate_sriskdescription, trigger: 'blur' }]
            },
            rules4:{
                nprobability: [{ validator: validate_nprobability, trigger: 'change' }],
                ninfluence: [{ validator: validate_ninfluence, trigger: 'change' }]
            },
            rules5:{
                sreporttype: [{ validator: validate_sreporttype, trigger: 'change' }]
            },
            rules6:{
                smeasures: [{ validator: validate_smeasures, trigger: 'blur' }],
                sproposal: [{ validator: validate_sproposal, trigger: 'blur' }]
            }
        }
    },
    created(){ 
        // debugger
        let viewBtn = this.newThis.view_btn ;
        let $params = this.$store.state.prame.command;
        let sfilluser = this.$store.getters.user.user.userName;
        let departmentname = this.$store.getters.user.dept[0].sname ;
        // 查看按钮触发时设置成只读（不允许修改，只能看）
            if(viewBtn){
                this.readonly2 = true ;
            }else{
                this.readonly2 = false ;
            }
        // 全局控制选择的报告类型0不显示，1显示
            this.reporttype = this.$store.getters.user.globalparam[0].reporttype ;
            if(this.reporttype){
                this.isReportType = true ;
            }else{
                this.isReportType = false ;
            }
        // 自动获取登录人作为填报人
            // this.form.sfilluser = sfilluser ;
        // 自动获取当前用户的所属部门
            // this.form.departmentname = departmentname ;;
        // 风险发生概率下拉框数据
            this.optionl = this.fsgl.rows ;
        // 风险影响程度下拉框数据
            this.optiond = this.yxcd.rows ;
    },
    mounted(){
        // 风险类型请求
        this.srisktypeRequest() ;
        // 报告类型请求
        this.sreporttypeRequest() ;
    },
    computed: {
        // 监听事件（区分查看状态和添加状态）
        flager: function(){
            // debugger
            let viewBtn = this.newThis.view_btn ;
            if(viewBtn){
                this.readonly = true ;      // 只读/禁用
                this.isBtn = false ;        // 保存 按钮的隐藏
                this.isBtn2 = false ;       // 提交 按钮的隐藏
                this.isBtn3 = false ;       // 风险关闭 按钮的隐藏
                let viewRow = this.newThis.view_row ;
                this.form = viewRow ;
                this.$message({ message: '温馨小提示，只能查看哦！不能编辑！', type: "warning" }) ;
            }else{
                this.readonly = false ;     // 可填写/可选择
                this.isBtn = true ;        // 保存 按钮的显示
                this.isBtn2 = true ;       // 提交 按钮的显示
                this.isBtn3 = true ;       // 风险关闭 按钮的显示
                this.form = mini.getForm(this) ;
            }
        }
    },
    methods: {
        closeDialog(){
            debugger
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
            this.nscoreCalculate();
        },
        // 影响程度选择器  触发
        selectChange2(val){
            this.nscoreCalculate();
        },
        // 风险分值自动计算
        nscoreCalculate(){ 
            if(this.form.nprobability == '' || this.form.ninfluence == ''){
                this.form.nscore = "" ;
            }else{
                this.form.nscore = this.form.nprobability * this.form.ninfluence ;
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
            riskmatrix(params).then(res => {
                if(res.data.code === 200){ 
                    me.optiong = res.data.data ;
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
                    me.options = res.data.data ;
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
            let me = this ;
            let t1 = false,t2 = false,t3 = false,t4 = false,t5 = false ;
            let params = mini.getParams(me, value) ;               // 获取请求参数
            if(value != "save"){
                me.$refs[value].validate((valid) => { if(valid)t1 = true; })
                me.$refs[value2].validate((valid) => { if(valid)t2 = true; })
                me.$refs[value3].validate((valid) => { if(valid)t3 = true; })
                me.$refs[value4].validate((valid) => { if(valid)t4 = true; })
                me.$refs[value5].validate((valid) => { if(valid)t5 = true; })
                if(t1 && t2 && t3 && t4 && t5){
                    me.riskdistinguishRequest(params) ;
                }else{
                    me.$message({message:'请填写完整再提交哦！',type: "warning"});
                }
            }else{
                me.riskdistinguishRequest(params) ;
            }           
        },
        /**
         * @event (2)添加/提交请求接口
         */
        riskdistinguishRequest(params){ 
            let me = this ;
            riskdistinguish_add(params).then(res => { 
                if(res.data.code === 200)me.$message({message: res.data.msg, type: "success"}) ;
                me.newThis.axiosJson() ;
            });
        },
        /**
         * @event (3)取消按钮
         */
        resetClick(value, value2,value3,value4,value5){
            this.$refs[value].resetFields();
            this.$refs[value2].resetFields();
            this.$refs[value3].resetFields();
            this.$refs[value4].resetFields();
            this.$refs[value5].resetFields();
            this.newThis.dialogFormVisible = false ;
        }
    }
}
</script>
<style scoped>
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
