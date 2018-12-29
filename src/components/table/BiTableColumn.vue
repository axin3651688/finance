<template>

  <el-table-column
    v-if="col.text == '公司编码'"
    :prop="col.id"
    :label="col.text"
    :width="col.width||80"
    >
      <template slot-scope="scope">
       <span
          v-if="iconShow(0,scope.row) "
          class="tree-ctrl"
          v-bind="$attrs"
          @click="toggleExpanded(scope.$index)" >
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
      </template>
  </el-table-column>


  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  自动序列rownumber==>index类型的数据-->
  <el-table-column
    v-else-if="col.type === 'index' "
    :prop="col.id"
    :label="col.text"
    :width="col.width"
    type="index"
  />
  <!-- :align="col.align||'center'" -->
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  number类型的数据-->
  <el-table-column
    v-else-if="col.type === 'number' "
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'left'"
    :width="col.width||100"
  >
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span>{{scope.row[col.id]}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  string类型的数据-->
  <el-table-column
    v-else-if="col.type === 'string'"
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'left'"
    :width="col.width||150"
  >
    <!-- :align="col.align||'center'" -->
    <!-- v-bind:class="getLevel(col._level||col.level||1) == 2 ? 'item2':'item3'"  [getLevel(col._level||col.level||1) == 2 ? 'item2':'item3']-->
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span>{{scope.row[col.id]}}</span>
        <!-- <span v-if="scope.row.balance!=0">
            <el-button type="text">{{ scope.row[col.id] }}</el-button>
        </span>
        <span v-else>{{ scope.row[col.id] }}</span> -->
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  decimal类型的数据    :cell-style = "rowClass"-->
  <el-table-column v-else-if="col.type === 'decimal'"
   :prop="col.id" :label="col.text"  :align="col.align|| 'center'" :width="col.width||150" >
    <template slot-scope="scope">
      <el-tooltip
        class="item"
        effect="light"
        :content="getCellValues(tableData.datas,col,scope,tableData.config.rows)"
        placement="right"
      >
        <span v-if="tableData.datas">{{ getCellValues(tableData.datas,col,scope,tableData.config.rows)}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  date类型的数据-->
  <el-table-column v-else-if="col.type === 'date'" :prop="col.id" :label="col.text"  :align="col.align|| 'left'">
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span v-if="tableData.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <el-table-column v-else-if="col.type === 'select'" :prop="col.id" :label="col.text"  :align="col.align|| 'left'">
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="top-start">
        <span v-if="tableData.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>

  <!-- <el-table-column v-else-if="!col.type" :prop="col.id" :label="col.text"  :align="col.align|| 'left'">
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="top-start">
        <span>请定义列{{col.text}}的类型</span>
      </el-tooltip>
    </template>
  </el-table-column> -->
</template>
<script>
//import EventMixins from "../mixins/EventMixins";
//import {getCellValue} from "../../utils/math"  scope.row.hasOwnProperty(col.id) &&
export default {
  name: "BiTableColumn",
  props: ["col", "tableData"],
  computed: {
    isFolder() {
      return this.col.children && this.col.children.length;
    },
    getLevel(level) {
      // console.info(level);
      return level + 1;
    }
  },
  methods: {
    // rowClass({ row, rowIndex }) {
      
    //   return "text-align:center";
    // },
    upData(item) {
        // debugger;
      // this.$set(this, "tableData", null);
      if(item.datas.length > 0 ){
           this.$set(this, "tableData", item);
           this.$set(this.tableData, "datas", item.datas);
      }else{
          this.$set(this, "tableData", null);
      }
      
    },
    /**
     * 获取单元格数据
     */
    getCellValues(datas, col, scope, rows) {
      let colId = col.id,row = scope.row;
      let rowId = row.id || row.nid;
      if (rowId && isNaN(rowId)) {
        return "--";
      }
      if(col.subfix || col.subfix === 0 ) {
        rowId = row["id"+col.subfix]; //并列行的后缀
        colId = colId.replace(col.subfix,"");
      }
      if(!row[colId]){
        return "--";
      }
      let value = 0 ; 
      if(Array.isArray(datas) && datas.length == 0){
         return "--";
      }
      console.info("111111111111",scope.row)
      if(rowId){
         value = Math.getCellValue(datas, colId, rowId, rows);
      }else if(datas.length >= scope.$index){
        value = datas[scope.$index][colId];
      }else{
        console.error("人才搞的配制："+JSON.stringify(row));
      }
      if (!value) {
        return "--";
      }
      // value = ((value - 0) / 10000).toLocaleString();
      // 千分位  保留两位小数
       value = Math.decimalToLocalString(value);//((value - 0) / 10000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

      return value;
    },
    //treeGrid function
     showRow(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.tableData.datas[trIndex];
      console.log(record)
      
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    },
    itemShow(index, record) {
      return index === item && record.children && record.children.length > 0;
    }
  },
  created() {
   // debugger;
    //this.$set(this, "tableData", null);
  }
};
</script>
<style lang="scss">
.el-table__body{
  // width: 6000px !important;
}
.el-table__header{
  // table-layout:auto;
 
}
.el-table__header-wrapper{
  // overflow-x: scroll;
}
.el-table thead {
  th {
    .cell {
      // max-width: 100%;
      // height: 100%;

      // overflow: hidden;
      // text-overflow: ellipsis;
      white-space: nowrap;
      // background-color: #000;
    }
  }
}
tbody {
  .el-table__row {
    td {
      .cell {
        // max-width: 100%;
        // height: 100%;
        // overflow: hidden;
        // text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
// 合并表头align=right不起效,
// 加下面样式 马军 2018/12/24 .el-table td,
// .el-table td,
 .el-table th {
   text-align: center;
 }
</style>
<style>
/* .el-tooltip__popper.is-dark {
  background: #fff;
  color: #000;
}
.el-tooltip__popper .popper__arrow {
  display: none;
}
.item2 {
  text-indent: 20px;
}
.item3 {
  text-indent: 40px;
} */
/*
  cxy treegrid + - style
*/
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #2196f3;
  margin-left: 18px;
}
</style>