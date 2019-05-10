<template>
<!--
    name: sjz
    树表的公用组件
-->
    <div id="riskReport">
        <tree-table :columns="columns" :data="data" :item="item" :tableHeight="tableHeight"></tree-table>
    </div>
</template>
<script>
import treeTable from "@v/riskControlSystem/publicRiskControl/treeTable";
export default {
    name: 'treeTableDemo',
    components: {
        treeTable
    },
    props: ["jsonAdress","tableHeight"],
    data(){
        return {
            columns:[],
            data:[]
        }
    },
    created(){ 
        // 获取树表的json信息
        this.setTreeTableRequest();
    },
    mounted(){

    },
    methods: {
        // 获取树表的json信息
        setTreeTableRequest(){
            const me = this ;
            // jsonAdress传入的json地址
            let $json = me.jsonAdress ;
            me.axios.get($json).then(res => {
                // debugger
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                // 把对象变成数组
                Object.keys(obj).forEach(key => { 
                    console.log(key,obj[key]);
                    me[key] = obj[key];
                });
                // 把数组变成对象
                me.items.forEach((item,index)=>{
                    me.item = item;
                });
                // debugger
                // 数据获取之后的拦截(数据自己造的，后期优化重写改造)
                this.queryDataAfter(me.rows);
            })
        },
        // 数据获取之后的拦截
        queryDataAfter(rows){
            // debugger
            let me = this ;
            // 看看json里有没有配置【queryDataAfter】数据获取之后拦截的方法
            if(me.item.queryDataAfter && typeof me.item.queryDataAfter == "function"){
                me.data = me.item.queryDataAfter(rows, me);
            }
        }
    }
}
</script>
<style scoped>

</style>
