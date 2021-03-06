// 注意所有的this,item,必须加引号,要不然会报未定义的错误,记住此js非彼js,当json用就好了  马军2018.12.29
export default function gauge() {
    return {
        title: {
            // 	padding:[410,0,0,0],    //标题相对于容器边距
            text: "this.item.text",
            link: false,
            top: "10",
            x: "center", //标题块相对于容器位置
            // y:260,
            textAlign: "left",
            textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bold',
                fontSize: 16,
                color: "#8796B0",
                align: "center"
            }
        },

        tooltip: {
            //"{a}{b} : {c}% <br/>"+"本期累计:"+this.item.bnlj+"<br/> 本年目标:"+this.item.bnmb
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [{
            name: "目标完成率",
            type: "gauge",
            min: 0,
            max: 150, //设置最大刻度
            //设置仪表盘的园的程度，这里设置的是半圆
            startAngle: 170,
            endAngle: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [
                        [0.25, "#F24764"],
                        [0.5, "#FBCE14"],
                        [0.75, "#11C3C2"],
                        [1, "#2FC35B"]
                    ],
                    width: 20 //表盘宽度
                }
            },
            axisLabel: {
                textStyle: {
                    // 属性lineStyle控制线条样式
                    fontSize: 9 //改变仪表盘内刻度数字的大小
                }
            },
            center: ["50%", "70%"], //整体的位置设置
            radius: "85%", //仪表盘大小
            //设置指针样式
            pointer: {
                show: true,
                length: "65%",
                width: 5
            },
            detail: {
                //			      show:false,
                formatter: "{value}%",
                textStyle: {
                    fontSize: 20
                },
                offsetCenter: [0, 20] // 文字块相对于圆心偏移量
            },
            data: [],
            markPoint: {
                //最新发明，给指针中心加个空心轴
                symbol: "circle",
                symbolSize: 5,
                data: [
                    //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                    {
                        x: "50%",
                        y: "45%",
                        itemStyle: {
                            color: "#fff"
                        }
                    }
                ]
            }
        }]
    }
}