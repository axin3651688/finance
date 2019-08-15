<template>
    <!--
        name: sjz
        说明：风险指引制度弹出层
        父组件：riskGuidance.vue
    -->
    <div id="riskGuidanceDialog">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="30%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="cancelClick">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        // 父组件大对象
        newThis: Object
    },
    data(){
        return {
            dialogVisible1: true ,      // 默认显示
        }
    },
    methods: {
        // 取消按钮
        cancelClick() {
            this.newThis.dialogVisible_first = false ;
        }
    }
}
</script>
<style>

</style>
