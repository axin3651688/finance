import store from '@/store'
import emotionSprites from '@a/green/emotion_sprites.json'; // 聊天表情数据

const EMOTION_SPRITES = emotionSprites.data; // 聊天表情数据

// 格式化时间戳 返回 年-月-日 时:分
export function FORMAT_TIME(time) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = date.getMonth();
  let D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  let newTime = `${Y}-${M}-${D} ${H}:${m}`;
  // console.log(newTime)
  return newTime
}

// 格式化时间戳 更具不同的时长返回不同的显示方式
export function FORMAT_MSG_TIME(publishtime) {
  let publishDate = new Date(publishtime);
  let Y = publishDate.getFullYear();
  let M = publishDate.getMonth();
  let D = publishDate.getDate();
  let h = publishDate.getHours();
  let m = publishDate.getMinutes();

  let currTime = Date.parse(new Date()); // 获取当前时间戳
  let l = parseInt(currTime) - parseInt(publishtime);
  let time = l / 1000;

  // 秒转小时
  let hours = time / 3600;
  if (hours < 24) {
    return `${h}:${m}`;
  }
  //秒转天数
  let days = time / 3600 / 24;
  if (days < 30) {
    return Math.floor(days) + "天前";
  }
  //秒转月
  let months = time / 3600 / 24 / 30;
  if (months < 12) {
    return `${M}-${D} ${h}:${m}`;
    // return Math.floor(months) + "月前";
  }
  //秒转年
  // let years = time / 3600 / 24 / 30 / 12;
  // return Math.floor(years) + "年前";
  return `${Y}-${M}-${D} ${h}:${m}`;

}

// 解析聊天符号，替换成表情图
export function PARSE_EMOTIONS(content) {
  // debugger;
  if (!content) return;
  let pattern1 = /\[[\S\s]+?\]/g; // 正则匹配聊天表情
  let matchContent = content.match(pattern1);
  // console.log('匹配表情：', matchContent);
  if (matchContent) {
    matchContent.forEach(face => {
      EMOTION_SPRITES.forEach(emotion => {
        if (emotion.value === face) {
          let html = `<span class="face-img ${emotion.className}"></span>`;
          content = content.replace(face, html);
        }
      });
    });
  }
  return content
}

// 处理图片类型
export function PARSE_IMG(content) {

}

// 处理音频类型
export function PARSE_AUDIO(content) {

}

// 处理视频类型
export function PARSE_VIDEO(content) {

}

// 处理文件类型
export function PARSE_FILE(content) {

}

// 解析聊天内容，把聊天中的 语音、文件、表情符号替换
// content:聊天内容  type:内容的类型（1、文本有表情的也是；6、图片）
export function PARSE_CHAT_CONTENT(content, type) {
  // debugger;
  switch (type) {
    case 1:
      // 处理 表情文本 消息，替换表情符号
      return PARSE_EMOTIONS(content);
      break;
    case 2:
      // 处理 图片 类型的内容
      return PARSE_IMG(content);
      break;
    case 3:
      // 处理 文件 类型的内容
      return PARSE_FILE(content);
      break;
    case 4:
      // 处理 音频 类型的内容
      return PARSE_AUDIO(content);
      break;
    case 5:
      // 处理 视频 类型的内容
      return PARSE_VIDEO(content);
      break;
    default:
      return content
  }
}

// 处理服务端socked端推送的消息
export function processServerMessage(data) {
  store.dispatch("ActionSetMessageStore", {newServerMsg: data});
}
