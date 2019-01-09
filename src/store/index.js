import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import componentstate from './modules/componentstate'
import user from './modules/user'
import prame from './modules/prame'
import messageModule from './modules/messageModule'


Vue.use(Vuex)
const isDev = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  strict: isDev,
  modules: {
    componentstate,
    user,
    prame,
    messageModule
  },
  getters
})

export default store