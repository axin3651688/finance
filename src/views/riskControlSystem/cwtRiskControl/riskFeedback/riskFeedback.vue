<template>
    <div>
        <div class="risk-feed-back-top">
            <el-tabs type="border-card">
                <el-tab-pane label="风险反馈" v-if="!this.isReportType">
                    <risk-back
                            :isPeriodNow="isPeriodNow"
                    ></risk-back>
                </el-tab-pane>
                <el-tab-pane label="报告反馈" v-if="this.isReportType">
                    <report-back
                            :isPeriodNow="isPeriodNow"
                    ></report-back>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import riskBack from './riskBack'
    import reportBack from './reportBack'
    import {getGlobleControlState} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"

    export default {
        name: "riskFeedback",
        mixins: [cwtPublicJS],
        data() {
            return {
                isReportType: true,
                isPeriodNow: false
            }
        },
        mounted() {
            this.doNotShowDim(true);
        },
        components: {
            riskBack,
            reportBack
        },
        created() {
            let _this = this;
            getGlobleControlState().then((res) => {
                if (res.data.code === 200) {
                    _this.isReportType = res.data.data[0].reporttype === 0;
                    _this.isPeriodNow = res.data.data[0].periodtype === 1;
                }
            })
        }
    }
</script>

<style scoped>

</style>