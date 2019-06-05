<template>
    <chart :options.sync="receive" auto-resize/>
</template>
<script>
export default {
    name:"",
    props:{
        chartData:Object
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
                legend: {
                    // data: ['2011年', '2012年']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '2012年',
                        type: 'bar',
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
        }
    },
    methods: {
        updateData(){
            debugger;
            let me = this;
            if(me.chartData){
                let datas = me.chartData,yDatas = [],seriesData = [];
                datas.forEach(item => {
                    if(item.score){
                        yDatas.push(item.sname);
                        seriesData.push(item.score);
                    }
                });
                me.receive.yAxis.data = yDatas;
                me.receive.series[0].data = seriesData;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>

