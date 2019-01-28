<template>
  <div class="ContactsTeams">
    <div class="panel-left">
      <el-scrollbar v-if="companyList">
        <el-collapse accordion>
          <el-collapse-item
            v-for="comp in companyList"
            :key="comp.id"
          >
            <template slot="title">
              <div class="item-wrap">
                <h3 class="item-title">
                  {{comp.text}}
                  <span>（{{comp.userCount}}人）</span>
                </h3>
                <p class="item-info">
                  公司介绍{{comp.text}}
                </p>
              </div>
            </template>
            <ul class="sub-item">
              <li :class="{active: activeUser === user.id}"
                  v-for="user in comp.children"
                  @click="getUserInfo(user.id)"
                  :key="user.id"
              >
                <figure>
                  <div class="img-box">
                    <img :src="user.avatar" alt="user.trueName" v-avatar="user.trueName" textColor="#f60">
                  </div>
                  <div class="info">
                    <h3>{{user.trueName}}</h3>
                    <p>{{user.deptName}}{{user.position}}</p>
                  </div>
                </figure>
                <i class="arrow el-icon-arrow-right"></i>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <div class="panel-right">
      <template v-if="rightUserInfo">
        <div class="panel-right-top">
          <div>
            <div class="img-box">
              <img :src="rightUserInfo.user.avatar" v-avatar="rightUserInfo.user.trueName">
            </div>
          </div>
          <div class="text">
            <h3 class="text-title">{{rightUserInfo.user.trueName}}</h3>
            <p class="text-info">{{rightUserInfo.user.sign}}</p>
          </div>
        </div>
        <div class="panel-right-content">
          <ul>
            <li v-if="rightUserInfo.user.phone">
              <div class="icon icon-phone"></div>
              <p class="info">{{rightUserInfo.user.phone}}</p>
            </li>
            <li v-if="rightUserInfo.user.email">
              <div class="icon icon-email"></div>
              <p class="info">{{rightUserInfo.user.email}}</p>
            </li>
            <li v-if="rightUserInfo.sex.text">
              <div class="icon icon-gender__male"></div>
              <p class="info">{{rightUserInfo.sex.text}}</p>
            </li>
            <li v-if="rightUserInfo.user.sign">
              <div class="icon icon-text"></div>
              <p class="info">{{rightUserInfo.user.sign}}</p>
            </li>
          </ul>

        </div>
      </template>
      <el-button
        type="primary"
        size="medium"
        class="my-btn"
        @click="chatWithSingle(rightUserInfo)"
        v-if="activeUser !== loginUserId"
      >发送信息
      </el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {
  ALL_COMPANY_CONTACT_LIST,
  CONTACT_INFO
} from '@m_api/message.js';

export default {
  name: 'ContactsTeams',
  data() {
    return {
      activeUser: this.loginUserId, // 当前选中的用户id
      companyList: null, // [] 接收一个数组
      rightUserInfo: null, // 接收一个对象
      requestedUser: {} // 已经请求过详细信息用户的用户信息
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore']), // vuex中保存的登陆用户数据
    loginUserId() { // 当前登录用户的Id
      return this.user.user.id;
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),

    // 和某某单聊, 要切换到单聊窗口
    chatWithSingle(rightUserInfo) {
      // debugger;
      let sessionItem = {};
      let targetId = '1100_' + rightUserInfo.user.id + '_' + this.loginUserId;
      sessionItem['miniType'] = 1100;
      sessionItem['targetId'] = targetId;
      sessionItem['id'] = rightUserInfo.user.id;
      sessionItem['name'] = rightUserInfo.user.trueName;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = rightUserInfo.user.avatar;
      sessionItem['originData'] = rightUserInfo;
      this.ActionSetMessageStore({
        sessionActiveItem: sessionItem,
        miniType: sessionItem.miniType
      });
      let itemExist = false;
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === targetId) { // 如果已经在队列中了，清除消息计数
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
      this.$router.push('/message_page/msg');
    },

    // 获取公司列表, 并把公司列表存vuex
    getCompanyList() {
      // debugger;
      ALL_COMPANY_CONTACT_LIST(this.loginUserId).then(res => {
        console.log('我公司列表：', res.data);
        if (res.data.code === 200) {
          this.companyList = res.data.data;
          this.ActionSetMessageStore({companyList: this.companyList});

          // 当获得公司列表后，默认请求第一个公司第一个员工的信息
          if (this.companyList.length) {
            if (this.companyList[0].children.length) {
              this.getUserInfo(this.companyList[0].children[0].id);
            }
          } else {
            this.$message({
              type: 'warning',
              message: '你还没有加入任团队',
              showClose: true
            });
          }
        }
      });
    },

    // 检查这个用户是不是已将请求过一次了,如果请求过了则直接返回该用户的信息
    checkUserInfo(userId) {
      if (this.requestedUser.hasOwnProperty(userId)) {
        console.log(`已经请求过用户的信息了:${userId}`);
        return this.requestedUser[userId];
      } else return null;
    },

    // 查看个人资料,如果这个用户已经请求过一次了就不在发送请求
    getUserInfo(userId) {
      this.activeUser = userId;
      let userInfo = this.checkUserInfo(userId);
      if (userInfo) {
        this.rightUserInfo = userInfo;
      } else {
        CONTACT_INFO(this.loginUserId, userId).then(res => {
          console.log('查询个人资料', res.data.data);
          if (res.data.code === 200) {
            let userInfo = res.data.data;
            this.rightUserInfo = userInfo;
            this.requestedUser[userId] = userInfo;
          }
        }).catch(err => {
          console.log('查询个人资料', err);
        });
      }
    }

  },
  created() {
    this.getCompanyList();
  }
};

</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";
  @import "@s/message/icons.scss";

  .ContactsTeams {
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

    /deep/ .el-collapse {
      .el-collapse-item__header.is-active {
        border-bottom-color: #ebeef5;
      }

      .el-collapse-item__header {
        $itemHeaderHeight: 70px;
        height: $itemHeaderHeight;

        .item-wrap {
          height: 100%;
          width: calc(100% - 30px);
          box-sizing: border-box;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .item-title {
            @include singleEllipsis();
            display: block;
            line-height: 21px;
            color: $colorText1;
            font-size: 14px;
            font-weight: 400;
          }

          .item-info {
            @include singleEllipsis();
            margin-top: 5px;
            line-height: 20px;
            font-size: 12px;
            color: $colorTextBlack6;
          }
        }

        .el-collapse-item__arrow {
          line-height: $itemHeaderHeight;
          height: $itemHeaderHeight;
          margin-right: 22px;
        }
      }

      /deep/ .el-collapse-item__content {
        padding-bottom: 0;

        ul.sub-item {
          li {
            position: relative;
            box-sizing: border-box;
            height: 60px;
            padding: 0 10px;
            cursor: pointer;
            border-bottom: 1px solid $colorBorderLayoutLight;
            transition: all .3s;

            &:after {
              display: block;
              content: '';
              position: absolute;
              width: 4px;
              height: 100%;
              right: 0;
              top: 0;
              bottom: 0;
              transition: all .3s;
            }

            &:hover {
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
            }

            .arrow {
              position: absolute;
              right: 15px;
              top: 50%;
              transform: translateY(-50%);
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
            margin-top: -1px;

            .img-box {
              width: 40px;
              height: 40px;
              overflow: hidden;
              margin-right: 10px;
              border-radius: 8px;
              background: $colorBgPageGray;

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
                color: $colorText1;
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
    }
  }

  .panel-right {
    flex: 1;
    padding: 0 30px;
    //background: $colorBgPageGray;

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
        line-height: 24px;
        width: 200px;

        .text-title {
          font-size: 16px;
          color: $colorText1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .text-info {
          font-size: 14px;
          color: $colorText3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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

        .info {
          min-width: 300px;
          max-width: 400px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .icon {
          position: absolute;
          overflow: hidden;
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
