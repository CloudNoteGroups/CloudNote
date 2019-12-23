<template>
  <div>
    <div>
      <el-aside :style="{height:height+'px',width:'200px'}" class="aside">
        <el-col>
          <el-menu
            class="el-menu-vertical-demo"
            @select="selectHandler"
            @open="openFolder"
            :router="true"
          >
             <div style="text-align: center;padding: 5px">
                 <el-dropdown
                         :divided="true"
                         @command="clickCommand"

                 >
                     <el-button round type="primary" plain>
                         <i class="el-icon-plus"></i> &nbsp;新建
                     </el-button>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item icon="el-icon-plus" command="Folder">新建文件夹</el-dropdown-item>
                         <el-dropdown-item icon="el-icon-plus" command="MarkDown">新建MarkDown</el-dropdown-item>
                         <el-dropdown-item icon="el-icon-plus" command="Note">新建笔记</el-dropdown-item>
                         <el-dropdown-item icon="el-icon-plus" command="mindMapping">新建思维导图</el-dropdown-item>
                         <el-dropdown-item icon="el-icon-plus" command="flowChart">新建流程图</el-dropdown-item>
                     </el-dropdown-menu>
                     
                 </el-dropdown>
             </div>

              <el-submenu index="folder">
                  <template slot="title">
                      <i class="el-icon-folder"></i>
                      <span>笔记归档</span>
                  </template>
                  <el-submenu  v-for="(item,index) in data" :key="index" :index="JSON.stringify(item.folder_id)">
                      <template slot="title"><i class="el-icon-folder"></i>{{item.folder_name}}</template>
                      <el-submenu  v-for="(item2,index2) in item.children" :key="index2+index" :index="JSON.stringify(item2.folder_id)">
                          <template slot="title"><i class="el-icon-folder"></i>{{item2.folder_name}}</template>
                          <el-menu-item v-for="(item3,index3) in item2.children" :key="index3+index2+index" :index="JSON.stringify(item3.folder_id)" ><i class="el-icon-folder"></i>{{item3.folder_name}}</el-menu-item>
                      </el-submenu>
                  </el-submenu>
              </el-submenu>
            <el-menu-item index="/index/allNote">
              <i class="el-icon-menu"></i>
              <span slot="title">所有笔记</span>
            </el-menu-item>
            <el-menu-item index="/index/star">
              <i class="el-icon-star-on"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="/index/trashcan">
              <i class="el-icon-delete"></i>
              <span slot="title">回收站</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Aside",
        data(){
            return{
                height:700,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'folder_name'
                }
              };
            },
        methods:{
            handleNodeClick(data,node,tree){
                this.$emit('folder',data)
            },
            clickCommand(command){
                this.$message({
                    type: 'error',
                    message: '命令：'+command+'；功能正在开发中...'
                });
            },
            getFolder(){
                this.$api.Request({
                    url:'/api/v1/folder',
                    method:'get',
                }).then((response)=>{
                    this.data = response.data.data;
                    console.log(this.data);
                })
            },
            selectHandler(index,path){
                this.$emit('params',index);
            },
            openFolder(index,path){
                if (index == 'folder')return false;
                this.$router.push('/folder/'+index)
            }

        },
        created() {
            this.height = window.innerHeight-60;
            this.getFolder()
        },
    }
</script>

<style scoped>

  .aside{
    position: relative;
    bottom: 0;
    top: 0;
    border-right: solid 1px #e6e6e6;
  }
  .el-menu{
    border-right:none;
  }


</style>
