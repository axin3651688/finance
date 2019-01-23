<template>
  <div class="MessageContacts">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane name="ContactsTeams">
        <template slot="label">
          <div class="label-text">团队</div>
        </template>
        <contacts-teams
          v-if="activeName === 'ContactsTeams'"
          @chatWithSingle="handleChatWithSingle"
        ></contacts-teams>
      </el-tab-pane>
      <el-tab-pane name="ContactsFriends">
        <template slot="label">
          <div class="label-text">好友</div>
        </template>
        <contacts-friends
          v-if="activeName === 'ContactsFriends'"
          @chatWithSingle="handleChatWithSingle"
        ></contacts-friends>
      </el-tab-pane>
      <el-tab-pane name="ContactsGroups">
        <template slot="label">
          <div class="label-text">群聊</div>
        </template>
        <contacts-groups
          v-if="activeName === 'ContactsGroups'"
          @chatWithGroup="handleChatWithGroup"
        >
        </contacts-groups>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'MessageContacts',
  components: {
    ContactsTeams: () => import('./ContactsTeams.vue'),
    ContactsFriends: () => import('./ContactsFriends.vue'),
    ContactsGroups: () => import('./ContactsGroups.vue')
  },
  data() {
    return {
      activeName: 'ContactsTeams'
    }
  },
  watch: {
    $route(to, from) {
      console.log('Contacts监听路由:',to,from)
      this.activeName = from.query.activeName
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),
    handleClick(tab, event) {
      // console.log('通讯录切换标签页：', tab, event);
      this.activeName = tab.name
    },

    // 开始群聊天
    handleChatWithGroup(groupId) {
      this.$emit('chatWithGroup', groupId)
    },

    // 开始单聊
    handleChatWithSingle(receiverId) {
      this.$emit('chatWithSingle', receiverId)
    },

    /**
     * 从路由获得当前应该显示哪一个标签（团队、好友、群组）,如果没有路由数据，就默认显示团队
     */
    getActiveNameFromRoute(){
      console.log('路由数据：', this.$route)
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      } else {
        this.activeName = 'ContactsTeams'
      }
    }
  },
  created() {
    this.ActionSetMessageStore({routeName: '通讯录'})
    this.getActiveNameFromRoute()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/variables.scss";

  .MessageContacts {
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;
    height: 100%;
    background: $colorBgPageGray;

    /deep/ li {
      list-style: none;
    }
  }

  /deep/ .el-tabs {
    height: 100%;
    overflow: hidden;
    background: #ffffff;

    .el-tabs__header {
      margin-bottom: 0;
      border-bottom: none;

      .el-tabs__nav {
        display: flex;
        box-sizing: border-box;
        justify-content: space-around;
        border: none;
        border-radius: 0;
        width: $sizeNavBarWidth;
        border-right: 1px solid $colorBorderLayoutDark;
      }

      .el-tabs__item {
        flex: 1;
        $tabsItemHeight: 30px;
        height: $tabsItemHeight;
        line-height: $tabsItemHeight;
        border: none;
        font-size: 12px;
        color: $colorText3;

        .label-text {
          box-sizing: border-box;
          height: 100%;
          text-align: center;
          border-bottom: 2px solid transparent;
        }
      }

      .el-tabs__item.is-active {
        color: $colorTheme;

        .label-text {
          border-color: $colorTheme;
        }
      }
    }

    .el-tabs__content {
      height: calc(100% - 25px);
    }

    .el-tab-pane {
      height: 100%;
    }
  }

  /deep/ .el-scrollbar {
    height: 100%;
  }

  /deep/ .el-collapse {
    border: none;
  }
</style>
