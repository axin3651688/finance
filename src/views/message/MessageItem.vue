<template>
  <div class="MessageItem message-box">
    <div class="message-top">
      <div class="avatar-box">
        <img :src="data.avatar" :alt="data.name">
      </div>
      <h3 class="user-name">{{data.name}}</h3>
      <div class="send-time">
        <!--<span class="time">2018-10-15&nbsp;&nbsp;15:00</span>-->
        <span class="time">{{data.sendTime| formatTime}}</span>
        <div class="status"></div>
      </div>
    </div>
    <div class="message-content">
      <div v-if="data.type === 1">{{data.content}}</div>
      <!--文件-->
      <div v-else>
        <a :href="data.file.hdUrl" target="_blank">
          <div class="file-wrap">
            <div class="left">
              <div class="title">
                <span class="text">{{data.file.text}}</span>
                <span class="category">.{{data.file.category}}</span>
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

      <!--<div v-else-if="data.type === 2">{{data.content}} //图片</div>-->
      <!--<div v-else-if="data.type === 3">{{data.content}} //文件</div>-->
      <!--<div v-else-if="data.type === 4">{{data.content}} //语音</div>-->
      <!--<div v-else-if="data.type === 5">{{data.content}} //视频</div>-->
      <!--<div v-else>{{data.content}} //其他</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: ['data'],
  filters: {
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
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/green/index.scss";

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
            max-width: 150px;
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
  }
</style>