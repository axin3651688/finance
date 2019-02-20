/**
 * ================================================
 * Date: 2019/2/14
 * Author: 姜海斌
 * ================================================
 */

import {SET_STORE} from '../functions.js';

const popModule = {
  state: {
    imagePreview: {
      hdUrl: null
    }
  },

  actions: {
    ActionSetPopModuleStore({commit}, dataObj) {
      commit('MutationSetPopModuleStore', dataObj);
    },

    ActionUpdateImagePreview({commit}, hdUrl) {
      commit('MutationUpdateImagePreview', hdUrl);
    }
  },

  mutations: {
    MutationSetPopModuleStore(state, dataObj) {
      SET_STORE(state, dataObj);
    },
    MutationUpdateImagePreview(state, hdUrl) {
      state.imagePreview.hdUrl = hdUrl;
    }
  }
};

export default popModule;
