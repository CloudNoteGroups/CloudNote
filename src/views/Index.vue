<template>
  <div>
    <Header></Header>
    <el-container>
      <Aside v-on:folder="folderData" v-on:params="getParams"></Aside>
        <router-view></router-view>
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
              dataType:'all' // ['all','star','trashcan','folder']
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
                    this.dataType = 'folder';
                    this.content = ''
                });
                this.folder = folder;
            },
            getParams(params){
                switch (params) {
                    case 'allNote':
                        this.$api.NoteList().then(result=>{
                            this.folder = null;
                            this.noteList = result.data.data;
                            this.noteListLength = this.noteList.length==0?1:this.noteList.length;
                            this.dataType = 'all';
                        });
                        break;
                    case 'trashcan':
                        this.dataType = 'trashcan';
                        console.log('垃圾箱功能');
                        break;
                    case 'star':
                        this.$api.CollectList().then(result => {
                            this.folder = null;
                            this.noteList = result.data.data;
                            this.noteListLength = this.noteList.length==0?1:this.noteList.length;
                            this.dataType = 'star';
                        });
                        break;
                }
            },
            noteData(note){
                this.isShow=true;
                this.note = note

            },



        }
    }
</script>

<style scoped>
  .el-header{
    padding: 0;
  }

</style>
