<template>
  <div>

    <Header></Header>
    <el-container>
      <Aside v-on:folder="folderData"></Aside>
      <NoteList :noteList="noteList" v-if="noteListLength>0" v-on:note="noteData"></NoteList>
      <el-main>
        <mavon-editor v-if="content"
          v-model="content"
          ref="md"
          @change="change"
                      :ishljs="true"
          :style="{minHeight:'100%'}"
        />
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Header from '../components/Header'
  import Aside from '../components/Aside'
  import NoteList from "../components/NoteList";
    export default {
        name: "Index",
        data(){
          return{
              folder:null,
              noteList:null,
              noteListLength:0,
              content:'',
              html:'',
              height:0,
          }
        },
        components:{
            Header,
            Aside,
            NoteList,

        },
        created(){
          this.height = window.innerHeight-60;
          console.log(this.height)
        },
        methods:{
            folderData(folder){
                this.$api.NoteList(folder.folder_id).then((response)=>{
                    this.noteList = response.data.data;
                    this.noteListLength = this.noteList.length
                })
                // console.log(this.noteList)
            },
            noteData(note){
                this.content ='<h1>'+note.content+'</h1>';
                console.log(this.$refs)
            },
            clickHander(){
                console.log(this.noteList);
            },
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
        }
    }
</script>

<style scoped>
  .el-header{
    padding: 0;
  }
</style>
