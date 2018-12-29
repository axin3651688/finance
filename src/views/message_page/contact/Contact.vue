<template>
  <div class="MessageContacts">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane name="ContactsTeams">
        <template slot="label">
          团队
          <i class="splide-line"></i>
        </template>
        <contacts-teams
          v-if="which_to_show === 'ContactsTeams'"
          @chatWithSingle="handleChatWithSingle"
        ></contacts-teams>
      </el-tab-pane>
      <el-tab-pane name="ContactsFriends">
        <template slot="label">
          好友
          <i class="splide-line"></i>
        </template>
        <contacts-friends
          v-if="which_to_show === 'ContactsFriends'"
          @chatWithSingle="handleChatWithSingle"
        ></contacts-friends>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="ContactsGroups">
        <contacts-groups
          v-if="which_to_show === 'ContactsGroups'"
          @chatWithGroup="handleChatWithGroup"
        >
        </contacts-groups>
      </el-tab-pane>

      <!--阴影-->
      <div class="inset-shadow"></div>

    </el-tabs>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'MessageContacts',
  components: {
    ContactsTeams: () => import('./ContactsTeams.vue'),
    ContactsFriends: () => import('./ContactsFriends.vue'),
    ContactsGroups: () => import('./ContactsGroups.vue')
  },
  data() {
    return {
      which_to_show: 'ContactsFriends',
      activeName: 'ContactsFriends'
    };
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),
    handleClick(tab, event) {
      // console.log('通讯录切换标签页：', tab, event);
      this.which_to_show = tab.name
    },

    // 开始群聊天
    handleChatWithGroup(groupId) {
      this.$emit('chatWithGroup', groupId)
    },

    // 开始单聊
    handleChatWithSingle(receiverId) {
      this.$emit('chatWithSingle', receiverId);
    }
  },
  mounted() {
    this.ActionSetMessageStore({routeName: '通讯录'})
  }
}
</script>

<style lang="scss" scoped>
  @import "@ms/variables.scss";

  .MessageContacts {
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;
    height: 100%;
    padding: 1px 0px 0;
    background: $colorBgPageGray;

    /deep/ li {
      list-style: none;
    }
  }

  /deep/ .el-tabs {
    height: 100%;
    overflow: hidden;
    /*border-top-left-radius: 12px;*/
    /*border-top-right-radius: 12px;*/
    background: #ffffff;

    .el-tabs__header {
      margin-bottom: 0;

      .el-tabs__nav {
        border: none;
        border-radius: 0;
        width: $sizeNavBarWidth;
        overflow: hidden;
      }

      .el-tabs__item {
        $tabsItemHeight: 50px;
        height: $tabsItemHeight;
        line-height: $tabsItemHeight;
        padding-left: 39px;
        padding-right: 40px;
        border: none;
        color: $colorText3;

        .splide-line {
          width: 1px;
          height: 30px;
          background: #cccccc;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .el-tabs__item.is-active {
        color: #ffffff;
        background: $colorTheme;

        .splide-line {
          background: transparent;
        }
      }
    }

    .el-tabs__content {
      height: calc(100% - 50px);

      .inset-shadow {
        $shadowHeight: 20px;
        width: 100%;
        height: $shadowHeight;
        position: absolute;
        background: #eee;
        top: -$shadowHeight;
        left: 0;
        box-shadow: 0 10px $shadowHeight $colorShadowGreen;
      }
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
