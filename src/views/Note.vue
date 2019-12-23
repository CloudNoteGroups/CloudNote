<template>
    <div class="user" style="width: 100%">
        <div class="left-menu" style="width: 20%;display: inline-block;float: left">
            <NoteList :note-list="noteList"></NoteList>
        </div>
        <div class="right-content" style="width: 80%;display: inline-block;float: left">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NoteList from "../components/NoteList";


    export default {
        name: "Note",
        data(){
            return {
                noteList:[],
                type:'',
                folder_id:''
            }
        },
        components:{
            NoteList
        },
        created() {
            const {type,folder_id} = this.$route.params;
            this.GetNoteList(type,folder_id);
        },
        methods:{
            async GetNoteList(type,folder_id){
                if (this.type == type && this.folder_id == folder_id){
                    return  false;
                }
                this.type = type;
                this.folder_id = folder_id;
                switch (type) {
                    case 'allNote':
                        this.$api.NoteList().then(result=>{
                            this.noteList = result.data.data;
                        });
                        break;
                    case 'trashcan':
                        this.dataType = 'trashcan';
                        break;
                    case 'star':
                        this.$api.CollectList().then(result => {
                            this.folder = null;
                            this.noteList = result.data.data;
                            this.noteListLength = this.noteList.length==0?1:this.noteList.length;
                            this.dataType = 'star';
                        });
                        break;
                    case 'folder':
                        this.$api.NoteList(folder_id)
                            .then(result => {
                                this.noteList = result.data.data;
                            });
                        break;
                }
            }

        },
        watch:{
            '$route'(to,from){
                const {type,folder_id} = to.params;
                this.GetNoteList(type,folder_id);

            }
        }
    }
</script>

<style scoped>

</style>