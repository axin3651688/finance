const prame = {
  state: {
    command: {
      year: new Date().getFullYear(),
      module_api: 0,
      month: new Date().getMonth(),
      date: new Date().getDate(),
      companyName: "登录有问题哦,重新登录吧",
      company: '1',
      treeInfo: {
        id: "1001",
        leaf: true,
        pid: "1001",
        industryId: 1,
        text: "天津食品"
      },
      openPid: 0,
      activeId: [],
      //下面待实现
      action: 0,
      action2: 0,
      action3: 0,
      defaultOpen: 0,
    }
  },

  mutations: {
    GET_SIDE_MID: (state, data) => {
      // debugger
      Object.keys(data).forEach(keys => {
        if (data[keys] !== null || undefined) {
          state.command[keys] = data[keys]
          console.log(typeof data[keys])
          if (typeof data[keys] == 'object') {
            localStorage.setItem([keys] + '_cache', JSON.stringify(data[keys]));
          } else {
            localStorage.setItem([keys] + '_cache', data[keys]);
          }
        }
      });
    },
  },

  actions: {
    GetSideMid: ({
      commit
    }, data) => {
      commit('GET_SIDE_MID', data)
    }
  }
}
export default prame