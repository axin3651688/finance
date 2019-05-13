<template>
    <div>
        <div>
            表格
            <el-table
            v-if="tableData && tableData.length > 0"
            :data="tableData"
            border
            stripe
            style="width: 100%">
                <template v-for="(item,index) in columns">
                    <el-table-column
                        :key="index"
                        :prop="item.id"
                        :label="item.text"
                        width="180">
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>
<script>

export default {

    name: "table",
    props:["columns","tableData"],
    data() {
        return {}
    },
    /**
     * 组件生成的回调。
     */
    created() {
        debugger;
    },
    /**
     * 页面渲染之后的回调。
     */
    mounted () {},
    methods: {}
};
</script>
<style>
    
</style>