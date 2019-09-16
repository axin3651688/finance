/**
 * 系统设置 -> 初始化管理 - 在线编辑 __表格组件 
 */
<template>
    <div id="onlineEditing-table">
        <!-- 按钮 -->
        <div class="onlineEditing-table__btn">
            <el-button round size="small" class="table__btn-refresh" icon="el-icon-refresh" @click="refreshClick">刷 新</el-button>
            <el-button round size="small" class="table__btn-plus" icon="el-icon-plus" @click="addClick">添 加</el-button>
        </div>
        <!-- 表格 -->
        <el-table
            v-if="type !== 'fourth'"
            ref="table"
            border
            stripe
            :height="heights"
            :data="tableData"
            :header-cell-style="headerCellStyle"
            :cell-style="cellStyle"
            >
                <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                <el-table-column
                    v-for="(item, index) in filterby(type)"
                    :key="index + ''" 
                    :prop="item.id" 
                    :label="item.text" 
                    :align="item.align" 
                    :width="item.width"
                    :min-width="item.minWidth"
                    :show-overflow-tooltip="item.showOverFlowTooltip">
                    <template slot-scope="scope">
                        <div v-if="item.id === 'colormark'" :style="getBackground_color(scope.row, item)"></div>
                        <div v-else>{{ scope.row[item.id] }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="160" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium " icon="el-icon-edit-outline" class="css3_btn-modify" @click="modifyClick(scope, type)">修 改</el-button>
                        <el-button type="text" size="medium " icon="el-icon-delete" class="css3_btn-delete" @click="deleteClick(scope, type)">删 除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 弹出框组件 -->
        <onlineEditing-dialog ref="dialog" :fartherThis="fartherThis" :type="type"></onlineEditing-dialog>
        <!-- <hr>
        <pre>{{ tableData }}</pre> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cols from 'utils/columns.js'
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
import { setTimeout } from 'timers';
export default {
    props: {
        type: String
    },
    components: {
        onlineEditingDialog: () => import('./onlineEditing-dialog.vue')
    },
    data(){
        return{
            heights: 550 ,
            fartherThis: this ,
            stype: "" ,
            tableData: [],
            columns: cols.onlineEditing_table()
        }
    },
    created(){
        this.request_methods(this.type)
    },
    methods: {
        
        /**
         * @event 表格方法
         */
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
        // 表格的单元格样式
        cellStyle({ row, column, rowIndex, columnIndex }) {
            return {
                padding: 0 ,
                height: '32px' ,
                color: '#606266'
            }
        },
        /**
         * @event 按钮区域
         */
        // 添加按钮
        addClick() {
            this.$refs.dialog.stype = 'add'
            this.$refs.dialog.form = cols.onlineEditing_dialog(this.type)
            this.$refs.dialog.assignment_methods(null)
            this.$refs.dialog.dialogVisible = true
        },
        // 修改按钮
        modifyClick(scope, type) {
            this.$refs.dialog.stype = 'modify'
            this.$refs.dialog.form = cols.onlineEditing_dialog(this.type)
            this.$refs.dialog.assignment_methods(scope.row)
            this.$refs.dialog.dialogVisible = true
        },
        // 删除按钮
        deleteClick(scope, type) {
            let res ,
                me = this ,
                params = type === 'fifth'?{id: scope.row.id}:[scope.row.id]
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                // 1. 风险发生概率的删除接口方法
                if(type === 'first')res = await riskprobability_delete(params)
                // 2. 风险影响程度的删除接口方法
                if(type === 'second')res = await risk_influence_degree_delete(params)
                // 3. 风险等级删除接口方法
                if(type === 'third')res = await riskmatrix_delete(params)
                // 5. 风险策略删除接口方法
                if(type === 'fifth')res = await riskstrategy_delete(params)
                if(res.data.code === 200) {
                    me.$message.success(res.data.msg)
                    me.request_methods(type)
                } else {
                    me.$message.error(res.data.msg)
                }
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除' });          
            })
        },
        // 刷新按钮
        refreshClick() {
            this.request_methods(this.type)
        },
        /**
         * @event 特殊处理区域
         */
        filterby(type) {
            return this.columns.filter(res => { return res.type === type })
        },
        getBackground_color(scopeRow, item) {
            return {
                backgroundColor: scopeRow[item.id] ,
                width: '100%' ,
                height: '30px'
            }
        },
        /**
         * @event 请求区域
         */
        async request_methods(type) {
            let res
            this.tableData = []
            // 1. 风险发生概率请求
            if(type === 'first')res = await riskprobability() 
            // 2. 风险影响程度请求
            if(type === 'second')res = await risk_influence_degree()
            // 3. 风险等级请求
            if(type === 'third')res = await riskmatrix_all()
            // 5. 风险策略
            if(type === 'fifth')res = await riskstrategy()
            // 请求的结果并处理
            if(res.data.code === 200) {
                this.tableData = res.data.data
            } else {
                this.$message.error(res.data.msg)
            }
        },

    }
}
</script>

<style scoped>
.onlineEditing-table__btn {
    text-align: right ;
    margin-bottom: 10px ;
}
.table__btn-refresh ,
.table__btn-plus {
    color: #fff ;
    background: linear-gradient(to right, #9FD467 , #2DB060);
}
.css3_btn-modify {
    color: #e6a23c ;
}
.css3_btn-delete {
    color: #f56c6c ;
}
</style>
