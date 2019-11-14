import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:null,
    user:{
      area: null,
      avatar: null,
      email: null,
      gender: null,
      login_time: null,
      mobile: null,
      name: null,
      registered_time: null,
      status: null,
      user_id: null,
      username: ""
    }
  },
  getters:{
    getToken(state){
      return window.localStorage.getItem('token');
    },
    getUserInfo(state){
      let user = window.localStorage.getItem('user');
      if (!user){
        return false;
      }
      return JSON.parse(user);
    }
  },
  mutations: {
    changeToken(state,token){
      window.localStorage.setItem('token',token);
      state.token = token
    },
    clearToken(state){
      window.localStorage.clear()
    },
    changeUser(state,user){
      let json_user = JSON.stringify(user);
      window.localStorage.setItem('user',json_user);
      state.user = user;
    }
  },
  actions: {

  }
})
