<template>
    <div>
        <div>
            <div class="risk-feed-back-top">
                <el-tabs type="border-card">
                    <el-tab-pane label="风险追踪">
                        <risk-single-track></risk-single-track>
                    </el-tab-pane>
                    <el-tab-pane label="风险报告追踪">
                        <risk-report-track></risk-report-track>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import riskReportTrack from './riskReportTrack'
    import riskSingleTrack from './riskSingleTrack'
    export default {
        name: "riskTrack",
        components: {
            riskSingleTrack,
            riskReportTrack
        },
        props: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>