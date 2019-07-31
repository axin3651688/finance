<template>
    <!--
        name: sjz
        说明：批量下达按钮弹出框
    -->
    <div id="bulkOrdersers">
        <el-dialog 
        class="bulkOrdersers_dialog"
        title="批量下达" 
        :visible.sync="dialogFormVisible2"
        :show-close="false"
        :close-on-click-modal="false"
        width="600px"
        >
            <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
            <el-form ref="form">
                <!-- input框  查询所用 -->
                <el-form-item>
                    <el-input v-model="filterText" placeholder="输入关键字进行过滤"></el-input>
                </el-form-item>
                <!-- 树形结构 展现公司、部门、人员的 -->
                <el-form-item class="bulkOrdersers_tree">
                    <el-tree
                    class="filter-tree"
                    :data="formData2"
                    :props="defaultProps"
                    default-expand-all
                    highlight-current
                    show-checkbox
                    accordion
                    node-key="id"
                    :check-strictly="false"
                    @check-change="handleCheckChange"
                    :filter-node-method="filterNode"
                    ref="tree2">
                    </el-tree>
                </el-form-item>
                <el-form-item class="bulkOrdersers_btn" size="medium ">
                    <el-button type="primary" plain @click="onSubmit">下达按钮</el-button>
                    <el-button type="warning" plain @click="onReset">重置</el-button>
                    <el-button plain @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 引用批量下达接口
import {riskdistinguish_risk_release} from "~api/cube.js"
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
export default {
    name: "bulkOrdersers",
    props: {
        newThis: Object,
        data: Array
    },
    data(){
        return {
            dialogFormVisible2: true ,
            filterText: "",
            deat: [] ,
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created(){
        
    },
    watch: {
        /**
         * @event 输入关键字进行过滤的监听事件
         */
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    computed: {
        /**
         * @event 树形数据返回的监听事件的回调
         */
        formData2: function(){ 
            return this.data ;
        }
    },
    methods: {
        /**
         * @event 对树节点进行筛选时执行的方法，返回-true-表示这个节点可以显示，返回-false-则表示这个节点会被隐藏
         */
        filterNode(value, data){
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        /**
         * @event 选择公司
         */
        handleCheckChange(node, isCheck, $cc){
            // debugger
            // let me = this ;
            // let nodeObj = node ;
            // node = [node] ;
            /**
             * 如果isCheck为 true 时，即选中状态，否则为 false ，即不选中状态；
             * 为真时，把勾选公司放进deet数组里
             * 为假时，把勾选公司从deet数组里移除
             */
            // if(isCheck){
            //     node.forEach(res => { me.deat.push(res.id) ; });
            // }else{
            //     me.deat = me.deat.filter((key, index) => { if(key !== nodeObj.id)return key ; })
            // }           
            // console.log('123', me.deat) ;
        },
        /**
         * @event 1.下达按钮
         */
        onSubmit(){
            debugger
            let me = this ;
            let params = {} ;
            let rowId = [] ;
            me.newThis.selection.forEach(ress => { rowId.push(ress.id) ; })
            let nodes = me.$refs.tree2.getCheckedNodes() ;
            nodes.forEach(ress => { me.deat.push(ress.id) ; }) 
            let $params = me.$store.state.prame.command;
            if(me.deat.length === 0){
                me.$message({ message: "温馨提示：由于您没有选择公司，无法下达！", type: "warning" }) ;
            }else{
                params = {
                    companys:  me.deat ,
                    ids:  rowId ,
                    period: $params.year + mini.getPeriod($params) 
                }
                riskdistinguish_risk_release(params).then(res => { debugger
                    if(res.data.code === 200){
                        me.deat = [] ;
                        me.$message({ message: "下达成功!", type: "success" }) ;
                        me.onCancel() ;
                    }else{
                        me.$message.error(res.data.msg);
                        
                    }
                }) ;
            }
        },
        /**
         * @event 2.重置按钮
         */
        onReset(){
            this.deat = [] ;
            this.$refs.tree2.setCheckedKeys([]);
        },
        /**
         * @event 3.取消关闭按钮
         */
        onCancel(){
            this.newThis.riskRelease = false ;
            this.$refs.tree2.setCheckedKeys([]);
        }
    }
}
</script>
<style scoped>
.bulkOrdersers_dialog{
    height: 640px;
    margin-top: 0vh;
    position: absolute;
    overflow: hidden;
}
.bulkOrdersers_tree{
    width: 100%; 
    height: 290px;
    border:1px solid #dcdfe6;
    overflow: auto ;
}
.bulkOrdersers_btn{
    margin: 0 0 0 302px ;
}
</style>
