<template>
  <chart :options="receive" auto-resize/>
</template>

<script>
export default {
  data() {
    return {
      receive: {
        title: {
          text: "基础雷达图"
        },
        tooltip: {},
        legend: {
          data: ["预算分配", "实际开销"]
        },
        radar: {
          //   shape: "circle",
          center: ["50%", "55%"],
          //   雷达大小
          radius: "70%",
          name: {
            textStyle: {
              color: "#fff",
              //   fontWeight: "bold",
              backgroundColor: "#1890ff",
              //   fontStyle: "italic",
              borderRadius: 3,
              padding: [5, 5]
            }
          },
          splitArea: {
            show: true,
            // 内部颜色
            areaStyle: {
              color: ["rgba(150,150,250,0.3)", "rgba(100,100,200,0.3)"]
            }
          },

          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000, color: "red" },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销"
              }
            ],
            areaStyle: {
              color: "#555",
              opacity: 0.3
            },
            emphasis: {
              itemStyle: {
                borderWidth: 3
              },
              lineStyle: {
                width: 5
              }
            }
          }
        ]
      }
    };
  }
};
</script>