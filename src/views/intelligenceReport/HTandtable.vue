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
                <hot-table  v-if="settings.data && settings.data.length>0" :settings="settings" ref="hotTableComponent" :height=" heights" class="table"></hot-table>
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
import {ImportExcel,Inquire,save,download,del} from "@/api/fill.js"
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
            values:null,//填报的数据
            datas:null,//存储查询要传递的数据
            columns:[],
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
            // offsetHeight:document.body.offsetHeight,
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
                startCols: 6,
                hiddenColumns:[],
                minCols: 5,
                maxCols: 20,
                rowHeaders: true,//行表头
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
                cells:Function
            },
        }
    },
    watch: {
        heights(val){
            debugger
            console.log(val)
            if(!this.timer){
                this.heights = val
                this.timer = true
                let me = this
                // console.log("me.heights",me.heights)
                setTimeout(function(){               
                    me.heights = document.body.offsetHeight - 360;
                    me.timer = false
                },400)
            }
        },
        templateId(val){
            this.tableData = []
        },
        year(val){
            let period = this.datas.period
            let year = period.substring(0,4)
            let newyear = period.replace(year,val)
            this.datas.period = newyear
            console.log(this.datas)
            this.inquire(this.datas)
        },
        month(val){
            let period = this.datas.period
            let date
            if(this.month<10){
                date = this.year +"0"+ val 
            }else{
                date = this.year+val
            }
            this.datas.period = date
            // console.log("ss",this.datas)
            this.inquire(this.datas)
        },
        company(val){
            let company = this.datas.company
            let newcompany = company.replace(company,val)
            this.datas.company = newcompany
            console.log(this.datas)
            this.inquire(this.datas)
        }
    },
    created(){
        this.dataDict =  [
            {
                "id": "1400",
                "text": "客商性质"
            },
            {
                "id": "1001",
                "text": "国有",
                "pid": "1400"
            },
            {
                "id": "1002",
                "text": "民营",
                "pid": "1400"
            },
            {
                "id": "1003",
                "text": "个体",
                "pid": "1400"
            },
            {
                "id": "1004",
                "text": "外资",
                "pid": "1400"
            },
            {
                "id": "1005",
                "text": "合资",
                "pid": "1400"
            },
            {
                "id": "1006",
                "text": "集体",
                "pid": "1400"
            },
            {
                "id": "1007",
                "text": "个人",
                "pid": "1400"
            },
            {
                "id": "1500",
                "text": "非正常分类"
            },
            {
                "id": "150006",
                "text": "核算不规范",
                "pid": "1500"
            },
            {
                "id": "150007",
                "text": "其他",
                "pid": "1500"
            },
            {
                "id": "150001",
                "text": "向系统外出借资金",
                "pid": "1500"
            },
            {
                "id": "150002",
                "text": "成本费用挂账",
                "pid": "1500"
            },
            {
                "id": "150004",
                "text": "为其他企业代偿金融机构的贷款",
                "pid": "1500"
            },
            {
                "id": "150005",
                "text": "长期挂账、未及时清理",
                "pid": "1500"
            },
            {
                "id": "150003",
                "text": "通过融资性贸易、赊销业务、虚假贸易等虚增应收",
                "pid": "1500"
            },
            {
                "id": "1600",
                "text": "债务人状况"
            },
            {
                "id": "160001",
                "text": "债务人经营困难",
                "pid": "1600"
            },
            {
                "id": "160002",
                "text": "债务人改制或退出",
                "pid": "1600"
            },
            {
                "id": "160003",
                "text": "债务人停业",
                "pid": "1600"
            },
            {
                "id": "160004",
                "text": "债务人失踪",
                "pid": "1600"
            },
            {
                "id": "160005",
                "text": "超过诉讼时效",
                "pid": "1600"
            },
            {
                "id": "1700",
                "text": "是否内部",
            },
            {
                "id": "1",
                "text": "是",
                "pid": "1700"
            },
            {
                "id": "0",
                "text": "否",
                "pid": "1700"
            },
            {
                "id": "1800",
                "text": "是否正常",
            },
            {
                "id": "1",
                "text": "是",
                "pid": "1800"
            },
            {
                "id": "0",
                "text": "否",
                "pid": "1800"
            }
        ],
        this.axios.get('/api/template').then((res) => {
            this.list = res.data.data
            // console.log(res)
            this.cubeId = res.data.config.cube.cubeId
        })
        // console.log(this.datas)
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
        readOnlys(instance, td, row, col, prop, value, cellProperties){
            return false
            // let columns = this.settings.columns
            // let cc
            // columns.forEach(item=>{
            //     cc = item
            // })
            // let datas = this.settings.data
            // datas.forEach(item=>{
            //     if(cc && item.isinside == "1"){
            //         cc.renderer = true
            //     }
            // })
        },
        getDropDownSource(id){
            let array = this.dataDict.filter(item=>item.pid === id); 
            let source = [];
            array.forEach(element => {
                source.push(element.text);
            });
            return source;
        },    
        //修改的数据[行，列，老值，新值]
        afterChange(changes,source){
            debugger
            let obj = {}
            let index
            let key
            let values
            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/
            let indexs
            let value
            let modify
            let datas = this.settings.data
            let row
            if(changes && changes.length>0){
                index = changes[0][0]
                key = changes[0][1]
                values = changes[0][3]
                obj[key] = values
                obj['index'] = index
                obj['colId'] = key
                obj['row'] = values  
                this.values = values
                let x
                let arr = datas.filter(record=>{
                    x = record
                    return  record.cusuppliername !=null
                })
                // console.log(x)
                console.log("this.tableData",this.tableData)  
                // console.log("datas",arr)
                for(var i=0;i<arr.length-1;i++){
                    row = datas[i]
                    debugger
                    if(row.cusuppliername && row.cusuppliername !=null && row.cusuppliername == values){
                        this.$message({
                            type: 'error',
                            message: '商客名称重复，请重新输入'
                        })
                    }
                }
                let changeRecord = this.tableData.filter(record=>{
                    return record.index === index && record.colId === key
                    })[0];
                let changen = this.tableData.filter(record=>{
                        return record.index === index
                     })[0];

                if(this.fixed===1){
                    if(changeRecord && reg.test(values)===true){
                        changeRecord[key] = values;
                    }else{
                        if(reg.test(values)===true){
                            let bb = {index:index};
                            bb[key] = values;
                            this.tableData.push(bb)
                        }
                    }
                }
                if(this.fixed===0){
                    if(changen && key !="text1" && key !="id" && key !="text"){
                        changen[key] = values;
                    }else if(this.templateId==8){  
                        if(index !=0){
                            let bb = {index:index};
                            bb[key] = values;
                            this.tableData.push(bb);
                        }     
                    }
                    else{  
                        if(key !="text1" && key !="id" && key !="text"){
                            let bb = {index:index};
                            bb[key] = values;
                            this.tableData.push(bb);
                        }
                        
                    }
                }
            }    
            // localStorage.setItem("saveData",JSON.stringify(arr)) 
            this.tableData.forEach(e=>{
                indexs = e.index
                value = e
            })
            datas.forEach((item,i)=>{
                modify = item
                if(i === indexs){
                    console.log("value",value)
                    if(value.A ||value.B || value.C || value.D || value.E || value.F || value.G || value.H){
                        // console.log("1",modify.id)
                        value['id'] = modify.id
                        value['nid'] = modify.nid
                    }else if(value.A_ ||value.B_ || value.C_|| value.D_ || value.E_ || value.F_){
                        // console.log("2",modify.id_)
                        value['id_'] = modify.id_
                    }
                    else{
                        value['nid'] = modify.nid
                        if(value['nid']==null){
                            value['nid'] = 0
                        }
                    }
                }
            })
        },
        // 设置单元格的只读
        cells(row,columns,prop){
            console.log("row,columns,prop",row,columns,prop)
           
            let cellMeta = {}
            if(this.fixed===1){
                if(columns ==0 || columns ==1  || columns ==5  || columns ==4){
                    cellMeta.readOnly = true
                }
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
           if(this.templateId==8){
                if(columns ==1 || columns ==3 || columns ==4){
                    cellMeta.readOnly = true
                }
            }
            if(this.templateId==4){
                let datas = this.settings.data
                let rows
                // datas.forEach(item=>{
                //     rows = item
                //     if( rows.isinside=="1" || rows.isinside=="是"){
                //     debugger
                //         if( row ===0 && columns ==6 || row ===1 && columns ==6 || row ===2&& columns ==6 || row ===3&& columns ==6){
                //             cellMeta.readOnly = true
                //         }
                //     }
                // })
                // console.log("rows",rows)
                // cellMeta.readOnly = true
                // if( columns ==3){
                //     cellMeta.readOnly = true
                // }
            }
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
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            var flagElement = document.createElement('DIV');
            flagElement.style.textAlign = "right"
            if(value !=null && !isNaN(value)){
                flagElement.innerText = Math.decimalToLocalString(value);
                td.appendChild(flagElement);
            }
        },
        convert2HansoneTableColumns(columns){
            debugger
            let me = this
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
            let readOnlys = function(a,b,c,d){
                alert("111")
                return false
            }
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
                    }
                    else{
                       if(col.type === 'decimal'){
                          cc.renderer = this.decimalDefaultRenderer;
                       }else if(col.id === 'caozuo'){
                            cc.renderer = this.flags
                            cc.readOnly=true
                       }
                       else if(col.id === 'isnature'){
                            cc.source =  this.getDropDownSource("1400")
                            cc.renderer = this.flagrenderer
                            cc.type = 'dropdown'
                       }else if(col.id === 'isinside'){
                            cc.source =  this.getDropDownSource("1700")
                            cc.renderer = this.flagrenderer
                            cc.type = 'dropdown'
                            cc.readOnly=false
                       }else if(col.id === 'isnormal'){
                            cc.source =  this.getDropDownSource("1800")
                            cc.renderer = this.flagrenderer
                            cc.type = 'dropdown'
                            cc.readOnly=false
                       }else if(col.id === 'scontenta'){
                            cc.source =  this.getDropDownSource("1500")
                            cc.renderer = this.flagrenderer
                            cc.type = 'dropdown'
                            cc.readOnly=false
                       }else if(col.id === 'scontentb'){
                            cc.source =  this.getDropDownSource("1600")
                            cc.renderer = this.flagrenderer
                            cc.type = 'dropdown'     
                        }
                    }
                   
                    newCoulmns.push(cc);
                    colHeaders.push(col.text)
                }
            }
            this.settings.columns = newCoulmns;
            this.settings.cells = this.cells
            this.settings.colHeaders = colHeaders;
        },
        //点击保存数据
        saveData(){
            debugger
            // var exadata = this.$refs.hotTableComponent.hotInstance.getData()
            // console.log(exadata)
            let objs = {
                "cubeId":this.cubeId,
                dims:{
                    "company": this.company,
                    "period": this.years,
                },
                "subject": this.subject,
                "templateId":this.templateId,
                "rows": this.tableData,
                "fixed":this.fixed,
                "user":this.user.user.username
                }
            console.log(objs)
            let newtabledata = this.settings.data
            let x
            let me = this
            let arr = newtabledata.filter(record=>{
                x = record
                return  record.cusuppliername !=null
            }) 
            function res(arr) {
                var tmp = [];
                var copy = [];
                arr.forEach(item =>{
                    if(copy.indexOf(item.cusuppliername) === -1){
                        copy.push(item.cusuppliername)
                    }else{
                        if(tmp.indexOf(item.cusuppliername) === -1){
                            me.$message({
                                type: 'error',
                                message: '商客名称重复,不可以保存，请更改'
                            })
                            tmp.push(item.cusuppliername)
                        }
                    }
                })
                return tmp
            }
            var result = res(arr);
            if(result.length===0){
                save(objs).then(res=>{
                    console.log("保存",res)

                    if (res.data.code === 200) {
                        me.$message({
                                message:res.data.msg,
                                type: 'success'
                        })
                        me.tableData = []
                    }else{
                        me.$message({
                                message:"保存失败",
                                type: 'error'
                        })
                    }
                })
            }
        },
        // 点击添加一行
        rowData(){   
            this.$refs.hotTableComponent.hotInstance.alter('insert_row', this.index)
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
                "templateId":this.templateId,
                "fixed":this.fixed
            }
            this.datas = excelUploadParaDto
            this.inquire(this.datas)
        },
        inquire(datas){
            console.log("请求",datas)
            console.log("传递的data",this.datas)
            let me = this
            Inquire(this.datas).then(res=>{
                debugger
                console.log("查询",res)
                let columns = res.data.data.columns
                me.columns = res.data.data.columns
                me.settings.data = res.data.data.rows
                me.convert2HansoneTableColumns(columns);
                console.log("me.settings.data",me.settings.data)
            })
        },
        handleClick(tab, event) {
        //     console.log(tab, event);
        },
        beforeAvatarUpload(file) {
            debugger
            let date
            if(this.month<10){
                date = this.year +"0"+ this.month  
            }else{
                date = this.year+this.month
            }
            this.years = date
            this.excelname = file.name
            console.log("this.years",this.years)
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
                    message:res.data.msg,
                    type: 'error'
                });   
            }else{
                // this.$message("模板匹配 没有数据")
                console.log(titlename[0])
                ImportExcel(this.files).then(res => {
                    debugger
                    console.log('res', res);
                    if(res.data.code===200){
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
            // console.log("arr",arr)
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
                let me = this
                let date
                if(this.month<10){
                    date = this.year +"0"+ this.month  
                }else{
                    date = this.year+this.month
                }
                this.years = date                  
                Handsontable.dom.addEvent(el, 'click', function (event) {
                    debugger
                    // arr.alter("remove_row", row);//删除当前行
                    // console.log(me.tableData)
                    // console.log(me.settings.data)
                    let tabledata = me.tableData
                    let datas = me.settings.data
                    let nid
                    datas.forEach((item,index)=>{
                        if(index===row){
                            nid = item.nid
                            // console.log(item)
                        }
                        
                    })
                    //新增行的数据删除
                    let rows
                    me.tableData.forEach((item,index)=>{
                        if(item.index===row){
                            rows = item
                            console.log(rows)
                        }    
                    })
                    let a =  me.tableData
                    
                    // console.log( me.tableData)
                    debugger
                    if(nid!=undefined){
                        let data = {
                        // company:me.company,
                        // period:me.years,
                            nid:nid,
                            templateId:me.templateId
                        }
                        console.log("ee",row,data)
                        me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            console.log(arr)
                            // arr.alter("remove_row", row);//删除当前行
                            del(data).then(res=>{
                                console.log("删除",res)
                                if(res.data.code===200){
                                    debugger
                                    // location.reload()
                                    me.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }
                            })
                            
                        }).catch(() => {
                            me.$message({
                                type: 'info',
                                message: '已取消删除'
                                
                            });          
                        });
                    }
                    else{
                        a.splice(a.indexOf(rows),1)
                        arr.alter("remove_row", row);//删除当前行
                        console.log("删除后的数组",me.tableData)
                    }
                })
            }
        },
        flagrenderer(instance, td, row, col, prop, value, cellProperties){
            if(!value){
                return ;
            }
            if(/[\u4e00-\u9fa5]/.test(value)){
                td.innerHTML= value;
              return ;
            }
              let text = value;
            let datas = this.dataDict.filter(item=>item.id === value);
            if(datas.length == 0){
                  td.innerHTML='';
                  return ;
            }else{
                text = datas.length > 0 ? datas[0].text : value;
            }   
            td.innerHTML = text;
        }
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