<template>
<!--
    name: sjz
    说明：风险指引制度的组件
-->
    <div id="riskGuidanceSystem">
        <!-- 头部 -->
        <el-header class="guidance_header">
            <el-button class="header_btn" type="warning" plain @click="modifyClick"><i class="el-icon-edit-outline tubiao"></i>修 改</el-button>
            <el-button class="header_btn" type="primary" plain @click="importClick"><i class="iconfont icon-daochu tubiao"></i>导 出</el-button>
        </el-header>
        <!-- 内容部分 -->
        <el-container class="guidance_container">
            <!-- 目录部分 -->
            <el-aside class="guidance_aside container_aside">
                <div v-if="directory.length > 0">
                    <el-menu :default-active="directory[0].index" class="el-menu-vertical-demo asideA">
                        <el-menu-item class="el-menu-vertical_title asideA_item" v-for="(item, index) in directory" :key="item.id" :index="item.index">
                            <a slot="title">{{ item.sname }}</a>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="aside_title_message" v-else>暂无数据显示！</div>
            </el-aside>
            <!-- 正文部分 -->
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
        <!-- 
            弹出框部分(☆☆★◆♣▁㈱㊣™™)
         -->
         <!-- 修改按钮的弹出框 -->
        <div class="diolag_A" v-if="dialogFormVisible_A">
            <directory-dialog :newThis="me" :data="directory"></directory-dialog>
        </div>
    </div>
</template>
<script>
// 引用接口
import {
    // 目录查询接口
    selectAll
} from './riskInterface.js' ;

// 引用 * 目录修改 * 弹出框组件
import directoryDialog from './directoryDialog.vue' ;
export default {
    components: {
        directoryDialog
    },
    data(){
        return {
            me: this ,                          // this对象
            directory: [],                      // 目录数组
            dialogFormVisible_A: false ,        // 修改按钮弹出框的显示|隐藏的控制
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
        // 目录查询接口
        this.directoryRequest() ;
        // 内容查询接口
        this.contentRequest() ;
    },
    methods: {
        /**
         * 设置表格高度（自适应）
         */
        setTableScollHeight(){
            let containerStyle, containerHeight, contentStyle, contentHeight ;
            const me = this ;
            window.onresize = function temp(){ 
                containerStyle = document.getElementsByClassName('guidance_container')[0] ;   
                containerHeight = document.body.offsetHeight - 64 - 60 + 'px' ;
                containerStyle.style.height = containerHeight ; 
            };
        },
        /**
         * 目录查询接口
         */
        directoryRequest(){
            const me = this ;
            let data ;
            let params = {
                titleId : 1,
                sqlKey : "RiskGuide.selectCatalog"
            }
            selectAll(params).then(res => { 
                if(res.data.code === 200) {
                    data = res.data.data ;
                    data.forEach(yuu => { yuu.index = yuu.id + "" ; }) ;
                    me.directory = data.filter(item => { return item.pid === 0 }) ;
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * 内容查询接口
         */
        contentRequest(){ debugger
            const me = this ;
            let params = {
                titleId : 1 ,
	            sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => { debugger
                if(res.data.code === 200) {
                    
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * 修改按钮
         */
        modifyClick(){
            this.dialogFormVisible_A = !this.dialogFormVisible_A ;
        },
        /**
         * 导出按钮
         */
        importClick(){
            this.$message('暂无此功能！') ;
        }
    }
}
</script>

<style scoped lang="scss" src="./riskGuidanceStyle.scss"></style>
<style>
   
</style>
