<template>
    <div>
        <div id="echart-content"></div>
    </div>

    <!--<div class="echart-content" >-->
        <!--<chart-->
                <!--class="chart"-->
                <!--:options.sync="option"/>-->
    <!--</div>-->

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
            return {
                option:{
                    /*title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },*/
                    // height_s: '500px',
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
                            radius: '70%',
                            center: ['50%', '70%'],
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
                }
            }
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
                    // height_s: '500px',
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
                            radius: '60%',
                            center: ['65%', '60%'],
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
        width: 500px;
        height: 500px;
    }
</style>