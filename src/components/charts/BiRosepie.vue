<template>
  <chart :options="receive" auto-resize/>
</template>

<script>
export default {
  data() {
    return {
      receive: {
        title: {
          text: "南丁格尔玫瑰图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["工业", "科技", "外汇", "黄金", "预测"]
        },
        calculable: true,
        series: [
          {
            name: "每周发表文章",
            type: "pie",
            roseType: "radius",
            radius: [15, 110],
            center: ["50%", "55%"],

            data: [
              { value: 320, name: "工业" },
              { value: 240, name: "科技" },
              { value: 149, name: "外汇" },
              { value: 100, name: "黄金" },
              { value: 59, name: "预测" }
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      }
    };
  }
};
</script>