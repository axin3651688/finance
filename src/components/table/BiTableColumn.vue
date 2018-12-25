<template>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  自动序列rownumber==>index类型的数据-->
  <el-table-column
    v-if="col.type === 'index' "
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
    :width="col.width||150"
  >
    <!-- :align="col.align||'center'" -->
    <!-- v-bind:class="getLevel(col._level||col.level||1) == 2 ? 'item2':'item3'"  [getLevel(col._level||col.level||1) == 2 ? 'item2':'item3']-->
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span>{{scope.row[col.id]}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  decimal类型的数据-->
  <el-table-column v-else-if="col.type === 'decimal'" :prop="col.id" :label="col.text">
    <template slot-scope="scope">
      <el-tooltip
        class="item"
        effect="light"
        :content="getCellValues(data.datas,col.id,scope.row,data.config.rows)"
        placement="right"
      >
        <span v-if="data.datas">{{ getCellValues(data.datas,col.id,scope.row,data.config.rows)}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  date类型的数据-->
  <el-table-column v-else-if="col.type === 'date'" :prop="col.id" :label="col.text">
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span v-if="data.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <el-table-column v-else-if="col.type === 'select'" :prop="col.id" :label="col.text">
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="top-start">
        <span v-if="data.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>
</template>
<script>
import EventMixins from "../mixins/EventMixins";
//import {getCellValue} from "../../utils/math"  scope.row.hasOwnProperty(col.id) &&
export default {
  name: "BiTableColumn",
  props: ["col", "data"],
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
    upData(item) {
      //   debugger;
      this.$set(this, "data", null);
      this.$set(this, "data", item);
      this.$set(this.data, "datas", item.datas);
    },
    /**
     * 获取单元格数据
     */
    getCellValues(datas, colId, row, rows) {
      //  debugger;
      let rowId = row.id || row.nid;
      if (isNaN(rowId)) {
        return "";
      }
      if (colId.indexOf("_") != -1) {
        rowId = row.id_; //并列行的
      }
      let value = Math.getCellValue(datas, colId, rowId, rows);
      if (!value) {
        return "--";
      }
      value = ((value - 0) / 10000).toLocaleString();
      return value;
    }
  },
  created() {
    //debugger;
  }
};
</script>
<style lang="scss">
.el-table__header{
  table-layout:auto;
 
}
.el-table__header-wrapper{
  // overflow-x: scroll;
}
.el-table thead {
  th {
    .cell {
      // max-width: 100%;
      // height: 100%;

      overflow: visible;
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
        overflow: visible;
        // text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
// 合并表头align=right不起效,
// 加下面样式 马军 2018/12/24 .el-table td,
.el-table td,
.el-table th {
  text-align: right;
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
</style>