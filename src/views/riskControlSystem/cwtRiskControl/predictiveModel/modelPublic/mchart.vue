<template>
    <div class="echart-content">
        <chart
                class="chart"
                :options.sync="option"/>
    </div>
</template>

<script>
    export default {
        name: "mchart",
        components: {},
        props: {
            echartData: Object,
            dataType: String,
            dataFresh: Boolean
        },
        computed: {},
        watch: {
            dataFresh() {
                this.initEchartData()
            }
        },
        data() {
            return {
                option: {},
                funnelOption: {
                    height_s: '500px',
                    title: {
                        text: '各项费用占收入比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            bottom: 60,
                            width: '80%',

                            min: 0,
                            max: 100,
                            minSize: '30%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1
                            },
                            data: [
                                {value: 60, name: '访问'},
                                {value: 40, name: '咨询'},
                                {value: 20, name: '订单'},
                                {value: 80, name: '点击'},
                                {value: 100, name: '展现'}
                            ]
                        }
                    ]
                },
                pieOption: {
                    height_s: '300px',
                    title: {
                        text: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '50%'],
                            data: [
                                // {value: 335, name: '直接访问'},
                                // {value: 310, name: '邮件营销'},
                                // {value: 234, name: '联盟广告'},
                                // {value: 135, name: '视频广告'},
                                // {value: 1548, name: '搜索引擎'}
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
                },
                gaugeOption: {
                    height_s: '300px',
                    title: {
                        text: '',
                        x: 'center'
                    },
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            min: 0,
                            max: 100,
                            radius: "70%",
                            axisTick: {                 // 刻度(线)样式。
                                show: true,             // 是否显示刻度(线),默认 true。
                                splitNumber: 5,         // 分隔线之间分割的刻度数,默认 5。
                                length: 8,              // 刻度线长。支持相对半径的百分比,默认 8。
                                lineStyle: {            // 刻度线样式。
                                    color: "#eee",              //线的颜色,默认 #eee。
                                    opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                                    width: 1,                   //线度,默认 1。
                                    type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                                    shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                                    shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                                },
                            },
                            axisLine: {                 // 仪表盘轴线(轮廓线)相关配置。
                                show: false,             // 是否显示仪表盘轴线(轮廓线),默认 true。
                                lineStyle: {            // 仪表盘轴线样式。
                                    opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                                    width: 20,                  //轴线宽度,默认 30。
                                }
                            },
                            detail: {formatter: '{value}%'},
                            data: [{value: 50, name: ''}]
                        }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
            this.initEchartData()
        },
        methods: {
            initEchartData() {
                let _this = this;
                _this.option = {};
                let _data = _this.echartData;
                switch (_this.dataType) {
                    case 'funnel':
                        _this.option = _this.funnelOption;

                        let _funnelPeries = _this.option.series;
                        _funnelPeries[0].data = _data.data ? _data.data : [];

                        break;
                    case 'pie':
                        _this.option = _this.pieOption;

                        let _piePeries = _this.option.series;
                        let _pieTitle = _this.option.title;
                        _pieTitle.text = _data.name;
                        _piePeries[0].data = _data.data ? _data.data : [];

                        break;
                    case 'gauge':
                        _this.option = _this.gaugeOption;
                        let _gaugeSeries = _this.option.series;
                        let _gaugeTitle = _this.option.title;
                        _gaugeTitle.text = _data.cellData1 ? _data.cellData1.name : '';
                        _gaugeSeries[0].data[0].value = _data.cellData1 ? _data.cellData1.value : 0;
                        if(_gaugeSeries[0].data[0].value === ''){
                            _gaugeSeries[0].data[0].value = 0;
                        }
                }
            }
        }
    }
</script>

<style scoped>

</style>