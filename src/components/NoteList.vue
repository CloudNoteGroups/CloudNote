<template>
<div>

  <div class="note-list-box" :style="{height:height+'px'}">
    <div class="top-btn" style="margin:5px 5px;">
        <div style="display: inline-block;width: 20%">
            <el-dropdown
                    :divided="true"
                    @command="clickCommand"

            >
            <el-button type="primary">
                <i class="markdown"></i><i class="el-icon-plus"></i> &nbsp;新建
            </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="MarkDown">新建MarkDown</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="Note">新建笔记</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="mindMapping">新建思维导图</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="flowChart">新建流程图</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="display: inline-block;width: 65%;float: right">
            <el-input placeholder="请输入文件名..." v-model="search" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchNote"></el-button>
            </el-input>
        </div>
    </div>
    <ul class="note-list">
      <li @mouseover="selectIn(item.note_id)"  @mouseout="selectOut" :class="index==item.note_id?'active':''"  v-for="(item,key) in noteList2" :key="key" @click="selectNote(item.note_id)">
        <div class="title" :class="select_li==item.note_id?'title-width':''">
          <MarkDown width="15" height="15"/><span>&nbsp;{{item.title}}</span>
        </div>
        <div class="action" v-show="select_li==item.note_id" >
          <el-button type="info" icon="el-icon-download" size="mini" circle @click="downLoad(item)"></el-button>
          <el-button type="success" :icon="item.is_collect?'el-icon-star-on':'el-icon-star-off'" size="mini" @click="Collect(item.note_id,item.is_collect)" circle></el-button>
          <el-button type="danger" icon="el-icon-close" size="mini" circle @click="removeNote(item.note_id)"></el-button>
        </div>
      </li>

    </ul>
  </div>
</div>
</template>
<script>
    import MarkDown from "./icon/MarkDown";
    export default {
        name: "NoteList",
        props: ['noteList','folder','dataType'],
        data(){
          return{
              height:700,
              index:'0',
              activeClass:'active is-active',
              noteList2:null,
              select_li:null,
              search:''
          }
        },
        components:{
            MarkDown
        },
        created() {
            this.height = window.innerHeight-60;
            this.noteList2 = this.noteList;
            const {id} = this.$route.params;
            this.index = id;

        },
        methods:{
            selectNote(index){
                this.activeClass='';
                this.index = index;
            },
            clickCommand(command){

                switch (command) {
                    case 'MarkDown':
                        this.addNote();
                        break;
                    default:
                        this.$message({
                            type: 'error',
                            message: '命令：'+command+'；功能正在开发中...'
                        });
                        break;
                }
            },
            searchNote(){
                this.$message({
                    type: 'error',
                    message: '搜索功能正在开发中...'
                });
            },
            addNote(){
                let folder_id = null;
                if (this.folder){
                    folder_id = this.folder.folder_id
                }
                this.$api.AddNote(folder_id,'新笔记','')
                    .then(response=>{
                        let note = response.data.data;
                        if (!this.noteList2){
                            this.noteList2 = [];
                        }
                        this.noteList2.push(note);
                        this.index = note.note_id.toString()
                    })
            },
            selectIn(note_id){
                this.select_li=note_id;
            },
            selectOut(){
                this.select_li=null;
            },
            /**************************
             * 从noteList中把等于note_id的删除
             * @param note_id
             **************************/
            removeNoteToNoteList(note_id){
                let index = 0;
                for (var i=0;i<this.noteList2.length;i++){
                    if (this.noteList2[i].note_id == note_id){
                        index = i;
                        break
                    }
                }
                this.noteList2.splice(index,1);
                this.index = this.noteList2[0].note_id.toString();
            },
            removeNote(note_id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.RemoveNote(note_id).then(response=>{
                          if (response.data.code == 200){
                              this.removeNoteToNoteList(note_id)
                              this.$message({
                                  type: 'success',
                                  message: '删除成功!'
                              });
                          }else{
                              this.$message({
                                  type: 'danger',
                                  message: '删除失败!'
                              });
                          }
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            Collect(note_id,is_collect){
                if (is_collect){
                    this.$confirm('是否取消收藏?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '已从收藏列表中删除!'
                        });
                        console.log(this.noteList2);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消..'
                        });
                    });
                }else{
                    this.$api.AddCollect(note_id)
                        .then(result => {
                            let code = result.data.code;
                            if (code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '收藏成功~'
                                });
                            }else if(code == 201){
                                this.$message({
                                    type: 'danger',
                                    message: result.data.message
                                });
                            }
                        })
                }

            },
            /**********************************
             * download .md File
             * @param fileName
             * @param content
             *********************************/
            downloadFileHelper(fileName, content){
                const aTag = document.createElement('a');
                const blob = new Blob([content]);

                aTag.download = fileName;
                aTag.style = "display: none";
                aTag.href = URL.createObjectURL(blob);
                document.body.appendChild(aTag);
                aTag.click();

                setTimeout(function () {
                    document.body.removeChild(aTag);
                    window.URL.revokeObjectURL(blob);
                }, 100);
              },
            downLoad(note){
                this.downloadFileHelper(note.title+'.md',note.content)
            }

        },
        mounted(){
            let that = this;
            this.$watch('noteList',res=>{
                this.activeClass='active is-active';
                if (res.length == 0){
                    return false;
                }
                this.noteList2 = res;
            });
            this.$watch('index',res=>{
                const {type} = this.$route.params;
                let path = '';
                if (type == 'folder'){
                    const {folder_id} = this.$route.params;
                    path = `/${type}/${folder_id}/${res}`;
                }else{
                    path = `/index/${type}/${res}`;
                }
                console.log(path);
                this.$router.push(path);
                // console.log(this.$route)
            });

        },
    }
</script>

<style scoped>
  .el-menu{
    border-top: solid 1px #e6e6e6;
  }
  .note-list{
    height: 100%;
    border-top: solid 1px #e6e6e6;
    border-right: solid 1px #e6e6e6;
    /*width: 300px;*/
  }
  .note-list li div{
    display: inline-block;

  }
  .title{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .title-width{
    width: 150px;
  }
  .note-list li{
    height: 50px;
    line-height: 50px;
    padding: 5px 10px;
    width: 100%;
    list-style: none;
    border-bottom:solid 1px #e6e6e6;
    cursor:pointer;
  }
  .active{
    background-color: #409EFF;
    color: #fff;
  }
  .action{
    float: right;
    margin-right: 10px;
  }

  .select-li{

  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
      width: 6px;
      height: 6px;
      background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #FFF;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #AAA;
  }

  .note-list-box{
      overflow-y: auto;
      overflow-x: hidden;
      white-space: nowrap;
  }

    .top-btn{
        margin-left: 5px;
    }
</style>
