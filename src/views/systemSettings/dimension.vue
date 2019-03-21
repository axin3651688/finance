<template>
    <div>
        <!-- 维度管理 -->
        <el-tabs v-model="activeName2" type="border-card" @tab-click="tabClick()">
            <el-tab-pane label="风险类型管理" name="first" >风险类型管理</el-tab-pane>
            <el-tab-pane label="上市公司管理" name="second">上市公司管理</el-tab-pane>
            <el-tab-pane label="人才信息管理" name="three">人才信息管理</el-tab-pane>
            <el-tab-pane label="行业板块管理" name="four">行业板块管理</el-tab-pane>
            <el-tab-pane label="图片编辑管理" name="five">
                <tab-picture></tab-picture>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import tabPicture from "@v/systemSettings/tabPicture"; 
export default {
    name: "dimension",
    components: {
        tabPicture
    },
    data(){
        return {
            activeName2: "five"
        }
    },
    created(){
        
    },
    mounted(){

    },
    methods: {

    }
}
</script>
<style scoped>

</style>
<style>

</style>
