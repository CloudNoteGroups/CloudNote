<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"><div class="grid-content bg-purple">
        <div class="logo">
          <img src="../assets/logo.png" alt="" height="180" width="536">
        </div>
        <div class="form-grid">
          <div class="form">
            <div class="input-box">
              <div class="label">
                用户名：
              </div>
              <div class="input">
                <el-input v-model="username" placeholder="请输入用户名"></el-input>
              </div>
            </div>
            <div class="input-box">
              <div class="label">
                密码：
              </div>
              <div class="input">
                <el-input v-model="password" placeholder="请输入密码"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-grid">
          <el-button type="primary" @click="Login">登陆</el-button>
          <el-button type="success" @click="goRegister">去注册</el-button>
        </div>
      </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "Login",
        data:()=>{
            return{
                username:'',
                password:'',
            }
        },
        methods:{
            Login(){
                if (!this.username){
                    this.$message({
                        message:"请输入用户名",
                        type:'error',
                        showClose:true
                    });
                    return false;
                }
                if (!this.password){
                    this.$message({
                        message:"请输入密码",
                        type:'error',
                        showClose:true
                    });
                    return false;
                }
                let that = this;
                this.$api.Login(this.username,this.password).then((response)=>{
                    let code = response.data.code;
                    if(code == 200){
                        let token = response.data.data.token;
                        that.$store.commit('changeToken',token);
                        const loading = this.$loading({
                            lock: true,
                            text: '登陆成功！跳转到首页中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                            that.$router.push('/')
                        }, 2000);

                    }else{
                        let message = response.data.message;
                        that.$message({
                            message:message ,
                            type:'error',
                            showClose:true
                        });
                    }
                });
            },
            goRegister(){
                this.$router.push('register')
            }
        }
    }
</script>

<style scoped>
  .grid-content .logo{
    display: block;
    margin: 0 auto;
    height: 180px;
    width: 536px;
  }
  .form-grid {
    width: 536px;
    margin: 30px auto;
  }
  .input-box{
    margin: 20px;
  }
  .input-box div{
    display: inline-block;
  }
  .input-box .input{
    width: 75%;
  }
  .input-box .label{
    width: 20%;
    height: 100%;
    font-size: 18px;
  }
  .btn-grid{
    width: 536px;
    margin: 0 auto;
    text-align: center;
  }
  .content{
    margin-top: 50px;
  }
</style>
