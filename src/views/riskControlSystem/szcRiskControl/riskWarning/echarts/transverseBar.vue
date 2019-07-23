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
                // legend: {
                //     // data: ['2011年', '2012年']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    // bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.1]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        startValue:10,
                        endValue:16,
                        handleSize: 10,
                        yAxisIndex:0,
                        orient:'horizontal',
                    },
                    // {
                    //     type: 'inside',
                    //     start: 94,
                    //     end: 100,
                    //     orient:'horizontal'
                    // },
                    // {
                    //     type: 'slider',
                    //     show: true,
                    //     yAxisIndex: 0,
                    //     filterMode: 'empty',
                    //     width: 12,
                    //     height: '70%',
                    //     handleSize: 8,
                    //     showDataShadow: false,
                    //     left: '93%'
                    // }
                ],
                series: [
                    {
                        name: this.$store.getters.year + '年',
                        type: 'bar',
                        barWidth:'50',
                        itemStyle: {   
                            //通常情况下：
                            normal:{  
            　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params){
                                    var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                                    return colorList[params.dataIndex];
                                }
                            },
                            //鼠标悬停时：
                            // emphasis: {
                            //         shadowBlur: 10,
                            //         shadowOffsetX: 0,
                            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                            // }
                        },
                        data: []
                    }
                ]
            }
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
        }
    },
    methods: {
        updateData(){
            let me = this;
            if(me.chartData){
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
                    me.sortByProp(arrDatas,"score",-1);
                }
                arrDatas.forEach(item => {
                    yDatas.push(item.sname);
                    seriesData.push(item.score);
                });
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
                    return num;
                }else if(a[prop] < b[prop]) {
                    return -num;
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

