<template>
<!--
    name: sjz
    说明：风险指引制度的组件@contextmenu.prevent="contentRightClick"
-->
    <div id="riskGuidanceSystem">
        <!-- 头部 -->
        <el-header class="guidance_header">
            <el-button class="header_btn" type="warning" plain size="mini" @click="modifyClick"><i class="el-icon-edit-outline tubiao"></i>修 改</el-button>
            <el-button class="header_btn" type="primary" plain size="mini" @click="importClick"><i class="iconfont icon-daochu tubiao"></i>导 出</el-button>
        </el-header>
        <!-- 内容部分 -->
        <el-container class="guidance_container">
            <!-- 目录部分 -->
            <el-aside class="guidance_aside container_aside col_A">
                <div v-if="directory.length > 0" class="col_A">
                    <el-menu :default-active="directory[0].index" class="el-menu-vertical-demo asideA col_A">
                        <el-menu-item 
                        class="el-menu-vertical_title asideA_item col_A" 
                        v-for="(item, index) in directory" 
                        :key="item.index" 
                        :index="item.index" 
                        @click.native="directoryClick(item)"
                        >
                            <div class="el-menu-vertical_title asideA_item col_A">
                                <a slot="title" >{{ item.sname }}</a>
                            </div>
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
                                <viewer :images="content_A">
                                    <div class="col_class" :class="{'first': index == first}" 
                                    @click="contentClick(item,index)" 
                                    
                                    v-html="item.html">
                                        <!-- {{ item.scontent }}@contextmenu.prevent="contentRightClick(item, index)"-->
                                        <!-- <img :src="item.chartpath" width="50"> -->
                                    </div>
                                </viewer>
                            </div>
                        </div>
                    </el-col>
                    <!-- 第二级 -->
                    <el-col :span="8" class="col_A">
                        <div class="grid-content bg-purple col_main">
                            <div class="aside_title_message" v-if="content_B.length == 0">暂无数据显示！</div>
                            <div v-else v-for="(item, index) in content_B" :key="item.id">
                                <viewer :images="content_A">
                                    <div class="col_class" :class="{'second': index == second}" @click="contentClick2(item,index)" v-html="item.html">
                                        <!-- {{ item.scontent }} -->
                                    </div>
                                </viewer>
                            </div>
                        </div>
                    </el-col>
                    <!-- 第三级 -->
                    <el-col :span="8" class="col_A col_AA">
                        <div class="grid-content bg-purple col_main">
                            <div class="aside_title_message" v-if="content_C.length == 0">暂无数据显示！</div>
                            <div v-else v-for="(item, index) in content_C" :key="item.id">
                                <viewer :images="content_A">
                                    <div class="col_classA" v-html="item.html">
                                        <!-- {{ item.scontent }} -->
                                    </div>
                                </viewer>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <!-- 
            右键按钮弹出框
         -->
        <!-- 右键菜单 -->
        <!-- <div v-show="menuVisible" class="menuVisible"> -->
            <!-- <ul id="menu" class="menu"> -->
                <!-- <li class="menu__item" @click="addClick"><i class="el-icon-circle-plus-outline add"></i>新增</li> -->
                <!-- <li class="menu__item" v-show="stype != 0" @click="modifyClick"><i class="el-icon-edit-outline modify"></i>修改</li> -->
                <!-- <li class="menu__item" v-show="stype != 0" @click="deleteClick"><i class="el-icon-circle-close-outline delete"></i>删除</li> -->
            <!-- </ul> -->
        <!-- </div> -->
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
    selectAll ,
    // 标题查询接口
    riskguidetitle_All,
    // 标题添加接口
    riskguidetitle_Add
} from './riskInterface.js' ;
// 导出文档js
import riskGuidance from './import_riskGuidance_world.js'
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
            first: 0 ,                          // 第一层次内容的index
            second:0 ,                          // 第二层次内容的index
            third: 0 ,                          // 第三层次内容的index
            menuVisible: false ,                // 右键点击按钮的弹出框 默认为关闭状态   
            directoryObj: {} ,                  // 目录点击的信息存放
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
         * 右键点击功能
         */
        contentRightClick(item, index){
            debugger
            // this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            // this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
            // var menu = document.querySelector('#menu')
            // let aaa = document.getElementsByClassName('col_main')[0] ;
            // menu.style.left = MouseEvent.clientX -150 + 'px'
            // // menu.style.left = "234px" ;
            // // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            // document.addEventListener('click', this.foo) 
            // menu.style.top = MouseEvent.clientY - 10 + 'px'
        },
        /**
         * @description 取消鼠标监听事件 菜单栏
         */
        foo() { 
            this.menuVisible = false
            // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
            document.removeEventListener('click', this.foo) 
        },
        /**
         * @function 目录查询接口
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
                    me.first = 0 ;
                    me.second= 0 ;
                    me.third = 0 ;
                    data = res.data.data ;
                    data.forEach(yuu => { yuu.index = yuu.id + "" ; }) ;
                    me.directory = data.filter(item => { return item.pid === 0 }) ;
                    me.directoryObj = me.directory[0] ;
                    me.contentRequest() ; // 内容查询方法
                } else if(res.data.code === 1001) {
                    me.$message(res.data.msg + '请添加标题内容') ;
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * @function 内容查询接口
         */
        contentRequest(){ 
            let me = this ;
            let params = {
                titleId : 1 ,
	            sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => {
                if(res.data.code === 200) {
                    let dd = res.data.data ;
                    dd.forEach(res2 => { res2.html = res2.scontent }) ;
                    me.content = dd ;
                    let cc = dd.filter(item => { 
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
         * @function 内容的处理
         */
        contentsProcessing(cc){ //debugger
            let me = this ;
            let aa, bb, $index ;
            me.content_A = [] ;
            me.content_B = [] ;
            me.content_C = [] ;
            // 第一层次内容
            me.content_A = cc.filter(item2 => { return item2.nlevel === 1 }) ;
            // me.content_A[0].chartpath = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg' ;

            if(me.me.content_A.length === 0)return false ;
            // 第二层次内容
            aa = cc.filter(item3 => { return item3.nlevel === 2 }) ;
            if(aa.length === 0)return false ;
            // 第三层次内容
            bb = cc.filter(item4 => { return item4.nlevel === 3 }) ;
            me.content_B = aa.filter(item33 => { return me.content_A[0].id == item33.pid }) ;
            if(me.content_B.length === 0)return false ;
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
            let me = this ;
            if(me.directoryObj.id !== item.id){
                me.directoryObj = item ;
                me.first = 0 ;
                me.second= 0 ;
                me.third = 0 ;
            }            
            me.content_A = [] ;
            me.content_B = [] ;
            me.content_C = [] ;
            let cc = me.content.filter(res => {
                return res.catalogname == item.sname ;
            });
            // 内容的处理
            me.contentsProcessing(cc) ;
        },
        /**
         * 内容点击按钮
         */
        contentClick(item, index) {    // 一级 
            let $index = 0 ; 
            this.first = index;
            this.content_B = this.content.filter(res => {
                return res.pid == item.id ;
            });
            if(this.content_B.length === 0){
                this.content_C = [] ;
                return false ;
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
            // this.$message('暂无此功能！') ;
            this.$confirm('是否下载该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                riskGuidance.importRiskGuidanceWorld(this) ;
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消下载' });          
            });
        }
    }
}
</script>

<style scoped lang="scss" src="./riskGuidanceStyle.scss"></style>
<style scoped>
.menu {
    /* height: 120px; */
    width: 150px;
    list-style:none	;
    text-align: left;
    cursor: pointer;
    position: absolute;
    background-color: #fff ;
}
.menu li {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125)
}
.menu li i {
    margin-right: 5px ;
}
    /* 内容的样式设置 */
    .col_class, .col_classA {
        margin-bottom: 15px;
        line-height: 24px;
        font-family: '微软雅黑';
        cursor: pointer;
        padding: 0 10px 0 10px ;
    }
    .col_class {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }
    .col_class:hover {
        color: teal ;
        /* background-color:antiquewhite; */
        /* transform: scale(1.2);
        transform: translate(0, -10px);
        -webkit-transform: translate(0, -10px);
        -moz-transform: translate(0, -10px);
        -o-transform: translate(0, -10px);
        -ms-transform: translate(0, -10px); */
        background-color: rgb(186, 218, 247);
    }
    .first {
        color: teal;
    }
    .second {
        color: teal;
    }


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 1px;
    height: 0px;
    background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(112, 238, 90, 0.3);
    border-radius: 1px;
    background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    /* border-radius: 0px; */
    /* -webkit-box-shadow: inset 0 0 1px rgba(69, 226, 64, 0.3); */
    background-color: #9fd467;
    /* background-color: #dcdfe6; */
}
</style>
