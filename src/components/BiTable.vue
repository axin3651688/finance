<template>
<div>
  <div v-if="divShow" class="divContent" v-html="divContent"></div>
  <div v-else-if="tableShow">
    <div v-if="item.tableBefore" v-html="titleText">请添加你要显示的内容！</div>
    <!-- 判断写在外层，不然生成的没有配置toolbar的table时，上面会有一个空隙 -->
    <el-button-group class="toolbar" v-if="item.toolbar && item.toolbar.length > 0 ">
      <el-button       
        v-for="btn in item.toolbar"
        v-bind:key="btn.id"
        :style="btn.cellStyle"
        @click="btnClick(btn)"
      >{{btn.text}}</el-button>
    </el-button-group>
    <el-table
      :data.sync="tableDatas"
      border
      :stripe="true"
      style="width: 100%"
      :height="heights"
      :cell-style="cellStyle"
      @cell-click="onCellClick"
      :span-method="rowSpanAndColSpanHandler"
      :header-cell-style="{'background':item.class_bg ? item.class_bg:'#F0F8FF'}"
    >
      <!-- :height="item.height || heights-170" -->
      <!--  :summary-method="getSummaries"  -->
      <!-- :show-summary="item.showSummary || true"     -->
      <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id">
        <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild" v-if="!cc.hidden"/>
        <!-- <bi-table-column-tree :col="cc" :datas.sync="item" ref="tchild"   v-if="!cc.hidden"/> -->
      </el-tag>
    </el-table>
    <!-- sjz 分页功能 -->
    <el-pagination
      v-if="item.pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="item.datas.length"
    ></el-pagination>
  </div>
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
      heights: 500,
      offsetHeight:document.body.offsetHeight,
      flag: true,
      dialogVisible: false,
      currentPage: 1,
      pagesize: 1,
      id: 0,
      text: "",
      rows: [],
      tableDatas:[],
      // spanArr:[],////zb 下属企业合并行时用到
      columns: [],
      groupConfig: {
        idProperty: "group",
        textProperty: "groupName"
      },
      drillProperties: ["text", "text_"], //有钻取，给蓝色
      levelProperties: { text: "level", text_: "level_" }, //加缩进
      titleText:"",
      tableShow: true,
      divContent:"",
      divShow:false

    };
  },
  watch: {
    // heights(newval) {
    //   debugger;
    //   this.heights = newval;
    // }
    // 监听offsetHeight属性值的变化，打印并观察offsetHeight发生变化的值：
        // offsetHeight(val){
        //     if(!this.timer){
        //         // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
        //         this.offsetHeight = val
        //         this.timer = true
        //         let me = this
        //         setTimeout(function(){           
        //             // 打印offsetHeight变化的值 
        //             //me.heights = document.body.offsetHeight - 40 - 64 - 22 - 40;
        //             if(me.item.stype == "table"){
        //               me.heights = document.body.offsetHeight - 40 - 64 - 15;
        //             }else{
        //               // 计算当前页面的高度 得出表格的高度
        //               me.heights = document.body.offsetHeight - 40 - 64 - 22 - 40;
        //             }
        //             console.log(me.offsetHeight)
        //             me.timer = false
        //         },400)
        //     }
        // }
    
  },
  created() {
    /**
     * 页面原始高度：document.body.offsetHeight
     * 按钮背景高度：40
     * 导航栏高度：64
     * 间隙高度：15+7 = 22
     */
    debugger
    if(this.item.show){
      this.upData(this.item);
    }
    // this.upData(this.item);
    console.log(this.item)
    if(this.item.stype == "table"){
      this.heights = document.body.offsetHeight - 40 - 64 - 15 ;
    }else{
      // 计算当前页面的高度 得出表格的高度
      this.heights = document.body.offsetHeight - 40 - 64 - 22 - 40;
    }  
    // console.log(this.heights-88)
    // console.log(this.upData(this.item))
    //debugger;
    //this.getTableDataParams();
    // cell-click   (row, column, cell, event)
  },
  mounted() {
    //zb 下属企业合并行
    //if(this.item.id == "xsqydkdbqk" || this.item.id == "xsqydydkqk")this.getSpanArr(this.item.datas);
    //document.getElementsByClassName("el-tabs__item")[0].click();
    //debugger;
    // this.getTableDataParams();
    this.upData(this.item);

    // 设置表格高度（自适应）
      this.setTableScollHeight();
    // const me = this
    //     // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
    //     window.onresize = () => {
    //         return (() => {
    //             window.offsetHeight = document.body.offsetHeight;
    //             me.offsetHeight = window.offsetHeight;
    //             // me.heights = document.body.offsetHeight - 40 - 64 - 22;;
    //         })()
    //     }
    // this.$nextTick(() => {
    //   debugger;
    //   this.upData(this.item);
    //   this.$forceUpdate()
    // })
  },

  methods: {
    // / 页面大小改变时触发  主要用来自适应页面的布局的 
    setTableScollHeight(){
      debugger
        debugger
        this.heights = document.documentElement.clientHeight - 22 - 40 - 40 - 64 ;
        const me = this ;
        window.onresize = function temp(){
            me.heights = document.documentElement.clientHeight - 22 - 40- 40 - 64 ;
        };
    },
    handleDownload(vue) {//导出 zb
      vue.downloadLoading = true
      import('@/excel/Export2Excel').then(excel => {
        const tHeader = [],filterVal = [];//tHeader：列名称  filterVal：列id
        const columns = vue.item.config.columns;
        if(columns && columns.length > 0){
           for(let i = 1;i < columns.length;i++){
              if((columns[i].text || columns[i].text == "") && !columns[i].hidden)tHeader.push(columns[i].text);//列名称存在而且列显示
              if(columns[i].id && !columns[i].hidden)filterVal.push(columns[i].id);//列id存在而且列显示
           }
           tHeader.push(columns[0].text);
           filterVal.push(columns[0].id);
        }
        let list = vue.item.datas;//获取数据
        if((!vue.item.datas || vue.item.datas) && !vue.item.config.sql)list = vue.item.config.rows;//cube配置查询不到数据时，显示配置的行数据
        const data = vue.formatJson(filterVal, list);//根据id获取相应的数据
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: vue.item.text,//导出表的表名称
          autoWidth: "200px",
          bookType: 'xlsx'  //导出的类型
        })
        vue.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    btnClick(btn) {
      btn.handler(this, btn);
    },
    //pagesize改变时触发 ---- 分页功能
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    //currentPage改变时会触发 --- 分页功能
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    setTableDatas(item) {
      let rows = item.config.rows;
      let tempDatas = [];
      if (rows && rows.length > 0) {
        tempDatas =  rows;
      }else{
        tempDatas =  item.datas;
      }
      this.$set(this,"tableDatas",tempDatas)
      return this.tableDatas;
    },
    upData(item) {
      debugger;
      this.$set(this.item, "datas", item.datas);
      this.$set(this, "item", item);
      this.setTableDatas(item);
      let refs = this.$refs;
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
      //自定义要显示的内容。
      if(this.item.divContent){
        if(this.item.customDivCotent && typeof this.item.customDivCotent == "function"){
          let divContent = this.item.customDivCotent(this);
        }else {
          if(this.$store.getters.company != "1001"){
            this.divShow = true;
            this.tableShow = false;
            let html = "<div>此公司没有查看此报表的权限！</div>";
            this.divContent = html; 
          }else {
            this.divShow = false;
            this.tableShow = true;
          }
        }
      }
      
      //添加表头的内容
      if(this.item.tableBefore){
        this.tableBefore();
      }
    },
    //添加在表头要加的内容
    tableBefore(){
      debugger;
      let me = this;
      if(this.item.tableBeforeFun && typeof this.item.tableBeforeFun == "function"){
        this.titleText = this.item.tableBeforeFun(this,this.titleText);
      }else {
        let period = me.$store.selectPeriod;
        let year = period.substring(0,4);
        let month = period.substring(4,6);
        let company = me.$store.getters.companyName;
        // let unit = "单位：元";
        let pStyle = "height:30px;line-height:30px;font-weight:bold;";
        let snStyle = "padding:5px 10px;";
        let currentUnit = "元";
        let html = "<p style='" + pStyle + "'><span style='"+snStyle+"'>" + company + 
        "</span><span  style='"+snStyle+"'>(期间：" + year + "年" + month + "月" + "</span><span>单位：" + currentUnit + ")</span></p>";
        this.titleText = html;
      }
    },
    rowClass({ row, rowIndex }) {
      // 头部颜色和居中配置,马军2018.12.24
      return "background:#F0F8FF;text-align: center";
    },
    /**
     * 单元格级别样式设置
     */
    /**
     * 单元格样式处理，自己可以在自己的item里配制默认实现
     */
    cellStyle(row) {
      if (this.item.cellStyle && typeof this.item.cellStyle == "function") {
        return this.item.cellStyle(row, this);
      }
      let css = "padding: 4px 0;",record = row.row;
      let pro = row.column.property;
      if (!pro || !record.hasOwnProperty(pro)) {
        return css;
      }
      let levelProperties = this.item.levelProperties || this.levelProperties;
      let textIndent = "";
     
      let levelPro = levelProperties[pro];
      if (levelPro && record[levelPro]) {
        let level = record[levelPro] || 1;
        textIndent =
          level > 1 ? "text-indent: " + (level - 1) * 20 + "px;" : ";";
      }
      let drillProperties = this.item.drillProperties || this.drillProperties;
      if (drillProperties.indexOf(pro) != -1) {
        let drill = "text-decoration: none;color: #428bca;cursor: pointer;";
        css = css + "font-weight:bold;" + textIndent + drill;
        return css;
      } else {
        return css + textIndent;
      }
    },
    /**
     * 单元格单击默认事件
     */
    onCellClickDefault(row, column, cell, event) {
      // console.log(this)
      let listener = row._drill || row.drill;
      if (listener) {
        let cv = column.property + "",
          len = cv.length;
        // console.log(cv)
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
    // onRowClick(row,e,column) {
    //    if(this.item.onRowClick && typeof(this.item.onRowClick) == "function"){
    //         return this.item.onRowClick(row, column, e,this);
    //     }
    //     this.onCellClickDefault(row, column, e);

    //  },
    /**
     * 单元格单击事件
     */
    onCellClick(row, column, cell, event) {
      if (this.item.onCellClick && typeof this.item.onCellClick == "function") {
        return this.item.onCellClick(row, column, cell, event, this);
      }
      this.onCellClickDefault(row, column, cell, event);
      // this.dialogVisible = true
      // this.a = event.path[0].innerHTML //获取到某一个单元格数据
      // this.b = event.target.innerHTML//获取到某一个单元格数据
      // // event.target.innerHTML = "";//改变单元格里面的数据
      // event.target.style.backgroundColor = "red"
      // cell.style.backgroundColor = "red"
      // // console.log("b",b)
      // // console.log(event.target)
      // console.log(column)
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = {};
      columns.forEach((column, index) => {
        let datas = 0;
        if (column.property.length == 1) {
          data.forEach((row, index) => {
            datas += row[column.property];
          });
        }
        sums[column.property] = datas;
      });
      return sums;
    },

    /**
     * 获取rowspan
     */
    getCellRowSpan(datas, row, config) {
      return datas.filter(
        record => record[config.idProperty] === row[config.idProperty]
      ).length;
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
    //  getSpanArr(data) {　//合并行
    //       for (var i = 0; i < data.length; i++) {
    //         console.log(data[i].rowspan)
    //         if (i === 0) {
    //           this.spanArr.push(1);
    //           this.pos = 0
    //         } else {
    //           // 判断当前元素与上一个元素是否相同
    //         if (data[i].dim_company === data[i - 1].dim_company) {
    //             this.spanArr[this.pos] += 1;
    //             this.spanArr.push(0);
    //           }
    //           else {
    //             this.spanArr.push(1);
    //             this.pos = i;
    //           }
    //         }
    //       }
    //  },
    rowSpanAndColSpanHandler({ row, column, rowIndex, columnIndex }) {
      //合并行

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
      if (
        this.item &&
        this.item.rowSpanAndColSpanHandler &&
        typeof this.item.rowSpanAndColSpanHandler == "function"
      ) {
        let cells = this.item.rowSpanAndColSpanHandler(
          { row, column, rowIndex, columnIndex },
          this
        );
        return cells;
      }
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
    }
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
.toolbar {
  margin: 2px 0 5px 0;
}
.el-table {
  background-color: transparent !important;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}
/* 横向滚动条 12.26 */
.el-scrollbar__bar.is-horizontal > div {
  height: 0;
}
/*sjz加的*/
.el-table__body-wrapper{
  overflow: auto;
} 
/* 数字靠右 */
/* .el-table td.is-center {
  text-align: right;
     
} */
table th.gutter {
    display: none ;
}
.el-scrollbar__thumb {
    display: none;
}
/* 自定义显示的内容的样式 */
.divContent {
    text-align: center;
    font-weight: bold;
    /* height: 300px; */
    line-height: 60px;
    font-size: 20px;
    background-color: #ddd;
    color: red;
}
</style>
