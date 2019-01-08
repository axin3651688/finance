<template>
  <div>
    <div :class="className" :id="id" :style="{height:height,width:width}"/>
    <el-button type="primary" @click="initChart">原生按钮</el-button>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/theme/infographic.js";
export default {
  props: {
    item: {
      type: Object
    },
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null
      //   newdata: this.item.options.datas[1]
    };
  },
  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      this.chart = echarts.init(
        document.getElementById(this.id),
        "infographic"
      );
      //   debugger;
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["利润", "支出", "收入"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true
              }
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      });
    }
  },
  watch: {
    item: {
      handler: function() {
        // debugger;
        this.initChart();
      }

      //   immediate: true
      //   deep: true
    }
  }
};
</script>
