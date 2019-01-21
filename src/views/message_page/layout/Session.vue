<template>
  <el-scrollbar class="Session">
    <ul v-if="messageStore.sessionList">
      <li
        v-for="item in messageStore.sessionList"
        :class="[{active: item.targetId === messageStore.sessionActiveItem.targetId}]"
        :key="item.targetId"
        @click="setItemActive(item)"
      >
        <div class="top">
          <!--{{item.avatar}}-->
          <el-badge :value="item.count === 0 ? '' : item.count" :max="99" class="item">
            <div class="img-box">
              <!--<img :src="item.avatar" v-avatar="item.name">-->
              <img :src="item.avatar">
            </div>
          </el-badge>
          <span class="title">{{item.name}}</span>
          <!--{{item.miniType}}-->
          <!--<span class="publish-time mt" v-if="item.sendTime">{{item.sendTime | formatTime}}</span>-->
        </div>
        <p v-if="item.content">
          <span v-if="item.miniType===1101">{{item.originData.name}}: </span>
          <span v-if="item.content" v-html="parseEmotions(item.content)"></span>
        </p>
        <img class="list-menu" src="@ma/icon/list_menu.svg" alt="">
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {FORMAT_MSG_TIME, PARSE_EMOTIONS} from 'utils/message.js';
import {MY_SESSION} from '~api/message.js';

export default {
  name: "Session",
  data() {
    return {
      SessionBarInstance: null // 消息session实例对象
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  filters: {
    // 格式化时间戳
    formatTime(time) {
      return FORMAT_MSG_TIME(time);
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    // 解析表情
    parseEmotions(content) {
      return PARSE_EMOTIONS(content)
    },
    // 激活当前item（设置选中状态）
    setItemActive(item) {
      this.ActionSetMessageStore({
        sessionActiveItem: item,
        miniType: item.miniType
      });
      this.ActionUpdateSessionList({
        type: 'update',
        method: 'clearCount',
        data: item
      })
    }
  }
}
</script>

<style lang="scss">
  /*这里不使用 scoped 是v-html生成表情能够应用到样式*/
  @import "@s/message/emotion_sprites.scss";
</style>
<style lang="scss" scoped>
  @import "~@s/message/index.scss";

  .Session {
    height: 100%;

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  ul {
    width: 100%;
    height: 100%;

    li {
      position: relative;
      overflow: hidden;
      padding: 20px 20px 18px;
      cursor: pointer;

      .avatar-img {
        width: 46px;
      }

      /deep/ .el-badge {
        vertical-align: unset;
      }

      .top {
        height: 46px;
        line-height: 46px;
        padding-right: 10px;

        .img-box {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          overflow: hidden;
          background: $colorTheme;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            float: left;
          }
        }

        .title {
          display: inline-block;
          margin-left: 20px;
          width: 80px;
          color: $colorTextSessionTitle;
          font-size: 14px;
          font-weight: 400;
          @include singleEllipsis()
        }

        .mt {
          margin-top: 15px;
        }

        .count {
          display: inline-block;
          $countHeight: 20px;
          height: $countHeight;
          line-height: $countHeight;
          margin-left: 11px;
          padding: 0 5px;
          min-width: 20px;
          text-align: center;
          border-radius: $countHeight / 2;
          font-size: 12px;
          color: #ffffff;
          background: #F33D3D;
        }

        .publish-time {
          float: right;
          /*width: 50px;*/
          height: 16px;
          font-size: 12px;
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 20px;
          color: $colorText4;
        }
      }

      .list-menu {
        position: absolute;
        right: 15px;
        top: 50%;
        height: 16px !important;
        width: 16px !important;
        cursor: pointer;
        transform: translateY(-50%);
      }

      p {
        @include singleEllipsis();
        margin-top: 15px;
        font-size: 12px;
        font-family: $fontFamilyMain;
        font-weight: 400;
        line-height: 16px;
        color: $colorTextSessionContent;
      }
    }

    li.active {
      background: $colorThemePrimary;
    }
  }
</style>
