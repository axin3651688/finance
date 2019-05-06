<template>
    <div>
        <div>
            <el-tabs type="border-card">
                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>
        <div></div>
    </div>
</template>
<script>

export default {
    name: "riskControl",
    data() {
        return {
            tabData:[
                {
                    
                },
            ]
        }
    },
    created() {},
    mounted () {},
    methods: {}
};
</script>
<style>

</style>