export default function pie() {
    return {
        title: {
            text: "this.item.text",
            x: "center"
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //     magicType: {
        //     type: ['line', 'bar'],
        //     show: false
        //     },
        //     dataZoom: {
        //     show: false
        //     },
        //     dataView: {
        //     show: false
        //     },
        //     restore: {
        //     show: false
        //     },
        //     saveAsImage: {
        //     show: false
        //     }
        //     }
        // },
         
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: "vertical",
        //     left: "5%",
        //     top: "10%",
        //     data: []
        // },           //zdk 注释  2019-1-8 09:25:05  boss 和 ly 说图例要放在下方
        legend: {
            bottom: 10,
			left: "center",
            data: []
        },

        
        series: [{
            name: "风险级别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
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