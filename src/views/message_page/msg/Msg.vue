<template>
  <div class="Message">
    <div class="container">
      <div class="left">
        <el-scrollbar style="height: 100%">
          <ul v-if="leftBarInstance">
            <template v-for="item in leftBarInstance.leftBarList">
              <li
                :class="[{active: item.miniType === messageStore.miniType}]"
                :key="item.miniType"
                @click="leftBarInstance.setItemActive(item)"
              >
                <div class="top">
                  <el-badge :value="item.count === 0 ? '' : item.count" :max="99" class="item">
                    <div class="img-box">
                      <img :src="item.otherAvatar" v-if="item.miniType===1101" v-avatar="item.otherName">
                      <img :src="item.avatar" v-else v-avatar="item.name">
                    </div>
                  </el-badge>
                  <span class="title" v-if="item.miniType===1101">{{item.otherName}}</span>
                  <span class="title" v-else>{{item.name}}</span>{{item.miniType}}
                  <span class="publish-time mt">{{item.sendTime | formatTime}}</span>
                </div>
                <p v-if="item.content">
                  <span v-if="item.miniType===1101">{{item.name}}: </span>
                  <span v-if="item.content" v-html="parseEmotions(item.content)"></span>
                </p>
                <div class="right-border"></div>
                <img class="list-menu" src="@ma/icon/list_menu.svg" alt="">
              </li>
            </template>
          </ul>
        </el-scrollbar>
      </div>
      <div class="right">
        <template v-if="leftBarInstance">
          <new-friends v-if="messageStore.miniType === 11016"></new-friends>
          <group-helper v-if="messageStore.miniType === 11017"></group-helper>
          <Todo v-if="messageStore.miniType === 2"></Todo>
          <single-msg v-if="messageStore.miniType === 1100"></single-msg>
          <group-msg v-if="messageStore.miniType === 1101"></group-msg>
          <analysis v-if="messageStore.miniType === 11021"></analysis>
        </template>

        <!--右边区域左内阴影效果-->
        <div class="inset-shadow"></div>
      </div>

      <!--container区域上边贴导航栏内阴影效果-->
      <div class="inset-shadow"></div>
    </div>
  </div>
</template>

<script>
import {MY_SESSION} from '~api/message.js';
import {mapGetters, mapActions} from 'vuex'
import {FORMAT_MSG_TIME, PARSE_EMOTIONS} from 'utils/message.js'

const NAV_HEADER_HEIGHT = 64; // 头部导航栏的高度

// 消息左边栏
class LeftBar {
  constructor(resList, ActionSetMessageStore, loginUserId) {
    if (!LeftBar.instance) {
      this.loginUserId = loginUserId
      this.ActionSetMessageStore = ActionSetMessageStore;
      this._init(resList);
      LeftBar.instance = this;
    }
    return LeftBar.instance
  }

  _init(resList) {
    let itemList = [];
    resList.forEach(i => {
      let leftBarItem = new LeftBarItem(i);
      itemList.push(leftBarItem)
    });
    this.leftBarList = itemList;
  }

  // 激活这个边栏项
  setItemActive(itemObj) {
    this.activeItem = itemObj;
    itemObj.setActive();
    let user = {
      id: itemObj.senderId,
      avatar: itemObj.avatar,
      trueName: itemObj.name,
    };
    itemObj['user'] = user;
    let obj = {
      targetId: itemObj.targetId,
      miniType: itemObj.miniType,
      receiverData: itemObj
    };
    this.setMessageStore(obj)
  }

  // 修改 vuex 中的变量 messageStore
  // 传参obj示例 {miniType: 1001} key值 miniType必须在vuex中定义
  setMessageStore(obj) {
    this.ActionSetMessageStore(obj)
  }

  // 添加一条边栏
  addLeftBarItem(itemData) {
    let item = this.checkExists(itemData);
    if (item) {
      item.addCount(itemData.content)
    } else {
      let leftBarItem = new LeftBarItem(itemData);
      this.leftBarList.unshift(leftBarItem)
    }
  }

  // 判断这个item是不是已近存在了，存在则返回这个item，否则返回 false
  // 判断依据
  checkExists(itemData) {
    for (let item of this.leftBarList) {
      console.log('bianlan:', item);
      if (item.senderId === itemData.senderId && item.miniType === itemData.miniType) {
        return item
      }
    }
  }
}

// 消息边栏中的一项
class LeftBarItem {
  constructor(obj) {
    this.isActive = false;
    this.count = 1;
    this._init(obj)
  }

  _init(obj) {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      this[key] = obj[key]
    });
    this.miniType = obj.miniType;
    // 只有是群聊1101时候targetId=receiverId 其余都= senderId
    if (obj.miniType === 1101) {
      this.targetId = obj.receiverId
    } else {
      this.targetId = obj.senderId
    }
  }

  // 把自己设置为激活状态，并清除消息计数和聊天内容
  setActive() {
    if (!this.isActive) this.isActive = true;
    this.clearCount()
  }

  // 消息计数+1，并跟新内容
  addCount(content) {
    this.count++;
    this.content = content
  }

  // 清除消息计数，和消息内容
  clearCount() {
    this.count = 0;
    this.content = ''
  }

}

export default {
  name: 'Message',
  components: {
    // Todo: () => import('./Todo'), // 代办事项
    Analysis: () => import('./Analysis'),           // 分析助手
    SingleMsg: () => import('./SingleMsg'),         // 单聊消息
    NewFriends: () => import('./NewFriends'),       // 新朋友
    GroupHelper: () => import('./GroupHelper'),     // 群助手
    GroupMsg: () => import('./GroupMsg')            // 群助手
  },
  data() {
    return {
      receiverId: null, // 单聊对象 id
      groupId: null, // 群聊 群id
      leftBarInstance: null, // 左边栏实例
      showGroupMembers: false,
      activeItem: 4, // 当前激活显示的选项
      messageList: [] // 左边的消息列表，请求 ‘/api/api/my_session’ 返回回来的 data
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    newServerMsg() {
      return this.messageStore.newServerMsg
    },
    loginUserId() {
      return this.user.user.id;
    }
  },
  watch: {
    //监听服务器推送的消息
    newServerMsg(val) {
      console.log('监听到服务器推送：', val);
      let item = val.data;
      item['miniType'] = val.code;
      // 当当前窗口不是聊天窗时，才往侧栏添加提示
      // todo: 群消息处理
      if (this.messageStore.targetId !== item.senderId) {
        debugger;
        this.leftBarInstance.addLeftBarItem(item);
      }
    }
  },
  filters: {
    trim(val) { // 去掉头尾空格
      return val.trim()
    },
    // 格式化时间戳
    formatTime(time) {
      return FORMAT_MSG_TIME(time);
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),

    // 解析表情包
    parseEmotions(content) {
      return PARSE_EMOTIONS(content)
    },

    // 弹出系统推送的消息
    alertServerMsg(data) {
      console.log('收到服务器推送消息：', data)
    },

    // 初始化消息左边栏
    initLeftBar(resList) {
      this.leftBarInstance = new LeftBar(resList, this.ActionSetMessageStore, this.loginUserId)
    },

    // 页面挂载后 请求消息列表数据成功后的处理
    getSessionThen(res) {
      res = res.data;
      if (res.code === 200 && res.data) {
        this.messageList = res.data;
        console.log('message左边栏====', this.messageList, '===message左边栏');
        let mySessionList = res.data;
        this.initLeftBar(res.data); // 初始化消息左边栏
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          showClose: true
        })
      }
    },

    // 当左边的列表项点击后，讲该项设置为激活状态
    activeThisItem(activeItem) {
      // console.log('需要激活的选项：', activeItem);
      this.activeItem = activeItem
    },

    // 动态设置message视图的高度（窗口高度-头部导航栏的高度）
    messageResize() {
      let windowHeiht = window.innerHeight; // 浏览器内部窗口高度
      let messagecContainer = this.$refs.messagecContainer;
      let resizeHeight = windowHeiht - NAV_HEADER_HEIGHT;
      messagecContainer.style.height = resizeHeight + 'px';
      console.log('message视图高度：', resizeHeight);
      console.log('message视图dom：', messagecContainer)
    }

  },
  mounted() {
    this.ActionSetMessageStore({routeName: '消息'});

    // 页面挂载后 请求消息列表数据
    MY_SESSION(this.user.user.id).then(res => {
      this.getSessionThen(res)
    }).catch(err => {
      console.log('请求message：', err)
    });
  }
}
</script>

<style lang="scss">
  /*这里不使用 scoped 是v-html生成表情能够应用到样式*/
  @import "@ms/emotion_sprites.scss";
  .face-img {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
</style>
<style lang="scss" scoped>
  @import "@ms/index.scss";

  .Message {
    font-family: $fontFamilyMain;
    position: relative;
    height: 100vh !important;

    .container {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .left {
        width: $sizeNavBarWidth;
        height: 100%;
        background: rgba(255, 255, 255, 1);

        ul {
          width: 100%;
          height: 100%;

          li {
            position: relative;
            overflow: hidden;
            padding: 20px 20px 18px;
            border-bottom: 1px solid $colorBorder1;
            cursor: pointer;

            .avatar-img {
              width: 46px;
            }
            /deep/ .el-badge {
              vertical-align: unset;
            }

            .top {
              height: 46px;
              line-height: 46px;
              padding-right: 10px;

              .img-box {
                width: 46px;
                height: 46px;
                border-radius: 50%;
                overflow: hidden;
                background: $colorTheme;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  float: left;
                }
              }

              .title {
                display: inline-block;
                margin-left: 20px;
                width: 80px;
                @include singleEllipsis()
              }

              .mt {
                margin-top: 15px;
              }

              .count {
                display: inline-block;
                $countHeight: 20px;
                height: $countHeight;
                line-height: $countHeight;
                margin-left: 11px;
                padding: 0 5px;
                min-width: 20px;
                text-align: center;
                border-radius: $countHeight / 2;
                font-size: 12px;
                color: #ffffff;
                background: #F33D3D;
              }

              .publish-time {
                float: right;
                /*width: 50px;*/
                height: 16px;
                font-size: 12px;
                font-family: $fontFamilyMain;
                font-weight: 400;
                line-height: 20px;
                color: $colorText4;
              }
            }

            .list-menu {
              position: absolute;
              right: 5px;
              top: 50%;
              height: 20px !important;
              width: 20px !important;
              cursor: pointer;
              transform: translateY(-50%);
            }

            p {
              @include singleEllipsis();
              margin-top: 15px;
              font-size: 12px;
              font-family: $fontFamilyMain;
              font-weight: 400;
              line-height: 16px;
              color: $colorText2;
            }

            .right-border {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              width: 6px;
            }
          }

          li.active {
            .right-border {
              background-color: $colorTheme;
            }
          }

          .addressbook {
            width: 100%;
            padding: 27px 20px;
            background: rgba(255, 255, 255, 1);

            img {
              width: 46px;
              float: left;
            }

            h3 {
              font-size: 16px;
              font-family: $fontFamilyMain;
              font-weight: 400;
              float: left;
              color: $colorText1;
              opacity: 1;
              margin: 15px 0 0 20px;
            }

            .img {
              width: 20px;
              float: right;
              border-radius: 50%;
            }
          }
        }
      }

      .right {
        flex: 1;
        position: relative;
        overflow: hidden;
        height: 100%;
        /*min-width: 800px;*/
        background: $colorBgPageGray;

        .inset-shadow {
          $insetShadowWidth: 20px;
          position: absolute;
          left: -$insetShadowWidth;
          top: 0;
          bottom: 0;
          width: $insetShadowWidth;
          height: 100%;
          box-shadow: 3px 0 $insetShadowWidth rgba(0, 0, 0, 0.1);
        }
      }

      .inset-shadow {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: #ffffff;
        box-shadow: 0 3px 60px rgba(0, 0, 0, 0.16);
      }
    }
  }
</style>
