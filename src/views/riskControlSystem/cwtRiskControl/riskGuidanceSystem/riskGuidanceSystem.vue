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
                        <div class="grid-content bg-purple col_main"></div>
                    </el-col>
                    <el-col :span="8" class="col_B">
                        <div class="grid-content bg-purple col_main"></div>
                    </el-col>
                    <el-col :span="8" class="col_C">
                        <div class="grid-content bg-purple col_main"></div>
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
        // ----
        let containerStyle = document.getElementsByClassName('guidance_container')[0] ;
        let containerHeight = viewHeight - 64 - 60 + 'px' ;
        containerStyle.style.height = containerHeight ;
        // ----
        // 设置表格高度（自适应）
        this.setTableScollHeight() ;
    },
    methods: {
        // 设置表格高度（自适应）
        setTableScollHeight(){
            let containerStyle, containerHeight, contentStyle, contentHeight ;
            const me = this ;
            window.onresize = function temp(){ 
                containerStyle = document.getElementsByClassName('guidance_container')[0] ;   
                containerHeight = document.body.offsetHeight - 64 - 60 + 'px' ;
                containerHeight.style.height = containerHeight ; 
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
