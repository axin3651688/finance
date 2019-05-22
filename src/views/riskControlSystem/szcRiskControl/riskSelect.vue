<template>
    <div>
        <label class="labelClass">部门选择：</label>
        <el-select v-model="value" 
        placeholder="请选择"
        @change="changeOption">
            <el-option
            v-for="item in selectConfig.options"
            :key="item.scode"
            :label="item.sname"
            :value="item.scode">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name:"riskSelect",
    props:{
        selectConfig:Object
    },
    data () {
        return {
            options: [],
            value:"董事会"
        }
    },
    /**
     * 组件生成回调。
     */
    created () {
        let me = this;
        // me.options = selectConfig.options;
        // this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/riskSelectOps.json").then(res => {
        //     console.log(res);
        //     me.options = res.data;
        // });
    },
    /**
     * 组件页面加载完成之后回调。
     */
    mounted () {},
    /**
     * 方法存放器。
     */
    methods : {
        /**
         * 改变options的内容事件
         * @author szc 2019年5月17日11:43:00
         */
        changeOption(item,param){
            debugger;
            let me = this;
            this.$emit("changeOption",item,param);
        }
    }
}
</script>
<style scope>
    .labelClass {
        margin-right: 10px;
    }
</style>
