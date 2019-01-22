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
import {mapGetters, mapActions} from 'vuex';
import {MY_SESSION} from '~api/message.js';

export default {
  name: "MessagePage",
  components: {
    TopBar: () => import('./layout/TopBar'),
    SiderBar: () => import('./layout/SiderBar')
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
            })
          }
        })
        .catch(err => {
          console.log('请求message：', err)
        });
    },

    /**
     * 初始化session边栏, 并放到vuex中
     */
    _initSessionBar(sessionList) {
      // debugger;
      let session = [];         // 处理过后的session队列
      sessionList.forEach(item => {
        let sessionItem = {};
        let targetId = `${item.miniType}_${item.senderId}_${item.receiverId}`;
        sessionItem['miniType'] = item.miniType;
        sessionItem['targetId'] = targetId; // 给每个item加一个targetId 作为唯一标识
        sessionItem['id'] = item.receiverId;
        sessionItem['name'] = item.name;
        sessionItem['count'] = item.count;
        sessionItem['content'] = item.content;
        sessionItem['sendTime'] = item.sendTime;
        sessionItem['avatar'] = item.avatar;
        sessionItem['originData'] = item;
        session.push(sessionItem);
      });
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
      console.log('session消息栏处理后:', session)
    }
  },
  created() {
    this.getSession()
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
      @include flex($direction:column);

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
