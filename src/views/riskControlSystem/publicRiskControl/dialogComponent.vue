<template>
    <div>
        <div class="dialog-component">
            <div class="risk-reference">
                <a style="color: dodgerblue;">风险矩阵参照</a>
            </div>
            <div class="form-content">
                <el-form :inline="true" :model="formData" class="demo-form-inline">

                    <risk-header :formData="formData"></risk-header>
                    <risk-conventional :formData="formData"></risk-conventional>
                    <risk-instruction :formData="formData"></risk-instruction>
                    <risk-foot></risk-foot>

                </el-form>
            </div>
        </div>

    </div>
</template>

<script>

    import riskHeader from './riskFeedComponents/riskHeader'
    import riskConventional from './riskFeedComponents/riskConventional'
    import riskInstruction from './riskFeedComponents/riskInstruction'
    import riskFoot from './riskFeedComponents/riskFoot'

    export default {
        name: "dialogComponent",
        components: {

            riskHeader,
            riskConventional,
            riskInstruction,
            riskFoot
        },
        props: {
            dialogData: Object,
        },
        data() {
            return {
                formData: {
                    riskType: '自动填入',
                    riskProbability: '自动填入',
                    riskDegree: '自动填入',
                    riskLevel: '重大',
                    riskOverview: '自动带出，不可编辑',
                    riskMeasure: '自动查询风险识别的',
                    riskSuggest: '自动查询风险识别的',
                    countermeasures: '风险应对策略，不可编辑',
                    instruction: '显示批示内容，不可编辑',
                    riskFeed: '',
                },
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    }
</script>

<style scoped>
    .risk-reference {
        display: flex;
        margin-bottom: 20px;
        justify-content: flex-end;
    }

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }

</style>