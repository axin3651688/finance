const prame = {
  state: {
    command: {
      year: new Date().getFullYear(),
      module_api: 0,
      month: new Date().getMonth(),
      companyName: "马军农垦",
      company: '1',
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
          localStorage.setItem([keys] + '_cache', data[keys]);
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