<template>
  <div  class="container">
    <div class="dropdown">匹配报表:</div>
    <el-dropdown trigger="click" v-if="list.length">
        <el-button type="text" class="underline">
            <span class="pleaseoptions">{{dropdown}}</span>
            <i class="el-icon-arrow-down el-icon_right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
            v-for="(item,index) of list"
            @click.native="matching(list,index)"
            :key="index"   
        >{{item.title}}
        </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <el-button @click="saveData" class="button">保存</el-button>
    <!-- v-if="newrow"  可以传状态控制按钮 -->
    <el-button @click="rowData" class="button">新增</el-button>
    <hot-table  v-if="settings.data.length" :settings="settings" ref="hotTableComponent" :height=" heights-150" class="table"></hot-table>
  </div>
</template>
<script>
import {findDesignSource} from "@/api/interface.js"
import {save} from "@/api/fill.js"
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable-pro';
import {report} from '@/api/cube.js'
// import BiModule from "@v/BiModule.vue";
export default {
  components:{
    HotTable,
    // BiModule
  },
  props:["item"],
  data(){
    return{
      list:[],
      dropdown:'请选择',
      heights: document.body.offsetHeight,
      newrow:false,//新增按钮的隐藏
      table:[],
      del:Function,
      delid:null,
      heights: document.body.offsetHeight,
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
        rowHeaders: true,//行表头
        colHeaders:   [],//表头数据
        autoWrapRow: true, //自动换行
        fillHandle: true, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
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
      }
    }
  },
  created(){
    debugger
    console.log(this.item)
    this.axios.get('/api/template').then((res) => {
      this.list = res.data.data
      // console.log(this.list)
    })
    // this.settings.columns = [ 
    //         {
    //         type:'numeric',  
    //         strict: false , 
    //         data:"D",
    //         },
    //         {
    //         data:"id",
    //         type: 'text'
    //         },
    //         {
    //         data:"row",
    //         type:'text'
    //         },
    //         {
    //         data:"level",
    //         type:'numeric'
    //         },
    //         {
    //         data:"text",
    //         type:'numeric',
    //         },
    //         {
    //         data:"A",
    //         type: 'numeric',
    //         },
    //         {
    //         data:"B",
    //         type: 'numeric',
    //         },
    //         {
    //         data:"C",
    //         type: 'numeric', 
    //         }
    //     ]
  },
  mounted(){

  },

  methods:{

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
     /**
      * hiddenColumns: {
      columns: [3, 5, 9],
      indicators: true
    }
      */
      convert2HansoneTableColumns(columns){
        console.log(columns)
        console.log("--------------------------------------------------")
          columns.sort((a,b)=>a.sort-b.sort);
          console.log(columns)
          let newCoulmns = [],colHeaders=[],hiddenColumns = {
             indicators:false
          },hiddenCols = [];
          for(let i=0,len = columns.length;i<len;i++){
            let col = columns[i];
            if(col.hidden){
                hiddenColumns.indicators = true;
                hiddenCols.push(i);
            }else{
              newCoulmns.push({
                   type: this.getHandsoneTableColType(col.type),  
                   data:col.id,
              });
               colHeaders.push(col.text)
            }
          }
          hiddenColumns.columns = hiddenColumns;
          this.settings.columns = newCoulmns;
          this.settings.hiddenColumns = hiddenColumns;
          this.settings.colHeaders = colHeaders;
          debugger;
      },


    // 选择对应的模板
    matching(list,index){
      debugger
      this.dropdown = list[index].title
      this.dropdownid = list[index].id
      // console.log(this.dropdownid)
      findDesignSource(this.dropdownid).then(res=>{
        console.log(res)
        if(res.status===200 && res.data.data.source != null){
          let datas = res.data.data.source
          let obj = eval("("+datas+")");
          console.log(obj)
          let columns = obj.columns || obj.config.columns
          debugger;
          this.convert2HansoneTableColumns(columns);
          //get datas
          this.settings.data = obj.rows || obj.config.rows
        }
      })
    },
    // 点击保存所有数据
    saveData(){
      var exadata = this.$refs.hotTableComponent.hotInstance.getData()
      console.log(exadata)
      // localStorage.setItem("lists",JSON.stringify(exadata)) 
       save(exadata).then(res=>{
         console.log("保存",res)
       })
    },
    // 点击添加一行
    rowData(){   
      this.$refs.hotTableComponent.hotInstance.alter('insert_row', this.index)
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
  }
}
</script>
<style scoped>
  .table{
    margin-top:20px;
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
    .container{
        thead tr:last-child th {
            border-bottom-width: 0;
            border-right: 1px solid #ccc;
        }
        button{
            margin: 0px 10px 0px 0;
        }
        .handsontable .currentRow {
            background-color: #E7E8EF;
        }

        .handsontable .currentCol {
            background-color: #F9F9FB;
        }
        .handsontable td.htInvalid {
            background-color: #fff !important;
        }
        .handsontable .htRight{
            text-align:left;
        }
        .handsontable .ht_master tr th{
            visibility: visible;
        }
        .handsontable th{
            border-right:0px;
        }
    }
</style>



