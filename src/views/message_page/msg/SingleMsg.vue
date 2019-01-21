<template>
  <div class="SingleMsg">
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
    <div class="middle">
      <el-scrollbar style="height: 100%" ref="chatWindow">
        <message-item v-for="item in singleMsgList" :key="item.id" :data="item"></message-item>
      </el-scrollbar>
    </div>
    <div class="bottom">
      <div class="chat-tool">
        <div id="face-icon" class="tool-icon face-icon" @click="showFacePop = !showFacePop"></div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div class="tool-icon file-icon">
            <form action="">
              <input type="file" name="file" ref="selectFile">
            </form>
          </div>
        </el-upload>

        <div class="tool-icon link-icon"></div>
        <!--<div class="send-btn" @click="handleSendMsg">发 送</div>-->
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
                  @keyup.enter="handleSendMsg()"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import MessageItem from '@c/message/message_item/MessageItem.vue'
import FILE_TYPE from '@a/message/data/file_type.js' // 可以上传的文件列表
import emotion_sprites from '@a/message/data/emotion_sprites.json'
import {
  UPLOAD_FILE,          // 上传文件
  FIND_SINGLE_MSG       // 查询单聊信息
} from '~api/message.js';

export default {
  name: 'SingleMsg',
  components: {MessageItem},
  data() {
    return {
      EMOTION_SPRITES: emotion_sprites.data,  // 聊天表情
      fileData: null,                         // 上传文件成功后返回的文件信息
      fd: null,                               // 上传的文件信息
      msgPaddingList: [],                     // 待发送消息队列
      activeBtn: 'message',                   // 聊天（消息/文件）默认显示什么
      receiverName: '',                       // 聊天对象名称
      receiverAvatar: '',                     // 聊天对象头像
      singleMsgList: [],                      // 单聊消息队列
      sendText: '',                           // 发要发送的文本类容
      showFacePop: false                      // 是否显示聊天表情弹窗
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore', 'targetId']),
    loginUserId() {
      return this.user.user.id;
    },
    receiverId() {
      return this.messageStore.sessionActiveItem.id
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
      // debugger;
      this.findSingleMsg();
    },

    //监听服务器推送的消息
    newServerMsg(val) {
      debugger;
      if (val.code !== 1100 || val.data.senderId !== this.receiverId) return false; // 如果不是单聊消息或接受对象不是当前窗口就不处理
      console.log('监听到服务器推送：', val);
      let item = val.data;
      item['miniType'] = val.code;
      this.singleMsgList.push(item);
      this.$nextTick(() => { // 把聊天窗口滚动到最底部
        this.chatWindowScrollToBottom();
      });
      // 当目标id 和 发送者id相同时再把消息加入队列
      if (this.messageStore.targetId === item.senderId) {

      }
    },

    /**
     * 监听到 ack 后更新消息
     */
    serverAck(val) {
      debugger;
      console.log('服务器ACK：', val);
      socket.send(JSON.stringify(val));
    }

  },
  methods: {

    // 聊天选择文件
    selectFile() {
      this.$refs['selectFile'].click()
    },

    // 聊天窗口（消息、文件）切换
    changeMessage(type) {
      if (this.activeBtn !== type) {
        this.activeBtn = type
      }
    },

    // 发送消息
    handleSendMsg(fileData) {
      debugger;
      console.log('要发送的文件：', fileData);
      let pushData = {
        type: 1,
        data: this.sendText
      };
      let sendData = {
        code: 1100, // 1100:单聊 1101:群聊
        data: {
          content: this.sendText.trim(),
          receiverId: this.receiverId,
          senderId: this.loginUserId,
          type: 1,
          fileId: null,
          id: 'cnbift' + new Date().getTime() + new Date().getTime(),
          sendTime: new Date().getTime(),
          seq: 0,
        },
      };

      if (fileData) { // 如果是发文件，设置文件type，和文件的data
        sendData.data.content = fileData.text;
        sendData.data.fileId = fileData.id;
        for (let item of FILE_TYPE) {
          debugger;
          console.log(item);
          if (fileData.category.toLowerCase() === item.suffix.toLowerCase()) {
            sendData.data.type = item.type;
            pushData.type = item.type;
            pushData.data = fileData;
            break
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
      this.sendText = ''; // 发完消息后清空输入框
      socket.deliver(sendData);
      this.addMsgToWindow(pushData); // 本地处理把消息推到聊天窗口显示
    },

    // 把发送的内容显示到聊天窗口
    addMsgToWindow(pushData) {
      let data = {
        avatar: this.user.user.avatar,
        content: '',
        name: this.user.user.trueName,
        sendTime: new Date().getTime(),
        type: 1,
        senderId: this.loginUserId
      };
      if (pushData.type === 1) {
        data.content = pushData.data;
      } else {
        data.content = pushData.data.text;
        data.file = pushData.data;
        data.type = pushData.type
      }

      console.log('要添加到聊天窗口的数据是：', data);
      debugger;
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

    // 点击表情，把表情添加到输入框, 同时 focus 输入框
    addFaceToInput(face) {
      this.sendText += face;
      this.$refs.textarea.focus();
    },

    findSingleMsg() {
      debugger;
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
    },

    // 当点击的不是表情，则隐藏表情弹框
    hideFaceIcon(e) {
      // debugger;
      let elem = e.target || e.srcElement;
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'face-icon') {
          return
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode
      }
      this.showFacePop = false
    },

    // 处理文件上传
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('要上传的文件信息：', file);
      let fd = new FormData();
      fd.append('file', file);
      fd.append('userId', this.loginUserId);
      fd.append('size', file.size);
      this.fd = fd;
      this.submitUpload(fd);
      return true
    },
    submitUpload(fd) {
      debugger;
      let _this = this;
      if (fd) {
        UPLOAD_FILE(fd).then(res => {
          console.log('上传群文件res', res);
          debugger;
          if (res.data.code === 200) {
            _this.fileData = res.data.data;
            this.handleSendMsg(res.data.data)
          }
        });
      }
    },

  },
  mounted() {
    // console.log('文件类型：', FILE_TYPE);
    // ajax请求获取单聊消息内容
    this.findSingleMsg();

    // 当点击的不是表情，则隐藏表情弹框
    document.addEventListener('click', this.hideFaceIcon)

  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideFaceIcon)
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";
  @import "@s/message/icons.scss";

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

      .chat-tool {
        position: relative;
        margin-bottom: 18px;

        .avatar-uploader {
          display: inline-block;
        }

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

        .send-btn {
          float: right;
          @include myBtn($height: 24px, $borderRadius: 4px, $bgColor: $colorBgBtnGray, $bgColorHover: $colorTheme)
        }
      }

      .input-wrap {
        width: 100%;

        .chat-textarea {
          box-sizing: border-box;
          min-height: 100px;
          padding: 10px 20px;
          color: $colorTextBlack6;
          background: $colorThemePrimary;
          border-radius: 12px;
          width: 100%;
          border: none;
          outline: 0;
          resize: none;
          text-align: left;
          font-family: $fontFamilyMain;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          &::placeholder{
            color: $colorTextBlack2;
          }
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

