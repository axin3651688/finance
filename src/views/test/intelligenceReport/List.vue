<template>
    <div>
        <List :data="data" v-if="data.length&&columns.length" :columns="columns"></List>
    </div>
</template>
<script>
import List from '@c/BiList.vue'
    export default {
        components:{
            List
        },
        data(){
            return{
              data:[],
              columns:[]
            }
        },
        mounted(){
            this.axios.get('/api/list').then((res) => {
            this.data = res.data.data
            this.columns = res.data.columns
            })
        }
        
    }
</script>
<style>
    
</style>