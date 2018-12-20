const state = {
  chatWithUserId: null, // Number: 和哪个用户聊天
  mySessionList: null,  // [{},{}] 消息左边栏
};

const getters = {};

const actions = {

  // 测试用
  actionsTest({commit, state}, msg) {
    commit('actionsTest', msg)
  }
};

const mutations = {

  // 测试用
  actionsTest(state, msg) {
    debugger;
    state.items = msg
  },

  // 设置当前的聊天对象的id
  mutationSetChatWithUserId(state, chatWithUserId) {
    state.chatWithUserId = chatWithUserId
  },

  // 设置消息左边栏的数据
  mutationSetMySessionList(state, mySessionList) {
    debugger;
    state.mySessionList = mySessionList
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}