const prame = {
  state: {
    command: {
      year: new Date().getFullYear(),
      module_api: 0,
      month: new Date().getMonth(),
      date: new Date().getDate(),
      companyName: "登录有问题哦,重新登录吧",
      company: '1',
      openPid: 0,
      activeId: [],
      //下面待实现
      action: 0,
      action2: 0,
      action3: 0,
      defaultOpen: 0,
    },
    treeInfo: {
      id: "1001",
      leaf: true,
      pid: "1001",
      industryId: 1,
      text: "天津食品"
    },
    // 默认是公司,分开的年,月显示,day不显示,如果需要展现day,
    showDims: {
      company: true,
      year: true,
      month: true,
      day: false
    }
  },

  mutations: {
    GET_SIDE_MID: (state, data) => {
      debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.command[keys] = data[keys]
          localStorage.setItem([keys] + '_cache', data[keys]);
        }
      });
    },
    GET_TRREEINFO: (state, treeInfo) => {
      state.treeInfo = treeInfo
      localStorage.setItem('treeInfo', JSON.stringify(treeInfo));
    },
    SHOW_DIMS: (state, data) => {
      debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.showDims[keys] = data[keys]
          localStorage.setItem([keys] + '_top', data[keys]);
        }
      });
    },
  },

  actions: {
    GetSideMid: ({
      commit
    }, data) => {
      commit('GET_SIDE_MID', data)
    },
    GettRreeInfo: ({
      commit
    }, data) => {
      commit('GET_TRREEINFO', data)
    },
    ShowDims: ({
      commit
    }, data) => {
      commit('SHOW_DIMS', data)
    }
  }
}
export default prame