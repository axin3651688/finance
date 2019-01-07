<template>
  <!-- <div>father
    <child @click="getmsg" :item="item"></child>
  </div>-->
  <el-row class="block-col-2 qwe">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</template>

<script type="text/ecmascript-6">
import child from "./child";
export default {
  name: "",
  data() {
    return {
      faher: "我是father",
      item: {
        options: {
          type: "bi-gauge",
          datas: [["本期", "累计"], [2025, 54600]]
        },
        data: { id: 1, name: "123" }
      }
    };
  },
  components: { child },
  created() {
    this.update();
  },
  methods: {
    getmsg(e) {
      debugger;
      console.log("我是父组件" + e);
    },
    update() {
      this.item.options.datas = [["本期", "累计"], [2025, 5460]];
    }
  }
};
</script>

<style  lang="scss" scoped>
.qwe {
  position: fixed;
  margin-top: 400px;
}
</style>
