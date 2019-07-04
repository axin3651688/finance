<template>
<!--
    name: sjz
    说明： 下达记录弹出框
-->
    <div id="orderDialog">
        <el-table :data="tableData" height="347px" style="width: 100%;" border>
            <el-table-column prop="row_id" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sriskname" label="风险名称" width="180" align="center"></el-table-column>
            <el-table-column prop="srisktypename" label="风险类型" width="150" align="center"></el-table-column>
            <el-table-column prop="ngradename" label="风险等级" width="150" align="center"></el-table-column>
            <el-table-column prop="dim_departmentname" label="填报部门" width="150" align="center"></el-table-column>
            <el-table-column prop="sfillusername" label="填报人" width="150" align="center"></el-table-column>
            <el-table-column prop="sorigintime" label="下达时间" width="260" align="center"></el-table-column>
            <el-table-column prop="companyname" label="目标路径" width="360" align="left"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalData">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,               
        newThis: Object ,           // 父组件的this对象
    },
    data(){
        return {
            currentPage: 1 ,        // 每次初始化都在第一页
            pageSize: 100 ,         // 每次初始化每页都100条数据
        }
    },
    computed: {
        tableData: function() { debugger
            let tmp;
            if(this.data.datas!=undefined) {
                if (!Array.isArray(this.data.datas)) {
                    tmp = [this.data.datas] ;
                } else {
                    tmp = this.data.datas ;
                }
            } else {
                tmp = [] ;
            }
            return tmp ;
        },
        totalData: function() { 
            return this.data.total ;
        }
    },
    methods: {
        /**
         * @description pageSize 改变时会触发
         * 回调参数：每页条数size
         */
        handleSizeChange(pageSize){ 
            this.pageSize = pageSize ;
            this.newThis.orderRecord(null, this.currentPage, pageSize) ;
        },
        /**
         * @description currentPage 改变时会触发
         * 回调参数：当前页currentPage
         */
        handleCurrentChange(currentPage){
            this.currentPage = currentPage ;
            this.newThis.orderRecord(null, currentPage, this.pageSize) ;
        }
    }
}
</script>
<style scoped>
#orderDialog {
    width: 100%;
    overflow: auto;
    /* height: 420px; */
    /* height: 1000px ; */
}
.pagination {
    text-align: right ;
    border: 1px solid #dcdfe6 ;
    background-color: rgb(240, 248, 255) ;
}
</style>
