<template>
  <el-scrollbar class="Session">
    <ul v-if="messageStore.sessionList">
      <li
        v-for="item in messageStore.sessionList"
        :class="['session-item', {active: item.targetId === messageStore.sessionActiveItem.targetId}]"
        :key="item.targetId"
        @click="setItemActive(item)"
      >
        <el-badge :value="item.count === 0 ? '' : item.count" :max="99" class="item">
          <div :class="['img-box', {'off-line':!item.online}]">
            <avatar
              :username="item.name"
              :rounded="false"
              backgroundColor="transparent"
              color="#fff"
              :size="40"
            ></avatar>
            <img :src="item.avatar" onerror="this.style.display='none'"/>
          </div>
        </el-badge>

        <div class="session-item__right">
          <h6 class="session-item__title" :title="item.name">{{item.name}}</h6>
          <p class="session-item__content" v-if="item.content">
            <span v-if="item.miniType===1101">{{item.originData.name}}：</span>
            <span v-if="item.content" v-html="parseEmotions(item.content)"></span>
          </p>
        </div>

        <img class="list-menu" src="@ma/icon/list_menu.svg" alt="">
      </li>

    </ul>
  </el-scrollbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {PARSE_EMOTIONS} from '@mu/parseEmotions.js'
import {MSG_TIME_FORMAT} from '@mu/formatTime.js'

export default {
  name: 'Session',
  data() {
    return {
      isRequestBack: true,
      SessionBarInstance: null // 消息session实例对象
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    },
    socketOffLine() { // socket连接转态
      return this.messageStore.socketOffLine
    }
  },
  filters: {
    // 格式化时间戳
    formatTime(time) {
      return MSG_TIME_FORMAT(time)
    }
  },
  created() {
    this.$bus.on('requestBack', () => { // 当请求的聊天消息返回时，吧返回状态设置为true
      this.isRequestBack = true
    })
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    // 解析表情
    parseEmotions(content) {
      return PARSE_EMOTIONS(content)
    },

    /**
     * 当session条目被点击时，激活当前item（设置选中状态）
     */
    setItemActive(item) {
      // == 以下代码作用：当点击聊天的session时，当请求的消息没有返回时，禁止切换到其他的聊天窗口
      let isChatSession = item.miniType === 1101 || item.miniType === 1100 // 是不是聊天项
      if (isChatSession) { // 如果是聊天项，在聊天内容没有返回前，不能切换
        if (!this.isRequestBack) return false
        this.isRequestBack = false
      }
      // == 以上代码作用：当点击聊天的session时，当请求的消息没有返回时，禁止切换到其他的聊天窗口

      this.ActionSetMessageStore({
        sessionActiveItem: item,
        miniType: item.miniType
      })
      // vuex session 列表更行
      this.ActionUpdateSessionList({
        type: 'update',
        method: 'clearCount',
        data: item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@ms/index.scss";

  .Session {
    height: 100%;

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  ul {
    width: 100%;
    height: 100%;
  }

  .session-item {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 15px 12px;
    cursor: pointer;

    .img-box {
      @include imgBox($width: 40px, $height: 40px, $borderRadius: 50%);
      background: $colorTheme;

      div {
        position: absolute;
      }
    }
  }

  .session-item__right {
    margin-left: 12px;
    max-width: 120px;
    flex: 1;
  }

  .session-item__title {
    color: $colorTextSessionTitle;
    font-size: 14px;
    font-weight: 400;
    @include singleEllipsis();
  }

  .session-item__content {
    @include singleEllipsis();
    margin-top: 5px;
    font-size: 12px;
    color: $colorTextSessionContent;
  }

  /deep/ .el-badge {
    vertical-align: unset;

    .el-badge__content.is-fixed {
      right: 15px;
    }
  }

  .list-menu {
    position: absolute;
    right: 8px;
    top: 50%;
    height: 16px !important;
    width: 16px !important;
    cursor: pointer;
    transform: translateY(-50%);
  }

  .session-item.active {
    background: $colorThemePrimary;
  }
</style>
