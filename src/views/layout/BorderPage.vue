<template>
  <div :class="classObj" class="app-wrapper">
<<<<<<< HEAD
    <OpenDialog/>
    <leftMenu class="sidebar-container" v-if="isShow()"/>
=======
    <leftMenu class="sidebar-container" v-if="isShow()&&flag"/>
>>>>>>> 4ce39e2f8d5e9e551ac77e8127df734b50733d71
    <div class="main-container">
      <div @click="ToggleSideBar({opend:false})" class="shadow"></div>
      <el-scrollbar style="height: 100%">
        <router-view class="containerMain"></router-view>
      </el-scrollbar>
<<<<<<< HEAD
      <HeadNav v-if="isShow()"/>
=======
      <HeadNav v-if="isShow()&&flag"/>
       <OpenDialog/>
>>>>>>> 4ce39e2f8d5e9e551ac77e8127df734b50733d71
    </div>
  </div>
</template>

<script>
import ResizeMixin from "./mixin/ResizeHandler";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BorderPage",
  components: {
    HeadNav: () => import("./topnav/HeadNav"),
    leftMenu: () => import("./sidebar/Sidebar"),
    OpenDialog: () => import("@v/layout/dialog/OpenDialog.vue")
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
}
</style>