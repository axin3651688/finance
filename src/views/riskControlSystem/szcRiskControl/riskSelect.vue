<template>
    <div>
        <label>部门选择</label>
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name:"riskSelect",
    data () {
        return {
            options: []
        }
    },
    /**
     * 组件生成回调。
     */
    created () {
        debugger;
        let me = this;
        this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/riskSelectOps.json").then(res => {
            console.log(res);
            me.options = res.data;
        });
    },
    /**
     * 组件页面加载完成之后回调。
     */
    mounted () {},
    /**
     * 方法存放器。
     */
    methods () {

    }
}
</script>