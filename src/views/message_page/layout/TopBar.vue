<template>
  <div class="TopBar">
    <div class="topbar-left">
      <!--topbar-left-->
    </div>
    <div class="topbar-right" @dblclick="web_minWindows()">
      <h3 class="page-title">首页</h3>
      <div class="btn-group">
        <span class="btn btn-mini" @click="web_minWindows()">-</span>
        <span class="btn btn-max" @click="web_maxWindows()"><></span>
        <span class="btn btn-close" @click="web_closeWindows()">X</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    web_minWindows() {
      alert('web_minWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_minWindows', '')
      }

    },
    web_maxWindows() {
      alert('web_maxWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_fullWindows', '')
      }
    },
    web_closeWindows() {
      alert('web_closeWindows');
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_closeWindows', '')
      }
    },

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
      /*user-select: none;*/
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
        box-shadow: 5px 0 20px 0 rgba(0,0,0,.2);
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
        }
      }
    }
  }
</style>
