const prame = {
  state: {
    command: {
      // year: new Date().getFullYear(),
      //  month: new Date().getMonth() || 1,
      year: 2017,
      month: 6,
      module_api: 0,
      date: new Date().getDate(),
      // 单位转换
      conversion: {
        id: 1,
        text: "元"
      },
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
      day: false,
      // 单位转换
      conversion: false,
    }
  },

  mutations: {
    GET_SIDE_MID: (state, data) => {
      // debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.command[keys] = data[keys]
          if (typeof data[keys] == "object") {
            localStorage.setItem([keys] + '_cache', JSON.stringify(data[keys]));
          } else {
            localStorage.setItem([keys] + '_cache', data[keys]);
          }
        }
      });
    },
    GET_TRREEINFO: (state, treeInfo) => {
      state.treeInfo = treeInfo
      localStorage.setItem('treeInfo', JSON.stringify(treeInfo));
    },
    SHOW_DIMS: (state, data) => {
      // 此方法即可以接受数组对状态初始化,又可以接受对象更改其状态
      // console.log(data);
      if (data.constructor == Array) {
        state.showDims.company = false,
          state.showDims.year = false,
          state.showDims.month = false,
          state.showDims.day = false,
          state.showDims.conversion = false,
          data.forEach(ele => {
            state.showDims[ele] = !state.showDims[ele]
          });
      } else {
        Object.keys(data).forEach(keys => {
          state.showDims[keys] = data[keys]
        });
      }
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