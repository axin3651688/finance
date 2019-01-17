<template>
  <div class="ContactsGroups">
    <div class="panel-left">
      <el-scrollbar>
        <ul class="sub-item">
          <li :class="{active: activeGroupID === group.groupId}"
              v-for="group in groupList"
              :key="group.groupId"
              @click="getInfo(group.groupId)">
            <figure>
              <div class="img-box">
                <img :src="group.avatar" v-avatar="group.text"/>
              </div>
              <div class="info">
                <span class="info-text">{{group.text}}</span>
                <span class="info-count">（{{group.count}}人）</span>
              </div>
            </figure>
            <i class="arrow el-icon-arrow-right"></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="panel-right">
      <template v-if="rightInfo">
        <div class="panel-right-top">
          <div class="top-wrap">
            <div>
              <div class="img-box">
                <img :src="rightInfo.avatar" class="avatar-img" v-avatar="rightInfo.text">
              </div>
            </div>
            <div class="text">
              <!--{{rightInfo.groupId}}-->
              <h3 class="text-title" :title="rightInfo.text">{{rightInfo.text}}</h3>
              <p class="text-info">{{rightUsers.length}}人</p>
            </div>
            <el-button
              type="primary"
              size="medium"
              class="my-btn"
              @click="chatWithGroup(rightInfo)"
            >发送信息
            </el-button>
          </div>
        </div>
        <div class="panel-right-content">
          <div class="content-wrap">
            <el-scrollbar>
              <section>
                <h4 class="title">群组成员</h4>
                <div class="content">
                  <ul>
                    <li v-for="user in rightUsers" :key="user.id">
                      <figure>
                        <div>
                          <div class="img-box">
                            <img :src="user.avatar" v-avatar="user.trueName">
                          </div>
                        </div>
                        <span class="info">{{user.trueName}}</span>
                      </figure>
                    </li>
                  </ul>
                </div>
              </section>
              <section>
                <h4 class="title">最新公告</h4>
                <div class="content">
                  <p class="pure-text" v-if="rightNotice.content">{{rightNotice.content}}</p>
                </div>
              </section>
              <section v-if="qrUrl">
                <h4 class="title">群二维码</h4>
                <div class="content">
                  <!--{{this.qrUrl}}-->
                  <div class="qr-code">
                    <qriously :value="qrUrl"/>
                  </div>
                </div>
              </section>
            </el-scrollbar>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {
  MY_GROUP_LIST,
  FIND_GROUP_NOTICE,
  SCAN_URL,
  GROUP_INFO
} from '~api/message.js'

export default {
  name: 'ContactsGroups',
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    }
  },
  data() {
    return {
      qrUrl: null, // 群二维码地址
      activeGroupID: null, // 当前选中的群组id
      requestedGroups: {}, // 已经请求过的群组信息
      groupList: null, // [{},{}] 我的群组列表
      rightUsers: [],
      rightInfo: null, // {},
      rightNotice: {}
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    getData() {
      // debugger;
      MY_GROUP_LIST(this.user.user.id).then(res => {
        console.log('我的群组：', res.data);
        if (res.data.code === 200) {
          this.groupList = res.data.data;

          // 默认请求第一个群组的信息
          if (this.groupList.length) {
            this.getInfo(this.groupList[0].groupId)
          } else {
            this.$message({
              type: 'warning',
              message: '你还没有加入任何群组',
              showClose: true
            })
          }

        }
      })
    },

    // 检查这个群组的信息是不是已将请求过一次了,如果请求过了则直接返回该群组的信息
    checkGroupInfo(groupId) {
      if (this.requestedGroups.hasOwnProperty(groupId)) {
        console.log(`已经请求过该群组的信息了:${groupId}`, this.requestedGroups[groupId]);
        return this.requestedGroups[groupId];
      } else return null
    },

    // 群id查询群信息，获取群资料
    getInfo(groupId) {
      this.activeGroupID = groupId;
      let groupInfo = this.checkGroupInfo(groupId);
      if (groupInfo) {
        this.rightUsers = groupInfo.users;
        this.rightInfo = groupInfo.info;
        this.rightNotice = groupInfo.rightNotice;
        this.qrUrl = groupInfo.qrUrl;
      } else {
        GROUP_INFO(groupId).then(res => {
          console.log('群id查询群信息res:', res);
          if (res.data.code === 200) {
            let groupInfo = res.data.data;
            this.ActionSetMessageStore({
              groupInfo: groupInfo,
            });
            this.rightUsers = groupInfo['users'];
            this.rightInfo = groupInfo['info'];
            this.requestedGroups[groupId] = groupInfo;
          }
        }).catch(err => {
          console.log('请求message：', err)
        });

        // 获取群公告   公告图片的字段: rightNotice.url
        FIND_GROUP_NOTICE(groupId, this.user.user.id).then(res => {
          console.log('群id获取群公告:', res.data.data);
          if (res.data.code === 200) {
            if (res.data.data.noticeList.length > 0) {
              this.rightNotice = res.data.data.noticeList[0];
              this.requestedGroups[groupId]['rightNotice'] = this.rightNotice;
            }
          }
        }).catch(err => {
          console.log('请求message：', err)
        });

        let params = {
          platform: 'pc',
          type: 'group',
          targetId: groupId
        };
        // 获取二维码地址
        SCAN_URL(params).then(res => {
          console.log('获取二维码的生成地址:', res);
          if (res.data.code === 200) {
            let qrUrl = this.qrUrlFormat(res.data.data.url);
            this.qrUrl = qrUrl;
            this.requestedGroups[groupId]['qrUrl'] = qrUrl;
          }
        }).catch(err => {
          console.log('获取二维码的生成地址err：', err)
        })
      }
    },

    // 替换url后的 userId
    qrUrlFormat(qrUrl) {
      return qrUrl.replace(/{userId}/, this.loginUserId)
    },

    // 开始群聊天
    chatWithGroup(rightInfo) {
      debugger;
      let sessionItem = {};
      let targetId = '1101_' + this.loginUserId + '_' + rightInfo.groupId;
      sessionItem['miniType'] = 1100;
      sessionItem['targetId'] = targetId;
      sessionItem['id'] = rightInfo.groupId;
      sessionItem['name'] = rightInfo.text;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = rightInfo.avatar;
      sessionItem['originData'] = rightInfo;
      this.ActionSetMessageStore({
        sessionActiveItem: sessionItem,
        miniType: 1101, // 1101 群聊,
        receiverData: rightInfo
      });
      let itemExist = false;
      for (let sessionItem of this.messageStore.sessionList) {
        if (sessionItem.targetId === targetId) { // 如果已经在队列中了，跳出遍历，直接跳转
          itemExist = true;
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
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";

  .ContactsGroups {
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
          margin-right: 15px;
          border-radius: 8px;
          background: $colorTheme;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .info {
          @include flex();
          justify-content: space-between;
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 20px;

          .info-text {
            @include singleEllipsis();
            width: 134px;
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
    display: flex;
    flex-direction: column;

    .panel-right-top {
      padding: 0 40px 40px;

      .top-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

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
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 40px;
          font-size: 30px;
          color: $colorText1;
        }

        .text-info {
          height: 24px;
          font-size: 18px;
          color: $colorText3;
        }
      }

      .my-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        border: none;
        background: $colorTheme;
      }
    }

    .panel-right-content {
      position: relative;
      flex: 1;
      font-weight: 400;
      margin-left: 40px;

      .content-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
      }

      section {
        margin-bottom: 40px;
      }

      .title {
        margin-bottom: 10px;
        height: 24px;
        font-size: 18px;
        line-height: 20px;
        color: $colorText3;
      }

      .content {
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            margin-right: 40px;
            margin-bottom: 30px;

            figure {
              display: flex;
              flex-direction: column;
              align-items: center;

              .img-box {
                overflow: hidden;
                margin-bottom: 10px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: $colorTheme;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);

                img {
                  width: 100%;
                  height: 100%;
                }
              }

              .info {
                height: 21px;
                font-size: 16px;
                font-weight: 400;
                line-height: 20px;
                color: $colorText1;
              }
            }
          }
        }

        .pure-text {
          font-size: 16px;
          line-height: 20px;
          color: $colorText1;
        }

        .qr-code {
          width: 100px;
          height: 100px;
          /*background: #cccccc;*/
          overflow: hidden;
          margin-left: -5px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

  }

</style>
