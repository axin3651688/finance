const messageModule = {
  state: {
    messageStore: {
      newServerMsg: null, // 服务器推送的最新消息
      receiverData: null, // 单聊对象的用户信息
      groupInfo: null, // obj: 群信息
      companyList: null, // [{}.{}] 公司（团队）列表
      miniType: 11016, // 设置消息类型 11016:新朋友、11017:群助手、11021:分析助手
      mySessionList: null,  // [{},{}] 消息左边栏
    }
  },

  actions: {
    // 设置所有的状态, 接收一个对象
    ActionSetMessageStore({commit}, dataObj) {
      if (dataObj instanceof Object) {
        commit('MutationSetMessageStore', dataObj)
      } else {
        console.log('设置messageStore传入数据类型有误');
        debugger;
      }
    }
  },

  mutations: {
    // 设置所有的状态, 接收一个对象
    MutationSetMessageStore(state, dataObj) {
      // debugger;
      for (let dataKey in dataObj) {
        let flag = dataKey;
        for (let messageStoreKey in state.messageStore) {
          if (dataKey === messageStoreKey) {
            flag = false;
            state.messageStore[messageStoreKey] = dataObj[dataKey]
          }
        }
        if (flag) {
          console.log(`messageStore-传入的${flag}没有在state中定义`);
          debugger;
        }
      }
      // 在本地存储中保留一份，方便查看
      try {
        let messageStoreStr = JSON.stringify(state.messageStore);
        localStorage.messageStore = messageStoreStr
      } catch (e) {
        console.log('设置localStorage.messageStore失败:', e)
      }
    }
  }

};


export default messageModule
