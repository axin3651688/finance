<template>
  <div class="SingleMsg vue-module">
    <div class="top">
      <div class="title">
        <div class="img"></div>
        <div class="titleleft">
          <h3>张某<span>（客服总监）</span></h3>
          <p>安徽经邦软件有限公司</p>
        </div>
        <div class="titleright">
          <p class="message">消息</p>
          <p class="file">文件</p>
        </div>
      </div>
    </div>
    <div class="middle">
      <el-scrollbar style="height: 100%">
        <div class="message-box" v-for="item in singleMsgList" :key="item.id">
          <div class="message-top">
            <div class="avatar-box">
              <img :src="item.avatar" alt="">
            </div>
            <h3 class="user-name">{{item.name}}</h3>
            <div class="send-time">
              <!--<span class="time">2018-10-15&nbsp;&nbsp;15:00</span>-->
              <span class="time" v-text="formatTime(item.sendTime)"></span>
              <div class="status"></div>
            </div>
          </div>
          <div class="message-content">
            <span v-html="parseEmotions(item.content)"></span>
          </div>
        </div>
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
      <textarea class="chat-textarea"
                placeholder="请输入文字，按enter建发送信息"
                v-model="sendText"
                ref="textarea"
                @keyup.enter="handleSendMessage"
      ></textarea>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {
  FIND_SINGLE_MSG,
  sendMsg
} from '~api/message.js';
import {PARSE_EMOTIONS} from 'utils/message';
import emotionSprites from '@a/green/emotion_sprites.json';

export default {
  name: 'SingleMsg',
  components: {},
  data() {
    return {
      EMOTION_SPRITES: emotionSprites.data, // 聊天表情数据
      singleMsgList: [], // 单聊消息队列
      sendText: '', // 发要发送的文本类容
      showFacePop: false // 是否显示聊天表情弹窗
    }
  },
  computed: {
    ...mapGetters(['user']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  methods: {
    // 聊天选择文件
    selectFile() {
      this.$refs['selectFile'].click()
    },

    // 发送聊天内容,发送完一条消息后要清空输入框
    handleSendMessage() {
      console.log('要发送的内容是：', this.sendText);
      if (this.sendText.trim()) { // 默认会带一个回车符，所以要先去掉
        debugger;
        let sendData = {
          code: 1100, // 1100:单聊 1101:群聊
          data: {
            content: this.sendText,
            receiverId: 1, //
            senderId: this.loginUserId, // 225:卢诚
            type: 1
          },
          device: '868938033321615'
        };
        this.sendText = '';
        sendMsg(sendData)
      } else {
        this.sendText = '';
        this.$message({
          type: 'warning',
          message: '发送内容不能为空',
          showClose: true
        });
      }

    },

    // 获取单聊信息返回res后的处理
    findSingleMsgThen(res) {
      console.log('获取单聊信息then：', res);
      res = res.data;
      if (res.code === 200 && res.data) {
        this.singleMsgList = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          showClose: true
        })
      }
    },

    // 解析聊天符号，替换成表情图
    parseEmotions(content) {
      return PARSE_EMOTIONS(content)
    },

    // 点击表情，把表情添加到输入框, 同时 focus 输入框
    addFaceToInput(face) {
      this.sendText += face;
      this.$refs.textarea.focus();
    },

    // 格式化时间戳
    formatTime(time) {
      let date = new Date(time);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDay();
      let H = date.getHours();
      let m = date.getMinutes();
      let newTime = `${Y}-${M}-${D} ${H}:${m}`;
      // console.log(newTime)
      return newTime
    }
  },
  mounted() {
    // console.log('json测试：', this.EMOTION_SPRITES);
    // ajax请求获取单聊消息内容
    FIND_SINGLE_MSG(this.loginUserId, 1).then(
      this.findSingleMsgThen
    ).catch(err => {
      console.log('获取单聊信息catch：', err)
    });

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
<!--<style lang="scss">-->
  <!--/*这里不使用 scoped 是v-html生成表情能够应用到样式*/-->
  <!--@import "@s/green/emotion_sprites.scss";-->
<!--</style>-->

<style lang="scss" scoped>
  .SingleMsg.vue-module {
    @import "@s/green/variables.scss";
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    height: 100%;

    .title {
      position: relative;
      overflow: hidden;

      .img {
        width: 80px;
        height: 80px;
        background-color: $colorTheme;
        border-radius: 50%;
        // margin-top:60px;
        float: left;
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

      .titleright {
        height: 24px;
        width: 160px;
        display: flex;
        position: absolute;
        right: 0;
        top: 30px;
        padding: 0;

        .message {
          width: 80px;
          height: 24px;
          background: $colorTheme;
          opacity: 1;
          border-radius: 66px 0px 0px 66px;
          font-size: 14px;
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 24px;
          color: $colorText1;
          text-align: center;
        }

        .file {
          height: 24px;
          width: 80px;
          background: rgba(0, 0, 0, 0.1);
          opacity: 1;
          border-radius: 0px 66px 66px 0px;
          font-size: 14px;
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.20);
          text-align: center;
        }
      }
    }

    .top {
      background: rgba(235, 236, 236, 1);
      opacity: 1;
      padding: 60px 40px 0 40px;
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
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 18px 40px 20px;
      background: #ffffff;
      z-index: 9;
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

      .chat-textarea {
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
</style>

