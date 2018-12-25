<template>
  <div class="SiderBar">
    <div class="siderbar-top">
      <div class="login-info">
        <img src="" alt="">
      </div>
    </div>
    <div class="siderbar-bottom">
      <ul>
        <router-link tag="li" to="/message_page/home" class="nav-item">
          <div class="nav-item_inner nav-item_text">首页</div>
          <div class="nav-item_inner nav-item_icon">@</div>
        </router-link>
        <router-link tag="li" to="/message_page/msg" class="nav-item">
          <div class="nav-item_inner nav-item_text">消息</div>
          <div class="nav-item_inner nav-item_icon">￥</div>
        </router-link>
        <router-link tag="li" to="/message_page/contact" class="nav-item">
          <div class="nav-item_inner nav-item_text">通讯录</div>
          <div class="nav-item_inner nav-item_icon">$</div>
        </router-link>
        <li class="nav-item nav-item_quit">
          <div class="nav-item_inner nav-item_text">退出</div>
          <div class="nav-item_inner nav-item_icon">#</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiderBar"
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";
  @import "../../styles/element.scss";

  .SiderBar {
    @include flex($direction: column);
    background: $colorBgSiderBar;
    width: $sizeSiderBarWidth;
    height: 100%;
    color: #ffffff;

    .siderbar-top {
      height: $sizeTopBarHeight;
      display: flex;
      justify-content: center;
      align-items: center;

      .login-info {
        @include imgBox($borderRadius: 50%);
        background: $colorTheme;
        cursor: pointer;
      }
    }

    .siderbar-bottom {
      flex: 1;

      ul {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .nav-item {
        $navItemHeight: 76px;
        position: relative;
        height: $navItemHeight;
        width: 100%;
        cursor: pointer;
        font-size: 14px;

        .nav-item_inner {
          text-align: center;
          line-height: $navItemHeight;
        }

        .nav-item_icon {
          position: absolute;
          overflow: hidden;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: $colorBgSiderBar;
          transition: all .3s;
        }

        &:hover {
          .nav-item_icon {
            background: $colorTheme;
            color: transparent;
            width: 5px;
          }
        }
      }

      .nav-item_quit {
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>