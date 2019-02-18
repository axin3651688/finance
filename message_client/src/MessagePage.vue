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

    <!--弹出层-->
    <div class="top-layout" v-if="imagePreview.hdUrl">
      <image-preview v-if="imagePreview.hdUrl" :hdUrl="imagePreview.hdUrl"></image-preview>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import TopBar from '@mc/top_bar/TopBar';
import SideBar from '@mc/side_bar/SideBar';
import ImagePreview from '@mc/image_preview/ImagePreview';
import {MY_SESSION} from '@m_api/message.js';

export default {
  name: 'MessagePage',
  components: {
    TopBar,
    SideBar,
    ImagePreview
  },
  computed: {
    ...mapGetters(['user', 'messageStore', 'imagePreview']),
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
      let targetIdList = []; // 记录已经添加过的，防止重复
      for (let item of sessionList) {
        if (item.senderId === this.loginUserId) continue; // 如果发送人是自己，就不必要加入到session列表
        let sessionItem = {};

        let targetId = item.miniType + '_';
        switch (item.miniType) {
          case 1100: // 单聊
            targetId += item.senderId;
            break;
          case 1101: // 群聊
            targetId += item.receiverId;
            break;
        }

        if (targetIdList.indexOf(targetId) > -1) continue; // 如果添加过了就不再添加
        targetIdList.push(targetId);
        sessionItem['miniType'] = item.miniType;
        sessionItem['targetId'] = targetId; // 给每个item加一个targetId 作为唯一标识
        sessionItem['id'] = item.miniType === 1101 ? item.receiverId : item.senderId; // 此处注意一下消息接受的目标对象
        sessionItem['name'] = item.miniType === 1101 ? item.otherName : item.name;
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
  @import "@ms/index.scss";

  .MessagePage {
    @include flex();
    box-sizing: border-box;
    overflow: hidden;
    height: 100vh;
    min-width: 1000px;
    border: 1px solid $colorBgSideBar;

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

  .top-layout {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 10;
  }
</style>
