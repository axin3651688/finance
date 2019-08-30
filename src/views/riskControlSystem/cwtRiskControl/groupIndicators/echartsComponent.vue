<template>
    <div>
        <chart :options.sync="echartOption"/>
    </div>
</template>

<script>

    import cwtPublicJS from '../mixin/cwtPublicJS'

    export default {
        name: "echartsComponent",
        mixins: [cwtPublicJS],
        components: {},
        props: {
            echartData: Object,
            dataChange: Boolean
        },
        computed: {},
        watch: {
            dataChange() {
                this.initEchartData();
            }
        },
        data() {
            return {
                echartOption: {
                    color: ['#77EFB7'],
                    title: {
                        show: true,                                                //显示策略，默认值true,可选为：true（显示） | false（隐藏）
                        text: '我是echart标题',                                                  //主标题文本，'\n'指定换行
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
                        formatter(data) {
                            let showData = data[0].value;

                            if (showData && showData !== null) {
                                showData = Math.round(showData * 100) / 100;
                                let str = showData.toLocaleString();
                                let valueArr = str.split(".");
                                if (valueArr.length === 1) {
                                    str = str + ".00";
                                } else {
                                    if (valueArr[1].length === 1) {
                                        valueArr[1] = valueArr[1] + '0';
                                        str = valueArr[0] + '.' + valueArr[1]
                                    }
                                }
                                return '<div><p>' + data[0].name + ' </p><p>' + data[0].seriesName + ': ' + str + ' </p></div>';
                            } else if (showData === 0) {
                                return '此期间无数据';
                            }
                        }
                    },
                    grid: {
                        left: '6%',
                        right: '20%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        name: '年份',
                        data: [],//名字
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '指标数值',
                    },
                    series: {
                        name: '',
                        type: 'line',  //要用到line  和  bar  两种类型
                        barWidth: '60%',
                        smooth:true,  //这个是把线变成曲线
                        // barMinHeight: 10,//柱状图的最小高度
                        itemStyle: {
                            normal: {
                                label: {   // 图形上的文本标签
                                    show: true,
                                    position: 'top', // 相对位置
                                    rotate: 10,  // 旋转角度
                                    color: '#000',
                                    fontSize: 13,
                                    normal: {
                                        formatter: '{c}\n'
                                    },
                                    /**
                                     *
                                     * 这里的处理将柱状图上方显示的数值改成对应的index+ 1 用来显示排序，
                                     * 不过要在数据查询的时候添加了排序处理，不然就是乱的
                                     * */
                                    formatter(data) {
                                        let showData = data.value;
                                        if (showData && showData !== null) {
                                            showData = Math.round(showData * 100) / 100;
                                            let str = showData.toLocaleString();
                                            let valueArr = str.split(".");
                                            if (valueArr.length === 1) {
                                                str = str + ".00";
                                            } else {
                                                if (valueArr[1].length === 1) {
                                                    valueArr[1] = valueArr[1] + '0';
                                                    str = valueArr[0] + '.' + valueArr[1]
                                                }
                                            }
                                            // return '<div>' + '<span style="padding-bottom: 10px">' + str + '</span>' + '</div>' ;

                                            let _dataIndex = data.dataIndex;

                                            if(_dataIndex % 2 === 0){
                                                str = str + '\n';
                                            }

                                            return str;
                                        } else if (showData === 0) {
                                            return '';
                                        }
                                    }
                                },
                            }
                        },
                        data: []//数据
                    }
                }
            }
        },
        created() {
            this.initEchartData();
        },
        mounted() {
        },
        methods: {
            initEchartData() {
                let _this = this;
                let _echartData = _this.echartData;
                _this.echartOption.xAxis.data = [];
                _this.echartOption.series.data = [];
                let xAxisData = _this.echartOption.xAxis.data;
                let yAxisData = _this.echartOption.series.data;

                _this.echartOption.title.text = _echartData.sname;

                _this.echartOption.series.name = _echartData.sname;

                let _unit = _echartData.sunit;
                _this.echartOption.yAxis.name += _unit ? '（' + _unit + '）' : '（万元）';

                if (_echartData.sunit === '%') {
                    _this.echartOption.series.type = 'line';
                    _this.echartOption.color = ['#9013FE'];
                } else {
                    _this.echartOption.series.type = 'bar';
                }

                let _data = _echartData.sdata;
                for (let key in _data) {
                    xAxisData.push(key);
                    yAxisData.push(_data[key])
                }

            }
        },
    }
</script>

<style scoped>

</style>