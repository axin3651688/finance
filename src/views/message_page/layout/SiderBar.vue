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
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/new_icon/home_page.svg" class="img-selected">
            <img src="@ma/new_icon/home_page_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/msg" class="nav-item">
          <div class="nav-item_inner nav-item_text">消息</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/new_icon/message_selected.svg" class="img-selected">
            <img src="@ma/new_icon/message_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/contact" class="nav-item">
          <div class="nav-item_inner nav-item_text">通讯录</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/new_icon/person_selected.svg" class="img-selected">
            <img src="@ma/new_icon/person_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <li class="nav-item nav-item_quit">
          <div class="nav-item_inner nav-item_text" @click="logout()">退出</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/new_icon/quit.svg" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {logout} from "~api/interface.js";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "SiderBar",
  width: {
    $route: {
      handler: function (val, oldVal) {
        console.log('234343-2=-3402=3402=3', val);
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    logout() {
      // todo备以后用,先不删
      // localStorage.removeItem("database");
      // this.$store.dispatch("clearCurrentState");
      logout()
        .then(res => {
          // console.log(res.data.msg);
          // 清除token
          localStorage.removeItem("authorization");
          this.$router.push("/message_login");

          // electron 退出处理
          if (window.require) {
            var ipc = window.require('electron').ipcRenderer
          }
          if (window.require) {
            ipc.send('web_outLogin', '')
          }

        })
        .catch(res => {
          console.error("退出请求失败");
          localStorage.removeItem("authorization");
          this.$router.push("/message_login");
        });
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";
  @import "../styles/element.scss";

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
        $navItemHeight: 80px;
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
          display: flex;
          align-items: center;
          justify-content: center;
          background: $colorBgSiderBar;
          transition: all .2s;
          .img-unselected {
            display: block;
          }
          .img-selected {
            display: none;
          }

          img {
            width: 30px;
            height: 30px;
          }
        }

        &:hover {
          .nav-item_icon {
            background: $colorTheme;
            color: transparent;
            width: 5px;

            img {
              display: none;
            }
          }

        }
      }

      .nav-item.router-link-active {
        .nav-item_icon {
          background: $colorTheme;

          .img-unselected {
            display: none;
          }
          .img-selected {
            display: block;
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
