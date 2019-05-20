<template>
    <div id="yfzk">
        <ai-module 
        :jsonAdress="jsonAdress"
        :jsonId="jsonId">
        </ai-module>
    </div>
</template>
<script>
import aiModule from "@v/yskxx/AiModule"
export default {
    components: {
        aiModule
    },
    name: "yfzk",
    data(){
        return{
            jsonAdress: "",
            jsonId: "yfzk"
        }
    },
    created(){
        // debugger
        this.jsonAdressNew();
    },
    mounted(){

    },
    methods: {
        jsonAdressNew(){
            // 0合并公司/ 1单体公司
            if(this.$store.getters.treeInfo.nisleaf){
                this.jsonAdress = "cnbi/yskxx/yfzk.json" ;
            }else{
                this.jsonAdress = "cnbi/yskxx/yfzkej.json" ;
            }
        }
    }
}
</script>
<style scoped>

</style>
