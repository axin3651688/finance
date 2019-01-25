<template>
    <div class="shuju">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!-- 手工填报页面 -->
            <el-tab-pane label="手工填报" name="second">
                <!-- <el-form ref="form" :model="form" label-width="80px"> -->
                    <!-- <el-form-item label="匹配报表" prop="region" class="options">
                        <el-select v-model="form.region" placeholder="请选择" >
                            <el-option label="资产负债表" value="fuzhai"></el-option>
                            <el-option label="现金流量表" value="xianjin"></el-option>
                            <el-option label="利润表" value="lirun"></el-option>
                        </el-select>
                    </el-form-item> -->
                <!-- </el-form> -->
                <!-- <div class="dropdown">匹配报表:</div>
                <el-dropdown trigger="click" v-if="list.length">
                    <el-button type="text" class="underline">
                        <span class="pleaseoptions">{{dropdown}}</span>
                        <i class="el-icon-arrow-down el-icon_right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item,index) of list"
                        @click.native="StemplateDownload(list,index)"
                        :key="index"   
                    >{{item.title}}
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
                <!-- <BiModule :handsontanleapi="api"></BiModule> -->
                <!-- <Itable></Itable> -->
                <HandsonTable></HandsonTable>
            </el-tab-pane>
            <!-- 模板的下载与导入 -->
            <el-tab-pane label="Excel导入" name="first">
                <el-button size="small" type="primary" @click="templateDownload" class="template">模板下载</el-button>
                    <el-dialog
                    title="模板操作"
                    :visible.sync="isShow"
                    width="30%"
                    >
                    <!-- <span>这是一段信息</span> -->
                    <!-- <el-checkbox-group v-model="checked"> -->
                        <el-checkbox v-for="item of list" :key="item.id" class="checkbox" @change="test($event, item)">{{item.title}}</el-checkbox>
                    <!-- </el-checkbox-group> -->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="Download">确 定</el-button>
                    </span>
                </el-dialog>
                <el-upload
                    class="upload-demo upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    >
                    <el-button size="small" type="primary">文件选择</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
                    <div class="dropdown">匹配报表:</div>
                <el-dropdown trigger="click" v-if="list.length" class="options">
                    <el-button type="text" class="underline">
                        <span class="pleaseoptions">{{dropdown}}</span>
                        <i class="el-icon-arrow-down el-icon_right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item,index) of list"
                         @click.native="EtemplateDownload(list,index)"
                        :key="index"   
                    >{{item.title}}
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                 <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="文件名称:" class="button">
                        <el-input v-model="excelname" class="input" :disabled="edit"></el-input>
                    </el-form-item>
                </el-form>
                <el-button class="button" @click="uploadFiles">导入</el-button>

                <!-- <Itable v-show="isview"></Itable> -->
                <!-- <HandsonTable v-if="item.length"></HandsonTable> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {ImportExcel} from "@/api/fill.js"
import Itable from '@c/Itable.vue'
import HandsonTable from '@c/HandsonTable.vue'
// import BiModule from "@v/BiModule.vue";
import { log } from 'util';
// import XLSX from 'xlsx'
// import "@/excel/xlsx.full.min.js"
export default {
    components:{
            Itable,
            HandsonTable,
            // BiModule
        },
    data() {
        return{
            id:7,
            aa:"save",
            // api:'cnbi/json/source/tjsp/bb.json',
            options:"这是导入页面给的填报模板",
            item:{},
            files:null,
            dropdown:'请选择',
            dropdownid:null, //匹配的id
            checked:false,//复选框的状态
            activeName2: 'second',//tab默认显示
            // templateDownload: false,
            isShow:false,
            excelname:'加载文件名称 不可编辑',
            imgfd:null,
            uploadfile:null,
            edit: true,//不可编辑
            list:[],
            form: {
                // name: '',
                region: '',
                // date1: '',
                // date2: '',
                // delivery: false,
                // type: [],
                // resource: '',
                // desc: ''
            }
        }
    },
    created(){
        // this.api = this.item.api
        this.axios.get('/api/template').then((res) => {
            this.list = res.data.data
            // console.log(this.list)
        })
        // debugger
        console.log("t页面",this.item)
    },
    methods: {
        // matching(){
            // debugger
            // let arr = []
            // this.item.config.columns.forEach(i=>{
            //     arr.push(i.text)
            // })
            // this.settings.colHeaders = arr
            // this.settings.data = this.item.datas
            // this.del = this.flags
            // debugger
            // if (this.item.matching && typeof this.item.matching == "function") {
            //     return this.item.matching(this);
            // }
        // },
        test(val, item){
            console.log('option:', val)
            console.log('option data:', item)
        },

        handleClick(tab, event) {
            console.log(tab, event);
        },
        beforeAvatarUpload(file) {
            debugger
            this.excelname = file.name
            console.log(file);
            let fd = new FormData();
            fd.append('file', file);
            // fd.append('userId', 538);
            // fd.append('id',this.dropdownid)
            fd.append('action',this.aa );
            fd.append('cubeId', this.id)
            fd.append("dims","{'company':'1010','period':'201901'}")
            this.imgfd = fd;
            // this.submitUpload(fd);
            this.uploadfile = fd
            // console.log("fd",this.uploadfile)
            return true
        },
        // 导入按钮的请求
        // submitUpload(file) {
        //     debugger   
        //     if (this.uploadfile) {
        //         ImportExcel(this.uploadfile).then(res => {
        //             console.log('res', res);

        //         });
        //     }
        // },
        submitUpload(file) {
            // debugger   
            var regExp = /([\u4e00-\u9fa5]+)/ig;
             var title = this.excelname;  //[\u4e00-\u9fa5]
            var titlename = title.match(regExp)
            console.log(title)
            if(titlename[0] != this.dropdown){
                this.$message({
                    message:"模板匹配不正确 导入失败",
                    type: 'error'
                });   
            }else{
                // this.$message("模板匹配 没有数据")
                console.log(titlename[0])
                ImportExcel(this.files).then(res => {
                    debugger
                    console.log('res', res);
                    if(res.status===200 && res.data.data.items){
                        this.item = res.data.data.items[0].rows
                        console.log("item的数据",this.item)
                        this.$message({
                            message:"模板匹配 导入成功",
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message:"数据异常",
                            type: 'error'
                        })
                    }
                    
                    // this.settings.data = res.data.data.items[0].rows
                    // console.log(this.settings.data)

                });
            }
        },
        uploadFiles(){
            this.submitUpload(this.uploadfile) 
        },
        templateDownload(){
            this.isShow = true;
            console.log(list)
            this.axios.get('/api/template').then((res) => {
                console.log(res)
                this.list = res.data.data
                console.log(this.list)
            })
        },
        // 手工填报的匹配报表
        // StemplateDownload(list,index){
        //     debugger
        //     console.log(this.item)
        //     this.dropdown = list[index].title
        //     this.dropdownid = list[index].id
        //     console.log(this.dropdownid)
        // },
        // excel导入的匹配报表
        EtemplateDownload(list,index){
            this.dropdown = list[index].title
            this.dropdownid = list[index].id
            this.uploadfile.append("templateId",this.dropdownid)
            this.files = this.uploadfile
            console.log("uu",this.files)
        },
        // 取消
        cancel(){
            this.isShow = false;
        },
        // 确定
        Download(){
            this.isShow = false;
            console.log(111)
        },
    }
}

</script>
<style scoped >
    .button,.options{
        margin-top:20px;
    }
    .template{
        float: left;
        margin-right:20px;
    }
    .input{
        width: 220px;
    }
    .checkbox{
        display: block;
        color: #606266;
        font-size: 24px;
    }
    .dropdown{
        display: inline;
        color: #606266;
        font-size: 16px;
    }
    .underline{
        border:1px solid #dcdfe6;
        width: 220px;
        margin-left:10px;
        background-color: #f5f7fa;
    }
    .pleaseoptions{
        float: left;
        margin-left: 20px;
    }
    .el-icon_right{
        float: right;
        margin-right: 10px;
    }
</style>
<style lang="scss">
    .shuju{
        .el-checkbox+.el-checkbox {
            margin-left: 0px; 
        }
        .el-dialog__body {
            padding:10px 20px 30px 20px;
        }
        .el-button--text {
            color:#606266;
        }
        .el-form-item__label {
            text-align: left;
        }
        label {
            font-weight:normal;
            font-size: 16px;
        }
    }
</style>



