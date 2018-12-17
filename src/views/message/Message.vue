<template>
  <div>
    <div class="container">
      <div class="left">
        <ul>
          <li
            :class="['addressbook', {'active': activeItem === 101010}]"
            @click="activeThisItem(101010)"
          >
            <img class="avatar-img" src="@/assets/green/contact_icon.svg" alt>
            <h3>通讯录（60人）</h3>
            <img class="list-menu" src="@/assets/green/contact_list.svg" alt>
            <div class="right-border"></div>
          </li>
          <li :class="[ {'active': activeItem === 2}]" @click="activeThisItem(2)">
            <div class="top">
              <img src="@/assets/green/sys_icon.svg" alt>
              <span class="count mt">99+</span>
              <span class="publish-time mt">26秒前</span>
            </div>
            <h3 class="title">
              代办事项
              <img class="list-menu" src="@/assets/green/list_menu.svg" alt>
            </h3>
            <p>今天风险信息系统经过了第一轮测试,今天风险信息系统经过了第一轮测试,显示的值...</p>
            <div class="right-border"></div>
          </li>
          <li :class="[ {'active': activeItem === 4}]" @click="activeThisItem(4)">
            <div class="top">
              <img src="@/assets/green/sys_icon.svg" alt>
              <span class="count mt">1</span>
              <span class="publish-time mt">26秒前</span>
            </div>
            <h3 class="title">
              张某
              <img class="list-menu" src="@/assets/green/list_menu.svg" alt>
            </h3>
            <p>今天风险信息系统经过了第一轮测试...</p>
            <div class="right-border"></div>
          </li>
          <li :class="[ {'active': activeItem === 5}]" @click="activeThisItem(5)">
            <div class="top">
              <img src="@/assets/green/sys_icon.svg" alt>
              <span class="count mt">10</span>
              <span class="publish-time mt">26秒前</span>
            </div>
            <h3 class="title">
              软件技术群
              <img class="list-menu" src="@/assets/green/list_menu.svg" alt>
            </h3>
            <p>今天风险信息系统经过了第一轮测试...</p>
            <div class="right-border"></div>
          </li>
          <li
            :class="['have-sub', {'active': activeItem === item.miniType}]"
            v-for="item in messageList"
            :key="item.miniType"
            @click="activeThisItem(item.miniType)"
          >
            <img class="avatar-img" :src="item.avatar" :alt="item.name">
            <h3>{{item.name}} {{item.miniType}}</h3>
            <img class="list-menu" src="@/assets/green/contact_list.svg" alt>
            <div class="right-border"></div>
          </li>
          <!--<li :class="{'active': activeItem === item.miniType}"-->
          <!--v-for="item in messageList"-->
          <!--:key="item.miniType"-->
          <!--@click="activeThisItem(item.miniType)">-->
          <!--<div class="top">-->
          <!--<img :src="item.avatar" alt="">-->
          <!--<span class="count mt" v-if="item.count">{{item.count}}</span>-->
          <!--<span class="publish-time mt">26秒前</span>-->
          <!--</div>-->
          <!--<h3 class="title">{{item.name}}</h3>-->
          <!--<img class="list-menu" src="@/assets/green/list_menu.svg" alt="">-->
          <!--<p>今天风险信息系统经过了第一轮测试,今天风险信息系统经过了第一轮测试,显示的值...</p>-->
          <!--<div class="right-border"></div>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="right">
        <contacts v-if="activeItem === 101010"></contacts>
        <new-friends v-if="activeItem === 11016"></new-friends>
        <group-helper v-if="activeItem === 11017"></group-helper>
        <Todo v-if="activeItem === 2"></Todo>
        <single-msg v-if="activeItem === 4"></single-msg>
        <group-msg v-if="activeItem === 5"></group-msg>
      </div>
    </div>
  </div>
</template>
<script>
import { getSession } from "~api/message.js";
import { mapGetters } from "vuex";
import SingleMsg from "./SingleMsg"; // 单聊消息
import Contacts from "./Contacts"; // 通讯录
import Todo from "./Todo"; // 代办事项
import NewFriends from "./NewFriends"; // 新朋友
import GroupHelper from "./GroupHelper"; // 群助手
import GroupMsg from "./GroupMsg"; // 群助手

export default {
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
      activeItem: 101010, // 当前激活显示的选项
      messageList: [] // 左边的消息列表，请求 ‘/api/api/my_session’ 返回回来的 data
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    // 页面挂载后 请求消息列表数据成功后的处理
    getSessionThen(res) {
      res = res.data;
      if (res.code === 200 && res.data) {
        this.messageList = res.data;
        console.log("messageList====", this.messageList, "===messageList");
      } else {
        this.$message({
          type: "error",
          message: res.msg,
          showClose: true
        });
      }
    },

    // 当左边的列表项点击后，讲该项设置为激活状态
    activeThisItem(activeItem) {
      // console.log('需要激活的选项：', activeItem);
      this.activeItem = activeItem;
    }
  },
  mounted() {
    // 页面挂载后 请求消息列表数据
    console.log("用户信息：", this.user);
    // let userId = this.user.user.id;
    // console.log('用户id：', userId);
    getSession(this.user.user.id)
      .then(res => {
        this.getSessionThen(res);
      })
      .catch(err => {
        console.log("请求message：", err);
      });
  }
};
</script>
<style lang="scss" scoped>
@import "@s/black/variables.scss";

#app .containerMain {
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
  height: 100%;
  font-family: $fontFamilyMain;

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .left {
      width: 300px;
      height: 100%;
      float: left;
      background: rgba(255, 255, 255, 1);
      box-shadow: 3px 0 20px rgba(0, 0, 0, 0.1);
      opacity: 1;

      ul {
        width: 100%;
        height: 100%;

        li.have-sub {
          img.avatar-img {
            width: 46px;
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
              background: #f33d3d;
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
            width: 204px;
            /*height: 32px;*/
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
            right: 0;
            bottom: -1px;
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
      position: absolute;
      overflow: hidden;
      left: 300px;
      width: calc(100% - 300px);
      height: 100%;
      min-width: 800px;
      background: $colorBgPageGray;
    }
  }
}
</style>