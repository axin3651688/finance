import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import messageModule from './modules/messageModule';

Vue.use(Vuex);
const isDev = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    user,
    messageModule
  },
  getters
});

export default store;
