<template>
<div>
  <!--zb 下属企业合并行 -->
  <el-table
<<<<<<< HEAD
=======
     v-if="item.id=='xsqydkdbqk' || item.id=='xsqydydkqk'"
>>>>>>> 03f3643affda81a1de37eb0fb6438512c04cafe8
    :data.sync="(item.config.rows && item.config.rows.length > 0)?item.config.rows : item.datas"
    border
    :stripe="true"
    :height="item.height || rowClass"
    :cell-style="cellStyle"
    @cell-click="onCellClick" 
    :span-method="rowSpanAndColSpanHandler" 
    
  >

    <!-- :span-method="rowSpanAndColSpanHandler" :header-cell-style="rowClass" -->
    <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id" v-if="!cc.hidden">
      <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild"/>
      <!-- <bi-table-column v-else :col="cc" :data.sync="item" ref="child"/>   -->
    </el-tag>
  </el-table>
  <el-table
     v-else
    :data.sync="(item.config.rows && item.config.rows.length > 0)?item.config.rows : item.datas"
    border
    :stripe="true"
    height="item.height || rowClass"
    :cell-style="cellStyle"
    @cell-click="onCellClick" 
    
  >

    <!-- :span-method="rowSpanAndColSpanHandler" :header-cell-style="rowClass" -->
    <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id" v-if="!cc.hidden">
      <bi-table-column-tree :col="cc" :data.sync="item" ref="tchild"/>
      <!-- <bi-table-column v-else :col="cc" :data.sync="item" ref="child"/>   -->
    </el-tag>
  </el-table>

        <!-- sjz 分页功能 -->
        <!-- <div class="paginationClass"> -->
            <!-- page-sizes:每页展示条选择组件 -->
            <!-- page-size:每页展示条 -->
            <!-- current-change:currentPage改变时会触发  || item.id=='yszk' || item.id=='yfzk' || item.id=='qtysk'-->
            <!-- size-change:pagesize改变时触发 -->
            <el-pagination v-if="item.pagination "
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="item.datas.length">
            </el-pagination>
        <!-- </div> -->
</div>   
</template>
<script>
//   :span-method="rowSpanAndColSpanHandler"
import BiTableColumn from "./table/BiTableColumn";
import BiTableColumnTree from "./table/BiTableColumnTree";
import EventMixins from "./mixins/EventMixins";
export default {
  name: "BiTable",
  mixins: [EventMixins],
  components: {
    BiTableColumn,
    BiTableColumnTree
  },
  props: ["item"],
  data() {
    return {
      currentPage:1,
      pagesize:1,
      id: 0,
      text: "",
      rows: [],
      spanArr:[],////zb 下属企业合并行时用到
      columns: [],
      groupConfig: {
        idProperty: "group",
        textProperty: "groupName"
      },
      //   datas:{},
      dataUrl: "",
      cubeId: { id: 2, text: "江苏农垦" },
      dims: {
        company: { id: "1", text: "江苏农垦" },
        period: { id: 201608, text: "2016年8月" },
        unit: { id: 10000, text: "万元" },
        items: [] //根据行配制生成的
      }
    };
  },

  created() {
    console.log(this.item);
    this.upData()
    //this.$set(this.item,"datas",null);
    //debugger;
    //this.getTableDataParams();
  },
  mounted() {
     //zb 下属企业合并行
     if(this.item.id == "xsqydkdbqk" || this.item.id == "xsqydydkqk")this.getSpanArr(this.item.datas);
    //document.getElementsByClassName("el-tabs__item")[0].click();
    //debugger;
   // this.getTableDataParams();
  },

  methods: {
    //pagesize改变时触发 ---- 分页功能
    handleSizeChange: function (size) {
        this.pagesize = size;
    },
    //currentPage改变时会触发 --- 分页功能
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
    getDatas(item) {
      let rows = item.config.rows;
      if (rows && rows.length > 0) {
        return rows;
      }

 return item.datas;
    },

    upData(item) {
      debugger
      this.$set(this.item, "datas", item.datas);
      this.$set(this, "item", item);
      let refs = this.$refs;
      console.log(refs)
      if (refs) {
        if (refs.child) {
          refs.child.forEach(children => {
            if (children.upData) {
              children.upData(item);
            }
          });
        }
        if (refs.tchild) {
          refs.tchild.forEach(children => {
            if (children.upData) {
              children.upData(item);
            }
          });
        }
      }
    },
    // rowClass({ row, rowIndex }) {
    //   // 头部颜色和居中配置,马军2018.12.24
    //   return "background:#F0F8FF;text-align: center";
    // },
    /**
     * 单元格级别样式设置
     */

    // 表格的高度 12.26
      rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },


    cellStyle(row) {
      // debugger
      let css = "padding: 4px 0;";
      if (row.column.property.indexOf("text") != -1) {
        let record = row.row;
        let drill = "";
        if (record._drill || record.drill) {
          drill = "text-decoration: none;color: #428bca;cursor: pointer;";
        }
        let level = record._level || record.level || 1;
        let textIndent =
          level > 1 ? "text-indent: " + (level - 1) * 20 + "px" : "";
        css =  css + "font-weight:bold;" + textIndent + drill;
       // console.info(record.text+"==>css==>"+css);
        return css
      } else {
        return css;
      }
    },
     /**
      * 单元格单击事件
      */
    onCellClick(row, column, cell, event) {
      let listener = row._drill || row.drill;
      if (listener) {
        let cv = column.property + "",
          len = cv.length;
        let id = row.id,
          text = row[cv];
        if (cv.substring(len - 1, len) === "_") {
          id = row.id_; //两列的情况
        }
        this.commonHandler(
          listener,
          { row: row, column: column, cell: cell, event: event },
          { id: id, text: text }
        );
      } else {
        console.info("没有设置事件");
      }
    },
    getCellRowSpan(datas, row, config) {
      return datas.filter(record => record[config.id] === row[config.id])
        .length;
    },
    /**
     * 计算每一个单元格的rowspan和colspan
     *
     * datas = [
     *    {id:23,text:"行项目一",A:25,B:545,group:1,groupName:"xx公司",rowspan:3},
     *    {id:24,text:"行项目二",A:25,B:545,group:1,groupName:"xx公司"},
     *    {id:25,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司"},
     *    {id:26,text:"行项目四",A:25,B:545,group:2,groupName:"bb公司"},
     *    {id:27,text:"行项目五",A:25,B:545,group:2,groupName:"bb公司"},
     *    {id:28,text:"行项目六",A:25,B:545,group:2,groupName:"bb公司"}
     * ]
     */
     getSpanArr(data) {　//合并行
          for (var i = 0; i < data.length; i++) {
            console.log(data[i].rowspan)
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
            if (data[i].dim_company === data[i - 1].dim_company) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } 
              else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
          }
     },
    rowSpanAndColSpanHandler({row, column, rowIndex, columnIndex}) {//合并行
      if (columnIndex === 0 ||columnIndex === 1) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            console.log("行",_row);
            console.log("列",_col);
            return {
                  rowspan: _row,
                  colspan: _col
            }
          }
 // let config =  this.groupConfig;
      // let cells = {rowspan:0,colspan:0};
      // debugger
      // //哪一列合并多少行，可以传过来，如果没有传的话，就再计算一下
      // if(column.rowspan){
      //    let datas = [];//getTableDatas();
         
      //    let rowspan = row.rowspan || this.getCellRowSpan(datas,row,config) || 0 ;
      //    cells.rowspan = rowspan;
      // }
      // //哪一行合并多少列，通过数据传过来
      // if(row.colspan){
      //     cells.colspan = row.colspan;
      // }
      // // Todo colspan from where...? 
      // return cells;

      //具体方法请参照elementUi-Table的配法
      if(this.item &&  this.item.colAndRowSan && typeof(colAndRowSan) == "function"){
          return this.item.colAndRowSanHandler({ row, column, rowIndex, columnIndex });
       }
      console.log("item",this.item)
      // let config = this.groupConfig;
      // let cells = { rowspan: 0, colspan: 0 };
      // //哪一列合并多少行，可以传过来，如果没有传的话，就再计算一下
      // if (column.rowspan) {
      //   let datas = []; //getTableDatas();
      //   let rowspan =
      //     row.rowspan || this.getCellRowSpan(datas, row, config) || 0;
      //   cells.rowspan = rowspan;
      // }
      // //哪一行合并多少列，通过数据传过来
      // if (row.colspan) {
      //   cells.colspan = row.colspan;
      // }
      // // Todo colspan from where...?
      // return cells;
    },
    // async getList() {
    //   let { data } = await this.axios.get("/api/cube/find_dim2/company/0/1/");
    //   console.log(data);
    //   this.list = data;
    //   return data;
    // },

  //   getTableDataParams(rows) {
  //     //   var ddd =  this.getList();
  //     //   console.info(ddd);
  //     // sql:"select * from dw_dimcompany"
  //     // if(rows && rows.length > 0){

  //     //  }
  //     //  return ;

  //     //debugger;
  //     // this.axios.get("/api/cube/find_dim2/company/0/1/").then(res =>{
  //     // debugger;
  //     // });
  //     //    debugger;
  //     // 1111122	应收账款
  //     //1111123	预付款项
  //     // 1111221	其他应收款
  //     debugger;
  //     let url = "/get/cube/find/";
  //     var params = {
  //       cubeId: this.cubeId.id,
  //       subject: "0001",
  //       fact: "A,B,C,D",
  //       //periodCount:2,
  //       dims: {
  //         period: "201505,201605",
  //         // company:"1,1500",
  //         itempoint: "1111122,1111123,1111221"
  //       },
  //       dimName: "itempoint", //行项目的Id
  //       // sort:"B",
  //       //    unionDimName:"company", //行项目列名为：factId$unionDimId
  //       // groupBy:"id",
  //       //   showDims:"company",  //company_1
  //       //"helpDims":"111",
  //       order: "desc" //direction
  //     };
  //     params = {
  //       cubeId: this.cubeId.id,
  //       subjects: [
  //         {
  //           id: "1016",
  //           fact: "val_B",
  //           dims: {
  //             indicator: "236,19",
  //             fact: "B"
  //           },
  //           //   m:"0 as A,val as B, 0 as C",//辅助性度量设置
  // dimName: "indicator"
  //         },
  //         {
  //           id: "0001",
  //           fact: "B",
  //           dims: {
  //             itempoint: "1111122,1111123,1111221"
  //           },
  //           dimName: "itempoint"
  //         },
  //         {
  //           id: "0002",
  //           fact: "B",
  //           dims: {
  //             itemperiod: "1416001,1403100"
  //           },
  //           dimName: "itemperiod"
  //         }
  //       ],
  //       dims: {
  //         period: "201505,201605",
  //         company: "1"
  //       },
  //       periodCount: 2
  //     };
  //     params.subjects = JSON.stringify(params.subjects);
  //     this.axios({
  //       method: "post",
  //       url: url,
  //       params: params
  //     })
  //       .then(res => {
  //         debugger;
  //         console.info(res);
  //       })
  //       .catch(res => {
  //         debugger;
  //         console.info(res);
  //       });
  //   }
  }
};
</script>
<style >
.el-table td,
.el-table th {
  padding: 5px 0;
}
/* 横向滚动条 12.26 */
.el-scrollbar__bar.is-horizontal>div{
  height: 0;
}
</style>
