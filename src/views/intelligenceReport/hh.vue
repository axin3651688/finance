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
                    <div class="left">
                        <el-button @click="saveData" class="button">保存</el-button>
                        <el-button @click="rowData" class="button" v-show="rowdata">新增</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-button  class="button">审阅</el-button>
                    <el-button  class="button">上报</el-button>
                </div>
                <hot-table  v-if="settings.data.length" :settings="settings" ref="hotTableComponent" :height=" heights" class="table"></hot-table>
                <!-- <BiModule v-show="show"></BiModule> -->
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapGetters} from "vuex";
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable-pro';
// import modeHandle from "@/utils/modeHandle";
// import {findDesignSource} from "@/api/interface.js"
import {ImportExcel,Inquire,save,download} from "@/api/fill.js"
// import HandsonTable from '@c/HandsonTable.vue'
import BiModule from "@v/BiModule.vue";
import { log } from 'util';
import { constants } from 'fs';
export default {
    components:{
        HotTable,
        // HandsonTable,
        BiModule
    },
    props:["item"],
    data() {
        return{
            // cubeId:null,//天津食品的id
            title:null,//下载模板的名称
            tableData:[],
            rowdata:true,//新增行按钮的默认显示状态
            fixed:null,//是不是三张主表
            templateId:null,//模板的id
            years:null,//年月的拼接
            row:[],
            // api:'null',
            options:"这是导入页面给的填报模板",
            files:null,
            dropdown:'请选择',
            heights: 0,
            offsetHeight:document.body.offsetHeight,
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
            dataDict:[],
            settings: {
                data:  [],//数据，可以是数据，对象
                startCols: 6,
                hiddenColumns:[],
                minCols: 5,
                maxCols: 20,
                rowHeaders: false,//行表头
                colHeaders:   [],//表头数据
                // nestedHeaders: [],//多表头
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
                afterChange:Function,
                cells:Function,
            },
        }
    },
    watch: {
        offsetHeight(val){
            debugger
            console.log(val)
            if(!this.timer){
                this.offsetHeight = val
                this.timer = true
                let me = this
                console.log("me.heights",me.heights)
                setTimeout(function(){               
                    me.heights = document.body.offsetHeight - 350;
                    me.timer = false
                },400)
            }
        }
    },
    created(){
        this.axios.get('/api/template').then((res) => {
            this.list = res.data.data
            // console.log(res)
            this.cubeId = res.data.config.cube.cubeId
        })
        let date
        if(this.month<10){
            date = this.year +"0"+ this.month  
        }else{
            date = this.year+this.month
        }
        this.years = date
    },
    mounted(){
        this.settings.afterChange = this.afterChange
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
        
        //修改的数据[行，列，老值，新值]
        afterChange(changes,source){

       //let responseDatas = this.settings.data
       //{rowIndex:1,colId:"B"}
            debugger;
            let obj = {}
            let index
            let key
            let values
            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/
            let indexs
            let value
            let modify
            if(changes && changes.length>0){
                index = changes[0][0]
                key = changes[0][1]
                values = changes[0][3]
                obj[key] = values
                obj['index'] = index
                obj['colId'] = key
                obj['row'] = values
                // console.log(index,key,value,obj)

                 let changeRecord = this.tableData.filter(record=>{
                     return record.rowIndex === index || record.colId === key
                     })[0];
               if(changeRecord && reg.test(values)===true){
                    changeRecord[key] = values;
               }else{
                    // let bb = {rowIndex:index};
                    // bb[key] = values;
                    // this.tableData.push(bb);
                    if(reg.test(values)===true){
                        this.tableData.push(obj)
                    } 
               }

                // this.tableData.push(obj)
                console.info(this.tableData)

                this.tableData.forEach(e=>{
                        indexs = e.index
                        value = e
                })

                let datas = this.settings.data

                    // let row = value.row
                    // let money =  reg.test(row)
                    // console.log("11",a)
                datas.forEach((item,i)=>{
                    debugger
                    modify = item
                    if(i === indexs){
                        console.log("value",value)
                        console.log("modify",modify.id,modify.id_)
                        if(value.A ||value.B || value.C || value.D || value.E || value.F){
                            // console.log("1",modify.id)
                            value['id'] = modify.id
                            // value['id_'] = modify.id_
                        }else if(value.A_ ||value.B_ || value.C_|| value.D_ || value.E_ || value.F_){
                            // console.log("2",modify.id_)
                            value['id_'] = modify.id_
                        }
                        else{
                            // value['id_'] = modify.id_
                            // value['id'] = modify.id
                        }
                    }
                })
               return ;
            }
            
        },
        // 设置单元格的只读
        cells(row,columns){
            let cellMeta = {}
            if(columns ==0 || columns ==1  || columns ==5  || columns ==4){
                cellMeta.readOnly = true
            }
            if(this.templateId==3){
                // console.log("~~~",row,columns)
                if(row ===0 && columns ===2 || row ===0 &&columns ===3 || row ==0 &&columns ==6 || row ==0 &&columns ==7|| row ==48 &&columns ==2||row ==48 &&columns ==3
                || row ==49 &&columns ==2||row ==49 &&columns ==3 || row ==50 &&columns ==2||row ==50 &&columns ==3 || row ==51 &&columns ==2||row ==51 &&columns ==3
                || row ==52 &&columns ==2||row ==52 &&columns ==3 || row ==53 &&columns ==2||row ==53 &&columns ==3 || row ==54 &&columns ==2||row ==54 &&columns ==3
                || row ==55 &&columns ==2||row ==55 &&columns ==3 || row ==56 &&columns ==2||row ==56 &&columns ==3 || row ==57 &&columns ==2||row ==57 &&columns ==3
                || row ==58 &&columns ==2||row ==58 &&columns ==3 || row ==59 &&columns ==2||row ==59 &&columns ==3 || row ==60 &&columns ==2||row ==60 &&columns ==3
                || row ==61 &&columns ==2||row ==61 &&columns ==3 || row ==62 &&columns ==2||row ==62 &&columns ==3 || row ==63 &&columns ==2||row ==63 &&columns ==3
                || row ==64 &&columns ==2||row ==64 &&columns ==3 || row ==65 &&columns ==2||row ==65 &&columns ==3 || row ==66 &&columns ==2||row ==66 &&columns ==3
                || row ==67 &&columns ==2||row ==67 &&columns ==3 || row ==68 &&columns ==2||row ==68 &&columns ==3 || row ==69 &&columns ==2||row ==69 &&columns ==3
                || row ==70 &&columns ==2||row ==70 &&columns ==3 || row ==71 &&columns ==2||row ==71 &&columns ==3 || row ==72 &&columns ==2||row ==72 &&columns ==3){
                    cellMeta.readOnly = true
                }
            }
            // this.settings.data.forEach(item=>{
            //     debugger
            //     if(item.text1!=""){
            //         cellMeta.readOnly = false
            //     }else{
            //         cellMeta.readOnly = true
            //     }
            // })
            return cellMeta
        },
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


            // debugger
            let str = ""
            let rows
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            var flagElement = document.createElement('DIV');
            flagElement.id='txt'
            let doc
            // document.onkeyup = function(e){
            //     doc = document.getElementsByClassName('handsontableInput')
            //     let t= doc[0].value
                    
            //     let a = parseInt(t)
            //     // console.log('a', a)
            //     // let b = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
            //     let b = a/1000
            //     // console.log(b)
                
            //     // console.log("doc1",doc[0].valdue)
            //     doc[0].valdue = b
            //     doc[0].value = b
            //     console.log("doc2",doc[0].valdue,"---",doc[0].value)
            //     console.log("dd",doc)
            // }
            
           
            if(value !=null && !isNaN(value)){
               
                
                // console.log('ssssssssssssssssss')
                // document.onkeypress = function(e){
                //     debugger
                //     // || e.keyCode>=96 && e.keyCode<=105
                    // if(e.keyCode>=48 && e.keyCode<=57 ){
                //         debugger
                //         let key
                //         let a
                //         key = String.fromCharCode(e.keyCode);
                //         str += key
                //         // str  = flagElement.innerHTML
                //         a = parseInt(str)
                //         rows = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                //         flagElement.innerHTML = rows;
                //         console.log("a",flagElement.innerHTML)
                //         console.log("rows",rows)
                //     }
                // }
                flagElement.innerText = Math.decimalToLocalString(value);
                td.appendChild(flagElement);
            }




        },

        convert2HansoneTableColumns(columns){
            // columns.sort((a,b)=>a.sort-b.sort);
            if(this.fixed===false){
                columns.push({text:"操作",type:"string"})
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
                    if(col.renderer){
                        cc.renderer = col.renderer;
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
            // this.settings.columns = newCoulmns;
            let me = this;
            // console.log("this.fixed",this.fixed)
           // if(this.fixed===true){
                this.settings.columns = newCoulmns;
                console.log(this.settings.columns)
                this.rowdata = false
                this.settings.cells = this.cells
            // }else{
            //     this.settings.columns = [
            //         {
            //         data:"id" 
            //         },
            //         {
            //         data:"text1"
            //         },
            //          {
            //         data:"row"
            //         },
            //         {
            //         data:""
            //         },
            //          {
            //         data:"id_"
            //         },
            //         {
            //         data:"text2"
            //         },
            //         {
            //         data:"row2"
            //         },
            //         {
            //         data:""
            //         },
            //         {
            //         data:"",
            //         renderer:me.flags, 
            //         readOnly: true
            //         },
            //     ]
          //  }
            // this.settings.hiddenColumns = hiddenColumns;
            this.settings.colHeaders = colHeaders;
        },
        //点击保存数据
        saveData(){
            debugger
            // var exadata = this.$refs.hotTableComponent.hotInstance.getData()
            // console.log(exadata)
            let rows = this.tableData
            // console.log(this.tableData)
            let obj = {
                "cubeId":this.cubeId,
                // dims:{
                    "company": this.company,
                    "period": this.years,
                // },
                "subject": this.subject,
                "templateId":this.templateId,
                "rows":rows,
                "fixed":this.fixed
                }
                console.log(obj)
            save(obj).then(res=>{
                console.log("保存",res)
            })
        },
        // 点击添加一行
        rowData(){   
            this.$refs.hotTableComponent.hotInstance.alter('insert_row', this.index)
        },
        matching(list,index,item){
            debugger
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
            Inquire(excelUploadParaDto).then(res=>{
                debugger
                console.log("查询",res)
                let columns = res.data.data.columns
                console.log(columns)
                this.convert2HansoneTableColumns(columns);
                this.settings.data = res.data.data.rows
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
        // 取消
        cancel(){
            this.isShow = false;
        },
        // 确定
        Download(){
            this.isShow = false;
            if(this.templateId != null){
                download(this.templateId).then(res=>{
                console.log("模板的下载",res)
                const content = res.data
                // application/vnd.ms-excel  application/x-www-form-urlencoded;charset=UTF-8
                const blob = new Blob([content],{type: "application/vnd.ms-excel"})
                // console.log(blob)
                let str = res.headers['content-disposition']
                let index = str.lastIndexOf(".")
                let h = str.substring(index+1,str.length)
                const fileName = this.title+'.'+h
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                
                })
            }
        },
        //模板下载选择的表格
        test(val, item){
            console.log('option:', val)
            console.log('option data:', item)
            this.templateId = item.templateId
            this.title = item.title
        },
            // 插入了删除
        flags(instance, td, row, col, prop, value, cellProperties){
            let arr = this.$refs.hotTableComponent.hotInstance
            let list = this.settings.data
            var code = value;
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            if(!value){
                var el = document.createElement('DIV')
                el.className='flag'
                el.id='flag'
                el.innerHTML = '删除'
                td.appendChild(el)
                el.style.color = "red"
                el.style.cursor = "pointer"
                Handsontable.dom.addEvent(el, 'click', function (event) {
                    arr.alter("remove_row", row);//删除当前行
                })
            }
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




// 这是后面改的
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
                    <div class="left">
                        <el-button @click="saveData" class="button">保存</el-button>
                        <el-button @click="rowData" class="button" v-show="rowdata">新增</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-button  class="button">审阅</el-button>
                    <el-button  class="button">上报</el-button>
                </div>
                <hot-table  v-if="settings.data.length" :settings="settings" ref="hotTableComponent" :height=" heights" class="table"></hot-table>
                <!-- <BiModule v-show="show"></BiModule> -->
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapGetters} from "vuex";
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable-pro';
// import modeHandle from "@/utils/modeHandle";
// import {findDesignSource} from "@/api/interface.js"
import {ImportExcel,Inquire,save} from "@/api/fill.js"
// import HandsonTable from '@c/HandsonTable.vue'
import BiModule from "@v/BiModule.vue";
import { log } from 'util';
export default {
    components:{
        HotTable,
        // HandsonTable,
        BiModule
    },
    props:["item"],
    data() {
        return{
            cubeid:null,//天津食品的id
            title:null,//下载模板的名称
            tableData:[],
            rowdata:true,//新增行按钮的默认显示状态
            fixed:null,//是否是三张主表
            templateId:null,//模板的id
            years:null,//年月的拼接
            row:[],
            // api:'null',
            options:"这是导入页面给的填报模板",
            files:null,
            dropdown:'请选择',
            heights: document.body.offsetHeight -360,
            subject:null,//匹配模板的subject
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
                region: ''
            },
            // isShow:false,
            // dropdown:'请选择',
            // heights: document.body.offsetHeight,
            newrow:false,//新增按钮的隐藏
            table:[],
            del:Function,
            delid:null,
            index:'',//  数据的索引
            show:false,
            flag:false,
            root: 'test-hot',
            dataDict:[],
            settings: {
                data:  [],//数据，可以是数据，对象
                startCols: 6,
                hiddenColumns:[],
                minCols: 5,
                maxCols: 20,
                rowHeaders: false,//行表头
                colHeaders:   [],//表头数据
                autoWrapRow: true, //自动换行
                fillHandle: false, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
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
                afterChange:Function,
                cells:Function,
            },
        }
    },
    watch: {
        heights(val){
            debugger
            console.log(val)
            this.heights = val - 360
            // if(!this.timer){
            //     this.offsetHeight = val
            //     this.timer = true
            //     let me = this
            //     console.log("me.heights",me.heights)
            //     setTimeout(function(){               
            //         me.heights = document.body.offsetHeight - 350;
            //         me.timer = false
            //     },400)
            // }
        }
    },
    created(){
        this.axios.get('/api/template').then((res) => {
            this.list = res.data.data
            this.cubeid = res.data.config.cube.cubeId
        })
        let date
        if(this.month<10){
            date = this.year +"0"+ this.month  
        }else{
            date = this.year+this.month
        }
        this.years = date
    },
    mounted(){
        this.settings.afterChange = this.afterChange            
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
          afterChange(changes,source){

       //let responseDatas = this.settings.data
       //{rowIndex:1,colId:"B"}
            debugger;
            let obj = {}
            let index
            let key
            let values
            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/
            let indexs
            let value
            let modify
            if(changes && changes.length>0){
                index = changes[0][0]
                key = changes[0][1]
                values = changes[0][3]
                obj[key] = values
                obj['index'] = index
                obj['colId'] = key
                obj['row'] = values
                // console.log(index,key,value,obj)

                 let changeRecord = this.tableData.filter(record=>{
                     return record.rowIndex === index || record.colId === key
                     })[0];
               if(changeRecord && reg.test(values)===true){
                    changeRecord[key] = values;
               }else{
                    if(reg.test(values)===true){
                        this.tableData.push(obj)
                    } 
               }

                // this.tableData.push(obj)
                console.info(this.tableData)
                localStorage.setItem("savedata",JSON.stringify(this.tableData)) 
                this.tableData.forEach(e=>{
                        indexs = e.index
                        value = e
                })

                let datas = this.settings.data
                datas.forEach((item,i)=>{
                    debugger
                    modify = item
                    if(i === indexs){
                        console.log("value",value)
                        console.log("modify",modify.id,modify.id_)
                        if(value.A ||value.B || value.C || value.D || value.E || value.F){
                            // console.log("1",modify.id)
                            value['id'] = modify.id
                            // value['id_'] = modify.id_
                        }else if(value.A_ ||value.B_ || value.C_|| value.D_ || value.E_ || value.F_){
                            // console.log("2",modify.id_)
                            value['id_'] = modify.id_
                        }
                        else{
                            // value['id_'] = modify.id_
                            // value['id'] = modify.id
                        }
                    }
                })
               return ;
            }
            
        },
        // 设置单元格的只读
        cells(row,columns){
            let cellMeta = {}
            if(columns ==0 || columns ==1  || columns ==5  || columns ==4){
                cellMeta.readOnly = true
            }
            if(this.templateId==3){
                if(row ===0 && columns ===2 || row ===0 &&columns ===3 || row ==0 &&columns ==6 || row ==0 &&columns ==7|| row ==48 &&columns ==2||row ==48 &&columns ==3
                || row ==49 &&columns ==2||row ==49 &&columns ==3 || row ==50 &&columns ==2||row ==50 &&columns ==3 || row ==51 &&columns ==2||row ==51 &&columns ==3
                || row ==52 &&columns ==2||row ==52 &&columns ==3 || row ==53 &&columns ==2||row ==53 &&columns ==3 || row ==54 &&columns ==2||row ==54 &&columns ==3
                || row ==55 &&columns ==2||row ==55 &&columns ==3 || row ==56 &&columns ==2||row ==56 &&columns ==3 || row ==57 &&columns ==2||row ==57 &&columns ==3
                || row ==58 &&columns ==2||row ==58 &&columns ==3 || row ==59 &&columns ==2||row ==59 &&columns ==3 || row ==60 &&columns ==2||row ==60 &&columns ==3
                || row ==61 &&columns ==2||row ==61 &&columns ==3 || row ==62 &&columns ==2||row ==62 &&columns ==3 || row ==63 &&columns ==2||row ==63 &&columns ==3
                || row ==64 &&columns ==2||row ==64 &&columns ==3 || row ==65 &&columns ==2||row ==65 &&columns ==3 || row ==66 &&columns ==2||row ==66 &&columns ==3
                || row ==67 &&columns ==2||row ==67 &&columns ==3 || row ==68 &&columns ==2||row ==68 &&columns ==3 || row ==69 &&columns ==2||row ==69 &&columns ==3
                || row ==70 &&columns ==2||row ==70 &&columns ==3 || row ==71 &&columns ==2||row ==71 &&columns ==3 || row ==72 &&columns ==2||row ==72 &&columns ==3){
                    cellMeta.readOnly = true
                }
            }
            return cellMeta
        },
        getHandsoneTableColType(type){
            if(type){
            if(type === "decimal"){
                return "numeric";
            }else if(type == "string"){
                return "text";
            }
            }
            return "text";
        },
        convert2HansoneTableColumns(columns){
            columns.sort((a,b)=>a.sort-b.sort);
            if(this.fixed===false){
                columns.push({text:"操作",type:"string"})
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
                    if(col.renderer){
                        cc.renderer = col.renderer;
                    }else{
                        if(col.type === 'decimal'){
                          cc.renderer = this.decimalDefaultRenderer;
                       }
                    }
                   
                    newCoulmns.push(cc);
                    colHeaders.push(col.text)
                }
            }
            debugger
            hiddenColumns.columns = hiddenColumns;
            let me = this;
                this.settings.columns = newCoulmns;
                console.log(this.settings.columns)
                this.rowdata = false
                this.settings.cells = this.cells
                this.settings.colHeaders = colHeaders;
        },
        saveData(){
            debugger
            // var exadata = this.$refs.hotTableComponent.hotInstance.getData()
            // console.log(exadata)
            let rows = this.tableData
            // console.log(this.tableData)
            let obj = {
                "cubeId":this.cubeId,
                "user":this.user.user.username,
                // dims:{
                    "company": this.company,
                    "period": this.years,
                // },
                "subject": this.subject,
                "templateId":this.templateId,
                "rows":rows,
                "fixed":this.fixed
                }
                console.log(obj)
            save(obj).then(res=>{
                console.log("保存",res)
            })
        },
        // 点击添加一行
        rowData(){   
            this.$refs.hotTableComponent.hotInstance.alter('insert_row', this.index)
        },
         matching(list,index,item){
            debugger
            this.dropdown = list[index].title
            this.dropdownid = list[index].sourceId
            this.fixed = list[index].fixed
            this.subject = list[index].subject
            this.templateId = list[index].templateId
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
            Inquire(excelUploadParaDto).then(res=>{
                debugger
                console.log("查询",res)
                let columns = res.data.data.columns
                console.log(columns)
                this.convert2HansoneTableColumns(columns);
                this.settings.data = res.data.data.rows
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
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
                            message:"数据异常",
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
            console.log(list)
            this.axios.get('/api/template').then((res) => {
                console.log(res)
                this.list = res.data.data
            })
        },
        // 点击下拉菜单获取对应菜单的数据
        EtemplateDownload(list,index){
            this.dropdown = list[index].title
            this.dropdownid = list[index].templateId
            this.subject = list[index].subject
            this.uploadfile.append("templateId",this.dropdownid)
            this.uploadfile.append("subject",this.subject)
            this.files = this.uploadfile
            console.log("uu",this.uploadfile)
        },
        // 取消
        cancel(){
            this.isShow = false;
        },
        // 确定
        Download(){
            this.isShow = false;
            if(this.templateId != null){
                download(this.templateId).then(res=>{
                console.log("模板的下载",res)
                const content = res.data
                // application/vnd.ms-excel  application/x-www-form-urlencoded;charset=UTF-8
                const blob = new Blob([content],{type: "application/vnd.ms-excel"})
                // console.log(blob)
                let str = res.headers['content-disposition']
                let index = str.lastIndexOf(".")
                let h = str.substring(index+1,str.length)
                const fileName = this.title+'.'+h
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                
                })
            }
        },
        //模板下载选择的表格
        test(val, item){
            console.log('option:', val)
            console.log('option data:', item)
            this.templateId = item.templateId
            this.title = item.title
        },
            // 插入了删除
        flags(instance, td, row, col, prop, value, cellProperties){
            let arr = this.$refs.hotTableComponent.hotInstance
            let list = this.settings.data
            var code = value;
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            if(!value){
                var el = document.createElement('DIV')
                el.className='flag'
                el.id='flag'
                el.innerHTML = '删除'
                td.appendChild(el)
                el.style.color = "red"
                el.style.cursor = "pointer"
                // console.log(this.$refs.hotTableComponent)
                Handsontable.dom.addEvent(el, 'click', function (event) {
                    arr.alter("remove_row", row);//删除当前行
                })
            }
        },
         decimalDefaultRenderer(instance, td, row, col, prop, value, cellProperties) {
            // debugger
            let str = ""
            let rows
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            var flagElement = document.createElement('DIV');
            flagElement.id='txt'
            let doc         
            if(value !=null && !isNaN(value)){
                flagElement.innerText = Math.decimalToLocalString(value);
                td.appendChild(flagElement);
            }
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






