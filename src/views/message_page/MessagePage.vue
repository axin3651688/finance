<template>
  <div class="MessagePage">
    <div class="left">
      <sider-bar></sider-bar>
    </div>
    <div class="right">
      <div class="right-top">
        <top-bar></top-bar>
      </div>
      <div class="right-bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagePage",
  components: {
    TopBar: () => import('./layout/TopBar'),
    SiderBar: () => import('./layout/SiderBar')
  }
};
</script>

<style lang="scss" scoped>
  @import "./styles/variables.scss";
  @import "./styles/layout.scss";

  .MessagePage {
    @include flex();
    overflow: hidden;
    height: 100vh;
    /*height: calc(100vh - 20px);*/

    .left, .right {
      height: 100%;
    }

    .right {
      flex: 1;
      height: 100%;
      @include flex($direction: column);

      .right-top {
        height: $sizeTopBarHeight;
        background: #ffffff;
      }

      .right-bottom {
        position: relative;
        overflow: hidden;
        flex: 1;

        &:after {
          $afterHeight: 20px;
          position: absolute;
          display: block;
          content: '';
          height: $afterHeight;
          width: 100%;
          background: $colorTheme;
          top: -$afterHeight;
          box-shadow: 0px 3px 60px rgba(0, 0, 0, 0.16);
        }
      }
    }
  }
</style>
