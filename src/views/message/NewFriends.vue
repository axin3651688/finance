<template>
  <div class="NewFriends vue-module">
    <div class="top">
      <div class="btn-group">
        <div :class="['btn', {active: activeBtn === 'unChecked'}]" @click="activeBtn = 'unChecked'">
          未审核 <span class="count">({{messageListFilter.unChecked.count}})</span>
        </div>
        <div :class="['btn', {active: activeBtn === 'checked'}]" @click="activeBtn = 'checked'">
          已审核 <span class="count">({{messageListFilter.checked.count}})</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-scrollbar>
        <section>
          <div class="list-item" v-for="item in showMessageList" :key="item.id">
            <div class="item-left">
              <div>
                <div class="img-box"><img :src="item.avatar" alt=""></div>
              </div>
              <h3 class="title">{{item.state}}{{item.name}}申请加你为好友</h3>
              <span class="datetime">{{item.sendTime | formatTime}}</span>
              <div class="text">
                <span>理由：</span>
                {{item.content}}
              </div>
            </div>
            <div class="item-right">
              <span v-if="item.state === 4">已同意</span>
              <span v-else-if="item.state === 3">已拒绝</span>
              <div class="btns" v-else>
                <el-button
                  type="primary"
                  size="small"
                  class="my-btn my-btn-primary"
                  @click="saveFriend(item, 4)"
                >同意
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  class="my-btn my-btn-default"
                  @click="saveFriend(item, 3)"
                >拒绝
                </el-button>
              </div>
            </div>
          </div>
        </section>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {
  NEW_FRIEND_LIST,
  SAVE_FRIEND,
  REFUSE_GROUP
} from '~api/message.js';
import {FORMAT_TIME} from 'utils/message.js'

export default {
  name: 'NewFriends',
  data() {
    return {
      activeBtn: 'unChecked', // 1已审核 2未审核
      messageList: [], // 好友申请消息列表
      // showMessageList: [] // 好友申请消息列表筛选过的
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    },
    messageListFilter() {
      let obj = {
        checked: {
          count: 0,
          data: []
        },
        unChecked: {
          count: 0,
          data: []
        },
      };
      this.messageList.forEach(item => {
        if (item.state === 0) {
          obj.unChecked.count++;
          obj.unChecked.data.push(item)
        } else {
          obj.checked.count++;
          obj.checked.data.push(item)
        }
      });
      console.log('messageListFilter:', obj);
      return obj
    },
    showMessageList() {
      return this.activeBtn === 'checked' ?
        this.messageListFilter.checked.data :
        this.messageListFilter.unChecked.data
    }
  },
  filters: {
    formatTime(time) {
      return FORMAT_TIME(time)
    }
  },
  methods: {
    // 筛选不同状态的信息
    // changeState(checkState) {
    //   this.
    // },

    getList() {
      NEW_FRIEND_LIST(this.loginUserId).then(res => {
        console.log('好友申请消息', res.data.data);
        if (res.data.code === 200) {
          this.messageList = res.data.data
        }
      }).catch(err => {
        console.log('请求message：', err)
      })
    },

    saveFriend(item, state) {
      // 点同意，先保存，再修改状态，点拒绝直接改状态
      debugger;
      let params = {
        friendId: item.id,
        userId: this.loginUserId
      };

      SAVE_FRIEND(params).then(res => {
        console.log('保存', res.data.data);
        if (res.data.code === 200) {
          this.updateState(item, state)
        }
      }).catch(err => {
        // TODO: 处理好友申请有异常
        console.log('请求message：', err)
      })
    },
    updateState(item, state) {
      debugger;
      let params = {
        code: item.code,
        state: 3 // 3拒绝，4同意
      };
      REFUSE_GROUP(params)
        .then(res => {
          console.log('修改好友请求状态', res.data.data);
          if (res.data.code === 200) {
            console.log('修改好友请求成功')
          }
        }).catch(err => {
        console.log('修改好友请求err：', err)
      })
    }

  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .vue-module {
    display: flex;
    flex-direction: column;
    height: 100%;

    .top {
      padding: 40px 40px 32px;
    }

    .bottom {
      position: relative;
      flex: 1;
      padding-right: 40px;

      /deep/ .el-scrollbar {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      section {
        padding: 0 40px;
      }
    }
  }

  .btn-group {
    display: inline-block;
    $btnHeight: 24px;
    border-radius: $btnHeight / 2;
    overflow: hidden;

    .btn {
      display: inline-block;
      line-height: $btnHeight;
      padding: 0 36px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: rgba(0, 0, 0, .1);
      cursor: pointer;
    }

    .btn.active {
      background: $colorTheme;
      color: #ffffff;
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 16px 30px;
    border-radius: 12px;
    background: #ffffff;

    .item-left {
      display: flex;
      align-items: center;
      font-weight: 400;

      .img-box {
        width: 48px;
        height: 48px;
        overflow: hidden;
        background: $colorTheme;
        margin-right: 20px;
        border-radius: 50%;

        img {
          width: 48px;
          height: 48px;
        }
      }

      .title {
        margin-right: 30px;
        font-size: 16px;
        color: $colorText1;
      }

      .datetime {
        margin-right: 30px;
        font-size: 14px;
        color: $colorText3;
      }

      .text {
        overflow: hidden;
        width: 342px;
        height: 41px;
        line-height: 20px;
        font-size: 16px;
      }
    }

    .item-right {
      text-align: center;
      min-width: 128px;
    }
  }

  .my-btn {
    border-radius: 8px;
    border: none;
  }

  .my-btn + .my-btn {
    margin-left: 20px;
  }

  .my-btn-primary {
    background: $colorTheme;
  }

  .my-btn-default {
    background: rgba(196, 196, 196, 1);
  }
</style>
