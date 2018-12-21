import emotionSprites from '@a/green/emotion_sprites.json'; // 聊天表情数据

const EMOTION_SPRITES = emotionSprites.data; // 聊天表情数据


// 解析聊天符号，替换成表情图
export function PARSE_EMOTIONS(content) {
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
