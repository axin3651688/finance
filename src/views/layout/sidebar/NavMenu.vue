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
import modeHandle from "utils/modeHandle";
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus"], // 传入子组件的数据
  methods: {
    shownavMenu(e) {
      debugger;
      console.log(e);
      modeHandle(e);
      // this.$router.push({ path: "/module" });
    }
  }
};
</script>
