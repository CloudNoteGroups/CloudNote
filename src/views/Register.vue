<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"><div class="grid-content bg-purple">
        <div class="logo">
          <img src="../assets/logo.png" alt="" height="180" width="536">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="form-grid">
          <div class="form">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>

          </div>
        </div>
        <div class="btn-grid">
          <el-button type="info" @click="goLogin">返回登陆</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置输入框</el-button>
        </div>
        </el-form>
      </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            var checkUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }else if(value.length < 6){
                    return callback(new Error('用户名长度必须大于6'));
                }else{
                    callback()
                }

            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    let regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');
                    if (!regex.test(value)){
                        callback(new Error('您的密码复杂度太低（密码中必须包含字母、数字）'));
                    }
                    callback()
                }
                return true;
            };
            var validateEmail = (rule, value, callback)=>{
                if (value === ''){
                    callback(new Error('请输入邮箱'));
                }else{
                    if(!this.emailCheck(value)){
                        callback(new Error('请输入合法的邮箱格式'));
                    }else{
                        callback()
                    }
                }
            };

            return {
                ruleForm: {
                    username: '',
                    password: '',
                    email: ''
                },
                rules: {
                    username: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    email:[
                          {validator:validateEmail,trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(111);
                        this.$api.Register(this.ruleForm).then((response)=>{
                            let error = response.data.data.error;
                            if(error){
                                this.ruleForm = response.data.data;
                                this.$message({
                                    message:'注册失败!!',
                                    type:'error',
                                    showClose:true,
                                });
                            }else{
                                const loading = this.$loading({
                                    lock: true,
                                    text: '注册成功！跳转到登陆页面中...',
                                    spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                });
                                setTimeout(() => {
                                    loading.close();
                                    this.$router.push('/login')
                                }, 2000);
                            }
                        })
                    } else {
                        this.$message({
                            message:'请输入正确的用户名、密码、邮箱',
                            type:'error',
                            showClose:true,
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goLogin(){
                this.$router.push('/login')
            },
            emailCheck(emailAddr){
                if((emailAddr == null) || (emailAddr.length < 2)) return false ;
                // 需出现'@',且不在首字符.
                var aPos = emailAddr.indexOf("@" ,1) ;
                if(aPos < 0)
                {
                    return false ;
                }
                // '@'后出现'.',且不紧跟其后.
                if(emailAddr.indexOf("." ,aPos+2) < 0)
                {
                    return false ;
                }
                return true ;
            }

        },

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
