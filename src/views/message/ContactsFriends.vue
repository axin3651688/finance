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
                <img :src="friend.avatar" :onerror="avatar_male"/>
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
            <img src="" alt="" class="avatar-img">
          </div>
          <div class="text">
            <h3 class="text-title" v-if="rightUserInfoData.user.trueName">{{rightUserInfoData.user.trueName}}</h3>
            <p class="text-info">研发部 - 前段工程师</p>
          </div>
        </div>
        <div class="panel-right-content">
          <ul>
            <li>
              <div class="icon icon-phone"></div>
              <p class="info">{{rightUserInfoData.user.phone}}</p>
            </li>
            <li>
              <div class="icon icon-email"></div>
              <p class="info">{{rightUserInfoData.user.email}}</p>
            </li>
            <li>
              <div class="icon icon-gender"></div>
              <p class="info">{{rightUserInfoData.sex.text}}</p>
            </li>
            <li>
              <div class="icon icon-slogen"></div>
              <p class="info">{{rightUserInfoData.user.sign}}</p>
            </li>
          </ul>
        </div>
        <el-button
          type="primary"
          size="medium"
          class="my-btn"
          @click="chatWithSingle(activeUser)"
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
  },

  data() {
    return {
      avatar_male: 'this.src="' + require('../../assets/green/avatar_male.png') + '"', // 图片失效，加载默认图片
      activeUser: null, // 当前选中的用户id
      requestedUser: {}, // 已经请求过详细信息用户的用户信息
      activeFriend: null, // 当前选中的好友
      friendData: null, // [] 接收一个数组
      rightUserInfoData: null // {} 接收一个对象
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),

    getdata() {
      // let userId = this.user.user.id;
      // alert(params.type)
      requestMyfriends(this.user.user.id).then(res => {
        console.log('获取我的好友列表-->>', res.data);

        if (res.data.code === 200) {
          this.friendData = res.data.data;
          let activeUserId = this.friendData[0].id;
          this.getUserinfo(activeUserId);
          this.activeUser = activeUserId
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

    // 和某某单聊, 要切换到单聊窗口
    chatWithSingle(receiverId) {
      this.ActionSetMessageStore({
        // receiverId: receiverId, // 1100 单聊
        miniType: 1100, // 1100 单聊
        receiverData: this.rightUserInfoData
      });
      this.$emit('chatWithSingle', receiverId);
    }
  },
  mounted() {
    this.getdata();
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .ContactsFriends {
    display: flex;
    height: 100%;
  }

  .panel-left {
    flex: .5;
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
          transform: translateY(-50%);
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
    flex: .5;
    padding: 60px 30px 0 30px;

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
