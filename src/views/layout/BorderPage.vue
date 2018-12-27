<template>
  <div :class="classObj" class="app-wrapper">
    <leftMenu class="sidebar-container"/>
    <div class="main-container">
      <div @click="ToggleSideBar({opend:false})" class="shadow"></div>
      <el-scrollbar style="height: 100%">
        <router-view class="containerMain"></router-view>
      </el-scrollbar>
      <HeadNav></HeadNav>
    </div>
  </div>
</template>

<script>
import HeadNav from "./topnav/HeadNav";
import leftMenu from "./sidebar/Sidebar";
import ResizeMixin from "./mixin/ResizeHandler";
import "@/styles/black/index.scss"; // global css
import { mapActions } from "vuex";
export default {
  name: "BorderPage",
  data() {
    return {};
  },
  components: {
    HeadNav,
    leftMenu
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.sideopen.sidebar;
    },
    device() {
      return this.$store.state.sideopen.device;
    },
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
    ...mapActions(["ToggleSideBar"])
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