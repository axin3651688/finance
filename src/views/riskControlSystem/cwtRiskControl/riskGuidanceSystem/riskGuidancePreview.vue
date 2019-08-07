<template>
    <div id="riskGuidancePreview">
        <el-container>
            <el-header class="riskGuidance_header">
                <span>风险指引制度预览图</span>
            </el-header>
            <el-main class="riskGuidance_main">

            </el-main>
            <el-footer class="riskGuidance_footer">
                <span>首页</span>

                <span>关于我们</span>

                <span>留言板</span>          
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style scoped>
#riskGuidancePreview {
    width: 100% ;
    height: 100% ;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
/* 头部 + 尾部*/
.riskGuidance_header, .riskGuidance_footer {
    width: 100% ;
    /* background-color: #B3C0D1; */
    background-color: #303133 ;
    /* color: #333; */
    /* color: #ffd04b; */
    color: #fff ;
    text-align: center;
    line-height: 60px; 
}
</style>
