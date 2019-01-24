<template>
  <div class="MessageSender">
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
      <!--<div class="send-btn" @click="sendMsg">发 送</div>-->
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
                  @keyup.enter.prevent="sendMsg()"
        ></textarea>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import emotion_sprites from '@a/message/data/emotion_sprites.json'
import {UPLOAD_FILE} from '~api/message.js'

export default {
  name: "MessageSender",
  data() {
    return {
      sendText: '',
      showFacePop: false, // 是否弹出聊天表情
      EMOTION_SPRITES: emotion_sprites.data,  // 聊天表情
    }
  },
  computed: {
    ...mapGetters(['user']),
    loginUserId() {
      return this.user.user.id
    }
  },
  methods: {

    // 处理文件上传
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('要上传的文件信息：', file)
      debugger
      let fd = new FormData()
      fd.append('file', file)
      fd.append('userId', this.loginUserId)
      fd.append('size', file.size)
      console.log('要上传的文件信息2：', fd)
      this.submitUpload(fd)
      return true
    },
    submitUpload(fd) {
      debugger
      if (fd) {
        UPLOAD_FILE(fd).then(res => {
          console.log('上传群文件res', res)
          debugger
          if (res.data.code === 200 && res.data.data) {
            this.sendMsg('', res.data.data)
          }
        })
      }
    },

    // 点击表情，把表情添加到输入框, 同时 focus 输入框, 隐藏表情弹窗
    addFaceToInput(face) {
      this.sendText += face
      this.$refs.textarea.focus()
      this.showFacePop = false
    },

    // 向父组件触发发送消息
    sendMsg(fileData) {
      this.$emit('sendMsg', this.sendText.trim(), fileData)
      this.sendText = ''
    },

    // 当点击的不是表情，则隐藏表情弹框
    hideFaceIcon(e) {
      // debugger;
      let elem = e.target || e.srcElement
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'face-icon') {
          return
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode
      }
      this.showFacePop = false
    }
  },
  mounted() {
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

      &::placeholder {
        color: $colorTextBlack2;
      }
    }
  }
</style>
