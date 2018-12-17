import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sideopen from './modules/sideopen'
import user from './modules/user'
import prame from './modules/prame'


Vue.use(Vuex)
const isDev = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    sideopen,
    user,
    prame
  },
  getters
})

export default store