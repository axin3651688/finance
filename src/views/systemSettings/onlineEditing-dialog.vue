/**
 * name: sjz
 * 说明：弹出框组件
 */
<template>
    <div id="onlineEditing-dialog">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            top="8vh"
            width="560px"
            >
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item 
                    v-for="(item, index) in dialogData" 
                    :key="index + ''" 
                    :label="item.label" 
                    :prop="item.prop" 
                    :rules="getRules(item)">
                    <el-input 
                        v-if="item.prop === 'nscore'"
                        :type="item.input" 
                        v-model.number="form[item.prop]" 
                        :autosize="{ minRows: 4, maxRows: 4}">
                    </el-input>
                    <span v-else-if="item.prop === 'valuerange' && type === 'first'">
                        <el-input placeholder="请输入内容" v-model.number="form['nminchance']" class="input-with-select onlineEditing-dialog__input">
                            <el-select v-model="form.siscontain_minchance" slot="prepend" placeholder="选择" style="width: 75px;background: #fff">
                                <el-option label="[" value="Y"></el-option>
                                <el-option label="(" value="N"></el-option>
                            </el-select>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model.number="form['nmaxchance']" class="onlineEditing-dialog__input" >
                            <template slot="append">
                                <el-select v-model="form.siscontain_maxchance" slot="prepend" placeholder="选择" style="width: 75px;background: #fff;">
                                    <el-option label="]" value="Y"></el-option>
                                    <el-option label=")" value="N"></el-option>
                                </el-select>
                            </template>
                        </el-input>
                    </span>
                    <span v-else-if="item.prop === 'valuerange' && type === 'third'">
                        <el-input placeholder="请输入内容" v-model.number="form['nminnum']" class="onlineEditing-dialog__input onlineEditing-dialog-left" >
                            <template slot="append">
                                <el-select v-model="form.siscontain_minnum" slot="prepend" placeholder="选择" style="width: 75px;background: #fff;">
                                    <el-option label="≤" value="Y"></el-option>
                                </el-select>
                            </template>
                        </el-input>
                        <b>R</b>
                        <el-input placeholder="请输入内容" v-model.number="form['nmaxnum']" class="onlineEditing-dialog__input onlineEditing-dialog-right" >                           
                            <el-select v-model="form.siscontain_maxnum" slot="prepend" placeholder="选择" style="width: 75px;background: #fff;">
                                <el-option label="≤" value="Y"></el-option>
                            </el-select>
                        </el-input>
                    </span>
                    <span v-else-if="item.prop === 'colormark' && type === 'third'">
                        <el-input placeholder="请输入内容" v-model="form['colormark']" readonly class="onlineEditing-dialog__input onlineEditing-dialog-bottom" >
                            <template slot="append">
                                <el-color-picker v-model="form['colormark']" show-alpha></el-color-picker>
                            </template>
                        </el-input>
                    </span>
                    <el-input 
                        v-else
                        :type="item.input" 
                        v-model="form[item.prop]" 
                        :autosize="{ minRows: 4, maxRows: 4}">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determineClick('form')">确 定</el-button>
                <el-button @click="cancelClick('form')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
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
        type: String ,
        fatherThis: Object
    },
    data(){
        return{
            title: "" ,
            stype: "" ,
            select: "" ,
            dialogVisible: false ,
            dialogData: [] ,
            tableData: {} ,
            form: {
                
            },
        }
    },
    methods: {
        // 验证方法|| (item.prop === 'valuerange' && (this.type === 'first' || this.type === 'third'))
        getRules(item) {
            let bmv = [] 
            let cmv = {}
            if(item.prop === 'nscore') {
                return bmv = [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { type: 'number', message: '只能输入数字类型', trigger: ['blur', 'change'] }
                ]
            } else if(item.prop !== 'sdescription' && item.prop !== 'valuerange' || (item.prop === 'valuerange' && this.type === 'second')) {
                return cmv = { required: true, message: '不能为空', trigger: 'blur' }
            }
        },
        // 确认按钮
        determineClick(formName) {
            let me = this 
            me.$refs[formName].validate((valid) => {
                if (valid) {
                    if(me.stype === 'add')me.add_request()
                    if(me.stype === 'modify')me.modify_request()
                } else {
                    return false;
                }
            });
        },
        // 取消按钮
        cancelClick(formName) {
            this.dialogVisible = false
        },
        // 添加页面请求
        async add_request() { 
            let res ,
                data = {} ,
                params = [this.form]
            if(this.type === 'first') {
                if(this.form.nminchance == '' || this.form.nmaxchance == '') {
                    this.$message.warning('概率值请填写完整，必须是数字值');                    
                    return
                } 
                if (this.form.nminchance != 0)this.form.nminchance = this.form.nminchance / 100
                if (this.form.nmaxchance != 0)this.form.nmaxchance = this.form.nmaxchance / 100
                res = await riskprobability_add(params)
            }
            if(this.type === 'second') {
                this.form.spropertyloss = this.form.valuerange
                params = [this.form]
                res = await risk_influence_degree_add(params)
            }
            if(this.type === 'third')res = await riskmatrix_add(params)
            if(this.type === 'fifth') {
                params = this.form
                res = await riskstrategy_add(params)
            }
            if(res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.dialogVisible = false 
                this.fatherThis.requestMethods(this.type)
            } else {
                this.$message.error(res.data.msg)
            }
        },
        // 修改页面请求
        async modify_request() {
            let res ,
                params = [this.form]
            // if(this.judgeMethods()) {
            //     this.$message.warning('暂无更改'); 
            //     return
            // }
            if(this.type === 'first') {
                if(this.form.nminchance == '' || this.form.nmaxchance == '') {
                    this.$message.warning('概率值请填写完整，必须是数字值');                    
                    return
                } 
                if (this.form.nminchance != 0)this.form.nminchance = this.form.nminchance / 100
                if (this.form.nmaxchance != 0)this.form.nmaxchance = this.form.nmaxchance / 100
                res = await riskprobability_update(params)
            }
            if(this.type === 'second') {
                this.form.spropertyloss = this.form.valuerange
                params = [this.form]
                res = await risk_influence_degree_update(params)
            }
            if(this.type === 'third')res = await riskmatrix_update(params)
            if(this.type === 'fifth') {
                params = this.form
                res = await riskstrategy_update(params)
            }
            if(res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.dialogVisible = false 
                this.fatherThis.requestMethods(this.type)
            } else {
                this.$message.error(res.data.msg)
            }
        },
        // 判断是否变更
        // judgeMethods() {
        //     for(let key in this.form) {
        //         if(this.form[key] !== this.tableData.row[key]){
        //             return false 
        //         } 
        //     }
        //     return true
        // },
        // 修改赋值
        assignmentMethods(scope) {
            // debugger
            this.form = {}
            this.form = scope.row
        }
    }
}
</script>
<style scoped>
.onlineEditing-dialog__input {
    width: 200px ;
}
.input-with-select {
    margin-right: 8px; 
}
</style>
<style>
.onlineEditing-dialog__input .el-input__inner {
    border-right: 0 ;
    border-left: 0 ;
    border-top: 0 ;
}
.onlineEditing-dialog-left .el-input-group__append {
    border: 0 !important;
}
.onlineEditing-dialog-right .el-input-group__prepend {
    border-left: 0 !important;
}
.onlineEditing-dialog-bottom {
    width: 100% !important;
}
.onlineEditing-dialog-bottom .el-input-group__append {
    height: 40px;
    padding: 0;
    border: 0;
    background: #fff;
}
</style>
