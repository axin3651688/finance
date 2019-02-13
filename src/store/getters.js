const getters = {
  isAutnenticated: state => state.isAutnenticated,
  // 用户个人信息
  user: state => state.user.user,
  // 侧边栏状态
  sidebar: state => state.componentState.sidebar,
  device: state => state.componentState.device,
  // dialog显示及隐藏
  showDialog: state => state.componentState.showDialog,
  showMeluList: state => state.componentState.showMeluList,
  // 用户公司信息
  userCompany: state => state.user.user.company,
  // 点击侧边栏返回的url
  module_api: state => state.param.command.module_api,
  // 点击侧边栏返回资源id
  // sourceId: state => state.param.command.sourceId,
  // 顶部期间年状态
  year: state => state.param.command.year,
  // 顶部期间月状态
  month: state => state.param.command.month,
  // 顶部期间日状态
  date: state => state.param.command.date,
  // 顶部选中公司id
  company: state => state.param.command.company,
  // 顶部选中公司名字
  companyName: state => state.param.command.companyName,
  // 顶部选中单位名字
  conversion: state => state.param.command.conversion,
  // 顶部公司点击信息大全
  treeInfo: state => state.param.treeInfo,
  // 侧边栏展开父级id
  openPid: state => state.param.command.openPid,
  // 侧边栏展开子级id
  activeId: state => state.param.command.activeId,
  // 控制顶部导航栏的显示及隐藏
  showDims: state => state.param.showDims,

  action: state => state.param.command.action,
  action2: state => state.param.command.action2,
  action3: state => state.param.command.action3
};
export default getters;
