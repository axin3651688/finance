<template>
  <div class="Contacts vue-module">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane name="ContactsTeams">
        <template slot="label">
          我的团队
          <i class="splide-line"></i>
        </template>
        <contacts-teams v-if="which_to_show === 'ContactsTeams'"></contacts-teams>
        <!--<component :is="which_to_show" keep-alive></component>-->
      </el-tab-pane>
      <el-tab-pane name="ContactsFriends">
        <template slot="label">
          我的好友
          <i class="splide-line"></i>
        </template>
        <contacts-friends v-if="which_to_show === 'ContactsFriends'"></contacts-friends>
        <!--<component :is="which_to_show" keep-alive></component>-->
      </el-tab-pane>
      <el-tab-pane label="我的群聊" name="ContactsGroups">
        <contacts-groups v-if="which_to_show === 'ContactsGroups'"></contacts-groups>
        <!--<component :is="which_to_show" keep-alive></component>-->
      </el-tab-pane>

      <!--阴影-->
      <div class="inset-shadow"></div>

    </el-tabs>
  </div>
</template>

<script>
// 消息》通讯
// import ContactsTeams from './ContactsTeams' // 我的团队 pane
// import ContactsFriends from './ContactsFriends' // 我的团队 pane
// import ContactsGroups from './ContactsGroups' // 我的群聊 pane

export default {
  name: 'Contacts',
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
    handleClick(tab, event) {
      // console.log('通讯录切换标签页：', tab, event);
      this.which_to_show = tab.name
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .Contacts.vue-module {
    overflow: hidden;
    margin: 40px 40px 0 40px;
    background: #ffffff;
    height: calc(100% - 40px);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0 20px 30px $colorShadowGreen;
    /deep/ li {
      list-style: none;
    }
  }

  /deep/ .el-tabs {
    height: 100%;

    .el-tabs__header {
      margin-bottom: 0;

      .el-tabs__nav {
        border: none;
      }

      .el-tabs__item {
        $tabsItemHeight: 50px;
        height: $tabsItemHeight;
        line-height: $tabsItemHeight;
        padding-left: 40px;
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
