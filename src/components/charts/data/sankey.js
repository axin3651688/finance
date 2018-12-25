import data from "./sankey.json"

export default function scatter(item) {
    return {
        title: {
            text: '桑基图'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'sankey',
            layout: 'none',
            data: data.nodes,
            links: data.links,
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.5
                }
            }
        }]
    }
}