<template>
  <div class="GroupMembers">
    <div id="right-bar" class="right-bar">
      <div class="top">
        <div class="bar-header">
          <h3 class="title">所有成员</h3>
          <div class="icon icon__close" @click="handleCloseGroupMembers"></div>
        </div>

        <div class="addbar" @click="showAddMember = true">
          <span class="text">添加成员</span>
          <div class="icon icon__add">+</div>
        </div>

      </div>
      <el-scrollbar>
        <ul class="member-list">
          <li class="list-item" v-for="item in groupMembers" :key="item.id">
            <figure>
              <div>
                <div class="img-box">
                  <img :src="item.avatar" v-avatar="item.trueName">
                </div>
              </div>
              <h4 class="text">{{item.trueName}}</h4>
            </figure>
            <el-dropdown trigger="click" @command="handleCommand" >
                          <span class="el-dropdown-link">
                          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  style="color: #1890ff"
                >移除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-scrollbar>
    </div>



  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {
  MY_COMPANY_CONTACT_LIST,
} from '~api/organize.js'

export default {
  name: 'GroupMembers',
  data() {
    return {
      groupMembers: null, // [{},{}]群成员列表
      activePanelName: 'Teams', // Teams or friends
      showAddMember: false, // 是否显示添加群成员弹窗
    }
  },

  computed: {
    ...mapGetters(['user', 'messageStore']),
    senderId() {
      return this.user.user.id
    },
    groupId() {
      return this.messageStore.groupInfo.info.groupId
    },
    groupOwnerId() {
      return this.messageStore.groupInfo.info.ownerId
    }
  },
  methods: {
    // 关闭侧边群组成员栏
    handleCloseGroupMembers() {
      this.$emit('closeGroupMembers')
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
      //debugger;
      MY_COMPANY_CONTACT_LIST(53).then(res => {
        console.log('群信息', res.data.data);
        if (res.data.code === 200) {
          debugger
          this.groupMembers = res.data.data.normal
        }
      }).catch(err => {
        console.log('请求message：', err)
      })
    },

    handleCommand(user) {
      // debugger;
      let msg = `确定移除群成员 "${user.trueName}" ?`;
      this.$confirm(msg, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.delGroupUser(user)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除该群成员'
        })
      })
    },

    // 移除群成员
    delGroupUser(removeMember) {
      //debugger;
      // return;
      let params = {
        groupId: this.groupId,
        remark: removeMember.id.toString(), //  '1,2,3' 传递多个id组成的字符串为批量操作
        senderId: this.senderId
      };
      DEL_GROUP_USER(params).then(res => {
        console.log('移除群成员res:', res);
        if (res.data.code === 200) {
          // debugger;
          // 移除群成员成功后从新获取移除群列表
          this.getMembers();
          this.$message({
            type: 'success',
            message: res.data
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch(err => {
        console.log('移除群成员err:', err)
      })
    }
  },
  mounted() {
    // 如果vuex中没有，则请求群信息
    this.messageStore.groupInfo ?
      this.groupMembers = this.messageStore.groupInfo.users :
      this.groupMembers = this.getMembers()
  }
}
</script>

<style lang="scss" scoped>
  /*@import "@s/message/index.scss";*/
  /*@import "@s/message/icons.scss";*/

  .GroupMembers {
    height: 100%;
  }

  .right-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

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
      border: 1px solid #1890FF;
      cursor: pointer;

      input {
        flex: 1;
        height: 100%;
        line-height: 100%;
        border: none;
        outline: none;

        &::placeholder {
          color: #1890FF;
        }
      }

      .text {
        font-size: 16px;
        color: #1890FF;
      }

      .icon__add {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        background: #1890FF;
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
            background: #1890FF;

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
            color: #999999;
          }
        }

        .el-dropdown-link {
          display: block;
          width: 20px;
          height: 20px;
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
    //background-image: url($iconCloseX);
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
        color: #999999;

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
        background: #1890FF;

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
      box-shadow: 0 10px $shadowHeight #99a9bf;
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

    .el-dialog__footer {
      display: none;
    }

    .el-dialog__header {
      position: absolute;
      right: 0;
      z-index: 999;
    }

    .el-dialog__body {
      padding: 0;
      height: 100%;
    }
  }
</style>
