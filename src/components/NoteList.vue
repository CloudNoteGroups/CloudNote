<template>
<div >
    <el-menu @select="selectNote" :style="{height:height+'px',width:'200px'}" :default-active="index">
      <div style="text-align: center;margin:5px 0">
        <el-button type="primary" @click="addNote">+</el-button>
      </div>
      <el-menu-item :index="item.note_id.toString()" :class="(key == 0 && index == '0')?activeClass:''" v-for="(item,key) in noteList2" :key="key" >
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
</div>
</template>
<script>
    export default {
        name: "NoteList",
        props: ['noteList','folder'],
        data(){
          return{
              height:700,
              index:'0',
              activeClass:'active is-active',
              noteList2:null
          }
        },
        created() {
            this.height = window.innerHeight-60;
            this.$emit('note',this.noteList[0]);
            this.noteList2 = this.noteList
        },
        methods:{
            selectNote(index,indexPath){
                let note = null;
                for(var i=0;i<this.noteList.length;i++){
                    if (index == this.noteList[i].note_id){
                        note = this.noteList[i];
                        break;
                    }
                }
                this.activeClass='';
                this.$emit('note',note);
                this.index = index;
            },
            addNote(){
                this.$api.AddNote(this.folder.folder_id,'新笔记','')
                    .then(response=>{
                        let note = response.data.data;
                        this.noteList2.push(note);
                        this.index = note.note_id.toString()
                    })
            }
        },
        mounted(){
            let that = this;
            this.$watch('noteList',res=>{
                this.activeClass='active is-active';
                this.noteList2 = res;
                let note = res[0];
                this.$emit('note',note);
            });
            this.$watch('index',res=>{
                let note = null;
                for(var i=0;i<this.noteList.length;i++){
                    if (res == this.noteList[i].note_id){
                        note = this.noteList[i];
                        break;
                    }
                }
                this.$emit('note',note)
            })
        },
    }
</script>

<style scoped>
  .el-menu{
    border-top: solid 1px #e6e6e6;
  }
</style>
