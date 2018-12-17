<template>
  <div>
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->
    <el-tree :data="dataCompany" ref="tree2" highlight-current></el-tree>
    <!-- <el-tree :data="companylist" ref="tree3" highlight-current></el-tree> -->
    <el-button type="primary" @click="qwe">测试</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { getcompanyTreee } from "~api/company.js";
import tree from "./tree/tree";
export default {
  name: "",
  components: { tree },
  data() {
    return {
      props: {
        label: "text",
        children: [],
        isLeaf: "leaf"
      },
      dataCompany: [{ id: "", label: "", level: 0, leaf: false }],
      firstcompany: [],
      filterText: "",
      count: 0,
      companylist2: [],
      companylist3: [],
      companylist4: [],
      companylist5: [],
      companylist6: []
    };
  },
  created() {
    this.firstcompany = this.$store.getters.user.company;
    this.id = this.firstcompany.customerId;
    this.licenseId = this.firstcompany.licenseId;
    // console.log(this.firstcompany);
    this.dataCompany[0].id = this.id;
    debugger;
    this.dataCompany[0].label = this.firstcompany.text;
    let parent = [];
    this.getIndex(this.id, parent);
    // debugger;
  },
  watch: {
    filterText(val) {
      console.log(this.$refs.tree2);
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    // this.axios.get("/api/company1").then(response => {
    //   this.companylist = response.data.data;
    //   debugger;
    //   console.log(this.companylist);
    // });
  },

  methods: {
    qwe() {
      console.log(this.companylist4);
    },
    isArrayFn(value) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(value);
      } else {
        return Object.prototype.toString.call(value) === "[object Array]";
      }
    },
    getIndex(id, parent) {
      debugger;
      getcompanyTreee(this.licenseId, "company", "0", id).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data;
          for (let index = 0; index < data.length; index++) {
            const et = data[index];
            if (et.leaf !== 0) {
              // 底下无子元素
              debugger;
              et.leaf = true;
              if (et.level === 2) {
                parent.push(et);
              } else {
                console.log(et.level);
                // parent发请求是为了得到儿子的,所以必须push进去
                parent.children.push(et);
              }
            } else {
              // 底下有子元素
              debugger;
              console.log(et.level);
              if (et.level === 2) {
                // parent.push(et);
              } else {
                console.log(et.level);
                // parent发请求是为了得到儿子的,所以必须push进去
                parent.children.push(et);
              }
              let sonparent = et;
              sonparent.children = [];
              this.getIndex(et.id, sonparent);
              et.leaf = false;
            }
            // console.log(et);
          }
          debugger;

          if (Array.isArray(parent)) {
            debugger;
            this.companylist2 = parent;
            console.log(this.companylist2);
          } else if (parent.level == 3) {
            this.companylist3.push(parent);
            console.log(this.companylist3);
          } else if (parent.level == 4) {
            this.companylist4.push(parent);
            console.log(this.companylist4);
          } else if (parent.level == 5) {
            this.companylist5.push(parent);
            console.log(this.companylist5);
          } else {
            this.companylist6.push(parent);
            console.log(this.companylist6);
          }
        } else {
          alert("网络请求失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

