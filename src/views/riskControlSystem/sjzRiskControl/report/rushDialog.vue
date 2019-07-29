<template>
<!--
    name: sjz
    说明：【催报】按钮弹出框
-->
    <div id="rushDialog">
        <div class="reportDialog_border">
            <!-- input框  查询所用 -->
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <!-- 树形结构 展现公司、部门、人员的 -->
                <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                highlight-current
                show-checkbox
                accordion
                node-key="id"
                check-strictly
                :filter-node-method="filterNode"
                @check-change="checkChange"
                ref="tree2">
                </el-tree>
            <div class="btn-sure">
                <el-button type="primary" @click="checkedSure">确定</el-button>
                <el-button @click="resetChecked">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
export default {
    props: {
        data: Array,
        newThis: Object
    },
    data(){
        return {
            filterText: "",     // input 搜索框  
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    watch: {
        /**
         * @event 输入关键字进行过滤的监听事件
         */
        filterText(val) {
            this.$refs.tree2.filter(val);
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
         * @event 重置按钮
         */
        resetChecked(){
            this.$refs.tree2.setCheckedKeys([]);
        },
        /**
         * @event 节点选中状态发生变化时的回调
         */
        checkChange(data, checked, obj){
            if(checked == true){
                this.checkedId = data.id;
                this.$refs.tree2.setCheckedNodes([data]);
            }
        },
        /**
         * @event 确定按钮
         */
        checkedSure(){
            // debugger
            let me = this;
            let nodes = me.$refs.tree2.getCheckedNodes();
            if(nodes && nodes.length > 0){
                me.$emit("rushRequest",nodes)
            }else{
                me.$message({ message: "请选择催报人！", type: "warning" }) ;
            }
        }
    }
}
</script>
<style scoped>
.reportDialog_border{
    background: white;
    width: 100%;
    /* margin-top: 10px; */
    /* border: 1px solid #606266;; */
    /* padding: 5px; */
    /* position: absolute;
    bottom: 80px;
    right: 20px; */
    max-height: 554px;
    overflow: auto;
}
.btn-sure {
    text-align: right;
    /* margin-top: 10px; */
}
.filter-tree {
    max-height: 350px;
    overflow: auto;
}
</style>
