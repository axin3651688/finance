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
      <el-tag v-for="cc in item.config.columns" :key="cc.id">
        <BiTableColumn :col="cc" :tableData="item" ref="tchild" v-if="!cc.hidden"/>
      </el-tag>
    </el-table>
  </div>
</template>
 
<script>
import BiTableColumn from "./BiTableColumn";
import { apiItemDatas } from "utils/apiItemDatas";
import { handleOpen, convertData, isfold } from "utils/index";
import { findThirdPartData } from "~api/interface";
export default {
  components: {
    BiTableColumn
  },
  data() {
    return {
      formatData: [],
      nodes: []
    };
  },
  name: "Jtreegrid",
  props: ["item"],
  created() {
    console.log(this.item.datas);
    //额外添加属性,该属性不需要后台给
    this.formatData = convertData(this.item.datas);
    // 初始化展开第一行
    this.changeProp({ $index: 0, row: { id: this.companyId } });
    // bus接收底层传值
    this.$bus.on("fetchdata", this.changeProp);
  },
  computed: {
    companyId() {
      return this.$store.getters.company;
    }
  },

  beforeDestroy() {
    this.$bus.off("fetchdata");
  },

  methods: {
    rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },

    changeProp(dat) {
      // 改变父级的折叠属性
      console.log(dat);
      debugger;
      let record = this.item.datas[dat.$index];
      record._expanded = !record._expanded;
      this.fetchData(dat);
    },
    cellStyle(row) {
      debugger;
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
        console.log("paramsparams", params);
        debugger;
        findThirdPartData(params)
          .then(res => {
            console.log("数据", res);
            debugger;
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

    upData(item) {
      // debugger;
      this.$set(this, "formatData", item.datas);
      //清空记录
      this.nodes = [];
      // 初始化展开第一行.
      this.changeProp({ $index: 0, row: { id: this.companyId } });
    },

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
 


 