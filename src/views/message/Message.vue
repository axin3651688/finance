<template>
  <div class="Message vue-module">
    <div class="container" ref="messagecContainer">
      <div class="left">
        <el-scrollbar style="height: 100%">
          <ul>
            <!--<li :class="['addressbook', {'active': activeItem === 101010}]" @click="activeThisItem(101010)">-->
              <!--<img class="avatar-img" src="@/assets/green/contact_icon.svg" alt="">-->
              <!--<h3>通讯录（60人）</h3>-->
              <!--<img class="list-menu" src="@/assets/green/contact_list.svg" alt="">-->
              <!--<div class="right-border"></div>-->
            <!--</li>-->
            <template v-if="leftBarInstance">
              <template v-for="item in leftBarInstance.leftBarList">
                <li v-if="!leftBarInstance.content"
                    :class="['have-sub', {active: leftBarInstance.activeItem === item}]"
                    :key="item.miniType"
                    @click="leftBarInstance.setItemActive(item)"
                >
                  <img class="avatar-img" :src="item.avatar" :alt="item.name">
                  <h3>{{item.name}}</h3>
                  <img class="list-menu" src="@/assets/green/contact_list.svg" alt="">
                  <div class="right-border"></div>
                </li>
                <li v-else
                    :class="['have-sub', {active: leftBarInstance.activeItem === item}]"
                    :key="item.miniType"
                    @click="leftBarInstance.setItemActive(item)"
                >
                  <div class="top">
                    <img src="@/assets/green/sys_icon.svg" alt="">
                    <span class="count mt">10</span>
                    <span class="publish-time mt">26秒前</span>
                  </div>
                  <h3 class="title">软件技术群
                    <img class="list-menu" src="@/assets/green/list_menu.svg" alt="">
                  </h3>
                  <p>今天风险信息系统经过了第一轮测试...</p>
                  <div class="right-border"></div>
                </li>
              </template>
            </template>

            <li :class="[ {'active': activeItem === 2}]" @click="activeThisItem(2)">
              <div class="top">
                <img src="@/assets/green/sys_icon.svg" alt="">
                <span class="count mt">99+</span>
                <span class="publish-time mt">26秒前</span>
              </div>
              <h3 class="title">代办事项
                <img class="list-menu" src="@/assets/green/list_menu.svg" alt="">
              </h3>
              <p>今天风险信息系统经过了第一轮测试,今天风险信息系统经过了第一轮测试,显示的值...</p>
              <div class="right-border"></div>
            </li>
            <li :class="[ {'active': activeItem === 4}]" @click="activeThisItem(4)">
              <div class="top">
                <img src="@/assets/green/sys_icon.svg" alt="">
                <span class="count mt">1</span>
                <span class="publish-time mt">26秒前</span>
              </div>
              <h3 class="title">张某
                <img class="list-menu" src="@/assets/green/list_menu.svg" alt="">
              </h3>
              <p>今天风险信息系统经过了第一轮测试...</p>
              <div class="right-border"></div>
            </li>
            <li :class="[ {'active': activeItem === 5}]" @click="activeThisItem(5)">
              <div class="top">
                <img src="@/assets/green/sys_icon.svg" alt="">
                <span class="count mt">10</span>
                <span class="publish-time mt">26秒前</span>
              </div>
              <h3 class="title">软件技术群
                <img class="list-menu" src="@/assets/green/list_menu.svg" alt="">
              </h3>
              <p>今天风险信息系统经过了第一轮测试...</p>
              <div class="right-border"></div>
            </li>

          </ul>
        </el-scrollbar>
      </div>
      <div class="right">
        <template v-if="leftBarInstance">
          <contacts v-if="leftBarInstance.activeItem.miniType === 101010" v-once></contacts>
          <new-friends v-if="leftBarInstance.activeItem.miniType === 11016" v-once></new-friends>
          <group-helper v-if="leftBarInstance.activeItem.miniType === 11017" v-once></group-helper>
          <Todo v-if="activeItem === 2" v-once></Todo>
          <single-msg v-if="leftBarInstance.activeItem.miniType === 4" :chatWithUserId="chatWithUserId" v-once></single-msg>
          <group-msg v-if="leftBarInstance.activeItem.miniType === 5" v-once></group-msg>
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
import SingleMsg from './SingleMsg' // 单聊消息
import Contacts from './Contacts' // 通讯录
import Todo from './Todo' // 代办事项
import NewFriends from './NewFriends' // 新朋友
import GroupHelper from './GroupHelper' // 群助手
import GroupMsg from './GroupMsg' // 群助手
const NAV_HEADER_HEIGHT = 64; // 头部导航栏的高度

// 暂时定义一个通讯录类容
var contact = {
  avatar: "http://jiaxin365.cn/images/cloud/msg_icon/message_new%20friends.png",
  content: null,
  count: 60,
  id: null,
  miniType: 101010,
  name: "通讯录",
  otherAvatar: null,
  otherName: null,
  platform: null,
  receiverId: null,
  sendTime: null,
  senderId: null,
  state: 0,
  type: null,
};

// 消息左边栏
class LeftBar {
  constructor(resList) {
    if (!LeftBar.instance) {
      this.activeItem = new LeftBarItem(contact);
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
    itemList.push(new LeftBarItem(contact));
    this.leftBarList = itemList;
  }

  setItemActive(itemObj) {
    this.activeItem = itemObj;
    itemObj.setActive()
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
    for (let i of this.leftBarList) {
      return i.id === itemData.id ? i : false
    }
  }
}

// 消息边栏中的一项
class LeftBarItem {
  constructor(obj) {
    this.isActive = false;
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
    SingleMsg, // 单聊消息
    Contacts, // 通讯录
    Todo, // 代办事项
    NewFriends, // 新朋友
    GroupHelper, // 群助手
    GroupMsg // 群助手
  },
  data() {
    return {
      leftBarInstance: null, // 左边栏实例
      showGroupMembers: false,
      activeItem: 4, // 当前激活显示的选项
      messageList: [] // 左边的消息列表，请求 ‘/api/api/my_session’ 返回回来的 data
    }
  },
  computed: {
    ...mapGetters(['user', 'newServerMsg', 'chatWithUserId'])
  },
  watch: {
    newServerMsg(data) {
      this.alertServerMsg(data)
    },
    chatWithUserId(chatWithUserId) {
      // TODO: 这里有bug 联系点击同一个人不会出发改变
      this.activeItem = 4;
    }
  },
  methods: {
    // ...mapActions(['']),

    // 初始化消息左边栏
    initLeftBar(resList) {
      this.leftBarInstance = new LeftBar(resList)
    },

    // 弹出系统推送的消息
    alertServerMsg(data) {
      console.log('收到服务器推送消息：', data)
    },

    // 页面挂载后 请求消息列表数据成功后的处理
    getSessionThen(res) {
      res = res.data;
      if (res.code === 200 && res.data) {
        this.messageList = res.data;
        console.log('message左边栏====', this.messageList, '===message左边栏');
        let mySessionList = res.data;
        this.initLeftBar(res.data);
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
      // console.log('message视图高度：', resizeHeight);
      // console.log('message视图dom：', messagecContainer)
    }
  },
  mounted() {
    // 页面挂载后 请求消息列表数据
    console.log('用户信息：', this.user);
    MY_SESSION(this.user.user.id).then(res => {
      this.getSessionThen(res)
    }).catch(err => {
      console.log('请求message：', err)
    });

    // 在页面挂在的之后默动态设置窗口高度
    this.messageResize();
    window.addEventListener('resize', this.messageResize)
  },
  beforeDestroy () {
    // 在页面销毁的时候一定要取消事件监听，不然严重影响性能
    window.removeEventListener('resize', this.messageResize)
  }
}
</script>
<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  #app {
    .containerMain {
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      height: calc(100% - 64px);
    }
  }

  .Message {
    font-family: $fontFamilyMain;

    .container {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .left {
        width: 300px;
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
                width: 50px;
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
              min-width: 240px;
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
