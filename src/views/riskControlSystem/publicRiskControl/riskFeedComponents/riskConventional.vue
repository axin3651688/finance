<template>
    <div>
        <el-row>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">风险概述：</span>
                    <el-input type="textarea" :rows="4" v-model="formData.riskOverview"></el-input>
                </div>
            </el-col>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">采取措施：</span>
                    <el-input type="textarea" :rows="4" v-model="formData.riskMeasure"></el-input>
                </div>
            </el-col>
            <el-col>
                <div class="top-form-contents">
                    <span style="min-width: 70px;width: 70px">应对建议：</span>
                    <el-input type="textarea" :rows="4" v-model="formData.riskSuggest"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "riskConventional",
        components: {},
        props: {
            formData: Object
        },
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
    .top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }
</style>