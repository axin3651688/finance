const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user.user,
  sidebar: state => state.sideopen.sidebar,
  device: state => state.sideopen.device,
  userCompany: state => state.user.user.company,
  // 点击侧边栏返回的url
  module_api: state => state.prame.command.module_api,
  // 点击侧边栏展开code
  openPid: state => state.prame.command.openPid,
  // 点击侧边栏二级激活code
  activeId: state => state.prame.command.activeId,
  // 点击侧边栏返回资源id
  // sourceId: state => state.prame.command.sourceId,
  year: state => state.prame.command.year,
  month: state => state.prame.command.month,
  // 选中公司id
  company: state => state.prame.command.company,
  companyName: state => state.prame.command.companyName,
  // 侧边栏展开父级id
  openPid: state => state.prame.command.openPid,
  // 侧边栏展开子级id
  activeId: state => state.prame.command.activeId,
  action: state => state.prame.command.action,
  action2: state => state.prame.command.action2,
  action3: state => state.prame.command.action3,

}
export default getters