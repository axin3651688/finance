<template>
  <div class="MessageItem message-box" :class="{'is-me': data.senderId === loginUserId}">

    <div class="avatar">
      <div class="img-box" :title="data.name">
        <img :src="data.avatar" v-avatar="data.name">
      </div>
    </div>

    <div class="content">
      <!--{{data}}-->

      <div class="content-bubble">
        <!--2图片-->
        <div v-if="data.type === 2">
          <template v-if="data.type === 2 && data.file">
            <a :href="data.file.hdUrl" target="_blank">
              <div class="img-wrap">
                <div class="img-box">
                  <img :src="data.file.thumbUrl" :alt="data.content">
                </div>
              </div>
            </a>
          </template>
          <span v-else>图片异常···</span>
        </div>

        <!--3文件-->
        <div v-else-if="data.type === 3">
          <template v-if="data.file">
            <a :href="data.file.hdUrl" target="_blank">
              <div class="file-wrap">
                <!--{{data.file}}-->
                <div class="left">
                  <div class="title">
                    <span class="text">{{data.file.text+data.file.category}}</span>
                  </div>
                  <div class="size">{{data.file.size}}</div>
                </div>
                <div class="right">
                  <i class="icon el-icon-download"></i>
                </div>
              </div>
            </a>
          </template>
          <span v-else>文件异常···</span>
        </div>

        <!--4语音-->
        <div v-else-if="data.type === 4">
          <!--{{data.file}}-->
          <my-audio-player v-if="data.file" :src="data.file.thumbUrl"></my-audio-player>
        </div>

        <!--5视频-->
        <div v-else-if="data.type === 5" class="video-wrap">
          <!--{{data.file}}-->
          <div class="video-container">
            <my-video-player v-if="data.file" :src="data.file.hdUrl" :poster="data.file.thumbUrl"></my-video-player>
          </div>
        </div>

        <!--1 默认解析表情-->
        <div class="content-text" v-else v-html="parseEmotions(data.content)"></div>
      </div>

    </div>

    <div class="time">
      <div class="send-time">
        <span class="time">{{data.sendTime | formatMsgTime}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {PARSE_EMOTIONS} from '@mu/parseEmotions.js';
import {MSG_TIME_FORMAT} from '@mu/timeFormat.js';
import MyVideoPlayer from '@mc/my_video_player/MyVideoPlayer.vue';
import MyAudioPlayer from '@mc/my_audio_player/MyAudioPlayer.vue';
import emotionSprites from '@ma/data/emotionSprites.json';

export default {
  name: 'MessageItem',
  props: ['data'],
  components: {
    MyAudioPlayer,
    MyVideoPlayer
  },
  data() {
    return {
      EMOTION_SPRITES: emotionSprites.data  // 聊天表情
    };
  },
  computed: {
    ...mapGetters(['user']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  filters: {
    formatMsgTime(publishTime) { // 格式化时间戳(消息、聊天专用)
      return MSG_TIME_FORMAT(publishTime);
    }
  },
  methods: {
    parseEmotions(content) {
      return PARSE_EMOTIONS(content);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";
  @import "@ms/variables.scss";

  a {
    display: inline-block;
    text-decoration: none;
  }

  .message-box {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 15px;
    background: #ffffff;

    .avatar {
      .img-box {
        @include imgBox($width: 40px, $height: 40px, $borderRadius: 50%);
      }
    }

    .content {
      padding: 0 12px;

      .content-bubble {
        position: relative;
        box-sizing: border-box;
        padding: 12px;
        min-height: 40px;
        min-width: 40px;
        line-height: 20px;
        font-size: 14px;
        background-color: $colorThemePrimary;
        border-radius: 6px;
        color: $colorTextChatContent;

        &:before {
          content: " ";
          position: absolute;
          top: 14px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: $colorThemePrimary;
        }
      }

      .video-wrap {
        min-width: 340px;
        min-height: 100px;
      }
    }

    .time {
      color: $colorTextBlack2;
      line-height: 44px;
      font-size: 14px;
      min-width: 56px;
      text-align: center;
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
      background-color: #ffffff;

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

  .message-box.is-me {
    flex-direction: row-reverse;

    .content-bubble {
      &:before {
        right: auto;
        left: 100% !important;
        border-right-color: transparent;
        border-left-color: $colorThemePrimary;
      }
    }
  }
</style>
