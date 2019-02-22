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
    <div class="bottom" v-if="messageList.length">
      <el-scrollbar>
        <section>
          <div class="list-item" v-for="item in showMessageList" :key="item.id">
            <!--{{item}}-->
            <div class="item-left">
              <div>
                <div class="img-box">
                  <avatar
                    :username="item.name"
                    :rounded="false"
                    backgroundColor="transparent"
                    color="#fff"
                    size="48"
                  ></avatar>
                  <img :src="item.avatar" onerror="this.style.display='none'"/>
                </div>
              </div>
              <h3 class="title" :title="item.name">{{item.name}}</h3>
              <span class="datetime">{{item.sendTime | formatTime}}</span>
              <div class="text">
                <span>理由:</span>
                {{item.content}}
              </div>
            </div>
            <div class="item-right">
              <span v-if="item.state === 4">已同意</span>
              <span v-else-if="item.state === 3">已拒绝</span>
              <!--如果是我加别人为好友-->
              <span v-else-if="item.senderId===loginUserId">等待验证</span>
              <div class="btns" v-else>
                <my-btn class="my-btn" @click.native="saveFriend(item, 4)">
                  同意
                </my-btn>
                <my-btn class="my-btn my-btn-default" @click.native="updateState(item, 3)">
                  拒绝
                </my-btn>
              </div>
            </div>
          </div>
        </section>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import MyBtn from '@mc/my_btn/MyBtn.vue';
import {mapGetters, mapActions} from 'vuex';
import {
  NEW_FRIEND_LIST,
  SAVE_FRIEND,
  REFUSE_FRIEND
} from '@m_api/message.js';
import {FORMAT_TIME} from '@mu/formatTime.js';

export default {
  name: 'NewFriends',
  data() {
    return {
      activeBtn: 'unChecked', // 1已审核 2未审核
      messageList: [] // 好友申请消息列表
    };
  },
  components: {
    MyBtn
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
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
        }
      };
      this.messageList.forEach(item => {
        if (item.state === 0) {
          obj.unChecked.count++;
          obj.unChecked.data.push(item);
        } else {
          obj.checked.count++;
          obj.checked.data.push(item);
        }
      });
      console.log('messageListFilter:', obj);
      return obj;
    },
    showMessageList() {
      return this.activeBtn === 'checked'
        ? this.messageListFilter.checked.data
        : this.messageListFilter.unChecked.data;
    }
  },
  filters: {
    formatTime(time) {
      return FORMAT_TIME(time);
    }
  },
  methods: {
    // 获取好友申请列表
    getList() {
      NEW_FRIEND_LIST(this.loginUserId).then(res => {
        console.log('好友申请消息', res.data.data);
        if (res.data.code === 200) {
          this.messageList = res.data.data;
        }
      }).catch(err => {
        console.log('请求取好友申请列表err：', err);
      });
    },

    /**
     * 点同意，先保存saveFriend()，再修改状态，点拒绝直接改状态,
     * 点同意 查询是否是好友，如果是好友，直接执行修改状态，不保存数据
     * @param item 消息条目完整数据
     * @param state 需要改变的状态（4：同意；3：拒绝）
     */
    saveFriend(item, state) {
      // debugger;
      let data = {
        friendId: item.senderId,
        userId: this.loginUserId
      };
      SAVE_FRIEND(data).then(res => {
        // debugger;
        if (res.data.code === 200) {
          this.updateState(item, state);
        } else {
          this.$message({
            type: 'warning',
            message: res.data.msg,
            showClose: true
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    updateState(item, state) {
      // debugger;
      let params = {
        code: item.code,
        state: state // 3拒绝，4同意
      };
      REFUSE_FRIEND(params)
        .then(res => {
          if (res.data.code === 200) {
            console.log('修改好友请求成功');
            this._updateMessageList(item, state); // 更新本地页面显示
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
              showClose: true
            });
          }
        }).catch(err => {
          console.log('修改好友请求err：', err);
        });
    },

    /**
     * 等待服务器返回好友修改状态后，本地显示处理
     * @param item 消息条目完整数据
     * @param state 需要改变的状态（4：同意；3：拒绝）
     */
    _updateMessageList(item, state) {
      debugger;
      let index = this.messageList.indexOf(item);
      this.messageList[index].state = state;
    }

  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";
  @import "@ms/variables.scss";

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
      padding: 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: $colorThemePrimary;
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
        @include singleEllipsis;
        display: inline-block;
        width: 80px;
        margin-right: 20px;
        font-size: 14px;
        color: $colorText1;
      }

      .datetime {
        display: inline-block;
        min-width: 95px;
        margin-right: 20px;
        font-size: 12px;
        color: $colorText3;
      }

      .text {
        overflow: hidden;
        line-height: 20px;
        font-size: 14px;
      }
    }

    .item-right {
      text-align: right;
      min-width: 150px;
    }
  }

  .my-btn {
    border: none;
    @include myBtn($borderRadius: 8px, $height: 30px);
  }

  .my-btn + .my-btn {
    margin-left: 20px;
  }

  .my-btn-default {
    color: $colorTextBlack3;
    background: $colorThemePrimary;
  }
</style>
