<template>
    <div>
        <div id="echart-content"></div>
    </div>
</template>

<script>
    import Echart from 'echarts'

    export default {
        name: "echartComponent",
        components: {
            Echart
        },
        props: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
            this.initEchart();
        },
        methods: {
            initEchart() {

                let myChart = Echart.init(document.getElementById('echart-content'));

                myChart.setOption({
                    /*title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },*/
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    /*legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },*/
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });

            }
        }
    }
</script>

<style scoped>
    #echart-content {
        width: 400px;
        height: 400px;
    }
</style>