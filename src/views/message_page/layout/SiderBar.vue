<!--从element-ui的dialog改版过来的-->
<template>
  <div class="SiderBar">
    <div class="siderbar-top">
      <div class="login-info-wrap">
        <div class="login-info" @click="showMyInfo=!showMyInfo">
          <img :src="user.user.avatar" :title="user.user.trueName">
        </div>

        <my-dialog :value="showMyInfo" class="my-info-dialog">
          <user-info></user-info>
        </my-dialog>

      </div>
    </div>
    <div class="siderbar-middle">
      <ul>
        <router-link tag="li" to="/message_page/home" class="nav-item">
          <div class="nav-item_inner nav-item_text">首页</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/icon/home_page.svg" class="img-selected">
            <img src="@ma/icon/home_page_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/msg" class="nav-item">
          <div class="nav-item_inner nav-item_text">消息</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/icon/message_selected.svg" class="img-selected">
            <img src="@ma/icon/message_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/contact" class="nav-item">
          <div class="nav-item_inner nav-item_text">通讯录</div>
          <div class="nav-item_inner nav-item_icon">
            <img src="@ma/icon/person_selected.svg" class="img-selected">
            <img src="@ma/icon/person_unselected.svg" class="img-unselected">
          </div>
        </router-link>
      </ul>
    </div>
    <div class="sideervar-bottom">
      <div class="nav-item nav-item_quit">
        <div class="nav-item_inner nav-item_text" @click="dialogQuitVisible=true">退出</div>
        <div class="nav-item_inner nav-item_icon">
          <img src="@ma/icon/quit.svg" alt="">
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogQuitVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>确定要退出吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQuitVisible = false">取 消</el-button>
        <el-button type="primary" @click="doLogout()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {logout} from "~api/interface.js";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "SiderBar",
  data() {
    return {
      dialogQuitVisible: false, // 是否显示退出提示弹窗
      showMyInfo: false // 是否显示我的（登录用户的信息）
    }
  },
  components: {
    MyBtn: () => import('@mc/MyBtn'),
    MyDialog: () => import('@mc/MyDialog'),
    UserInfo: () => import('@mc/user_info/UserInfo.vue')
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    doLogout() {
      // todo备以后用,先不删
      // localStorage.removeItem("database");
      // this.$store.dispatch("clearCurrentState");
      this.dialogQuitVisible = false;
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
  @import "@ms/index.scss";

  .SiderBar {
    position: relative;
    box-sizing: border-box;
    background: $colorBgSiderBar;
    width: $sizeSiderBarWidth;
    height: 100%;
    color: #ffffff;
    padding: $sizeTopBarHeight 0;

    .siderbar-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
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

    .siderbar-middle {
      flex: 1;

      ul {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }

    .sideervar-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: $sizeTopBarHeight;
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
          width: 4px;

          img {
            display: none !important;
          }
        }

        .nav-item_text {
          background: rgba(57, 119, 234, 0.2);
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

  .my-info-dialog {
    width: $sizeNavBarWidth;
    z-index: 100;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.3);
    top: 100%;
    left: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #ffffff;
  }
</style>
