/**
 * 系统设置 -> 初始化管理 - 在线编辑
 */
<template>
    <div id="onlineEditing">
        <el-tabs :tab-position="tabPosition" v-model="activeName" type="" @tab-click="handleClick" style="height: 100%;">
            <el-tab-pane v-for="(item, index) in tabs" :key="index + ''" :name="item.name">
                <span slot="label">{{ item.text }}</span>
                <onlineEditing-table v-if="item.name !== 'fourth'" :ref="item.name" :type="activeName"></onlineEditing-table>
                <onlineEditing-tree v-else :ref="item.name" :type="activeName"></onlineEditing-tree>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import cols from 'utils/columns.js'
export default {
    components: {
        onlineEditingTable: () => import('./onlineEditing-table.vue'),
        onlineEditingTree: () => import('./onlineEditing-tree.vue')
    },
    data(){
        return{
            tabPosition: "top",
            tabs: cols.onlineEditing_tabs(),
            activeName: "" ,
            type: "" ,
        }
    },
    created(){
        this.activeName = this.tabs[0].name
    },
    methods: {
        // tab 被选中时触发
        handleClick(obj) {
            this.activeName = obj.name
            this.$refs[obj.name][0].request_methods(obj.name) 
        }
    }
}
</script>

<style>
#onlineEditing {
    width: 100% ;
    height: 100%;
}
</style>
