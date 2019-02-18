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
        <face-icon v-if="showFacePop" :showFacePop.sync="showFacePop"
                   @addFaceToInput="handleAddFaceToInput"></face-icon>
      </transition>
    </div>
    <div class="input-wrap">
      <div class="input-wrap__inner">
          <textarea class="chat-textarea"
                    placeholder="请输入文字，按enter建发送信息"
                    v-model="sendText"
                    ref="textarea"
                    @keyup.enter.prevent="sendMsg(sendText)"
          ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {FILE_UPLOAD} from '@m_api/message.js';
import FILE_TYPE from '@ma/data/fileType.js'; // 可以上传的文件列表

export default {
  name: 'MessageSender',
  components: {
    FaceIcon: () => import('./cpn/FaceIcon.vue')
  },
  data() {
    return {
      sendText: '',
      showFacePop: false // 是否弹出聊天表情
    };
  },
  computed: {
    ...mapGetters(['user']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  methods: {
    // 处理文件上传
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // debugger
      console.log('要上传的文件信息：', file);

      // 判断文件类型是否可以上传，不能上传则跳出程序
      if (!this._isAllowUpload(file.name)) {
        this.$alert('不支持此类文件传输！', '上传提示：', {
          confirmButtonText: '确定'
        });
        return false;
      }

      let fd = new FormData();
      fd.append('file', file);
      fd.append('userId', this.loginUserId);
      fd.append('size', file.size);
      this.submitUpload(fd);
      return true;
    },
    submitUpload(fd) {
      if (fd) {
        FILE_UPLOAD(fd).then(res => {
          console.log('上传群文件res', res);
          // debugger
          if (res.data.code === 200 && res.data.data) {
            this.sendMsg('', res.data.data);
          }
        });
      }
    },

    // 点击表情，把表情添加到输入框, 同时 focus 输入框, 隐藏表情弹窗
    handleAddFaceToInput(face) {
      // debugger
      this.sendText += face;
      this.showFacePop = false;
      this.$refs.textarea.focus();
    },

    // 向父组件触发发送消息
    sendMsg(sendText, fileData) {
      debugger;
      if (sendText.length <= 501) {
        this.$emit('sendMsg', sendText.trim(), fileData);
        this.sendText = '';
      } else {
        this.$message({
          type: 'warning',
          message: '最大发送500个字符',
          showClose: true
        });
      }

    },

    /**
     * 根据文件后缀名判断文件是不是可以上传的类型
     */
    _isAllowUpload(filename) {
      let suffix = filename.replace(/.+\./, '').toLowerCase(); // 获取文件后缀名
      for (let item of FILE_TYPE) {
        // debugger;
        if (suffix === item.suffix.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";
  @import "@ms/icons.scss";

  .MessageSender {
    display: flex;
    flex-direction: column;
  }

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
    flex: 1;

    .input-wrap__inner {
      height: 100%;
    }

    .chat-textarea {
      box-sizing: border-box;
      min-height: 100px;
      height: 100%;
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
