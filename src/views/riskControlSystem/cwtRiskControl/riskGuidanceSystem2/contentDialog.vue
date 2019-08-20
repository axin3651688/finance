<template>
    <!--
        name: sjz
        说明：内容弹框
        父组件：riskGuidanceDialog.vue
        爷爷：riskGuidance.vue
    -->
    <div id="contentDialog">
        <!-- 
            1.0 下级内容弹出框    
         -->
        <el-drawer
        class="riskGuidanceDialog-container"
        :title="drawerTitle"  
        :visible.sync="drawer"
        :show-close="false"
        :wrapperClosable="false"
        size="50%"
        ref="drawer"
        >
            <div slot="title">
                <div>{{ drawerTitle }}</div>
            </div>
            <div class="demo-drawer__content">
                <!-- <div > -->
                    <ul class="demo-drawer__main">
                        <li v-for="(element, index) in contentA">
                            <div class="demo-drawer__main-can" v-if="element.catalogid === lowerLevelObj.id">
                                <div :style="randomRgb(index)" 
                                :id="getElementById(element)" 
                                class="demo-drawer__main-A" 
                                :contenteditable="contenteditable"
                                placeholder="Type something..."
                                @click="getContentData(element)"
                                @blur="blurContentediTable(element, '1')"
                                @keydown.ctrl.83="CtrlS"
                                v-html="element.scontent">

                                </div>
                                <div class="demo-drawer__main-B">
                                    <!-- 删除按钮 -->
                                    <el-tooltip content="删除" placement="top" effect="light">
                                        <el-button class="riskGuidanceDialog_btnB" type="text" size="mini" :disabled="disabled1" @click="deleteClick(element, index, '2')">
                                            <i class="el-icon-delete second_A"></i> 
                                        </el-button>
                                    </el-tooltip>
                                    <!-- 下级按钮 -->
                                    <el-tooltip content="下级" placement="top" effect="light">
                                        <el-button type="text" class="riskGuidanceDialog_btnC" size="mini" :disabled="disabled1" @click="lowerLevelClick(element, '1')">
                                            <i class="iconfont icon-xiajicaozuo second_B"></i> 
                                        </el-button>
                                    </el-tooltip>
                                </div>
                            </div>
                        </li>
                    </ul>
                <!-- </div> -->
                <div class="demo-drawer__footer">
                    <el-button class="add-directory" type="primary" round size="medium" @click="addContent('1')">添 加</el-button>
                    <el-button @click="closeClick('1')" round size="medium">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <!-- 
            2.0
         -->
        <el-drawer
        class="riskGuidanceDialog-container"
        :title="drawerTitle"
        :visible.sync="drawer2"
        :show-close="false"
        :wrapperClosable="false"
        size="50%"
        ref="drawer"
        >
            <div slot="title">
                <div>{{ drawerTitle }}</div>
                <!-- 一级的内容 -->
                <div class="demo-drawer__main2">
                    <i class="el-icon-arrow-down fourth_icon"></i>
                    <div class="demo-drawer__main2-A" v-html="secondary"></div>
                </div>
            </div>
            <div class="demo-drawer__content">
                <ul class="demo-drawer__main">
                    <li v-for="(element, index) in contentB">
                        <div class="demo-drawer__main-can" v-if="element.pid === lowerLevelObj2.id">
                            <div :style="randomRgb(index)" 
                            :id="getElementById(element)" 
                            class="demo-drawer__main-A" 
                            :contenteditable="contenteditable"
                            placeholder="Type something..."
                            @click="getContentData(element)"
                            @blur="blurContentediTable(element, '2')"
                            @keydown.ctrl.83="CtrlS"
                            v-html="element.scontent">

                            </div>
                            <div class="demo-drawer__main-B">
                                <!-- 删除按钮 -->
                                <el-tooltip content="删除" placement="top" effect="light">
                                    <el-button class="riskGuidanceDialog_btnB" type="text" size="mini" :disabled="disabled2" @click="deleteClick(element, '3')">
                                        <i class="el-icon-delete second_A"></i> 
                                    </el-button>
                                </el-tooltip>
                                <!-- 下级按钮 -->
                                <el-tooltip content="下级" placement="top" effect="light">
                                    <el-button type="text" class="riskGuidanceDialog_btnC" size="mini" :disabled="disabled2" @click="lowerLevelClick(element, '2')">
                                        <i class="iconfont icon-xiajicaozuo second_B"></i> 
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 二级的内容 -->
                <div class="demo-drawer__footer">
                    <el-button class="add-directory" type="primary" round size="medium" @click="addContent('2')">添 加</el-button>
                    <el-button @click="closeClick('2')" round size="medium">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <!-- 
            3.0
         -->
        <el-drawer
        class="riskGuidanceDialog-container"
        :title="drawerTitle"
        :visible.sync="drawer3"
        :show-close="false"
        :wrapperClosable="false"
        size="50%"
        ref="drawer"
        >
            <div slot="title">
                <div>{{ drawerTitle }}</div>
                <!-- 一级的内容 -->
                <div class="demo-drawer__main22">
                    <i class="el-icon-arrow-down fourth_icon"></i>
                    <div class="demo-drawer__main2-A" v-html="secondary"></div>
                </div>
                <div class="demo-drawer__main3">
                    <i class="el-icon-arrow-down fourth_icon"></i>
                    <div class="demo-drawer__main2-A" v-html="thirdary"></div>
                </div>
            </div>
            <div class="demo-drawer__content">
                <ul class="demo-drawer__main">
                    <li v-for="(element, index) in contentC">
                        <div class="demo-drawer__main-can" v-if="element.pid === lowerLevelObj3.id">
                            <div :style="randomRgb(index)" 
                            :id="getElementById(element)" 
                            class="demo-drawer__main-A" 
                            :contenteditable="contenteditable"
                            placeholder="Type something..."
                            @click="getContentData(element)"
                            @blur="blurContentediTable(element, '3')"
                            @keydown.ctrl.83="CtrlS"
                            v-html="element.scontent">

                            </div>
                            <div class="demo-drawer__main-B">
                                <!-- 删除按钮 -->
                                <el-tooltip content="删除" placement="top" effect="light">
                                    <el-button class="riskGuidanceDialog_btnB" type="text" size="mini" @click="deleteClick(element, '4')">
                                        <i class="el-icon-delete second_A"></i> 
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 二级的内容 -->
                <div class="demo-drawer__footer">
                    <el-button class="add-directory" type="primary" round size="medium" @click="addContent('3')">添 加</el-button>
                    <el-button @click="closeClick('3')" round size="medium">取 消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import {
    // 内容添加接口
    riskguidecontentAdd ,
    // 内容删除接口
    riskguidecontentDelete ,
    // 内容修改接口
    riskguidecontentUpdate ,
    // 指引制度标题目录接口（内容）
    selectAll
} from './interface.js'
import { param } from '../../../../utils/index.js';
export default {
    props: {
        fatherThis: Object ,
        grandpaThis: Object ,
        dataContent: Array
    },
    data(){
        return {
            headColor: ['rgb(82,196,26)', 'rgb(184,233,134)', 'rgb(250,173,20)'] ,
            drawer: false ,             // 默认不显示（目录下级 即一级下级按钮）
            drawer2:false ,             // 默认不显示（一级下级 即二级弹框）
            drawer3:false ,             // 默认不显示（二级下级 即三级弹框）
            contenteditable: true ,     // 编辑状态
            drawerTitle: "" ,           // 抽屉改变的标题（注：目录下级按钮来决定）
            lowerLevelObj: {},          // 点击的目录属性
            lowerLevelObj2:{},          // 属性2
            lowerLevelObj3:{},          // 属性3
            firstInformation: {},       // 一级内容存储信息
            contentA: [] ,          // 一级内容层存储器
            contentB: [] ,          // 二级内容层存储器
            contentC: [] ,          // 三级内容层存储器

            secondary: "",          // 二级内容 （一级下级的段落信息）
            thirdary: "" ,          // 三级内容 （二级下级的段落信息）

            disabled1: false ,      // 第一禁用
            disabled2: false ,      // 第二禁用
        }   
    },
    methods: {
        // 颜色
        randomRgb(index) {
            let len = this.headColor.length ;
            return {
                borderLeft: "4px solid"+" "+this.headColor[index%len]
            }
        },
        // id
        getElementById(data) {
            if(data.id === null) {
                data.id = 0 ;
                return data.id ;
            } else {
                return data.id ;
            }
        },
        // 得到输入框的数据信息（一级）
        getContentData(data) {
            this.firstInformation = {} ;
            this.firstInformation = data ;
        },
        // ctrl + s 保存组合键 
        CtrlS(e) {
            if(e.ctrlKey == true){                
                this.blurContentediTable(this.firstInformation);
                e.preventDefault();
                e.returnValue = false;
                console.log("键盘触发");
                return false;
            }
        },
        /**
         * @event 失去焦点触发-保存|修改
         *  鼠标失去焦点触发
         *  stype: 1  一级内容
         *  stype: 2  二级内容
         */
        blurContentediTable(element, stype) {
            // debugger
            let cc = document.getElementById(element.id) ;
            let scontent = cc.innerHTML.replace(/[\r\n]/g,"").trim() ;
            if(scontent == element.scontent) {
                return false ;
            }
            // if(!scontent) {
            //     this.$message.warning('为空时，无法对信息进行处理！')
            //     return false ;
            // }
            // 为添加状态
            // 则为修改状态
            if(element.id == 0) {
                this.riskguidecontentAdd_request(element, scontent, stype) ;
            } else {
                this.riskguidecontentUpdate_request(element, scontent) ;
            }
        },
        /**
         * @event 删除按钮触发
         * 一级内容 删除 stype == '2'
         * 二级内容 删除 stype == '3'
         */ 
        deleteClick(element, $index, stype) {
            // debugger
            let isAry ;
            // 添加的，没有进行数据添加的可以直接进行删除
            if(stype === '2' && element.id === 0 && element.catalogid !== 0) {
                this.contentA = this.contentA.filter((res,index) => { return index !== $index }) ;
                return
            }
            if(stype === '3' && element.id === 0 && element.catalogid !== 0) {
                this.contentB = this.contentB.filter((res,index) => { return index !== $index }) ;
                return
            }
            if(stype === '4' && element.id === 0 && element.catalogid !== 0) {
                this.contentC = this.contentC.filter((res,index) => { return index !== $index }) ;
                return
            }
            // 判断有无下级，如果有，不让删除
            isAry = this.dataContent.filter(res => { return res.nlevel == stype && res.pid == element.id }) ;
            if(isAry.length > 0 && stype !== "4") {
                this.$message.warning('存在下级内容，无法删除！') ;
                return
            }
            // return
            this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.riskguidecontentDelete_request(element) ;
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });     
            })
        },
        /**
         * @event 添加按钮触发
         * 一级内容 添加按钮 stype == '1'
         * 二级内容 添加按钮 stype == '2'
         */
        addContent(stype) {
            let tmp ;
            if(stype == "1") {
                tmp  = this.contentA ;
                tmp.push({
                    id: 0 ,
                    catalogid: this.lowerLevelObj.id ,
                    pid: this.lowerLevelObj.pid ,
                    nlevel: 1 ,
                    add: true ,
                    scontent: ""
                })
                this.contentA = tmp ;
            } else if(stype == "2") {
                tmp = this.contentB ;
                tmp.push({
                    id: 0 ,
                    pid: this.lowerLevelObj2.id ,
                    nlevel: 2 ,
                    add: true ,
                    scontent: ""
                })
                this.contentB = tmp ;
            } else {
                tmp = this.contentC ;
                tmp.push({
                    id: 0 ,
                    pid: this.lowerLevelObj3.id ,
                    nlevel: 3 ,
                    add: true ,
                    scontent: ""
                })
                this.contentC = tmp ;
            }
        },
        /**
         * @event 下级按钮触发
         * 一级下级按钮 至二级 stype = "1"
         * 二级下级按钮 至三级 stype = "2"
         */
        lowerLevelClick(element, stype) {
            if(stype === '1') {
                this.lowerLevelObj2 = {} ;
                this.lowerLevelObj2 = element ;
                this.drawer2 = true ;
                this.disabled1 = true ;
                this.secondary = element.scontent ;
            } else if(stype === "2") {
                this.lowerLevelObj3 = {} ;
                this.lowerLevelObj3 = element ;
                this.disabled2 = true ;
                this.drawer3 = true ;
                this.thirdary = element.scontent ;
            }
        },
        /**
         * @event dialog关闭按钮
         */
        closeClick(xtype) {
            if(xtype === "1") {
                this.drawer = false ;
            } else if(xtype === "2") {
                this.drawer2 = false ;
                this.disabled1 = false ;
            } else {
                this.drawer3 = false ;
                this.disabled2 = false ;
            }
        },
        /**
         * @event 内容【修改】接口
         */
        riskguidecontentUpdate_request(element, scontent) {
            const me = this ;
            let params = [{
                id: element.id,
                chartpath: "",
                scontent: scontent
            }]
            riskguidecontentUpdate(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ type: "success", message: res.data.msg }) ;
                    me.selectAll_content() ;
                    me.grandpaThis.selectAll_content_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @event 内容【添加】接口
         */
        riskguidecontentAdd_request(element, scontent, stype) { debugger
            const me = this ;
            let contPid ;
            if(stype === "1")contPid = me.lowerLevelObj.pid ;
            if(stype === "2")contPid = me.lowerLevelObj2.id ;
            if(stype === "3")contPid = me.lowerLevelObj3.id ;
            let params = [{
                catalog_id: me.lowerLevelObj.id,
                chartpath: "",
                pid: contPid,
                scontent: scontent
            }]
            riskguidecontentAdd(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ type: "success", message: res.data.msg }) ;
                    me.selectAll_content() ;
                    me.grandpaThis.selectAll_content_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @event 内容【删除】接口
         */
        riskguidecontentDelete_request(element) { 
            const me = this ;
            let params = [element.id] ;
            riskguidecontentDelete(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ type: "success", message: res.data.msg }) ;
                    me.selectAll_content() ;
                    me.grandpaThis.selectAll_content_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @event 内容【查询】接口
         */
        selectAll_content() {
            const me = this ;
            let params = {
                titleId : 1 ,
                sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => {
                if (res.data.code === 200) {
                    me.contentA = res.data.data.filter(elementA => { return elementA.nlevel === 1 }) ;
                    me.contentB = res.data.data.filter(elementB => { return elementB.nlevel === 2 }) ;
                    me.contentC = res.data.data.filter(elementC => { return elementC.nlevel === 3 }) ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        }
    }
}
</script>
<style scoped src="./riskGuidanceCss/riskGuidanceDialog.css"></style>
<style>
.riskGuidanceDialog-container .el-drawer__header {
    margin-bottom: 0 ;
}
.riskGuidanceDialog-container .demo-drawer__footer {
    bottom: 20px ;
    right: 20px ;
    margin: auto ;
    position: fixed ;
}
.riskGuidanceDialog-container .el-drawer__body {
    overflow: auto ;
}
.demo-drawer__main-A span{
    font-size: 14px !important ;
    color: #303133 !important;
    font-weight: 500 !important;
}
</style>
