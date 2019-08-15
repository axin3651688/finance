<template>
    <!-- 
        name: sjz
        说明：风险指引制度（2版）
     -->
    <div id="riskGuidance">
        <!-- 
            Container 布局容器
            <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。
            <el-header>：顶栏容器。
            <el-aside>：侧边栏容器。
            <el-main>：主要区域容器。
            <el-footer>：底栏容器。
         -->
        <el-container>
            <!-- 顶栏容器 -->
            <el-header class="riskGuidance_header">
                <div class="riskGuidance_btn">
                    <!-- 修改按钮 -->
                    <el-button class="riskGuidance_btnA" type="text" @click="addDirectory">
                        <i class="iconfont icon-xiugai riskGuidance_btnA-A"></i>
                        <span>修 改</span> 
                    </el-button>
                    <!-- 导出按钮 -->
                    <el-button class="riskGuidance_btnB" type="text">
                        <i class="iconfont icon-daochu riskGuidance_btnA-B"></i>
                        <span>导 出</span>
                    </el-button>
                    <!-- 预览按钮 -->
                    <el-button class="riskGuidance_btnC riskGuidance_btnA-C" type="success" round size="mini">
                        预 览
                    </el-button>
                </div>
                <!-- 标题首行部分 -->
                <div class="riskGuidance_title">
                    <!-- 图标部分 -->
                    <div class="header_icon">
                        <i class="el-icon-info main_title-icon"></i>                    
                    </div>
                    <!-- 标题部分 -->
                    <div class="header_title">
                        <span v-for="item in titleName" :key="item.id">{{ item.sname }}</span>
                    </div>
                </div>
            </el-header>
            <!-- 主要区域容器 -->
            <el-main class="riskGuidance_main">
                <ul class="riskGuidance_main-content">
                    <!-- 渲染目录数据 -->
                    <li v-for="(item,index) in directory">
                        <div class="asd" @click="changeContent(item, index)">
                            <div class="asder"><i class="el-icon-warning"></i>{{ item.sname }}</div>
                            <div class="asder2" v-if="!item.showContent">展开<i class="el-icon-plus"></i></div>
                            <div class="asder2" v-else>收起<i class="el-icon-minus"></i></div>
                        </div>

                        <!-- 一级内容层 -->
                        <div class="content_first" v-for="(cont,index2) in contentA" v-show="getContentView(item, cont)">
                            <div class="content_first-A" @click="changeContent2(cont, index2)">
                                <div class="content_first-icon">
                                    <span v-if="!cont.showContent"><i class="el-icon-arrow-right first_icon"></i></span>
                                    <span v-else><i class="el-icon-arrow-down first_icon"></i></span>
                                </div>
                                <div class="content_first-text">{{ cont.scontent }}</div>
                            </div>

                            <!-- 二级内容层 -->
                            <div class="content_second" v-for="(todo, index3) in contentB" v-show="getContentView2(cont, todo)">
                                <div class="content_second-A">
                                    <div class="content_second-text" :style="randomRgb(index3)">{{ todo.scontent }}</div>

                                    <!-- 三级内容层 -->
                                    <div v-show="todo.showContent">
                                        <div class="content_third" v-if="todo.showContent" v-for="(tool, index4) in contentCC">
                                            <div :style="randomRgb2(index4)" class="content_third-icon"></div>
                                            <div class="content_third-text">{{ tool.scontent }}</div>
                                        </div>
                                    </div>

                                    <div class="content_second-icon" @click="changeContent3(todo, index3)">
                                        <span v-if="!todo.showContent"><i class="el-icon-arrow-down second_icon"></i>展开</span>
                                        <span v-else><i class="el-icon-arrow-up second_icon"></i>收起</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-main>
        </el-container>

        <!-- 
            弹出层
            newThis -> 本组件大对象
         -->
        <riskGuidance-dialog v-if="dialogVisible_first" :newThis="newThis"></riskGuidance-dialog>
    </div>
</template>
<script>
import {
    // 指引制度标题查询接口 
    riskguidetitle_All ,
    // 指引制度标题添加接口
    riskguidetitle_Add ,
    // 指引制度标题删除接口
    riskguidetitle_Delete ,
    // 指引制度标题修改接口
    riskguidetitle_Updata ,
    // 指引制度标题目录接口
    selectAll
} from './interface.js'
// 引用子组件弹出层
import riskGuidanceDialog from './riskGuidanceDialog.vue'
export default {
    components: {
        riskGuidanceDialog
    },
    data(){
        return {
            newThis: this ,           // 组件大对象
            // 二级|三级 内容的边框左的颜色
            headColor: ['rgb(82,196,26)', 'rgb(184,233,134)', 'rgb(250,173,20)'] ,
            titleName: [] ,         // 标题数组存储器
            directory: [] ,         // 目录数组存储器
            contentA: [] ,          // 一级内容层存储器
            contentB: [] ,          // 二级内容层存储器
            contentC: [] ,          // 三级内容层存储器
            contentCC:[] ,          // 三级过滤内容存储器

            dialogVisible_first: false ,            // 目录弹出层 默认不显示false | true显示
        }
    },
    mounted(){
        // 设置高度
        this.setClientHeight() ;
        // 标题查询接口方法
        this.riskguidetitle_All_request() ;
        // 目录查询接口方法
        this.selectAll_directory_request() ;
        // 内容查询接口方法
        this.selectAll_content_request() ;
    },
    methods: {
        /**
         * 设置自适应高度
         */
        setClientHeight() { 
            let me = this ;
            // 窗口的高度
            let wH =  document.body.offsetHeight ;
            // 获取中间main的高度
            let cH = document.getElementsByClassName('riskGuidance_main')[0] ;
            // 设置中间main的高度
            cH.style.height = wH - 159 + 'px' ;
            // 窗口改变时触发
            window.onresize = function temp(){
                cH.style.height =  document.body.offsetHeight - 159 + 'px' ;
            };
        },
        /**
         * @function 标题查询接口方法
         */
        riskguidetitle_All_request() {
            const me = this ;
            riskguidetitle_All().then(res => { 
                // 1. 状态200  成功查到数据
                // 2. 状态1001 成功但没有数据 即添加标题
                // 3. 状态0    失败
                if (res.data.code === 200) { 
                    me.titleName = res.data.data ;
                } else if (res.data.code === 1001) {
                    me.riskguidetitle_Add_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @function 标题添加接口方法
         */
        riskguidetitle_Add_request() {
            const me = this ;
            let params = [{
                id: 0 ,
                pid: 0 ,
                sname: "天津食品风险指引制度"
            }]
            riskguidetitle_Add(params).then(res => {
                // 1. params = 添加方法的参数  必传
                // 2. 状态200  添加数据成功
                // 3. 状态0    添加数据失败
                if (res.data.code === 200) {
                    me.riskguidetitle_All_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @function 目录查询接口方法
         */
        selectAll_directory_request() {
            const me = this ;
            let params = {
                titleId : 1,
                sqlKey : "RiskGuide.selectCatalog"
            }
            selectAll(params).then(res => {
                // 1. params 参数-必传
                // 2. 状态200 查询成功
                // 3. 状态0   查询失败
                if (res.data.code === 200) {
                    res.data.data.forEach(item => { item.showContent = false ; })
                    me.directory = res.data.data ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @function 内容查询接口
         */
        selectAll_content_request() {
            const me = this ;
            let params = {
                titleId : 1 ,
                sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => {
                // 1. params 参数-必传
                // 2. 状态200 成功
                // 3. 状态0   失败
                if (res.data.code === 200) {
                    res.data.data.forEach(item => { item.showContent = false ; })
                    me.content = res.data.data ;
                    me.contentA = res.data.data.filter(elementA => { return elementA.nlevel === 1 }) ;
                    me.contentB = res.data.data.filter(elementB => { return elementB.nlevel === 2 }) ;
                    me.contentC = res.data.data.filter(elementC => { return elementC.nlevel === 3 }) ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * 二级 | 三级 颜色处理
         */
        randomRgb(index) {
            let len = this.headColor.length ;              
            return {
                borderLeft: "4px solid" + " " + this.headColor[index%len]  
            }; 
        },
        randomRgb2(index) {
            let len = this.headColor.length ;
            return {
                backgroundColor: this.headColor[index%len] 
            }
        },
        /**
         * 各级显示处理
         * 1. 目录行
         * 2. 一级内容行
         * 3. 二级内容行 ×
         */
        getContentView(item, cont) {
            if(item.id === cont.catalogid && item.showContent){
                return true ;
            } else {
                return false;
            }
        },
        getContentView2(cont, todo) {
            if(cont.id === todo.pid && cont.showContent){
                return true ;
            } else {
                return false;
            }
        },
        /**
         * 目录行 展开 / 收起 按钮触发
         * 1. 目录 -> 一级内容层 
         * 2. 一级内容层 -> 二级内容层
         * 3. 二级内容层 -> 三级内容层 
         */
        changeContent(item, index) {
            let temp = this.directory
            temp[index].showContent = !temp[index].showContent
            temp.forEach(res => {
                if(res.id !== item.id)res.showContent = false 
            })
            this.directory = temp
        },
        changeContent2(cont, index) {
            let temp = this.contentA
            temp[index].showContent = !temp[index].showContent
            temp.forEach(res => {
                if(res.id !== cont.id)res.showContent = false
            })
            this.contentA = temp
        },
        changeContent3(todo, index) {
            this.contentCC = [] ;
            this.contentCC = this.contentC.filter(res => {
                return res.pid === todo.id 
            })
            let temp = this.contentB
            temp[index].showContent = !temp[index].showContent
            temp.forEach(res => {
                if(res.id !== todo.id)res.showContent = false
            })
            this.contentB = temp
        },
        /**
         * @event 弹框部分
         */
        addDirectory(event) {
            // debugger
            this.dialogVisible_first = true ;
        }   
    }
}
</script>
<style scoped src="./riskGuidanceCss/riskGuidanceCss.css"></style>
<style>

</style>
