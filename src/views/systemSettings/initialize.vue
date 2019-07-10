<template>
    <!--
        name: sjz
        说明：初始化管理
    -->
    <div id="initialize">
        <div class="initialize_border">
            <el-form label-width="100px" :model="form">
                <el-form-item label="模板下载：">
                    <el-button @click="uploadClick">模 板 下 载</el-button>
                </el-form-item>
                <el-form-item label="模板匹配：">
                    <el-select class="form_select" v-model="form.moduleMatching" placeholder="请选择匹配模板">
                        <el-option v-for="item in items" :key="item.id" :label="item.text" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="本地文件：">
                    <el-input class="form_select" v-model="form.moduleLocal" readonly></el-input>
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
                </el-form-item>
                <el-form-item class="form_btn">
                    <el-button type="primary" plain @click="importClick">导 入</el-button>
                    <el-button type="warning" plain @click="resetClick">重 置</el-button>
                </el-form-item>
            </el-form>
            <!-- 
                下载模板弹出框
             -->
            <el-dialog
            class="menu_dialog"
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            :show-close="false"
            :close-on-click-modal="false">
                <el-checkbox-group v-model="checkbox"  @change="handleCheckAllChange">
                    <el-checkbox class="form_checkbox" v-for="item in items" :key="item.id" :label="item.type" border>{{ item.text }}</el-checkbox>
                </el-checkbox-group>
                <span slot="footer" class="dialog-footer dialog_btn">
                    <el-button type="primary" @click="determineClick">下 载</el-button>
                    <el-button @click="cancelClikc">关 闭</el-button>
                </span>
            </el-dialog> 
        </div>
    </div>
</template>
<script>
// Qs是axios里面自带的
import Qs from 'qs'
export default {
    data() {
        return {
            // 弹出框的显示与隐藏的控制
            dialogVisible: false , 
            // 弹出框的标题
            title: "模板下载" ,
            // 弹出框复选框状态
            checkbox: [] ,
            // form表单
            form: {
                moduleMatching: "",
                moduleLocal: ""
            },
            // 模板匹配下拉选数组
            items: [
                { id: "1", text: "人员管理模板", type: "PersonnelManagement", name: "人员管理" },
                { id: "2", text: "风险发生概率", type: "q", name: "风险发生概率" },
                { id: "3", text: "风险影响程度", type: "s", name: "风险影响程度" },
                { id: "4", text: "风险策略模板", type: "RiskStrategy", name: "风险策略" },
                { id: "5", text: "风险类型模板", type: "RiskTypes", name: "风险类型" }
            ],
            // 上传的参数
            uploadData: {
                company: "",
                period: "",
                templateScode: ""
            }
        }
    },
    created(){

    },
    methods: {
        // 上传之前的钩子
        beforeAvatarUpload(file){

        },
        // 文件上传成功时的钩子
        handleAvatarSuccess(response, file, fileList){

        },
        // 导入按钮
        importClick(){

        },
        // 重置按钮
        resetClick(){
            
        },
        // 下载模板按钮
        uploadClick(){
            this.dialogVisible = true ;
        },
        // 弹出框内关闭按钮
        cancelClikc(){
            this.dialogVisible = false ;
            this.checkbox = [] ;
        },
        // checked 触发器
        handleCheckAllChange(value){
            // 复选变单选，以后在开放（批量下载时用到）
            if(value.length > 1) {
                value = value.filter((res, index) => {
                    if(index === value.length-1)return res ;
                });
            }
            this.checkbox = value ;
        },
        // 弹出框内下载按钮
        determineClick(){ 
            const me = this ;
            let len = me.checkbox.length ;
            let sname = me.items.filter(res => {
                if(me.checkbox[0] === res.type)return res ;
            });
            let params = {  
                stype: me.checkbox[0]
            }
            if(len === 0) {
                me.$message({ message: "请选择要下载的模板！", type: "warning" }) ;
            } else {
                // 请求方法
                me.axios.post('/zjb/excel_init_export', Qs.stringify(params),  {responseType:'blob'}).then((res) => {
                    if(res.status === 200) {
                        let blob = new Blob([res.data], {
                            type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });
                        if (window.navigator.msSaveOrOpenBlob) {
                            navigator.msSaveBlob(blob);
                        } else {
                            let elink = document.createElement("a");
                            elink.download = sname[0].name + '.xlsx' ;
                            elink.style.display = "none";
                            elink.href = URL.createObjectURL(blob);
                            document.body.appendChild(elink);
                            elink.click();
                            document.body.removeChild(elink);
                            me.$message({ message: "模板下载成功！", type: "success" }) ;
                        }
                    } else {
                        me.$message.error('发生了个小意外！请联系开发人员哦！') ;
                    }  
                })
            }
        }
    }
}
</script>
<style scoped>
    .initialize_border {
        width: 620px;
        height: 500px;
        margin-top: 20px;
        /* border: 1px solid #000; */
        /* margin: 0 auto; */
    }
    .form_select {
        width: 500px;
    }
    .upload i{
        margin-top: 60px;
    }
    .form_btn {
        text-align: right;
        margin-right: 20px;
    }
    .form_checkbox {
        float: left;
        width: 526px;
        margin-left: 10px;
    }
</style>
<style>
.el-form .upload .el-upload .el-upload-dragger{
    width: 500px ;
    height: 250px ;
    margin-bottom: -10px ;
}
.menu_dialog .el-dialog__header {
    background: #409EFF ;
    padding: 10px 20px 10px 20px ;
}
.menu_dialog .el-dialog__body {
    padding: 20px 20px 0px 20px ;
}
.menu_dialog .el-textarea .el-textarea__inner{
    height: 100px;
}
</style>
