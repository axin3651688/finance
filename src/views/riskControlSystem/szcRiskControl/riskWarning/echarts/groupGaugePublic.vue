<template>
    <chart :options.sync="receive" auto-resize/>
</template>
<script>
    export default {
        props: {
            chartData:Object
        },
        data() {
            return {
                gValue:50,
                receive : {
                    tooltip : {
                        // formatter: "{a} <br/>{b} : {c}%"
                        formatter:function(a,b,c){
                            return a.seriesName + "<br/>" + a.name + "：" + Math.decimalToLocalString(a.value) + "%";
                        }
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            min: 0,
                            max: 200, //设置最大刻度
                            splitNumber:8,
                            //设置仪表盘的园的程度，这里设置的是半圆
                            startAngle: 170,
                            endAngle: 10,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    // 属性lineStyle控制线条样式
                                    color: [
                                        [0.25, "#F24764"],
                                        [0.5, "#FBCE14"],
                                        [0.75, "#11C3C2"],
                                        [1, "#2FC35B"]
                                    ],
                                    width: 20 //表盘宽度
                                }
                            },
                            center: ["50%", "50%"], //整体的位置设置
                            radius: "85%", //仪表盘大小
                            //设置指针样式
                            pointer: {
                                show: true,
                                length: "50%",
                                width: 5
                            },
                            detail: {
                                formatter: function(a,b,c){
                                    return Math.decimalToLocalString(a) + "%";
                                },
                            },
                            data: [{value: 0, name:""}]
                        }
                    ]
                }
            };
        },
        created() {
            
        },
        mounted() {
            let me = this;
        },
        watch: {
            chartData:{
                handler(newValue,oldValue){
                    this.updateData();
                },
                deep:true
            }
        },
        methods: {
            updateData () {
                this.receive = this.chartData.receive;
            }
        }
    };
</script>