/*
 *本模块管理组件状态。
 */
import Cookies from 'js-cookie'
export default {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    showDialog: {
      params: {},
      data: '这是一段消息',
      isShow: false,
      switchStyle: true,
      tittle: "标题",
      width: "35%",
      height: "1000px",
      api: "cnbi/json/source/chart/pie.json"
    },
    showMeluList: {
      data: [],
      checkedItem: [],
      deleteData: '',
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
    SHOW_MELULIST: (state, data) => {
      debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.showMeluList[keys] = data[keys]
          if (keys === 'deleteData') {
            // 由于vuex里面的数据改动全部都必须走mutation,所以只要检测到删除提交,就走这个if判断
            debugger
            let index = data.deleteData
            let checkeData = state.showMeluList.checkedItem
            if (index === "deleteAll") {
              checkeData.splice(0, checkeData.length);
            } else {
              checkeData.splice(index, 1);
            }
          }
          // if (typeof data[keys] == "object") {
          //   localStorage.setItem([keys] + '_state', JSON.stringify(data[keys]));
          // } else {
          //   localStorage.setItem([keys] + '_state', data[keys]);
          // }
        }
      });
    },
    SHOW_DIALOG: (state, data) => {
      // debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.showDialog[keys] = data[keys]
          // if (typeof data[keys] == "object") {
          //   localStorage.setItem([keys] + '_state', JSON.stringify(data[keys]));
          // } else {
          //   localStorage.setItem([keys] + '_state', data[keys]);
          // }
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
    ShowMeluList: ({
      commit
    }, data) => {
      commit('SHOW_MELULIST', data)
    },
  }
}