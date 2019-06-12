<template>
   <!-- 
       name: sjz
        风险报告页面 
    -->
    <div id="riskReport">
        <ai-module :jsonAdress="jsonAdress" :tableHeight="tableHeight"></ai-module>
    </div>
</template>
<script>
// 引用公共组件方法
import aiModule from "@v/riskControlSystem/sjzRiskControl/AiModule";
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'treeTableDemo',
    components: {
        aiModule
    },
    data(){
        return {
            // json地址
            jsonAdress: "/cnbi/json/risk/riskReport.json",
            // 高度
            tableHeight: 130
        }
    },
    created(){
        // 日期的控制显示
        this.showDimsControl() ;
    },
    mounted(){

    },
    computed: {
        ...mapGetters(["device", "user","showDims"])
    },
    methods: {
        // 日期的控制显示
        showDimsControl(){
            let me = this,showDims = this.showDims;
            showDims.year = true;
            showDims.month = true;
            showDims.company = true ;
        },
    }
}
</script>
<style scoped>

</style>
