<template>
<!--
    name: sjz
    说明： 下达记录弹出框
-->
    <div id="orderDialog">
        <el-table :data="tableData" height="380px" style="width: 100%;" border>
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="sriskname" label="风险名称" width="180" align="center"></el-table-column>
            <el-table-column prop="srisktypename" label="风险类型" width="150" align="center"></el-table-column>
            <el-table-column prop="ngradename" label="风险等级" width="150" align="center"></el-table-column>
            <el-table-column prop="dim_departmentname" label="填报部门" width="150" align="center"></el-table-column>
            <el-table-column prop="sfillusername" label="填报人" width="150" align="center"></el-table-column>
            <el-table-column prop="sorigintime" label="下达时间" width="260" align="center"></el-table-column>
            <el-table-column prop="companyname" label="目标路径" width="360" align="left"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        data: Array
    },
    data(){
        return {
            
        }
    },
    computed: {
        tableData: function(){
            return this.data ;
        }
    }
}
</script>
<style scoped>
#orderDialog {
    width: 100%;
    overflow: auto;
    height: 420px;
}
</style>
