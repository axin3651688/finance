<template>
  <div class="TopBar">
    <div class="topbar-left">
      <!--topbar-left-->
    </div>
    <!--<div class="topbar-right">-->
    <div class="topbar-right" @dblclick="web_minWindows()">
      <h3 class="page-title" v-if="messageStore.routeName">{{messageStore.routeName}}</h3>
      <h3 class="page-title" v-else="messageStore.routeName">首页</h3>
      <div class="btn-group">
        <span class="btn btn-mini" @click="web_minWindows()">-</span>
        <span class="btn btn-max" @click="web_maxWindows()"><></span>
        <span class="btn btn-close" @click="web_closeWindows()">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "TopBar",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['messageStore'])
  },
  methods: {

    web_minWindows() {
      // alert('web_minWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_minWindows', '')
      }

    },
    web_maxWindows() {
      // alert('web_maxWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_fullWindows', '')
      }
    },
    web_closeWindows() {
      // alert('web_closeWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_closeWindows', '')
      }
    },

    // 根据路由显示不同的标题
    showTitle() {
      let routeStr = this.$route.path;
      switch (routeStr) {
        case '/message_page/home':
          this.routeName = routeStr;
          break;
        case '':
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";
  @import "../styles/layout.scss";

  .TopBar {
    @include flex();
    height: $sizeTopBarHeight;

    .left, .right {
      height: 100%;
    }

    .topbar-left {
      width: $sizeNavBarWidth;
    }

    .topbar-right {
      position: relative;
      overflow: hidden;
      flex: 1;
      -webkit-app-region: drag;

      &:after {
        $afterWidth: 20px;
        position: absolute;
        display: block;
        content: '';
        width: $afterWidth;
        background: $colorTheme;
        left: -$afterWidth;
        top: 0;
        bottom: 0;
        box-shadow: 5px 0px 60px rgba(0, 0, 0, 0.16);
      }

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
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          transition: all .3s;
          -webkit-app-region: no-drag;
        }
      }
    }
  }
</style>
