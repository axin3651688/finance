const messageModule = {
  state: {
    newServerMsg: null, // 服务器推送的最新消息
    chatWithUserId: null, // Number: 和哪个用户聊天
    mySessionList: null,  // [{},{}] 消息左边栏
  },


  actions: {
    // 测试用
    actionsTest({commit, state}, msg) {
      commit('actionsTest', msg)
    },

    // 测试用
    ActionSetChatWithUserId({commit, state}, receiverId) {
      commit('mutationSetChatWithUserId', receiverId)
    }
  },

  mutations: {

    // 测试用
    actionsTest(state, msg) {
      // debugger;
      state.items = msg
    },

    // 设置当前的聊天对象的id
    mutationSetChatWithUserId(state, receiverId) {
      state.chatWithUserId = receiverId
    },

    // 设置消息左边栏的数据
    mutationSetMySessionList(state, mySessionList) {
      // debugger;
      state.mySessionList = mySessionList
    }

  }
};


export default messageModule