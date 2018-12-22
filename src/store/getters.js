const getters = {
  isAutnenticated: state => state.isAutnenticated,
  // 用户个人信息
  user: state => state.user.user,
  // 侧边栏状态
  sidebar: state => state.sideopen.sidebar,
  device: state => state.sideopen.device,
  // 用户公司信息
  userCompany: state => state.user.user.company,
  // 点击侧边栏返回的url
  module_api: state => state.prame.command.module_api,
  // 点击侧边栏展开code
  openPid: state => state.prame.command.openPid,
  // 点击侧边栏二级激活code
  activeId: state => state.prame.command.activeId,
  // 点击侧边栏返回资源id
  // sourceId: state => state.prame.command.sourceId,
  // 顶部期间年状态
  year: state => state.prame.command.year,
  // 顶部期间月状态
  month: state => state.prame.command.month,
  // 顶部期间日状态
  date: state => state.prame.command.date,
  // 顶部选中公司id
  company: state => state.prame.command.company,
  // 顶部选中公司名字
  companyName: state => state.prame.command.companyName,
  //顶部公司点击信息大全
  treeInfo: state => state.prame.command.treeInfo,
  // 侧边栏展开父级id
  openPid: state => state.prame.command.openPid,
  // 侧边栏展开子级id
  activeId: state => state.prame.command.activeId,
  action: state => state.prame.command.action,
  action2: state => state.prame.command.action2,
  action3: state => state.prame.command.action3,

  newServerMsg: state => state.messageModule.newServerMsg, // 服务器推送的消息
  chatWithUserId: state => state.messageModule.chatWithUserId // 和谁聊天，单聊
}
export default getters