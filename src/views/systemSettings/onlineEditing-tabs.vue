/**
 * name：sjz
 * 在线编辑通用组件
 */
<template>
    <div id="onlineEditing-tabs">
        <!-- 添加按钮 -->
        <div class="add__btn">
            <el-button class="add_btn" size="small" icon="el-icon-refresh" round @click="refreshClick(type)">刷 新</el-button>
            <el-button  v-if="type !== 'fourth'" class="add_btn" size="small" icon="el-icon-plus" round @click="addClick(type)">添 加</el-button>
        </div>
        <!-- 树形 -->
        <onlineEditing-tree v-if="type === 'fourth'" ref="tree" :fatherThis="fatherThis"></onlineEditing-tree>
        <!-- 表格 -->
        <el-table
            v-if="type !== 'fourth'"
            ref="table"
            border
            stripe
            :data="tableData"
            :header-cell-style="headerCellStyle"
            :cell-style="cellStyle"
            :height="getHeights()"
            >
                <el-table-column type="index" prop="index" align="center" label="序号" width="60"></el-table-column>
                <el-table-column 
                    v-for="(item, index) in filterby(columns, type)" 
                    :key="index + ''" 
                    :prop="item.prop" 
                    :label="item.label" 
                    :align="item.align" 
                    :width="item.width"
                    :min-width="item.minWidth"
                    :show-overflow-tooltip="item.showOverFlowTooltip">
                        <template slot-scope="scope">
                            <div v-if="item.prop === 'colormark'" :style="getColormark(item, scope.row)"></div>
                            <div v-else>{{ scope.row[item.prop] }}</div>
                        </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="160" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium " icon="el-icon-edit-outline" class="css3_btn" @click="modifyClick(scope, type)">修 改</el-button>
                        <el-button type="text" size="medium " icon="el-icon-delete" class="deleteClass css3_btn" @click="deleteClick(scope, type)">删 除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 弹出框 -->
        <onlineEditing-dialog ref="dialog" :type="type" :fatherThis="fatherThis"></onlineEditing-dialog>
        <!-- <hr>
        <pre>{{ tableData }}</pre> -->
    </div>
</template>
<script>
import Vue from 'vue'
import tools from 'utils/tools.js'
import {
    riskprobability,        // 风险发生概率
    risk_influence_degree,  // 风险影响等级
    riskmatrix_all,         // 风险等级
    risktype_All,           // 风险类型
    riskstrategy,           // 风险策略
    riskprobability_delete, // 风险发生概率的删除接口
    risk_influence_degree_delete,   // 风险影响程度的删除接口
    riskmatrix_delete,      // 风险等级删除接口
    riskstrategy_delete     // 风险策略删除接口
} from '~api/cube.js'
export default {
    props: {
        type: String
    },
    components: {
        onlineEditingDialog: () => import('./onlineEditing-dialog.vue'),
        onlineEditingTree: () => import('./onlineEditing-tree.vue')
    },
    data(){
        return {
            fatherThis: this ,
            heights: 0 ,
            tableData: [] ,
            data: [],
            columns: [
                // 风险发生概率
                { type: 'first', input: 'text', prop: 'nscore', label: '评分估值', align: 'center', width: '100' },
                { type: 'first', input: 'text', prop: 'sname', label: '可能性', align: 'center', width: '120' },
                { type: 'first', input: 'text', prop: 'valuerange', label: '概率值', align: 'center', width: '160' },
                { type: 'first', input: 'textarea', prop: 'sdescription', label: '说明', align: 'left', minWidth: '360', showOverFlowTooltip: true },
                // 风险影响程度
                { type: 'second', input: 'text', prop: 'nscore', label: '评分估值', align: 'center', width: '100' },
                { type: 'second', input: 'text', prop: 'sname', label: '损失程度', align: 'center', width: '120' },
                { type: 'second', input: 'textarea', prop: 'srequirement', label: '法律法规', align: 'left', minWidth: '360', showOverFlowTooltip: true },
                { type: 'second', input: 'text', prop: 'spersonnelstate', label: '人员情况', align: 'left', width: '240', showOverFlowTooltip: true },
                { type: 'second', input: 'text', prop: 'valuerange', label: '财产损失', align: 'center', width: '120', showOverFlowTooltip: true },
                { type: 'second', input: 'text', prop: 'sshutdown', label: '停工', align: 'left', width: '200', showOverFlowTooltip: true },
                { type: 'second', input: 'text', prop: 'senterpriseimage', label: '企业形象', align: 'left', width: '160', showOverFlowTooltip: true },
                { type: 'second', input: 'textarea', prop: 'sdescription', label: '其他说明', align: 'left', minWidth: '360', showOverFlowTooltip: true },
                // 风险等级
                { type: 'third', prop: 'valuerange', label: '风险值', align: 'center', width: '160' },
                { type: 'third', prop: 'sname', label: '风险等级', align: 'center', width: '160' },
                { type: 'third', prop: 'scontrolmeasure', label: '控制措施', align: 'left', minWidth: '360', showOverFlowTooltip: true },
                { type: 'third', prop: 'stimelimit', label: '实施期限', align: 'left', width: '230' },
                { type: 'third', prop: 'colormark', label: '颜色标记', align: 'center', width: '160' },
                // 风险策略
                { type: 'fifth', input: 'text', prop: 'sname', label: '策略名称', align: 'center', width: '160' },
                { type: 'fifth', input: 'textarea', prop: 'sdesc', label: '风险事项说明', align: '', minWidth: '360', showOverFlowTooltip: true }
            ]
        }
    },
    created() {
        this.requestMethods(this.type)
    },
    mounted() {
        this.setClientHeight()
    },
    methods: {
        // 自适应高度
        setClientHeight() {
            let me = this
            me.sizeMethods(window.innerHeight, me)
            window.onresize = function temp() { 
                me.requestMethods(me.type)
            }
        },
        // 尺寸
        sizeMethods(value, me) {
            setTimeout(() => {
                me.heights = value - 160
            },100)
        },
        getHeights() { 
            return window.innerHeight - 160
        },
        // 表头的单元格样式
        headerCellStyle({ row, rowIndex }) {
            return {
                padding: 0 ,
                height: '35px' ,
                fontWeight: 100 ,
                backgroundColor: '#f0f8ff' ,
                textAlign: 'center'
            }
        },
        // 表格单元格样式
        cellStyle({row, column, rowIndex, columnIndex}) {
            return {
                padding: 0 ,
                height: '32px' ,
                color: '#606266'
            }
        },
        // 数组过滤
        filterby(array, type) {
            return array.filter(res => { return res.type === type})            
        },
        // 请求方法
        async requestMethods(type) {
            let res 
            this.tableData = []
            // 1.【风险发生概率】请求
            if(type === 'first')res = await riskprobability()
            // 2.【风险影响等级】请求
            if(type === 'second')res = await risk_influence_degree()
            // 3.【风险等级】请求
            if(type === 'third')res = await riskmatrix_all()
            // 4.【风险类型】请求
            if(type === 'fourth')res = await risktype_All()
            // 5.【风险策略】请求
            if(type === 'fifth')res = await riskstrategy()
            if(res.data.code === 200) {
                if(type !== 'fourth') {
                    this.tableData = res.data.data 
                } else {
                    this.risktype_request(res.data.data)
                }
            } else {    
                this.$message.error(res.data.msg)
            }
        },
        // 【风险类型】请求
        risktype_request(treeData) {
            let res, data ;
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
            if (Array.isArray(treeData) && treeData.length > 0) { 
                treeData = tools.sortByKey(treeData, "scode");
                treeData = treeData.filter(function(item) {
                    item.label = "(" + item.scode + ") " + item.sname;
                    return item;
                });
                this.$refs.tree.tableData = tools.transformToeTreeNodes(setting, treeData);
            }
        },
        // 刷新按钮点击事件
        refreshClick(type) {
            if(type === 'fourth') {
                this.$refs.tree.disabled = true 
                this.$refs.tree.input = false 
                this.$refs.tree.determine = true
                this.$refs.tree.type = ''
                let obj = this.$refs.tree.ruleForm 
                for(let key in obj) {
                    obj[key] = ''
                }
            }
            this.requestMethods(type)
        },
        // 添加按钮点击事件 
        addClick(type) {
            this.$refs.dialog.title = '添 加'
            this.$refs.dialog.stype = 'add'
            this.$refs.dialog.dialogVisible = true 
            // this.$refs.dialog.$refs['form'].resetFields();
            this.$refs.dialog.dialogData = []
            this.$refs.dialog.form = {}
            this.$refs.dialog.dialogData = this.filterby(this.columns, type)
        },
        // 修改按钮点击事件
        modifyClick(scope, type) {
            this.$refs.dialog.title = '修 改'
            this.$refs.dialog.stype = 'modify'
            this.$refs.dialog.dialogVisible = true 
            this.$refs.dialog.dialogData = []
            this.$refs.dialog.tableData = scope
            this.$refs.dialog.dialogData = this.filterby(this.columns, type)
            this.$refs.dialog.assignmentMethods(scope) ;

        },
        // 删除按钮点击事件
        deleteClick(scope, type) { 
            let res ,
                me = this ,
                data = { id: scope.row.id } ,
                params = [scope.row.id]
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                if(type === 'first')res = await riskprobability_delete(params)
                if(type === 'second')res = await risk_influence_degree_delete(params)
                if(type === 'third')res = await riskmatrix_delete(params)
                if(type === 'fifth')res = await riskstrategy_delete(data)
                if(res.data.code === 200) {
                    me.$message.success(res.data.msg)
                    me.requestMethods(type) 
                } else {
                    me.$message.error(res.data.msg)
                }
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除' });          
            });
        },
        // 风险等级颜色
        getColormark(item, scopeRow) { 
            return {
                height: '30px' ,
                width: '100%' ,
                backgroundColor: scopeRow[item.prop]
            }
        }
    }
}
</script>
<style scoped>
#onlineEditing-tabs {
    height: 100% ;
    width: 100% ;
}
.deleteClass {
    color: #f56c6c ;
}
.add__btn {
    text-align: right ;
    margin-right: 17px;
    margin-bottom: 10px;
}
.add_btn {
    background: linear-gradient(to right, #9FD467 , #2DB060);
    color: #fff ;
}
.css3_btn {
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
}
.css3_btn:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
}
</style>
