<template>
  <div class="Message">
    <div class="container">
      <div class="left">
        <el-scrollbar style="height: 100%">
          <ul>
            <template v-if="leftBarInstance">
              <template v-for="item in leftBarInstance.leftBarList">
                <li v-if="!item.content"
                    :class="['have-sub', {active: item.miniType === messageStore.miniType}]"
                    :key="item.miniType"
                    @click="leftBarInstance.setItemActive(item)"
                >
                  <img class="avatar-img" :src="item.avatar" :alt="item.name">
                  <h3>{{item.name}} {{item.miniType}}</h3>
                  <img class="list-menu" src="@/assets/green/contact_list.svg" alt="">
                  <div class="right-border"></div>
                </li>
                <li v-else
                    :class="[{active: item.miniType === messageStore.miniType}]"
                    :key="item.miniType"
                    @click="leftBarInstance.setItemActive(item)"
                >
                  <div class="top">
                    <img :src="item.avatar" alt="">
                    <span class="count mt" v-if="item.count">{{item.count}}</span>
                    <span class="publish-time mt">{{item.sendTime | formatTime}}</span>
                  </div>
                  <h3 class="title">{{item.name}}
                    <img class="list-menu" src="@/assets/green/list_menu.svg" alt="">
                  </h3>
                  <p>{{item.content}}</p>
                  <div class="right-border"></div>
                </li>
              </template>
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
import {FORMAT_TIME} from 'utils/message.js'

const NAV_HEADER_HEIGHT = 64; // 头部导航栏的高度

// 消息左边栏
class LeftBar {
  constructor(resList, ActionSetMessageStore) {
    if (!LeftBar.instance) {
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

  setItemActive(itemObj) {
    this.activeItem = itemObj;
    itemObj.setActive();
    let user = {
      id: itemObj.senderId,
      avatar: itemObj.avatar,
      trunName: itemObj.name,
    };
    itemObj['user'] = user;
    this.setMessageStore({
      miniType: itemObj.miniType,
      receiverData: itemObj
    })
  }

  // 修改 vuex 中的变量 messageStore
  // 传参obj示例 {miniType: 1001} key值 miniType必须在vuex中定义
  setMessageStore(obj) {
    this.ActionSetMessageStore(obj)
  }

  addLeftBarItem(itemData) {
    let result = this.checkExists(itemData);
    if (result) {
      result.addCount()
    } else {
      let leftBarItem = new LeftBarItem(itemData);
      this.leftBarList.unshift(leftBarItem)
    }
  }

  checkExists(itemData) {
    for (let item of this.leftBarList) {
      return item.senderId === itemData.senderId ? item : false
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
    })
  }

  setActive() {
    if (!this.isActive) this.isActive = true;
    this.clearCount()
  }

  addCount() {
    this.count++
  }

  clearCount() {
    this.count = 0
  }

}

export default {
  name: 'Message',
  components: {
    SingleMsg: () => import('./SingleMsg'), // 单聊消息
    // Todo: () => import('./Todo'), // 代办事项
    NewFriends: () => import('./NewFriends'), // 新朋友
    GroupHelper: () => import('./GroupHelper'), // 群助手
    GroupMsg: () => import('./GroupMsg') // 群助手
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
    }
  },
  watch: {
    //监听服务器推送的消息
    newServerMsg(val) {
      console.log('监听到服务器推送：', val);
      let item = val.data;
      item['miniType'] = val.code;
      this.leftBarInstance.addLeftBarItem(item);
      // this.ActionSetMessageStore({miniType: miniType})
    }
  },
  filters: {
    trim(val) { // 去掉头尾空格
      debugger;
      return val.trim()
    },
    // 格式化时间戳
    formatTime(time) {
      return FORMAT_TIME(time);
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),


    // 弹出系统推送的消息
    alertServerMsg(data) {
      console.log('收到服务器推送消息：', data)
    },

    // 初始化消息左边栏
    initLeftBar(resList) {
      this.leftBarInstance = new LeftBar(resList, this.ActionSetMessageStore)
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
    // 页面挂载后 请求消息列表数据
    MY_SESSION(this.user.user.id).then(res => {
      this.getSessionThen(res)
    }).catch(err => {
      console.log('请求message：', err)
    });
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/variables.scss";

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

          li.have-sub {
            img.avatar-img {
              width: 46px;
              height: 46px;
              border-radius: 50%;
              float: left;
            }

            h3 {
              float: left;
              margin-top: 15px;
              margin-left: 20px;
            }
          }

          li {
            position: relative;
            overflow: hidden;
            padding: 20px;
            border-bottom: 1px solid $colorBorder1;
            cursor: pointer;

            .avatar-img {
              width: 46px;
            }

            .top {
              height: 46px;
              padding-right: 10px;

              .mt {
                margin-top: 15px;
              }

              img {
                width: 46px;
                height: 46px;
                border-radius: 50%;
                float: left;
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

            .title {
              margin-top: 10px;
              line-height: 21px;
              font-size: 16px;
              font-family: $fontFamilyMain;
              font-weight: 400;
              color: $colorText1;
            }

            .list-menu {
              position: absolute;
              right: 20px;
              top: 50%;
              height: 20px !important;
              width: 20px !important;
              cursor: pointer;
              transform: translateY(-50%);
            }

            p {
              margin-top: 8px;
              overflow: hidden;
              font-size: 12px;
              font-family: $fontFamilyMain;
              font-weight: 400;
              line-height: 16px;
              text-overflow: ellipsis;
              white-space: nowrap;
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
        /*height: calc(100% - 60px);*/
        height: 100%;
        min-width: 800px;
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
