<template>
  <div class="GroupMembers vue-module">
    <div id="right-bar" class="right-bar">
      <div class="top">
        <div class="bar-header">
          <h3 class="title">所有成员</h3>
          <div class="icon icon__close" @click="handleCloseGroupMembers"></div>
        </div>

        <!--<div class="addbar">-->
        <!--<input type="text" placeholder="添加成员">-->
        <!--<div class="icon icon__add">+</div>-->
        <!--</div>-->

        <div class="addbar" @click="showAddMember = true">
          <span class="text">添加成员</span>
          <div class="icon icon__add">+</div>
        </div>

      </div>
      <el-scrollbar>
        <ul class="member-list">
          <li class="list-item" v-for="i in 35" :key="i">
            <figure>
              <div>
                <div class="img-box">
                  <img src="" alt="">
                </div>
              </div>
              <h4 class="text">成员名</h4>
            </figure>
            <el-dropdown trigger="click" @command="handleCommand">
                          <span class="el-dropdown-link">
                          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="`removeMember_${i}`"
                                  style="color: #189271"
                >移除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-scrollbar>
    </div>

    <!--移除群成员弹窗-->
    <el-dialog
      title="移除成员"
      :visible.sync="showRemoveMember"
      width="30%"
      :show-close="false"
      center>
      <div class="dialog-content" style="font-size: 16px;line-height: 30px;">
        <p>是否移除成员</p>
        <p>“{{removeMemberName}}”?</p>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="showRemoveMember = false">确 认</el-button>
                <el-button type="primary" size="small" @click="showRemoveMember = false">取 消</el-button>
              </span>
    </el-dialog>

    <!--添加群成员弹窗-->
    <el-dialog class="add-member-dialog"
               :visible.sync="showAddMember"
               width="800px"
               :show-close="false"
    >
      <div class="dialog-content">
        <el-tabs v-model="activePanelName" type="card" @tab-click="handleClickTab">
          <el-tab-pane name="Teams">
            <template slot="label">
              我的团队
              <i class="splide-line">分隔竖线</i>
            </template>
            <add-from-groups></add-from-groups>
          </el-tab-pane>
          <el-tab-pane label="我的好友" name="friends">
            <add-from-friends></add-from-friends>
          </el-tab-pane>
          <!--inset-shadow 阴影效果-->
          <div class="inset-shadow"></div>
        </el-tabs>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import AddFromFriends from './AddFromFriends' // 从我的好友中添加群成员
import AddFromGroups from './AddFromGroups' // 从我的团队中添加群成员
import {
  GROUP_INFO,
  DEL_GROUP_USER
} from '~api/message.js';

export default {
  name: 'GroupMembers',
  data() {
    return {
      activePanelName: 'Teams', // Teams or friends
      showAddMember: false, // 是否显示添加群成员弹窗
      showRemoveMember: false, // 是否显示移除群成员弹窗
      removeMemberName: '' // 需要移除的群组成员id
    }
  },
  components: {
    AddFromGroups,
    AddFromFriends
  },
  methods: {
    // 关闭侧边群组成员栏
    handleCloseGroupMembers() {
      this.$emit('closeGroupMembers')
    },

    // 移除群成员
    handleCommand(command) {
      this.removeMemberName = command;
      this.showRemoveMember = true;
      console.log('需要移除的对象：', command)
    },

    // 添加群成员
    addMember() {
      this.showAddMember = false;
      console.log('带处理，添加新成员')
    },

    // 添加群成员标签切换事件
    handleClickTab(tab, event) {
      console.log('添加群成员标签切换事件', tab, event);
    },

    // 群id查询群信息
    getMembers() {
      GROUP_INFO(this.groupId).then(res => {
        console.log('群信息', res.data.data);
        if (res.data.code === 200) {
          this.groupMembers = res.data.data.users
        }
      }).catch(err => {
        console.log('请求message：', err)
      })
    },

    // 移除群成员
    clickDelGroupUser(item) {
      let params = {
        groupId: 4,
        remark: '1', //  '1,2,3' 传递多个id组成的字符串为批量操作
        senderId: 225
      };
      DEL_GROUP_USER(params).then(res => {
        console.log('移除群成员', res.data.data);
        if (res.data.code === 200) {

        }
      }).catch(err => {
        console.log('移除群成员', err)
      })
    }
  },
  mounted() {
    // debugger;
    this.getMembers()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .GroupMembers {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 210;
  }

  .right-bar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    background: #ffffff;
    box-shadow: -3px 0px 20px rgba(0, 0, 0, 0.16);
    transition: all .3s;

    .bar-header {
      position: relative;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      box-shadow: -3px 0px 20px rgba(0, 0, 0, 0.16);

      .icon__close {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .addbar {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      margin: 20px 20px 10px 20px;
      padding: 0 15px;
      border-radius: 8px;
      border: 1px solid $colorTheme;
      cursor: pointer;

      input {
        flex: 1;
        height: 100%;
        line-height: 100%;
        border: none;
        outline: none;

        &::placeholder {
          color: $colorTheme;
        }
      }

      .text {
        font-size: 16px;
        color: $colorTheme;
      }

      .icon__add {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        background: $colorTheme;
      }
    }

    /deep/ .el-scrollbar {
      flex: 1;

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .member-list {
      .list-item {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all .3s;

        &:first-child {
          margin-top: 20px;
        }

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
        }

        figure {
          display: flex;
          align-items: center;

          .img-box {
            overflow: hidden;
            width: 50px;
            height: 50px;
            margin-right: 20px;
            border-radius: 50%;
            background: $colorTheme;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            overflow: hidden;
            width: 80px;
            height: 21px;
            font-size: 16px;
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $colorText2;
          }
        }

        .el-dropdown-link {
          display: block;
          width: 20px;
          height: 20px;
          background: url("../../assets/green/list_menu.svg") no-repeat;
          background-size: 20px 20px;
          cursor: pointer;
        }
      }
    }
  }

  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-size: 18px 18px;
  }

  .icon__close {
    background-image: url($iconCloseX);
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
        width: 160px;
        text-align: center;
        border: none;
        color: $colorText3;

        .splide-line {
          width: 1px;
          height: 30px;
          color: transparent;
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
      height: 100%;
    }

    .el-tab-pane {
      height: 100%;
    }

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

  /deep/ .add-member-dialog {
    .el-dialog {
      overflow: hidden;
      height: 600px;

      .dialog-content {
        height: calc(100% - 50px);
      }
    }

    .el-dialog__header, .el-dialog__footer {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
      height: 100%;
    }
  }
</style>
