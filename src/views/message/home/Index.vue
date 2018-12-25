<template>
  <div class="Index" style="height: 100%">

    <el-scrollbar style="height: 100%">
      <div class="cardItem">
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
            <img class="contactAvatar" :src="contact.avatar"/>

            <div class="contact-flex">
              <span class="contactName">{{contact.trueName}}</span>
              <span class="contactdes">{{contact.sign}}</span>
            </div>

          </div>
        </div>
      </div>
    </el-scrollbar>

  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  FIND_CARD,
  LATEST_CONTACT,
  MY_NODE
} from '~api/messageIndex.js'


export default {
  name: "Index",

  computed: {
    ...mapGetters(['user', 'messageStore']),
  },

  data() {
    return {
      findCardArrs: [],
      nodeArrs: [],
      latest_contact: [],
      imagev: "http://jiaxin365.cn/images/cloud/msg_icon/mes_list_mrtx.png"

    }
  },


  methods: {

    cardboxClick(card) {

      console.log('点击了卡片数据-->>', card.text);

      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }

      if (window.require) {
        ipc.send('openWebUrl', 'http://www.baidu.com')
      }

    },

    nodeboxClick(node) {

      console.log('点击了节点数据-->>', node.text);

      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }

      if (window.require) {
        ipc.send('openWebUrl', 'http://www.baidu.com')
      }

    },
    contactClick(user) {
      console.log('点击了联系人-->>', user.trueName);
    }


  },

  mounted() {

    FIND_CARD(this.user.user.id).then(res => {
      console.log('获取查询可以添加的卡片数据-->>', res.data);

      if (res.data.code === 200) {
        this.findCardArrs = res.data.data;
      }
    })

    MY_NODE(this.user.user.id).then(res => {
      console.log('获取我的节点 MY_NODE -->>', res.data);

      if (res.data.code === 200) {
        this.nodeArrs = res.data.data;

      }
    })

    LATEST_CONTACT(this.user.user.id).then(res => {
      console.log('获取我的常用联系人 -->>', res.data);

      if (res.data.code === 200) {
        this.latest_contact = res.data.data;

      }
    })

  }

}
</script>

<style lang="scss" scoped>
  .cardItem {

    display: flex;
    flex-wrap: wrap;
    // margin-left: 40px;
    margin-top: 30px;


    .card-box {

      margin-left: 40px;
      margin-bottom: 30px;
      padding: 15px 10px 10px 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .cardImg {
        width: 80px;
        height: 80px;
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
    padding: 0px 30px 30px 40px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }

  .nodeItem {

    display: flex;
    margin-left: 40px;
    // margin-top: 40px;
    flex-wrap: wrap;

    .node-box {

      width: 260px;
      height: 100px;
      margin-right: 60px;
      // margin-bottom: 30px;
      padding: 0px 0px 0px 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .nodeImg {
        width: 80px;
        height: 80px;
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
    padding: 30px 30px 30px 40px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }


  .contactItem {

    display: flex;
    margin-left: 40px;
    flex-wrap: wrap;
    flex-direction: column;

    .contact-box {

      margin-bottom: 10px;
      // width: 260px;
      height: 100px;
      // margin-right: 60px;
      // margin-bottom: 30px;
      padding: 0px 0px 0px 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 83, 159, 0.12);
      }

      .contactAvatar {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }

      .contact-flex {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .contactName {
          padding-left: 30px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: rgba(102, 102, 102, 1);
          opacity: 1;
        }

        .contactdes {
          padding-left: 30px;
          font-size: 16px;
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