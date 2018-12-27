export default function line(item) {
    return {
        title: {
            text: "this.item.text"
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            default: {
                data: ["好", "坏"]
            }
        },
        grid: {
            default: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            default: {
                type: "category",
                boundaryGap: false,
                data: []
            }
        },
        yAxis: {
            type: "value"
        },
        series: [{
                name: "好",
                type: "line",
                smooth: false,
                data: []
            },
            {
                name: "坏",
                type: "line",
                smooth: false,
                data: []
            }
        ]
    }

}