<template>
  <div class="ContactsFriends">
    <div class="panel-left">
      <el-scrollbar>
        <ul class="sub-item" v-if="friendData">
          <li :class="{active: activeFriend === friend.id}"
              v-for="friend in friendData"
              :key="friend.id"
              @click="getUserinfo(friend.id)"
          >
            <figure>
              <div class="img-box">
                <img :src="friend.avatar" v-avatar="friend.trueName"/>
                <img v-avatar="'Tom Hanks'" width="36"/>
              </div>
              <div class="info">
                <h3 v-if="friend.trueName">{{friend.trueName}}</h3>
                <!--<p>简单的介绍</p>-->
              </div>
            </figure>
            <i class="arrow el-icon-arrow-right"></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="panel-right">
      <div v-if="rightUserInfoData">
        <div class="panel-right-top">
          <div class="img-box">
            <img :src="rightUserInfoData.user.avatar" v-avatar="rightUserInfoData.user.trueName"/>
          </div>
          <div class="text">
            <h3 class="text-title" v-if="rightUserInfoData.user.trueName">{{rightUserInfoData.user.trueName}}</h3>
            <p class="text-info">{{rightUserInfoData.user.username}}</p>
          </div>
        </div>
        <div class="panel-right-content">
          <ul>
            <li v-if="rightUserInfoData.user.phone">
              <div class="icon icon-phone"></div>
              <p class="info">{{rightUserInfoData.user.phone}}</p>
            </li>
            <li v-if="rightUserInfoData.user.email">
              <div class="icon icon-email"></div>
              <p class="info">{{rightUserInfoData.user.email}}</p>
            </li>
            <li v-if="rightUserInfoData.sex.text">
              <div class="icon icon-gender__male"></div>
              <p class="info">{{rightUserInfoData.sex.text}}</p>
            </li>
            <li v-if="rightUserInfoData.user.sign">
              <div class="icon icon-text"></div>
              <p class="info">{{rightUserInfoData.user.sign}}</p>
            </li>
          </ul>
        </div>
        <el-button
          type="primary"
          size="medium"
          class="my-btn"
          @click="chatWithSingle(rightUserInfoData)"
        >发送信息
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {
  requestMyfriends,
  CONTACT_INFO
} from '~api/message.js'

export default {
  name: 'ContactsFriends',

  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    }
  },

  data() {
    return {
      activeUser: null, // 当前选中的用户id
      requestedUser: {}, // 已经请求过详细信息用户的用户信息
      activeFriend: null, // 当前选中的好友
      friendData: null, // [] 接收一个数组
      rightUserInfoData: null // {} 接收一个对象
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),

    getdata() {
      // let userId = this.user.user.id;
      // alert(params.type)
      requestMyfriends(this.user.user.id).then(res => {
        console.log('获取我的好友列表-->>', res.data);

        if (res.data.code === 200) {
          this.friendData = res.data.data;
          // 当有好友时才请求第一个好友的信息
          if (this.friendData.length) {
            let activeUserId = this.friendData[0].id;
            this.getUserinfo(activeUserId);
            this.activeUser = activeUserId
          } else {
            this.$message({
              type: 'warning',
              message: '你还没有任何好友',
              showClose: true
            })
          }
        }
      })
    },

    // 检查这个用户是不是已将请求过一次了,如果请求过了则直接返回该用户的信息
    checkUserInfo(userId) {
      if (this.requestedUser.hasOwnProperty(userId)) {
        console.log(`已经请求过用户的信息了:${userId}`);
        return this.requestedUser[userId];
      } else return null
    },

    getUserinfo(userId) {
      // alert(params.type)
      this.activeUser = userId;
      let userInfo = this.checkUserInfo(userId);
      if (userInfo) {
        this.rightUserInfoData = userInfo
      } else {
        CONTACT_INFO(userId, userId).then(res => {
          console.log('获取一个好友信息-->>', res.data);

          if (res.data.code === 200) {
            let rightUserInfoData = res.data.data;
            this.activeFriend = rightUserInfoData.user.id;
            this.rightUserInfoData = rightUserInfoData;
            this.requestedUser[userId] = rightUserInfoData;
            // alert(this.datas)
          }
        })
      }
    },

    // 和某某单聊, 路由到消息页面，要切换到单聊窗口
    chatWithSingle(rightUserInfoData) {
      debugger;
      let sessionItem = {};
      let targetId = '1100_' + rightUserInfoData.user.id + '_' + this.loginUserId;
      sessionItem['miniType'] = 1100;
      sessionItem['targetId'] = targetId;
      sessionItem['id'] = rightUserInfoData.user.id;
      sessionItem['name'] = rightUserInfoData.user.trueName;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = rightUserInfoData.user.avatar;
      sessionItem['originData'] = rightUserInfoData;
      this.ActionSetMessageStore({
        sessionActiveItem: sessionItem,
        miniType: sessionItem.miniType
      });
      let itemExist = false;
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === targetId) { // 如果已经在队列中了，跳出遍历，直接跳转
          itemExist = true;
          this.ActionUpdateSessionList({
            type: 'update',
            method: 'clearCount',
            data: sessionItem
          });
          break;
        }
      }
      if (!itemExist) { // 如果不存在，则进队列
        let addObj = {
          type: 'addItem', // 可取'addItem','deleteItem','update'
          data: sessionItem
        };
        this.ActionUpdateSessionList(addObj);
      }
      this.$router.push('/message_page/msg')
    }
  },
  mounted() {
    this.getdata();
  }
}
</script>


<style lang="scss" scoped>
  @import "@s/message/index.scss";
  @import "@s/message/icons.scss";

  .ContactsFriends {
    display: flex;
    height: 100%;

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .panel-left {
    box-sizing: border-box;
    width: $sizeNavBarWidth;
    height: 100%;
    border-right: 1px solid $colorBorder2;

    ul.sub-item {
      li {
        position: relative;
        height: 60px;
        padding: 0 30px 0 25px;
        border-left: 5px solid transparent;
        cursor: pointer;
        transition: all .3s;

        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
          border-right-color: $colorTheme;
        }

        .arrow {
          position: absolute;
          right: 24px;
          top: 50%;
          font-size: 16px;
          font-weight: bold;
          transform: translateY(-50%);
          color: rgba(0, 0, 0, 0.2);
        }
      }

      li.active {
        border-left-color: $colorTheme;
      }

      figure {
        display: flex;
        align-items: center;
        height: 100%;
        border-bottom: 1px solid $colorBorder2;

        .img-box {
          width: 40px;
          height: 40px;
          overflow: hidden;
          margin-right: 20px;
          border-radius: 8px;
          background: $colorTheme;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .info {
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 20px;

          h3 {
            height: 19px;
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            color: $colorText2;
          }

          p {
            height: 16px;
            font-size: 12px;
            color: $colorText5;
          }
        }
      }
    }
  }

  .panel-right {
    flex: 1;
    padding: 60px 30px 0 30px;
    background: $colorBgPageGray;

    .panel-right-top {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 58px;

      .img-box {
        margin-right: 40px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 14px;
        background: $colorTheme;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        font-weight: 400;
        line-height: 20px;

        .text-title {
          height: 40px;
          font-size: 30px;
          color: $colorText1;
        }

        .text-info {
          height: 24px;
          font-size: 18px;
          color: $colorText3;
        }
      }
    }

    .panel-right-content {
      li {
        position: relative;
        padding-left: 56px;
        min-height: 36px;
        margin-bottom: 30px;
        color: $colorText2;
        font-size: 16px;
        font-weight: 400;
        line-height: 36px;

        .icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: $colorTheme;
          margin-right: 20px;
          background-repeat: no-repeat;
          background-size: 36px 36px;
        }

        .icon-gender__male {
          background-image: url($iconGenderMale);
        }

        .icon-text {
          background-image: url($iconTest);
        }

        .icon-phone {
          background-image: url($iconPhone);
        }

        .icon-email {
          background-image: url($iconEmail);
        }
      }
    }

    .my-btn {
      float: right;
      border: none;
      background: $colorTheme;
    }
  }
</style>
