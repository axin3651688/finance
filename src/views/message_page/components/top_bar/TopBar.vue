<template>
  <div class="TopBar">
    <div class="topbar-left">
      <search-bar></search-bar>
    </div>
    <!--<div class="topbar-right" @dblclick="web_minWindows()">-->
    <div class="topbar-right">
      <h3 class="page-title" v-if="messageStore.routeName">{{messageStore.routeName}}</h3>
      <h3 class="page-title" v-else>首页</h3>
      <div class="btn-group">
        <div class="btn btn-mini" @click="web_minWindows()">
          <img src="@ma/icon/minimize.svg">
        </div>
        <div class="btn btn-max" @click="web_fullWindows()">
          <img src="@ma/icon/full.svg">
        </div>
        <div class="btn btn-close" @click="web_closeWindows()">
          <img src="@ma/icon/close.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@mc/search_bar/SearchBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TopBar",
  components: {
    SearchBar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["messageStore"])
  },
  methods: {
    web_minWindows() {
      // alert('web_minWindows');
      if (window.require) {
        var ipc = window.require("electron").ipcRenderer;
      }
      if (window.require) {
        ipc.send("web_minWindows", "");
      }
    },
    web_fullWindows() {
      // alert('web_maxWindows');
      if (window.require) {
        var ipc = window.require("electron").ipcRenderer;
      }
      if (window.require) {
        ipc.send("web_fullWindows", "");
      }
    },
    web_closeWindows() {
      // alert('web_closeWindows');
      if (window.require) {
        var ipc = window.require("electron").ipcRenderer;
      }
      if (window.require) {
        ipc.send("web_closeWindows", "");
      }
    },

    // 根据路由显示不同的标题
    showTitle() {
      let routeStr = this.$route.path;
      switch (routeStr) {
        case "/message_page/home":
          this.routeName = routeStr;
          break;
        case "":
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@s/message/index.scss";

.TopBar {
  @include flex();
  height: $sizeTopBarHeight;

  .left,
  .right {
    height: 100%;
  }

  .topbar-left {
    box-sizing: border-box;
    width: $sizeNavBarWidth;
    border-right: 1px solid $colorBorderLayoutDark;
  }

  .topbar-right {
    position: relative;
    overflow: hidden;
    flex: 1;
    -webkit-app-region: drag;

    .page-title {
      height: 100%;
      padding: 0 50px;
      font-size: 18px;
      color: $colorText3;
      line-height: $sizeTopBarHeight;
      display: inline-block;
    }

    .btn-group {
      @include flex();
      justify-content: space-between;
      float: right;

      .btn {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        -webkit-app-region: no-drag;
        img {
          -webkit-app-region: no-drag;
        }
      }
    }
  }
}
</style>
