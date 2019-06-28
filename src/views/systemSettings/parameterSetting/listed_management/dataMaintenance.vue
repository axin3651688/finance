<template>
    <!--
        name: sjz
        说明：参数设置-> 上市指标数据维护-> 数据维护
    -->
    <div id="listedSetting">
        <!-- <div class="listedSetting_btn">
            <el-button @click="uploadClick">文件加载</el-button>
            <el-input class="listedSetting_input" placeholder="显示加载文字名称" v-model="input" :readonly="readonly"></el-input>
        </div> -->
        <el-upload
            class="upload-data"
            style="display:flex;"
            ref="upload"
            :data="form"
            action="/zjb/risk_excel/excel_listedcompany_import"
            :on-success="handleSuccess"
            :before-upload="handleUpload"
            :auto-upload="autoUpload"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :show-file-list="true"
            >
                <el-button slot="trigger" class="listedSetting_btn">文件加载</el-button>
                <el-input v-show="is_show" class="listedSetting_input" placeholder="显示加载文字名称" v-model="input" readonly></el-input>
        </el-upload>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="公司选择：">
                <el-select class="listedSetting_select" v-model="form.company" placeholder="请选择上市公司">
                    <el-option v-for="(item,index) in itemc" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据类型：">
                <el-select class="listedSetting_select" v-model="form.type" placeholder="请选择数据类型">
                    <el-option v-for="(item,index) in itemd" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报表类型：">
                <el-select class="listedSetting_select" v-model="form.tableType" placeholder="请选择报表类型">
                    <el-option v-for="(item,index) in items" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="listedSetting_btn2" @click="downLoadOfTemplate"><i class="iconfont icon-daoru"></i>模板下载</el-button>
                <el-button @click="onSubmit"><i class="iconfont icon-daoru"></i>数据导入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {downLoadTemplate} from "~api/cube"
export default {
    data(){
        return {
            input: "",      // 文件加载的名字
            autoUpload: false, // 是否在选取文件后立即进行上传 默认为 true
            is_show: true,      // 显示与隐藏
            stype: 1,       // 状态
            form: {
                company: "",
                type: "",
                tableType: "",
                period: ""
            },
            itemc: [],      // 公司选择：
            itemd: [        // 数据类型：
                { scode: "sj", sname: "实际数" },
                { scode: "ys", sname: "预算数" },
                { scode: "yc", sname: "预测数" },
                { scode: "jdyc", sname: "季度预测数" }
            ],      
            items: [        // 报表类型
                { scode: "zcfzb", sname: "资产负债表" },
                { scode: "lrb", sname: "利润表" } ,
                { scode: "xjllb", sname: "现金流量表" }
            ]
        }
    },
    methods: {
        downLoadOfTemplate () {
            let me = this;
            downLoadTemplate().then(res => {
                const content = res.data;
                const blob = new Blob([content], {
                    type: "application/vnd.ms-excel"
                });
                let str = res.headers["content-disposition"];
                let index = str.lastIndexOf(".");
                let h = str.substring(index + 1, str.length);
                // let h = "xls";
                // let index2 = str.lastIndexOf("=");
                // let name = str.substring(index2 + 1,index);
                let name = "上市公司财务报表模板";
                const fileName = name + "." + h;
                if ("download" in document.createElement("a")) {
                    // 非IE下载
                    const elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                } else {
                    // IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
            });
        },
        // 文件上传成功时的钩子
        handleSuccess(response, file, fileList){
            // debugger
            if(file.response.code == 0){
                this.is_show = true ;
                this.stype = 0 ;
                this.$refs.upload.clearFiles() ;
                this.$message({ type: "warning", message: file.response.msg });
            }else{
                this.stype = 1 ;
                this.$message({ type: "success", message: file.response.msg });
            }
        },
        // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
        handleUpload(file){
            // debugger
            const isxlsx = file.type === '';
            if(!isxlsx){
                this.$message.error('上传文件只能是 xls|xlsx 格式!');
            }else{
                return isxlsx ;
            }
        },
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        handleChange(file, fileList){ 
            if(this.stype){
                this.is_show = false ;
                this.stype = 1 ;
            }else{
                this.is_show = true ;
                this.stype = 1 ;
            }
        },
        // 文件列表移除文件时的钩子 
        handleRemove(file, fileList){ 
            this.is_show = true ;
        },
        // 提交
        onSubmit(){
            // debugger
            if(this.form.company=="" || this.form.type=="" || this.form.tableType==""){
                this.$message({ message: "请填写完整！", type: "warning" }) ;
                return ;
            }
            let $params = this.$store.state.prame.command;
            this.form.period = this.getPeriod($params) ;
            this.$refs.upload.submit() ;
        },
        /**
         * @description 日期处理
         */
        getPeriod($params){
            let month = $params.month ;
            let year = $params.year ;
            if(month > 0 && month < 10){
                month = '0' + month ;
            }else {
                month = month ;
            }
            return year + month ;
        },
    }
}
</script>
<style scoped>
.listedSetting_btn {
    margin: 0 20px 10px 0
}
.listedSetting_input {
    width: 300px;
    /* margin-left: 20px; */
    /* margin-bottom: 22px; */
}
.listedSetting_select {
    margin-left: 18px;
    width: 300px;
}
.listedSetting_btn2 {
    margin-left: 70px;
}
.listedSetting_btn2 .icon-daoru {
    padding-right: 10px;
    color: #1790ff;
}
.upload-data {
    margin-bottom: 12px;
}
</style>
<style>
.upload-data ul li {
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    margin-top: 0px !important;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 10px 0 10px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 300px;
    position: fixed;
}
.upload-data ul li i {
    line-height: 30px;
}
</style>
