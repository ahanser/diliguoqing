import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import ecolo from './modules/ecolo'
import quality from './modules/quality'
import human from './modules/human'
import val from './modules/val'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    ecolo,
    quality,
    human,
    val
  },
  getters,
})

export default store
