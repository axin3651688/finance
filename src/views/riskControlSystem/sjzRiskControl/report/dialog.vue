<template>
    <div id="dialog" :num="number">
        <!-- 内层弹出框 -->
        <el-dialog width="660px" style="height: 560px;" append-to-body>
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
        <p class="title1">风险表现</p>
        <el-form :model="form" :inline="true" ref="sub2" label-width="120px" >
            <el-form-item label="风险名称：" prop="sriskname">
                <el-input v-model="form.sriskname" auto-complete="off" maxlength="50" @change="descInput_sriskname" placeholder="请输入风险名称" class="input"></el-input>
            </el-form-item>
            <el-form-item label="风险类型：" prop="srisktype">
                <el-select v-model="form.srisktype"  placeholder="请选择风险类型" class="input">
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
        <el-form :model="form" :inline="false" ref="sub3" label-width="120px">
            <el-form-item label="风险概述：" prop="sriskdescription">
                <el-input type="textarea" v-model="form.sriskdescription" maxlength="1000" @change="descInput_sriskdescription" placeholder="请输入风险概述..."></el-input>
            </el-form-item>
        </el-form>
        <!-- 2 -->
        <p class="title1">风险分析</p>
            <el-form :model="form" :inline="true" ref="sub4" label-width="120px">
                <el-form-item label="风险发生概率：" prop="nprobability">
                    <el-select v-model="form.nprobability" @change="selectChange" placeholder="请选择风险概率" class="input2">
                        <el-option v-for="(option,index) in optionl" :key="option.id" :label="option.sname" :value="option.nscore"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_first" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险影响程度：" prop="ninfluence">
                    <el-select v-model="form.ninfluence" @change="selectChange2" placeholder="请选择风险影响" class="input2">
                        <el-option v-for="(option,index) in optiond" :key="option.id" :label="option.sname" :value="option.nscore"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_second" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险分值：">
                    <el-input v-model="form.nscore" auto-complete="off" placeholder="不可编辑，自动计算出，根据R=L*S" readonly class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险等级：">
                    <el-input v-model="form.ngradename" auto-complete="off" placeholder="不可编辑" readonly class="input"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :inline="false" ref="sub5" label-width="120px">
                <el-form-item label="风险矩阵：">
                    <risk-matrix :data="riskTableRow" :fsgl="fsgl" :yxcd="yxcd"></risk-matrix>
                </el-form-item>
                <el-form-item label="报告类型：" v-show="isReportType" prop="sreporttype">
                    <el-select style="width: 100%" v-model="form.sreporttype" placeholder="请选择报告类型">
                        <el-option v-for="(option, inedx) in optione" :key="option.scode" :label="option.sname" :value="option.scode"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        <!-- 3 -->
        <p class="title1">风险分析</p>
        <el-form :model="form" :inline="false" ref="sub6" label-width="120px">
            <el-form-item label="采取措施：" prop="smeasures">
                <el-input type="textarea" placeholder="请输入采取措施..." maxlength="1000" @change="descInput_smeasures" v-model="form.smeasures"></el-input>
            </el-form-item>
            <el-form-item label="应对建议：" prop="sproposal">
                <el-input type="textarea" placeholder="请输入应对建议..." maxlength="1000" @change="descInput_sproposal" v-model="form.sproposal"></el-input>
            </el-form-item>
            <!-- <div v-show="isCheckbox" style="marginLeft: 38px;marginBottom: 15px;">
                <bulk-orderser v-show="riskbulkOrderser" :data="comtree2" :newThis="newThis"></bulk-orderser>
                <el-checkbox :disabled="readonly2" v-model="checkbox" @change="riskReleaseVo">下达</el-checkbox>
            </div>           -->
        </el-form>
        <!-- 4 -->
        <div slot="footer" class="dialog-footer">
            <el-row type="flex" justify="end">
                <el-col :span="0.1">
                    <!-- <el-button type="primary" v-show="isBtn" @click="saveClick('save')">保 存</el-button> -->
                    <el-button type="success" v-show="isBtn2" @click="saveClick('sub3')">提 交</el-button>
                    <!-- <el-button type="info" v-show="isBtn3" @click="riskCloseClick">风险关闭</el-button> -->
                    <el-button @click="resetClick('sub2','sub3','sub4','sub5','sub6')">取 消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
// 引用的风险矩阵
import riskMatrix from "@v/riskControlSystem/sjzRiskControl/riskMatrix"
// 引用的tools.js文件
import tools from "utils/tools"
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
export default {
    components:{
        riskMatrix
    },
    props: {
        data: Object,
        newThis: Object,
        number: Number,
        riskTableRow : Array,
        fsgl: Object,
        yxcd: Object,
    },
    data(){
        return {
            isBtn2: true,
            isReportType : true,
            riskProbability: false,
            heights: "300px",
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
                ngradename: "",              // 风险等级（只读）
                sreporttype: ""             // 报告类型
            },
            num: "", title: "",
            optionl: [], tableData: [], optione: [],            // 报告类型数组（请求的数据）
            optiond: [], elements : [], optiong: [], options: []
        }
    },
    created(){
        this.getFormInformation() ;
        // 填报部门
            this.form.departmentname = this.$store.getters.user.dept[0].sname ;
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
    watch: {
        number(){
            // debugger
            this.getFormInformation();
            // 全局控制选择的报告类型0不显示，1显示
            this.reporttype = this.$store.getters.user.globalparam[0].reporttype ;
            if(this.reporttype){
                this.isReportType = true ;
            }else{
                this.isReportType = false ;
            }
        }
    },
    methods: {
        descInput_sriskname(){},
        descInput_sriskdescription(){},
        descInput_smeasures(){},
        descInput_sproposal(){},
        /**
         * 提交
         */
        saveClick(value){
            debugger
            let me = this ;
            let params = mini.getParams(me, value) ;               // 获取请求参数
            // 有没有空的  
            if(!me.isEmpty(me)){
                me.$message({message:'请填写完整再提交哦！',type: "warning"});
            } else {
            // 提交
                me.riskdistinguishRequest(params) ;      
            }      
        },
        // empty 判断提交的时候有没有空的  空则不提交  并且提示
        isEmpty(me){
            for(let keys in me.form){
                if(!me.form[keys] && (me.form[keys]=="" || me.form["nprobability"]==0 || me.form["ninfluence"]==0)){
                    return false ;
                }
            }
            return true ;   
        },
        // 提交请求
        riskdistinguishRequest(params){
            let me = this ;
            riskdistinguish_update(params).then(res => { 
                debugger
                if(res.data.code === 200){
                    me.$message({message: res.data.msg, type: "success"}) ;
                    me.newThis.newThis.setTreeTableRequest() ;
                }else{
                    me.$message.error(res.data.msg) ;
                }
                // me.newThis.axiosJson() ;
            });
        },
        /**
         * 取消
         */
        resetClick(){
            this.newThis.number = 0 ;
            this.newThis.dialogFormVisible = false;
        },
        /**
         * 赋值
         */
        getFormInformation(){ 
            for(let key in this.data){
                this.form[key] = this.data[key]
            }
        },
        /**
         * 发生概率选择器  触发
         */
        selectChange(val){ 
            this.nscoreCalculate();
        },
        /**
         * 影响程度选择器  触发
         */ 
        selectChange2(val){
            this.nscoreCalculate();
        },
        /** 
         * 风险分值自动计算
         */
        nscoreCalculate(){ 
            if(this.form.nprobability == '' || this.form.ninfluence == ''){
                this.form.nscore = "" ;
            }else{
                this.form.nscore = this.form.nprobability * this.form.ninfluence ;
                // 风险等级请求 
                this.riskmatrixRequest(this.form.nscore) ;
            }
        },
        /**
         * 风险等级请求 
         */
        riskmatrixRequest(num){
            let me = this ;
            let params = {
                score : num
            }
            riskmatrix(params).then(res => {
                if(res.data.code === 200){ 
                    me.optiong = res.data.data ;
                    me.form.gradename = res.data.data[0].sname ;
                }
            });
        },
        // 风险发生概率 按钮 的事件
        probability_first(){
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
            this.riskProbability = true ;
            this.title = "风险影响程度" ;
            // 列
            this.elements = [] ;
            this.elements = this.yxcd.columns ;
            // 行
            this.tableData= this.yxcd.rows;
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
.input{
    width: 330px;
}
.input2 {
    width: 260px;
}
.textarea {
    width: 810px;
    min-width: 180px;
    max-width: 810px;
    /* width: 100%; */
}
</style>
