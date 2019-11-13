<template>
<div >
    <el-menu :style="{height:height+'px',width:'200px'}" :default-active="index">
      <el-menu-item index="1" v-for="(item,key) in noteList" :key="key" :select="selectNote(item)">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
</div>
</template>
<script>
    export default {
        name: "NoteList",
        props: ['noteList'],
        data(){
          return{
              height:700,
              index:'1'
          }
        },
        created() {
            console.log(this.noteList);
            this.height = window.innerHeight-60;
        },
        methods:{
            selectNote(note){
                this.$emit('note',note)
            }
        }
    }
</script>

<style scoped>
  .el-menu{
    border-top: solid 1px #e6e6e6;
  }
</style>
