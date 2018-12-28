<template>
  <chart :options="options" auto-resize/>
</template>
<script>
import EventMixins from "../mixins/EventMixins";
export default {
  mixins: [EventMixins],
  props: {
    item: {}
  },

  data() {
    return {
      options: {
        title: {
          text: this.item.text,
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 16,
              color: '#8796B0' 
          }
        },

        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          textStyle: {
            color: "#000"
          },
          axisPointer: {
            type: "none"
          }
        },
        legend: {
          data: []
        },

        grid: {
          top: 60,
          left: "4%",
          right: "4%",
          bottom: "4%",
          backgroundColor: "#666",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.item.options.datas[0],

            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",

            stack: "vistors",
            barWidth: "35%",
            data: this.item.options.datas[1],
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#75c6ee",
                    "#75c6ee",
                    "rgb(25,46,94)",
                    "rgb(195,229,235)"
                  ];
                  return colorList[params.dataIndex];
                }
              },

              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.upData();
  },
  watch: {
    item: {
      handler: function() {
        this.upData();
      }
    }
  },
  methods: {
    upData(item) {
      if (item) {
        this.item = item;
      }
      let datas = this.item.options.datas;
      this.options.xAxis.data = datas[0];
      this.options.series[0].data = datas[1];
    }
  }
};
</script>