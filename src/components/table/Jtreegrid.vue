<template>
  <div>
    <el-button-group class="toolbar">
      <el-button
        v-if="item.toolbar && item.toolbar.length > 0 "
        v-for="btn in item.toolbar"
        v-bind:key="btn.id"
        :style="btn.cellStyle"
        @click="btnClick(btn)"
      >{{btn.text}}</el-button>
    </el-button-group>
    <el-table
      :row-style="showRow"
      v-bind="$attrs"
      class="content"
      :data.sync="formatData"
      border
      stripe
      height="item.height || rowClass"
      :cell-style="cellStyle"
      @row-click="onRowClick"
    >
      <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id" v-if="!cc.hidden">
        <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild"/>
      </el-tag>
    </el-table>
  </div>
</template>
 
<script>
import treeToArray from "../treegrid/eval";
import EventMixins from "../mixins/EventMixins";
import BiTableColumnTree from "../table/BiTableColumnTree";
// data  columns list
export default {
  mixins: [EventMixins],
  components: {
    BiTableColumnTree
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      selectedOptions: [],
      formatData: []
    };
  },
  name: "Jtreegrid",
  props: ["item"],
  mounted() {
    // this.item.options = this.item.items[0].columns
  },
  created() {
    debugger;
    console.log("a", this.item);
    // this.item.rows = this.item.config.rows
    //  this.item.rows = this.item.datas

    this.array(this.item.datas);
    this.convertData();
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },
    onRowClick(row, e, column) {
      debugger;
      if (this.item.onRowClick && typeof this.item.onRowClick == "function") {
        return this.item.onRowClick(row, column, e, this);
      }
      // this.onCellClickDefault(row, column, e);
    },
    cellStyle(row) {
      //  debugger
      if (this.item.cellStyle && typeof this.item.cellStyle == "function") {
        return this.item.cellStyle(row, this);
      }
    },
    /**
     * 格式化数据源
     */
    convertData() {
      //alert(this.item.show)
      let tmp;
      if (!Array.isArray(this.item.rows)) {
        tmp = [this.item.rows];
      } else {
        tmp = this.item.rows;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      let formatData = func.apply(null, args);
      this.$set(this, "formatData", formatData);
    },

    upData(item) {
      this.$set(this, "formatData", "");
      this.$set(this, "formatData", null);
      this.item = item;
      debugger;
      this.convertData();
    },
    // 点击加载数据在下面做
    array(datas) {
      debugger;

      this.item.rows = datas;
    },
    tranformData(data, rootItem) {
      let me = this;
      let children = [];
      let dataArr = [];
      rootItem.children = children;
      for (let i = 0; i < data.length; i++) {
        let it = data[i];
        if (it.gsbm === rootItem.gsbm) {
          continue;
        }
        //满足条件的就塞进去，不满足的塞到另一个新数组中
        if (rootItem.gsbm == it.pid) {
          rootItem.children.push(it);
        } else {
          dataArr.push(it);
        }
      }
      if (rootItem.children && rootItem.children.length > 0) {
        for (let i = 0; i < rootItem.children.length; i++) {
          let tt = rootItem.children[i];
          me.tranformData(dataArr, tt);
        }
      }
      // console.log(rootItem);
    },
    add() {
      // debugger

      this.item.options = this.item.items[0].columns;
      console.log(this.item.options);
    },
    handleChange(id, done) {
      console.log(id);
      this.$confirm("<div>111</div>")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
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
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    },
    itemShow(index, record) {
      return index === item && record.children && record.children.length > 0;
    }
  }
};
</script>
<style rel="stylesheet/css" lang="scss">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.content {
  .el-table th > .cell {
    text-align: center;
  }
  .el-input__inner {
    padding: 0px;
  }
  .el-input--suffix .el-input__inner {
    border: none;
  }
  .el-button {
    padding: 0px;
    position: relative;
  }
  /deep/ .el-input__inner {
    background: transparent;
    &::placeholder {
      color: transparent;
    }
  }
  .el-cascader {
    background: transparent;
    height: 27px;
  }

  .el-cascader .el-icon-arrow-down {
    display: none;
  }
  .el-cascader__label {
    padding: 0px;
    background: transparent;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .el-table__body .el-table__row td {
    padding: 4px 0;
  }
}
</style>
 
<style scoped>
#app .containerMain {
  padding-top: 85px;
}
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
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #2196f3;
  margin-left: -18px;
}
.el-table td,
.el-table th {
  padding: 10px 0;
}
img {
  width: 20px;
  position: absolute;
  right: 50%;
  top: 5px;
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}
</style>