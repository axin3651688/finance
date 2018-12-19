<template>
  <div class="container">
    <el-button>保存</el-button>
    <el-button >新增</el-button>
    <hot-table :settings="settings" ref="hotTableComponent"></hot-table>
  </div>
  
</template>

<script>
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable-pro';
import {report} from '@/api/cube.js'
  var flagrenderer
  export default {
    data(){
      return {
        // 写一个判断是否能填报的状态  当为false时左侧不能填报  
        show:false,
        flag:false,
        root: 'test-hot',
        dataDict:[],
        settings: {
          // JSON.parse(localStorage.getItem("a"))||
          data:  [],//数据，可以是数据，对象
          startRows: 100,//行列范围
          startCols: 6,
          minRows: 100,  //最小行列
          minCols: 5,
          maxRows: 1000,  //最大行列
          maxCols: 20,
          rowHeaders: true,//行表头
        //   colHeaders:JSON.parse(localStorage.getItem("title"))||[],
          colHeaders:   ['编码','客商', '余额', '1年以内','1-2年','2-3年','3年以上','客商性质', '是否内部','是否正常'
          ,'非正常分类','债务人状况*','可收回金额*','其中：当年可收回金额*','逾期账款','已形成实质性损失金额',"操作"],
          autoWrapRow: true, //自动换行
          contextMenu: {   //自定义右键菜单，可汉化，默认布尔值
            items: {
              "row_above": {
                name:'上方插入一行'
              },
              "row_below": {
                name:'下方插入一行'
              },
              "col_left": {
                name:'左方插入列'
              },
              "col_right": {
                name:'右方插入列'
              },
              "hsep1": "---------", //提供分隔线
              "remove_row": {
                name: '删除行',
              },
              "remove_col": {
                name: '删除列',
              },
              "make_read_only": {
                name: '只读',
              },                     
              "borders": {
                name: '表格线',
              },
              "commentsAddEdit": {
                name: '添加备注',
              },
              "commentsRemove": {
                name: '取消备注',
              },
              "freeze_column": {
                name: '固定列',
              },
              "unfreeze_column": {
                name: '取消列固定',
              },
              "hsep2": "---------",
                       }
          },//右键效果
          fillHandle: true, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
          fixedColumnsLeft: 0,//固定左边列数
          fixedRowsTop: 0,//固定上边列数
          mergeCells: [   //合并
            //  {row: 0, col: 0, rowspan: 2, colspan: 1},  //指定合并，从（1,1）开始行3列3合并成一格
            //  {row: 0, col: 3, rowspan: 2, colspan: 3}
          ],
          columns: [],
          // 每个单元格的保存 
          // //row, prop, oldValue, newValue 
            // afterChange: Function,
            afterChange(change,source){
                 localStorage.setItem("a",JSON.stringify(this.getData())) 
            },
            
            manualColumnFreeze: true, //手动固定列
            manualColumnMove: true, //手动移动列
            manualRowMove: true,   //手动移动行
            manualColumnResize: true,//手工更改列距
            manualRowResize: true,//手动更改行距
            comments: true, //添加注释
            cell: [
                // {row: 1, col: 1, comment: {value: 'this is test'}},
            ],
            //   customBorders:[],//添加边框
            // columnSorting: true,//排序
            stretchH: 'none',//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展

            },
        }
    },
    components: {
      HotTable
    },
    created(){
      console.log(me)
      // 获取索引和数据
      // var array = [
      //   {a:1,b:2},
      //   {a:2,b:4},
      //   {a:4,b:6}
      // ]
      // for(let [index,data] of array.entries()){
      //   console.log("index:",index,"data:",data)
      // }
      
      this.dataDict =  [
        {
          "id": "1400",
          "text": "客商性质"
        },
        {
          "id": "140001",
          "text": "国有",
          "pid": "1400"
        },
        {
          "id": "140002",
          "text": "民营",
          "pid": "1400"
        },
        {
          "id": "140003",
          "text": "个体",
          "pid": "1400"
        },
        {
          "id": "140004",
          "text": "外资",
          "pid": "1400"
        },
        {
          "id": "140005",
          "text": "合资",
          "pid": "1400"
        },
        {
          "id": "140006",
          "text": "集体",
          "pid": "1400"
        },
        {
          "id": "140007",
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
          "id": "170001",
          "text": "是",
          "pid": "1700"
        },
        {
          "id": "170002",
          "text": "否",
          "pid": "1700"
        },
        {
          "id": "1800",
          "text": "是否正常",
        },
        {
          "id": "180001",
          "text": "是",
          "pid": "1800"
        },
        {
          "id": "180002",
          "text": "否",
          "pid": "1800"
        }
      ]
      localStorage.setItem("dropdown",JSON.stringify(this.dataDict)) 
      let me = this;
      this.settings.columns = [     //添加每一列的数据类型和一些配置
            {
              type:'numeric',  
              strict: false ,  //是否严格匹配
              data:"nid",

            },
            // {
            //   data:'xm',
            //   type:'text',    

            // },
            // {type: 'numeric'},  //数值
            {
              data:"sk",
              type: 'text',
              // readOnly: false  //设置只读
              hidden:true
            },
            {
              data:"balance",
              type:'text',
            },
             {
               data:"oneyear",
               type:'numeric'
            },
            {
              data:"twoyear",
              type:'numeric',
            },
            {
              data:"threeyear",
              type: 'numeric',
              // strict: false   //是否严格匹配
            },
            {
              data:"fouryear",
              type: 'numeric',
              // strict: false   //是否严格匹配
            },
             {
              data:"kstype",
              type: 'dropdown', //下拉选择
              source: me.getDropDownSource("1400"),
              // strict: false ,  //是否严格匹配
               renderer:me.flagrenderer
            },{
              data:"sfzc",
              type: 'dropdown', //下拉选择
              // source: ["是","否"],
              source: me.getDropDownSource("1700"),
              // strict: false ,  //是否严格匹配
               renderer:me.flagrenderer
              // strict: false   //是否严格匹配
            },
            {
              data:'fzcfl',
              type:'text',
              type: 'dropdown', //下拉选择
              // source: ['是','否'],
              // strict: false   //是否严格匹配
              source: me.getDropDownSource("1800"),
              // strict: false ,  //是否严格匹配
               renderer:me.flagrenderer
            },
            {
              data:'zwrk',
              type:'dropdown',  
              // strict: false ,  //是否严格匹配
              source: me.getDropDownSource("1500"),
              renderer:me.flagrenderer
            },
            {
              data:'khsje',
              type:'dropdown',  
              // strict: false ,  //是否严格匹配
              source: me.getDropDownSource("1600"),
              renderer:me.flagrenderer
            },
            {
              data:'dnkhsje',
              type:'numeric',  
              // strict: false   //是否严格匹配
            },
            {
              data:'yqzk',
              type:'numeric',  
              // strict: false   //是否严格匹配
            },
            {
              data:'szxssje',
              type:'numeric',  
              // strict: false  
            },
            {
              data:'szxssje',
              // type:'numeric', 
              renderer:me.flags, 
              readOnly: true
              // strict: false  
            },
            // {
            //   data:'', 
            //   strict: false, 
            //   readOnly: false,
            //   renderer:me.flags,
              
            // }

          ];
        this.dist()
        var a = JSON.parse(localStorage.getItem("a"))
      // console.log(a)
        // this.settings.afterChange = this.afterChange;

        // 控制填报
        // if(this.show==false){
          // let arr = this.settings.columns.slice(1,1)
          // console.log(arr)
          // arr.forEach(item=>{

          //   item['editor'] = false
          // })
          // console.log(arr)
          // console.log(this.settings.columns)
        // }

        // let as = this.$refs.hotTableComponent.hotInstance.getDataAtCol(1);
        // console.log(as)
    
    },

    mounted(){
        this.dist()
        this.swapHotData()
    },
    methods:{

        swapHotData() {
          console.log(this.$refs)
      //   let a = this.$refs.hotTableComponent.hotInstance.getDataAtCol(1);
      //  let b = this.$refs.hotTableComponent.hotInstance.alter('insert_col',2)
      //  console.log(b)
      },    
        dist(){
            let  item = {
                cubeId:4,
                sql:`SELECT NID,DIM_CUSUPPLIER as sk,FACT_BALANCE AS BALANCE, FACT_A AS ONEYEAR, FACT_B AS TWOYEAR, FACT_C AS THREEYEAR, FACT_D AS FOURYEAR,
                      ISNATURE AS SKXZ, ISINSIDE AS SFNB, ISNORMAL AS SFZC, SCONTENTA AS FZCFL, SCONTENTB AS ZWRK,
                      FACT_E AS KHSJE, FACT_F AS DNKHSJE, FACT_G AS YQZK, FACT_H AS SZXSSJE FROM 
                      (SELECT NID,DIM_CUSUPPLIER,DIM_COMPANY,DIM_ITEM,FACT_BALANCE,FACT_A,FACT_B,FACT_C,FACT_D,ISNATURE,ISINSIDE,ISNORMAL,SCONTENTA,SCONTENTB,
                      FACT_E,FACT_F,FACT_G,FACT_H
                      FROM DW_FACTAGEANALYSIS A
                      WHERE A.DIM_COMPANY='1001010101' AND A.DIM_PERIOD='201812' AND A.DIM_ITEM='1003') A 
                      INNER JOIN
                      (SELECT  SCODE FROM DW_DIMCUSTOMER WHERE SCOMCODE='1001') B
                      ON A.DIM_CUSUPPLIER=B.SCODE`
            }
            report(item).then((res)=>{
                 this.settings.data = res.data.data
                  this.settings.minRows = this.settings.data.length+5
                  
                // this.colHeaders = res.data.data.columns
                // console.log(this.colHeaders)
                localStorage.setItem("title",JSON.stringify(res.data.data)) 
                // this.data = res.data.data.datas  
                // localStorage.setItem("a",JSON.stringify(res.data.data.datas))  



                // 不能填报的状态就不允许添加行
                // this.settings.maxRows=this.settings.data.length+5,
                
                this.flag = true;
            })
        }, 
        getDropDownSource(id){
         let array = this.dataDict.filter(item=>item.pid === id); 
         let source = [];
         array.forEach(element => {
             source.push(element.text);
         });
         return source;
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
                console.error("db user has init wrong dim datas  from "+prop+"["+value+"]");
                // text = this.getDropDownSource(prop.split("_")[1])[0];
                  td.innerHTML='';
                  return ;
            }else{
                text = datas.length > 0 ? datas[0].text : value;
            }
            
            td.innerHTML = text;
        },

        // 插入了删除
        flags(instance, td, row, col, prop, value, cellProperties){
          // console.log(this.$refs.hotTableComponent.hotInstance)
          let arr = this.$refs.hotTableComponent.hotInstance
          let list = this.settings.data
          // var list = [
          //     {a:1,b:2},
          //     {a:2,b:4},
          //     {a:4,b:6}
          //   ]
          // let array = {}
          //   for(let [index,data] of list.entries()){
          //     console.log("index:",index,"data:",data)
          //   }
          var code = value;
          while (td.firstChild) {
            td.removeChild(td.firstChild);
          }
          if(!value){
            var el = document.createElement('DIV')
            el.className='flag'
            el.innerHTML = '删除'
            td.appendChild(el)
            // console.log(this.$refs.hotTableComponent)
            Handsontable.dom.addEvent(el, 'click', function (event) {
            arr.alter("remove_row", row);//删除当前行
                    });
            // el.onclick = function(){
            //   // tr.remove()
            //   // list.remove(list.inde)x
            // }
          }
        },
        //row, prop, oldValue, newValue 
        afterChange(changes,type){
          localStorage.setItem("title",JSON.stringify(this.getData))
          debugger;
          if(type === "edit"){
              // debugger
            let change = changes[0];
            let record = this.dataDict.filter(item=> item.text === change[3])[0];
            // get edit record
            console.info(this.$children[0]);
            let editRecord = this.$children[0]._data.hotInstance.getData()[change[0]];
            let sendData = {nid:editRecord[0],field:change[1],value:record.id};
            console.log("亲们，去保存这个数据吧：~_~",sendData);
            localStorage.setItem("down",JSON.stringify(sendData))

          }
        },           
    }
  }
</script>
<style scoped lang="scss">
    #app .containerMain{
        padding-top:85px;
    }
    .container{
      
    }
</style>
<style> 
     /* .handsontable.ht_clone_top .wtHider, 
        .handsontable .ht_clone_left thead,
        .handsontable div, */

     /* .ht_master .wtHolder, 
     .handsontable .wtHider,
    .handsontable table.htCore,
    .ht_clone_bottom .handsontable,
    .handsontable .wtSpreader{
        width: 100% !important;
        height: 100% !important;
     } */

    /* .handsontable .manualColumnResizer{
       display:none; 
        }  */

    /* .handsontable .columnSorting.sortAction:hover {
       text-decoration: none;
        cursor: none;
    }   */
    .handsontable .ht_clone_left {
      z-index: -10;
    }
    thead tr:last-child th {
    border-bottom-width: 0;
    border-right: 1px solid #ccc;
}
    button{
        margin: 20px 20px;
    }
    .handsontable .currentRow {
        background-color: #E7E8EF;
    }

    .handsontable .currentCol {
        background-color: #F9F9FB;
    }
    #test-hot {
        /* width: 800px;
        height: 800px;
        overflow: hidden; */
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
    /* .hotTable{
     width: calc(100% - 300px);
  } */
  /* .ht_master, .ht_clone_left, .ht_clone_top, .ht_clone_bottom{
    width: 100% !important;
  }
  .handsontable thead th .relative {
    padding: 2px;
    width: 50px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .handsontable tr:first-child th, .handsontable tr:first-child td {
    width: 50px !important;
    box-sizing: border-box;
  } */
</style>
