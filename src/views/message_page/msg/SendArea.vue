<template>
  <div class="SendArea">
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
</template>

<script>
export default {
  name: "SendArea"
}
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .SendArea {
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
</style>
