/**
 * 在这里定义接口
 */
import axios from 'axios'
import store  from "../store";
import router from "../router/index"
import {use} from "element-ui/src/locale";
// axios.defaults.withCredentials=true;
const  Request = ({url,data,method})=>{
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
  let user = null;
  Request({
    url:'/api/account/user',
    method:'get',
  }).then((response)=>{
    if (response.data.code == 401){
      router.push('/login')
    }else{
      user = response.data.data;
      store.commit('changeUser',user);
    }
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
const SaveNote = (noteId,title,content)=>{
    let url = '/api/v1/note/'+noteId;
    return Request({
      url:url,
      method:'put',
      data:{
        note_id:noteId,
        title,
        content
      }
    }).then()
};
const AddNote = (folder_id,title,content)=>{
  let url = '/api/v1/note';
  return Request({
    url:url,
    method:'post',
    data:{
      title,
      content,
      folder_id
    }
  }).then()
};
const RemoveNote = (note_id)=>{
  return Request({
    url:'/api/v1/note/'+note_id,
    method:'delete',
  }).then()
};
const AddCollect = (note_id)=>{
  return Request({
    url:'/api/v1/collect',
    method:'post',
    data:{
      note_id
    }
  }).then()
};
const CollectList = ()=>{
  return Request({
    url:'/api/v1/collect',
    method:'get',
  }).then()

};

export default{
  Login,                // 登陆
  Request,              // 带有token的请求
  Register,             // 注册
  UserInfo,             // 初始化用户信息
  NoteList,             // 笔记列表
  SaveNote,             // 保存笔记
  AddNote,              // 添加笔记
  RemoveNote,           // 删除笔记
  AddCollect,           // 添加收藏
  CollectList           // 收藏列表
}
