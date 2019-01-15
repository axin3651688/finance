<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"></el-input>
    <el-tree
      :props="props"
      :load="loadNode"
      node-key="id"
      ref="tree2"
      :default-expanded-keys="['1']"
      highlight-current
      lazy
      @node-click="handleNodeClick "
      :filter-node-method="filterNode"
    ></el-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCompanyTree } from "~api/interface.js";
export default {
  name: "",
  data() {
    return {
      props: {
        label: "text",
        children: [],
        isLeaf: "leaf"
      },
      firstcompany: [],
      filterText: ""
    };
  },
  created() {
    debugger
    this.firstcompany = this.$store.getters.user.company;
    this.id = this.firstcompany.customerId;
    this.licenseId = this.firstcompany.licenseId;
  },
  watch: {
    filterText(val) {
      console.log(this.$refs.tree2);
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    debugger;
    // console.log(document.getElementsByClassName("el-tree-node__content"));
    document.getElementsByClassName("el-tree-node__content")[0].click();
  },

  methods: {
    filterNode(value, data) {
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
      debugger
      // 一级节点处理
      console.log(node);

      // debugger;
      if (node.level === 0) {
        debugger;
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
      if (!node.data.leaf) {
        node.leaf = true;
        getCompanyTree(this.licenseId, "company", "0", id).then(res => {
          if (res.data.code === 200) {
            var data = res.data.data;
            debugger;
            console.log(data);
            // 处理节点是否是叶子节点
            data.forEach(et => {
              if (et.leaf !== 0) {
                et.leaf = true;
              } else {
                et.leaf = false;
              }
            });
            let data = res.data.data;
            // console.log(res.data);
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

