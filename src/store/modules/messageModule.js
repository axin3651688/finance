const messageModule = {
  state: {
    messageStore: {
      newServerMsg: null, // 服务器推送的最新消息
      receiverId: null, // Number: 和哪个用户聊天（单聊）
      receiverData: null, // 单聊对象的用户信息
      groupId: null, // Number: 和哪个群聊天 （群聊）
      miniType: 101010, // 设置消息类型 11016:新朋友、11017:群助手、11021:分析助手
      mySessionList: null,  // [{},{}] 消息左边栏
    }
  },


  actions: {
    // 设置所有的状态, 接收一个对象
    ActionSetMessageStore({commit}, dataObj) {
      commit('MutationSetMessageStore', dataObj)
    },

    // 设置聊天对象id
    ActionSetReceiverId({commit, state}, receiverId) {
      commit('mutationSetReceiverId', receiverId)
    },

    // 设置聊群id
    ActionSetGroupId({commit, state}, groupId) {
      commit('mutationSetGroupId', groupId)
    },

    // 设置 miniType
    ActionSetMinitype({commit, state}, miniType) {
      commit('mutationSetMinitype', miniType)
    }
  },

  mutations: {
    // 设置所有的状态, 接收一个对象
    MutationSetMessageStore(state, dataObj) {
      debugger;
      for (let messageStoreKey in state.messageStore) {
        for (let dataKey in dataObj) {
          if (messageStoreKey === dataKey) {
            state.messageStore[messageStoreKey] = dataObj[dataKey]
          }
        }
      }
    },

    // 设置聊天对象id
    mutationSetReceiverId(state, receiverId) {
      state.messageStore.receiverId = receiverId
    },

    // 设置聊群id
    mutationSetGroupId(state, groupId) {
      state.messageStore.groupId = groupId
    },

    // 设置 miniType
    mutationSetMinitype(state, miniType) {
      state.messageStore.miniType = miniType
    },
  }
};


export default messageModule