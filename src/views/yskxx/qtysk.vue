<template>
    <div id="qtysk">
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
    name: "qtysk",
    data(){
        return{
            jsonAdress: "",
            jsonId: "qtysk"
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
                this.jsonAdress = "cnbi/yskxx/qtysk.json" ;
            }else{
                this.jsonAdress = "cnbi/yskxx/qtyskej.json" ;
            }
        }
    }
}
</script>
<style scoped>

</style>
