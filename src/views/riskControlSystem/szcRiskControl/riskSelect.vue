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
        selectConfig:{
            type: Object,
            required: true
        }
    },
    data () {
        return {
            options: [],
            value:""
        }
    },
    watch: {
        selectConfig:{
            handler(newValue,oldValue){
                // this.value = newValue.options[0]? newValue.options[0].sname:"";
                let currentSelect = this.selectConfig.currentSelect;
                this.value = currentSelect? currentSelect:(newValue.options[0]? newValue.options[0].sname:"");
            },
            deep:true
        }
    },
    /**
     * 组件生成回调。
     */
    created () {
        let me = this;
        // let currentSelect = me.selectConfig.currentSelect;
        // this.value = currentSelect? currentSelect:(me.selectConfig.options[0]? me.selectConfig.newValue.options[0].sname:"");
        this.value = me.selectConfig.options[0]? me.selectConfig.newValue.options[0].sname:"";

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
