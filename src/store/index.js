import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import authen from './modules/authen'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersistence({
  key: 'zorun',
  storage: window.localStorage,
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authen,
  },
  plugins: [vuexLocalStorage.plugin],
})

export default store
