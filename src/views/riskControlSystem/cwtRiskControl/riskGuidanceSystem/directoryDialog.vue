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
            下级弹出框
         -->
        <div v-if="dialogFormVisible3_A">

        </div>
        <div v-if="dialogFormVisible3_B">

        </div>
        <div v-if="dialogFormVisible3_C">

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
    riskguidecatalogDelete
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
            title: "" ,                     // 添加 | 修改 的弹出框的标题
            disabled: false ,               // 是否禁用 
            labelPosition: "right" ,        // form表单右对齐
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
                tmp = [this.data]
            } else {
                tmp = this.data
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
            this.disabled = false ;
            if(val === "close")this.newThis.dialogFormVisible_A = false ;
            if(val === "cancel")this.dialogFormVisible2_A = false ;
        },
        /**
         * 下级按钮
         */
        lowerLevelClick(scope) {

        },
        /**
         * 弹出框拖拽的方法
         */
        dragA(event) { 
            // 引用的外部js方法
            riskCommon.dragAndDrop(event, this) ;
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
        }
    }
}
</script>
<style scoped lang="scss" src="./riskGuidanceStyle.scss"></style>
<style scoped>
    
</style>
