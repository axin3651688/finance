<template>
  <div class="ContactsFriends">
    <div class="panel-left">
      <el-scrollbar>
        <ul class="sub-item" v-if="friendList">
          <li :class="{active: activeUser === friend.id}"
              v-for="friend in friendList"
              :key="friend.id"
              @click="requestUserInfo(friend.id)"
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
      friendList: null, // [] 我的好友列表，接收一个数组
      rightUserInfoData: null // {} 接收一个对象
    }
  },
  watch: {
    $route(to, from) {
      console.log('ContactsFriends监听路由：', to, from)
      if (this.activeUser !== to.query.id) {
        debugger;
        this.activeUser = to.query.id
        this.requestUserInfo(this.activeUser)
      }
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),

    /**
     * 请求好友列表,好友列表请求成功后设置激活用户（默认显示哪一个用户的信息）
     */
    requestFriendList() {
      requestMyfriends(this.loginUserId).then(res => {
        console.log('获取我的好友列表-->>', res.data)
        debugger
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.friendList = res.data.data
            this.setActiveUser(res.data.data[0].id)
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

    /**
     * 设置当前要显示的用户
     * 如果路由里有传用户ID，就显示路由上的用户信息，负责显示好友列表第一个用户信息
     */
    setActiveUser(id) {
      debugger
      let queryId = this.$route.query.id
      if (queryId) {
        this.activeUser = queryId
        this.requestUserInfo(queryId)
      } else {
        this.activeUser = id
        this.requestUserInfo(id)
      }
    },

    /**
     * 检查这个用户是不是已将请求过一次了,如果请求过了则直接返回该用户的信息
     * @param userId: 用户id
     * @returns 如果已经有用户信息，直接返回用户信息，否则返回 null
     */
    checkUserInfo(userId) {
      if (!userId) return null // 如果没有传递 userId return null
      if (this.requestedUser.hasOwnProperty(userId)) {
        console.log(`已经请求过用户的信息了:${userId}`)
        return this.requestedUser[userId]
      } else return null
    },

    /**
     * 请求一个用户的信息
     * @param userId: 用户Id
     */
    requestUserInfo(userId) {
      debugger;
      let userInfo = this.checkUserInfo(userId) // 得到用户信息 或则 null
      if (userInfo) {
        this.rightUserInfoData = userInfo
        this.activeUser = userId
      } else {
        CONTACT_INFO(this.loginUserId, userId).then(res => {
          console.log('获取一个好友信息-->>', res.data)
          if (res.data.code === 200) {
            let rightUserInfoData = res.data.data
            this.rightUserInfoData = rightUserInfoData
            this.activeUser = rightUserInfoData.user.id
            this.requestedUser[this.activeUser] = rightUserInfoData
          }
        })
      }
    },

    /**
     * 和某某单聊, 路由到消息页面，要切换到单聊窗口
     * @param rightUserInfoData
     */
    chatWithSingle(rightUserInfoData) {
      debugger
      let sessionItem = {}
      let targetId = '1100_' + rightUserInfoData.user.id + '_' + this.loginUserId
      sessionItem['miniType'] = 1100
      sessionItem['targetId'] = targetId
      sessionItem['id'] = rightUserInfoData.user.id
      sessionItem['name'] = rightUserInfoData.user.trueName
      sessionItem['count'] = 0
      sessionItem['content'] = null
      sessionItem['sendTime'] = null
      sessionItem['avatar'] = rightUserInfoData.user.avatar
      sessionItem['originData'] = rightUserInfoData
      this.ActionSetMessageStore({
        sessionActiveItem: sessionItem,
        miniType: sessionItem.miniType
      })
      this._updateSessionList(sessionItem)     // 更新session边栏
      this.$router.push('/message_page/msg')
    },

    /**
     * 更新session边栏，如果已经存在则清空消息计数，不存在则添加一个session条目
     */
    _updateSessionList(sessionItem) {
      let itemExist = false
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === sessionItem.targetId) { // 如果已经在队列中了，跳出遍历，直接跳转
          itemExist = true
          this.ActionUpdateSessionList({
            type: 'update',
            method: 'clearCount',
            data: sessionItem
          })
          break
        }
      }
      if (!itemExist) { // 如果不存在，则进队列
        let addObj = {
          type: 'addItem', // 可取'addItem','deleteItem','update'
          data: sessionItem
        }
        this.ActionUpdateSessionList(addObj)
      }
    }
  },
  created() {
    this.requestFriendList()          // 请求我的好友列表
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
        box-sizing: border-box;
        height: 60px;
        padding: 0 15px 0 10px;
        cursor: pointer;
        border-bottom: 1px solid $colorBorderLayoutLight;
        transition: all .3s;

        &:after {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          transition: background-color .3s;
        }

        &:hover {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
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
        &:after {
          background-color: $colorTheme;
        }
      }

      figure {
        display: flex;
        align-items: center;
        height: 100%;

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
            font-weight: 400;
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
    padding: 0 30px;

    .panel-right-top {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 58px;

      .img-box {
        margin-right: 20px;
        width: 50px;
        height: 50px;
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
          line-height: 24px;
          font-size: 16px;
          color: $colorText1;
        }

        .text-info {
          height: 24px;
          font-size: 14px;
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
