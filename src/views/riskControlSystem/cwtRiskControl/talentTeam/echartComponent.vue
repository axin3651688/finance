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
                        value: item.num,
                        name: item.dim
                    };


                    if (item.dim !== '合计') {
                        echartData.push(emptyData);
                    }
                });


                let myChart = Echart.init(document.getElementById('echart-content'));

                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '60%'],
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
        width: 700px;
        height: 500px;
    }
</style>