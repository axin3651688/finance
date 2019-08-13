<template>
<!--
    name: sjz
    time: sjz 2019/5/6 9:40:00
    说明: 风险识别弹出框里的风险矩阵的图形组件:style="item.width"{{ item["val" + todo.num] }}
-->
    <div id="riskMatrix">
        <table v-if="rowLength>0" >
            <tr>
                <td :style="styles" :rowspan="rowLength">风险发生概率(L)</td>
                <td v-for="item in item1" :style="styles">{{ item.sname }}</td>
                <td v-for="item in item1" :style="stylee">{{ item.nscore }}</td>
                <td v-for="item in item3" :style="item.color" style="color: #303133">{{ item.nscode }}</td>
            </tr>
            <tr id="text" v-for="item in items">
                <td style="color: #303133">{{ item.sname }}</td>
                <td style="color: red;">{{ item.nscore }}</td>
                <td v-for="todo in itemc" :style="getStyles(item, todo)" style="color: #303133">{{ item["val" + todo.num] }}</td>

                <!-- <td :style="item.color1">{{ item.val1 }}</td> -->
                <!-- <td :style="item.color">{{ item.text }}</td> -->
                <!-- <td :style="item.color2">{{ item.val2 }}</td> -->
                <!-- <td :style="item.color3">{{ item.val3 }}</td> -->
                <!-- <td :style="item.color4">{{ item.val4 }}</td> -->
                <!-- <td :style="item.color5">{{ item.val5 }}</td> -->
            </tr>
            <tr>
                <td :style="styles" :rowspan="3" :colspan="3">风险值：R=L*S</td>
                <td v-for="item in item2" :style="stylee">{{ item.nscore }}</td>
            </tr>
            <tr>
                <td v-for="item in item2" :style="item.width" style="color: #303133">{{ item.sname }}</td>
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
            itemc: [
                // { html: "<td>1</td>" },{ html: "<td>1</td>" },{ html: "<td>1</td>" },{ html: "<td>1</td>" }
            ],
            // 
            tableData: [],
            rowLength: 0,
            styles: { width: "100px", color: "#303133" },
            stylee: { width: "100px", color: "red" },
            item1:[],   // 风险发生概率第一行
            item2:[],   // 风险影响程度
            items:[],   // 风险发生概率（后几行）
            item3:[],
        }
    },
    created(){
        // debugger
        this.rowLength = this.data.length ;
        let cc = this.fsgl ;
        let dd = this.yxcd ;
        this.firstDemo() ;
        this.secondDemo();
        this.thirdDemo() ;
        this.fourthDemo();
    },
    mounted(){
        
    },
    methods: {
        firstDemo(){
            // let cc = this.fsgl.rows.reverse() ;
            this.item1 = this.fsgl.rows.filter((res,index) => { return index == 0 });
            this.items = this.fsgl.rows.filter((res,index) => { return index > 0 });
        },
        secondDemo(){
            // debugger
            this.item2 = this.yxcd.rows ;
            // this.item2.reverse();
        },
        thirdDemo(){
            let me = this ;
            var data = this.data.filter((res, index) => { return index == 0 }) ;
            let len = this.rowLength ;
            for(let i=0; i<len; i++){ 
                let num = i + 1 ;
                data.forEach(res => { 
                    me.item3.push({
                        nscode: res["val"+num],
                        color: {
                            backgroundColor: res["color"+num]
                        }
                    }) ;
                });
            }
        },
        fourthDemo(){
            // debugger
            let me = this ;
            let aa = {} ;
            let dater = this.data.filter((res, index) => { return index > 0 }) ;
            let len = dater.length ;
            
            for(let u=0; u< me.item2.length; u++){ // debugger
                let num = u + 1 ;
                // let tt = "<td style=''>{{ item["+ "'"+ "val" + num + "'" + "] }}</td>" ;
                // let tt = "<td>"+ {{ num }} +"</td>"
                // me.itemc[u]["num"] = num ;
                me.itemc.push({ num: num }) ;
            }

            for(let i=0; i<=len; i++){
                let num = i + 1 ;
                dater.forEach((res, index) => { // debugger
                    // if(i==0)aa = { "text": res["val"+num], color: { backgroundColor: res["color"+num] } }
                    // if(i==1)aa = { text2: res["val"+num], color2: { backgroundColor: res["color"+num] } }
                    // if(i==2)aa = { text3: res["val"+num], color3: { backgroundColor: res["color"+num] } }
                    // if(i==3)aa = { text4: res["val"+num], color4: { backgroundColor: res["color"+num] } }
                    // if(i==4)aa = { text5: res["val"+num], color5: { backgroundColor: res["color"+num] } }

                    // aa = { mm: i, text: res["val"+num], color: { backgroundColor: res["color"+num] } }
                    // me.itemc.push(aa) ;
                    Object.keys(res).forEach(keys => {  // debugger
                        me.items[index][keys] = res[keys] ;
                    })      
                    for(let i=0; i<me.item2.length; i++){
                        let nub = i + 1 ;
                        me.items[index]["background"+nub] = { backgroundColor: res["color"+nub] }  ;
                    }              
                    // me.items[index]["background"+num] = { backgroundColor: res["color"+num] }  ;
                    // me.itemc = me.items ;
                });
            }            
        },
        // 表格背景颜色
        getStyles(item, todo){
            // debugger
            let dd = "background" + todo.num ;
            let is = Object.keys(item).some(keys => {
                return dd == keys ;
            })
            if(is){
                return item[dd] ;
            }
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
