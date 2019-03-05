import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import componentState from './modules/componentState';
import user from './modules/user';
import param from './modules/param';
import saveInlocal from './saveInlocal';

Vue.use(Vuex);
const isDev = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    componentState,
    user,
    param
  },
  getters,
  plugins: [saveInlocal]
});

export default store;