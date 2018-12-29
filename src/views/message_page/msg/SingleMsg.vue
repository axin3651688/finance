<template>
  <div class="SingleMsg">
    <div class="top">
      <div class="title">
        <div class="img-box">
          <img :src="messageStore.receiverData.user.avatar" v-avatar="messageStore.receiverData.user.trueName">
        </div>
        <div class="titleleft">
          <h3>
            {{messageStore.receiverData.user.trueName}}
            <span v-if="messageStore.receiverData.user.username">（{{messageStore.receiverData.user.username}}）</span>
          </h3>
          <p>安徽经邦软件有限公司</p>
        </div>
      </div>
      <div class="btn-group">
        <div :class="['btn', {active: activeBtn === 'checked'}]" @click="activeBtn = 'checked'">
          消息
        </div>
        <div :class="['btn', {active: activeBtn === 'unChecked'}]" @click="activeBtn = 'unChecked'">
          文件
        </div>
      </div>
    </div>
    <div class="middle">
      <el-scrollbar style="height: 100%" ref="chatWindow">
        <message-item v-for="item in singleMsgList" :key="item.id" :data="item"></message-item>
      </el-scrollbar>
    </div>
    <div class="bottom">
      <div class="chat-tool">
        <div id="face-icon" class="tool-icon face-icon" @click="showFacePop = !showFacePop"></div>
        <div class="tool-icon file-icon" @click="selectFile">
          <form action="">
            <input type="file" name="file" ref="selectFile">
          </form>
        </div>
        <div class="tool-icon link-icon"></div>
        <transition name="el-zoom-in-bottom">
          <div v-show="showFacePop" class="face-pop">
            <ul>
              <li v-for="face in EMOTION_SPRITES" :key="face.value">
                <div :class="['face-img', face.className]"
                     @click="addFaceToInput(face.value)"
                     :title="face.value"
                ></div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="input-wrap">
        <textarea class="chat-textarea"
                  placeholder="请输入文字，按enter建发送信息"
                  v-model="sendText"
                  ref="textarea"
                  @keyup.enter="handleSendMessage"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import MessageItem from './MessageItem'
import {
  FIND_SINGLE_MSG,
  sendMsg
} from '~api/message.js';
import emotionSprites from '@a/green/emotion_sprites.json';

export default {
  name: 'SingleMsg',
  components: {MessageItem},
  data() {
    return {
      activeBtn: 'checked',
      receiverName: '', // 聊天对象名称
      receiverAvatar: '', // 聊天对象头像
      EMOTION_SPRITES: emotionSprites.data, // 聊天表情数据
      singleMsgList: [], // 单聊消息队列
      sendText: '', // 发要发送的文本类容
      showFacePop: false // 是否显示聊天表情弹窗
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore', 'targetId']),
    loginUserId() {
      return this.user.user.id;
    },
    receiverId() {
      return this.messageStore.receiverData.user.id
    },
    newServerMsg() { // 服务器推送的消息
      return this.messageStore.newServerMsg
    },
    serverAck() { // 服务器推送的 ack回执
      return this.messageStore.serverAck
    }
  },
  watch: {
    receiverId(val) {
      this.findSingleMsg();
    },

    //监听服务器推送的消息
    newServerMsg(val) {
      console.log('监听到服务器推送：', val);
      let item = val.data;
      item['miniType'] = val.code;
      // 当目标id 和 发送者id相同时再把消息加入队列
      if (this.messageStore.targetId === item.senderId) {
        debugger;
        this.singleMsgList.push(item);
        this.$nextTick(() => { // 把聊天窗口滚动到最底部
          this.chatWindowScrollToBottom();
        });
      }
    },

    /**
     * 监听ack消息回执 返回示例：
     * {
     *   code: 2000,
     *   data: {
     *     id: '1546065114464cnbi',   // <String>
     *     miniType: 1100,            // <Number>
     *     sendTime: 1546065114464,   // <Number>
     *     state: 0,                  // <Number>
     *   },
     *   msg: 'ACK即时消息确认报文'
     * }
     */
    serverAck(val) {
      this.updateAck(val)
    }

  },
  methods: {

    /**
     * 跟新消息 ack
     * 1.收到ack后把收到的内容原封返回个服务器
     * 2.遍历本地消息队列，更新消息的状态（已读，未读···）
     */
    updateAck() {

    },

    // 聊天选择文件
    selectFile() {
      this.$refs['selectFile'].click()
    },

    // 发送聊天内容,发送完一条消息后要清空输入框
    handleSendMessage() {

      if (this.sendText.trim()) { // 默认会带一个回车符，所以要先去掉
        let sendData = {
          code: 1100, // 1100:单聊 1101:群聊
          data: {
            content: this.sendText.trim(),
            receiverId: this.receiverId, //
            senderId: this.loginUserId, // 225:卢诚
            type: 1,
            fileId: 0,
            id: new Date().getTime() + 'cnbi',
            sendTime: 0,
            seq: 0,
          },
          // todo: 获取设备号?
          // device: '868938033321615'
        };
        console.log('要发送的内容是：', sendData);
        this.addMsgToWindow(this.sendText); // 本地处理把消息推到聊天窗口显示
        this.sendText = ''; // 发送完后清空输入框

        console.log('socket-->', socket);
        socket.send(JSON.stringify(sendData));

        // sendMsg(sendData).then(res => {
        //   console.log('发送单聊消息返回数据res', res);
        // }).catch(err => {
        //   console.log('发送单聊消息返回数据err', err);
        //   debugger;
        // });


      } else {
        this.sendText = '';
        this.$message({
          type: 'warning',
          message: '发送内容不能为空',
          showClose: true
        });
      }

    },

    // 把发送的内容显示到聊天窗口
    addMsgToWindow(sendText) {
      let data = {
        avatar: this.user.user.avatar,
        content: sendText,
        name: this.user.user.trueName,
        sendTime: new Date().getTime()
      };
      this.singleMsgList.push(data);
      this.$nextTick(() => {
        this.chatWindowScrollToBottom();
      });
    },

    // 把聊天窗口滚动到最底部
    chatWindowScrollToBottom() {
      // debugger;
      let chatWindow = this.$refs.chatWindow.$el.childNodes[0];
      console.log('找滚动窗口：', chatWindow);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    },

    // 点击表情，把表情添加到输入框, 同时 focus 输入框
    addFaceToInput(face) {
      this.sendText += face;
      this.$refs.textarea.focus();
    },

    findSingleMsg(){
      // ajax请求获取单聊消息内容
      FIND_SINGLE_MSG(this.loginUserId, this.receiverId)
        .then(res => {
          console.log('获取单聊信息then：', res);
          res = res.data;
          if (res.code === 200 && res.data) {
            this.singleMsgList = res.data.data.reverse();
            // 消息拿到后 把窗口内容滚到到底部
            this.$nextTick(() => {
              this.chatWindowScrollToBottom()
            });
          }
        }).catch(err => {
        console.log('获取单聊信息catch：', err)
      });
    }

  },
  mounted() {
    // ajax请求获取单聊消息内容
    this.findSingleMsg();

    // 当点击的不是表情，则隐藏表情弹框
    document.addEventListener('click', e => {
      let elem = e.target || e.srcElement;
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'face-icon') {
          return
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode
      }
      this.showFacePop = false
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "@ms/variables.scss";

  .SingleMsg {
    @import "../styles/variables.scss";
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    height: 100%;

    .title {
      position: relative;
      overflow: hidden;

      .img-box {
        width: 80px;
        height: 80px;
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
        float: left;
        margin: 20px 0 0 30px;

        h3 {
          font-size: 18px;
          font-weight: 400;

          span {
            color: $colorText3;
          }
        }

        p {
          font-size: 16px;
          font-weight: 400;
          margin-top: 8px;
          color: $colorText2;
          opacity: 1;
        }
      }

    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(235, 236, 236, 1);
      opacity: 1;
      padding: 30px 40px 0 40px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }

    .middle {
      flex: 1;
      /*padding-right: 24px;*/
      padding-left: 40px;
      overflow: hidden;

      /deep/ .el-scrollbar__thumb {
        background: $colorTheme;
      }

      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      /*background: #cccccc;*/
      .message-box {
        padding: 10px 20px;
        margin: 10px 40px 20px 0;
        background: #ffffff;
        box-shadow: 0 2px 20px rgba(8, 69, 81, 0.1);
        border-radius: 12px;

        .message-top {
          overflow: hidden;
          margin-bottom: 20px;

          .avatar-box {
            width: 40px;
            height: 40px;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;
            float: left;
            background: #cccccc;

            img {
              width: 100%;
            }
          }

          .user-name {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: $colorText1;
          }

          .send-time {
            position: relative;
            margin-top: 3px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: $colorText4;
            font-family: $fontFamilyMain;

            .status {
              position: absolute;
              left: 215px;
              top: 0;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #EF3C3C;
            }
          }
        }

        .message-content {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.80);

          /deep/ .face-img {
            display: inline-block;
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .bottom {
      height: 260px;
      box-sizing: border-box;
      width: 100%;
      padding: 18px 40px 20px;
      background: #ffffff;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);

      .chat-tool {
        position: relative;
        margin-bottom: 18px;

        .tool-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          /*border-radius: 50%;*/
          cursor: pointer;
          background: #ccc;
          margin-right: 30px;
          background-size: 24px 24px;

          form {
            width: 0;
            height: 0;
            display: none;
          }
        }

        .face-icon {
          background: url($iconEmojiUrl) no-repeat;
        }

        .file-icon {
          background: url($iconFileUrl) no-repeat;
        }

        .link-icon {
          background: url($iconLinkUrl) no-repeat;
        }
      }

      .input-wrap {
        width: 100%;
        .chat-textarea {
          box-sizing: border-box;
          min-height: 100px;
          padding: 10px 20px;
          color: rgba(0, 0, 0, 0.40);
          background: rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          width: 100%;
          border: none;
          outline: 0;
          resize: none;
          text-align: left;
          font-family: $fontFamilyMain;
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
        }
      }

    }

    .comment {
      height: 200px;
      width: 100%;
      background-color: pink;
      position: relative;
      bottom: 0;
      opacity: 1;
      padding: 40px 30px 0 40px;
      box-sizing: border-box;
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
      padding: 0 36px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: rgba(0, 0, 0, .1);
      cursor: pointer;
    }

    .btn.active {
      background: $colorTheme;
      color: #ffffff;
    }
  }
</style>

