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
            <el-aside class="guidance_aside container_aside col_A">
                <div v-if="directory.length > 0" class="col_A">
                    <el-menu :default-active="directory[0].index" class="el-menu-vertical-demo asideA col_A">
                        <el-menu-item class="el-menu-vertical_title asideA_item col_A" v-for="(item, index) in directory" :key="item.index" :index="item.index" @click.native="directoryClick(item)">
                            <a slot="title">{{ item.sname }}</a>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="aside_title_message" v-else>暂无数据显示！</div>
            </el-aside>
            <!-- 正文部分 -->
            <el-main class="guidance_main">
                <el-row :gutter="20">
                    <!-- 第一级 -->
                    <el-col :span="8" class="col_A">
                        <div class="grid-content bg-purple col_main">
                            <div class="aside_title_message" v-if="content_A.length == 0">暂无数据显示！</div>
                            <div v-else v-for="(item, index) in content_A" :key="item.id">
                                <div class="col_class" :class="{'first': index == first}" @click="contentClick(item,index)">{{ item.scontent }}</div>
                            </div>
                        </div>
                    </el-col>
                    <!-- 第二级 -->
                    <el-col :span="8" class="col_A">
                        <div class="grid-content bg-purple col_main">
                            <div class="aside_title_message" v-if="content_B.length == 0">暂无数据显示！</div>
                            <div v-else v-for="(item, index) in content_B" :key="item.id">
                                <div class="col_class" :class="{'second': index == second}" @click="contentClick2(item,index)">{{ item.scontent }}</div>
                            </div>
                        </div>
                    </el-col>
                    <!-- 第三级 -->
                    <el-col :span="8" class="col_A">
                        <div class="grid-content bg-purple col_main">
                            <div class="aside_title_message" v-if="content_C.length == 0">暂无数据显示！</div>
                            <div v-else v-for="(item, index) in content_C" :key="item.id">
                                <div class="col_classA">{{ item.scontent }}</div>
                            </div>
                        </div>
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
import { debounce } from '../../../../utils/index.js';
export default {
    components: {
        directoryDialog
    },
    data(){
        return {
            me: this ,                          // this对象
            directory: [],                      // 目录数组
            dialogFormVisible_A: false ,        // 修改按钮弹出框的显示|隐藏的控制
            dialogFormVisible3_A:false ,
            content: [] ,                       // 总内容数组
            content_A: [] ,                     // 内容1数组
            content_B: [] ,                     // 内容2数组
            content_C: [] ,                     // 内容3数组
            first: 0 ,
            second:0 ,
            third: 0 ,        
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
            let me = this ;
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
                    me.contentRequest() ; // 内容查询方法
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * 内容查询接口
         */
        contentRequest(){ 
            let me = this ;
            let params = {
                titleId : 1 ,
	            sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => {  
                if(res.data.code === 200) {
                    me.content = res.data.data ;
                    let cc = res.data.data.filter(item => { 
                        return item.catalogname == me.directory[0].sname ;
                    });
                    // 内容的处理
                    me.contentsProcessing(cc) ;
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * 内容的处理
         */
        contentsProcessing(cc){
            let me = this ;
            let aa, bb ;
            me.content_A = cc.filter(item2 => { return item2.nlevel === 1 }) ;
            aa = cc.filter(item3 => { return item3.nlevel === 2 }) ;
            bb = cc.filter(item4 => { return item4.nlevel === 3 }) ;
            me.content_B = aa.filter(item33 => { return me.content_A[0].id == item33.pid }) ;
            me.content_C = bb.filter(item44 => { return me.content_B[0].id == item44.pid }) ;
        },
        /**
         * 修改按钮
         */
        modifyClick(){
            this.dialogFormVisible_A = !this.dialogFormVisible_A ;
        },
        /**
         * 目录点击事件
         */
        directoryClick(item) {
            // debugger
            let me = this ;
            me.content_A = [] ;
            me.content_B = [] ;
            me.content_C = [] ;
            let cc = me.content.filter(res => {
                return res.catalogname == item.sname ;
            });
            // 内容的处理
            me.contentsProcessing(cc) ;
            // me.content_A = cc.filter(item2 => { return item2.nlevel === 1 }) ;
            // me.content_B = cc.filter(item3 => { return item3.nlevel === 2 }) ;
            // me.content_C = cc.filter(item4 => { return item4.nlevel === 3 }) ;
        },
        /**
         * 内容点击按钮
         */
        contentClick(item, index) { debugger   // 一级 
            let $index ; 
            this.first = index;
            this.content_B = this.content.filter(res => {
                return res.pid == item.id ;
            });
            if(this.content_B.length === 0){
                this.content_C = [] ;
                return false ;
            } else if(this.content_B.length === 1){
                $index = 0 ;
            } else {
                $index = this.second ;
            }
            this.content_C = this.content.filter(res => {
                return res.pid == this.content_B[$index].id ;
            });
        },
        contentClick2(item, index) {   // 二级
            this.second = index;
            if(this.content_B.length === 0){
                this.content_C = [] ;
                return false ;
            }
            this.content_C = this.content.filter(res => {
                return res.pid == item.id ;
            });
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
<style scoped>
    /* 内容的样式设置 */
    .col_class, .col_classA {
        margin-bottom: 10px;
        line-height: 24px;
        font-family: '宋体';
        cursor: pointer;
        padding: 0 10px 0 10px ;
    }
    .col_class:hover {
        color: teal ;
        background-color:antiquewhite;
    }
    .first {
        color: teal;
    }
    .second {
        color: teal;
    }


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.col_A ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.col_A ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(112, 238, 90, 0.3);
    border-radius: 1px;
    background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.col_A ::-webkit-scrollbar-thumb {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 1px rgba(69, 226, 64, 0.3);
    /* background-color: #9fd467; */
    background-color: #dcdfe6;
}
</style>
