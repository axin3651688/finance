<template>
    <div>
        <div>
            <div class="risk-feed-back-top">
                <el-tabs type="border-card">
                    <el-tab-pane label="风险追踪" v-if="!this.isReportType">
                        <risk-single-track></risk-single-track>
                    </el-tab-pane>
                    <el-tab-pane label="风险报告追踪" v-if="this.isReportType">
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
    import {getGlobleControlState} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"
    export default {
        name: "riskTrack",
        mixins:[cwtPublicJS],
        components: {
            riskSingleTrack,
            riskReportTrack
        },
        props: {},
        data() {
            return {
                isReportType: true
            }
        },
        created() {
            let _this = this;
            getGlobleControlState().then((res)=>{
                if(res.data.code === 200){
                    _this.isReportType = res.data.data[0].reporttype === 0;
                }
            })
        },
        mounted(){
            this.doNotShowDim(true);
        },
        methods: {}
    }
</script>

<style scoped>

</style>