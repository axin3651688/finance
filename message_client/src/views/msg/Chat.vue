<template>
  <div class="Chat">
    <multipane layout="horizontal">
      <!-- 中间聊天显示区-->
      <div class="chat-middle">
        <el-scrollbar style="height: 100%" ref="chatWindow">
          <template v-if="msgList.length">
            <message-item
              v-for="item in msgList"
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

    <!--聊天头部-->
    <div class="chat-top">
      <switch-btn-group
        :value1="'消息'"
        :value2="'文件'"
        :defaultValue="'消息'"
        @switchCase="handleSwitchCase"
      ></switch-btn-group>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {Multipane, MultipaneResizer} from '@mc/vue-multipane';
import MessageItem from '@mc/message_item/MessageItem.vue';
import MessageSender from '@mc/message_sender/MessageSender.vue';
import SwitchBtnGroup from '@mc/switch_btn_group/SwitchBtnGroup.vue';
import FILE_TYPE from '@ma/data/fileType.js'; // 可以上传的文件列表
import {
  FIND_SINGLE_MSG,
  FIND_GROUP_MSG,
  UPDATE_CHAT_STATE_TIME,
  SAVE_SINGLE_MSG,
  SAVE_GROUP_MSG
} from '@m_api/message.js';

export default {
  name: 'Chat',
  components: {
    Multipane,
    MultipaneResizer,
    MessageItem,
    MessageSender,
    SwitchBtnGroup
  },
  data() {
    return {
      msgList: [], // 历史聊天消息列表
      images: ['http://192.168.2.214:8000/group2/M00/00/0B/wKgC21xigPCATQxEAAUAdHvddI4898.png'],
      index: null // 图片展示的序号
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore', 'targetId']),
    loginUserId() { // 登陆用户的id
      return this.user.user.id;
    },
    receiverId() { // 接受对象的id，可以是个人id，也可以是群id
      return this.messageStore.sessionActiveItem.id;
    },
    miniType() {
      return this.messageStore.sessionActiveItem.miniType;
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
      this.requestMsgHistory();
    },

    /**
     * 监听服务器推送的消息
     */
    newServerMsg(val) {
      // debugger;
      if (val.code !== 1100 && val.code !== 1101) { // 如果不是聊天消息不处理
        return false;
      }

      console.log('监听到聊天消息：', val);
      let item = val.data;
      this._socketUpdateChatState(item); // 收到消息后
      item['miniType'] = val.code;
      this.msgList.push(item); // 把消息发到聊天窗口
      this.$nextTick(() => { // 把聊天窗口滚动到最底部
        this._chatWindowScrollToBottom();
      });
    },

    /**
     * 监听到 ack 后更新消息
     */
    serverAck(val) {
      // debugger;
      socket.deliver(val);
    }
  },
  methods: {
    /**
     * 查询聊天历史记录
     */
    requestMsgHistory() {
      debugger;
      let postData = {
        page: 1,
        size: 30
      };
      switch (this.miniType) {
        case 1100: // 单聊
          postData['receiverId'] = this.receiverId;
          postData['senderId'] = this.loginUserId;
          FIND_SINGLE_MSG(postData)
            .then(res => {
              this._requestMsgHistoryThen(res);
            })
            .catch(err => {
              console.error(err);
            });
          break;
        case 1101: // 群聊
          postData['groupId'] = this.receiverId;
          postData['userId'] = this.loginUserId;
          FIND_GROUP_MSG(postData)
            .then(res => {
              this._requestMsgHistoryThen(res);
            })
            .catch(err => {
              console.error(err);
            });
          break;
      }
    },

    /**
     * 请求历史聊天数据返回后对res的处理
     * @param res 请求返回的res
     * @private
     */
    _requestMsgHistoryThen(res) {
      debugger;
      if (res.data.code === 200 && res.data.data.data) {
        console.log('聊天消息：', res.data.data.data);
        this.msgList = res.data.data.data.reverse();
        // 消息拿到后 把窗口内容滚到到底部
        this.$nextTick(() => {
          this._chatWindowScrollToBottom();
        });
        // 请求服务器更新已读消息状态
        let lastItem = this.msgList[this.msgList.length - 1];
        if (lastItem) this._httpUpdateChatState(lastItem);
      }
    },

    /**
     * 发送消息
     */
    handleSendMsg(sendText, fileData) {
      debugger;
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
          id: 'cnbift' + new Date().getTime() + new Date().getTime()
        }
      };

      if (fileData) { // 如果是发文件，设置文件type，和文件的data
        sendData.data.content = fileData.text;
        sendData.data.fileId = fileData.id;
        sendData.data.type = 3; // 暂时处理，没有匹配到都当文件处理
        pushData.type = 3; // 暂时处理，没有匹配到都当文件处理
        for (let item of FILE_TYPE) {
          // debugger;
          if (fileData.category.toLowerCase() === item.suffix.toLowerCase()) {
            sendData.data.type = item.type;
            pushData.type = item.type;
            pushData.data = fileData;
            break;
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
        return false;
      }
      // socket.deliver(sendData); // socket 方式发送消息
      this._httpSend(sendData, pushData); // http 方式发送消息
    },

    /**
     * 使用http的方式发送消息
     * sendData:
     */
    _httpSend(sendData, pushData) {
      debugger;
      switch (this.miniType) {
        case 1100: // 单聊
          SAVE_SINGLE_MSG(sendData.data)
            .then(res => {
              this._addMsgToWindow(res, pushData); // 本地处理把消息推到聊天窗口显示
            })
            .catch(err => {
              console.error(err);
            });
          break;
        case 1101: // 群聊
          SAVE_GROUP_MSG(sendData.data)
            .then(res => {
              this._addMsgToWindow(res, pushData); // 本地处理把消息推到聊天窗口显示
            })
            .catch(err => {
              console.error(err);
            });
          break;
      }
    },

    /**
     * 把发送的内容显示到聊天窗口
     * res中有服务器收到消息的时间，sendTime使用这个时间，不要使用客户端系统时间
     * @param pushData {Object}: 要添加到聊天窗口的数据对象
     * @param res: http方式发送消息返回的res
     */
    _addMsgToWindow(res, pushData) {
      debugger;
      if (res.data.code !== 200 || !res.data.data) return false;
      let data = {
        avatar: this.user.user.avatar,
        content: '',
        name: this.user.user.trueName,
        sendTime: res.data.data.sendTime,
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

      this.msgList.push(data);
      this.$nextTick(() => {
        this._chatWindowScrollToBottom();
      });
    },

    /**
     * 把聊天窗口滚动到最底部
     * @private
     */
    _chatWindowScrollToBottom() {
      debugger;
      let chatWindow = this.$refs.chatWindow.$el.childNodes[0];
      if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
    },

    /**
     * http请求服务器消除未读消息计数,发送左后一条消息的时间，会把所有的消息设为已读
     */
    _httpUpdateChatState(lastItem) {
      debugger;
      let data = {
        'endTime': lastItem.sendTime,
        'id': lastItem.id,
        'miniType': this.miniType,
        'receiverId': lastItem.receiverId,
        'senderId': lastItem.senderId,
        'state': 2
      };
      UPDATE_CHAT_STATE_TIME(data);
    },

    /**
     * socket请求服务器消除未读消息计数，一次处理一条消息
     */
    _socketUpdateChatState(lastItem) {
      debugger;
      let data = {
        code: 1006,
        data: {
          'id': lastItem.id,
          'miniType': this.miniType,
          'receiverId': lastItem.receiverId,
          'senderId': lastItem.senderId,
          'state': 2
        }
      };
      socket.deliver(data);
    },

    /**
     * 聊天消息和文件切换
     * @param val
     */
    handleSwitchCase(val) {
      // alert('handleSwitchCase', val);
    }

  },
  mounted() {
    this.requestMsgHistory(); // 请求获取聊天消息内容
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
    top: 10px;
    right: 10px;
    z-index: 10;
  }

  .chat-middle {
    height: 100%;
    min-height: 50%;

    /deep/ .el-scrollbar__wrap {
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

    /deep/ .MessageSender {
      height: 100%;

    }
  }
</style>
