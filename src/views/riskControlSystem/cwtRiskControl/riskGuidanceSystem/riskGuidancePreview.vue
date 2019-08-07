<template>
    <div id="riskGuidancePreview">
        <el-container>
            <el-header class="riskGuidance_header header01">
                <span>风险指引制度预览图</span>
            </el-header>
            <el-main class="riskGuidance_main">
                <el-row class="elrow" :gutter="0">
                    <el-col class="elcol" :span="6"></el-col>
                    <el-col class="elcol" :span="12">
                        <div class="riskGuidance-contentA bg-purple" contenteditable>
                            
                        </div>           
                    </el-col>
                    <el-col class="elcol" :span="6"></el-col>
                </el-row>
            </el-main>
            <el-footer class="riskGuidance_footer">
                <span>首页</span>
                <el-divider direction="vertical"></el-divider>
                <span>关于我们</span>
                <el-divider direction="vertical"></el-divider>
                <span>留言板</span>  
                <el-divider direction="vertical"></el-divider>
                <span class="fuzhuwenzi">©2019 安徽经邦 版权所有</span>        
            </el-footer>
        </el-container>
        <!-- 回到顶部 -->
        <el-backtop target=".riskGuidance-contentA" :visibility-height="100" :right="40" :bottom="100"></el-backtop>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted() {
        // 设置高度
        this.setClientHeight() ;
    },
    methods: {
        // 设置高度
        setClientHeight(){
            let me = this ;
            // 窗口的高度
            let wH =  document.body.offsetHeight ;
            // 获取中间main的高度
            let cH = document.getElementsByClassName('riskGuidance_main')[0] ;
            // 设置中间main的高度
            cH.style.height = wH - 120 + 'px' ;
            // 窗口改变时触发
            window.onresize = function temp(){
                cH.style.height =  document.body.offsetHeight - 120 + 'px' ;
            };
        }
    }
}
</script>

<style scoped>
/* color */
/* #ffd04b; #303133; #B3C0D1; #9fd467; */
#riskGuidancePreview {
    width: 100% ;
    height: 100% ;
    background-color: #303133 ;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
/* 头部 + 尾部*/
.riskGuidance_header, .riskGuidance_footer {
    width: 100% ;
    box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
    background-color: rgb(50, 54, 57);
    color: rgb(241, 241, 241);
    font-size: 16px;
    text-align: center;
    line-height: 60px; 
}
.header01 {
    text-align: left ;
    letter-spacing: 5px;
}
.riskGuidance_main {
    background-color: #E9EEF3;
    width: 100% ;
    padding: 0px 0 0px 0 ;
}
.elrow { height: 100% ; }
.elcol {
    height: 100%;
    min-width: 20px ;
    background-color: #606266; 
}
.riskGuidance-contentA {
    height: 100%;
    min-width: 600px;
    overflow: auto;
    line-height: 26px;
    padding: 0 10px 0 10px ;
    color: #303133;
    background-color: #fff ; 
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.fuzhuwenzi {
    font-size: 12px ;
    color: #909399
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 5px;
    height: 1px;
    background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(112, 238, 90, 0.3);
    border-radius: 5px;
    background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 1px rgba(69, 226, 64, 0.3);
    background-color: #909399
}
</style>
