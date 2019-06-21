<template>
    <!--
        name: sjz
        说明：国资指标数据维护
    -->
    <div id="assetsSetting">
        <div id="groupSetting">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="指标维护" name="first">
                    <index-maintenance ref="index" :height="height"></index-maintenance>
                </el-tab-pane>
                <!-- <el-tab-pane label="数据维护" name="second">
                    <data-maintenance ref="data" :height="height2"></data-maintenance>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>
<script>
// 引用vuex
import { mapGetters, mapActions } from "vuex";
// 引用指标维护
import indexMaintenance from './indexMaintenance';
// 引用数据维护
// import dataMaintenance from './dataMaintenance';
export default {
    components: {
        indexMaintenance
        // dataMaintenance
    },
    data(){
        return {
            activeName: "first",
            height: 0 ,
            // height2:0 
        }
    },
    created(){
        // debugger
        this.height = document.body.offsetHeight - 168 ;
        // this.height2 = document.body.offsetHeight - 118 ;
    },
    mounted(){
        // 高度自适应
        this.getClientHeight() ;
    },
    methods: {
        // 高度自适应
        getClientHeight(){
            this.height = document.body.offsetHeight - 168 ;
            // this.height2 = document.body.offsetHeight - 118 ;
            const me = this ;
            window.onresize = function temp(){ 
                me.height = document.body.offsetHeight - 168 ;
                // me.height2 = document.body.offsetHeight - 118 ;
            }
        },
        // tab 被选中时触发
        handleClick(val){
            
        }
    }
}
</script>
<style scoped>

</style>