<template>
<!--
    name: sjz
    说明：风险指引制度的组件
-->
    <div id="riskGuidanceSystem">
        <!--  -->
        <el-header class="guidance_header">
            <el-button class="header_btn" type="warning" plain><i class="el-icon-edit-outline tubiao"></i>修 改</el-button>
            <el-button class="header_btn" type="primary" plain><i class="iconfont icon-daochu tubiao"></i>导 出</el-button>
        </el-header>
        <!--  -->
        <el-container class="guidance_container">
            <el-aside class="guidance_aside">

            </el-aside>
            <!--  -->
            <el-main class="guidance_main">
                <el-row :gutter="20">
                    <el-col :span="8" class="col_A">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="8" class="col_B">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="8" class="col_C">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){
        // debugger
       
    },
    mounted(){
        // debugger
        let viewHeight = document.body.offsetHeight ;
        let docStyle = document.getElementsByClassName('guidance_container')[0] ;
        let heights = viewHeight - 64 - 60 + 'px' ;
        docStyle.style.height = heights ; 
        // 设置表格高度（自适应）
        this.setTableScollHeight() ;
    },
    methods: {
        // 设置表格高度（自适应）
        setTableScollHeight(){
            let docStyle, heights ;
            const me = this ;
            window.onresize = function temp(){ 
                docStyle = document.getElementsByClassName('guidance_container')[0] ;   
                heights = document.body.offsetHeight - 64 - 60 + 'px' ;
                docStyle.style.height = heights ;       
            };
        }
    }
}
</script>

<style scoped lang="scss" src="./riskGuidanceStyle.scss"></style>
<style>
   .riskGuidanceSystem .el-main {
       
   } 
</style>
