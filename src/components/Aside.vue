<template>
  <div>
    <div>
      <el-aside :style="{height:height+'px',width:'200px'}" class="aside">
        <el-col>
          <el-menu
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>笔记归档</span>
              </template>
              <el-tree style="padding-left:40px;font-size: 20px" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-submenu>
            <el-menu-item index="2" @click="allNote">
              <i class="el-icon-menu"></i>
              <span slot="title">所有笔记</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">与我分享</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
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
            allNote(){
                this.$emit('params','allNote')
            }
        },
        created() {
            this.height = window.innerHeight-60;
            this.$api.Request({
                url:'/api/v1/folder',
                method:'get',
            }).then((response)=>{
                this.data = response.data.data
            })
        }
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
