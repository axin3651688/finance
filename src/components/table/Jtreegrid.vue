<template>
  <div>
    <el-table
      :row-style="showRow"
      v-bind="$attrs"
      class="content"
      :data.sync="formatData"
      border
      stripe
      height="item.height || rowClass"
      :cell-style="cellStyle"
    >
      <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id">
        <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild" v-if="!cc.hidden"/>
      </el-tag>
    </el-table>
  </div>
</template>
 
<script>
import BiTableColumnTree from "../table/BiTableColumnTree";
import { apiItemDatas } from "utils/apiItemDatas";
import { handleOpen, convertData, isfold } from "utils/index";
import { findThirdPartData } from "~api/interface";
export default {
  components: {
    BiTableColumnTree
  },
  data() {
    return {
      nodes: []
    };
  },
  name: "Jtreegrid",
  props: ["item"],
  created() {
    let me = this;
    // 下面接受子级触发事件,初始化不会加载下面
    this.$bus.$on("fetchdata", function(dat) {
      // 改变父级的折叠属性
      console.log(dat);
      debugger;
      let record = me.item.datas[dat.$index];
      record._expanded = !record._expanded;
      me.fetchData(dat);
    });
  },
  watch: {
    formatData(newid) {
      debugger;
      console.log(newid);
    }
  },
  computed: {
    data() {
      return this.item.datas;
    },
    formatData() {
      let flag = Cnbi.isEmpty(this.data);
      if (!flag) {
        debugger;
        return convertData(this.data);
      } else {
        console.error("亲！没有请求到数据，再检查下配置吧！");
      }
    }
  },

  beforeDestroy() {
    this.$bus.off("fetchdata");
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },
    // onRowClick(row, e, column) {
    //   // 在底层有列点击,顶层有行点击
    //   // debugger;
    //   if (this.item.onRowClick && typeof this.item.onRowClick == "function") {
    //     return this.item.onRowClick(row, column, e, this);
    //   }
    // },
    cellStyle(row) {
      // debugger;
      if (this.item.cellStyle && typeof this.item.cellStyle == "function") {
        return this.item.cellStyle(row, this);
      }
    },
    /**
     * 根据sql, params发请求,先加载子公司节点,在这里不加载所有
     */

    fetchData(dat) {
      var flag = handleOpen(dat.row.id, this.nodes);
      if (!flag) {
        var params = apiItemDatas(this.item, dat.row.id);
        debugger;
        findThirdPartData(params)
          .then(res => {
            // debugger;
            let data = res.data.data;
            //添加元素到指定位置
            data.unshift(dat.$index + 1, 0);
            Array.prototype.splice.apply(this.item.datas, data);
            this.formatData = convertData(this.item.datas);
          })
          .catch(res => {
            console.info(res);
          });
      } else {
        isfold(dat.row, this.formatData, "nlevel");
      }
    },

    // upData(item) {
    //   this.$set(this, "formatData", "");
    //   this.$set(this, "formatData", null);
    //   this.item = item;
    // },

    // 下面处理行的显影
    showRow(bean) {
      let row = bean.row;
      let style = row._isHide
        ? "display:none;"
        : "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;";
      return style;
    }
  }
};
</script>
<style rel="stylesheet/css" lang="scss">
.content {
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
  .el-input__inner {
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
}
</style>

 