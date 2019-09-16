/**
 * 系统设置 -> 初始化管理 - 在线编辑 __树形组件 
 */
<template>
    <div id="onlineEditingTree">
        <div class="onlineEditing-tree__btn">
            <el-button round size="small" class="tree__btn-refresh" icon="el-icon-refresh" @click="refreshClick">刷 新</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="8" >
                <div class="grid-content bg-purple" :style="heights">
                    <div class="title">天津食品集团有限公司</div>
                    <el-tree 
                        class="onlineEditingTree-tree"
                        :data="tableData" 
                        highlight-current 
                        :expand-on-click-node="false" 
                        :props="defaultProps" 
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="16" >
                <div class="grid-content bg-purple" :style="heights">
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
                                type="success"
                                @click="addClick"  
                                icon="el-icon-plus">添 加
                            </el-button>
                            <el-button 
                                class="onlineEditing-tree__btn-delete" 
                                size="medium " 
                                :disabled="disabled" 
                                round
                                type="danger" 
                                @click="deleteClick" 
                                icon="el-icon-delete">删 除
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div> 
</template>

<script>
import {
    risktype_All,       // 风险类型查询接口
    risktype_add,       // 风险类型添加接口
    risktype_update,    // 风险类型修改接口
    risktype_delete     // 风险类型删除接口
} from '~api/cube.js'
import tools from 'utils/tools.js'
export default {
    data(){
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [] ,
            determine: true,        // 确认按钮（禁用|启用）
            disabled: true ,        // 添加|删除按钮（禁用|启用）
            input: false,           // form表单输入框的禁用|启用
            treeNode: {},           // 树节点的信息
            stype: 'modify',        // 区分修改|添加 
            heights: {
                height: '440px'
            },
            ruleForm: {
                id: '',
                nlevel: '',         // 级次
                spcode: '',         // 父级
                scode: '',          // 编码
                sname: '',          // 风险名称
                sriskexplain: ''    // 风险说明
            },
            rules: {
                scode: [
                    { required: true, message: '请输入风险编码', trigger: ['blur', 'change'] },
                    { 
                        validator: (rule, value, callback) => {
                            if(!Number.isSafeInteger(value - 0)) {
                                callback(new Error('请输入数字值'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                sname: [{ required: true, message: '请输入风险名称', trigger: ['blur', 'change'] }]
            }
        }
    },
    methods: {
        // 请求方法
        async request_methods(type) {
            let res = await risktype_All() 
            if(res.data.code === 200) {
                let data = res.data.data
                const setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "scode",
                            pIdKey: "spcode"
                        },
                        key: {
                            name: "scode",
                            children: "children"
                        }
                    }
                }
                if(Array.isArray(data) && data.length > 0) {
                    data = tools.sortByKey(data, "scode")
                    data = data.filter(item => {
                        item.label = "(" + item.scode + ") " + item.sname
                        return item
                    })
                    this.tableData = tools.transformToeTreeNodes(setting, data)
                }
            } else {
                this.$message.error(res.data.msg)
            }
        },
        // 刷新按钮事件
        refreshClick() {
            this.disabled = true
            this.determine = true
            this.input = false
            this.$refs['ruleForm'].resetFields();
            for(let key in this.ruleForm)this.ruleForm[key] = ''
            this.request_methods('fourth')
        },
        // 节点点击事件 
        handleNodeClick(obj) {
            this.disabled = false 
            this.determine = false
            this.input = false
            this.stype = 'modify'
            this.treeNode = obj
            for(let key in this.ruleForm) {
                this.ruleForm[key] = obj[key]
            }
        },
        // 确认按钮事件
        determineClick(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.interface_request()
                } else {
                    return false
                }
            })
        },
        // 添加按钮事件
        addClick() {
            this.stype = 'add'
            this.disabled = true
            for(let key in this.ruleForm) {
                this.ruleForm[key] = ''
                if(key === 'nlevel')this.ruleForm[key] = this.treeNode.nlevel+1
                if(key === 'spcode')this.ruleForm[key] = this.treeNode.scode

            }
        },
        // 删除按钮事件
        deleteClick() {
            let me = this,
                params = [me.treeNode.scode] ,
                res ;
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                res = await risktype_delete(params)
                if(res.data.code === 200) {
                    me.$message.success(res.data.msg)
                    me.request_methods('fourth')
                    me.disabled = true
                    me.determine = true
                    for(let key in me.ruleForm) {
                        me.ruleForm[key] = ''
                    }
                } else {
                    me.$message.error(res.data.msg)
                }
            }).catch(() => {
                me.$message.info('已取消删除')
            })
        },
        // 请求
        async interface_request(){
            let res, params = []
            params = [this.ruleForm]
            if(this.judge_methods()) {
                this.$message.warning('暂无更改')                
                return
            }
            if(this.stype === 'add')res = await risktype_add(params)
            if(this.stype === 'modify')res = await risktype_update(params)
            if(res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.disabled = true 
                this.determine = true
                this.input = true
                this.request_methods('fourth')
            } else {
                this.$message.error(res.data.msg)
            }
        },
        judge_methods() {
            for(let key in this.ruleForm) {
                if(this.ruleForm[key] !== this.treeNode[key]) {
                    return false
                }
            }
            return true
        }
    }
}
</script>

<style scoped>
.onlineEditing-tree__btn {
    text-align: right ;
    margin-bottom: 10px ;
}
.tree__btn-refresh {
    color: #fff ;
    background: linear-gradient(to right, #9FD467 , #2DB060);
}
.title {
    font-weight: 500 ;
    margin-left: 10px;
    line-height: 56px;
    font-size: 16px ;
}
.grid-content {
    background: #fff ;
}
.onlineEditingTree-tree {
    overflow: auto ;
    height: 384px
}
.demo-ruleForm {
    padding: 20px 0 0 0 ; 
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
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
  border-radius: 1px;
  -webkit-box-shadow: inset 0 0 1px rgba(69, 226, 64, 0.3);
  background-color: #9fd467;
}
</style>
<style>
.onlineEditingTree-tree .el-tree-node__label{
    font-size: 15px ;
}
</style>
