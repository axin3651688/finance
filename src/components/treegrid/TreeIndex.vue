<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" class="content">
    <el-table-column v-if="columns.length===0" width="120">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
  </el-table>
</template>
 
<script>
import treeToArray from "./eval";
export default {
  data() {
    return {
      options: [],
      dialogVisible: false,
      selectedOptions: [],
      selectedOptions2: []
    };
  },
  name: "TreeIndex",
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: [Array, Function],
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    item: Number
  },
  mounted() {
    // console.log(this.item)
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },

  methods: {
    add() {
      this.axios.get("/api/operating").then(res => {
        console.log(res);
        this.options = res.data.operating;
        console.log(this.options);
      });
    },
    handleChange(value, done) {
      this.$confirm("<div>111</div>")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {});
    //   },
    showRow: function(row) {
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
}
</style>