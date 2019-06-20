<template>
  <div>
    <!-- <el-button-group class="toolbar" v-if="item.toolbar && item.toolbar.length > 0 ">
      <el-button
        v-for="btn in item.toolbar"
        v-bind:key="btn.id"
        :style="btn.cellStyle"
        @click="btnClick(btn)"
      >{{btn.text}}</el-button>
    </el-button-group>-->
    <el-table
      :data.sync="tableDatas"
      border
      :stripe="true"
      :height="item.height || heights-90"
      :cell-style="cellStyle"
      @cell-click="onCellClick"
      :span-method="rowSpanAndColSpanHandler"
      :header-cell-style="{'background':item.class_bg ? item.class_bg:'#F0F8FF'}"
      style="widht:100%;"
    >
      <el-tag v-for="cc in item.columns" v-bind:key="cc.id">
        <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild" v-if="!cc.hidden"/>
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
</template>
<script>
import BiTableColumnTree from "./table/BiTableColumnTree";
import EventMixins from "./mixins/EventMixins";
export default {
  name: "BiTable",
  mixins: [EventMixins],
  components: {
    BiTableColumnTree
  },
  props: ["item"],
  data() {
    return {
      heights: document.body.clientHeight,
      flag: true,
      dialogVisible: false,
      currentPage: 1,
      pagesize: 1,

      id: 0,
      text: "",
      rows: [],
      tableDatas: [],
      // spanArr:[],////zb 下属企业合并行时用到
      columns: [],
      groupConfig: {
        idProperty: "group",
        textProperty: "groupName"
      },
      drillProperties: ["text", "text_"], //有钻取，给蓝色
      levelProperties: { text: "level", text_: "level_" } //加缩进
    };
  },
  watch: {
    heights(newval) {
      debugger;
      console.log(newval);

      this.heights = newval;
    }
  },
  mounted() {
    debugger;
    this.upData(this.item);
    console.log(this.item);
  },
  methods: {
    // btnClick(btn) {
    //   btn.handler(this, btn);
    // },
    // //pagesize改变时触发 ---- 分页功能
    // handleSizeChange: function(size) {
    //   this.pagesize = size;
    // },
    // //currentPage改变时会触发 --- 分页功能
    // handleCurrentChange: function(currentPage) {
    //   this.currentPage = currentPage;
    // },
    /**
     * @desc    : 数据在此做拼接然后传到data里面这样数据才能动态更新
     * @param   {Arry} item  prop传过来的
     * @author  : mj
     * @data    : 2019-02-15
     */
    setTableDatas(item) {
      let rows = item.config.rows.concat();
      // console.log(rows);
      let tempDatas = item.datas;
      if (rows && rows.length > 0) {
        rows.forEach(ele => {
          for (let i = 0, len = tempDatas.length; i < len; i++) {
            // debugger;
            if (ele.id == tempDatas[i].id) {
              ele = Object.assign(ele, tempDatas[i]);
              break;
            }
          }
        });
        this.$set(this, "tableDatas", rows);
      } else {
        this.$set(this, "tableDatas", tempDatas);
      }
      // console.log(this.item, "1111111111111");

      // console.log(rows);
      // console.log(tempDatas);
    },
    upData(item) {
      debugger;
      this.setTableDatas(item);
    },
    rowClass({ row, rowIndex }) {
      // 头部颜色和居中配置,马军2018.12.24
      // return "background:#F0F8FF;text-align: center";
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
      let css = "padding: 4px 0;",
        record = row.row;
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
        let drill = "text-decoration: none;color: #428bca;cursor: pointer";
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
      // debugger
      if (this.item.onCellClick && typeof this.item.onCellClick == "function") {
        return this.item.onCellClick(row, column, cell, event, this);
      }
      this.onCellClickDefault(row, column, cell, event);
    },
    getSummaries(param) {
      debugger;
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
      debugger;
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
/* 数字靠右 */
/* .el-table td.is-center {
  text-align: right;
} */
.gutter {
  display: none;
}
</style>