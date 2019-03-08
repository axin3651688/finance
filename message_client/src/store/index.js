import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import messageModule from './modules/messageModule';
import popModule from './modules/popModule';

Vue.use(Vuex);
const isDev = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    user,
    messageModule,
    popModule
  },
  getters
});

export default store;
