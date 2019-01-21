<template>
  <div class="GroupHelper vue-module">
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
          <div class="list-item" v-for="item in showMessageList" :key="item.code">
            <!--{{item}}-->
            <div class="item-left">
              <div>
                <div class="img-box"><img :src="item.otherName" v-avatar="item.otherName"></div>
              </div>
              <h3 class="title">{{item.otherName}} 申请加入：{{item.text}}</h3>
              <span class="datetime">{{item.sendTime | formatTime}}</span>
              <div class="text">
                <span>理由：</span>
                <span>{{item.content}}</span>
              </div>
            </div>
            <div class="item-right">
              <span v-if="item.state === 4">已同意</span>
              <span v-else-if="item.state === 3">已拒绝</span>
              <div class="btns" v-else>
                <my-btn class="my-btn" @click="saveFriend(item, 4)">
                  同意
                </my-btn>
                <my-btn class="my-btn my-btn-default" @click="updateState(item, 3)">
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
import MyBtn from '@c/message/my_btn/MyBtn.vue';
import {mapGetters, mapActions} from 'vuex';
import {HELP_GROUP_MSG, JOIN_GROUP, REFUSE_GROUP} from '~api/message.js';
import {FORMAT_TIME} from 'utils/message.js';

export default {
  name: 'GroupHelper',
  data() {
    return {
      activeBtn: 'unChecked', // 1已审核 2未审核
      messageList: [] // 好友申请消息列表
    }
  },
  components: {
    MyBtn
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
    getList() {
      HELP_GROUP_MSG(this.loginUserId).then(res => {
        console.log('群助手>申请消息', res.data.data);
        if (res.data.code === 200) {
          this.messageList = res.data.data
        }
      }).catch(err => {
        console.log('请求message：', err)
      })
    },
    clickAgree(item, state) {
      debugger;
      let data = {
        groupId: item.groupId,
        userId: this.loginUserId
      };
      JOIN_GROUP(data)
        // post
        .then(res => {
          console.log('处理申请消息', res.data.data);
          if (res.data.code === 200) {
            this.updateState(item, state)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              showClose: true
            })
          }
        })
        .catch(err => {
          console.log('请求message：', err)
        })
    },
    updateState(item, state) {
      debugger;
      let params = {
        code: item.code,
        state: state // 3拒绝，4同意
      };
      REFUSE_GROUP(params)
        // put
        .then(res => {
          debugger;
          console.log('修改状态', res.data.data);
          if (res.data.code === 200) {
            console.log('修改成功')
          }
        }).catch(err => {
        console.log('群助手修改状态异常：', err)
      })
    }

  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";

  .GroupHelper.vue-module {
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
        max-width: 342px;
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
    border: none;
    @include myBtn($borderRadius: 8px,$height:32px);
  }

  .my-btn + .my-btn {
    margin-left: 20px;
  }

  .my-btn-default {
    background: $colorBgBtnGray;
  }
</style>
