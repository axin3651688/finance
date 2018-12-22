const messageModule = {
  state: {
    messageStore: {
      newServerMsg: null, // 服务器推送的最新消息
      receiverData: null, // 单聊对象的用户信息
      groupInfo: null, // obj: 群信息
      miniType: 11016, // 设置消息类型 11016:新朋友、11017:群助手、11021:分析助手
      mySessionList: null,  // [{},{}] 消息左边栏
    }
  },

  actions: {
    // 设置所有的状态, 接收一个对象
    ActionSetMessageStore({commit}, dataObj) {
      commit('MutationSetMessageStore', dataObj)
    }
  },

  mutations: {
    // 设置所有的状态, 接收一个对象
    MutationSetMessageStore(state, dataObj) {
      for (let messageStoreKey in state.messageStore) {
        for (let dataKey in dataObj) {
          if (messageStoreKey === dataKey) {
            state.messageStore[messageStoreKey] = dataObj[dataKey]
          }
        }
      }
      try {
        let messageStoreStr = JSON.stringify(state.messageStore);
        localStorage.messageStore = messageStoreStr
      } catch (e) {
        console.log('设置localStorage.messageStore失败:',e)
      }
    }
  }

};


export default messageModule