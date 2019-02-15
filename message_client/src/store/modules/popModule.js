/**
 * ================================================
 * Date: 2019/2/14
 * Author: 姜海斌
 * ================================================
 */

const popModule = {
  state: {
    imagePreview: {
      hdUrl: null
    }
  },

  actions: {
    ActionUpdateImagePreview({commit}, hdUrl) {
      debugger;
      commit('MutationUpdateImagePreview', hdUrl);
    }
  },

  mutations: {
    MutationUpdateImagePreview(state, hdUrl) {
      debugger;
      state.imagePreview.hdUrl = hdUrl;
    }
  }
};

export default popModule;
