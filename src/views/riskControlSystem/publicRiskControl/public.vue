<template>
    <div>
        <!--
            风险追踪
        -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="风险追踪" name="first">
                <ai-module :jsonAdress="jsonAdress2" :tableHeight="tableHeight"></ai-module>       
            </el-tab-pane>
            <el-tab-pane label="风险报告追踪" name="second">
                <ai-module :jsonAdress="jsonAdress" :tableHeight="tableHeight"></ai-module>       
            </el-tab-pane>
        </el-tabs>
    </div>
</template>>
<script>
import aiModule from "@v/riskControlSystem/publicRiskControl/AiModule";
export default {
    name: "treeTableDemo",
    components: {
        aiModule
    },
    data() {
        return {
            activeName: "first",
            jsonAdress: "cnbi/risk/riskTreePublic.json",
            tableHeight: 175,
            //---------------------------
            jsonAdress2: "cnbi/risk/riskTablePublic.json"
            // tableHeight2:135
        }
    },
    created() {

    },
    mounted () {},
    methods: {
        handleClick(a, b){
            // debugger

        }
    }
};
</script>
<style>

</style>