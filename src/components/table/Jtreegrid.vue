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
      @row-click="onRowClick"
    >
      <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id">
        <bi-table-column-tree :col="cc" :tableData.sync="item" ref="tchild" v-if="!cc.hidden"/>
      </el-tag>
    </el-table>
  </div>
</template>
 
<script>
import treeToArray from "../treegrid/eval";
import BiTableColumnTree from "../table/BiTableColumnTree";
import { apiItemDatas } from "utils/apiItemDatas";
import { handleOpen } from "utils/index";
import { findThirdPartData } from "~api/interface";
export default {
  components: {
    BiTableColumnTree
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
    debugger;
    this.convertData(this.item.datas);
    let me = this;
    // 下面接受子级触发事件,初始化不会加载下面
    this.$bus.$on("fetchdata", function(dat) {
      // 改变父级的折叠属性
      console.log(dat);

      let record = me.item.datas[dat.$index];
      record._expanded = !record._expanded;
      me.fetchData(dat);
    });
  },
  mounted() {},
  beforeDestroy() {
    this.$bus.off("fetchdata");
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },
    onRowClick(row, e, column) {
      // 在底层有列点击,顶层有行点击
      // debugger;
      if (this.item.onRowClick && typeof this.item.onRowClick == "function") {
        return this.item.onRowClick(row, column, e, this);
      }
    },
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
            // console.log(data);
            this.findAddData(dat, data);
            this.convertData(this.item.datas);
          })
          .catch(res => {
            console.info(res);
          });
      } else {
        this.isfold(dat.row);
      }
    },
    /**
     * 控制节点的展开和关闭
     */
    isfold(dat) {
      let tempArray = this.item.datas.filter(data => {
        if (data.pid == dat.id && data.nlevel == dat.nlevel + 1) {
          debugger;
          if (data.leaf == 0) {
            debugger;
            if (data._expanded == false) {
              data._isHide = !data._isHide;
              return true;
            }
            data._isHide = !data._isHide;
            // console.log(data.text);
            this.isfold(data);
          } else if (data.nlevel == dat.nlevel + 1) {
            // console.log(data.text);
            data._isHide = !data._isHide;
          }
          return true;
        }
      });
      // console.info(tempArray);
    },
    findAddData(code, data) {
      //添加元素到指定位置
      // debugger;
      data.unshift(code.$index + 1, 0);
      Array.prototype.splice.apply(this.item.datas, data);
    },

    /**
     * 格式化数据源
     */
    convertData(data) {
      debugger;
      let tmp;
      if (!Array.isArray(data)) {
        tmp = [data];
      } else {
        tmp = data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      let formatData = func.apply(null, args);
      this.$set(this, "formatData", formatData);
      // console.log(this.formatData);
      // debugger;
    },

    upData(item) {
      this.$set(this, "formatData", "");
      this.$set(this, "formatData", null);
      this.item = item;
      this.convertData();
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

 