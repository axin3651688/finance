<template>
    <div>
        <div class="top-form-contents" style="margin-top: 30px">
            <span>领导批示</span>
            <div class="top-form-contents" style="margin-bottom: 0">
                <p style="min-width: 98px;width: 150px;margin-left: 30px">风险策略为：</p>
                <el-input v-model="countermeasures" disabled></el-input>
            </div>
        </div>
        <div class="top-form-contents">
            <span style="min-width: 194px;width: 194px"></span>
            <el-input type="textarea" :rows="3" v-model="instruction" disabled></el-input>
        </div>

        <div class="top-form-contents">
            <span style="min-width: 194px;width: 194px">风险反馈</span>
            <el-input type="textarea" :rows="4" v-model="this.riskSuggest" placeholder="this.riskSuggest"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportInstruction",
        components: {},
        props: {
            contentDown:Object
        },
        data() {
            return {
                countermeasures:'应对策略自动显示，不可编辑',
                instruction:'显示批示内容，不可编辑',
                riskSuggest:'针对风险进行相关反馈录入'
            }
        },
        created() {
            let me = this;
            me.countermeasures = me.contentDown.content.countermeasures || me.countermeasures;
            me.instruction = me.contentDown.content.instruction || me.instruction
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
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }
</style>