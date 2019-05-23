<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"></el-input>
    <!-- :default-expanded-keys="key" -->
    <el-tree
      :data="navtreedata"
      node-key="scode"
      :props="props"
      class="filter-tree"
      :filter-node-method="filterNode"
      :highlight-current="true"
      :expand-on-click-node="false"
      :default-expanded-keys="expandKeys"
      @node-click="handleNodeClick"
      ref="navcomtree"
    ></el-tree>
    <!-- default-expand-all -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getCompanyTree } from "~api/interface.js";
import tools from "utils/tools";
// import { setTimeout } from "timers";
export default {
  name: "",
  props:{
    showCompanyDilog:Boolean
  },
  data() {
    return {
      filterText:"",
      navtreedata:[],
      expandKeys: [],
      props: {
        label: "codename",
        children: "children"
      },
      setting: {
        data: {
          simpleData: {
            enable: true,
            idKey: "scode",
            pIdKey: "spcode"
          },
          key: {
            name: "scode",
            children: "children"
          }
        }
      }
    };
  },
  // props: ["filterText"],
  created() {
    this.findNodes();
  },
  watch: {
    filterText(val) {
      this.$refs.navcomtree.filter(val);
    },
    showCompanyDilog(newValue,oldValue){
      this.navtreedata = [];
      this.findNodes();
    }
  },
  components: {
    tree: () => import("@v/test/tree/tree")
  },
  mounted() {
    // debugger;
    // let me = this;
    // setTimeout(() => {
    //   me.key = [1];
    // }, 2000);
  },
  methods: {
    findNodes () {
      let me = this;
      let suser = this.$store.state.user.user.user.userName;
      // let item = {
      //   "suser": suser
      // }
      getCompanyTree(suser).then(res => {
        if (res.status == 200 && res.data.code == 200) {
          //封装树对象数据
          let setting = me.setting;
          var data = res.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = me.filterDataOfEmpty(data);
            data = tools.sortByKey(data, "scode");
            data = data.filter(function(item) {
              if (item.scode == "1001") {
                //因为排序后的第一个不是天津食品集团，所以只能根据其编码来添加展开的问题
                item.open = true; //展开此节点
                me.expandKeys.push(item.scode);
              }
              item.codename = "(" + item.scode + ")" + item.sname; //拼写公司编码+公司名称
              return item;
            });
            me.navtreedata = tools.transformToeTreeNodes(setting, data);
          }
        } else {
          alert("网络请求失败");
        }
      });
    },
    /**
     * 过滤掉为空的
     */
    filterDataOfEmpty(data){
      let me = this;
      data = data.filter(item => {
        return item;
      });
      return data;

    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.sname.indexOf(value) !== -1 || data.scode.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      let me = this;
      //给当前点击的节点设置样式。
      // me.setStyleOfCurrentClick();
      // 把子组件的点击选择传回父组件
      this.$emit("click", data);
    },
    setStyleOfCurrentClick () {
      let me = this;
    }
  }
};
</script>
<style lang="scss">
//css代码
.el-tree-node__expand-icon {
  border: 0;
  /*自定义，必要时用!important*/
}
.el-tree-node__expand-icon.expanded {
  /*自定义，必要时用!important*/
}
.is-current>.el-tree-node__content {
    background-color: #ddd !important;
  }
// }
</style>

