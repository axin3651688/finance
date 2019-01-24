<template>
  <div>
    <el-table
      :row-style="showRow"
      v-bind="$attrs"
      :data.sync="formatData"
      height="item.height || rowClass"
    >
      <!--   :cell-style="cellStyle" -->
      <!-- class="content" -->
      <span v-for="cc in item" v-bind:key="cc.id">
        <TreeItem
          @fetchData="childEmit"
          v-if="cc.isTree"
          :prop="cc.id"
          :label="cc.text"
          :width="cc.width||80"
          :tableData="formatData"
        />
        <el-table-column v-else :prop="cc.id" :label="cc.text" :width="cc.width||80"></el-table-column>
      </span>
    </el-table>
  </div>
</template>
 
<script>
import { convertData, isfold, handleOpen } from "./asyncEval";
import TreeItem from "./TreeItem";
import { findDeptList } from "./findDeptList";
export default {
  components: {
    TreeItem
  },
  data() {
    return {
      formatData: [],
      nodes: [],
      item: [
        {
          text: "编码",
          width: 280,
          id: "id",
          isTree: true
        },
        {
          text: "描述",
          width: 300,
          id: "note"
        },
        {
          text: "部门",
          width: 200,
          id: "text"
        },
        {
          text: "人",
          width: 180,
          id: "ownerName"
        },
        {
          text: "userCount",
          width: 180,
          id: "userCount"
        }
      ]
    };
  },
  name: "Jtreegrid",
  created() {
    let data;
    findDeptList({ code: "1", companyId: "1" }).then(res => {
      data = res.data.data;
      console.log(data);
      let flag = Cnbi.isEmpty(data);
      if (!flag) {
        debugger;
        this.formatData = convertData(data);
        console.log(this.formatData);
      } else {
        console.error("亲！没有请求到数据，再检查下配置吧！");
      }
    });
  },
  computed: {
    companyId() {
      return this.$store.getters.user.company.id;
    }
  },

  methods: {
    childEmit(dat) {
      // 改变父级的折叠属性
      console.log(dat);
      debugger;
      let record = this.formatData[dat.$index];

      record._expanded = !record._expanded;
      console.log(record);

      this.fetchData(dat);
    },
    fetchData(dat) {
      var flag = handleOpen(dat.row.id, this.nodes);
      if (!flag) {
        debugger;
        let params = { code: dat.row.code, companyId: "1" };
        findDeptList(params)
          .then(res => {
            // debugger;
            let data = res.data.data;
            //添加元素到指定位置
            data.unshift(dat.$index + 1, 0);
            Array.prototype.splice.apply(this.formatData, data);
            this.formatData = convertData(this.formatData);
          })
          .catch(res => {
            console.info(res);
          });
      } else {
        isfold(dat.row, this.formatData, "level");
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
<style rel="stylesheet/css" lang="scss">
// .content {
//   .el-input__inner {
//     padding: 0px;
//   }
//   .el-input--suffix .el-input__inner {
//     border: none;
//   }
//   .el-button {
//     padding: 0px;
//     position: relative;
//   }
//   .el-input__inner {
//     background: transparent;
//     &::placeholder {
//       color: transparent;
//     }
//   }
//   .el-cascader {
//     background: transparent;
//     height: 27px;
//   }

//   .el-cascader .el-icon-arrow-down {
//     display: none;
//   }
//   .el-cascader__label {
//     padding: 0px;
//     background: transparent;
//     opacity: 0;
//     width: 100%;
//     height: 100%;
//   }
//   .el-table__body .el-table__row td {
//     padding: 4px 0;
//   }
// }
</style>
 
<style scoped>
/* .ms-tree-space {
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
} */
</style>

 