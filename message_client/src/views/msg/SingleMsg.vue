<template>
  <div class="SingleMsg">
    <!--聊天头部-->
    <div class="top">
      <div class="title">
        <div class="img-box">
          <img :src="messageStore.sessionActiveItem.avatar" v-avatar="messageStore.sessionActiveItem.name">
        </div>
        <div class="titleleft">
          <h3>
            {{messageStore.sessionActiveItem.name}}
            <!--<span v-if="messageStore.sessionActiveItem.name">（{{messageStore.sessionActiveItem.name}}）</span>-->
          </h3>
          <p>安徽经邦软件有限公司</p>
        </div>
      </div>
      <div class="btn-group">
        <div :class="['btn', {active: activeBtn === 'message'}]" @click="changeMessage('message')">
          消息
        </div>
        <div :class="['btn', {active: activeBtn === 'file'}]" @click="changeMessage('file')">
          文件
        </div>
      </div>
    </div>

    <!-- 中间聊天显示区-->
    <div class="middle">
      <el-scrollbar style="height: 100%" ref="chatWindow">
        <template v-if="singleMsgList.length">
          <message-item
            v-for="item in singleMsgList"
            :key="item.id"
            :data="item"
            @showImgGallery="handleShowImgGallery"
          />
        </template>
      </el-scrollbar>
    </div>

    <!--聊天编辑窗口-->
    <div class="bottom">
      <message-sender @sendMsg="handleSendMsg"></message-sender>
    </div>

    <!--图片展示-->
    <vue-gallery-slideshow :images="imgList" :index="imgIndex" @close="imgIndex = null"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import VueGallerySlideshow from 'vue-gallery-slideshow';
import MessageItem from '@mc/message_item/MessageItem.vue';
import MessageSender from '@mc/message_sender/MessageSender.vue';
import FILE_TYPE from '@ma/data/fileType.js'; // 可以上传的文件列表
import request from '@mu/http.js';
import {FIND_SINGLE_MSG, UPDATE_CHAT_STATE_TIME} from '@m_api/message.js';

export default {
  name: 'SingleMsg',
  components: {MessageItem, MessageSender, VueGallerySlideshow},
  data() {
    return {
      msgPaddingList: [],                     // 待发送消息队列
      activeBtn: 'message',                   // 聊天（消息/文件）默认显示什么
      receiverName: '',                       // 聊天对象名称
      receiverAvatar: '',                     // 聊天对象头像
      singleMsgList: [],                      // 单聊消息队列
      imgList: [
        'http://192.168.2.214:8000/group2/M00/00/0A/wKgC21xRQtCAbaHiAAAb-goZO7U602.png',
        'http://192.168.2.214:8000/group1/M00/00/00/wKgC2FvZb4SAb0YKAC2E5VHFHu4227.png'],                            // 聊天图片列表
      imgIndex: null                          // 展示的图片序号
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore', 'targetId']),
    loginUserId() {
      return this.user.user.id;
    },
    receiverId() {
      return this.messageStore.sessionActiveItem.id;
    },
    newServerMsg() { // 服务器推送的消息
      return this.messageStore.newServerMsg;
    },
    serverAck() { // 服务器推送的 ack回执
      return this.messageStore.serverAck;
    }
  },
  watch: {
    receiverId(val) {
      // debugger;
      this.findSingleMsg();
    },

    // 监听服务器推送的消息
    newServerMsg(val) {
      debugger;
      if (val.code !== 1100 || val.data.senderId !== this.receiverId) return false; // 如果不是单聊消息或接受对象不是当前窗口就不处理
      console.log('监听到服务器推送：', val);
      let item = val.data;
      this._socketUpdateChatState(item); // 收到消息后
      item['miniType'] = val.code;
      this.singleMsgList.push(item); // 把消息发到聊天窗口
      this.$nextTick(() => { // 把聊天窗口滚动到最底部
        this.chatWindowScrollToBottom();
      });
    },

    /**
     * 监听到 ack 后更新消息
     */
    serverAck(val) {
      // console.log('服务器ACK：', val);
      // debugger;
      socket.deliver(val);
    }

  },
  methods: {

    // 聊天选择文件
    selectFile() {
      this.$refs['selectFile'].click();
    },

    // 聊天窗口（消息、文件）切换
    changeMessage(type) {
      if (this.activeBtn !== type) {
        this.activeBtn = type;
      }
    },

    // 发送消息
    handleSendMsg(sendText, fileData) {
      // debugger;
      console.log('要发送的文件：', fileData);
      let pushData = {
        type: 1,
        data: sendText
      };
      let sendData = {
        code: 1100, // 1100:单聊 1101:群聊
        data: {
          content: sendText.trim(),
          receiverId: this.receiverId,
          senderId: this.loginUserId,
          type: 1,
          fileId: null,
          id: 'cnbift' + new Date().getTime() + new Date().getTime(),
          // sendTime: new Date().getTime(), //
          seq: 0
        }
      };

      if (fileData) { // 如果是发文件，设置文件type，和文件的data
        sendData.data.content = fileData.text;
        sendData.data.fileId = fileData.id;
        for (let item of FILE_TYPE) {
          // debugger;
          if (fileData.category.toLowerCase() === item.suffix.toLowerCase()) {
            sendData.data.type = item.type;
            pushData.type = item.type;
            pushData.data = fileData;
            break;
          } else {
            sendData.data.type = 3; // 暂时处理，没有匹配到都当文件处理
          }
        }
      }

      console.log('要发送的内容是：', sendData);
      if (!sendData.data.content) {
        this.$message({
          type: 'warning',
          message: '发送内容不能为空',
          showClose: true
        });
        return;
      }
      // socket.deliver(sendData);
      this._httpSend(sendData, pushData);
      // this.addMsgToWindow(pushData); // 本地处理把消息推到聊天窗口显示
    },

    // 把发送的内容显示到聊天窗口
    addMsgToWindow(pushData, sendTime) {
      debugger;
      let data = {
        avatar: this.user.user.avatar,
        content: '',
        name: this.user.user.trueName,
        sendTime: sendTime,
        type: 1,
        senderId: this.loginUserId
      };
      if (pushData.type === 1) {
        data.content = pushData.data;
      } else {
        data.content = pushData.data.text;
        data.file = pushData.data;
        data.type = pushData.type;
      }

      // console.log('要添加到聊天窗口的数据是：', data);
      this.singleMsgList.push(data);
      this.$nextTick(() => {
        this.chatWindowScrollToBottom();
      });
    },

    // 把聊天窗口滚动到最底部
    chatWindowScrollToBottom() {
      let chatWindow = this.$refs.chatWindow.$el.childNodes[0];
      // console.log('找滚动窗口：', chatWindow);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    },

    /**
     * 查询单聊聊天历史记录
     */
    findSingleMsg() {
      // debugger
      // ajax请求获取单聊消息内容
      let data = {
        page: 1,
        receiverId: this.receiverId,
        senderId: this.loginUserId,
        size: 30
      }
      FIND_SINGLE_MSG(data)
        .then(res => {
          console.log('获取单聊信息then：', res);
          res = res.data;
          if (res.code === 200 && res.data) {
            this.singleMsgList = res.data.data.reverse();
            // 消息拿到后 把窗口内容滚到到底部
            this.$nextTick(() => {
              this.chatWindowScrollToBottom();
            });
            // 请求服务器更新已读消息状态
            let lastItem = this.singleMsgList[this.singleMsgList.length - 1];
            this._httpUpdateChatState(lastItem);
          }
        }).catch(err => {
          console.log('获取单聊信息catch：', err);
        });
    },

    handleShowImgGallery(imgUrl) {
      let index = this.imgList.indexOf(imgUrl);
      this.imgIndex = 0;
      debugger;
    },

    /**
     * 使用http的方式发送消息
     * sendData:
     */
    _httpSend(sendData, pushData) {
      debugger;
      request({
        method: 'post',
        url: 'api/api/save_single_msg',
        data: sendData.data
      }).then(res => {
        console.log('_httpSend res:', res);
        this.addMsgToWindow(pushData, res.data.data.sendTime); // 本地处理把消息推到聊天窗口显示
        debugger;
      });
    },

    /**
     * http请求服务器消除未读消息计数
     */
    _httpUpdateChatState(lastItem) {
      // debugger;
      let data = {
        'endTime': lastItem.sendTime,
        'id': lastItem.id,
        'miniType': 1100,
        'receiverId': lastItem.receiverId,
        'senderId': lastItem.senderId,
        'state': 2
      };
      UPDATE_CHAT_STATE_TIME(data);
    },

    /**
     * socket请求服务器消除未读消息计数
     */
    _socketUpdateChatState(lastItem) {
      debugger;
      let data = {
        code: 1006,
        data: {
          'id': lastItem.id,
          'miniType': 1100,
          'receiverId': lastItem.receiverId,
          'senderId': lastItem.senderId,
          'state': 2
        }
      };
      socket.deliver(data);
    }

  },
  mounted() {
    // console.log('文件类型：', FILE_TYPE);
    this.findSingleMsg(); // ajax请求获取单聊消息内容
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .SingleMsg {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .title {
      @include flex();
      align-items: center;
      position: relative;
      overflow: hidden;

      .img-box {
        width: 50px;
        height: 50px;
        overflow: hidden;
        background-color: $colorTheme;
        border-radius: 50%;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .titleleft {
        margin-left: 20px;
        float: left;

        h3 {
          font-size: 14px;
          font-weight: bold;

          span {
            color: $colorTextBlack8;
          }
        }

        p {
          font-size: 14px;
          font-weight: 400;
          margin-top: 8px;
          color: $colorTextBlack8;
          opacity: 1;
        }
      }

    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 1;
      padding: 15px 40px 0 40px;
      box-sizing: border-box;
      margin-bottom: 15px;
    }

    .middle {
      flex: 1;
      position: relative;
      margin-left: 40px;
      overflow: hidden;

      /deep/ .el-scrollbar {
        .el-scrollbar__thumb {
          background: $colorTheme;
        }

        .el-scrollbar__wrap {
          padding-right: 40px;
          overflow-x: hidden;
        }

        .el-scrollbar__bar.is-horizontal {
          display: none
        }
      }
    }

    .bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 18px 40px 20px;
      background: #ffffff;
      border-top: 1px solid $colorBorderLayoutLight;
    }

  }

  .btn-group {
    display: inline-block;
    $btnHeight: 24px;
    border-radius: $btnHeight / 2;
    overflow: hidden;

    .btn {
      display: inline-block;
      line-height: $btnHeight;
      padding: 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: $colorThemePrimary;
      cursor: pointer;
    }

    .btn.active {
      background: $colorTheme;
      color: #ffffff;
    }
  }
</style>
