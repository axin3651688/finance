<template>
<!--
    name: sjz
    说明：上报按钮的弹出框
-->
    <div id="reportDialog">
        <div class="reportDialog_border">
            <!-- input框  查询所用 -->
            <!-- <div class="borders_input"> -->
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <!-- </div> -->
            <!-- 树形结构 展现公司、部门、人员的 -->
            <!-- <div class="borders_tree"> -->
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
            <!-- </div> -->
            <div class="btn-sure">
                <el-button type="primary" @click="checkedSure">确定</el-button>
                <el-button @click="resetChecked">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { riskreportstate_add } from "~api/cube.js"
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
         * @event 确定按钮
         */
        checkedSure(){
            // debugger
            let me = this;
            let nodes = this.$refs.tree2.getCheckedNodes();
            if(nodes && nodes.length > 0){
                this.getriskreportstate_add(nodes) ;
                this.newThis.nisShow = false ;
            }else{
                this.$message({ message: "请选择上报人！", type: "warning" }) ;
            }
        },
        getriskreportstate_add(nodes) {
            // debugger
            let me = this ;
            let data = me.newThis.dataReport ;// 总数据
            let suers = nodes[0].id ;         // 上报给的人
            let $params = me.$store.state.prame.command; 
            let sfilluser = this.$store.getters.user.user.userName;
            let riskReportStateDtos = [] ;
            data.forEach(res => {
                let id ;
                if(res.id2){
                    id = res.id2 ;
                }else{
                    id = 0 ;
                }
                riskReportStateDtos.push({
                    company: res.dim_company,  
                    period: $params.year + mini.getPeriod($params), 
                    sisreport: 1 ,
                    sreporttime: mini.getTimers(),
                    sriskname: res.sriskname,
                    nrelateid: res.nid,
                    sreportuser: sfilluser,
                    id: id 
                });
            })
            let params = {
                riskReportStateDtos,
                users: [suers]
            }
            riskreportstate_add(params).then(red => { 
                if(red.data.code === 200){
                    me.$message({ message: "上报成功！", type: "success" }) ;
                    me.newThis.newThis.setTreeTableRequest() ;
                }else{
                    me.$message.error(red.data.msg);                   
                }
            })
        },
        /**
         * @event 树表选择时的回调
         */
        checkChange(data, checked, node){
            if(checked == true){
                this.checkedId = data.id;
                this.$refs.tree2.setCheckedNodes([data]);
            }
        },
        /**
         * @event 重置按钮
         */
        resetChecked(){
            this.$refs.tree2.setCheckedKeys([]);
        }
    }
}
</script>
<style scoped>
#reportDialog{
    width: 100%;
}
.reportDialog_border{
    background: white;
        width: 200px;
        margin-top: 10px;
        border: 1px solid #606266;
        padding: 5px;
        position: absolute;
        bottom: 80px;
        right: 20px;
        max-height: 354px;
        overflow: auto;
}
.filter-tree {
    max-height: 250px;
    overflow: auto;
}
.btn-sure {
    text-align: right;
    margin-top: 10px;
}

.btn-sure button {
    border-radius: 16px;
    padding: 8px 16px;
}
</style>
