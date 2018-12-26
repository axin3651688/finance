<template>
  <div class="MessageItem message-box">
    <div class="message-top">
      <div class="avatar-box">
        <img :src="data.avatar" :alt="data.name" :onerror="defaultImg">
      </div>
      <h3 class="user-name">{{data.name}}</h3>
      <div class="send-time">
        <!--<span class="time">2018-10-15&nbsp;&nbsp;15:00</span>-->
        <span class="time">{{data.sendTime| formatTime}}</span>
        <div class="status"></div>
      </div>
    </div>
    <div class="message-content">

      <!--2图片-->
      <div v-if="data.type === 2">
        <a :href="data.file.hdUrl" target="_blank">
          <div class="img-wrap">
            <div class="img-box">
              <img :src="data.file.thumbUrl" :alt="data.content">
            </div>
          </div>
        </a>
      </div>
      <!--3文件-->
      <div v-else-if="data.type === 3">
        <a :href="data.file.hdUrl" target="_blank">
          <div class="file-wrap">
            <!--{{data.file}}-->
            <div class="left">
              <div class="title">
                <span class="text">{{data.file.text}}</span>
              </div>
              <div class="size">{{data.file.size}}</div>
            </div>
            <div class="right">
              <!--<div class="icon icon__download"></div>-->
              <i class="icon el-icon-download"></i>
            </div>
          </div>
        </a>
      </div>
      <!--4语音-->
      <div v-else-if="data.type === 4">
        <!--{{data.file}}-->
        <audio :src="data.file.thumbUrl" controls="controls">
          您的浏览器不支持该音频播放。
        </audio>
      </div>
      <!--5语音-->
      <div v-else-if="data.type === 5">
        <!--{{data.file}}-->
        <video :src="data.file.thumbUrl" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <!--1 默认解析表情-->
      <div v-else="data.type === 1" v-html="parseEmotions(data.content)">
        <!--{{data.content | parseEmotions}}-->
      </div>


      <!--<div v-else>{{data.content}} //其他</div>-->
    </div>
  </div>
</template>

<script>
import {PARSE_EMOTIONS, FORMAT_TIME} from 'utils/message';
import emotionSprites from '@a/green/emotion_sprites.json';

export default {
  name: "MessageItem",
  props: ['data'],
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/img/avatar_male.png') + '"',
      EMOTION_SPRITES: emotionSprites.data, // 聊天表情数据
    }
  },
  filters: {
    formatTime(time) { // 格式化时间戳
      return FORMAT_TIME(time)
    }
  },
  methods: {
    parseEmotions(content) {
      return PARSE_EMOTIONS(content)
    }
  }
}
</script>

<style lang="scss">
  /*这里不使用 scoped 是v-html生成表情能够应用到样式*/
  @import "../styles/emotion_sprites.scss";
</style>
<style lang="scss" scoped>
  @import "../styles/variables.scss";

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
    }

    .file-wrap {
      box-sizing: border-box;
      width: 260px;
      padding: 10px 15px;
      border: 1px dashed #ddd;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .left {
        .title {
          width: 100%;
          line-height: 20px;
          display: flex;
          align-items: center;

          .text {
            display: inline-block;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $colorText2;
          }
        }

        .size {
          font-family: Arial;
          color: $colorText4;
        }
      }

      .right {
        height: 100%;

        .icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 18px;
          color: #ffffff;
          background: $colorTheme;
          overflow: hidden;
        }
      }
    }

    .img-wrap {
      .img-box {
        width: 100px;
        height: 100px;
        overflow: hidden;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }

  }

  /deep/ .face-img {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
</style>
