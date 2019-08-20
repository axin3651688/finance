<!--
    name: sjz
    说明：风险识别导入按钮的弹出框组件
-->
<template>
    <div id="importDialog">
        <!-- 弹出框 -->
        <el-dialog 
        title="风险识别导入" 
        :visible.sync="dialogFormVisible4" 
        :close-on-click-modal="false"
        :show-close="false" 
        width="680px" 
        style="marginTop: -8vh;height:600px;overflow: hidden;">
            <div style="height:1px;border:1px solid #dcdfe6;marginTop: -20px;marginBottom:10px"></div>
            <el-form :model="formInline" label-width="80px" :inline="true">
                <el-form-item label="默认模板">
                    <el-input v-model="formInline.templateA" readonly></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formInline.templateB" readonly></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="downloadBtn" type="text" @click="downloadTemplate">模板下载</el-button>
                </el-form-item>
            </el-form>
            <!-- 上传 -->
            <el-upload
            class="upload_dialog upload"
            action="/zjb/risk_excel/excel_input"
            :show-file-list="false"
            :data="uploadData"
            drag
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip el-upload__tishi">只能上传Excel/xlsx/xls文件，且不超过20M</div>
            </el-upload>
            <!-- 按钮 -->
            <div class="class_btn">
                <el-button class="downloadBtn" size="medium" type="primary" round @click="cancelClick">确 认</el-button>
                <el-button class="downloadBtn" size="medium" round @click="confirmClick" :disabled="disabled">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// Qs是axios里面自带的
import Qs from 'qs'
export default {
    props: {
        newThis: Object
    },
    data() {
        return {
            dialogFormVisible4: true ,
            disabled: false ,
            isName: false ,
            isType: false ,
            isCode: false ,
            errMsg: "" ,
            formInline: {
                templateA: "风险识别" ,
                templateB: ""
            },
            uploadData: {                               // 导入请求额外数据
                company: "",
                period: "",
                templateScode: "risk_distinguish"
            }  
        }
    },
    created() {
        let $params = this.$store.state.prame.command; 
        this.uploadData.company = $params.company ;
        this.uploadData.period = this.getPeriod($params) ;
    },
    methods: {
        /**
         * @description 模板下载
         */
        downloadTemplate(){ 
            const me = this ; 
            // 参数RiskDistinguish
            let params = { stype: "RiskDistinguish" } ;
            // 请求方法
            me.axios.post('/zjb/template_excel/excel_init_export', Qs.stringify(params),  {responseType:'blob'}).then((res) => {  
                if(res.status === 200) {
                    // let name = decodeURI(res.headers["content-disposition"]) ;
                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob);
                    } else {
                        let elink = document.createElement("a");
                        elink.download = '风险识别' + '.xlsx' ;
                        elink.style.display = "none";
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        document.body.removeChild(elink);
                        me.$message({ message: "模板下载成功！", type: "success" }) ;
                    }
                } else {
                    // me.$message.error(res.data.msg) ;
                    me.$message.error('发生了个小意外！请联系开发人员哦！') ;
                }
            });
        },
        /**
         * @description 导入按钮 *(之前)
         */
        beforeAvatarUpload(file){ //debugger
            let me = this ;
            let dd = "风险识别" ;
            // 信息
            let $params = me.$store.state.prame.command; 
            // 以 '.' 小数点分割成数组
            let cc = file.name.split('.') ; 
            // 选中的导入模板名称
            me.formInline.templateB = cc[0] ;
            // 判断模板名称是否匹配
            // if(cc[0] !== "风险识别") {
            //     me.isName = false ;
            //     me.$message({ message: "模板名称不匹配，请重新选择模板！", type: "warning" }) ;
            // } else {
            //     me.isName = true ;
            // }
            if(cc[0].indexOf(dd) !== -1) {
                me.isName = true ;
            } else {
                me.isName = false ;
                me.$message({ message: "模板名称不匹配，请重新选择模板！", type: "warning" }) ;
            }
            // return false ;
            // 判断模板类型是否匹配
            if(cc[1] === 'xlsx' || cc[1] === 'xls') {
                me.isType = true ;
                me.uploadData = {
                    company: $params.company,
                    period: me.getPeriod($params),
                    templateScode: "risk_distinguish"
                }
            } else {
                me.isType = false ;
                me.$message({ message: "模板类型不匹配！只能上传Excel/xlsx/xls文件！", type: "warning" }) ;
            }
            // 判断以上条件只要有一个不匹配，就不成功
            if(!me.isName || !me.isType) {
                return false ;
            }
        },
        /**
         * @description 导入按钮 *(成功之后)文件上传成功时的钩子
         */
        handleAvatarSuccess(response, file, fileList){ 
            let me = this ; 
            if(response.code === 200) {
                let cc = document.getElementsByClassName('el-icon-upload')[0] ;
                cc.style.color = "#1790ff" ;
                me.isCode = true ;
                me.disabled = true ;
            } else {
                me.isCode = false ;
                me.disabled = false ;
                me.errMsg = response.msg ;
                me.$message.error(response.msg) ;
                // me.$message.error('数据导入失败！请联系经邦开发人员！') ;
            }
        },
        /**
         * @description 确认按钮
         */
        cancelClick(){
            let me = this ;
            if(!me.disabled && !me.isName && !me.isType && me.templateB != "") {
                me.$message({ message: "请上传Excel文件", type: "warning" }) ;
                return false ;
            }
            if(!me.isName) {
                me.$message({ message: "模板名称不匹配，请重新选择模板！", type: "warning" }) ;
                return false ;
            }
            if(!me.isType) {
                me.$message({ message: "模板类型不匹配！只能上传Excel/xlsx/xls文件，且不超过20M！", type: "warning" }) ;
                return false ;
            }
            if(!me.isCode) {
                me.$message(me.errMsg) ;
                return false ;
            }
            if(me.isName && me.isType && me.isCode) {
                me.formInline.templateB = "" ;
                me.newThis.dialogFormVisible3 = false ;
                me.newThis.axiosJson() ;
                me.errMsg = "" ;
                me.$message({ message: "数据导入成功！", type: "success" }) ;
            }
        },
        /**
         * @description 取消按钮
         */
        confirmClick(){
            let me = this ;
            me.isName = true ;
            me.isType = true ;
            me.isCode = true ;
            me.formInline.templateB = "" ;
            me.newThis.dialogFormVisible3 = false ;
        },
        /**
         * @description 日期处理
         */
        getPeriod($params){ 
            let period, mm ;
            if($params.month > 0 && $params.month < 10) {
                mm = '0' + $params.month ;
            } else {
                mm = $params.month ;
            }
            return $params.year + mm ;
        }
    }
}
</script>
<style scoped>
.el-upload__tishi {
    font-size: 12px;
}
.upload i{
    margin-top: 70px;
} 
.class_btn {
    text-align: right ;
    margin-bottom: -10px;
}
</style>
<style>
.upload .el-upload .el-upload-dragger {
    width: 640px ;
    height: 250px ;
    margin-bottom: 10px ;
}
</style>
