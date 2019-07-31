<template>
<!--
    name: sjz
    说明：下达的弹出框
-->
    <div id="bulkOrderser">
        <!-- 外层 -->
        <div class="borders">
            <!-- 内层 -->
            <div class="borders_nei">
                <!-- input框  查询所用 -->
                <div class="borders_input">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                </div>
                <!-- 树形结构 展现公司、部门、人员的 -->
                <div class="borders_tree">
                    <el-tree
                    class="filter-tree"
                    :data="formData"
                    :props="defaultProps"
                    default-expand-all
                    highlight-current
                    show-checkbox
                    accordion
                    node-key="id"
                    check-strictly
                    @check-change="handleCheckChange"
                    :filter-node-method="filterNode"
                    ref="tree2">
                    </el-tree>
                </div>
                <!-- 按钮 -->
                <div class="borders_btn">
                    <el-button type="primary" plain size="medium" @click="determineBtn">确认下达</el-button>
                    <el-button type="warning" plain size="medium" @click="resetChecked">重置</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 引用批量下达接口
import {riskdistinguish_risk_release} from "~api/cube.js"
// 引用外置 js 文件
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
export default {
    name: "bulkOrderser",
    props: {
        data: Array,
        newThis: Object,
        isAddParse: Number,
        nthis: Object
    },
    data(){
        return {
            filterText: "",     // input 搜索框  
            deet: [],           // 存放公司id    
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
    computed: {
        /**
         * @event 树形数据返回的监听事件的回调
         */
        formData: function(){
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
         * @event 节点选中状态发生变化时的回调
         */
        handleCheckChange(node, isCheck, $cc){
            let me = this ;
            let nodeObj = node ;
            node = [node] ;
            /**
             * 如果isCheck为 true 时，即选中状态，否则为 false ，即不选中状态；
             * 为真时，把勾选公司放进deet数组里
             * 为假时，把勾选公司从deet数组里移除
             */
            if(isCheck){
                node.forEach(res => { me.deet.push(res.id) ; });
            }else{
                me.deet = me.deet.filter((key, index) => { if(key !== nodeObj.id)return key ; })
            }           
            console.log('123', me.deet) ;
        },
        /**
         * @event 确认下达按钮
         */
        determineBtn(){
            // debugger
            let me = this ;
            let is = me.nthis ;
            let params = {} ;
            let rowId = me.newThis.view_row.id ;
            let $params = me.$store.state.prame.command;
            if(me.deet.length === 0){
                me.$message({ message: "温馨提示：由于您没有选择公司，无法下达！", type: "warning" }) ;
            }else{
                if(is.isAddParse){
                    params = {
                        companys:  me.deet ,
                        ids: [ rowId ],
                        period: $params.year + mini.getPeriod($params) 
                    }
                }else{ // 添加弹出框的下达
                    params = {
                        companys: me.deet ,
                        ids: [ 0 ] ,
                        period: $params.year + mini.getPeriod($params) ,
                        riskDistinguishDto: {
                            company: is.params_cloning[0].company ,
                            department: is.params_cloning[0].department ,
                            screatetime: is.params_cloning[0].screatetime ,
                            sfilluser: is.params_cloning[0].sfilluser ,
                            sreporttype: is.params_cloning[0].sreporttype ,
                            sriskname: is.params_cloning[0].sriskname ,
                            period: is.params_cloning[0].period ,
                            srisktype: is.params_cloning[0].srisktype
                        }

                    }
                }
                riskdistinguish_risk_release(params).then(res => {
                    if(res.data.code === 200){
                        me.deet = [] ;
                        me.$message({ message: "下达成功!", type: "success" }) ;                        
                        me.nthis.checkbox = false ;
                        me.nthis.riskReleaseVo();
                    }else{
                        me.$message.error("下达失败!");
                        
                    }
                }) ;
            }

        },
        /**
         * @event 重置按钮
         */
        resetChecked(){
            this.deet = [] ;
            this.$refs.tree2.setCheckedKeys([]);
        }
        
    }
}
</script>
<style scoped>
/*最外层的div框*/
    .borders{
        width: 550px;
        height: 500px;
        /* border: 1px solid #ccc ; */
        position: absolute;
        background: #fff ;
        margin-top: -505px;
        box-shadow:0px 0px 8px #ccc ;
    }
/*里层的div框*/    
    .borders_nei{
        width: 532px;
        height: 432px;
        /* border: 1px solid #ccc; */
        background: #fff;
        position: absolute;
        margin-top: 8.5px;
        margin-left: 8.5px;        
    }
/*input框*/
    .borders_input{
        width: 100%; 
        height: 40px;
    }
/*树形结构框*/
    .borders_tree{
        width: 100%; 
        height:380px; 
        border: 1px solid #dcdfe6;
        margin-top: 10px;
        overflow: auto;
    }
/*按钮*/
    .borders_btn{
        margin-top: 12px; 
        margin-left: 253px;
    }    
</style>
