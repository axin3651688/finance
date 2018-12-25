export default function pie(item) {
    return {
        title: {
            text: item.text,
            x: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            left: "5%",
            top: "10%",
            data: ["中国", "美国"]
        },
        series: [{
            name: item.text,
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [{
                    name: "中国",
                    value: "100"
                },
                {
                    name: "美国",
                    value: "80"
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }]
    }
}