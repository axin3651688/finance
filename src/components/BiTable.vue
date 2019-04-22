<template>
<div>
  <div v-if="divShow" class="divContent" v-html="divContent"></div>
  <div v-else-if="tableShow">
    <div v-if="item.tableBefore" v-html="titleText">请添加你要显示的内容！</div>
    <!-- 判断写在外层，不然生成的没有配置toolbar的table时，上面会有一个空隙 -->
    <el-button-group class="toolbar" v-if="item.toolbar && item.toolbar.length > 0 ">
      <template 
        v-for="btn in item.toolbar"
      >
        <el-button
          v-if="btn.showBtn"       
          v-bind:key="btn.id"
          :style="btn.cellStyle"
          @click="btnClick(btn)"
        >{{btn.text}}</el-button>
      </template>
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
      id="publicTable"
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
      showBtn:true,//按钮显示与否。
      input3: '',
      heights: 827,
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
  watch: {},
  created() {
    /**
     * 页面原始高度：document.body.offsetHeight
     * 按钮背景高度：40
     * 导航栏高度：64
     * 间隙高度：15+7 = 22menupermisson
     */
    // debugger
    // for(let i = 0;i < this.$store.getters.user.menupermisson.length;i ++){
    //   if(this.$store.getters.user.menupermisson[i].text == "现金流量表"){
    //     console.log("这是一个神奇的东西：",this.$store.getters.user.menupermisson[i].text,"下标：",i);
    //   }
    //   console.log("用户demo：",this.$store.getters.user.menupermisson[i].text,"下标：",i);
    // }
    // console.log("用户：",this.$store.getters.user);
    // debugger
    if(this.item.stype == "table"){
      this.heights = document.body.offsetHeight - 40 - 64 - 15 ;
    }else{
      // 计算当前页面的高度 得出表格的高度
      this.heights = document.body.offsetHeight - 40 - 64 - 22 - 40;
    }
    //是否具有导出功能。localStorage
    this.showBtnOfExport();
    if(this.item.show){
      this.upData(this.item);
    }
    // this.upData(this.item);
    console.log(this.item) 
  },
  mounted() {
    // 设置表格高度（自适应）
      this.setTableScollHeight();
    this.upData(this.item);
  },

  methods: {
    /**
     * 根据角色的授权判断是否具有显示导出功能的权限。
     * @author szc 2019年4月10日13:38:14
     */
    showBtnOfExport () {
      // debugger;
      let me = this,siderState = JSON.parse(localStorage.siderState),toolbars = this.item.toolbar,
          menupermisson = this.$store.getters.user.menupermisson,menuItem;
      if(siderState && toolbars && toolbars.length > 0){
        menuItem = menupermisson.filter(item => {
          return item.id == siderState.code;
        });
      }
      toolbars.forEach(item => {
        item.showBtn = true;
      });
      if(menuItem[0].nexp == 0){
        toolbars.forEach(item => {
          if(item.text == "导出"){
            item.showBtn = false;
          }else {
            item.showBtn = true;
          }
        });
      }
    },
    // / 页面大小改变时触发  主要用来自适应页面的布局的 
    setTableScollHeight(){
      // debugger
        if(this.item.stype=="table"){
          this.heights = document.body.offsetHeight - 40 - 64 - 15 ;
        }else{
          this.heights = document.documentElement.clientHeight - 22 - 40 - 40 - 64 ;
        }        
        const me = this ;
        window.onresize = function temp(){
            if(me.item.stype=="table"){
              me.heights = document.body.offsetHeight - 40 - 64 - 15 ;
            }else{
              me.heights = document.documentElement.clientHeight - 22 - 40 - 40 - 64 ;
            } 
        };
    },
    /**
     * 把多表头转换成一个通用的columns
     * @author szc 2019年4月11日14:36:30
     */
    parseColmns (columns,rootColmuns) {
      let me = this;
      for(let i = 0;i < columns.length;i ++){
        if(columns[i].children && columns[i].children.length > 0){
          me.parseColmns(columns[i].children,rootColmuns);
        }else {
          if(!columns[i].hidden){
            rootColmuns.push(columns[i]);
          }
        }
      }
    },
    handleDownload(vue) {//导出 zb
      vue.downloadLoading = true
      import('@/excel/SZCExport2ExcelTable').then(excel => {
        //制造一个columns格式传过去。
        let rootColmuns = [],columns = vue.item.config.columns;
        let firstItem = columns[0];
        columns = columns.filter((item,index) => {
          return index != 0;
        });
        columns.push(firstItem);
        this.parseColmns(columns,rootColmuns);
        excel.export_table_to_excel("publicTable",vue.item.text,rootColmuns);
        // const tHeader = [],filterVal = [];//tHeader：列名称  filterVal：列id
        // const columns = vue.item.config.columns;
        // if(columns && columns.length > 0){
        //    for(let i = 1;i < columns.length;i++){
        //       if((columns[i].text || columns[i].text == "") && !columns[i].hidden)tHeader.push(columns[i].text);//列名称存在而且列显示
        //       if(columns[i].id && !columns[i].hidden)filterVal.push(columns[i].id);//列id存在而且列显示
        //    }
        //    tHeader.push(columns[0].text);
        //    filterVal.push(columns[0].id);
        // }
        // let list = vue.item.datas;//获取数据
        // if((!vue.item.datas || vue.item.datas) && !vue.item.config.sql)list = vue.item.config.rows;//cube配置查询不到数据时，显示配置的行数据
        // const data = vue.formatJson(filterVal, list);//根据id获取相应的数据
        // excel.export_json_to_excel({
        //   header: tHeader,
        //   data,
        //   filename: vue.item.text,//导出表的表名称
        //   autoWidth: "200px",
        //   bookType: 'xlsx'  //导出的类型
        // })
        // vue.downloadLoading = false
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
      // debugger;
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
      // debugger;
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
      let me = this;
      if(this.item.tableBeforeFun && typeof this.item.tableBeforeFun == "function"){
        this.titleText = this.item.tableBeforeFun(this,this.titleText);
      }else {
        let period = me.$store.selectPeriod;
        // let period = me.titleContentPeriod();
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
    /**
     * 可能存在不是选择日期的钻取。(做个兼容)
     * @author szc 2019年4月22日10:04:23
     */
    titleContentPeriod () {
      debugger;
      let me = this,year = this.$store.getters.year,month = this.$store.getters.month,period;
      if(me.$store.selectPeriod){
        return me.$store.selectPeriod;
      }else {
        if(month < 10){
          month = "0" + month;
          period = year + month;
        }else {
          period = year + "" + month;
        }
        return period;
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
      // debugger;
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
      debugger;
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
    /**
     * 单元格单击事件
     */
    onCellClick(row, column, cell, event) {
      debugger;
      if (this.item.onCellClick && typeof this.item.onCellClick == "function") {
        return this.item.onCellClick(row, column, cell, event, this);
      }
      this.onCellClickDefault(row, column, cell, event);
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
    rowSpanAndColSpanHandler({ row, column, rowIndex, columnIndex }) {
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
    }
  }
};
</script>
<style >
.toolbar {
  margin: 3px 0 5px 0;
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
