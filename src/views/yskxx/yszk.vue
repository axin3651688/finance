<template>
    <div id="yszk">
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
    name: "yszk",
    data(){
        return{
            jsonAdress: "",
            jsonId: "yszk"
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
                this.jsonAdress = "/cnbi/json/yskxx/yszk.json" ;
            }else{
                this.jsonAdress = "/cnbi/json/yskxx/yszkej.json" ;
            }
        }
    }
}
</script>
<style scoped>

</style>
