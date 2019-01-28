<template>
  <div class="MessagePage">
    <div class="left">
      <side-bar></side-bar>
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
import {mapGetters, mapActions} from 'vuex';
import {MY_SESSION} from '@m_api/message.js';

export default {
  name: 'MessagePage',
  components: {
    TopBar: () => import('@mc/top_bar/TopBar'),
    SideBar: () => import('@mc/side_bar/SideBar')
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    /**
     * 获取session
     */
    getSession() {
      // debugger;
      MY_SESSION(this.loginUserId)
        .then(res => {
          res = res.data;
          if (res.code === 200 && res.data) {
            console.log('message左边栏====', res.data, '===message左边栏');
            this._initSessionBar(res.data); // 初始化消息左边栏
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              showClose: true
            });
          }
        })
        .catch(err => {
          console.log('请求message：', err);
        });
    },

    /**
     * 初始化session边栏, 并放到vuex中
     * 如果senderId是当前登陆用户的Id则不必加到sessiong列表
     */
    _initSessionBar(sessionList) {
      // debugger;
      let session = [];         // 处理过后的session队列

      for (let item of sessionList) {
        if (item.senderId === this.loginUserId) continue; // 如果发送人是自己，就不必要加入到session列表
        let sessionItem = {};
        let targetId = `${item.miniType}_${item.senderId}_${item.receiverId}`;
        sessionItem['miniType'] = item.miniType;
        sessionItem['targetId'] = targetId; // 给每个item加一个targetId 作为唯一标识
        sessionItem['id'] = item.miniType === 1100 ? item.senderId : item.receiverId; // 此处注意一下消息接受的目标对象
        sessionItem['name'] = item.name || item.otherName;
        sessionItem['count'] = item.count;
        sessionItem['content'] = item.content;
        sessionItem['sendTime'] = item.sendTime;
        sessionItem['avatar'] = item.avatar;
        sessionItem['originData'] = item;
        session.push(sessionItem);
      }

      this.ActionSetMessageStore({
        sessionList: session,
        sessionActiveItem: session[0], // 默认选中第一条
        miniType: session[0]['miniType'] // 默认第一条的miniType
      });
      this.ActionUpdateSessionList({
        type: 'update',
        method: 'clearCount',
        data: session[0] // // 默认选中第一条, 清空消息计数
      });
      console.log('session消息栏处理后:', session);
    }
  },
  created() {
    this.getSession();
  }
};
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";

  .MessagePage {
    @include flex();
    box-sizing: border-box;
    overflow: hidden;
    height: 100vh;
    min-width: 1000px;

    .left, .right {
      height: 100%;
    }

    .right {
      flex: 1;
      height: 100%;
      @include flex($direction: column);

      .right-top {
        box-sizing: border-box;
        height: $sizeTopBarHeight;
        background: #ffffff;
        border-bottom: 1px solid $colorBorderLayoutLight;
      }

      .right-bottom {
        position: relative;
        overflow: hidden;
        flex: 1;
      }
    }
  }
</style>
