<template>
    <div>
        <div class="title">
            <el-input placeholder="标题" @change="saveNote" v-model="note.title">
                <template slot="prepend">标题</template>
            </el-input>
        </div>
        <mavon-editor
                v-model="note.content"
                ref="md"
                @change="change"
                @save="saveNote"
                :ishljs="true"
                :style="{maxHeight:height+'px',minHeight:height+'px'}"
        />
    </div>
</template>

<script>

    export default {
        name: "Content",
        data(){
          return {
              note:{
                  id:'',
                  title:'',
                  content:'',
              },
              height:'',
              html:'',
          }
        },
        created() {
            this.getNoteDetail();
            this.height = window.innerHeight-170;
        },

        methods:{
            async getNoteDetail(){
                const {id} = this.$route.params;
                this.note.id = id;
                this.$api.NoteDetail(id)
                    .then((response)=>{
                        const {title,content} = response.data.data;
                        this.note.title = title;
                        this.note.content = content;
                    })
            },
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
            async saveNote(){
                const {id,title,content} = this.note;
                this.$api.SaveNote(id,title,content)
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
        },
        watch:{
            '$route'(){
                this.getNoteDetail()
            }
        }
    }
</script>

<style scoped>
    .title{
        min-height: 60px;
        margin-top: 10px
    }
</style>