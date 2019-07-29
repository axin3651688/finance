<template>
    <div>
        <div>
            <div class="risk-feed-back-top">
                <!--<el-tabs type="border-card">-->
                    <div v-if="!this.isReportType">
                        <risk-single-track
                                :isPeriodNow="isPeriodNow"
                        ></risk-single-track>
                    </div>
                    <div v-if="this.isReportType">
                        <risk-report-track
                                :isPeriodNow="isPeriodNow"
                        ></risk-report-track>
                    </div>
                <!--</el-tabs>-->
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
        mixins: [cwtPublicJS],
        components: {
            riskSingleTrack,
            riskReportTrack
        },
        props: {},
        data() {
            return {
                isReportType: true,
                isPeriodNow: false
            }
        },
        created() {
            // let _this = this;
            // getGlobleControlState().then((res) => {
            //     debugger;
            //     if (res.data.code === 200) {
            //         _this.isReportType = res.data.data[0].reporttype === 0;
            //         _this.isPeriodNow = res.data.data[0].periodtype === 1;
            //     }
            // })
        },
        mounted() {
            this.doNotShowDim(true);
        },
        methods: {}
    }
</script>

<style scoped>

</style>