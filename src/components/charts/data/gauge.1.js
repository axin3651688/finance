export default function pie(item) {
    return {
        title: {
            text: item.text
        },
        tooltip: {
            formatter: "{b} : {c}%"
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [{
            type: "gauge",
            radius: "65%",
            // 刻度间隔
            splitNumber: 5,
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    width: 10,
                    // 外圈线的颜色
                    color: [
                        [0.25, "#F04864"],
                        [0.5, "#FACC14"],
                        [0.75, "#13C2C2"],
                        [1, "#2FC25B"]
                    ]
                }
            },
            splitLine: {
                // 是否显示刻度线
                show: false
            },
            axisTick: {
                // 坐标轴小标记

                length: 1 // 属性length控制线长
            },
            // 是否显示标签
            axisLabel: {
                show: false
            },
            pointer: {
                length: "70%",
                width: 9
            },
            detail: {
                formatter: "{value}%"
            },
            data: [{
                value: 80,
                name: "完成率-测试"
            }]
        }]
    };
}