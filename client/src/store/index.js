import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    opcaoDark: 'a',
  },
  mutations: {
    mudarUsuario(state, usuario) {
      state.usuario = usuario
    },
    mudarOpcaoDark(state, modo) {
      state.opcaoDark = modo
    },
  },
  actions: {
  },
  modules: {
  }
})
