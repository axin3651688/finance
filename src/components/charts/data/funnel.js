export default function funnel() {
    return {
        title: {
            text: '漏斗图',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },

        toolbox: {
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },

        calculable: true,
        series: [{
            name: '漏斗图',
            type: 'funnel',
            width: '80%',
            height: '90%',
            left: '10%',
            top: '10%',
            // 下面为倒过来
            // sort: 'ascending',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: []
        }]
    };

}