<template>
  <div class="SiderBar">

    <div class="siderbar-top">
      <relative-pop>
        <div class="login-info" v-if="user.user" :title="user.user.trueName">
          <avatar
            :username="user.user.trueName"
            :rounded="false"
            backgroundColor="transparent"
            color="#fff"
            size="30"
          ></avatar>
          <img :src="user.user.avatar" onerror="this.style.display='none'"/>
        </div>
        <div slot="pop">
          <user-info></user-info>
        </div>
      </relative-pop>
    </div>

    <div class="siderbar-middle">
      <ul>
        <router-link tag="li" to="/message_page/home" class="nav-item">
          <div class="nav-item_inner nav-item_icon" title="首页">
            <img src="@ma/icon/home_page.svg" class="img-selected">
            <img src="@ma/icon/home_page_unselected.svg" class="img-unselected">
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/msg" class="nav-item">
          <div class="nav-item_inner nav-item_icon" title="消息">
            <el-badge :value="messageCount === 0 ? '' : messageCount" :max="99" :class="{bigger: messageCount > 3}">
              <img src="@ma/icon/message_selected.svg" class="img-selected">
              <img src="@ma/icon/message_unselected.svg" class="img-unselected">
            </el-badge>
          </div>
        </router-link>
        <router-link tag="li" to="/message_page/contact" class="nav-item">
          <div class="nav-item_inner nav-item_icon" title="通讯录">
            <img src="@ma/icon/person_selected.svg" class="img-selected">
            <img src="@ma/icon/person_unselected.svg" class="img-unselected">
          </div>
        </router-link>
      </ul>
    </div>

    <div class="sideervar-bottom">
      <div class="nav-item nav-item_quit" @click="dialogQuitVisible=true">
        <div class="nav-item_inner nav-item_icon" title="退出">
          <img src="@ma/icon/quit.svg" class="img-unselected">
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
import RelativePop from '@mc/relative_pop/RelativePop.vue';
import {LOGOUT} from '@m_api/message.js';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'SiderBar',
  data() {
    return {
      dialogQuitVisible: false, // 是否显示退出提示弹窗
      showMyInfo: false // 是否显示我的（登录用户的信息）
    };
  },
  components: {
    RelativePop,
    UserInfo: () => import('@mc/user_info/UserInfo.vue')
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    messageCount() {
      let count = 0;
      if (this.messageStore.sessionList) {
        this.messageStore.sessionList.forEach(sessionItem => {
          count += sessionItem.count;
        });
      }
      return count;
    },
    newServerMsg() { // 服务器推送的消息
      return this.messageStore.newServerMsg;
    },
    serverAck() { // 服务器推送的 ack回执
      return this.messageStore.serverAck;
    }
  },
  watch: {
    // 监听服务器推送的消息
    newServerMsg(val) {
      console.log('监听到服务器推送：', val);
      debugger;
      let sessionItem = {};
      sessionItem['miniType'] = val.code;
      sessionItem['count'] = 1;
      sessionItem['content'] = val.data.content;
      sessionItem['sendTime'] = val.data.sendTime;
      sessionItem['originData'] = val.data;
      sessionItem['name'] = null;
      sessionItem['avatar'] = null;
      sessionItem['id'] = null;
      sessionItem['targetId'] = val.code + '_';
      switch (val.code) {
        case 1100: // 单聊
          sessionItem['name'] = val.data.name;
          sessionItem['avatar'] = val.data.avatar;
          sessionItem['id'] = val.data.senderId;
          sessionItem['targetId'] += val.data.senderId;
          break;
        case 1101: // 群聊
          sessionItem['name'] = val.data.otherName;
          sessionItem['avatar'] = val.data.otherAvatar;
          sessionItem['id'] = val.data.receiverId;
          sessionItem['targetId'] += val.data.receiverId;
      }

      // 如果这条消息的targetId不在sessionList中，这加到队首
      let targetId = sessionItem['targetId'];
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === targetId) {
          // 收到的消息来自当前聊天对象并且是聊天页面，不需增加计数
          if (targetId === this.messageStore.sessionActiveItem.targetId && this.$route.name.toLowerCase() === 'msg') {
            return false;
          }

          // 在队列, 并且没有打开聊天窗口，增加一条计数
          this.ActionUpdateSessionList({
            type: 'update',
            method: 'addCount',
            data: sessionItem
          });
          return false;
        }
      }
      this.ActionUpdateSessionList({
        type: 'addItem',
        data: sessionItem
      });
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    doLogout() {
      this.dialogQuitVisible = false;
      LOGOUT()
        .then(res => {
          // 清除登陆数据
          localStorage.removeItem('database');
          localStorage.removeItem('authorization');
          this.$router.push('/message_login');
          this.$store.dispatch('clearCurrentState');

          // electron 退出处理
          if (window.require) {
            var ipc = window.require('electron').ipcRenderer;
          }
          if (window.require) {
            ipc.send('web_outLogin', '');
          }
        })
        .catch(res => {
          console.error('退出请求失败');
          localStorage.removeItem('authorization');
          this.$router.push('/message_login');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .SiderBar {
    position: relative;
    box-sizing: border-box;
    background: $colorBgSideBar;
    width: $sizeSideBarWidth;
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

      /deep/ .RelativePop {
        .default-content {
          @include flex();
          justify-content: center;
          align-items: center;
        }

        .pop-wrap {
          left: 100%;
          top: 100%;
          width: $sizeNavBarWidth;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          background: #ffffff;
          z-index: 9;
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }

        .login-info {
          @include imgBox($borderRadius: 50%, $width: 30px, $height: 30px);
          background: $colorTheme;
          cursor: pointer;
          div {
            position: absolute;
          }
        }
      }

    }

    .siderbar-middle {
      flex: 1;

      ul {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0;
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
      $navItemHeight: 60px;
      position: relative;
      height: $navItemHeight;
      width: 100%;
      cursor: pointer;
      font-size: 14px;

      .nav-item_inner {
        text-align: center;
        line-height: $navItemHeight;

        &:hover {
          .img-unselected {
            opacity: 1;
          }
        }
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
        background: $colorBgSideBar;
        transition: all .2s;

        /deep/ .el-badge.bigger {
          .el-badge__content {
            right: 16px;
            height: 16px;
            line-height: 16px;
            padding-left: 5px;
            padding-right: 5px;
          }
        }

        .img-unselected {
          display: block;
          opacity: .55;
          transition: opacity .3s;
        }

        .img-selected {
          display: none;
        }

        img {
          width: 20px;
          height: 20px;
        }
      }

    }

    .nav-item.router-link-active {
      .nav-item_icon {

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
    position: absolute;
    width: $sizeNavBarWidth;
    z-index: 100;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.3);
    top: 100%;
    left: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    background: #ffffff;
  }
</style>
