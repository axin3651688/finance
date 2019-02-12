<template>
  <div class="Message">
    <div class="container">
      <div class="left">
        <!--session 模块-->
        <session></session>
      </div>
      <div class="right">
        <template>

          <!--新朋友-->
          <new-friends v-if="miniType === 11016"></new-friends>

          <!--群助手-->
          <group-helper v-if="miniType === 11017"></group-helper>

          <!--代办事项-->
          <Todos v-if="miniType === 2"></Todos>

          <!--分析助手-->
          <analysis v-if="miniType === 11021"></analysis>

          <!--聊天页面-->
          <chat v-if="miniType === 1101 || miniType === 1100"></chat>
          <!--<single-msg v-if="miniType === 1100"></single-msg>-->
          <!--<group-msg v-if="miniType === 1101"></group-msg>-->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Session from '@mc/session/Session.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Message',
  components: {
    // GroupMsg: () => import('./GroupMsg'),           // 群聊天
    // SingleMsg: () => import('./SingleMsg'),         // 单聊消息
    Session,
    Todos: () => import('./Todos'),                 // 代办事项
    Analysis: () => import('./Analysis'),           // 分析助手
    NewFriends: () => import('./NewFriends'),       // 新朋友
    GroupHelper: () => import('./GroupHelper'),     // 群助手
    Chat: () => import('./Chat')                    // Chat
  },
  computed: {
    ...mapGetters(['messageStore']),
    miniType() {
      return this.messageStore.miniType;
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore'])
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .Message {
    font-family: $fontFamilyMain;
    position: relative;
    height: 100%;

    .container {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .left {
        box-sizing: border-box;
        width: $sizeNavBarWidth;
        height: 100%;
        border-right: 1px solid $colorBorderLayoutDark;
        background: rgba(255, 255, 255, 1);
      }

      .right {
        flex: 1;
        position: relative;
        overflow: hidden;
        height: 100%;
        background: #ffffff;
      }
    }
  }
</style>
