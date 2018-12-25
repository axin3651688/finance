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
import btn from './core/btn'

export default {
  name: "MessagePage",
  components: {
    TopBar: () => import('./public/TopBar'),
    SiderBar: () => import('./public/SiderBar'),
    Message: () => import('../Message.vue')
  }
};
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";
  @import "../styles/layout.scss";

  .MessagePage {
    @include flex();
    height: 100vh;

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
          box-shadow: 0 5px 20px 0 rgba(0,0,0,.2);
        }
      }
    }
  }
</style>