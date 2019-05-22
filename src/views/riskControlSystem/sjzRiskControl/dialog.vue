<template>
<!--
    name : sjz
    time : sjz 2019/5/6 9:40:00
    说明 : 风险识别的弹出框组件 
-->
    <div id="dialog">
        <!-- 内层弹出框 -->
        <el-dialog width="660px" style="height: 560px;" :title="title" :visible.sync="riskProbability" append-to-body>
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
            <el-form :model="form" :inline="true" label-width="120px" >
                <el-form-item label="风险名称：">
                    <el-input v-model="form.sriskname" auto-complete="off" placeholder="请输入风险名称" class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险类型：">
                    <el-select v-model="form.srisktype" placeholder="请选择风险类型" class="input">
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
            <el-form :model="form" :inline="false" label-width="120px">
                <el-form-item label="风险概述：">
                    <el-input type="textarea" v-model="form.sriskdescription" placeholder="请输入风险概述..."></el-input>
                </el-form-item>
            </el-form>
        <!-- 2 -->
        <p class="title1">风险分析</p>
            <el-form :model="form" :inline="true" label-width="120px">
                <el-form-item label="风险发生概率：">
                    <el-select v-model="form.nprobability" @change="selectChange" placeholder="请选择风险概率" class="input2">
                        <el-option v-for="(option,index) in optionl" :key="option.id" :label="option.sname" :value="option.nscore"></el-option>
                    </el-select>
                    <el-button type="success" @click="probability_first" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险影响程度：">
                    <el-select v-model="form.ninfluence" @change="selectChange2" placeholder="请选择风险影响" class="input2">
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
            <el-form :model="form" :inline="false" label-width="120px">
                <el-form-item label="风险矩阵：">
                    <risk-matrix :data="riskTableRow" :fsgl="fsgl" :yxcd="yxcd"></risk-matrix>
                </el-form-item>
                <el-form-item label="报告类型：">
                    <el-select style="width: 100%" v-model="form.sreporttype" placeholder="请选择报告类型">
                        <el-option v-for="(option, inedx) in optione" :key="option.scode" :label="option.sname" :value="option.scode"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        <!-- 3 -->
        <p class="title1">风险分析</p>
        <el-form :model="form" :inline="false" label-width="120px">
            <el-form-item label="采取措施：">
                <el-input type="textarea" placeholder="请输入采取措施..." v-model="form.smeasures"></el-input>
            </el-form-item>
            <el-form-item label="应对建议：">
                <el-input type="textarea" placeholder="请输入应对建议..." v-model="form.sproposal"></el-input>
            </el-form-item>
            <div style="marginLeft: 38px;marginBottom: 15px;">
                <el-checkbox v-model="form.checked">下达</el-checkbox>
            </div>           
        </el-form>
        <!-- 4 -->
        <div slot="footer" class="dialog-footer">
            <el-row type="flex" justify="end">
                <el-col :span="0.1">
                    <el-button type="primary">保 存</el-button>
                    <el-button type="success">提 交</el-button>
                    <el-button type="info">风险关闭</el-button>
                    <el-button>取 消</el-button>
                </el-col>
            </el-row>
        </div>   
    </div>
</template>
<script>
// 引用的风险矩阵
import riskMatrix from "@v/riskControlSystem/sjzRiskControl/riskMatrix";
// 引用接口
import { risktype, riskreporttype, riskmatrix } from "~api/cube.js";
export default {
    components:{
        riskMatrix
    },
    props:["riskTableRow","fsgl","yxcd"],
    data(){
        return {
            riskProbability: false,
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
            }
        }
    },
    created(){ 
        // debugger
        let $params = this.$store.state.prame.command;
        let sfilluser = this.$store.getters.user.user.userName;
        let departmentname = this.$store.getters.user.dept[0].sname ;
        // 自动获取登录人作为填报人
            this.form.sfilluser = sfilluser ;
        // 自动获取当前用户的所属部门
            this.form.departmentname = departmentname ;
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
        
    },
    methods: {
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
                    me.optiong = res.data.data[0] ;
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
