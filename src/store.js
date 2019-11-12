import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:null
  },
  getters:{
    getToken(state){
      return window.sessionStorage.getItem('token');
    }
  },
  mutations: {
    changeToken(state,token){
      window.sessionStorage.setItem('token',token);
      state.token = token
    },
    clearToken(state){
      window.sessionStorage.clear()
    }
  },
  actions: {

  }
})
