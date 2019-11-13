/**
 * 在这里定义接口
 */
import axios from 'axios'
import store  from "../store";
import router from "../router/index"
import {use} from "element-ui/src/locale";
// axios.defaults.withCredentials=true;
const Request = ({url,data,method})=>{
  let token = store.getters.getToken;

  if (!token){
    router.push('/login');
    return false;
  }
  axios.defaults.headers['token'] = store.getters.getToken;
  return axios({method, url, data}).then()
};

const Login = (username,password)=>{
    return axios.post('/api/account/login',{username,password}).then()
};
const Register = ({username,password,email})=>{
    return axios.post('/api/account/register',{username,password,email}).then()
};
const UserInfo = ()=>{
  var user = store.getters.getUserInfo;
  if (user){
    return user;
  }
  Request({
    url:'/api/account/user',
    method:'get',
  }).then((response)=>{
     user = response.data.data;
     store.commit('changeUser',user)
  });
  return user;
};

const NoteList = (folder_id)=>{
  let url = '/api/v1/note?';
  if (folder_id){
    url += '&folder_id='+folder_id
  }
  return Request({
    url:url,
    method:'get',
  }).then()
};

export default{
  Login,
  Request,
  Register,
  UserInfo,
  NoteList
}
