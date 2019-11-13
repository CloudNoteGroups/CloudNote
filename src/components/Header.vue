<template>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item ><img src="../assets/logo.png"  height="60" alt=""></el-menu-item>
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="note">云笔记</el-menu-item>
      <el-menu-item index="collect">我的收藏</el-menu-item>

      <el-submenu index="center" class="account-center">
        <template slot="title"><el-image
          style="width: 50px; height: 50px"
          :src="user.avatar?user.avatar:url"></el-image></template>
        <el-menu-item index="2-1">我的资料</el-menu-item>
        <el-menu-item index="2-2">我的收藏</el-menu-item>
        <el-menu-item index="2-3">注销</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                activeIndex:"home",
                url:'http://note.youdao.com/yws/api/image/normal/1534131932828?userId=qqE7537197795DCCB09A6239A15121893A',
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
            }
        },
        created(){
            let user = this.$api.UserInfo();
            this.user = user
        },
        methods:{
            handleSelect(){
                console.log(11)
            }
        }
    }
</script>

<style scoped>
  .account-center{
    float: right;
    padding: 0 30px;
  }
  .avatar{
    float: right;
  }
  .el-image{
    border-radius: 10px;
  }
</style>
