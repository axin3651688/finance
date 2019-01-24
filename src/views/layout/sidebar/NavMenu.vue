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
          <img :src="navMenu.avatar" v-if="navMenu.level===2" class="avatarleft fa-margin iconfont">
          <!--标题-->
          <span slot="title" class="eachItem">{{navMenu.text}}</span>
          <!-- </router-link> -->
        </el-menu-item>
      </el-tooltip>
      <!--有多级菜单-->
      <el-submenu
        v-if="navMenu.leaf==0"
        :key="navMenu.code"
        :data="navMenu"
        :index="navMenu.code"
        popper-append-to-body
      >
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

    /**
     * @name   :    shownavMenu
     * @说明   :    此判断是针对url不是json的,让它正常跳转,不是的就调用侧边栏点击加载配置文件。此方法是手机屏幕时,点击侧边栏子项,左边自动收缩
     * @param  参数名
     * @param  参数名
     * @author :    mj
     * @data   :    2019-01-24
     */
    shownavMenu(e) {
      //
      //
      if (this.device === "mobile") {
        this.ToggleSideBar({ opend: false });
      }
      if (e.url.indexOf(".json") > 0 || Cnbi.isEmpty(e.url)) {
        this.$router.push("/main");
        modeHandle(e);
      } else {
        this.$router.push({ path: e.url });
      }
    }
  }
};
</script>

