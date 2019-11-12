/**
 * 在这里定义接口
 */
import axios from 'axios'
import store  from "../store";

// axios.defaults.withCredentials=true;
const Request = ({url,data,method})=>{
  axios.defaults.headers['token'] = store.getters.getToken;
  return axios({method, url, data}).then()
};

const Login = (username,password)=>{
    return axios.post('/api/account/login',{username,password}).then()
};
const Register = ({username,password,email})=>{
    return axios.post('/api/account/register',{username,password,email}).then()
};

export default{
  Login,
  Request,
  Register
}
