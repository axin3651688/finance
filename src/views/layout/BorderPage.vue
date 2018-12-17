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
import webSocket from "../../utils/webSocket";
import { mapActions } from "vuex";
export default {
  name: "Lay",
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
  created(){
    let authorization = localStorage.getItem("authorization");
    debugger;
    this.initSocket(authorization);
  },
  methods: {
    ...mapActions(["ToggleSideBar"]),
    initSocket(authorization) {
       let url = "ws://192.168.1.118:7006/socket.io/" ;
      if(null != authorization){
         url = url +"?Authorization=" +authorization;
      }
      // debugger;
      webSocket({ url: url });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/public/mixin.scss";

.app-wrapper {
  // @include clearfix;
  // position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  // background-color: #f0f2f5;

  // &.mobile.openSidebar {
  //   position: fixed;
  //   top: 0;
  // }
}
</style>