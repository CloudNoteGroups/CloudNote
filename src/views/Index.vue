<template>
  <div>

    <Header></Header>
    <el-container>
      <Aside v-on:folder="folderData" v-on:params="getParams"></Aside>
      <NoteList :noteList="noteList" :folder="folder" v-if="noteListLength>0" v-on:note="noteData"></NoteList>
      <el-main>
        <div v-if="isShow" style="min-height: 60px">
          <el-input placeholder="标题" @change="saveNote" v-model="note.title">
            <template slot="prepend">标题</template>
          </el-input>
        </div>
        <mavon-editor v-if="isShow"
          v-model="note.content"
          ref="md"
          @change="change"
                      @save="saveNote"
                      :ishljs="true"
          :style="{maxHeight:height+'px',minHeight:height+'px'}"
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
              note:{
                  title:'',
                  content:'',

              },
              html:'',
              height:0,
              isShow:false,

          }
        },
        components:{
            Header,
            Aside,
            NoteList,

        },
        created(){
          this.height = window.innerHeight-170;
        },
        methods:{
            folderData(folder){
                this.$api.NoteList(folder.folder_id).then((response)=>{
                    this.noteList = response.data.data;
                    this.noteListLength = this.noteList.length;
                    this.content = ''
                });
                this.folder = folder;
                // console.log(this.noteList)
            },
            getParams(params){
                switch (params) {
                    case 'allNote':
                        this.$api.NoteList().then(response=>{
                            this.folder = null;
                            this.  = response.data.data;
                            this.noteListLength = this.noteList.length;
                        });
                        break
                }
            },
            noteData(note){
                this.isShow=true;
                this.note = note

            },
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
            saveNote(){
                this.$api.SaveNote(this.note.note_id,this.note.title,this.note.content)
                    .then(response=>{
                        this.$notify({
                            title: '成功',
                            message: '保存成功~',
                            type: 'success',
                            position: 'bottom-right',
                            offset:100
                        });
                    })
            },


        }
    }
</script>

<style scoped>
  .el-header{
    padding: 0;
  }

</style>
