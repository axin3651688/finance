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
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入风险名称" class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险类型：">
                    <el-select v-model="form.region" placeholder="请选择风险类型" class="input">
                        <el-option label="风险一" value="1"></el-option>
                        <el-option label="风险二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="填报部门：">
                    <el-input v-model="form.department" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
                <el-form-item label="填报人：">
                    <el-input v-model="form.person" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :inline="false" label-width="120px">
                <el-form-item label="风险概述：">
                    <el-input type="textarea" v-model="form.textarea" placeholder="请输入风险概述..."></el-input>
                </el-form-item>
            </el-form>
        <!-- 2 -->
        <p class="title1">风险分析</p>
            <el-form :model="form" :inline="true" label-width="120px">
                <el-form-item label="风险发生概率：">
                    <el-input v-model="form.probability" auto-complete="off" placeholder="请输入风险概率" class="input2"></el-input>
                    <el-button type="success" @click="probability_first" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险影响程度：">
                    <el-input v-model="form.impact" auto-complete="off" placeholder="请选择风险影响" class="input2"></el-input>
                    <el-button type="success" @click="probability_second" plain>参照</el-button><!-- 内层弹框 -->
                </el-form-item>
                <el-form-item label="风险分值：">
                    <el-input v-model="form.score" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
                <el-form-item label="风险等级：">
                    <el-input v-model="form.level" auto-complete="off" readonly class="input"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :inline="false" label-width="120px">
                <el-form-item label="风险矩阵：">
                    <risk-matrix :data="riskTableRow"></risk-matrix>
                </el-form-item>
                <el-form-item label="报告类型：">
                    <el-select style="width: 100%" v-model="form.report" placeholder="请选择报告类型">
                        <el-option label="报告类型一" value="1"></el-option>
                        <el-option label="报告类型二" value="2"></el-option>
                        <el-option label="报告类型三" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        <!-- 3 -->
        <p class="title1">风险分析</p>
        <el-form :model="form" :inline="false" label-width="120px">
            <el-form-item label="采取措施：">
                <el-input type="textarea" placeholder="请输入采取措施..." v-model="form.measures"></el-input>
            </el-form-item>
            <el-form-item label="应对建议：">
                <el-input type="textarea" placeholder="请输入应对建议..." v-model="form.advice"></el-input>
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
import riskMatrix from "@v/riskControlSystem/riskMatrix";
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
            form: {
                name: "",           // 风险名称
                region: "",         // 风险类型
                department: "",     // 填报部门（只读）
                person: "",         // 填报人（只读）
                textarea: "",       // 风险概述
                measures: "",       // 采取措施
                advice: "",         // 应对建议
                probability: "",    // 风险发生概率
                impact: "",         // 风险影响程度
                score: "",          // 风险分值（只读，自动计算，根据R=L*S）
                level: "",          // 风险等级（只读）
                report: ""          // 报告类型
            }
        }
    },
    created(){ 
        // debugger
    },
    mounted(){
        
    },
    computed: {
        
    },
    methods: {
        // 风险发生概率 按钮 的事件
        probability_first(){
            debugger
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
            debugger
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
