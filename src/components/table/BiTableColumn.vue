<template>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  自动序列rownumber==>index类型的数据-->
  <!-- v-if="isShow()" -->
  <el-table-column
    v-if="col.type === 'index' && isShow() "
    :label="col.text"
    :align="col.align|| 'center'"
    :width="col.width||70"
    type="index"
    fixed
  />

  <!--TreeItem组件单独针对树表前面折叠与展开列-->
  <TreeItem
    v-else-if="col.isTree"
    :prop="col.id"
    :label="col.text"
    :width="col.width||80"
    :tableData="tableData"
  />
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  string类型的数据   :fixed="left"-->
  <el-table-column
    v-else-if="col.type === 'string'"
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'left'"
    :min-width="col.width||150"
    :fixed="col.fixed|| false"
  >
    <!-- :fixed="col.fixed|| false" -->
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span>{{scope.row[col.id]}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="col.type== 'template' "
    :prop="col.id"
    :label="col.text"
    :width="col.width||80"
  >
    <template slot-scope="scope">
      <!-- 智慧报告催报里面的三个点 -->
      <el-button @click="optionColumnClick(scope.row)" type="text" size="small">
        <img v-if="col.icon" :src="col.icon" alt>
        <img v-else src="@a/list_menu.svg" alt class="img">
        <el-cascader :options="col.menu.list" @change="columnDropDownClick"></el-cascader>
      </el-button>
    </template>
  </el-table-column>

  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  number类型的数据-->
  <el-table-column
    v-else-if="col.type === 'number' "
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'right'"
    :min-width="col.width||120"
  >
    <template slot-scope="scope">
      <el-tooltip
        class="item"
        effect="light"
        :content="String(scope.row[col.id])"
        placement="right"
      >
        <span v-if="col.text==='行次'">{{scope.row.index}}</span>
        <span v-else>{{scope.row[col.id]}}</span>
      </el-tooltip>
    </template>
  </el-table-column>

  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  decimal类型的数据    :cell-style = "rowClass"-->
  <el-table-column
    v-else-if="col.type === 'decimal'"
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'right'"
    :min-width="col.width||140"
    @cell-style="cellStyle"
  >
    <template slot-scope="scope">
      <el-tooltip
        class="item"
        effect="light"
        :content="getCellValues(tableData.datas,col,scope,tableData.config.rows)"
        placement="right"
      >
        <span
          v-if="tableData.datas"
          @click="columnClick(col,scope)"
        >{{ getCellValues(tableData.datas,col,scope,tableData.config.rows)}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <!-- 渲染了表格的数据   做了判断  渲染对应的数据类型  date类型的数据-->
  <el-table-column
    v-else-if="col.type === 'date'"
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'left'"
  >
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="right">
        <span v-if="tableData.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="col.type === 'select'"
    :prop="col.id"
    :label="col.text"
    :align="col.align|| 'left'"
  >
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[col.id]" placement="top-start">
        <span v-if="tableData.datas">--</span>
      </el-tooltip>
    </template>
  </el-table-column>
</template>
<script>
import EventMixins from "../mixins/EventMixins";
import TreeItem from "./TreeItem";
import { mapGetters, mapMutations} from "vuex";
export default {
  name: "BiTableColumn",
  props: ["col", "tableData"],
  components: {
    TreeItem
  },
  data() {
    return {
      clickRow: {},
      clickRowParams: {},
      tmd: []
    };
  },
  mixins: [EventMixins],
  computed: {
    ...mapGetters(["sidebar", "device"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    ...mapMutations(['mutationSetCompanyId']),
    isShow() {
      // debugger;
      if (this.classObj.mobile) {
        return false;
      }
      return true;
    },
    columnDropDownClick(items) {
      let menuId = items[0];
      debugger;
      let menu = this.col.menu.list.filter(c => c.value === menuId)[0];
      if (menu && menu.listeners) {
        this.commonHandler(menu.listeners[0], this.clickRow, menu);
      }
    },

    columnClick(column, scope) {

      if (column.listeners || column.menu.list[0].listeners[0]) {
        // console.log(column.menu.list[0]);
        // console.log(column.menu.list[0].listeners[0]);
        this.commonHandler(column.listeners[0], column, scope);
        let companyId = scope.row.id;
        if(!companyId){
          companyId = 1;
        }
        this.mutationSetCompanyId(companyId)
      }
    },

    optionColumnClick(row) {
      this.clickRow = row;
      if (
        this.tableData.optionColumnClick &&
        typeof this.tableData.optionColumnClick == "function"
      ) {
        this.clickRowParams = this.tableData.optionColumnClick(
          row,
          event,
          this
        );
      }
    },
    /**
     * 获取单元格数据
     */
    getCellValues(datas, col, scope, rows) {
      let colId = col.id,
        row = scope.row;
      let rowId = row.id || row.nid;
      let union = false;
      if (rowId && isNaN(rowId)) {
        if (!row.hasOwnProperty(colId)) {
          return "";
        }
        return "--";
      }
      if (col.subfix || col.subfix === 0) {
        rowId = row["id" + col.subfix]; //并列行的后缀
        colId = colId.replace(col.subfix, "");
        union = true;
        //  debugger
      }
      //debugger
      if (!row[colId] && !union) {
        let temp = datas.filter(tempRow => {
          return tempRow.id == rowId;
        });
        if (temp.length > 0 && temp[0][colId]) {
          row = temp[0];
        } else {
          return "--";
        }
      }
      let value = 0;
      if (Array.isArray(datas) && datas.length == 0) {
        return "--";
      }
      if (rowId) {
        value = Math.getCellValue(datas, colId, rowId, rows);
      } else if (datas.length >= scope.$index) {
        value = datas[scope.$index][colId];
      } else {
        console.error("人才搞的配制：" + JSON.stringify(row));
      }
      if (!value) {
        return "--";
      }
      // value = ((value - 0) / 10000).toLocaleString();
      // 千分位  保留两位小数
      value = Math.decimalToLocalString(value); //((value - 0) / 10000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      return value;
    },
    cellStyle () {
      debugger;
      let me = this;
    }
  }
};
</script>
<style lang="scss">
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: transparent;
  z-index: 1;
}
.el-table__body {
  // width: 6000px !important;
}
.el-table__header {
  // table-layout:auto;
}
.el-table__header-wrapper {
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
  text-align: center !important;
}
</style>
<style scoped>
.img {
  width: 20px;
  position: absolute;
  right: 50%;
  top: 5px;
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}
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
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.ms-tree-space::before {
  content: "";
}
</style>