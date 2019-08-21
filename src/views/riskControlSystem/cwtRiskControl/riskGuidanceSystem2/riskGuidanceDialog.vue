<template>
    <!--
        name: sjz
        说明：风险指引制度弹出层
        父组件：riskGuidance.vue
    -->
    <div id="riskGuidanceDialog">
        <!-- 
            目录弹出层 
        -->
        <el-dialog
        class="riskGuidanceDialog-container"
        title="天津食品风险指引制度"
        :visible.sync="dialogVisible1"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        >
            <div style="overflow: auto ; max-height: 336px ;">
                <ul class="riskGuidanceDialog-directory">
                    <li v-for="item in directoryDialog">
                        <div class="asd">
                            <div class="asder"><i class="el-icon-warning"></i>{{ item.sname }}</div>
                            <div class="asder2">
                                <!-- 修改按钮 -->
                                <el-tooltip content="修改" placement="top" effect="light">
                                    <el-button class="riskGuidanceDialog_btnA" type="text" @click="addAndModifyClick('modify', item)">
                                        <i class="el-icon-edit-outline first_B"></i>
                                    </el-button>
                                </el-tooltip>
                                <!-- 下级按钮 -->
                                <el-tooltip content="下级" placement="top" effect="light">
                                    <el-button type="text" class="riskGuidanceDialog_btnC" @click="lowerLevelClick(item)">
                                        <i class="iconfont icon-xiajicaozuo first_D"></i>
                                    </el-button>
                                </el-tooltip>
                                <!-- 删除按钮 -->
                                <el-tooltip content="删除" placement="top" effect="light">
                                    <el-button class="riskGuidanceDialog_btnB" type="text" @click="deleteClick(item)">
                                        <i class="el-icon-delete first_C"></i>
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="add-directory" type="primary" @click="addAndModifyClick('add')" size="medium" round>
                    <i class="el-icon-plus first_A"></i>
                    <span>添 加</span>
                </el-button>
                <el-button @click="cancelClick('directory')" size="medium" round>取 消</el-button>
            </span>
        </el-dialog>
        <!-- 
            添加按钮点击弹出层 
        -->
        <el-dialog
        class="riskGuidanceDialog-container"
        :title="changeTitle"
        :visible.sync="dialogVisible2"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        >
            <div class="onetwothree">
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="110px" class="rule-demo">
                    <el-form-item v-if="betweenNum === 0 " label="添加名称" prop="addName">
                        <el-input v-model="ruleForm.addName"></el-input>
                    </el-form-item>
                    <el-form-item v-if="betweenNum === 1 " label="原目录名称" prop="originalName">
                        <el-input v-model="ruleForm.originalName" readonly></el-input>
                    </el-form-item>
                    <el-form-item v-if="betweenNum === 1 " label="修改目录名称" prop="modifyName">
                        <el-input v-model="ruleForm.modifyName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="add-directory" type="primary" @click="confirmClick('ruleForm')" size="medium" round>
                    <span>确 认</span>
                </el-button>
                <el-button @click="cancelClick('addAndmodify')" size="medium" round>取 消</el-button>
            </span>
        </el-dialog>
        <!-- 
            内容弹出框v-if="dialogVisible3"
         -->
        <content-guidance
        ref="drawer"       
        :fatherThis="fatherThis"
        :grandpaThis="newThis"
        :dataContent="dataContent">

        </content-guidance>
    </div>
</template>
<script>
import {
    // 目录添加接口
    riskguidecatalogAdd ,
    // 目录修改接口
    riskguidecatalogUpdate ,
    // 目录删除接口
    riskguidecatalogDelete ,
    // 内容添加接口
    riskguidecontentAdd ,
    // 内容删除接口
    riskguidecontentDelete ,
    // 内容修改接口
    riskguidecontentUpdate
} from './interface.js'
// 引用子组件
import contentGuidance from './contentDialog.vue'
export default {
    props: {
        // 父组件大对象
        newThis: Object ,
        // 目录数组
        dataDirectory: {
            type: [Array, Object],
            required: true
        },
        dataContent: {
            type: [Array, Object],
            required: true
        }
    },
    components: {
        contentGuidance
    },
    data(){
        return {
            fatherThis: this ,             // 本组件大对象
            contenteditable: true ,     // 编辑状态
            dialogVisible1: true ,      // 默认显示（目录）
            dialogVisible2: false,      // 默认不显示（添加按钮 or 修改按钮）
            changeTitle: "" ,           // 弹出框改变的标题（注：根据是添加按钮 or 修改按钮来决定）
            betweenNum: 0 ,             // 区分添加与修改
            modifyObj: {} ,             // 存放修改按钮的数据（目录）
            lowerLevelObj: {} ,         // 存放下级按钮的数据（目录 - 一级内容）
            ruleForm: {                 // form表单（注：根据是添加按钮 or 修改按钮来决定）
                addName: "" ,
                originalName: "" ,
                modifyName: ""
            },
            rules: {                    // 表单验证
                addName: [
                    { required: true, message: '请输入目录名称', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            let isTrue = this.dataDirectory.some(res => { return res.sname === value })
                            if(isTrue) {
                                callback(new Error("目录名称已重复"));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                modifyName: [
                    { required: true, message: '请输入修改名称', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if(value === this.ruleForm.originalName) {
                                callback(new Error("修改后的名称不能与原名称一致"))
                            } else {
                                let isTrue = this.dataDirectory.some(res => { return res.sname === value }) ;
                                if(isTrue) {
                                    callback(new Error("修改后的名称已重复"));
                                } else {
                                    callback() ;
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {
        directoryDialog: function () {
            let tmp;
            if (!Array.isArray(this.dataDirectory)) {
                tmp = [this.dataDirectory] ;
            } else {
                tmp = this.dataDirectory ;
            }
            return tmp ;
        }
    },
    methods: {
        // （目录）添加目录按钮
        addAndModifyClick(vax, obj) {
            this.ruleForm.addName = "" ;
            this.ruleForm.modifyName = "" ;
            if(vax === "add") {
                this.betweenNum = 0 ;
                this.changeTitle = "添加目录" ;
            } else if(vax === "modify") {
                this.betweenNum = 1 ;
                this.modifyObj = {} ;
                this.modifyObj = obj ;
                this.ruleForm.originalName = obj.sname ;
                this.changeTitle = "修改目录" ;
            }           
            this.dialogVisible2 = true ;
        },
        // 添加目录弹出框 | 修改目录弹出框 确认按钮
        confirmClick(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    // 如果状态为0 则进入添加目录请求方法里
                    if(this.betweenNum === 0)this.riskguidecatalogAdd_request() ;
                    // 如果状态为1 则进入修改目录请求方法里
                    if(this.betweenNum === 1)this.riskguidecatalogUpdate_request() ;
                } else {
                    return false ;
                }
            })
        },
        // 目录删除按钮
        deleteClick(obj) {
            let isArray = this.dataContent.filter(res => {
                if(res.nlevel === 1 && res.catalogid === obj.id)return res ;
            })
            if(isArray.length > 0) {
                if(isArray.length === 1 && !isArray[0].scontent) {
                    
                } else {
                    this.$message.info('存在下级内容，无法删除')
                    return
                }
            }
            // return ;
            this.$confirm('此操作将删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.riskguidecatalogDelete_request(obj) ;
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' }) ;          
            });
        },
        // 目录下级按钮
        lowerLevelClick(obj) {
            this.lowerLevelObj = {} ;
            this.$refs.drawer.lowerLevelObj = obj ;
            this.$refs.drawer.drawerTitle = obj.sname ;
            this.$refs.drawer.drawer = true ;
            this.$refs.drawer.selectAll_content() ;
        },
        // 取消按钮
        cancelClick(vax) {
            if(vax === "directory") {
                this.newThis.dialogVisible_first = false ;
            } else if(vax === "addAndmodify") {
                this.changeTitle = "" ;
                this.betweenNum = 0 ;
                this.dialogVisible2 = false ;
                this.ruleForm = {                 
                    addName: "" ,
                    originalName: "" ,
                    modifyName: ""
                },
                this.$refs['ruleForm'].resetFields();
            }
        },
        /**
         * @event 添加目录请求接口方法
         */
        riskguidecatalogAdd_request() {
            const me = this ;
            let params = [{
                sname: me.ruleForm.addName ,
                title_id: 1
            }]
            riskguidecatalogAdd(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.dialogVisible2 = false ;
                    me.newThis.selectAll_directory_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @event 修改目录请求接口方法
         */
        riskguidecatalogUpdate_request() { 
            const me = this ;
            let params = [{
                id: me.modifyObj.id ,
                nlevel: me.modifyObj.nlevel ,
                pid: me.modifyObj.pid ,
                title_id: me.modifyObj.title_id || me.newThis.titleName[0].id ,
                sname: me.ruleForm.modifyName
            }]
            riskguidecatalogUpdate(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.dialogVisible2 = false ;
                    me.newThis.selectAll_directory_request() ;
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        /**
         * @event 删除目录请求接口方法 
         */
        riskguidecatalogDelete_request(obj) {
            const me = this ;
            let params = [obj.id] ;
            riskguidecatalogDelete(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg, type: "success" }) ;
                    me.dialogVisible2 = false ;
                    me.newThis.selectAll_directory_request() ;
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
/* 弹出框顶栏容器 */
.riskGuidanceDialog-container .el-dialog .el-dialog__header {
    padding: 10px 20px ;
    border-bottom: 1px solid #EBEEF5;
    background: linear-gradient(to right, #9FD467 , #2DB060); /* 标准的语法 */
}
.riskGuidanceDialog-container .el-dialog {
    min-width: 476px ;
    max-width: 576px ;
}
/* 弹出框主要区域容器 */
.riskGuidanceDialog-container .el-dialog__body {
    padding: 20px ;
}
/* 弹出框底栏容器。 */
.riskGuidanceDialog-container .el-dialog__footer {
    padding: 20px ;
}
</style>
