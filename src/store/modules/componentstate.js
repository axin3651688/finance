
/*
*本模块管理组件状态。
*/
import Cookies from 'js-cookie'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    showDialog: {
      data: '这是一段消息',
      isShow: false,
      switchStyle: true,
      tittle: "标题",
      width: "35%",
      height: "1000px",
      api: "cnbi/json/source/chart/pie.json"
    }
  },
  mutations: {
    // 侧边栏操作
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SHOW_DIALOG: (state, data) => {
      // debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.showDialog[keys] = data[keys]
          if (typeof data[keys] == "object") {
            localStorage.setItem([keys] + '_state', JSON.stringify(data[keys]));
          } else {
            localStorage.setItem([keys] + '_state', data[keys]);
          }
        }
      });
    },
  },
  actions: {
    // 侧边栏关闭
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ShowDialog: ({
      commit
    }, data) => {
      commit('SHOW_DIALOG', data)
    },
  }
}

export default app