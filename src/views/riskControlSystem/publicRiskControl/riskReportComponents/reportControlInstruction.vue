<template>
    <div>
        <div class="top-form-contents" style="margin-top: 30px">
            <span>领导批示</span>
            <div class="top-form-contents" style="margin-bottom: 0;width:80%;">
                <p style="min-width: 98px;width: 100px;margin-left: 30px">风险策略为：</p>
                <template v-for="(itemCnt,index) in contentDown.content">
                    <el-select class="select_instruc" v-model="instructionValues" multiple placeholder="请选择" :key="index" :disabled="selectDisabled" @change="changeOption(instructionValues,itemCnt,contentDown)">
                        <el-option
                        v-for="item in itemCnt.options"
                        :key="item.scode"
                        :label="item.sname"
                        :value="item.scode">
                        </el-option>
                    </el-select>
                </template>
            </div>
        </div>
        <div class="top-form-contents">
            <span style="min-width: 194px;width: 194px"></span>
            <el-input type="textarea" class="textarea_input" :rows="3" v-model="instruction" :disabled="instructionCnt"></el-input>
        </div>
    </div>
</template>
<script>
import reportControlInstruction from "./../minix/szcMinix/reportControlInstruction"
export default {
    mixins:[reportControlInstruction],
    name:"",
    props:{
        contentDown:Object
    },
    data() {
        return {
            instructionValues:[],
            instruction:"",
            selectDisabled:undefined,
            instructionCnt:undefined
        }
    },
    watch: {
        contentDown (newValue,oldValue) {
            let me = this;
            me.editableInstruction(newValue.rowItem);
        },
        instructionValues (newValue,oldValue) {
            let me = this,contentDown = me.contentDown;
            me.instructionContent("instructionValues");
        },
        instruction (newValue,oldValue) {
            let me = this,contentDown = me.contentDown;
            me.instructionContent("instruction");
        }
    },
    /**
     * 渲染之前的回调
     */
    created() {
        this.editableInstruction(this.contentDown.rowItem);
    },
    /**
     * 渲染之后的回调
     */
    mounted() {
        
    },
    methods: {
        /**
         * 编辑批示的内容是否可编辑。
         * @author szc 2019年5月28日14:45:14
         */
        editableInstruction (rowItem) {
            let me = this;
            if(rowItem && rowItem.instructionid == "1"){
                if(typeof rowItem.cstrategy == 'number'){
                    rowItem.cstrategy = rowItem.cstrategy + "";
                }
                let arr = rowItem.cstrategy.split(',');
                me.instructionValues = arr;
                me.instruction = rowItem.psnr || "";
                me.selectDisabled = "disabled";
                me.instructionCnt = "disabled";
            }else {
                me.selectDisabled = undefined;
                me.instructionCnt = undefined;
            }
        },
        /**
         * 改变下拉选的内容。
         */
        changeOption (item,params,contentDown) {
            let me = this;

        }
    },
}
</script>
<style lang="scss" scoped>
    .top-form-contents {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .select_instruc {
        min-width: 300px;
    }
    .textarea_input {
        margin-left: -9px;
    }
    // .top-form-contents span {
    //     font-size: 16px;
    //     color: #333333;
    //     font-weight: 700;
    // }
</style>

