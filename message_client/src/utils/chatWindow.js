/**
 * ================================================
 * Date: 2019/1/31
 * Author: 姜海斌
 * 单聊群聊，聊天窗口处理
 * ================================================
 */

/**
 * 遍历聊天类容，把所有的图片放到一个图片列表里
 * @param msgList {Array}: 请求的消息列表
 * @returns {Array}: 图片地址列表
 */
export function parseChatImages(msgList) {
  let imageList = [];
  msgList.forEach(msg => {
    if (msg.type === 2) {
      imageList.push(msg.file.hdUrl);
    }
  });
  return imageList;
}
