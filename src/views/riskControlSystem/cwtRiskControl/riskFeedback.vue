<template>
    <div>
        <div class="risk-feed-back-top">
            <el-tabs type="border-card">
                <el-tab-pane label="风险反馈">
                    <risk-back></risk-back>
                </el-tab-pane>
                <el-tab-pane label="报告反馈">
                    <report-back></report-back>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import riskBack from '../publicRiskControl/riskBack'
    import reportBack from '../publicRiskControl/reportBack'
    export default {
        name: "riskFeedback",
        components:{
            riskBack,
            reportBack
        }
    }
</script>

<style scoped>

</style>