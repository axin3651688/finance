<template>
<!--
    name: sjz
    time: sjz 2019/5/6 9:40:00
    说明: 风险识别弹出框里的风险矩阵的图形组件
-->
    <div id="riskMatrix">
        <table v-if="rowLength>0">
            <tr>
                <td :style="styles" :rowspan="rowLength">风险发生概率(L)</td>
                <td v-for="item in item1" :style="styles">{{ item.sname }}</td>
                <td v-for="item in item1" :style="styles">{{ item.nscore }}</td>
                <!-- <td v-for="item in item"></td> -->
                <td>123</td>
            </tr>
            <tr v-for="item in items" :style="item.width">
                <td>{{ item.sname }}</td>
                <td>{{ item.nscore }}</td>
                <td>123</td>
            </tr>
            <tr>
                <td :style="styles" :rowspan="3" :colspan="3">风险值：R=L*S</td>
                <td v-for="item in item2" :style="styles">{{ item.id }}</td>
            </tr>
            <tr>
                <td v-for="item in item2" :style="item.width">{{ item.sname }}</td>
            </tr>
            <tr>
                <td :style="styles" :rowspan="3" :colspan="rowLength">风险影响程度（S）</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: "riskMatrix",
    // props:["data"],
    props: {
        data: Array,
        fsgl: Object,
        yxcd: Object
    },
    data(){
        return {
            tableData: [],
            rowLength: 0,
            styles: {
                width: "100px"
            },
            item1:[],   // 风险发生概率第一行
            item2:[],   // 风险影响程度
            items:[],   // 风险发生概率（后几行）
        }
    },
    created(){
        debugger
        this.rowLength = this.data.length ;
        let cc = this.fsgl ;
        let dd = this.yxcd ;
        this.firstDemo();
        this.secondDemo();
    },
    mounted(){
        
    },
    methods: {
        firstDemo(){
            this.item1 = this.fsgl.rows.filter((res,index) => { return index == 0 });
            this.items = this.fsgl.rows.filter((res,index) => { return index > 0 });
        },
        secondDemo(){
            this.item2 = this.yxcd.rows ;
        }
    }
}
</script>
<style scoped>
.table tr,td,th {
    border: 1px solid #ccc;
    text-align: center; 
    color: #606266;   
}
</style>
