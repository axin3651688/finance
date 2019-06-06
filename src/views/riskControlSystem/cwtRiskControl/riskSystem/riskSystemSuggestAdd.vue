<template>
    <div>
        <el-form ref="form"  label-width="90px">
            <el-form-item label="报告名称：">
                <el-input v-model="riskSuggestAddData.riskName" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议日期：">
                <el-input v-model="riskSuggestAddData.riskDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议人员：">
                <el-input v-model="riskSuggestAddData.riskUser" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议内容：">
                <el-input
                        type="textarea"
                        :rows="4"
                        v-model="riskSuggestAddData.riskContent"
                        placeholder="我是缺省内容"
                >
                </el-input>
            </el-form-item>

            <div class="suggest-add-button">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "riskSystemSuggestAdd",
        components: {},
        props: {
            riskSuggestAddData: Object
        },
        data() {
            return {
                form:{
                    name:'ppp'
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * 建议提交事件
             */
            onSubmit(){

            }
        }
    }
</script>

<style scoped>
.suggest-add-button{
    text-align: right;
}
</style>