export default function bar() {
    return {
        options: {
            title: {
                text: this.item.text
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                textStyle: {
                    color: "#000"
                },
                axisPointer: {
                    type: "none"
                }
            },
            legend: {
                data: []
            },

            grid: {
                top: 60,
                left: "4%",
                right: "4%",
                bottom: "4%",
                backgroundColor: "#666",
                containLabel: true
            },

            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },

                    dataView: {
                        show: true,
                        readOnly: false
                    },

                    saveAsImage: {
                        show: true
                    }
                }
            },

            xAxis: [{
                type: "category",
                data: this.item.options.datas[0],

                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: "value"
            }],
            series: [{
                type: "bar",

                stack: "vistors",
                barWidth: "35%",
                data: this.item.options.datas[1],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                "#3AA1FF",
                                "#13C2C2",
                                "rgb(25,46,94)",
                                "rgb(195,229,235)"
                            ];
                            return colorList[params.dataIndex];
                        }
                    },

                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }]
        }
    };




}