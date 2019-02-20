const getters = {
  isAutnenticated: state => state.isAutnenticated, // 登陆令牌
  user: state => state.user.user, // 用户个人信息

  newServerMsg: state => state.messageModule.newServerMsg, // 服务器推送的消息
  chatWithUserId: state => state.messageModule.chatWithUserId, // 和谁聊天，单聊
  messageStore: state => state.messageModule.messageStore, // 消息模块的所有数据

  imagePreview: state => state.popModule.imagePreview, // 图片预览
  popModule: state => state.popModule
};
export default getters;
