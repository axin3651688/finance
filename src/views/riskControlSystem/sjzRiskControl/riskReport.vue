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
export default {
    name: 'treeTableDemo',
    components: {
        aiModule
    },
    data(){
        return {
            // json地址
            jsonAdress: "cnbi/risk/riskReport.json",
            // 高度
            tableHeight: 130
        }
    },
    created(){

    },
    mounted(){

    },
    methods: {

    }
}
</script>
<style scoped>

</style>
