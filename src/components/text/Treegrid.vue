<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" class="content">
    <el-table-column v-if="columns.length===0" width="120">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        <!-- {{ scope.$index }} -->
      </template>
    </el-table-column>
    <el-table-column
      v-for="(column, index) in columns"
      v-else
      :key="column.value"
      :label="column.text"
      :width="column.width"
    >
      <template slot-scope="scope">
        <span
          v-for="space in scope.row._level"
          v-if=" column.text != '操作' && index === 0"
          :key="space"
          class="ms-tree-space"
        />
        <span
          v-if="iconShow(index,scope.row) "
          class="tree-ctrl"
          @click="toggleExpanded(scope.$index)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        <span v-if=" column.text != '操作'">{{ scope.row[column.value] }}</span>

        <el-button type="text" v-if="column.text === '操作'" @click="add">
          <!-- ... -->
          <img src="@/assets/green/list_menu.svg" alt>
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleChange"
          >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-button>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>
 
<script>
import treeToArray from "../treegrid/eval";
// data  columns list
export default {
  data() {
    return {
      options: [],
      dialogVisible: false,
      selectedOptions: [],
      // a:[{c:111},{b:222}]
    };
  },
  name: "TreeGrid",
  props: {
    /* eslint-disable */
    // item:{
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
    // item: Number
      list:{
        type:[Array,Function],
        default: () => []
      },
    // }
  },
  mounted() {
  },
  computed: {
    // 格式化数据源
    formatData() {
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
      // if(!this.isEmpty(this.item.list)){
          this.options = this.item.list
      // }
    
    },
    handleChange(value, done) {
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
  },
  created(){
    
    this.options = this.list
    // console.log("1111")
    // console.log(this.item)
    // console.log(this.isEmpty(this.a))
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