<template>
    <div>
        <div class="top-form-contents" style="margin-top: 30px">
            <span>领导批示</span>
            <div class="top-form-contents" style="margin-bottom: 0">
                <p style="min-width: 98px;width: 100px;margin-left: 30px">风险策略为：</p>
                <template v-for="(itemCnt,index) in contentDown.content">
                    <el-select v-model="countermeasures" placeholder="请选择" :key="index">
                        <el-option
                        v-for="item in itemCnt.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </div>
        </div>
        <div class="top-form-contents">
            <span style="min-width: 194px;width: 194px"></span>
            <el-input type="textarea" :rows="3" v-model="instruction"></el-input>
        </div>
    </div>
</template>
<script>
export default {
    name:"",
    props:{
        contentDown:Object
    },
    data() {
        return {
            countermeasures:"",
            instruction:""
        }
    },
    /**
     * 渲染之前的回调
     */
    created() {
        
    },
    /**
     * 渲染之后的回调
     */
    mounted() {
        
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
    .top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    // .top-form-contents span {
    //     font-size: 16px;
    //     color: #333333;
    //     font-weight: 700;
    // }
</style>

