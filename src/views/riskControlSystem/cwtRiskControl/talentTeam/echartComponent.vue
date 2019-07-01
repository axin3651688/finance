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
        props: {
            tableData: Array,
            dataFresh: Boolean
        },
        watch: {
            dataFresh() {
                this.initEchart();
            }
        },
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
                let _this = this;
                let data = _this.tableData;
                let echartData = [];
                data.forEach((item) => {


                    let emptyData = {
                        value: 0,
                        name: ''
                    };
                    emptyData.value = item.num;
                    emptyData.name = item.dim;


                    if (item.dim !== '合计') {
                        echartData.push(emptyData);
                    }
                });


                let myChart = Echart.init(document.getElementById('echart-content'));

                myChart.setOption({
                    /*title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },*/
                    tooltip: {
                        trigger: 'item',
                        // formatter: "{a} <br/>{b} : {c} ({d}%)"
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
                            data: echartData,
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