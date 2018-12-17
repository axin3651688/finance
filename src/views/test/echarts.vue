<template>
<div>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
    <el-button type="primary" @click="initChart">原生按钮</el-button>
</div>

</template>

<script>
import echarts from "echarts";

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
      this.chart = echarts.init(document.getElementById(this.id));
      //   debugger;
      this.chart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            // data: [120, 200],
            data: this.item.options.datas[1],
            type: "bar"
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
