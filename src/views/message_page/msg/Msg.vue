<template>
  <div class="Message">
    <div class="container">
      <div class="left">
        <!--session 模块-->
        <session></session>
      </div>
      <div class="right">
        <template>
          <new-friends v-if="messageStore.miniType === 11016"></new-friends>
          <group-helper v-if="messageStore.miniType === 11017"></group-helper>
          <Todos v-if="messageStore.miniType === 2"></Todos>
          <single-msg v-if="messageStore.miniType === 1100"></single-msg>
          <group-msg v-if="messageStore.miniType === 1101"></group-msg>
          <analysis v-if="messageStore.miniType === 11021"></analysis>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Session from '../layout/Session.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Message',
  components: {
    Session,
    Todos: () => import('./Todos'),                   // 代办事项
    Analysis: () => import('./Analysis'),           // 分析助手
    SingleMsg: () => import('./SingleMsg'),         // 单聊消息
    NewFriends: () => import('./NewFriends'),       // 新朋友
    GroupHelper: () => import('./GroupHelper'),     // 群助手
    GroupMsg: () => import('./GroupMsg')            // 群助手
  },
  computed: {
    ...mapGetters(['messageStore'])
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),
  },
  mounted() {
    this.ActionSetMessageStore({routeName: '消息'});
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";

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
        border-right: 1px solid $colorBorder1;
        background: rgba(255, 255, 255, 1);
      }

      .right {
        flex: 1;
        position: relative;
        overflow: hidden;
        height: 100%;
        background: $colorBgPageGray;
      }
    }
  }
</style>
