<template>
    <chart :options.sync="receive" auto-resize/>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name:"",
    props:{
        chartData:Array
    },
    data() {
        return {
            receive : {
                title: {
                    text: '集团公司对标排序图',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '13%',
                    // bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.1]
                },
                yAxis: {
                    type: 'category',
                    axisLabel:{
                        formatter:function(aa,bb){
                            let names = aa.split("$");
                            let name = names[0];
                            return name;
                        }
                    },
                    axisPointer:{
                        label:{
                            formatter:function(aa,bb){
                                let names = aa.value.split("$");
                                aa.value = names[0];
                                return aa.value;
                            }
                        }
                    },
                    data: []
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        startValue:this.sValue,
                        endValue:this.eValue,
                        handleSize: 0,
                        yAxisIndex:0,
                        orient:'vertical',
                        right:'3%',
                        showDataShadow: false,
                        showDetail:false,
                        moveOnMouseWheel:true
                    }
                ],
                series: [
                    {
                        name: this.$store.getters.year + '年',
                        type: 'bar',
                        // barWidth:'50',
                        itemStyle: {   
                            //通常情况下：
                            normal:{
                                // color:'#c3e5eb'
            　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params){
                                    let colorStrs = params.name.split("$");
                                    let colorStr = colorStrs[1];
                                    return "#" + colorStr;
                                }
                            }
                        },
                        data: []
                    }
                ]
            },
            sValue:0,
            eValue:19,
        }
    },
    computed: {
        ...mapGetters(["year"])
    },
    created() {
        this.updateData();
    },
    mounted() {
        
    },
    watch: {
        chartData:{
            handler(){
                this.updateData();
            },
            deep:true
        },
        year(newValue, oldValue) {
            this.receive.series[0].name = newValue + "年";
            this.updateData();
        }
    },
    methods: {
        updateData(){
            debugger;
            let me = this;
            if(me.chartData && me.chartData.length > 0){
                let datas = me.chartData,yDatas = [],seriesData = [];
                // datas.forEach(item => {
                //     if(item.score){
                //         yDatas.push(item.sname);
                //         seriesData.push(item.score);
                //     }
                // });
                let arrDatas = datas.filter(item => {
                    return item.score;
                });
                if(arrDatas && arrDatas.length > 0){
                    me.sortByProp(arrDatas,"score",1);
                }
                arrDatas.forEach(item => {
                    yDatas.push(item.sname + "$" + item.color);
                    seriesData.push(item.score);
                });
                //滚动条的位置。
                me.receive.dataZoom[0].startValue = arrDatas.length - 1;
                if(arrDatas.length > 20){
                    me.receive.dataZoom[0].endValue = arrDatas.length - 20;
                }else {
                    me.receive.dataZoom[0].endValue = 0;
                }
                // me.sValue = arrDatas.length - 1;
                // me.eValue = arrDatas.length - 10;
                me.receive.yAxis.data = yDatas.reverse();
                me.receive.series[0].data = seriesData.reverse();
            }
        },
        /**
         * 排序
         */
        sortByProp (data,prop,num) {
            data.sort((a,b) => {
                if(a[prop] > b[prop]){
                    return -num;
                }else if(a[prop] < b[prop]) {
                    return num;
                }else {
                    return 0;
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>

