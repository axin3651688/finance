<template>
  <div v-if="item.show">
    <el-table :row-style="showRow" v-bind="$attrs" class="content" :data.sync="formatData" border stripe>
    <el-table-column v-if="item.config.columns.length === 0" width="120" ref="tchild">
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
      v-for="(column, index) in item.config.columns"
      v-else
      :key="column.value"
      :label="column.text"
      :width="column.width"
      ref="tchild"
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
          <el-cascader :options="item.items[0].columns"  v-model="selectedOptions" @change="handleChange"></el-cascader>

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
  </div>
</template>
 
<script>
import treeToArray from "../treegrid/eval";
// data  columns list
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      selectedOptions: [],
      formatData:[]
    };
  },
  name: "TreeGrid",
  props: {
    /* eslint-disable */
    item:{
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

      options:{
        type:[Array,Function],
        default: () => []
      },
    }
  },
//  mounted() {
    // this.item.options = this.item.items[0].columns
   
 // },
  __computed: {
    // 格式化数据源
    formatData() {
      debugger
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
      let datas =  func.apply(null, args);
      console.info(datas);
      return datas;
    }
  },
  methods: {
     /**
      * 格式化数据源
      */
     convertData(){
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
        let formatData =  func.apply(null, args);
        this.$set(this, "formatData", formatData); 
     },

    //  rowClass({ row, rowIndex }) {
      //  height="item.height || rowClass"
    //   return "height:100%-64px";
    // },
    upData(item) {
       this.$set(this, "formatData", ""); 
      this.$set(this, "formatData", null); 
      this.item = item;
      debugger;
      this.convertData();
    },
    array(datas){
    debugger
    let data=datas
    // console.log("w",data)
    let arr = []
    let index=0
     let flag = false;
     //找到父亲
     let root;
     let rootItem;
     for(let i = 0; i < data.length-1;i++){
       let it = data[i];
       if(root&&it.scode==root){
          root = it.pid;
          rootItem = it;
       }else if (root) {
         continue;
       }else {
         for(let j = 0;j < data.length-1;j++){
          let tt = data[j];
          if(it.scode==tt.pid){
            root = it.pid;
            rootItem = it;
          }else {
            root = it.pid;
            rootItem =it;
            flag = true;
            break;
          }
        }
       }
       if(flag){
         break;
       }
    
    }
    // console.log(root,rootItem);

    if(root){
      debugger
      this.tranformData(data,rootItem);
    }

    this.item.rows = rootItem;

    // for(let i = 0; i < data.length-1;i++){
    //  flag=true
    //   for(let j = i+1; j < data.length;j++){
    //     if (data[i].scode == data[j].pid) {
    //       debugger
    //       if (flag) {
    //           arr[index]=data[i]
    //              arr[index].children=[data[j]]
    //          index++
    //          flag=false
    //             debugger
            
    //       }else{
    //         //  arr[index-1].children.push(data[j])
    //       }
    //     }

    //   } 
    
    // }
    
    // this.item.rows = arr;
    // console.log("11",arr);
    },
    // 孙子成写的------递归循环法
    tranformData(data,rootItem) {
      // debugger
      let me = this;
      let children = [];
      let itemArr = [];
      rootItem.children = children;
      for(let i = 0;i < data.length;i ++){
        let it = data[i];
        if(rootItem.scode==it.scode){
          continue;
        }
        if(rootItem.scode==it.pid){
          rootItem.children.push(it);
        }else {
          itemArr.push(it);
        }
      }
      if(rootItem.children&&rootItem.children.length>0){
          for(let i = 0;i <rootItem.children.length;i ++){
            let tt = rootItem.children[i];
            me.tranformData(itemArr,tt);
          }
      }
      // console.log(rootItem);
    },
    add() {
      // debugger
      // if(!this.isEmpty(this.item.options)){
        // this.dialogVisible = true
          this.item.options = this.item.items[0].columns
          console.log( this.item.options)
      // }
    
    },
    handleChange(value, done) {
      console.log(value)
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
    debugger
    console.log("a",this.item)
    this.item.rows = this.item.config.rows
  //  this.item.rows = this.item.datas
    this.array(this.item.datas)
     this.convertData();

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
  .el-table__body .el-table__row td{
    padding:4px 0;
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
  -moz-transform:rotate(-90deg);
  -webkit-transform:rotate(-90deg);
}
</style>