export default function line() {
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
            left: "2%",
            right: "2%",
            bottom: "4%",
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: []
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