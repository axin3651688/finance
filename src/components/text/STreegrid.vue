<template>
<div>
  <!-- 
    name：sjz
    :style="item.style"   
    json里起作用，调滚动条x轴的 
  -->
<el-button-group  class="toolbar" >
    <el-button v-if="item.toolbar && item.toolbar.length > 0 " v-for="btn in item.toolbar" v-bind:key="btn.id" :style="btn.cellStyle"  @click="btnClick(btn)">{{btn.text}}</el-button>
  </el-button-group>
  <el-table
    :row-style="showRow"
    v-bind="$attrs"
    class="content"
    :data.sync="formatData"
    border
    stripe
    :height="heights"
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
import BiTableColumn from "../table/BiTableColumn";
import BiTableColumnTree from "../table/BiTableColumnTree";
// data  columns list
export default {
  mixins: [EventMixins],
  components: {
    BiTableColumn,
    BiTableColumnTree
  },
  data() {
    return {
      // sjz 加的  自适应需要
      heights: 0,
      offsetHeight: document.body.offsetHeight,
      list: [],
      dialogVisible: false,
      selectedOptions: [],
      formatData: [],
    };
  },
  name: "STreeGrid",
  props: ["item"],
  created() {
    debugger;
    console.log("a", this.item);
    // this.item.rows = this.item.config.rows
    //  this.item.rows = this.item.datas

    this.array(this.item.datas);
    this.convertData();
    //sjz 加的 
    if(this.item.stype == "tree"){ 
      this.heights = document.body.offsetHeight - 40 - 64 - 22 - 10;
    }else{
      // 计算当前页面的高度 得出表格的高度
      this.heights = document.body.offsetHeight - 40 - 64 - 22 - 40;
    } 
    
  },
  mounted() {
    this.convertData();
    // this.item.options = this.item.items[0].columns
    // sjz 加的 
    const me = this
    // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
    window.onresize = () => {
        debugger
        return (() => {
            window.offsetHeight = document.body.offsetHeight;
            me.offsetHeight = window.offsetHeight;
        })()
    }
  },
  watch:{
    // sjz 加的
    // 监听offsetHeight属性值的变化，打印并观察offsetHeight发生变化的值：
    offsetHeight(val){
        debugger
        if(!this.timer){
            debugger
            // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
            this.offsetHeight = val
            this.timer = true
            let me = this
            setTimeout(function(){
                // 打印offsetHeight变化的值me.item.id=="zcfzbej" || me.item.id=="lrbej" || me.item.id=="xjllbej"
                if(me.item.stype == "tree"){ 
                  me.heights = document.body.offsetHeight - 40 - 64 - 22 - 10 ;
                }else{
                  me.heights = document.body.offsetHeight - 40 - 64 - 22 - 40 ;
                }
                console.log(me.offsetHeight)
                me.timer = false
            },400)
        }
    }
  },
  __computed: {
    // 格式化数据源
    formatData() {
      let tmp;
      if (!Array.isArray(this.item.rows)) {
        tmp = [this.item.rows];
      } else {
        tmp = this.item.rows;
      }
      // return this.item.rows = this.item.datas;
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },
  methods: {
    
    handleDownload(vue) {//导出 zb
      vue.downloadLoading = true
      import('@/excel/Export2Excel').then(excel => {
        const tHeader = [],filterVal = [];//tHeader：列名称  filterVal：列id
        const columns = vue.item.config.columns;
        if(columns && columns.length > 0){
           for(let i = 1;i < columns.length;i++){
              if(columns[i].text && !columns[i].hidden)tHeader.push(columns[i].text);//列名称存在而且列显示
              if(columns[i].id && !columns[i].hidden)filterVal.push(columns[i].id);//列id存在而且列显示
           }
           tHeader.push(columns[0].text);
           filterVal.push(columns[0].id);
        }
        const list = vue.item.datas;//获取数据
        const data = vue.formatJson(filterVal, list);//根据id获取相应的数据
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: vue.item.text,//导出表的表名称
          autoWidth:  "200px",
          bookType: 'xlsx' //导出的类型
        })
        vue.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    btnClick(btn){
        btn.handler(this,btn);
     },
    rowClass({ row, rowIndex }) {
      return "height:100%-64px";
    },
    onRowClick(row, e, column) {
      debugger
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
      // let css = "padding: 4px 0;";
      // let pro = row.column.property;
      // if (!pro) {
      //   return css;
      // }
      // let levelProperties = this.item.levelProperties || this.levelProperties;
      // let textIndent ="",record = row.row;
      // let levelPro = levelProperties[pro];
      // if (levelPro && record[levelPro]) {
      //     let level = record[levelPro] || 1;
      //     textIndent = level > 1 ? "text-indent: " + (level - 1) * 20 + "px;" : ";";
      // }
      // let drillProperties = this.item.drillProperties || this.drillProperties;
      // if (drillProperties.indexOf(pro) != -1) {
      //   let drill = "text-decoration: none;color: #428bca;cursor: pointer;";
      //   css = css + "font-weight:bold;" + textIndent + drill;
      //   return css;
      // } else {
      //   return css+textIndent;
      // }
    },
    /**
     * 格式化数据源
     */
    convertData() {
      debugger
      let tmp;
      if (!Array.isArray(this.item.datas)) {
        tmp = [this.item.datas];
      } else {
        tmp = this.item.datas;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      let formatData = func.apply(null, args);
      this.$set(this, "formatData", tmp);
    },

    upData(item) {
      debugger
      this.$set(this, "formatData", "");
      //  this.$set(this, "formatData", formatData);
      this.$set(this, "formatData", null);
      this.item = item;
      debugger;
      // sjz 调用一下递归生成树表类型
      this.array(this.item.datas)
      this.convertData();
    },
    array(datas) {
      debugger;
      let data = datas;
      // console.log("w",data)
      let arr = [];
      let index = 0;
      let flag = false;
      //找到父亲,可能存在好多个父节点，但是一般是一个，暂时只做一个处理。
      let root, rootItem, demoItem;
      let rootArr = [];
      if (data && data.length > 0) {
        demoItem = data[0];
        if (demoItem.pid) {
          for (let i = 1; i < data.length - 1; i++) {
            let eveItem = data[i];
            //公司gsbm，数据sql查出来是这样的字段，所以暂时用这个，后面在改
            if (eveItem.gsbm == demoItem.pid) {
              demoItem = eveItem;
            }
          }
          rootItem = demoItem;
        } else {
          rootItem = demoItem;
        }
      }
      //找到多个父节点
      for (let i = 0; i < data.length; i++) {
        if (!data[i].pid) {
          rootArr.push(data[i]);
        }
      }
      if (rootArr && rootArr.length > 1) {
        for (let i = 0; i < rootArr.length; i++) {
          let it = rootArr[i];
          this.tranformData(data, it);
        }
        this.item.rows = rootArr;
      } else {
        if (rootItem) {
          this.tranformData(data, rootItem);
          // console.log("根节点" + rootItem);
        }
        this.item.rows = rootItem;
      }
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
      debugger
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