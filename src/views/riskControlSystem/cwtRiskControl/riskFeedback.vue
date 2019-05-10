<template>
    <div>
        <div class="risk-feed-back-top">
            <el-tabs v-model="activeName">
                <el-tab-pane label="风险反馈" name="first">
                    <risk-back></risk-back>
                </el-tab-pane>
                <el-tab-pane label="汇总反馈" name="second">
                    <ai-module :jsonAdress="jsonAdress" :tableHeight="tableHeight"></ai-module>  
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import riskBack from '../publicRiskControl/riskBack'
    import aiModule from "@v/riskControlSystem/publicRiskControl/AiModule";
    export default {
        name: "riskFeedback",
        components:{
            riskBack,
            aiModule
        },
        data(){
            return {
                activeName: "first",
                jsonAdress: "cnbi/risk/riskfeedback.json",
                tableHeight: 190
            }
        }
    }
</script>

<style scoped>

</style>