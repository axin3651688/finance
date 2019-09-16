/**
 * 系统设置 -> 初始化管理 - 在线编辑 __弹出框组件 
 */
<template>
    <div id="onlineEditing-dialog">
        <el-dialog
            :title="stype === 'add'?'添加':'修改'"
            :visible.sync="dialogVisible"
            width="560px"
            top="8vh">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item v-for="(item, index) in filterBy(fartherThis.columns, type)" :key="index + ''" :prop="item.id" :rules="getRules(item)" :label="item.text" :width="item.width" :min-width="item.minWidth" :align="item.align">
                    <span v-if="item.id === 'valuerange' && type === 'first'">
                        <el-select v-model="form['siscontain_minchance']" placeholder="请选择" class="onlineEditing-dialog__select dialog-select-right">
                            <el-option label="[" value="Y"></el-option>
                            <el-option label="(" value="N"></el-option>
                        </el-select>
                        <el-input class="onlineEditing-dialog__input" :text="item.input" v-model.number="form['nminchance']"></el-input>
                        <el-input class="onlineEditing-dialog__input" :text="item.input" v-model.number="form['nmaxchance']"></el-input>
                        <el-select v-model="form['siscontain_maxchance']" placeholder="请选择" class="onlineEditing-dialog__select dialog-select-left">
                            <el-option label="]" value="Y"></el-option>
                            <el-option label=")" value="N"></el-option>
                        </el-select>
                    </span>
                    <span v-else-if="item.id === 'valuerange' && type === 'third'">
                        <el-input class="onlineEditing-dialog__input" :text="item.input" v-model.number="form['nminnum']"></el-input>
                        <el-select v-model="form['siscontain_minnum']" placeholder="请选择" disabled class="onlineEditing-dialog__select dialog-select-left2">
                            <el-option label="<=" value="Y"></el-option>
                        </el-select>
                        <b>R</b>
                        <el-select v-model="form['siscontain_maxnum']" placeholder="请选择" disabled class="onlineEditing-dialog__select dialog-select-left2">
                            <el-option label="<=" value="Y"></el-option>
                        </el-select>
                        <el-input class="onlineEditing-dialog__input" :text="item.input" v-model.number="form['nmaxnum']"></el-input>
                    </span>
                    <span v-else-if="item.id === 'colormark' && type === 'third'">
                        <el-input placeholder="请选择颜色" v-model="form['colormark']" readonly class="onlineEditing-dialog__input onlineEditing-dialog-bottom" >
                            <template slot="append">
                                <el-color-picker v-model="form['colormark']" show-alpha></el-color-picker>
                            </template>
                        </el-input>
                    </span>
                    <span v-else>
                        <el-input 
                            v-if="!item.input || item.input === 'text'"
                            :type="item.input"
                            v-model="form[item.name]">
                        </el-input>
                        <el-input 
                            v-else
                            class="onlineEditing-dialog__input2"
                            :type="item.input"
                            :maxlength="1000" 
                            v-model="form[item.name]" 
                            :autosize="{ minRows: 4, maxRows: 4}"
                            show-word-limit>
                        </el-input>
                    </span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determineClick('form')">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import cols from 'utils/columns.js'
import {
    riskprobability_add,            // 风险发生概率添加接口
    riskprobability_update,         // 风险发生概率修改接口 
    risk_influence_degree_add,      // 风险影响程度添加接口
    risk_influence_degree_update,   // 风险影响程度修改接口 
    riskmatrix_add,                 // 风险等级添加接口
    riskmatrix_update,              // 风险等级修改接口
    riskstrategy_add,               // 风险策略添加接口
    riskstrategy_update,            // 风险策略修改接口
} from '~api/cube.js'
export default {
    props: {
        fartherThis: Object ,
        type: String            // 传输的是第几个tab页
    },
    data(){
        return {
            stype: '' ,         // 传输的是按钮状态 添加-add | 修改-modify
            scopeRow: {} ,
            dialogVisible: false ,
            form: {}
        }
    },
    methods: {
        // 验证
        getRules(item) {
            let rules, me = this
            if(item.id !== 'valuerange' && item.id !== 'sdescription') {
                if(item.id === 'nscore') {
                    return rules = [
                        {
                            validator: (rule, value, callback) => {
                                if(value === '') {
                                    callback(new Error('不能为空'));
                                } else if(!Number.isInteger(value-0)) {
                                    callback(new Error('请输入数字值'));
                                } else {
                                    callback()
                                }
                            },
                            required: true,
                            trigger: 'blur'
                        }
                    ]
                } else {
                    return rules = { required: true, message: '不能为空', trigger: ['blur', 'change'] }
                }
            }
            if(item.id === 'valuerange' && me.type === 'first') {
                return rules = [
                    {
                        validator: (rule, value, callback) => {
                            if(me.form.nminchance == '' || me.form.siscontain_minchance == '' || me.form.nmaxchance == '' || me.form.siscontain_maxchance == '') {
                                callback(new Error('请填写完整'))
                            } else {
                                if(!Number.isInteger(me.form.nminchance-0) || !Number.isInteger(me.form.nmaxchance-0)) {
                                    callback(new Error('请输入数字值'));
                                } else {
                                    value = true
                                    callback()
                                }
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                ]
            }
            if(item.id === 'valuerange' && me.type === 'second') {
                return rules = [
                    {
                        validator: (rule, value, callback) => {
                            if(me.form.spropertyloss === '') {
                                callback(new Error('不能为空'))
                            } else {
                                callback()
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                ]
            }
            if(item.id === 'valuerange' && me.type === 'third') {
                return rules = [
                    {
                        validator: (rule, value, callback) => {
                            if(me.form.nminnum === '' || me.form.nmaxnum === '') {
                                callback(new Error('请填写完整'))
                            } else {
                                if(!Number.isInteger(me.form.nminnum-0) || !Number.isInteger(me.form.nmaxnum-0)) {
                                    callback(new Error('请输入数字值'))
                                } else {
                                    callback()
                                }
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                ]
            }
        },
        // 数组的过滤
        filterBy(column, type) {
            return column.filter(res => { return res.type === type })
        },
        // 初始化赋值
        assignment_methods(scopeRow) { 
            let key , key2
            this.scopeRow = {}
            if(this.stype === 'modify') {
                this.scopeRow = scopeRow
                for(key in this.form) {
                    this.form[key] = scopeRow[key]
                    if(key === 'spropertyloss')this.form[key] = scopeRow['valuerange']
                }
            } else {
                for(key2 in this.form) {
                    this.form[key2] = ''
                    if(key2 === 'siscontain_minnum' || key2 === 'siscontain_maxnum')this.form[key2] = 'Y'
                }
            }
        },
        // 确认按钮
        determineClick(form) {
            let me = this 
            me.$refs[form].validate((valid) => {
                if (valid) {
                    me.request_methods(me.type, me.stype)
                } else {
                    return false;
                }
            });
        },
        // 请求方法
        async request_methods(tabsType, stype) {
            let res ,
                params = [this.form]
            // 1.【风险发生概率】请求 
            if(tabsType === 'first') {
                if(this.judgeMethods()) {
                    this.$message.warning('暂无更改')
                    return
                } else {
                    if(this.form.nminchance > 0)this.form.nminchance = this.form.nminchance / 100
                    if(this.form.nminchance == 0)this.form.nminchance = 0
                    if(this.form.nmaxchance > 0)this.form.nmaxchance = this.form.nmaxchance / 100
                    if(this.form.nmaxchance == 0)this.form.nmaxchance = 0
                    if(this.form.nminchance == '' || this.form.nmaxchance == '')return
                    if(stype === 'add')res = await riskprobability_add(params)
                    if(stype === 'modify')res = await riskprobability_update(params)
                }
            }
            // 2.【风险影响程度】请求
            if(tabsType === 'second') {
                if(this.judgeMethods()) {
                    this.$message.warning('暂无更改')
                    return
                } else {
                    if(stype === 'add')res = await risk_influence_degree_add(params)
                    if(stype === 'modify')res = await risk_influence_degree_update(params)
                }
            }
            // 3.【风险等级】请求
            if(tabsType === 'third') {
                if(this.judgeMethods()) {
                    this.$message.warning('暂无更改')
                    return
                } else {
                    if(stype === 'add')res = await riskmatrix_add(params)
                    if(stype === 'modify')res = await riskmatrix_update(params)
                }
            }
            // 5.【风险策略】请求
            if(tabsType === 'fifth') {
                if(this.judgeMethods()) {
                    this.$message.warning('暂无更改')
                    return
                } else {
                    if(stype === 'add')res = await riskstrategy_add(this.form)
                    if(stype === 'modify')res = await riskstrategy_update(this.form)
                }
            }
            // 请求回来的数据处理
            if(res.data.code === 200) { 
                this.$message.success(res.data.msg)
                this.dialogVisible = false 
                this.fartherThis.request_methods(tabsType)
            } else {
                this.$message.error(res.data.msg)               
            }
        },
        judgeMethods() {
            for(let key in this.form) { 
                if(this.type !== 'second' && this.form[key] !== this.scopeRow[key])return false
                if(this.type === 'second') {
                    if(key === 'spropertyloss' && this.form[key] !== this.scopeRow['valuerange'])return false
                    if(key !== 'spropertyloss' && this.form[key] !== this.scopeRow[key])return false
                }
            }
            return true
        }
    }
}
</script>

<style scoped>
.onlineEditing-dialog__select {
    width: 89px ;
}
.onlineEditing-dialog__input {
    width: 116px ;
}
.dialog-select-left2 {
    width: 83px ;
}
.onlineEditing-dialog-bottom {
    width: 100% ;
}
</style>
<style>
.onlineEditing-dialog__select .el-input__inner {
    border-top: 0;
    border-bottom: 0;
    border-radius: 2px;
}
.dialog-select-right .el-input__inner {
    border-right: 0;
}
.dialog-select-left .el-input__inner {
    border-left: 0;
}
.onlineEditing-dialog__input .el-input__inner {
    border-top: 0 ;
    border-left: 0 ;
    border-right: 0 ;
}
.dialog-select-left2 .el-input__inner{
    border: 0 ;
}
.onlineEditing-dialog-bottom .el-input-group__append {
    border: 0;
    background: #fff;
    padding: 0;
}
.onlineEditing-dialog__input2 .el-input__count {
    line-height: 15px ;
    right: 18px ;
    bottom: 1px ;
}
</style>
