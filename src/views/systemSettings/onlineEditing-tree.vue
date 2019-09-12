/**
 * name: sjz
 * 说明：在线编辑-风险类型组件
 */
<template>
    <div id="onlineEditing-tree">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="onlineEditing-tree__left" :style="sizeHeight">
                    <p class="title">天津食品集团有限公司</p>
                    <el-tree 
                        :data="tableData" 
                        highlight-current 
                        :expand-on-click-node="false" 
                        :props="defaultProps" 
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="onlineEditing-tree__right" :style="sizeHeight">
                    <div class="onlineEditing-tree__form">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="级次：" prop="nlevel">
                                <el-input type="text" v-model="ruleForm.nlevel" placeholder="自动获取" readonly :disabled="input"></el-input>
                            </el-form-item>
                            <el-form-item label="父级编码：" prop="spcode">
                                <el-input type="text" v-model="ruleForm.spcode" placeholder="自动获取" readonly :disabled="input"></el-input>
                            </el-form-item>
                            <el-form-item label="编码：" prop="scode">
                                <el-input type="text" v-model="ruleForm.scode" placeholder="请输入数字编码" :disabled="input"></el-input>
                            </el-form-item>
                            <el-form-item label="风险名称：" prop="sname">
                                <el-input type="text" v-model="ruleForm.sname" placeholder="请输入风险名称" :disabled="input"></el-input>
                            </el-form-item>
                            <el-form-item label="风险说明：" prop="sriskexplain">
                                <el-input 
                                    type="textarea" 
                                    :autosize="{ minRows: 4, maxRows: 6}" 
                                    maxlength="1000" 
                                    show-word-limit 
                                    :disabled="input"
                                    v-model="ruleForm.sriskexplain" 
                                    placeholder="请输入文字，限制1000个字符">
                                </el-input>
                            </el-form-item>
                            <el-form-item style="textAlign: right">
                                <el-button 
                                    size="medium " 
                                    round 
                                    type="primary" 
                                    :loading="false"
                                    :disabled="determine"                                    
                                    @click="determineClick('ruleForm')">确 认
                                </el-button>
                                <el-button 
                                    class="onlineEditing-tree__btn-plus" 
                                    size="medium " 
                                    :disabled="disabled" 
                                    round
                                    @click="addClick"  
                                    icon="el-icon-plus">添 加
                                </el-button>
                                <el-button 
                                    class="onlineEditing-tree__btn-delete" 
                                    size="medium " 
                                    :disabled="disabled" 
                                    round
                                    @click="deleteClick" 
                                    icon="el-icon-delete">删 除
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    risktype_update,        // 风险类型修改接口
    risktype_delete,        // 风险类型删除接口
    risktype_add            // 风险类型添加接口
} from '~api/cube.js'
export default {
    props: {
        fatherThis: Object 
    },
    data() {
        return {
            tableData: [] ,
            nodeObj: {} ,
            disabled: true ,
            input: false ,
            determine: true ,
            type: '' ,
            sizeHeight: {
                height: '443px' 
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            ruleForm: {
                id: '' ,
                nlevel: '' ,
                spcode: '' ,
                scode: '' ,
                sname: '' ,
                sriskexplain: ''
            },
            rules: {
                scode: [
                    { required: true, message: '请输入数字值', trigger: 'blur' },
                    { 
                        validator: (rule, value, callback) => {
                            let digitsRE = /(\d{3})(?=\d)/g
                            let val = value - 0
                            if (!Number.isInteger(val)) {
                                callback(new Error('请输入数字值'));
                            } else {
                                callback()
                            }
                        }, 
                        trigger: 'blur' 
                    }
                ],
                sname: [
                    { required: true, message: '请输入风险名称', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    methods: {
        // 【风险类型】树节点点击事件
        handleNodeClick(data) {
            this.disabled = false 
            this.determine = false
            this.input = false
            this.nodeObj = data
            this.type = 'node'
            this.ruleForm = {
                id: data.id ,
                nlevel: data.nlevel ,
                spcode: data.spcode ,
                scode: data.scode ,
                sname: data.sname ,
                sriskexplain: data.sriskexplain
            }
        },
        // 删除点击
        async deleteClick() {
            let me = this,
                params = [me.nodeObj.scode] ,
                res ;
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                res = await risktype_delete(params)
                if(res.data.code === 200) {
                    me.$message.success(res.data.msg)
                    me.fatherThis.refreshClick('fourth')
                } else {
                    me.$message.error(res.data.msg)
                }
            }).catch(() => {
                me.$message.info('已取消删除')
            })
        },
        // 添加点击
        addClick() {
            this.type = 'add'
            this.disabled = true
            this.ruleForm = {
                nlevel: 2 ,
                spcode: this.nodeObj.scode ,
                scode: '' ,
                sname: '' ,
                sriskexplain: ''
            }
        },
        // 确认按钮
        determineClick(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.interface_request()
                } else {
                    return false
                }
            });
        },
        // 请求方法
        async interface_request() {
            let params, res
            if(this.type === 'node') {
                // 1. 没有改变即提示"暂无更改"
                if(this.judgeMethods()) {
                    this.$message.warning('暂无更改')
                } else {
                    params = [this.ruleForm]
                    res = await risktype_update(params)
                }
            } else {
                params = [this.ruleForm]
                res = await risktype_add(params)
            }
            if(res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.input = true 
                this.disabled = true
                this.determine = true
                this.fatherThis.requestMethods('fourth')
            } else {
                this.$message.error(res.data.msg)
            }
        },
        // 判断是否变更
        judgeMethods() {
            for(let key in this.ruleForm) {
                if(this.ruleForm[key] !== this.nodeObj[key]){
                    return false 
                } 
            }
            return true
        }
    }
}
</script>
<style scoped>
.title {
    font-size: 16px;
    line-height: 40px;
    margin-left: 10px;
}
.demo-ruleForm {
    padding: 15px 20px 0 0
}
.onlineEditing-tree__left,
.onlineEditing-tree__right {
    background-color: #fff ;
    height: 100% ;
    overflow: auto ;
}
.onlineEditing-tree__btn-refresh {
    color: #9fd467 ;
}
.onlineEditing-tree__btn-plus {
    color: #1790ff ;
}
.onlineEditing-tree__btn-delete {
    color: #f56c6c ;
}
</style>