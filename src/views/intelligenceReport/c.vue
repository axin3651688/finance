<template>
    <div class="shuju">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!-- 手工填报页面 -->
            <el-tab-pane label="手工填报" name="second">
                <div class="manually_report">
                    <div class="dropdown">匹配报表:</div>
                    <el-dropdown trigger="click" v-if="list.length">
                        <el-button type="text" class="underline">
                            <span class="pleaseoptions">{{dropdown}}</span>
                            <i class="el-icon-arrow-down el-icon_right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(item,index) of list"
                            @click.native="matching(list,index,item)"
                            :key="index"   
                        >{{item.title}}
                        </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <hot-table  v-if="settings.data.length" :settings="settings" ref="hotTableComponent" :height=" heights" class="table"></hot-table>
                <!-- <BiModule v-show="show"></BiModule> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapGetters} from "vuex";
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable-pro';
import {ImportExcel,Inquire,save,download} from "@/api/fill.js"
export default {
    components:{
        HotTable,
    },
    props:["item"],
    data() {
        return{
            dataDict:[],//下拉的数据
            cubeId:null,//天津食品的id
            title:null,//下载模板的名称
            tableData:[],
            rowdata:false,//新增行按钮的默认显示状态
            fixed:null,//是不是三张主表
            templateId:null,//模板的id
            years:null,//年月的拼接
            row:[],
            // api:'null',
            options:"这是导入页面给的填报模板",
            files:null,
            dropdown:'请选择',
            heights: document.body.offsetHeight-360,
            subject:null,//匹配模板的subject
            dropdownid:null, //匹配的id
            checked:false,//复选框的状态
            activeName2: 'second',//tab默认显示
            isShow:false,
            excelname:'加载文件名称 不可编辑',
            imgfd:null,
            uploadfile:null,
            edit: true,//不可编辑
            list:[],
            form: {
                region: ''
            },
            newrow:false,//新增按钮的隐藏
            table:[],
            del:Function,
            delid:null,
            index:'',//  数据的索引
            show:false,
            flag:false,
            root: 'test-hot',
            settings: {
                data:  [],//数据，可以是数据，对象
               // startCols: 6,
                hiddenColumns:[],
               // minCols: 5,
                //maxCols: 20,
                rowHeaders: false,//行表头
                // colHeaders:   [],//表头数据
                nestedHeaders: [ 
                    [
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'I1',
                    'J2',
                    'K3',
                    'L4',
                    'M5',
                    'N6',
                    'N55',
                    'O0'
                    ],
                    [
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'I1',
                    'J2',
                    'K3',
                    'L4',
                    'M5',
                    'N6',
                    'N55',
                    'O0'
                    ]
    ],//多表头
                autoWrapRow: true, //自动换行
                fillHandle:false, //选中拖拽复制  true, false
                fixedColumnsLeft: 0,//固定左边列数
                fixedRowsTop: 0,//固定上边列数
                mergeCells: [],//合并
                columns: [],           
                manualColumnFreeze: true, //手动固定列
                manualColumnMove: true, //手动移动列
                manualRowMove: true,   //手动移动行
                manualColumnResize: true,//手工更改列距
                manualRowResize: true,//手动更改行距
                comments: true, //添加注释
                stretchH: 'none',//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
            },
        }
    },
    created(){
        this.axios.get('/api/template').then((res) => {
            this.list = res.data.data
            // console.log(res)
            this.cubeId = res.data.config.cube.cubeId
        })
    },
    mounted(){
    },
    computed: {
        ...mapGetters([
            "user",
            "year",
            "month",
            "company"
        ])
    },
    methods: {
   
    getHandsoneTableColType(type){
            if(type){
            if(type === "decimal"){
                // return value;
                return "numeric";
            }else if(type == "string"){
                return "text";
            }
            }
            return "text";
        },
        decimalDefaultRenderer(instance, td, row, col, prop, value, cellProperties) {
       
        },

        convert2HansoneTableColumns(columns){
            // columns.sort((a,b)=>a.sort-b.sort);
            debugger
            if(this.fixed===0){
                columns.push({id:"caozuo",text:"操作",type:"string"})
                this.rowdata = true
            }
            let newCoulmns = [],
            colHeaders=[],
            hiddenColumns = {
                indicators:false
            },
            hiddenCols = [];
            for(let i=0,len = columns.length;i<len;i++){
                let col = columns[i];
                if(col.hidden){
                    hiddenColumns.indicators = true;
                    hiddenCols.push(i);
                }else{
                    let cc = {
                        type: this.getHandsoneTableColType(col.type),  
                        data:col.id,
                    };
                    if(col.renderer || cc.source){
                        debugger
                        cc.renderer = col.renderer;
                        cc.source = col.source
                    }else{
                       if(col.type === 'decimal'){
                          cc.renderer = this.decimalDefaultRenderer;
                       }
                    }
                   
                    newCoulmns.push(cc);
                    colHeaders.push(col.text)
                }
            }
            hiddenColumns.columns = hiddenColumns;
            let me = this;
                this.settings.columns = newCoulmns;
                console.log("this.settings.columns",this.settings.columns)
                this.settings.cells = this.cells
               
                // this.settings.colHeaders = colHeaders
            this.settings.nestedHeaders =  [ 
                    [
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'I1',
                    'J2',
                    'K3',
                    'L4',
                    'M5',
                    'N6',
                    'N55',
                    'O0'
                    ],
                    [
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'I1',
                    'J2',
                    'K3',
                    'L4',
                    'M5',
                    'N6',
                    'N55',
                    'O0'
                    ]
    ]
     console.log("this.settings.nestedHeaders",this.settings.nestedHeaders,this.settings.colHeaders)
        },
        matching(list,index,item){
            debugger
            let date
            if(this.month<10){
                date = this.year +"0"+ this.month  
            }else{
                date = this.year+this.month
            }
            this.years = date
            this.dropdown = list[index].title
            this.dropdownid = list[index].sourceId
            this.fixed = list[index].fixed
            this.subject = list[index].subject
            this.templateId = list[index].templateId
            this.api = item.url
            let excelUploadParaDto = {
                // "company": "1001",
                // "period": "201806",
                // "subject": "0001",
                // "templateId":"3"
                "company": this.company,
                "period": this.years,
                "subject": this.subject,
                "templateId":this.templateId
            }
            console.log("excelUploadParaDto",excelUploadParaDto)
            Inquire(excelUploadParaDto).then(res=>{
                debugger
                console.log("查询",res)
                let columns = res.data.data.columns
                this.convert2HansoneTableColumns(columns);
                this.settings.data = res.data.data.rows
                console.log(this.settings.data)
            })
        },
        handleClick(tab, event) {
        //     console.log(tab, event);
        },
        beforeAvatarUpload(file) {
            debugger
            this.excelname = file.name
            let fd = new FormData();
            fd.append('file', file);
            fd.append('period', this.years);
            fd.append('user', this.user.user.username)
            fd.append('company',this.company)
            this.imgfd = fd;
            this.uploadfile = fd
            return true
        },
        // 表格的导入
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
                    if(res.status===200 && res.data.msg=="导入成功"){
                        // this.item = res.data.data.items[0].rows
                        // console.log("item的数据",this.item)
                        this.$message({
                            message:"模板匹配 导入成功",
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type: 'error'
                        })
                    }
                });
            }
        },
        uploadFiles(){
            this.submitUpload(this.uploadfile) 
        },
        templateDownload(){
            this.isShow = true;
            this.axios.get('/api/template').then((res) => {
                console.log(res)
                this.list = res.data.data
            })
        },
        // 点击菜单获取对应菜单的数据
        EtemplateDownload(list,index){
            debugger
            this.dropdown = list[index].title
            this.dropdownid = list[index].templateId
            this.subject = list[index].subject
            this.fixed = list[index].fixed
            this.uploadfile.append("templateId",this.dropdownid)
            this.uploadfile.append("subject",this.subject)
            this.uploadfile.append("fixed",this.fixed)
            this.files = this.uploadfile
            console.log(list)
            console.log(this.fixed)
            console.log("uu",this.uploadfile)
        },
    }
}

</script>
<style scoped >
    .manually_report{
        padding:20px 10px;
        background-color: #ccc;
    }
    .table{
        margin-top:70px;
    }
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
    .right{
        float: right;
        margin-right: 100px;
    }
    .left{

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
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            background-color: #ccc;
        }
        .el-tabs__item:hover,.el-tabs__item.is-active{
            font-weight:bold
        }
        .handsontable .htDimmed {
            background-color: #ccc;
        }
        .handsontable td.htInvalid {
            background-color: transparent !important;
        }
    }
</style>