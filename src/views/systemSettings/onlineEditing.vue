/**
 * name：sjz
 * 在线编辑
 */
<template>
    <div id="onlineEditing">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in columns" :key="index + ''" :label="item.label" :name="item.name">
                <onlineEditing-tabs :ref="item.name" :type="activeName"></onlineEditing-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    components: {
        onlineEditingTabs: () => import("./onlineEditing-tabs.vue")
    },
    data(){
        return{
            columns: [
                { label: '风险发生概率', name: 'first' },
                { label: '风险影响等级', name: 'second' },
                { label: '风险等级', name: 'third' },
                { label: '风险类型', name: 'fourth' },
                { label: '风险策略', name: 'fifth' }
            ],
            activeName: 'first'
        }
    },
    created(){

    },
    methods: {
        handleClick(tabs) {
            this.activeName = tabs.name
            this.$refs[tabs.name][0].requestMethods(tabs.name)
        }
    }
}
</script>
<style scoped>

</style>
