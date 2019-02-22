<template>
  <div :class="classObj" class="app-wrapper">
    <OpenDialog/>
    <OpenMeluList/>
    <leftMenu class="sidebar-container" v-if="isShow()"/>
    <div class="main-container">
      <div @click="ToggleSideBar({opend:false})" class="shadow"></div>
      <el-scrollbar style="height: 100%">
        <router-view class="containerMain"></router-view>
      </el-scrollbar>
      <HeadNav v-if="isShow()"/>
      <Hamburger v-else class="img"/>
      <!-- <img v-else src="@a/list_menu.svg" class="img"> -->
    </div>
  </div>
</template>

<script>
import ResizeMixin from "@c/mixins/ResizeHandler";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "BorderPage",
  components: {
    Hamburger: () => import("@v/layout/sidebar/Hamburger"),
    HeadNav: () => import("./topnav/HeadNav"),
    leftMenu: () => import("./sidebar/Sidebar"),
    OpenDialog: () => import("@v/layout/dialog/OpenDialog.vue"),
    OpenMeluList: () => import("@v/layout/dialog/OpenMeluList.vue")
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
  .img {
    // background: #000;
    z-index: 100;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }
}
</style>