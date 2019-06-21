<template>
    <!--
        name: sjz
        说明：行业指标数据维护
    -->
    <div id="industrySetting">
        <div id="groupSetting">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="指标维护" name="first">
                    <index-maintenance ref="index" :height="height"></index-maintenance>
                </el-tab-pane>
                <el-tab-pane label="数据维护" name="second">
                    <data-maintenance ref="data" :height="height2"></data-maintenance>
                </el-tab-pane>
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
import dataMaintenance from './dataMaintenance';
export default {
    components: {
        indexMaintenance,
        dataMaintenance
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"]),
        ...mapGetters(["device", "user","showDims"])
    },
    data(){
        return {
            activeName: "first",
            height: 0 ,
            height2:0 ,
        }
    },
    created(){
        // debugger
        this.height = document.body.offsetHeight - 168 ;
        this.height2 = document.body.offsetHeight - 168 ;
    },
    mounted(){
        // 高度自适应
        this.getClientHeight() ;
    },
    watch: {
        // 切换年触发
        year: function(newyear){
            this.$refs.data.gettableData_request() ;
        },
        // 切换月触发
        month: function(newmonth){
            this.$refs.data.gettableData_request() ;
        },
        // 切换公司触发
        company: function(newcompany){
            this.$refs.data.gettableData_request() ;
        }
    },
    methods: {
        // 高度自适应
        getClientHeight(){
            this.height = document.body.offsetHeight - 168 ;
            this.height2 = document.body.offsetHeight - 168 ;
            const me = this ;
            window.onresize = function temp(){ 
                me.height = document.body.offsetHeight - 168 ;
                me.height2 = document.body.offsetHeight - 168 ;
            }
        },
        // tab 被选中时触发
        handleClick(val){
            if(val.name == "first") {   // 指标维护
                val.$children[0].dimIndex_query_by_stypeA() ;
            } else {                    // 数据维护
                let cc = this.$refs.index.tableData ;
                val.$children[0].options = cc ;
                val.$children[0].gettableData_request() ;                
            }
        }
    }
}
</script>
<style scoped>

</style>