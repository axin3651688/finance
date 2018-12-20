<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus" :key="navMenu.code">
      <!--只有一级菜单-->
      <el-menu-item
        v-if="navMenu.leaf==1"
        :key="navMenu.code"
        :data="navMenu"
        :index="navMenu.code"
        @click="shownavMenu(navMenu)"
      >
        <!--图标-->
        <!-- <router-link :to="navMenu.url"> -->
        <img :src="navMenu.avatar" v-if="navMenu.level===2" class="avatarleft fa-margin iconfont">
        <!--标题-->
        <span slot="title" class="eachItem">{{navMenu.text}}</span>
        <!-- </router-link> -->
      </el-menu-item>
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
    shownavMenu(e) {
      //  此判断是针对消息这样子的一级无子的菜单,让它正常跳转,如果不写,跳转后不会正常
      if (e.level === 2) {
        // 此方法是手机屏幕时,点击侧边栏子项,左边自动收缩
        if (this.device === "mobile") {
          this.ToggleSideBar({ opend: false });
        }
        this.$router.push({ path: e.url });
      } else {
        if (this.device === "mobile") {
          this.ToggleSideBar({ opend: false });
        }
        this.user.company.id === 121
          ? this.$router.push("/tjsp/module")
          : this.$router.push("/jsnk/module");
        // this.$router.push({ path: "/module", name: "", params: {} });
        modeHandle(e);
      }
    }
  }
};
</script>
