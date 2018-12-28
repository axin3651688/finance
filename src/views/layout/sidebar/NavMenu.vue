<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus" :key="navMenu.code">
      <!--只有一级菜单-->
      <!-- :disabled="disabled"  -->
      <el-tooltip class="item" effect="light" placement="right">
        <div slot="content">{{navMenu.text}}</div>
        <el-menu-item 
          v-if="navMenu.leaf==1"
          :key="navMenu.code"
          :data="navMenu"
          :index="navMenu.code"
          @click="shownavMenu(navMenu)"
        >
          <!--图标-->
          <!-- <router-link :to="navMenu.url"> -->
          <img :src="navMenu.avatar" v-if="navMenu.level===2" class="avatarleft fa-margin iconfont ">
          <!--标题-->
          <span slot="title" class="eachItem">{{navMenu.text}}</span>
          <!-- </router-link> -->
        </el-menu-item>
      </el-tooltip>
      <!--有多级菜单-->
      <el-submenu v-if="navMenu.leaf==0" :key="navMenu.code" :data="navMenu" :index="navMenu.code">
        <template slot="title">
          <img :src="navMenu.avatar" v-if="navMenu.level===2" class="avatarleft fa-margin iconfont">
          <span>{{navMenu.text}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.children"></nav-menu>
      </el-submenu>
    </label>
  </div>
</template>
 
<script>
import { mapGetters, mapActions } from "vuex";
import modeHandle from "utils/modeHandle";
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus"], // 传入子组件的数据
  computed: {
    ...mapGetters(["device", "user"])
  },
  methods: {
    ...mapActions(["ToggleSideBar"]),
    toModule(e) {
      if (this.device === "mobile") {
        this.ToggleSideBar({ opend: false });
      }
      this.user.company.id === 121
        ? this.$router.push("/tjsp/module")
        : this.$router.push("/jsnk/module");
      // this.$router.push({ path: "/module", name: "", params: {} });
      modeHandle(e);
    },
    shownavMenu(e) {
      //天津食品的管理驾驶舱的跳转，现在是跳转不了的,id=336。
      if (e.id == "336") {
        if (this.device === "mobile") {
          this.ToggleSideBar({ opend: false });
        }
        this.user.company.id === 121
          ? this.$router.push("/tjsp/module")
          : this.$router.push("/jsnk/module");
        // this.$router.push({ path: "/module", name: "", params: {} });
        modeHandle(e);
      }
      //  此判断是针对消息这样子的一级无子的菜单,让它正常跳转,如果不写,跳转后不会正常
      else if (e.level === 2) {
        console.log(e);
        // 此方法是手机屏幕时,点击侧边栏子项,左边自动收缩
        if (e.url == "/cnbi/json/source/tjsp/dash.json") {
          this.toModule(e);
        } else this.$router.push({ path: e.url });
      } else {
        this.toModule(e);
      }
    }
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}

</style>

