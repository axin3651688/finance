<template>
  <div class="Chat">
    <!--聊天头部-->
    <div class="chat-top">top</div>

    <multipane layout="horizontal">
      <!-- 中间聊天显示区-->
      <div class="chat-middle">
        <el-scrollbar style="height: 100%" ref="chatWindow">
          <template v-if="singleMsgList.length">
            <message-item
              v-for="item in singleMsgList"
              :key="item.id"
              :data="item"
            />
          </template>
        </el-scrollbar>
      </div>

      <!--聊天编辑窗口-->
      <multipane-resizer></multipane-resizer>
      <div class="chat-bottom">
        <message-sender @sendMsg="handleSendMsg"></message-sender>
      </div>
    </multipane>
  </div>
</template>

<script>
import {Multipane, MultipaneResizer} from '@mc/vue-multipane';
import {mapGetters} from 'vuex';
import VueGallerySlideshow from 'vue-gallery-slideshow';
import MessageItem from '@mc/message_item/MessageItem.vue';
import MessageSender from '@mc/message_sender/MessageSender.vue';
import FILE_TYPE from '@ma/data/fileType.js'; // 可以上传的文件列表
import request from 'utils/http.js';
import {FIND_SINGLE_MSG, UPDATE_CHAT_STATE_TIME} from '@m_api/message.js';

export default {
  name: 'Chat',
  components: {
    Multipane,
    MultipaneResizer,
    MessageItem,
    MessageSender,
    VueGallerySlideshow
  },
  data() {
    return {
      singleMsgList: []
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
  methods: {
    /**
     * 查询单聊聊天历史记录
     */
    findSingleMsg() {
      // debugger
      // ajax请求获取单聊消息内容
      FIND_SINGLE_MSG(538, 539)
        .then(res => {
          console.log('获取单聊信息then：', res);
          res = res.data;
          if (res.code === 200 && res.data) {
            this.singleMsgList = res.data.data.reverse();
            // 消息拿到后 把窗口内容滚到到底部
            this.$nextTick(() => {
              // this.chatWindowScrollToBottom();
            });
            // 请求服务器更新已读消息状态
            // let lastItem = this.singleMsgList[this.singleMsgList.length - 1];
            // this._httpUpdateChatState(lastItem);
          }
        })
        .catch(err => {
          console.log('获取单聊信息catch：', err);
        });
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
    }
  },
  mounted() {
    this.findSingleMsg(); // ajax请求获取单聊消息内容
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";
  .Chat {
    position: relative;
    height: 100%;

    .multipane {
      height: 100%;
    }
  }

  .chat-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .chat-middle {
    height: 100%;
    min-height: 50%;
    /deep/ .el-scrollbar__wrap{
      overflow-x: hidden;
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .chat-bottom {
    flex: 1;
    min-height: 150px;
    max-height: 50%;
    padding: 20px 30px;
    border-top: 1px solid $colorBorderLayoutDark;
    /deep/ .MessageSender{
      height: 100%;

    }
  }
</style>
