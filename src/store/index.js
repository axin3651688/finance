import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sideopen from './modules/sideopen'
import user from './modules/user'
import prame from './modules/prame'
import message from './modules/message'


Vue.use(Vuex)
const isDev = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    sideopen,
    user,
    prame,
    message
  },
  getters
})

export default store