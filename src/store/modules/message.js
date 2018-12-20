const state = {
  chatWithUserId: null,
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
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}