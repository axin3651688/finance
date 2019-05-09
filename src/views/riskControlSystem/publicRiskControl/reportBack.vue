<template>
<!--
    name: sjz
    风险反馈汇总
-->
    <div id="riskReport">
        <ai-module :jsonAdress="jsonAdress" :tableHeight="tableHeight"></ai-module>       
    </div>
</template>
<script>
// 引用公共组件方法
import aiModule from "@v/riskControlSystem/publicRiskControl/AiModule";
export default {
    name: 'treeTableDemo',
    components: {
        aiModule
    },
    data(){
        return {
            jsonAdress: "cnbi/risk/riskfeedback.json",
            tableHeight: 185
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
