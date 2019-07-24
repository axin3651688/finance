<template>
    <div>
        <chart :options.sync="option" style="height: 500px; width: 90%"/>
    </div>

</template>

<script>
    export default {
        name: "barEchart",
        components: {},
        props: {
            barData: Array,
            dataFresh: Boolean,
            selectedName: String,
            barChartType: String
        },
        watch: {
            dataFresh() {
                this.initBarChart();
            }
        },
        data() {
            return {
                option: {
                    color: ['#3398DB'],
                    title: {
                        show: true,                                                //显示策略，默认值true,可选为：true（显示） | false（隐藏）
                        text: '',                                                  //主标题文本，'\n'指定换行
                        x: 'center',                                               //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                        y: 'top',                                                  //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                        backgroundColor: 'rgba(0,0,0,0)',                          //标题背景颜色，默认'rgba(0,0,0,0)'透明
                        borderColor: '#ccc',                                       //标题边框颜色,默认'#ccc'
                        borderWidth: 0,                                            //标题边框线宽，单位px，默认为0（无边框）
                        padding: 5,                                                //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
                    },


                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter:function(a,b,c){
                            return a[0].name + "<br>" + a[0].seriesName + "：" + Math.decimalToLocalString(a[0].value);
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        name: '省份',
                        data: [],//名字
                        // nameTextStyle: {   // 坐标轴名称样式
                        //     color: 'red',
                        //     padding: [5, 0, 0, -5]
                        // },
                        axisLine: {       // 坐标轴 轴线
                            show: true,  // 是否显示
                            symbol: ['none', 'arrow'],  // 是否显示轴线箭头
                            symbolSize: [8, 8], // 箭头大小
                            symbolOffset: [0, 7],  // 箭头位置
                            // ------   线 ---------
                            lineStyle: {
                                color: 'black',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLabel: {    // 坐标轴标签
                            show: true,  // 是否显示
                            inside: false, // 是否朝内
                            rotate: 30, // 旋转角度
                            margin: 5, // 刻度标签与轴线之间的距离
                            color: 'black'  // 默认取轴线的颜色
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '指标数值',
                        nameTextStyle:{
                            padding:15
                        }
                    },
                    series: {
                        name: '',
                        type: 'bar',
                        barWidth: '60%',
                        // barMinHeight: 10,//柱状图的最小高度
                        itemStyle: {
                            normal: {
                                label: {   // 图形上的文本标签
                                    show: true,
                                    position: 'top', // 相对位置
                                    rotate: 0,  // 旋转角度
                                    color: 'black',
                                    fontSize:16,

                                    /**
                                     *
                                     * 这里的处理将柱状图上方显示的数值改成对应的index+ 1 用来显示排序，
                                     * 不过要在数据查询的时候添加了排序处理，不然就是乱的
                                     * */
                                    formatter(data){
                                        let _index = data.dataIndex;
                                        return _index + 1;
                                    }
                                },
                                color: function (params){

                                    if(params.name === '天津市' || params.name === '食品集团'){
                                        return '#FF9900'
                                    }else{
                                        return '#2196F3'
                                    }
                                }
                                // barBorderRadius: [18, 18, 0 ,0],
                            }
                        },
                        data: []//数据
                    }
                }
            }
        },
        created() {
            this.initBarChart();
        },
        mounted() {
        },
        methods: {
            /**
             * 初始化柱状图
             */
            initBarChart() {
                this.option.xAxis.data = [];
                this.option.series.data = [];

                let _this = this;
                let data = _this.barData;
                let xAxisData = _this.option.xAxis.data;
                let yAxisData = _this.option.series.data;

                data.forEach((item) => {
                    if (item.fact_a) {
                        xAxisData.push(item.sname);
                        yAxisData.push(item.fact_a)
                    }
                });

                if (this.barChartType === 'city') {
                    _this.option.title.text = _this.selectedName + '市企排名情况';
                    _this.option.xAxis.name = '公司';
                } else {
                    _this.option.title.text = _this.selectedName + '行业排名情况';
                    _this.option.xAxis.name = '省份';
                }
                _this.option.series.name = _this.selectedName;
            },
        }
    }
</script>

<style scoped>

</style>