<template>
  <div :class="classObj" class="app-wrapper">
    <leftMenu class="sidebar-container" v-if="isShow()"/>
    <div class="main-container">
      <div @click="ToggleSideBar({opend:false})" class="shadow"></div>
      <el-scrollbar style="height: 100%">
        <router-view class="containerMain"></router-view>
      </el-scrollbar>
      <component :is="user.company.id === 121 ? 'tjsp' : 'jsnk'"></component>
      <HeadNav v-if="isShow()"/>
    </div>
  </div>
</template>

<script>
import HeadNav from "./topnav/HeadNav";
import leftMenu from "./sidebar/Sidebar";
import ResizeMixin from "./mixin/ResizeHandler";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "BorderPage",
  components: {
    HeadNav,
    leftMenu,
    jsnk: () => import("./topnav/jsnk.vue"),
    tjsp: () => import("./topnav/tjsp.vue")
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["sidebar", "device", "user"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  created() {},
  methods: {
    ...mapActions(["ToggleSideBar"]),
    isShow() {
      // debugger;
      if (this.classObj.mobile) {
        return false;
      }
      if (Cnbi.isEmpty(this.user)) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>