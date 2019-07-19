<!--
    name: sjz
    说明：修改按钮的弹出框（操作目录的）:id="id" @mousedown="dragA"
-->
<template>
    <div id="directoryDialog">
        <div class="directoryDialog_A" id="A">
            <!-- 头部 -->
            <div class="directoryDialog_A_1" @mousedown="dragA">
                <span>风控指引制度</span>
            </div>
            <!-- 内容部分 -->
            <div class="directoryDialog_A_2">
                <el-table :data="tableData" height="252px" border :show-header="false" class="tableA table-el">
                    <el-table-column prop="sname" label="目录" width="276"></el-table-column>
                    <el-table-column label="操作" width="121" align="center">
                        <template slot-scope="scope">
                            <!-- 修改按钮 -->
                            <el-button size="mini" class="directoryDialog_A_2-btn" @click="addClick('modify', scope)" :disabled="disabled">
                                <i class="iconfont icon-xiugai icon-a icon-i"></i>
                            </el-button>
                            <!-- 下级按钮 -->
                            <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick(scope)" :disabled="disabled">
                                <i class="iconfont icon-xiajicaozuo icon-b icon-i"></i>
                            </el-button>
                            <!-- 删除按钮 -->
                            <el-button size="mini" class="directoryDialog_A_2-btn" @click="removeClick(scope)" :disabled="disabled">
                                <i class="iconfont icon-shanchu2 icon-c icon-i"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 尾部 -->
            <div class="directoryDialog_A_3">
                <el-button class="directoryDialog_A_3-1" type="primary" round size="mini" plain @click="addClick('add')" :disabled="disabled">
                    <i class="el-icon-circle-plus-outline"></i>添 加
                </el-button>
                <el-button class="directoryDialog_A_3-1" round size="mini" @click="closeClick('close')" :disabled="disabled">关 闭</el-button>
            </div>
        </div>
        <!-- 
            添加 | 修改 的弹出框
         -->
        <div v-if="dialogFormVisible2_A">
            <div class="directoryDialog_A_4" :style="addHeights" id="B">
                <div class="directoryDialog_A_4-1" @mousedown="dragA">
                    <span>{{ title }}</span>
                </div>
                <div class="directoryDialog_A_4-2">
                    <el-form :label-position="labelPosition" label-width="110px" :rules="rules" ref="ruleForm" :model="formLabelAlign" class="directoryDialog_A_4-2-form">
                        <el-form-item label="原名称：" v-if="isShow">
                            <el-input class="directoryDialog_A_4-2-input" v-model="formLabelAlign.name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="修改后名称：" v-if="isShow" prop="modifyname">
                            <el-input class="directoryDialog_A_4-2-input" v-model="formLabelAlign.modifyname"></el-input>
                        </el-form-item>
                        <el-form-item label="添加名称：" v-if="isShow2" prop="addname">
                            <el-input class="directoryDialog_A_4-2-input" v-model="formLabelAlign.addname"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="directoryDialog_A_4-3">
                    <el-button class="directoryDialog_A_3-1" type="primary" round size="mini" plain  @click="confirmClick('ruleForm')">确 认</el-button>
                    <el-button class="directoryDialog_A_3-1" round size="mini" @click="closeClick('cancel')">取 消</el-button>
                </div>
            </div>
        </div>
        <!-- 
            添加-》下级弹出框（一级）
         -->
        <div v-if="dialogFormVisible3_A">
            <div class="directoryDialog_A_5" id="C">
                <!-- 头部 -->
                <div class="directoryDialog_A_5-1" @mousedown="dragA">
                    <el-button class="directoryDialog_A_5-1-btn" @click="levelClick" :disabled="disabled2"><i class="iconfont icon-tianjia"></i></el-button>
                    <el-button class="directoryDialog_A_5-1-btn" @click="deleteClick" :disabled="disabled2"><i class="iconfont icon-shanchu2"></i></el-button>
                </div>
                <!-- 腰部 -->
                <div class="directoryDialog_A_5-2">
                    <div class="directoryDialog_A_5-2-1">
                        <div class="A_5-a">{{ title }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <div class="directoryDialog_A_5-2-2">
                        <el-table
                        :data="tableData2" style="width: 100%" :show-header="false" 
                        border height="100%" class="tableA table-el"
                        @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="40" align="center" :disabled="disabled2"></el-table-column>
                            <el-table-column label="内容" prop="scontent">
                                <template slot-scope="scope">
                                    <el-input type="textarea" autosize placeholder="请输入内容" @change="saveChange(scope)" v-model="scope.row.scontent"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80" align="center">
                                <template slot-scope="scope">
                                    <!-- 图片按钮 -->
                                    <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick2(scope)" :disabled="disabled2">
                                        <i class="iconfont icon-tupian icon-a icon-i"></i>
                                    </el-button>
                                    <!-- 下级按钮 -->
                                    <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick2(scope)" :disabled="disabled2">
                                        <i class="iconfont icon-xiajicaozuo icon-b icon-i"></i>
                                    </el-button>
                                </template> 
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 按钮部分 -->
                <div class="directoryDialog_A_5-3">
                    <el-button class="directoryDialog_A_3-1" round size="mini" @click="closeClick('closeA')" :disabled="disabled2">关 闭</el-button>
                </div>
            </div>
        </div>
        <!-- 
            一级-》下级弹出框（二级）
         -->
        <div v-if="dialogFormVisible3_B">
            <!-- 弹框 -->
            <div class="directoryDialog_A_6" id="D">
                <!-- 头部 -->
                <div class="directoryDialog_A_6-1" @mousedown="dragA">
                    <el-button class="directoryDialog_A_6-1-btn" @click="levelClick" :disabled="disabled3"><i class="iconfont icon-tianjia"></i></el-button>
                    <el-button class="directoryDialog_A_6-1-btn" @click="deleteClick" :disabled="disabled3"><i class="iconfont icon-shanchu2"></i></el-button>
                </div>
                <!-- 腰部 -->
                <div class="directoryDialog_A_6-2">
                    <!-- 标题目录 -->
                    <div class="directoryDialog_A_6-2-1">
                        <div class="A_5-a">{{ title }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                        <div class="A_6-c">{{ title2 }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <!-- 输入框 -->
                    <div class="directoryDialog_A_6-2-2">
                        <el-table
                        :data="tableData3" style="width: 100%" :show-header="false" 
                        border height="100%" class="tableA table-el"
                        @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="40" align="center" :disabled="disabled3"></el-table-column>
                            <el-table-column label="内容" prop="scontent">
                                <template slot-scope="scope">
                                    <el-input type="textarea" autosize placeholder="请输入内容" @change="saveChange(scope)" v-model="scope.row.scontent"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80" align="center">
                                <template slot-scope="scope">
                                    <!-- 图片按钮 -->
                                    <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick3(scope)" :disabled="disabled3">
                                        <i class="iconfont icon-tupian icon-a icon-i"></i>
                                    </el-button>
                                    <!-- 下级按钮 -->
                                    <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick3(scope)" :disabled="disabled3">
                                        <i class="iconfont icon-xiajicaozuo icon-b icon-i"></i>
                                    </el-button>
                                </template> 
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 按钮部分 -->
                <div class="directoryDialog_A_5-3">
                    <el-button class="directoryDialog_A_3-1" round size="mini" @click="closeClick('closeB')" :disabled="disabled3">关 闭</el-button>
                </div>
            </div>
        </div>
        <!-- 
            二级-》下级弹出框（三级）
         -->
        <div v-if="dialogFormVisible3_C">
                <!-- 弹框 -->
            <div class="directoryDialog_A_7" id="E">
                <!-- 头部 -->
                <div class="directoryDialog_A_7-1" @mousedown="dragA">
                    <el-button class="directoryDialog_A_7-1-btn" @click="levelClick" ><i class="iconfont icon-tianjia"></i></el-button>
                    <el-button class="directoryDialog_A_7-1-btn" @click="deleteClick"><i class="iconfont icon-shanchu2"></i></el-button>
                </div>
                <!-- 腰部 -->
                <div class="directoryDialog_A_6-2">
                    <!-- 标题目录 -->
                    <div class="directoryDialog_A_7-2-1">
                        <div class="A_5-a">{{ title }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                        <div class="A_6-c">{{ title2 }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                        <div class="A_6-c">{{ title3 }}</div>
                        <div class="A_5-b"><i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <!-- 输入框 -->
                    <div class="directoryDialog_A_6-2-2">
                        <el-table
                        :data="tableData4" style="width: 100%" :show-header="false" 
                        border height="100%" class="tableA table-el"
                        @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="40" align="center"></el-table-column>
                            <el-table-column label="内容" prop="scontent">
                                <template slot-scope="scope">
                                    <el-input type="textarea" autosize placeholder="请输入内容" @change="saveChange(scope)" v-model="scope.row.scontent"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80" align="center">
                                <template slot-scope="scope">
                                    <!-- 图片按钮 -->
                                    <el-button size="mini" class="directoryDialog_A_2-btn" @click="lowerLevelClick3(scope)" >
                                        <i class="iconfont icon-tupian icon-a icon-i"></i>
                                    </el-button>                                   
                                </template> 
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 按钮部分 -->
                <div class="directoryDialog_A_5-3">
                    <el-button class="directoryDialog_A_3-1" round size="mini" @click="closeClick('closeC')">关 闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    // 目录添加接口
    riskguidecatalogAdd,
    // 目录修改接口
    riskguidecatalogUpdate,
    // 目录删除接口
    riskguidecatalogDelete,
    // 内容修改接口 
    riskguidecontentUpdate,
    // 内容删除接口
    riskguidecontentDelete,
    // 内容添加接口
    riskguidecontentAdd,
    // 查询总接口
    selectAll
} from './riskInterface.js'

// 引用通用js方法
import riskCommon from './commonMethods.js'
export default {
    props: {
        newThis: Object,
        data: {
            type: [Array, Object],
            required: true
        }
    },
    data(){
        return {
            dialogFormVisible2_A: false ,   // 添加 | 修改 的弹出框的显示|隐藏的控制
            dialogFormVisible3_A: false ,   // 下级 1级 的弹出框的显示|隐藏的控制
            dialogFormVisible3_B: false ,   // 下级 2级 的弹出框的显示|隐藏的控制
            dialogFormVisible3_C: false ,   // 下级 3级 的弹出框的显示|隐藏的控制
            title: "" ,                     // 添加 | 修改 的弹出框的标题
            title2: "",                     // 一级下级按钮的文字
            title3: "",                     // 二级下级按钮的文字
            disabled: false ,               // 是否禁用 
            disabled2: false,               // 一级  是否禁用
            disabled3: false,               // 二级  是否禁用
            labelPosition: "right" ,        // form表单右对齐
            selectionA: [] ,            // 一级勾选状态数组
            selectionB: [] ,            // 二级勾选状态数组
            selectionC: [] ,            // 三级勾选状态数组
            scopeData: {} ,             // 点击(1级)下级按钮时的参数
            scopeData2: {} ,            // 点击(2级)下级按钮时的参数
            scopeData3: {} ,            // 点击(3级)下级按钮时的参数
            tableData2: [
                { scontent: "" }
            ] ,
            tableData3: [
                { scontent: "" }
            ],
            tableData4: [
                { scontent: "" }
            ],
            // form表单数据
            formLabelAlign: {               
                name: "" ,
                modifyname: "" ,
                addname: ""
            },
            isShow : true ,                 // 应用于修改弹出框
            isShow2: true ,                 // 应用于添加弹出框
            scope2: {} ,                    // 点击的信息
            number: 0 ,                     // 区分是修改弹框的确认 | 添加弹框的确认
            number2: 0,                     // 区分是哪个下级按钮 （注：1=一级下级按钮；2=二级下级按钮）
            // 添加 | 修改 的弹出框id
            // id: "" ,                   
            // 添加 | 修改 的弹出框的值
            selectElement: "",
            // 添加 | 修改 的弹出框的高度设置
            addHeights: {
                height: ""
            },
            // 验证
            rules: {
                // 修改后名称
                modifyname: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("请输入修改名称"));
                            } else {
                                // 如果修改后的名称与原名称一致
                                if(this.formLabelAlign.modifyname == this.formLabelAlign.name) {
                                    callback(new Error("修改后的名称不能与原名称一致")) ;
                                } else {
                                    callback();
                                }
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                ],
                // 添加的名称
                addname: [
                    {
                        validator: (rule, value, callback) => { //debugger
                            if (!value) {
                                callback(new Error("请输入添加的名称"));
                            } else {
                                
                                // let isTrue = this.data.some(res => { return res.sname === value ; }) ;
                                // if(isTrue) {
                                //     callback(new Error("名称已重复"));
                                // } else {
                                    callback();
                                // }
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    computed: {
        tableData: function() {
            let tmp;
            if (!Array.isArray(this.data)) {
                tmp = [this.data] ;
            } else {
                tmp = this.data ;
            }
            return tmp ;
        }
    },
    methods: {
        /**
         * 添加按钮 | 修改按钮
         */
        addClick(val, scope) { 
            this.disabled = true ;
            this.scope2 = {} ;
            if(val === "add") {     // 添加
                this.number = 0 ;
                this.title = "添加名称" ;
                this.isShow = false ,
                this.isShow2= true ,
                this.addHeights.height = "150px" ;
                this.dialogFormVisible2_A = true ;
            } else {                // 修改
                this.number = 1 ;
                this.formLabelAlign.name = scope.row.sname ;
                this.scope2 = scope ;
                this.title = "名称修改" ;
                this.isShow = true ,
                this.isShow2= false ,
                this.addHeights.height = "220px" ;
                this.dialogFormVisible2_A = true ;
            }
        },
        /**
         * 确认按钮
         */
        confirmClick(ruleForm) {
            const me = this ;
            me.$refs[ruleForm].validate((valid) => { 
                if(valid) {
                    if(me.number) { // 修改弹框
                        me.riskguidecatalogUpdate_request() ;
                    } else {        // 添加弹框
                        me.riskguidecatalogAdd_request() ;
                    }
                } else {
                    return false ;
                }
            });
        },
        /**
         * 删除按钮（目录）
         */
        removeClick(scope) {
            const me = this ;
            let params = [scope.row.id] ;
            me.$confirm('此操作将删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除接口
                me.riskguidecatalogDelete_request(params) ;
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除' });          
            });
        },
        /**
         * 关闭 | 取消 按钮
         */
        closeClick(val) {
            if(val === "close")this.newThis.dialogFormVisible_A = false ;
            if(val === "cancel"){
                this.disabled = false ;
                this.dialogFormVisible2_A = false ;
            }
            if(val === "closeA"){                                       // 一级关闭
                this.disabled = false ;
                this.number2 = 0 ;
                this.dialogFormVisible3_A = false ;
            }     
            if(val === "closeB"){                                       // 二级关闭
                this.disabled2 = false;
                this.number2 = 1 ;                                      
                this.dialogFormVisible3_B = false ; 
            } 
            if(val === "closeC"){                                       // 三级关闭
                this.disabled3 = false;
                this.number2 = 2 ;                                      
                this.dialogFormVisible3_C = false ; 
            }    
        },
        /**
         * 下级按钮(一级)
         */
        lowerLevelClick(scope) { //debugger
            let me = this ;
            me.scopeData = scope ;
            me.dialogFormVisible3_A = !me.dialogFormVisible3_A ;
            me.disabled = true ;
            me.title = scope.row.sname ;
            me.number2 = 1 ;
            me.directoryRequest() ;  
                   
        },
        /**
         * 下级按钮（二级）
         */
        lowerLevelClick2(scope) {
            let me = this ;
            me.disabled2 = true ;
            me.scopeData2 = scope ;
            me.title2 = scope.row.scontent ;
            me.number2 = 2 ;
            me.dialogFormVisible3_B = !me.dialogFormVisible3_B ;
            me.directoryRequest() ; 
        },
        /**
         * 下级按钮（三级）
         */
        lowerLevelClick3(scope) {
            let me = this ;
            me.disabled3 = true ;
            me.scopeData3 = scope ;
            me.title3 = scope.row.scontent ;
            me.number2 = 3 ;
            me.dialogFormVisible3_C = !me.dialogFormVisible3_C ;
            me.directoryRequest() ; 
        },
        /**
         * (一级)输入框保存
         */
        saveChange(scope) { //debugger
            let id ;
            if(this.number2 == 1)id = this.scopeData.row.pid;
            if(this.number2 == 2)id = this.scopeData2.row.id;
            if(this.number2 == 3)id = this.scopeData3.row.id;
            if(scope.row.id === 0) {
                let params = [{
                    catalog_id: this.scopeData.row.id,
                    chartpath: "",
                    pid: id,
                    scontent: scope.row.scontent 
                }]
                // 添加请求方法
                this.riskguidecontentAdd_request(params) ;
            } else {
                let params = [{
                    id: scope.row.id,
                    chartpath: "",
                    scontent: scope.row.scontent
                }]
                // 修改内容接口
                this.riskguidecontentUpdate_request(params) ;
            }
        },
        /**
         * (一级)复选框点击事件-当选择项发生变化时会触发该事件
         */
        handleSelectionChange(selection) {
            // 如果数组大于0，说明有勾选的状态
            if(selection.length > 0) {
                this.selectionA = [] ;
                this.selectionA = selection ;
            }
        },
        /**
         * (一级)添加按钮
         */
        levelClick() { //debugger
            if(this.number2=== 1)this.tableData2.push({ id: 0, scontent: "" }) ;
            if(this.number2=== 2)this.tableData3.push({ id: 0, scontent: "" }) ;
            if(this.number2=== 3)this.tableData4.push({ id: 0, scontent: "" }) ;
        },
        /**
         * (一级)删除按钮
         */
        deleteClick() {
            if(this.selectionA.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 一级内容删除接口
                    this.riskguidecontentDelete_request() ;
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });          
                });
            } else {
                this.$message({ message: "请选择要删除的内容！", type: "warning" }) ;
            }
        },
        /**
         * 弹出框拖拽的方法
         */
        dragA(event) { 
            // 引用的外部js方法
            riskCommon.dragAndDrop(event, this) ;
        },
        /**
         * @function 【添加内容】请求方法
         */
        riskguidecontentAdd_request(params) {
            const me = this ;
            riskguidecontentAdd(params).then(res => { 
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.newThis.directoryRequest() ;
                    me.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @function 【删除内容】请求方法
         */
        riskguidecontentDelete_request() {
            const me = this ;
            let params = [] ;
            me.selectionA.forEach(item => {
                params.push(item.id) ;
            })
            riskguidecontentDelete(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.newThis.directoryRequest() ;
                    me.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @function 【修改内容】请求方法
         */
        riskguidecontentUpdate_request(params) {
            const me = this ;
            riskguidecontentUpdate(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.newThis.directoryRequest() ;
                    me.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @function 【修改目录】请求方法
         */
        riskguidecatalogUpdate_request() { 
            const me = this ;
            let cc = me.scope2 ;
            let params = [{
                id: cc.row.id ,
                nlevel: cc.row.nlevel ,
                pid: cc.row.pid ,
                title_id: cc.row.title_id ,
                sname: me.formLabelAlign.modifyname
            }]
            riskguidecatalogUpdate(params).then(res => { // 修改接口
                if(res.data.code === 200) {
                    me.dialogFormVisible2_A = false ;
                    me.disabled = false ;
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.newThis.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @function 【添加目录】请求方法
         */
        riskguidecatalogAdd_request() {
            const me = this ;
            let params = [{
                sname: me.formLabelAlign.addname,
                title_id: 1
            }]
            riskguidecatalogAdd(params).then(res => {
                if(res.data.code === 200) {
                    me.dialogFormVisible2_A = false ;
                    me.disabled = false ;
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.newThis.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @function 【删除目录】请求方法
         */
        riskguidecatalogDelete_request(params) {
            const me = this ;
            riskguidecatalogDelete(params).then(res => { // 删除接口
                if(res.data.code === 200) {
                    me.$message({ type: 'success', message: '删除成功!' });
                    me.newThis.directoryRequest() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            });
        },
        /**
         * @function 目录查询接口
         */
        directoryRequest(){ 
            let me = this ;
            let data , arr;
            let params = {
                titleId : 1,
                sqlKey : "RiskGuide.selectCatalog"
            }
            selectAll(params).then(res => {  
                if(res.data.code === 200) {
                    data = res.data.data ;
                    data.forEach(yuu => { yuu.index = yuu.id + "" ; }) ;
                    arr = data.filter(item => { return item.pid === 0 }) ;
                    me.contentRequest(arr) ; // 内容查询方法
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        },
        /**
         * @function 内容查询接口
         */
        contentRequest(arr){ 
            let me = this ;
            let index = me.scopeData.$index ;
            let aa, bb ;
            let params = {
                titleId : 1 ,
	            sqlKey: "RiskGuide.selectContent"
            }
            selectAll(params).then(res => { 
                if(res.data.code === 200) {
                    let data = res.data.data ;
                    let cc = res.data.data.filter(item => { 
                        return item.catalogname == arr[index].sname ;
                    });
                    if(me.number2 == 1)me.tableData2 = cc.filter(item2 => { return item2.nlevel === 1 }) ;
                    if(me.number2 == 2){
                        aa = me.scopeData2.row ;
                        bb = cc.filter(item3 => { return item3.nlevel === 2 }) ;
                        me.tableData3 = bb.filter(item33 => { return aa.id === item33.pid }) ;
                    }
                    if(me.number2 == 3){
                        aa = me.scopeData3.row ;
                        bb = cc.filter(item4 => { return item4.nlevel === 3 }) ;
                        me.tableData4 = bb.filter(item44 => { return aa.id === item44.pid }) ;
                    }
                } else {
                    me.$message.error(res.data.msg) ;
                }   
            });
        }
    }
}
</script>
<style scoped lang="scss" src="./riskGuidanceStyle.scss"></style>
<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.tableA ::-webkit-scrollbar {
    width:1px; 
    height:10px; 
    background-color:transparent;
} 
::-webkit-scrollbar {
    width:1px; 
    height:10px; 
    background-color:transparent;
}
/*定义滚动条轨道 内阴影+圆角*/
.tableA ::-webkit-scrollbar-track {
    background-color:#f0f6ff;  
} 
::-webkit-scrollbar {
    /* background-color:#f0f6ff;   */
}
/*定义滑块 内阴影+圆角*/
.tableA ::-webkit-scrollbar-thumb {
    background-color: #9fd467;
    border-radius:1px;
}
::-webkit-scrollbar {
    background-color: #f5f5f5;
    border-radius:1px;
} 

.scrollbarHide::-webkit-scrollbar{display: none}
.scrollbarShow::-webkit-scrollbar{display: block}

</style>
