<template>
  <div class="TopBar">
    <div class="topbar-left">
      <search-bar></search-bar>
    </div>
    <!--<div class="topbar-right" @dblclick="web_minWindows()">-->
    <div class="topbar-right">
      <page-title class="page-title"></page-title>
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
import SearchBar from '@mc/search_bar/SearchBar.vue';
import PageTitle from '@mc/page_title/PageTitle.vue';

export default {
  name: 'TopBar',
  components: {
    SearchBar,
    PageTitle
  },
  data() {
    return {};
  },
  methods: {
    web_minWindows() {
      // alert('web_minWindows');
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer;
        ipc.send('web_minWindows', '');
      }
    },
    web_fullWindows() {
      // alert('web_fullWindows');
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer;
        ipc.send('web_fullWindows', '');
      }
    },
    web_closeWindows() {
      // alert('web_closeWindows');
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer;
        ipc.send('web_closeWindows', '');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@ms/index.scss";

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
    flex: 1;
    -webkit-app-region: drag;

    .page-title {
      height: 100%;
      display: inline-block;
    }

    .btn-group {
      @include flex();
      justify-content: space-between;
      float: right;
      height: 100%;

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
