<template>
  <div class="Index" style="height: 100%">

    <el-scrollbar style="height: 100%">
      <div class="cardItem" v-if="findCardArrs.length">
        <div v-for="card of findCardArrs" :key=card.id>
          <div class="card-box" @click="cardboxClick(card)">
            <img class="cardImg" :src="card.avatar"/>
            <span class="cardTitle">{{card.text}}</span>
          </div>
        </div>
      </div>

      <div class="spanTitle" v-show="nodeArrs.length>0">特别关注</div>

      <div class="nodeItem">

        <div v-for="node of nodeArrs" :key=node.id>
          <div class="node-box" @click="nodeboxClick(node)">
            <img class="nodeImg" :src="node.avatar"/>
            <span class="nodeTitle">{{node.text}}</span>
          </div>
        </div>
      </div>

      <div class="contactTitle" v-show="latest_contact.length>0">联系人</div>

      <div class="contactItem">

        <div v-for="contact of latest_contact" :key=contact.id>
          <div class="contact-box" @click="contactClick(contact)">
            <!--<img class="contactAvatar" :src="contact.avatar"/>-->
            <div class="img-box">
              <avatar
                :username="contact.trueName"
                :rounded="false"
                backgroundColor="transparent"
                color="#fff"
                :size="50"
              ></avatar>
              <img :src="contact.avatar" onerror="this.style.display='none'"/>
            </div>
            <div class="contact-flex">
              <span class="contactName">{{contact.trueName}}</span>
              <span class="contactdes" v-if="contact.sign">{{contact.sign}}</span>
            </div>

          </div>
        </div>
      </div>
    </el-scrollbar>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {
  FIND_CARD,
  LATEST_CONTACT,
  MY_NODE
} from '@m_api/messageIndex.js';

const SETTINGS = require('@/settings'); // 全局变量或配置

export default {
  name: 'Home',

  computed: {
    ...mapGetters(['user', 'messageStore'])
  },

  data() {
    return {
      findCardArrs: [],
      nodeArrs: [],
      latest_contact: []
    };
  },

  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),

    cardboxClick(card) {
      // debugger;
      console.log('点击了卡片数据-->>', card.text);
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer;
        if (card.redirect) {
          ipc.send('web_openWebUrl', card.redirect);
        }
      } else {
        if (card.redirect) window.open(card.redirect, '_blank');
      }
    },

    nodeboxClick(node) {
      // debugger
      let addr = SETTINGS.serverAddress.api; // 服务器地址
      let companyId = this.user.company.id;
      let redirectUrl = addr + 'auth/auth_url/' + localStorage.authorization + '/?companyId=' + companyId + '&redirectUrl=' + node.redirect;
      console.log('redirectUrl-->>', redirectUrl);
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer;
        if (redirectUrl) {
          ipc.send('web_openWebUrl', redirectUrl);
        }
      } else {
        if (redirectUrl) window.open(redirectUrl, '_blank');
      }
    },
    contactClick(user) {
      // debugger
      console.log('点击了联系人-->>', user);
      let sessionItem = {};
      let targetId = '1100_' + user.id;
      sessionItem['miniType'] = 1100;
      sessionItem['targetId'] = targetId;
      sessionItem['id'] = user.id;
      sessionItem['name'] = user.trueName;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = user.avatar;
      sessionItem['originData'] = user;
      this.ActionSetMessageStore({
        sessionActiveItem: sessionItem,
        miniType: sessionItem.miniType,
        receiverData: user
      });
      this._updateSessionList(sessionItem);     // 更新session边栏
      this.$router.push('/message_page/msg');
    },

    /**
     * 更新session边栏，如果已经存在则清空消息计数，不存在则添加一个session条目
     */
    _updateSessionList(sessionItem) {
      let itemExist = false;
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === sessionItem.targetId) { // 如果已经在队列中了，跳出遍历，直接跳转
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
    }

  },

  mounted() {
    FIND_CARD(this.user.user.id).then(res => {
      console.log('获取查询可以添加的卡片数据-->>', res.data);

      if (res.data.code === 200) {
        this.findCardArrs = res.data.data;
      }
    });

    MY_NODE(this.user.user.id).then(res => {
      console.log('获取我的节点 MY_NODE -->>', res.data);

      if (res.data.code === 200) {
        this.nodeArrs = res.data.data;
        console.log('this.nodeArrs:', this.nodeArrs);
      }
    });

    LATEST_CONTACT(this.user.user.id).then(res => {
      console.log('获取我的常用联系人 -->>', res.data);

      if (res.data.code === 200) {
        this.latest_contact = res.data.data;
      }
    });
  }

};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .Index {
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  /*img-box user-avatar*/
  .img-box {
    @include imgBox($width: 50px, $height: 50px, $borderRadius: 8px);

    div {
      position: absolute;
    }
  }

  .cardItem {

    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    .card-box {
      margin-left: 30px;
      margin-bottom: 20px;
      padding: 15px 10px 10px 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .cardImg {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }

      .cardTitle {
        padding-top: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
      }
    }
  }

  .spanTitle {
    padding: 0px 30px 30px 50px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }

  .nodeItem {

    display: flex;
    margin-left: 30px;
    // margin-top: 40px;
    flex-wrap: wrap;

    .node-box {

      width: 260px;
      height: 70px;
      margin-right: 60px;
      padding: 0px 0px 0px 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .nodeImg {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }

      .nodeTitle {
        padding-left: 30px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: rgba(102, 102, 102, 1);
        opacity: 1;

        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  .contactTitle {
    padding: 30px 30px 30px 50px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }

  .contactItem {

    display: flex;
    margin-left: 30px;
    flex-wrap: wrap;
    flex-direction: column;

    .contact-box {
      width: 260px;
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .contactAvatar {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }

      .contact-flex {
        box-sizing: border-box;
        display: flex;
        flex: 1;
        margin-left: 20px;
        overflow: hidden;
        flex-direction: column;
        justify-content: space-around;

        .contactName {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }

        .contactdes {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: rgba(102, 102, 102, 1);
          opacity: 1;

        }

      }

    }
  }
</style>
