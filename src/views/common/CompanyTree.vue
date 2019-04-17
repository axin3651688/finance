<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      ref="tree2"
      :default-expanded-keys="key"
      highlight-current
      lazy
      accordion
      :expandOnClickNode="false"
      @node-click="handleNodeClick "
      :filter-node-method="filterNode"
      default-expand-all
    ></el-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCompanyTree } from "~api/interface.js";
import { setTimeout } from "timers";
export default {
  name: "",
  data() {
    return {
      key: [],
      props: {
        label: "text",
        children: [],
        isLeaf: "leaf"
      },
      firstcompany: []
    };
  },
  props: ["filterText"],
  created() {
    debugger;
    this.firstcompany = this.$store.getters.user.company;
    this.id = this.firstcompany.customerId;
    this.licenseId = this.firstcompany.licenseId;
  },
  watch: {
    filterText(val) {
      // console.log(this.$refs.tree2);
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    tree: () => import("@v/test/tree/tree")
  },
  mounted() {
    debugger;
    let me = this;
    setTimeout(() => {
      me.key = [1];
    }, 2000);

    // console.log(document.getElementsByClassName("el-tree-node__content"));
    // document.getElementsByClassName("el-tree-node__content")[0].click();
  },

  methods: {
    filterNode(value, data) {
      // console.log(value);
      // console.log(data);
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },

    // 异步树节点点击事件
    handleNodeClick(data) {
      // 把子组件的点击选择传回父组件
      this.$emit("click", data);
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      // 一级节点处理
      // console.log(node);

      debugger;
      if (node.level === 0) {
        // debugger;
        resolve([this.firstcompany]);
      }
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getIndex(node, resolve);
      }
    },
    // 异步加载叶子节点数据函数
    getIndex(node, resolve) {
      // 由于1级和二级的传值代号不一样一个取customerId,其他取id
      var id = node.level === 1 ? this.id : node.data.id;
      // console.log(id);
      if (!node.data.leaf || !node.data.nisleaf) {
        getCompanyTree(this.licenseId, "company", "0", id).then(res => {
          if (res.data.code === 200) {
            var data = res.data.data;
            // console.log(res.data);
            // debugger;
            // 处理节点是否是叶子节点
            data.forEach(et => {
              et.leaf = et.leaf == 0 ? false : true;
            });

            resolve(data);
          } else {
            alert("网络请求失败");
          }
        });
      } else return resolve([]);
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
</style>

